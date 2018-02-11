import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Router} from '@angular/router';
import {CalcSumService} from './services/calc-sum.service';
import {CalcAmountService} from './services/calc-amount.service';
import {SuppliersDeatilService} from './services/suppliers-deatil.service';

@Component({
  selector: 'app-satistics',
  templateUrl: './satistics.component.html',
  styleUrls: ['./satistics.component.css']
})
export class SatisticsComponent implements OnInit {
  userId: string;
  selectedSupplier: string;
  selectedProduct: string;
  list = [];
  productsSuppliers: FirebaseListObservable<any[]>;
  suppliers: FirebaseListObservable<any[]>;
  supplierKey: string;
  productKey: string;
  TypeOfFillUp: string;
  amount = 0;
  finalPrice = 0;
  avgPrice = 0;
  fromDate = {};
  toDate = {};
  fromDatespesificSupplier = {};
  toDatespesificSupplier = {};
  fromDateAll = {};
  toDateAll = {};
  fromCompareSuppliers = {};
  toCompareSuppliers = {};
  Fdate = {};
  Tdate = {};
  ProductName: string;
  subUser = [];
  spesificSupplier: string;
  spesificProductsKey: string;
  itemProduct: FirebaseListObservable<any[]>;
  // Radar
  public radarChartLabels: string[];
  public radarChartData: any;
  public radarChartType: string;
  CalcAmountService;
  single1 = [];
  single2 = [];
  compareSupplier1: string;
  compareSupplier2: string;
  view: any[] = [700, 400];

