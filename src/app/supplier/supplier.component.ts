///<reference path="../../../node_modules/angularfire2/database/firebase_list_observable.d.ts"/>
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {Component, Input, OnInit, Output} from '@angular/core';
import {DialogComponent} from '../dialog/dialog.component';
import {ShowAllSupplierComponent} from '../show-all-supplier/show-all-supplier.component';
import {Subject} from 'rxjs/Subject';
import {SupplierService} from '../supplier.service';
import 'rxjs/add/operator/take';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {DeleteSupplierComponent} from '../delete-supplier/delete-supplier.component';
import {isUndefined} from "util";


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent implements OnInit {
  public result: any;
  user: Observable<firebase.User>;
  userId: string;
  domainUserId: string;
   public items: FirebaseListObservable<any[]>;
  public itemToDel: FirebaseListObservable<any[]>;
  datePathFirebase: FirebaseListObservable<any[]>;
  lastKeypress = 0;
  startWith = new Subject();
  endWith = new Subject();
  supplier: any[];
  oneTime = 0;





  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase ,
              private SupplierService: SupplierService , route: ActivatedRoute , private router: Router ) {
    route.queryParams.subscribe(params => {
      this.domainUserId = params['domainUserId'];
    });

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
      if (!isUndefined(this.domainUserId)) {
        this.userId = this.domainUserId;
      }
      this.items = this.af.list(`users/${this.userId}/suppliers`);

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
  editSupplierPage(key) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'supplierKey': key,
      }
    };
    this.router.navigate(['dialogSupplier'], navigationExtras);

  }
  sortList() {
    let list, i, switching, b, shouldSwitch;
    list = document.getElementById('myUL');
    console.log(list);

    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    if (this.oneTime === 0) {
      while (switching ) {
        this.oneTime = 1;
        switching = false;
        b = list.getElementsByTagName('li');
        console.log(b);
        for (i = 0; i < (b.length - 1); i++) {
          shouldSwitch = false;
          /*check if the next item should
          switch place with the current item:*/
          console.log(b[i].innerText);
          console.log(b[i + 1].innerText);
          if (b[i].innerText > b[i + 1].innerText) {
            /*if next item is alphabetically
            lower than current item, mark as a switch
            and break the loop:*/
            shouldSwitch = true;
            break;
          }
        }
        if (shouldSwitch) {
          /*If a switch has been marked, make the switch
          and mark the switch as done:*/
          b[i].parentNode.insertBefore(b[i + 1], b[i]);
          switching = true;
        }
      }
    }
  }
  associateProduct(key) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'userId': this.userId,
        'supplierKey': key,
        'update': true
      }
    };
    this.router.navigate(['dialogSupplier'], navigationExtras);
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
    table = document.getElementById('myUL');
    li = document.getElementsByTagName('li');
    for (i = 0; i < li.length; i++) {
      td = li[i].getElementsByTagName('h4');
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

