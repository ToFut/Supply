import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Router} from '@angular/router';

@Component({
  selector: 'app-satistics',
  templateUrl: './satistics.component.html',
  styleUrls: ['./satistics.component.css']
})
export class SatisticsComponent implements OnInit {
  userId: string;
  numOfSubUsers: boolean;
  subUser = [];
  itemProduct: FirebaseListObservable<any[]>;
  existProduct = [];
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase ,  private router: Router ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        console.log(this.userId);
        this.af.list(`/users/${this.userId}/buyersId`).subscribe(data => {
          console.log(data);
          console.log(data);
          data.forEach( element => {
            if (element.$value) {
              this.subUser.push(element.$key);
            }
          });
          console.log(this.subUser);
        });
      }
    });
  }
  ngOnInit() {
/*
    this.af.list(`/products`).subscribe( products => {
      products.forEach( product => {
        const name = product['ProductName'];
        if ( this.existProduct.indexOf(name) === -1) {
          console.log(name , ' push ');
          this.existProduct.push(name);
        } else {
          console.log(name , ' already exist ');
          count++;
          console.log(product);
          try {
            this.af.object(`/products/${product.$key}`).remove();
          } catch (err) {
            console.log(err);
          }
        }
      });
      console.log(' remove ' , count , ' prodcuts');
    });
*/
  }
}
