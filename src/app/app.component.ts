import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {User} from './userDetail' ;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  exportAs: 'mdMenu'
})
export class AppComponent {
  title = 'Supply';
  user: Observable<firebase.User>;
  googleUser: User;
  items: FirebaseListObservable<any[]>;
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.user = afAuth.authState;
    this.items.subscribe(items => {
      // items is an array
      items.forEach(item => {
        console.log('Item:', item);
      });
    });
  }
  loginWithGoogle() {
    this.user = this.login()
    console.log(this.user);
  }
  login(): any {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).
    then(   (isSuccess) =>  {
      console.log(this.afAuth.auth.currentUser.email);
      this.googleUser.name = this.afAuth.auth.currentUser.displayName;
    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
