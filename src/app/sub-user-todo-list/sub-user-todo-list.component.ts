import { Component, OnInit , OnChanges} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import {
  AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable,
  onChildRemoved
} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {count} from 'console';
import {element} from 'protractor';
import {isUndefined} from 'util';

@Component({
  selector: 'app-sub-user-todo-list',
  templateUrl: './sub-user-todo-list.component.html',
  styleUrls: ['./sub-user-todo-list.component.scss']
})
export class SubUserTodoListComponent implements OnInit {
  userId: string;
  currentSupplierProducts: FirebaseListObservable<any[]>;
  supplier: FirebaseObjectObservable<any[]>;
  supplierProfile: FirebaseListObservable<any[]>;
  currentReciveInformation: FirebaseListObservable<any[]>;
  viewDate: Date = new Date();
  public day = this.viewDate.getDay();
  dayInMonth = this.viewDate.getDate();
  month = this.viewDate.getMonth();
  year = this.viewDate.getFullYear();
  supplierKey: string;
  radioButton = [];
  public count: number;
  selectedAll: any;
  supplierFounded: FirebaseListObservable<any[]>;
  reciveInfo: FirebaseListObservable<any[]>;
  ifFinisheSupplier: FirebaseListObservable<any[]>;
  howManyReceive= [];
  returnHistory: FirebaseListObservable<any[]>;
  domainUserId: string;
  accepted: number;


  ngOnInit(): void {
    if (this.month === 12) {
      this.month = 1;
    } else {
      this.month += 1;
    }
    console.log(this.userId);


    console.log(this.supplierKey);
    this.currentSupplierProducts = this.af.list(`/users/${this.userId}/suppliers/${this.supplierKey}/SupplierProducts/`);
    this.supplier = this.af.object(`/users/${this.userId}/suppliers/${this.supplierKey}`);
    this.supplierProfile = this.af.list(`/users/${this.userId}/suppliers/${this.supplierKey}`);
    console.log(this.currentSupplierProducts);
    this.currentSupplierProducts.subscribe(list => this.count = list.length );
    setTimeout(() => {
      this.checkDate();

    }, 1000);

    this.returnHistory = this.af.list(`users/${this.userId}/returnHistory/${this.year}/${this.month}/${this.dayInMonth}`);


    console.log(this.count);
  }
  OnChanges() {
    this.currentSupplierProducts = this.af.list(`/users/${this.userId}/suppliers/${this.supplierKey}/SupplierProducts/`);


  }
  constructor( public af: AngularFireDatabase, public afAuth: AngularFireAuth ,
               route: ActivatedRoute , private router: Router ) {

    console.log(this.userId);
    this.currentSupplierProducts = this.af.list(`/users/${this.userId}/suppliers/${this.supplierKey}/SupplierProducts/`);
  }
  updateRecive() {
    this.currentReciveInformation = this.af.list(`users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}`);
    this.ifFinisheSupplier = this.af.list(`users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}/status`);
    console.log(this.ifFinisheSupplier);
    try {
      this.currentReciveInformation.update(`${this.supplierKey}` , this.radioButton);
    } catch (err) {
      console.log(err);
    }
    console.log(this.checkIfAllSelected());

    if (this.checkIfAllSelected()) {
      this.ifFinisheSupplier.update(`${this.supplierKey}` , this.selectedAll);
      console.log(this.ifFinisheSupplier);

    }
    this.returnToReciveOrderSubUser();
  }
  updateIfFinishe( ) {
  }

  checkAll(sourceCheckbox) {
    for (let i = 0 ; i < this.count ; i++) {
      this.radioButton[i] = this.selectedAll;
      console.log(this.radioButton[i]);
    }
  }
  checkIfAllSelected() {
    let check = true;
    this.radioButton.map( element => {
      check = check && element;
      console.log(element);
    });
    console.log(check);
    this.selectedAll = check;
    return check;
  }
  Dropdown() {
    const x = document.getElementById('Demo');
    if (x.className.indexOf('w3-show') === -1) {
      x.className += ' w3-show';
    } else {
      x.className = x.className.replace(' w3-show', '');
    }
  }
  checkDate() {
    let orderingBefore;
    let subDate;
    let sameDay = this.dayInMonth ;
    let sameMonth = this.month ;
    console.log('checkDate');
    this.supplier.$ref.orderByKey().equalTo('OrderDays').on( 'child_added' ,  element => {
      console.log(element.val());
      orderingBefore = element.val();
    });
    if (sameDay - orderingBefore <= 0 ) {
      sameMonth -= orderingBefore;
      subDate = this.dayInMonth - orderingBefore;
      sameDay = new Date(this.year, sameMonth + 1, subDate).getDay();
    } else {
      sameDay -= orderingBefore;
    }
    this.reciveInfo = this.af.list(
      `users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}/${this.supplierKey}`);
    this.reciveInfo.$ref.on('value', snapshot => {
      console.log('There are ' + snapshot.numChildren() + ' products');
      this.count = snapshot.numChildren();
      console.log(this.count);
      for (let i = 0 ; i < this.count ; i++) {
        this.radioButton[i] = false;
        console.log(this.radioButton[i]);

      }
    });


  }
  returnToReciveOrderSubUser() {
    console.log(this.supplierFounded);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'domainUserId': this.userId
      }
    };
    this.router.navigate(['subUserReciveList'], navigationExtras);

  }
  setPartialRecive(key) {
    this.accepted = this.howManyReceive[key];
    console.log(this.accepted);
    this.reciveInfo.subscribe( value => {
      console.log(value);
      value.forEach( ele => {
        if (ele.$key === key) {
          this.reciveInfo.update(`${key}` , {accepted: this.accepted});
        }
      });
    });
  }



}
