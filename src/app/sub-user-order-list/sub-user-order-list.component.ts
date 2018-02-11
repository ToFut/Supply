import {Component, OnInit, ChangeDetectionStrategy, OnChanges, Directive} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {MatchSupplierService} from '../match-supplier.service';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-sub-user-order-list',
  templateUrl: './sub-user-order-list.component.html',
  styleUrls: ['./sub-user-order-list.component.scss']
})
export class SubUserOrderListComponent implements OnInit {
  route: any;
  viewDate: Date = new Date();
  time = new Date().getHours();
  today: number = Date.now();
  public day = this.viewDate.getDay();
  count: number;
  items: FirebaseListObservable<any[]>;
  keys = [];
  objLoaderStatus = true;
  userId: string;
  SupplierFounded: FirebaseListObservable<any[]>;
  orderAccept: FirebaseListObservable<any[]>;
  dayInMonth = this.viewDate.getDate();
  month = this.viewDate.getMonth();
  year = this.viewDate.getFullYear();
  KEYSacceptedOrders = [];
  KEYSNONacceptedOrders = [];
  showAccepted = [];
  showNONAccepted = [];
  show = true;
  acceptedChecker = [];
  NONeacceptedChecker = [];
  allSupplierOrder: boolean;
  noneSupplierOrder: boolean;
  noneAnyOrders: boolean;
  warning: Array<boolean>;
  orderLimitTime: string;


  constructor(public matchSupplier: MatchSupplierService, public afAuth: AngularFireAuth, public af: AngularFireDatabase,
              private router: Router , route: ActivatedRoute) {

    this.warning = [];
    this.orderLimitTime = this.viewDate.toTimeString();
    route.queryParams.subscribe(params => {
      this.userId = params['domainUserId'];

    });
    if (this.month === 12) {
      this.month = 1;
    } else {
      this.month += 1;
    }


    this.orderAccept = this.af.list(`acceptOrders/${this.userId}/${this.year}/${this.month}/${this.dayInMonth}`);
    this.orderAccept.subscribe(data => {
      console.log(data);
      data.forEach(snapshot => {
        console.log(snapshot);
        this.warning[snapshot.$key] = snapshot.$value;
        if (snapshot.$value === true) {
          if (this.KEYSNONacceptedOrders.indexOf(snapshot.$key) !== -1) {
            const indexNONEAccept = this.KEYSNONacceptedOrders.indexOf(snapshot.$key);
            this.KEYSNONacceptedOrders.splice(indexNONEAccept, 1);
          }
          console.log(snapshot.$key);
          this.KEYSacceptedOrders.push(snapshot.$key);
        } else if (snapshot.$value === false) {
          if (this.KEYSacceptedOrders.indexOf(snapshot.$key) !== -1) {
            const indexAccept = this.KEYSacceptedOrders.indexOf(snapshot.$key);
            this.KEYSacceptedOrders.splice(indexAccept, 1);
          }
          this.KEYSNONacceptedOrders.push(snapshot.$key);
        }
      });
    });
    console.log('this.KEYSacceptedOrders', this.KEYSacceptedOrders);
    console.log('this.KEYSNONacceptedOrders', this.KEYSNONacceptedOrders);


    setTimeout(() => {
      this.checkForSupplier();

      setTimeout(() => {
        this.checkForSupplier();
        setTimeout(() => {
          this.checkForSupplier();

        }, 1000);


      }, 1000);
    }, 1000);

  }

  getWarning(key) {
    if (this.KEYSNONacceptedOrders.indexOf(key.$ref.key) > -1) {
      return true;
    }
    return false;
  }

  checkForSupplier() {

    this.matchSupplier.pushSupplier('order', this.userId).then((data) => {
      this.items = data;
      this.objLoaderStatus = false;
      console.log(this.items);
      console.log(this.objLoaderStatus);
      return this.items;

    }).then(value => {
      value.forEach(snapshot => {
        if (this.KEYSacceptedOrders.indexOf(snapshot['$ref']['key']) !== -1 && this.acceptedChecker.indexOf(snapshot['$ref']['key']) === -1) {
          this.showAccepted.push(snapshot);
          this.acceptedChecker.push(snapshot['$ref']['key']);
        } else if (this.NONeacceptedChecker
            .indexOf(snapshot['$ref']['key']) === -1 && this.acceptedChecker.indexOf(snapshot['$ref']['key']) === -1 && this.KEYSacceptedOrders.indexOf(snapshot['$ref']['key']) === -1) {
          this.NONeacceptedChecker.push(snapshot['$ref']['key']);
          this.showNONAccepted.push(snapshot);
        }
      });
    });
    if (this.showNONAccepted.length === 0) {
      this.noneSupplierOrder = true;
    } else {
      this.noneSupplierOrder = false;
    }
    if (this.showAccepted.length === 0) {
      this.allSupplierOrder = true;
    } else {
      this.allSupplierOrder = false;
    }
    if (!this.allSupplierOrder && this.noneSupplierOrder) {
      this.noneAnyOrders = true;
    } else {
      this.noneAnyOrders = false;
    }

  }

  doCheck() {

  }

  ngOnInit() {

    /*
          this.matchSupplier.searchItem().then(retData => {
           console.log(retData);
           console.log('ngOnInit');
               retData.forEach(obj => {
                 console.log(obj);
                 this.supplierFounded.push(this.af.object(`/users/${this.userId}/suppliers/${obj}`));
                 this.count ++;
                 this.objLoaderStatus = true;
               });
             });
           console.log(this.supplierFounded);
           console.log('this is ' + this.objLoaderStatus);*/
  }

  orderFromMe(supplier) {

    const navigationExtras: NavigationExtras = {
      queryParams: {
        'supplierKey': supplier.$ref.key,
        'userId': this.userId,
      }
    };
    console.log(supplier);
    this.router.navigate(['orderCurrect'], navigationExtras);

  }

  checkIt() {
    console.log(this.items);
  }


}
