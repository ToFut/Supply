import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {
  email: string;
  password: string;
  authState: any = null;
  currentUserId: string;
  uid: string;
  name: string;
  businessName: string;
  firstPassword: string;
  secondPassword: string;
  phone: number;
  jobTitle: string;

  constructor(public afAuth: AngularFireAuth, private router: Router , public af: AngularFireDatabase) {
    this.afAuth.authState.subscribe(auth => {
      this.authState = auth;
      if (auth) {
        this.router.navigateByUrl('/homeAfterLogin');
      }
    });
  }

  ngOnInit() {
  }

  emailSignUp() {
    console.log(this.email);
    console.log(this.firstPassword);
    return this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.firstPassword)
      .then((user) => {
        this.authState = user;
        this.updateUserData();
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

  private updateUserData(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features
    this.currentUserId = this.authState.uid;
    this.authState.updateProfile({
      displayName: this.businessName
    })

    console.log(this.authState.displayName);
    const path = `users/${this.currentUserId}`; // Endpoint on firebase
    const data = {
      email: this.authState.email,
      businessName: this.businessName,
      name: this.name ,
      phone: this.phone,
      jobTitle: this.jobTitle,
      uid: this.authState.uid
    };
    console.log(data);
    this.af.object(path).update(data)
       .catch(error => console.log(error));

  }

  onKeyName (businessName: string) {
    this.name = name;
  }

  onKeybusiness(businessName: string) {
    this.businessName = businessName;
    console.log(this.businessName);
  }

  onKeyEmail(email: string) {
    this.email = email;
    console.log(this.email);
  }

  onKeyfirstPassword(firstPassword: string) {
    this.firstPassword = firstPassword;
    console.log(this.firstPassword);
  }
  onKeysecondPassword (secondPassword: string) {
    this.secondPassword = secondPassword;
    console.log(this.secondPassword);
  }
  onKeyPhone (phone: number) {
    this.phone = phone;
    console.log(this.phone);
  }
  onKeyJobTitle (jobTitle: string) {
    this.jobTitle = jobTitle;
    console.log(this.jobTitle);
  }

}
