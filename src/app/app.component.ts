///<reference path="../../node_modules/angularfire2/database/firebase_list_observable.d.ts"/>
import { Component } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {User} from './userDetail' ;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  exportAs: 'mdMenu',
  providers: [AngularFireDatabase]
})
export class AppComponent {
  navLinks: [
    {label: 'Supplier', route: '/supplier'}
    ];

  title = 'Supply';
  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  userId: string;
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.afAuth.authState.subscribe(user => {
      if (user) {this.userId = user.uid; }
    });
    this.user = afAuth.authState;
    if (!this.userId) {return; }
    this.items = this.af.list(`/users/${this.userId}`);
  }
  getItemList(): FirebaseListObservable<any[]> {
    return this.items;
  }
  login(): any {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).
    then(   (isSuccess) =>  {
      console.log(this.afAuth.auth.currentUser.email);
    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  deleteItem(key: string) {
    this.items.remove(key);
  }
  deleteEverything() {
    this.items.remove();
  }
}
