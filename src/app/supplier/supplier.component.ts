///<reference path="../../../node_modules/angularfire2/database/firebase_list_observable.d.ts"/>
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {Component, Input, OnInit, Output} from '@angular/core';
import {DialogComponent} from '../dialog/dialog.component';
import {MdDialog, MdDialogRef} from '@angular/material';
import {ShowAllSupplierComponent} from '../show-all-supplier/show-all-supplier.component';
import {Subject} from 'rxjs/Subject';
import {SupplierService} from '../supplier.service';
import 'rxjs/add/operator/take';
import {NavigationExtras, Router} from '@angular/router';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent implements OnInit {
  public result: any;
  user: Observable<firebase.User>;
  userId: string;
   public items: FirebaseListObservable<any[]>;
  public itemToDel: FirebaseListObservable<any[]>;
  datePathFirebase: FirebaseListObservable<any[]>;
  lastKeypress = 0;
  startWith = new Subject();
  endWith = new Subject();
  supplier: any[];





  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase , public dialog: MdDialog,
              private SupplierService: SupplierService ,  private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {this.userId = user.uid;
        this.items = this.af.list(`users/${this.userId}/suppliers`);
      }
    });

  }
  ngOnInit(): void {

  }

  showListOfAllDB (): FirebaseListObservable<any[]> {
    return this.items;

  }
    /*search($event) {
    if ($event.timeStamp - this.lastKeypress > 200) {
      const q = $event.target.value;
      this.startWith.next(q);
      this.endWith.next(q + '\uf8ff');
    }
    this.lastKeypress = $event.timeStamp;
  }*/


  addItem() {
    this.items = this.af.list(`users/${this.userId}/suppliers`);
    const newRefToNewProduct = this.items.push({});
    const newProductKey = newRefToNewProduct.key;
    this.editSupplierPage(newProductKey);
  }
  openDialogEditSupplier(key) {
    const dialogRef = this.dialog.open(DialogComponent , {
      width: '450px',
      height: '450px'
    } );
    dialogRef.componentInstance.supplierKey = key;
    console.log('this ket is: ' + key);
  }
  editSupplierPage(key) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'supplierKey': key,
      }
    };
    this.router.navigate(['dialogSupplier'], navigationExtras);

  }
  associateProduct(key) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'userId': this.userId,
        'SupplierKey': key
      }
    };
    this.router.navigate(['correctSupplierProducts'], navigationExtras);
  }

  openDialogShowSupplier(key) {
    const dialogRef = this.dialog.open(ShowAllSupplierComponent , {
      width: '400px',
      height: '500px'
    } );
    dialogRef.componentInstance.key = key;

  }

  deleteItem(key) {
    this.itemToDel = this.af.list(`users/${this.userId}/suppliers/${key}`);
    for (let i = 0 ; i < 7 ; i++ ) {
      this.af.list(`users/${this.userId}/orderDateSuppliers/${i}/${key}`).remove();
      this.af.list(`users/${this.userId}/reciveDateSuppliers/${i}/${key}`).remove();
    }

    this.itemToDel.remove();

  }
  search() {
    let input, filter, table, li, td, i;
    input = document.getElementById('myInput');
    filter = input.value;
    table = document.getElementById('contact-list');
    li = document.getElementsByTagName('li');
    console.log(li[1].innerHTML);
    for (i = 0; i < li.length; i++) {
      td = li[i].getElementsByTagName('h2');
      console.log(li[i].innerText);
      if (td) {
        if (li[i].innerText.indexOf(filter) > -1) {
          li[i].style.display = '';
        } else {
          li[i].style.display = 'none';
        }
      }
    }
  }


}
