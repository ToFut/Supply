///<reference path="../../../node_modules/angularfire2/database/firebase_list_observable.d.ts"/>
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {Component} from '@angular/core';
import {DialogsService} from '../dialog.service';
import {Modal} from 'ngx-modialog';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent {
  public result: any;
  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,
              private dialogsService: DialogsService , public modal: Modal) {
    this.user = afAuth.authState;
    this.items = af.list('/items');
  }

  addItem(newName: string) {
    this.items.push({text: newName});
  }

  updateItem(key: string, newText: string) {
    this.items.update(key, {text: newText});
  }

  deleteItem(key: string) {
    this.items.remove(key);
  }

  deleteEverything() {
    this.items.remove();
  }
  public openDialog(name: string) {
    this.dialogsService
      .confirm(name, 'Are you sure you want to do this?')
      .subscribe(res => this.result = res);
  }
  onClick() {
    const dialogRef = this.modal.alert()
      .open();

    dialogRef.result
      .then( result => alert(`The result is: ${result}`) );
  }
}
