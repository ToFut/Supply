import {Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {MatchSupplierService} from '../match-supplier.service';
import {MdDialog} from '@angular/material';
import {TodoListComponent} from '../todo-list/todo-list.component';

@Component({
  selector: 'app-recive-order',
  templateUrl: './recive-order.component.html',
  styleUrls: ['./recive-order.component.css'],
  exportAs: 'i'

})
export class ReciveOrderComponent implements OnInit {
  userId: string;
  supplierFounded = [];
  currentSupplierProducts: FirebaseListObservable<any[]>;
  objLoaderStatus: boolean;
  viewDate: Date = new Date();
  today: number = Date.now();
  public day = this.viewDate.getDay();

  constructor(public matchSupplier: MatchSupplierService , public af: AngularFireDatabase , public afAuth: AngularFireAuth ,
              public dialog: MdDialog) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
    setTimeout(() => {
      this.checkForSupplier();

      setTimeout(() => {
        this.checkForSupplier();
      }, 1000);
    }, 1000);

  }

     ngOnInit() {
  }

   showProducts(supplierKey , name) {
     const x = document.getElementById(name);
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }
  openDialogShowSupplier(supplierKey) {
    const dialogRef = this.dialog.open(TodoListComponent , {
      width: '600px',
      height: '600px'
    } );
    console.log(supplierKey.$ref.key);
    dialogRef.componentInstance.supplierKey = supplierKey.$ref.key;

  }
  checkForSupplier() {
    this.matchSupplier.pushSupplier('recive').then((data) => {
      this.supplierFounded = data;
      this.objLoaderStatus = false;
      console.log(this.objLoaderStatus);

    });

  }

  checkIt() {
    console.log(this.supplierFounded);
  }


}