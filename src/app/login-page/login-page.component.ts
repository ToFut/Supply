import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {
  email: string;
  password: string;
  passReset = false;
  domainUserId: string;
  name: string;
  restName: string;
  supplierKey: string;
  userId: string;

  constructor(public afAuth: AngularFireAuth , private router: Router , public route: ActivatedRoute) {
    route.queryParams.subscribe(params => {
      this.domainUserId = params['domainUserId'];
      this.name = params['name'];
      this.restName = params['restName'];
      this.supplierKey = params['supplierKey'];
      this.userId = params['userId'];

    });

    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.router.navigateByUrl('/homeAfterLogin');
      }
      console.log(this.domainUserId);
      if ( this.domainUserId !== undefined) {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            'domainUserId': this.domainUserId,
            'name': this.name,
            'restName': this.restName,

          }
        };
        this.router.navigate(['subUserSignUp'], navigationExtras);
      }
      console.log(this.userId);
      if ( this.userId !== undefined) {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            'userId': this.userId,
            'supplierKey': this.supplierKey,
          }
        };
        this.router.navigate(['acceptOrder'], navigationExtras);
      }

    });

  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('onSubmit');
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(
        (success) => {
          this.router.navigate(['/#/homeAfterLogin']);
        }).catch(function (error) {
        const errorCode = error.name;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }
  onKeyEmail (email: string) {
    this.email = email;
    console.log(this.email);
  }
  onKeyPassword (password: string) {
    this.password = password;
    console.log(this.password);


  }
  resetPassword() {
    this.afAuth.auth.sendPasswordResetEmail(this.email)
      .then(() => this.passReset = true);
  }
  linkGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).
    then(   (isSuccess) =>  {
      this.router.navigate(['/#/homeAfterLogin']);

    });
  }



}
