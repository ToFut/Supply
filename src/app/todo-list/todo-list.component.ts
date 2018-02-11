import {Component, OnInit, OnChanges} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, NgForm} from '@angular/forms';
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
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  exportAs: 'productName'
})
export class TodoListComponent implements OnInit {
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
  howManyReceive = [];
  returnHistory: FirebaseListObservable<any[]>;
  domainUserId: string;
  acceptedForKey = [];
  accepted: number;
  selectedTypeFillRecive: string;
  types = [
    {value: 'ליטר'},
    {value: 'קג'},
    {value: 'גר'},
    {value: 'מל'},
    {value: 'יחידה'},
    {value: 'ארגז'},
    {value: 'יחידות'},
    {value: 'קרטון'},
    {value: 'שקיות'},


  ];

  ngOnInit(): void {
    if (this.month === 12) {
      this.month = 1;
    } else {
      this.month += 1;
    }
    console.log(this.month);

    console.log(this.supplierKey);
    this.currentSupplierProducts = this.af.list(`/users/${this.userId}/suppliers/${this.supplierKey}/SupplierProducts/`);
    this.supplier = this.af.object(`/users/${this.userId}/suppliers/${this.supplierKey}`);
    this.supplierProfile = this.af.list(`/users/${this.userId}/suppliers/${this.supplierKey}`);
    this.currentSupplierProducts.subscribe(list => this.count = list.length);
    this.returnHistory = this.af.list(`users/${this.userId}/returnHistory/${this.year}/${this.month}/${this.dayInMonth}/${this.supplierKey}`);

    setTimeout(() => {
      this.checkDate();

    }, 1000);


    console.log(this.returnHistory);
  }

  OnChanges() {
    this.currentSupplierProducts = this.af.list(`/users/${this.userId}/suppliers/${this.supplierKey}/SupplierProducts/`);


  }

  constructor(public af: AngularFireDatabase, public afAuth: AngularFireAuth,
              route: ActivatedRoute, private router: Router) {
    console.log(this.month);

    route.queryParams.subscribe(params => {
      this.supplierKey = params['supplierKey'];
      this.supplierFounded = params['supplierFounded'];
      this.domainUserId = params['userId'];
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userId = user.uid;
        }
        if (!isUndefined(this.domainUserId)) {
          this.userId = this.domainUserId;
        }
      });
    });
    this.currentSupplierProducts = this.af.list(`/users/${this.userId}/suppliers/${this.supplierKey}/SupplierProducts/`);
  }
  updateRecive() {
    this.currentReciveInformation = this.af.list(`users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}`);
    this.ifFinisheSupplier = this.af.list(`users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}/status`);
    console.log(this.ifFinisheSupplier);
    console.log(this.checkIfAllSelected(' ', '', ''));
    this.af.list(`users/${this.userId}/returnList/${this.supplierKey}`).subscribe(value => {
      value.forEach(element => {
        console.log(element);
        //   if(element.status === 'sent') {
        //  this.af.list(`users/${this.userId}/returnList/${this.supplierKey}/${element`).
      });
    });

    if (this.checkIfAllSelected(' ', '', '')) {
      this.af.object(`users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}/status/${this.supplierKey}`)
        .set(this.selectedAll);
      this.reciveInfo.subscribe(value => {
        console.log(value);
        value.forEach(ele => {
          console.log(ele);
          this.reciveInfo.update(`${ele.$key}/accepted`, ele.amount);
        });
      });


    } else {
      this.ifFinisheSupplier.update(`/${this.supplierKey}`, this.selectedAll);
    }
  }

  updateTypeOfFill(type, key) {
    if (!isUndefined(type)) {
      this.af.object(
        `users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}/${this.supplierKey}/${key}/TypeOfFillUp`)
        .set(type);
    }
  }

  updateIfFinishe() {
  }

  checkAll(sourceCheckbox) {
    for (let i = 0; i < this.count; i++) {
      this.radioButton[i] = this.selectedAll;
      console.log(this.radioButton[i]);
    }
  }

  checkAccepterCurrentKey(amount, accepted, key) {
    if (accepted ) {
      this.af.object(
        `users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}/${this.supplierKey}/${key}/accepted`)
        .set(amount);
    }
  }

  checkIfAllSelected(amount, accepted, key) {
    this.checkAccepterCurrentKey(amount, accepted, key);
    let check = true;
    this.radioButton.map(element => {
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
    let sameDay = this.dayInMonth;
    let sameMonth = this.month;
    console.log('checkDate');
    this.supplier.$ref.orderByKey().equalTo('OrderDays').on('child_added', element => {
      console.log(element.val());
      orderingBefore = element.val();
    });
    if (sameDay - orderingBefore <= 0) {
      sameMonth -= orderingBefore;
      subDate = this.dayInMonth - orderingBefore;
      sameDay = new Date(this.year, sameMonth + 1, subDate).getDay();
    } else {
      sameDay -= orderingBefore;
    }
    this.reciveInfo = this.af.list(
      `users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}/${this.supplierKey}`);
    this.reciveInfo.subscribe(snapshot => {
      console.log('There are ' + snapshot.length + ' products');
      this.count = snapshot.length;
      console.log(snapshot);
      snapshot.forEach(unit => {
        console.log(unit);
        this.howManyReceive[unit.$key] = unit['accepted'];
      });
      for (let i = 0; i < this.count; i++) {
        this.radioButton[i] = false;
      }
    });
  }

  setPartialRecive(key) {
    const demok = key;
    this.reciveInfo.subscribe(value => {
      this.accepted = this.howManyReceive[key];
      value.forEach(ele => {
        if (ele.$key === key) {
          this.af.object(
            `users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}/${this.supplierKey}/${key}/accepted`)
            .set(this.accepted);
        }
      });
    });
  }

  checkDone(index, amount, accept) {
    if (accept >= amount) {
      this.radioButton[index] = true;
    }
  }

}
