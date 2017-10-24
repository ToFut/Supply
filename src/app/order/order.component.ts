import {Component, OnInit, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {MatchSupplierService} from '../match-supplier.service';
import {AsyncPipe} from '@angular/common';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class OrderComponent implements OnInit {
  viewDate: Date = new Date();
  today: number = Date.now();
  public day = this.viewDate.getDay();
  supplierFounded = [];
  count: number;
  objLoaderStatus: boolean;
  userId: string;

   constructor(public matchSupplier: MatchSupplierService , public af: AngularFireDatabase , public afAuth: AngularFireAuth,
               private router: Router) {
     this.afAuth.authState.subscribe(user => {
       if (user) {
         this.userId = user.uid;
       }
     });
     this.objLoaderStatus = false;
     console.log(this.objLoaderStatus);
     this.count = 0;

   }

  async ngOnInit() {
    await this.matchSupplier.searchItem().then(retData => {
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
      console.log('this is ' + this.objLoaderStatus);
  }
  orderFromMe(supplierKey) {
     console.log(supplierKey.$ref.key);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'supplierKey': supplierKey.$ref.key,
        'userId': this.userId
      }
    };
    console.log(supplierKey);
    this.router.navigate(['orderCurrect'], navigationExtras);

  }

}
