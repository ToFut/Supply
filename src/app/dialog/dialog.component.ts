///<reference path="../SupplierPersonal.ts"/>
import {Component, Input, OnInit} from '@angular/core';
import {
  AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable,
  FirebaseOperation
} from 'angularfire2/database';
import {SupplierPersonal} from '../SupplierPersonal';
import {AngularFireAuth} from 'angularfire2/auth';
import {DateSelected} from './dateAndFrec';
import {forEach} from '@angular/router/src/utils/collection';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {isUndefined} from 'util';


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  supplierKey: string;
  items: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any[]>;
  dateReciveSupplier: FirebaseListObservable<any[]>;
  dateOrderSupplier: FirebaseListObservable<any[]>;
  userId: string;
  public Supplier = new SupplierPersonal();
  Options = [1, 2, 3];
  selectedWay: number;
  dateSelected = [];
  frequencySelected = [];
  orderDay: number;
  selectedType: string;
  days = [];
  selectedDays = [];
  complexForm: any;
  orderInThisDays = [];
  email = new FormControl('', [Validators.required, Validators.email]);
  companyName = new FormControl('', [Validators.required]);
  buyerName = new FormControl('', [Validators.required]);
  buyerPhone = new FormControl('', [Validators.required]);
  update = false;
  typeOption: any;
  getInWeekEnd = false;
  orderDaysList = [];
  open = true;

  constructor(fb: FormBuilder, public af: AngularFireDatabase, public afAuth: AngularFireAuth,
              route: ActivatedRoute, private router: Router) {
    this.selectedDays = [];
    this.getInWeekEnd = false;
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
    route.queryParams.subscribe(params => {
      this.orderInThisDays = [];

    });
    this.selectedType = 'בחר קטגוריה';
    this.complexForm = fb.group({
      'email': [null, Validators.required, Validators.email],
      'companyName': [null, Validators.required],
      'buyerName': [null, Validators.required],
      'buyerPhone': [null, Validators.required],
    });

    route.queryParams.subscribe(params => {
      this.supplierKey = params['supplierKey'];
      this.userId = params['userId'];
      this.update = params['update'];

    });
    this.Options = [1, 2, 3];
    this.typeOption = [
      {viewValue: 'בחר קטגוריה'},
      {viewValue: 'משקאות'},
      {viewValue: 'מוצרי בשר'},
      {viewValue: 'מוצרי חלב'},
      {viewValue: 'חומרי גלם'},
      {viewValue: 'קינוחים'},
      {viewValue: 'מאפים'},
      {viewValue: 'ירקות'},
      {viewValue: 'משקאות חריפים'},
      {viewValue: 'אריזות וחומרי ניקוי'},
      {viewValue: 'כלים'},
      {viewValue: 'מוצרים יבשים'},


    ];

    this.days = [];
    this.days.push({itemName: 'א\'', orderIn: 0, value: false, itemNameOrder: '', id: 0});
    this.days.push({itemName: 'ב\'', orderIn: 0, value: false, itemNameOrder: '', id: 1});
    this.days.push({itemName: 'ג\'', orderIn: 0, value: false, itemNameOrder: '', id: 2});
    this.days.push({itemName: 'ד\'', orderIn: 0, value: false, itemNameOrder: '', id: 3});
    this.days.push({itemName: 'ה\'', orderIn: 0, value: false, itemNameOrder: '', id: 4});
    this.days.push({itemName: 'ו\'', orderIn: 0, value: false, itemNameOrder: '', id: 5});
    this.days.push({itemName: 'ש\'', orderIn: 0, value: false, itemNameOrder: '', id: 6});
  }

  ngOnInit(): void {
    this.item = this.af.object(`users/${this.userId}/suppliers/${this.supplierKey}`);
    console.log('key is  ' + this.supplierKey);
    setTimeout(() => {
      this.rebuild();
    }, 1000);
    this.getInWeekEnd = false;
  }

  rebuild() {
    this.item.subscribe(data => {
      console.log(data['$value']);
      if (data['$value'] !== null) {
        console.log('inside');
        if (!isUndefined(data['getInWeekEnd'])) {
          this.getInWeekEnd = data['getInWeekEnd'];
        }
        if (!isUndefined(data['OrderDays'])) {
          this.selectedWay = data['OrderDays'];
        }
        if (!isUndefined(data['type'])) {
          this.selectedType = data['type'];
        }

        console.log(data['getInWeekEnd']);
        data['date'].map(checkDay => {
          console.log(data['type']);
          console.log(this.selectedType);
          this.dateSelected.push(this.days[checkDay.id]);
          this.days[checkDay.id].value = true;
          document.getElementById(checkDay.itemName).style.backgroundColor = '#008624';
        });
      }
    });

  }

  getErrorMessage(oneOf: FormControl) {
    return oneOf.hasError('required') ? 'צריך למלא שדה זה' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  associateProduct() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'userId': this.userId,
        'SupplierKey': this.supplierKey,
        'update': this.update,
      }
    };
    this.router.navigate(['correctSupplierProducts'], navigationExtras);
  }

  decribeCurentReciveDate() {
    this.dateSelected.forEach(ele => {
      let sub = ele.id - this.selectedWay;
      console.log(sub);
      if (sub === -1 && this.getInWeekEnd) {
        sub = 5;
      } else if (sub === -1 && !this.getInWeekEnd) {
        sub = 6;
      }
      if (sub === -2 && this.getInWeekEnd) {
        sub = 4;
      } else if (sub === -2 && !this.getInWeekEnd) {
        sub = 5;
      }
      if (sub === -3 && this.getInWeekEnd) {
        sub = 3;
      } else if (sub === -3 && !this.getInWeekEnd) {
        sub = 4;
      }

      console.log(this.days[sub]);
      console.log(sub);
      this.days[sub].orderIn = ele.id;
      this.days[sub].itemNameOrder = ele.itemName;
      console.log(this.days[sub]);
      if (this.orderInThisDays.indexOf(this.days[sub] !== -1)) {
        this.orderInThisDays.push(this.days[sub]);
        console.log(this.orderInThisDays);
      }
    });
  }
  changeCatogrey(value) {
    this.typeOption.push({viewValue: value});
    this.selectedType = value;
  }

  functionOpen() {
    this.open = !this.open;
  }
  BuildSupplier(name: string, PhoneNumber: number, email: string, ContactName: string, ContactNum: number,
                ContactEmail: string) {
    this.decribeCurentReciveDate();
    console.log('not finish');
    this.Supplier.name = name;
    this.Supplier.PhoneNumber = PhoneNumber;
    this.Supplier.email = email;
    this.Supplier.ContactName = ContactName;
    this.Supplier.ContactNum = ContactNum;
    this.Supplier.ContactEmail = ContactEmail;
    this.Supplier.OrderDays = this.selectedWay;
    this.Supplier.getInWeekEnd = this.getInWeekEnd;
    this.Supplier.frequency = this.frequencySelected;
    this.Supplier.date = this.dateSelected;
    this.Supplier.type = this.selectedType;
    this.Supplier.orderInThisDays = this.orderInThisDays;
    console.log(this.selectedType);
    this.updateItem(this.Supplier);
  }

  calcDateOrder(day) {
    this.orderDay = day - this.selectedWay;
    switch (this.orderDay) {
      case -1 :
        this.orderDay = 6;
        break;
      case -2 :
        this.orderDay = 5;
        break;
      case -3 :
        this.orderDay = 4;
        break;
      case -4 :
        this.orderDay = 3;
        break;
      case -5 :
        this.orderDay = 2;
        break;
      case -6 :
        this.orderDay = 1;
        break;
    }
  }

  updateItem(Supplier) {
    /*this.selectedValues.map( element => {
      console.log(element);
      this.wayToOrder = this.af.list(`/users/${this.userId}/suppliers/${this.supplierKey}/wayToOrder/`);
      this.wayToOrder.push({'phone': element});
    });*/
    this.dateSelected.forEach(value => {
      if (value.id.toString() !== 'undefined') {
        this.calcDateOrder(value.id);
        this.dateReciveSupplier = this.af.list(`/users/${this.userId}/reciveDateSuppliers/${[value.id]}`);
        this.dateOrderSupplier = this.af.list(`/users/${this.userId}/orderDateSuppliers/${[this.orderDay]}`);
        console.log('this is ' + this.orderDay);
        this.dateOrderSupplier.update(this.supplierKey, {'orderIn': this.orderDay});
        this.dateReciveSupplier.update(this.supplierKey, {'reciveIn': value.id});
      }
    });
    this.dateSelected.forEach(value => {
      this.calcDateOrder(value.id);
      this.orderDaysList.push(this.orderDay);
      console.log(this.orderDaysList);
    });
    this.days.forEach(day => {
      if (this.orderDaysList.indexOf(day.id) === -1) {
        this.af.list(`/users/${this.userId}/orderDateSuppliers/${[day.id]}`).remove(`/${this.supplierKey}`);
      }
    });
    this.item.update(Supplier);
    this.router.navigateByUrl('/supplier');
  }

  deleteItem() {
    this.item.remove();
    this.dateOrderSupplier.remove(this.supplierKey);
    this.dateReciveSupplier.remove(this.supplierKey);
  }

  updateProductPage(key) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'userId': this.userId,
        'SupplierKey': key,
      }
    };
    this.router.navigate(['correctSupplierProducts'], navigationExtras);
  }

  checkDay(day, index) {
    console.log(day);
    console.log(index);
    this.days[index].value = !this.days[index].value;
    if (this.days[index].value === true && this.dateSelected.indexOf(day) === -1) {
      this.dateSelected.push(this.days[index]);
      // this.af.object(`/users/${this.userId}/orderDateSuppliers/${index}/${this.supplierKey}`).set( this.days[index].orderIn);
      document.getElementById(day).style.backgroundColor = '#008624';
    } else {
      const indexOf = this.dateSelected.indexOf(this.days[index]);
      this.dateSelected.splice(indexOf, 1);
      //   this.af.list(`/users/${this.userId}/orderDateSuppliers/${index}`).remove(`/${this.supplierKey}`);
      document.getElementById(day).style.backgroundColor = '#FCF5F5';
    }
  }
}
