import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {toPromise} from 'rxjs/operator/toPromise';
import {isSuccess} from "@angular/http/src/http_utils";
import {promise} from "selenium-webdriver";
import {Observable} from "rxjs/Observable";


@Injectable()
export class MatchSupplierService  {
  viewDate: Date = new Date();
  today: number = Date.now();
  orderBeforDay: number;
  day = this.viewDate.getDay();
  userId: string;
  search: FirebaseListObservable<any[]>;
  list = [];
  listOfMatchSupplier: object;
  supplierFounded: any;
  public recive = [];
  public check: FirebaseObjectObservable<any[]>;
  public order = [];


  constructor(public af: AngularFireDatabase , public afAuth: AngularFireAuth ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }
  async sortSupplier(SupplierOrRecive: string): Promise<any> {
    let  count ;
    let  orderBeforDay: any;
    orderBeforDay = [];
    let  reciveBeforDay: any;
    reciveBeforDay = [];

    if (SupplierOrRecive === 'recive') {
      await this.af.list(`/users/${this.userId}/reciveDateSuppliers/`)
        .$ref.orderByKey().equalTo(this.day.toString()).on('child_added', await function (snapshot) {
        console.log(snapshot.val());
        for (count in snapshot.val()) {
          console.log(count);
          reciveBeforDay.push(count);
        }
        console.log('im here in recive');
      });
      console.log('im here in recive');
      return reciveBeforDay;


    }
    if (SupplierOrRecive === 'order') {
      this.af.list(`/users/${this.userId}/orderDateSuppliers/`)
        .$ref.orderByKey().equalTo(this.day.toString()).on('child_added', function (snapshot) {
          console.log(snapshot.val());
          for (count in snapshot.val()) {
            console.log(count);
            reciveBeforDay.push(count);
          }
           console.log('im here in order');
         });
      return reciveBeforDay;

    }

  }
   async pushSupplier(way: string): Promise<any[]>  {
    this.recive = [];
    this.order = [];
     console.log('return From sortSupplier order ');

           return await this.sortSupplier(way).then( keys => {
             console.log('im here in pushSupplier');
           console.log(keys);
           let key;
             key = {};
             keys.map( oneKey => {
                this.order.push(this.af.object(`/users/${this.userId}/suppliers/${oneKey}`));
               console.log(oneKey);

             });
             console.log(this.order);
             return this.order;

          } );

   }
}
