import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {isUndefined} from 'util';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-home-after-login',
  templateUrl: './home-after-login.component.html',
  styleUrls: ['./home-after-login.component.css']
})
export class HomeAfterLoginComponent implements OnInit {
  subUser: boolean;
  domainUserId: string;
  userName: string;
  userId: string;
  tiles: any[] = [
    {text: 'ספקים שלי', cols: 3, rows: 1, color: 'lightblue' , route: '/supplier'},
    {text: 'הזמנות', cols: 1, rows: 2, color: 'lightgreen' , route: '/order'},
    {text: 'המוצרים שלי', cols: 1, rows: 1, color: 'lightpink' , route: '/correctSupplierProducts'},
    {text: 'החזרת סחורה', cols: 2, rows: 1, color: '#DDBDF1' , route: '/returnProdcts'},
  ];

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase ,  private router: Router ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        console.log(this.userId);
        this.af.object(`/users/${this.userId}`).subscribe(data => {
          console.log(data['subUser']);
          if ( isUndefined(data['subUser'])) {
            console.log('no SubUser');
            this.subUser = false;
          } else {
            this.domainUserId = data['subUser'];
            console.log(' SubUser');
            if (data['first']) {
              this.ifSubUser();
              this.af.list(`/users/${this.userId}`).set('first' , false);
            }
            this.subUser = true;
          }
        });


      }

      this.userName = afAuth.auth.currentUser.displayName;

    });

  }
  reciveSubUser() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'domainUserId': this.domainUserId,

      }
    };
    this.router.navigate(['subUserReciveList'], navigationExtras);

  }
  orderSubUser() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'domainUserId': this.domainUserId,

      }
    };
    this.router.navigate(['subUserOrderList'], navigationExtras);

  }

  logout() {
    this.afAuth.auth.signOut();
  }
  ngOnInit(): void {

  }
  ifSubUser() {
    this.af.list(`/users/${this.domainUserId}/buyersId`).set(`${this.userId}` , true).then( success => {
      alert( 'קושרת לבעל המסעדה' + this.domainUserId );
    }).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.name;
      const errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
        alert(errorCode);

      }
      console.log(error);
    });
  }


}