  // options
  showLegend = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  // options
  gradient = false;
  compareSupplierView = [];
  // line, area
  autoScale = true;
  constructor(public calcSum: CalcSumService, public calcAmount: CalcAmountService,
              public supplierDetails: SuppliersDeatilService,
              public afAuth: AngularFireAuth, public af: AngularFireDatabase, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        console.log(this.userId);
        this.af.list(`/users/${this.userId}/buyersId`).subscribe(data => {
          console.log(data);
          console.log(data);
          data.forEach(element => {
            if (element.$value) {
              this.subUser.push(element.$key);
            }
          });
          console.log(this.subUser);
        });
      }
    });
    this.radarChartLabels = ['כמות ', 'סהכ עלות בשקלים', 'מחיר ממוצע'];
    this.radarChartData = [
      {data: [this.amount, this.finalPrice, this.avgPrice], label: 'Series A'},
    ];
    this.radarChartType = 'bar';
  }

  onSelect(event) {
    console.log(event);
  }

  // events
  changeFromDate(fromDate) {
    const year = this.getYear(fromDate);
    const month = this.getMonth(fromDate);
    const day = this.getDay(fromDate);

    console.log(year, month, day);
    this.Fdate = {year: year, month: month, day: day};
    this.fromDate = {year: year, month: month, day: day};
  }

  changeToDate(toDate) {
    const year = this.getYear(toDate);
    const month = this.getMonth(toDate);
    const day = this.getDay(toDate);
    console.log(year, month, day);

    this.Tdate = {year: year, month: month, day: day};
    this.toDate = {year: year, month: month, day: day};
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

  changeFromDatefromCompareSupplier(fromDate) {
    const year = this.getYear(fromDate);
    const month = this.getMonth(fromDate);
    const day = this.getDay(fromDate);

    console.log(year, month, day);
    this.fromCompareSuppliers = {year: year, month: month, day: day};

  }

  changeFromDatetoCompareSupplier(toDate) {
    const year = this.getYear(toDate);
    const month = this.getMonth(toDate);
    const day = this.getDay(toDate);

    console.log(year, month, day);
    this.toCompareSuppliers = {year: year, month: month, day: day};

  }

  changeFromDateAll(fromDate) {
    const year = this.getYear(fromDate);
    const month = this.getMonth(fromDate);
    const day = this.getDay(fromDate);

    console.log(year, month, day);
    this.fromDateAll = {year: year, month: month, day: day};

  }

  changeToDateAll(toDate) {
    const year = this.getYear(toDate);
    const month = this.getMonth(toDate);
    const day = this.getDay(toDate);

    console.log(year, month, day);
    this.toDateAll = {year: year, month: month, day: day};

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

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
    this.suppliers = this.af.list(`users/${this.userId}/suppliers`);
    this.suppliers.subscribe(data => {
      {
        data.forEach(elem => {
          this.list.push({itemName: elem.name, key: elem.$key});
          console.log(this.list);

        });
      }
    });
  }

  changeProductSelectors() {
    this.supplierKey = this.selectedSupplier['key'];
    this.productsSuppliers = this.af.list(`users/${this.userId}/suppliers/${this.supplierKey}/SupplierProducts`);
  }

  updateProductKeyAndTypeOfFillUp(key, TypeOfFillUp, name) {
    this.productKey = key;
    this.TypeOfFillUp = TypeOfFillUp;
    this.ProductName = name;

  }


  getSum(): number {
    const ret = this.calcSum.getSum(this.supplierKey, this.productKey, this.amount);
    console.log(ret);
    return ret;
  }

  calcAll(all) {
    let count = 0;
    all.forEach(value => {
      count += value['value'];
    });
    return count;
  }

  compareTwoSupplier() {
    this.supplierKey = this.compareSupplier1['key'];
    let view = [];
    let allToghether = this.getSpesificSupplier(this.fromCompareSuppliers, this.toCompareSuppliers);
    let sum = this.calcAll(allToghether);
    if (this.compareSupplierView.indexOf(this.compareSupplier1['itemName'] === -1)) {
      view.push({name: this.compareSupplier1['itemName'], value: sum});
    }
    this.supplierKey = this.compareSupplier2['key'];
    allToghether = this.getSpesificSupplier(this.fromCompareSuppliers, this.toCompareSuppliers);
    sum = this.calcAll(allToghether);
    if (this.compareSupplierView.indexOf(this.compareSupplier2['itemName'] === -1)) {
      view.push({name: this.compareSupplier2['itemName'], value: sum});
    }
    this.compareSupplierView = view;
  }

  detrmineRadar() {
    this.getAmount(this.fromDate, this.toDate);
    this.radarChartData = [
      {data: [this.amount, Number(this.finalPrice), Number(this.avgPrice)], label: this.ProductName},
    ];
    this.toDate = {};
    this.fromDate = {};
    this.changeDates();
  }

  getAmount(from, to) {
    this.amount = this.calcAmount.getAmount(this.supplierKey, this.productKey, from['year'], from['month'], from['day']
      , to['year'], to['month'], to['day']);
    this.avgPrice = this.getSum();
    this.finalPrice = this.avgPrice * this.amount;
  }

  changeDates() {
    console.log('this.fromDate', this.fromDate, ' toDate ', this.toDate);
    this.fromDate = this.Fdate;
    this.toDate = this.Tdate;
    console.log('this.fromDate', this.Fdate, ' toDate ', this.Tdate);
    console.log('this.fromDate', this.fromDate, ' toDate ', this.toDate);

  }

  getAllSupplierNames() {
    const complete = [];
    const supplierSum = this.supplierDetails.getNames(this.fromDateAll['year'], this.fromDateAll['month'], this.fromDateAll['day']
      , this.toDateAll['year'], this.toDateAll['month'], this.toDateAll['day']);
    supplierSum.forEach(supplier => {
      complete.push({name: supplier.name, value: supplier.sum});
    });
    this.single2 = complete;
    console.log(this.single2);

    /*
        this.suppliersNames.forEach( supplier => {
          this.pieChartLabels.push(supplier['name']);
        });
    */

  }

  createSpesificSupplier() {
    this.supplierKey = this.spesificSupplier['key'];
    this.single1 = this.getSpesificSupplier(this.fromDatespesificSupplier, this.toDatespesificSupplier);
    console.log(this.single1);
  }

  getSpesificSupplier(from, to) {
    const complete = [];
    this.af.list(`users/${this.userId}/suppliers/${this.supplierKey}/SupplierProducts`).subscribe(products => {
      console.log(products);
      products.forEach(product => {
        this.productKey = product.$key;
        this.getAmount(from, to);
        console.log(product['ProductName'], this.finalPrice);
        complete.push({name: product['ProductName'], value: this.finalPrice});
      });
    });
    return complete;
  }
}
