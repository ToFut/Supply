import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-home-after-login',
  templateUrl: './home-after-login.component.html',
  styleUrls: ['./home-after-login.component.css']
})
export class HomeAfterLoginComponent implements OnInit {
  subUser: boolean;
  userName: string;
  userId: string;
  tiles: any[] = [
    {text: 'ספקים שלי', cols: 3, rows: 1, color: 'lightblue' , route: '/supplier'},
    {text: 'הזמנות', cols: 1, rows: 2, color: 'lightgreen' , route: '/order'},
    {text: 'המוצרים שלי', cols: 1, rows: 1, color: 'lightpink' , route: '/correctSupplierProducts'},
    {text: 'החזרת סחורה', cols: 2, rows: 1, color: '#DDBDF1' , route: '/returnProdcts'},
  ];

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.userName = afAuth.auth.currentUser.displayName;
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });

  }
  logout() {
    this.afAuth.auth.signOut();
  }
  ngOnInit(): void {
    this.af.list(`/users/${this.userId}/subUser`).subscribe(data => {
      if ( data.length === 0) {
        this.subUser = false;
      } else {
        this.subUser = true;
      }
    });
  }


}
