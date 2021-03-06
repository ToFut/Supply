import {Component, NgModule, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {element} from 'protractor';
import {isUndefined} from 'util';
import {GetReturnService} from '../getReturn.service';
import {MatDialog} from '@angular/material';
import {ReturnProductsDialogComponent} from './return-products-dialog/return-products-dialog.component';
import {isDefined} from "@ng-bootstrap/ng-bootstrap/util/util";

@Component({
  selector: 'app-return-products',
  templateUrl: './return-products.component.html',
  styleUrls: ['./return-products.component.css']
})

export class ReturnProductsComponent implements OnInit {
  fieldArray = [];
  viewDate: Date = new Date();
  newAttribute: any = {};
  collapse: boolean;
  display = false;
  supplierKey: string;
  list = [];
  returnValue: number;
  userId: string;
  domainUserId: string;
  selectedSupplier: string;
  position = '  top';
  selectedProduct: FirebaseObjectObservable<any[]>;
  selectedReturnDay: string;
  open = true;
  openreasons = true;
  returnsDays: FirebaseListObservable<any[]>;
  suppliers: FirebaseListObservable<any[]>;
  productsSuppliers: FirebaseListObservable<any[]>;
  returnProductsToSuppliers = [];
  retProductsToCurrentSupplier: FirebaseListObservable<any[]>;
  returnHistory: FirebaseListObservable<any[]>;
  demoList = [];
  productKey: string;
  TypeOfFillUp: string;
  sizePast = 1;
  checkSize = 0;
  updateLater = true;
  reasons = [
    {value: 'מקולקל'},
    {value: 'עודף'},
    {value: 'פיקדון'},
    {value: 'מחזור'},
    {value: 'סופק בטעות'},
    {value: 'הוזמן בטעות'},
    {value: 'פג תוקף'},

  ];
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
  public day = this.viewDate.getDay();
  StringDay: string;
  dayInMonth = this.viewDate.getDate();
  month = this.viewDate.getMonth();
  year = this.viewDate.getFullYear();
  dialogResault = false;
  selectedType: string;
  fromDatespesificSupplier = {};
  toDatespesificSupplier = {};
  selectedReason = '';
  spesificSupplier: string;
  single: any[];
  showWarning = [];
  view: any[] = [700, 400];
  showDone = [];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(public af: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router,
              route: ActivatedRoute, public getReturn: GetReturnService) {
    route.queryParams.subscribe(params => {
      this.domainUserId = params['domainUserId'];
    });
    if (this.month === 12) {
      this.month = 1;
    } else {
      this.month += 1;
    }


    this.returnHistory =
      this.af.list(`users/${this.userId}/returnHistory/${this.year}/${this.month}/${this.dayInMonth}/${this.supplierKey}`);

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
      if (!isUndefined(this.domainUserId)) {
        this.userId = this.domainUserId;
      }
    });
    this.collapse = true;
  }

  onSelect(event) {
    console.log(event);
  }

  openFormReturnPage(): void {
    this.router.navigate(['formReturnProduct']);
  }

  ngOnInit(): void {
    this.suppliers = this.af.list(`users/${this.userId}/suppliers`);
    this.suppliers.subscribe(data => {
      {
        data.forEach(elem => {
          this.list.push({itemName: elem.name, key: elem.$key});
          console.log(this.list);

        });
      }
    });
    this.af.list(`users/${this.userId}/returnList`).subscribe(data => {
      console.log(data);
      data.forEach(snapshot => {
        console.log(snapshot.$key);
        if (snapshot.$key !== 'status') {
          this.af.list(`users/${this.userId}/returnList/${snapshot.$key}`).subscribe(after => {
            console.log(after);
            after.forEach(element => {
              console.log(element);
              const size = after.length;
              if (this.checkSize <= size && this.updateLater) {
                if (this.sizePast >= 0) {
                  console.log(this.fieldArray.length);
                  console.log(size);
                  this.demoList = [];
                  console.log('im push');
                  if (this.fieldArray.indexOf(element) === -1 && !this.dialogResault) {
                    this.fieldArray.push({
                      productName: element.productName,
                      amount: element.amount,
                      reason: element.reason,
                      status: element.status,
                      supplierName: element.supplierName,
                      TypeOfFillUp: element.TypeOfFillUp,
                      supplierKey: element.supplierKey,
                      productKey: element.productKey
                    });
                  }
                }
              }
            });

            this.checkDone();


            this.checkSize++;
          });
        }
      });
    });
  }

  checkDone() {
    this.fieldArray.forEach(item => {
      if (this.showWarning.indexOf(item) === -1 && item.status) {
        this.showWarning.push(item);
      }
    });
    this.showWarning.forEach(done => {
      this.removeFromFiled(done);
    });

  }

  removeFromFiled(done) {
    if (this.fieldArray.indexOf(done) !== -1) {
      const indexAccept = this.fieldArray.indexOf(done);
      this.fieldArray.splice(indexAccept, 1);
    }

  }

  showDialog() {
    this.display = true;
  }

  changeReason(value) {
    this.reasons.push({value: value});
    this.selectedReason = value;
  }

  changeType(value) {
    this.types.push({value: value});
    this.selectedType = value;
  }

  cahngeReasons() {
    this.openreasons = !this.openreasons;
  }

  cahngeInput() {
    this.open = !this.open;
  }

  changeFromDatespesificSupplier(fromDate) {
    const year = this.getYear(fromDate);
    const month = this.getMonth(fromDate);
    const day = this.getDay(fromDate);

    console.log(year, month, day);
    this.fromDatespesificSupplier = {year: year, month: month, day: day};
  }

  changeToDatespesificSupplier(toDate) {
    const year = this.getYear(toDate);
    const month = this.getMonth(toDate);
    const day = this.getDay(toDate);

    console.log(year, month, day);
    this.toDatespesificSupplier = {year: year, month: month, day: day};

  }

  getYear(date) {
    console.log(date.substring(0, 4));
    return date.substring(0, 4);
  }

  getMonth(date) {
    if (date.substring(5, 6) === '0') {
      return date.substring(6, 7);
    }
    return date.substring(5, 7);

  }

  getDay(date) {
    if (date.substring(8, 9) === '0') {
      return date.substring(9);
    }
    return date.substring(8);

  }


  addFieldValue() {
    this.updateLater = false;
    const key = this.selectedSupplier['key'];
    this.newAttribute.supplierName = this.selectedSupplier['itemName'];
    this.newAttribute.productName = this.selectedProduct['ProductName'];
    this.newAttribute.TypeOfFillUp = this.selectedType;
    this.newAttribute.reason = this.selectedReason;
    this.retProductsToCurrentSupplier = this.af.list(`users/${this.userId}/returnList/${key}`);
    this.retProductsToCurrentSupplier.update(`${this.productKey}`,
      {
        supplierName: this.newAttribute.supplierName,
        productName: this.newAttribute.productName,
        reason: this.newAttribute.reason,
        amount: this.newAttribute.amount,
        TypeOfFillUp: this.newAttribute.TypeOfFillUp,
        status: false
      });
    console.log(this.newAttribute);
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
    this.selectedProduct = null;
    this.selectedReturnDay = '';
    this.selectedSupplier = '';
    console.log(this.fieldArray);
    this.collapse = !this.collapse;
  }


  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  getSpesificSupplier(from, to) {
    let complete = 0;
    this.af.list(`users/${this.userId}/suppliers/${this.supplierKey}/SupplierProducts`).subscribe(products => {
      console.log(products);
      products.forEach(product => {
        this.productKey = product.$key;
        complete += this.getReturnValue(from, to);
      });
    });
    return complete;
  }

  createSpesificSupplier() {
    this.supplierKey = this.spesificSupplier['key'];
    const value = this.getSpesificSupplier(this.fromDatespesificSupplier, this.toDatespesificSupplier);
    console.log(value);
    this.single = [{name: this.spesificSupplier['itemName'], value: value}];
  }

  getReturnValue(from, to) {
    this.returnValue = this.getReturn.getAmount(this.supplierKey, this.productKey, from['year'], from['month'], from['day']
      , to['year'], to['month'], to['day']);
    console.log(this.returnValue);
    return this.returnValue;
  }

  changeProductSelectors() {
    const key = this.selectedSupplier['key'];
    this.productsSuppliers = this.af.list(`users/${this.userId}/suppliers/${key}/SupplierProducts`);
    this.returnsDays = this.af.list(`users/${this.userId}/suppliers/${key}/date`);
  }

  returnDeatil(supplier) {
    console.log(supplier);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'productName': supplier.productName,
        'amount': supplier.amount,
        'reason': supplier.reason,
        'status': supplier.status,
        'supplierName': supplier.supplierName,
        'TypeOfFillUp': supplier.TypeOfFillUp,
        'supplierKey': supplier.supplierKey,
        'productKey': supplier.productKey,
        'domainUserId': this.domainUserId,
      }
    };
    this.router.navigate(['formReturnProduct'], navigationExtras);

  }

  updateProductKeyAndTypeOfFillUp(key, TypeOfFillUp) {
    this.productKey = key;
    this.TypeOfFillUp = TypeOfFillUp;
  }
}

