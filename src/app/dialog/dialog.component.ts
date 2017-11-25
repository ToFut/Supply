///<reference path="../SupplierPersonal.ts"/>
import {Component, Input, OnInit} from '@angular/core';
import {DialogModule} from 'primeng/primeng';
import {MdDialogRef} from '@angular/material';
import {
  AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable,
  FirebaseOperation
} from 'angularfire2/database';
import {SupplierPersonal} from '../SupplierPersonal';
import {AngularFireAuth} from 'angularfire2/auth';
import {DateSelected} from './dateAndFrec';
import {forEach} from '@angular/router/src/utils/collection';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  supplierKey:  string;
  items: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any[]>;
  dateReciveSupplier: FirebaseListObservable<any[]>;
  dateOrderSupplier: FirebaseListObservable<any[]>;
  wayToOrder: FirebaseListObservable<any[]>;
  userId: string;
  public Supplier = new SupplierPersonal();
  @Input() supplierKeyPass: string;
  dateDropDwon = [];
  public dateSelectedafterChoose: DateSelected[];
  Options = [1 , 2 , 3];
  selectedWay: number;
  dateSelected = [];
  frequencyDropDwon = [];
  frequencySelected = [];
  dropdownSettings = {};
  frequencydropdownSettings = {};
  orderDay: number;
  selectedValues: any;
  toppings = new FormControl();

  toppingList = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor( public af: AngularFireDatabase , public afAuth: AngularFireAuth ,
               route: ActivatedRoute , private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
    route.queryParams.subscribe(params => {
      this.supplierKey = params['supplierKey'];
    });

  }
  ngOnInit(): void {
    this.item = this.af.object(`users/${this.userId}/suppliers/${this.supplierKey}`);
    console.log('key is  ' + this.supplierKey);
    this.dateDropDwon = [
      { 'id': 0, 'itemName' : 'יום ראשון'  },
      { 'id': 1, 'itemName' : 'יום שני' },
      { 'id': 2, 'itemName' : 'יום שלישי' },
      { 'id': 3, 'itemName' : 'יום רביעי' },
      { 'id': 4, 'itemName' : 'יום חמישי' },
      { 'id': 5, 'itemName' : 'יום שישי' },
      { 'id': 6, 'itemName' : 'יום שבת' },
    ];
    this.frequencyDropDwon = [
      { 'id': 0, 'itemName' : 'כל שבוע' },
      { 'id': 1, 'itemName' : 'כל חודש' },
      { 'id': 2, 'itemName' : 'פעם ב4 חודשים' },
      { 'id': 3, 'itemName' : 'פעם בשנה' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      text: 'ימים',
      selectAllText: 'בחר הכל',
      unSelectAllText: 'הסר הכל',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    this.frequencydropdownSettings = {
      singleSelection: false,
      text: 'תדירות ההזמנה',
      selectAllText: 'בחר הכל',
      unSelectAllText: 'הסר הכל',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
  }
  onfrequencySelect(frequency: any) {
    console.log(frequency.id);
    console.log(this.frequencySelected);
  }
  OnfrequencyDeSelect(frequency: any) {
    console.log(this.frequencySelected);
  }
  onfrequencySelectAll(frequencys: any) {
    console.log(frequencys);
  }
  onfrequencyDeSelectAll(frequencys: any) {
    console.log(frequencys);
  }
  onDateSelect(date: any) {
    console.log(date.id);
    console.log(this.dateSelected);
  }
  OnDateDeSelect(date: any) {
    console.log(date);
    console.log(this.dateSelected);
  }
  onDateSelectAll(dates: any) {
    console.log(dates);
  }
  onDateDeSelectAll(dates: any) {
    console.log(dates);
  }

  BuildSupplier (name: string , PhoneNumber: number , email: string , ContactName: string , ContactNum: number ,
                 ContactEmail: string  , type: string ) {
    this.Supplier.name = name;
    this.Supplier.PhoneNumber = PhoneNumber;
    this.Supplier.email = email;

    this.Supplier.ContactName = ContactName;
    this.Supplier.ContactNum = ContactNum;
    this.Supplier.ContactEmail = ContactEmail;
    this.Supplier.OrderDays = this.selectedWay;
    this.Supplier.type = type;

    this.Supplier.frequency = this.frequencySelected;
    this.Supplier.date = this.dateSelected;
    this.updateItem(this.Supplier );


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
  updateItem(Supplier ) {
    this.selectedValues.map( element => {
      console.log(element);
      this.wayToOrder = this.af.list(`/users/${this.userId}/suppliers/${this.supplierKey}/wayToOrder/`);
      this.wayToOrder.push({'phone': element});
    });
    this.dateSelected.forEach(value => {
      if (value.id.toString() !== 'undefined') {
        this.calcDateOrder(value.id);
        this.dateReciveSupplier = this.af.list(`/users/${this.userId}/reciveDateSuppliers/${[value.id]}`);
        this.dateOrderSupplier = this.af.list(`/users/${this.userId}/orderDateSuppliers/${[this.orderDay]}`);
        console.log('this is ' + value.id);
        this.dateOrderSupplier.set(this.supplierKey , {'orderIn' : this.orderDay });
        this.dateReciveSupplier.set(this.supplierKey , {'reciveIn' : value.id });

      }
    });
    this.item.update(Supplier);
    this.router.navigate(['supplier']);
  }
  deleteItem() {
    this.item.remove();
    this.dateOrderSupplier.remove(this.supplierKey);
    this.dateReciveSupplier.remove(this.supplierKey);

  }
}
