import {Component, OnInit, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {MatchSupplierService} from '../match-supplier.service';
import {AsyncPipe} from '@angular/common';

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
  supplierFounded: FirebaseObjectObservable<any[]>;
  count: number;
  objLoaderStatus: boolean;

   constructor(public matchSupplier: MatchSupplierService) {
    this.objLoaderStatus = false;
     console.log(this.objLoaderStatus);
     this.count = 0;

   }

  async ngOnInit() {
    await this.matchSupplier.getFirebaseObject().then(retData => {
        console.log('retdata is : ' + retData);
        console.log('ngOnInit');
        retData.forEach(data => {
          this.supplierFounded  = data;
          console.log('data is : ' + data);
          this.count ++;
          this.objLoaderStatus = true;
        });
        console.log(this.supplierFounded);

    });
    console.log('this is ' + this.objLoaderStatus);
  }
}
