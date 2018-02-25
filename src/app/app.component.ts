import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {User} from './userDetail' ;
import {RouterModule, Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import {MatchSupplierService} from './match-supplier.service';
import {Location} from '@angular/common';
import {isUndefined} from 'util';


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
    { label: 'Supplier', route: '/supplier' }];
  title = 'Supply';
  user: Observable<any>;
  items: FirebaseListObservable<any[]>;
  userName: string;
  userId: string;
  url: any;
  dayInMonth: string;
  month: string;
  year: string;
  supplierKey: string;
  domainUserId: string;
  name: string;
  restName: string;
  checkIfInHomePage: boolean;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, private router: Router,
              public matchSupplier: MatchSupplierService, private location: Location, public link: ActivatedRoute) {
    link.queryParams.subscribe(params => {
      this.supplierKey = params['supplierKey'];
      this.name = params['name'];
      this.userId = params['userId'];
      this.dayInMonth = params['dayInMonth'];
      this.month = params['month'];
      this.year = params['year'];
      this.domainUserId = params['domainUserId'];
      this.name = params['name'];
      this.restName = params['restName'];
    });

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigate(['/homeAfterLogin']);
      } else {
        if (!isUndefined(this.supplierKey)) {

          const navigationExtras: NavigationExtras = {
            queryParams: {
              'userId': this.userId,
              'supplierKey': this.supplierKey,
              'dayInMonth': this.dayInMonth,
              'month': this.month,
              'year': this.year,

            }
          };
          this.router.navigate(['acceptOrder'], navigationExtras);
        } else if (!isUndefined(this.domainUserId)) {

          const navigationExtras: NavigationExtras = {
            queryParams: {
              'domainUserId': this.domainUserId,
              'name': this.name,
              'restName': this.restName,
            }
          };
          this.router.navigate(['subUserSignUp'], navigationExtras);

        } else {
          this.router.navigate(['/loginPage']);
        }
      }
    });

    this.router.events.subscribe(event => {
      this.url = event['url'];
      this.modifyHeader(event);
    });
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.checkURL();
      }
    });
    this.user = afAuth.authState;
    if (!this.userId) {
      return;
    }
    this.items = this.af.list(`users/${this.userId}/suppliers`);
    this.userName = afAuth.auth.currentUser.displayName;

  }

  checkURL() {
  }

  backClicked() {
    this.location.back();
  }


  ngOnInit() {
    this.user = this.afAuth.authState;
    const currentUrl = this.router.url; /// this will give you current url
    let registeredUser = true;
    if (currentUrl === '/home') {
      registeredUser = false;
    }

  }

  redirectSupplier() {
    this.router.navigate(['./supplier']);
  }

  redirectOrder() {
    this.router.navigate(['./order']);
  }


  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously().then((isSuccess) => {
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
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((isSuccess) => {
      this.userName = this.afAuth.auth.currentUser.displayName;

    });
  }

  linkFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((isSuccess) => {
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
    if (location.url === '/homeAfterLogin') {
      this.checkIfInHomePage = true;
    } else {
      this.checkIfInHomePage = false;
    }
    if (location.url === '/homeAfterLogin' || location.url === '/loginPage' || location.url === '/signUp' || location.url === '/home'
      || location.url === '/acceptOrder' || location.url === '/subUserSignUp') {
      this.showHeader = false;
    } else {
      this.showHeader = true;
    }
  }


}
