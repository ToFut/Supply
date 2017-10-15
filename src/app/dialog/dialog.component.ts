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

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  supplierKey:  string;
  items: FirebaseListObservable<any[]>;
  datePathFirebase: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any[]>;
  userId: string;
  public Supplier = new SupplierPersonal();
  @Input() supplierKeyPass: string;
  dateDropDwon = [];
  public dateSelectedafterChoose: DateSelected[];
  dateSelected = [];
  frequencyDropDwon = [];
  frequencySelected = [];
  dropdownSettings = {};
  frequencydropdownSettings = {};
  constructor(public dialogRef: MdDialogRef<any> , public af: AngularFireDatabase , public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
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
  console.log(frequency);
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

  BuildSupplier (name: string , email: string , SupplierNum: number , ClientNum: number ,
                 OfficeNumber: number , PhoneNumber: number , type: string) {
    this.Supplier.name = name;
    this.Supplier.ClientNum = ClientNum;
    this.Supplier.email = email;
    this.Supplier.OfficeNumber = OfficeNumber;
    this.Supplier.PhoneNumber = PhoneNumber;
    this.Supplier.SupplierNum = SupplierNum;
    this.Supplier.frequency = this.frequencySelected;
    this.Supplier.date = this.dateSelected;
    this.Supplier.type = type;
    this.updateItem(this.Supplier );


  }
  updateItem(Supplier ) {
    for (let i = 0 ; i < this.dateSelected.length; i++) {
      this.datePathFirebase = this.af.list(`/users/${this.userId}/datesSuppliers/`);
      console.log(this.dateSelected[i].id);
      this.datePathFirebase.update(this.supplierKey ,{[i]: this.dateSelected[i].id});
    }
    this.item.set(Supplier);
    this.closeDialog();
  }
  deleteItem() {
    this.item.remove();
    this.closeDialog();
  }
  closeDialog() {
    this.dialogRef.close();
  }

}

