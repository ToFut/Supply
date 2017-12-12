import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
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

  constructor(public afAuth: AngularFireAuth , private router: Router) {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.router.navigateByUrl('/homeAfterLogin');
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('onSubmit');
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(
        (success) => {
          console.log(success);
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
