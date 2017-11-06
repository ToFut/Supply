import { Component, OnInit , OnChanges} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  exportAs: 'productName'
})
export class TodoListComponent implements OnInit {
  userId: string;
  currentSupplierProducts: FirebaseListObservable<any[]>;
  supplierKey: string;

  ngOnInit(): void {
    console.log(this.supplierKey);
    this.currentSupplierProducts = this.af.list(`/users/${this.userId}/suppliers/${this.supplierKey}/SupplierProducts/`);
    console.log(this.currentSupplierProducts);

  }
  OnChanges() {
    console.log(this.supplierKey);
    this.currentSupplierProducts = this.af.list(`/users/${this.userId}/suppliers/${this.supplierKey}/SupplierProducts/`);
    console.log(this.currentSupplierProducts);

  }
  constructor(public dialogRef: MdDialogRef<any> , public af: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });


  }
  close() {
    this.dialogRef.close();
  }
}
