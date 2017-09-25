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
  lastKeypress = 0;
  startWith = new Subject();
  endWith = new Subject();
  supplier: any[];




  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase , public dialog: MdDialog,
              private SupplierService: SupplierService) {
    this.afAuth.authState.subscribe(user => {
      if (user) {this.userId = user.uid;
        this.items = this.af.list(`users/${this.userId}`);
      }
    });
  }
  ngOnInit(): void {}

  showListOfAllDB (): FirebaseListObservable<any[]> {
    console.log(this.userId);
    return this.items;

  }
  searchItem(UserInputType: string) {
    this.items = this.af.list(`users/${this.userId}`, {
      query: {
        orderByChild: 'type',
        equalTo: UserInputType
      }
    });
  }
  search($event) {
    if ($event.timeStamp - this.lastKeypress > 200) {
      const q = $event.target.value;
      this.startWith.next(q);
      this.endWith.next(q + '\uf8ff');
    }
    this.lastKeypress = $event.timeStamp;
  }


  addItem() {
    const newRefToNewProduct = this.items.push({name : ''});
    const newProductKey = newRefToNewProduct.key;
    this.openDialogEditSupplier(newProductKey);
  }
  deleteEverything() {
    this.items.remove();

  }
  openDialogEditSupplier(key) {
    const dialogRef = this.dialog.open(DialogComponent , {
      width: '600px',
    } );
    dialogRef.componentInstance.key = key;
  }
  openDialogShowSupplier(key) {
    const dialogRef = this.dialog.open(ShowAllSupplierComponent , {
      width: '600px',
      height: '600px'
    } );
    dialogRef.componentInstance.key = key;
  }

}
