///<reference path="../../../node_modules/angularfire2/database/firebase_list_observable.d.ts"/>
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {Component, Input, Output} from '@angular/core';
import {DialogComponent} from '../dialog/dialog.component';
import {MdDialog, MdDialogRef} from '@angular/material';
import {ShowAllSupplierComponent} from '../show-all-supplier/show-all-supplier.component';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent {
  public result: any;
  user: Observable<firebase.User>;
  userId: string;
   public items: FirebaseListObservable<any[]>;



  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase , public dialog: MdDialog) {
    this.afAuth.authState.subscribe(user => {
      if (user) {this.userId = user.uid; }
    });
  }
  showListOfAllDB (): FirebaseListObservable<any[]> {
    this.items = this.af.list(`users/${this.userId}`);
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


  addItem() {
    this.items = this.af.list(`users/${this.userId}`);
    this.items.push({name: 'הכנס ספק'});
  }
  deleteEverything() {
    this.items = this.af.list(`users/${this.userId}`);
    this.items.remove();

  }
  openDialog(key) {
    const dialogRef = this.dialog.open(ShowAllSupplierComponent , {
      width: '600px',
    } );
    dialogRef.componentInstance.key = key;
  }
}
