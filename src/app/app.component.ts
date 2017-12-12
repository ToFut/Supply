///<reference path="../../node_modules/angularfire2/database/firebase_list_observable.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {User} from './userDetail' ;
import { RouterModule, Router } from '@angular/router';
import {MatchSupplierService} from './match-supplier.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  exportAs: 'mdMenu',
  providers: [AngularFireDatabase]
})
export class AppComponent implements OnInit {
  showHeader = true;
  navLinks: [
    {label: 'Supplier', route: '/supplier'}];
  title = 'Supply';
  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  userName: string;
  userId: string;
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase , private router: Router ,
              public matchSupplier: MatchSupplierService) {
    this.afAuth.authState.subscribe(user => {
      if (user) {this.userId = user.uid;
        this.router.navigate(['/homeAfterLogin']);
      } else {
        this.router.navigate(['/loginPage']);
      }

    });
    this.user = afAuth.authState;
    if (!this.userId) {return; }
    this.items = this.af.list(`users/${this.userId}/suppliers`);
    this.userName = afAuth.auth.currentUser.displayName;

  }
  onChange() {
  }


    ngOnInit() {
    this.user = this.afAuth.authState;
    const currentUrl = this.router.url; /// this will give you current url
    let registeredUser = true;
    if (currentUrl === '/home') {
      registeredUser = false;
    }
      this.router.events.subscribe(event => this.modifyHeader(event));

    }
  redirectSupplier() {
    this.router.navigate(['./supplier']);
  }
  redirectOrder() {
    this.router.navigate(['./order']);
  }


  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously().then((isSuccess) =>  {
    });

  }
   w3_open() {
    document.getElementById('main').style.marginRight = '50%';
    document.getElementById('mySidebar').style.width = '50%';
    document.getElementById('mySidebar').style.display = 'block';
  }
   w3_close() {
    document.getElementById('main').style.marginRight = '0%';
    document.getElementById('mySidebar').style.display = 'none';
    document.getElementById('openNav').style.display = 'inline-block';
  }


  linkGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).
    then(   (isSuccess) =>  {
      this.userName = this.afAuth.auth.currentUser.displayName;

    });
  }

  linkFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).
    then(   (isSuccess) =>  {
    });

  }

  getItemList(): FirebaseListObservable<any[]> {
    return this.items;
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
  openNav() {
    document.getElementById('mySidenav').style.width = '500px';
    document.getElementById('main').style.marginLeft = '500px';
    document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
    document.body.style.backgroundColor = 'white';
  }
  modifyHeader(location) {
    console.log(location.url);
    if (location.url === '/homeAfterLogin' || location.url === '/loginPage' || location.url === '/signUp' || location.url === '/home' ) {
      this.showHeader = false;
    } else {
      this.showHeader = true;
    }
  }


}
