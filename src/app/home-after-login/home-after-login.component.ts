import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-home-after-login',
  templateUrl: './home-after-login.component.html',
  styleUrls: ['./home-after-login.component.css']
})
export class HomeAfterLoginComponent implements OnInit {

  userName: string;
  tiles: any[] = [
    {text: 'ספקים שלי', cols: 3, rows: 1, color: 'lightblue' , route: '/supplier'},
    {text: 'הזמנות', cols: 1, rows: 2, color: 'lightgreen' , route: '/order'},
    {text: 'המוצרים שלי', cols: 1, rows: 1, color: 'lightpink' , route: '/correctSupplierProducts'},
    {text: 'החזרת סחורה', cols: 2, rows: 1, color: '#DDBDF1' , route: '/returnProdcts'},
  ];

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.userName = afAuth.auth.currentUser.displayName;
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  ngOnInit(): void {
  }


}
