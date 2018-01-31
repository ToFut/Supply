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
  viewDate: Date = new Date();
  time = new Date().getHours();
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
              this.af.list(`/users/${this.userId}`).update('first' , false);
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
   supplierSubUser() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'domainUserId': this.domainUserId,

      }
    };
    this.router.navigate(['subUserSupplierList'], navigationExtras);

  }
  returnSubUser() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'domainUserId': this.domainUserId,

      }
    };
    this.router.navigate(['subUserReturnList'], navigationExtras);

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
    const OrderNotificatoin = '';
    const ReciveNotificatoin = '';
    const Recive = false;
    const Order = false;
    /*this.af.object(`users/${this.userId}`).subscribe( info => {
      console.log( this.viewDate.getHours());
      console.log( this.viewDate.getMinutes());
      const hourOrder = info['TimeOrder'].substring(0 , 2);
      const minOrder = info['TimeOrder'].substring(3 );
      if (hourOrder < this.viewDate.getHours()) {
        console.log('bigger');
      } else if (hourOrder === this.viewDate.getHours() && minOrder < this.viewDate.getMinutes() ) {
        console.log('bigger');
      }
      const hourRecive = info['TimeRecive'].substring(0 , 2);
      const minRecive = info['TimeRecive'].substring(3 );
      if (hourRecive < this.viewDate.getHours()) {
        console.log('bigger');
      } else if (hourRecive === this.viewDate.getHours() && minRecive < this.viewDate.getMinutes() ) {
        console.log('bigger');
      }
      if ( info['NotificationWay'] === 'email' ) {
        if ( Order ) {
        this.notificationEmail(OrderNotificatoin);
        }
        if ( Recive ) {
          this.notificationEmail(ReciveNotificatoin);
        }
      }
      if ( info['NotificationWay'] === 'Whatsapp' ) {
        if ( Order ) {
          this.notificationWhatsAPP(OrderNotificatoin);
        }
        if ( Recive ) {
          this.notificationWhatsAPP(ReciveNotificatoin);
        }
      }
    });*/
        /*notificationEmail(message) {
      window.location.href = 'mailto:' + this.afAuth.auth.currentUser.email + '?subject=הודעה על' + '&body=' + message;
    }
    notificationWhatsAPP(message) {
      const demo =
        'whatsapp://send?phone=972' + this.afAuth.auth.currentUser.phoneNumber + '&text=שלום ' + this.afAuth.auth.currentUser.displayName + '%0A' +
        message + '%0A' + ' בתודה SupplyMe';

    }*/

  }
  ifSubUser() {
    this.af.list(`/users/${this.domainUserId}/buyersId`).update(`${this.userId}` , true).then( success => {
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
  shareApp() {
    let WhatsAppMesage = '';
    WhatsAppMesage = ' https://api.whatsapp.com/send?text=SupplyME ' +
    ' אפליקציה לניהול ספקים באופן חכם מהיר יעיל תוך חיסכון משמעותי בהוצאות ' +
      ' נסה עכשיו בחינם !' + ' %0A ' + ' app.supplyme.net ' ;
    console.log(WhatsAppMesage);
    location.href = WhatsAppMesage;


  }


}
