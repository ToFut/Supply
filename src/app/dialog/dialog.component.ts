///<reference path="../SupplierPersonal.ts"/>
import {Component, Input, OnInit} from '@angular/core';
import {DialogModule, SelectItem} from 'primeng/primeng';
import {ErrorStateMatcher, MdDialogRef} from '@angular/material';
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


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
  userId: string;
  public Supplier = new SupplierPersonal();
  Options = [1 , 2 , 3];
  selectedWay: number;
  dateSelected = [];
  frequencySelected = [];
  orderDay: number;
  selectedType = [];
  days = [];
  selectedDays = [];
  complexForm: any;
  email = new FormControl('', [Validators.required, Validators.email]);
  companyName = new FormControl('', [Validators.required]);
  buyerName = new FormControl('', [Validators.required]);
  buyerPhone = new FormControl('', [Validators.required]);



  typeOption = [
    {value: 'משקאות', viewValue: 'משקאות'},
    {value: 'מוצרי בשר', viewValue: 'מוצרי בשר'},
    {value: 'מוצרי חלב', viewValue: 'מוצרי חלב'},
    {value: 'חומרי גלם', viewValue: 'חומרי גלם'},
    {value: 'קינוחים', viewValue: 'קינוחים'},
    {value: 'מאפים', viewValue: 'מאפים'},
    {value: 'אריזות וחומרי ניקוי', viewValue: 'אריזות וחומרי ניקוי'},
    {value: 'כלים', viewValue: 'כלים'},
    {value: 'מוצרים יבשים', viewValue: 'מוצרים יבשים'},


  ];

  constructor( fb: FormBuilder , public af: AngularFireDatabase , public afAuth: AngularFireAuth ,
               route: ActivatedRoute , private router: Router) {
    this.selectedDays = [];
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
   this.complexForm = fb.group({
      'email' : [null, Validators.required, Validators.email],
      'companyName' : [null, Validators.required],
     'buyerName' : [null, Validators.required],
     'buyerPhone' : [null, Validators.required],
    })

    route.queryParams.subscribe(params => {
      this.supplierKey = params['supplierKey'];
    });
    this.Options = [1 , 2 , 3];
    this.typeOption = [
      {value: 'משקאות', viewValue: 'משקאות'},
      {value: 'מוצרי בשר', viewValue: 'מוצרי בשר'},
      {value: 'מוצרי חלב', viewValue: 'מוצרי חלב'},
      {value: 'חומרי גלם', viewValue: 'חומרי גלם'},
      {value: 'קינוחים', viewValue: 'קינוחים'},
      {value: 'מאפים', viewValue: 'מאפים'},
      {value: 'אריזות וחומרי ניקוי', viewValue: 'אריזות וחומרי ניקוי'},
      {value: 'כלים', viewValue: 'כלים'},
      {value: 'מוצרים יבשים', viewValue: 'מוצרים יבשים'},


    ];

    this.days = [];
    this.days.push({itemName: 'א\'', value: false , id: 0});
    this.days.push({itemName: 'ב\'', value: false , id: 1});
    this.days.push({itemName: 'ג\'', value: false , id: 2});
    this.days.push({itemName: 'ד\'', value: false , id: 3});
    this.days.push({itemName: 'ה\'', value: false , id: 4});
    this.days.push({itemName: 'ו\'', value: false , id: 5});
    this.days.push({itemName: 'ש\'', value: false , id: 6});
  }
  ngOnInit(): void {
    this.item = this.af.object(`users/${this.userId}/suppliers/${this.supplierKey}`);
    console.log('key is  ' + this.supplierKey);
  }
  getErrorMessage(oneOf: FormControl) {
    return oneOf.hasError('required') ? 'צריך למלא שדה זה' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  BuildSupplier (name: string , PhoneNumber: number , email: string , ContactName: string , ContactNum: number ,
                 ContactEmail: string   ) {
    this.Supplier.name = name;
    this.Supplier.PhoneNumber = PhoneNumber;
    this.Supplier.email = email;

    this.Supplier.ContactName = ContactName;
    this.Supplier.ContactNum = ContactNum;
    this.Supplier.ContactEmail = ContactEmail;
    this.Supplier.OrderDays = this.selectedWay;

    this.Supplier.frequency = this.frequencySelected;

    this.Supplier.date = this.dateSelected;
    this.Supplier.type = this.selectedType['value'];
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
        this.dateOrderSupplier.set(this.supplierKey , {'orderIn' : this.orderDay });
        this.dateReciveSupplier.set(this.supplierKey , {'reciveIn' : value.id });

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
  checkDay(day , index) {
    console.log(day);
    this.days[index].value = !this.days[index].value;
    if (this.days[index].value === true ) {
      this.dateSelected.push(this.days[index]);
      document.getElementById(day).style.backgroundColor = '#008624';

    } else {
      console.log(index);
      this.dateSelected.splice(this.days[index], 1);
      console.log(this.dateSelected);
      document.getElementById(day).style.backgroundColor = '#FCF5F5';
    }
    console.log(this.dateSelected);
  }

}
