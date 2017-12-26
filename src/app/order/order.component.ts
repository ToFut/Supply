import {Component, OnInit, ChangeDetectionStrategy, OnChanges, Directive} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {MatchSupplierService} from '../match-supplier.service';
import {AsyncPipe} from '@angular/common';
import {NavigationExtras, Router} from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],

})
export class OrderComponent implements OnInit {
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



  constructor(public matchSupplier: MatchSupplierService , public afAuth: AngularFireAuth, public af: AngularFireDatabase,
               private router: Router) {

    console.log('constructor');

      this.afAuth.authState.subscribe(user => {
       if (user) {
         this.userId = user.uid;
       }
        this. orderAccept = this.af.list(`acceptOrders/${this.userId}/${this.year}/${this.month}/${this.dayInMonth}`);
        this.orderAccept.subscribe( data => {
          console.log(data);
          data.forEach( snapshot => {
            console.log(snapshot.$key);
            console.log(snapshot.$value);
            if (snapshot.$value === true) {
              this.KEYSacceptedOrders.push(snapshot.$key);
            } else {
              this.KEYSNONacceptedOrders.push(snapshot.$key);
            }
          });
        });

     });
    if (this.month === 12) {
      this.month = 1;
    } else {
      this.month += 1;
    }


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
   checkForSupplier() {
    this.matchSupplier.pushSupplier('order').then((data) => {
      this.items = data;
      this.objLoaderStatus = false;
      console.log(this.items);
      console.log(this.objLoaderStatus);
      return this.items;

    }).then(value => {
      value.forEach( snapshot => {
        console.log(this.KEYSacceptedOrders.includes(snapshot['$ref']['key']));

        if (this.KEYSacceptedOrders.includes(snapshot['$ref']['key']) && this.acceptedChecker.indexOf(snapshot['$ref']['key']) === -1 ) {
          this.showAccepted.push(snapshot);
          this.acceptedChecker.push(snapshot['$ref']['key']);
        } else if ( this.NONeacceptedChecker
            .indexOf(snapshot['$ref']['key']) === -1 && this.acceptedChecker.indexOf(snapshot['$ref']['key']) === -1) {
          this.NONeacceptedChecker.push(snapshot['$ref']['key']);
          this.showNONAccepted.push(snapshot);

        }
        console.log(this.showAccepted);
        console.log(this.showNONAccepted);


      });
    });

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
  orderFromMe(supplier ) {

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
