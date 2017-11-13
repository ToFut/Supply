import {Component, OnInit, ChangeDetectionStrategy, OnChanges, Directive} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {MatchSupplierService} from '../match-supplier.service';
import {AsyncPipe} from '@angular/common';
import {NavigationExtras, Router} from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],

})
export class OrderComponent implements OnInit {
  route: any;
  viewDate: Date = new Date();
  today: number = Date.now();
  public day = this.viewDate.getDay();
  count: number;
  items: FirebaseListObservable<any[]>;
  keys = [];
  objLoaderStatus = true;
  userId: string;
  SupplierFounded: FirebaseListObservable<any[]>;


  constructor(public matchSupplier: MatchSupplierService , public afAuth: AngularFireAuth, public af: AngularFireDatabase,
               private router: Router) {

    console.log('constructor');

      this.afAuth.authState.subscribe(user => {
       if (user) {
         this.userId = user.uid;
       }

     });
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

    });

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
     console.log(supplier.$ref.key);

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
