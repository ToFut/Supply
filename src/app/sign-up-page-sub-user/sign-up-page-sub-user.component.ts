import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-sign-up-page-sub-user',
  templateUrl: './sign-up-page-sub-user.component.html',
  styleUrls: ['./sign-up-page-sub-user.component.less']
})
export class SignUpPageSubUserComponent implements OnInit {
  domainUserId: string;
  name: string;
  buyerId: string;
  email: string;
  authState: any = null;
  password: string;
  currentUserId: string;
  restName: string;

  constructor(public af: AngularFireDatabase, public afAuth: AngularFireAuth,
              public route: ActivatedRoute, private _formBuilder: FormBuilder, private router: Router,
              private ProductsService: ProductsService) {
    route.queryParams.subscribe(params => {
      this.domainUserId = params['domainUserId'];
      this.name = params['name'];
      this.restName = params['restName'];
    });

  }

  ngOnInit() {
  }

  emailSignUp() {
    console.log(this.email);
    console.log(this.password);
    return this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        this.authState = user;
        this.buyerId = user.uid;
        this.updateUserData();
      }).catch(function (error) {
        // Handle Errors here.
        console.log(this.authState.currentUser.phoneNumber);
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
      displayName: this.name
    })

    console.log(this.authState.displayName);
    const path = `users/${this.currentUserId}`; // Endpoint on firebase
    const data = {
      email: this.authState.email,
      name: this.name,
      subUser: this.domainUserId,
      jobTitle: 'קניין',
      first: true,
      uid: this.authState.uid
    };
    console.log(data);
    this.af.object(path).set(data)
      .catch(error => console.log(error));
    this.af.object(`users/${this.domainUserId}/buyersId/${this.currentUserId}`).set(true);
  }

  onKeyPassword(password: string) {
    this.password = password;
    console.log(this.password);
  }

  onKeyEmail(email: string) {
    this.email = email;
    console.log(this.email);
  }


}
