import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';


@Injectable()
export class MatchSupplierService  {
  viewDate: Date = new Date();
  today: number = Date.now();
  orderBeforDay: number;
  day = this.viewDate.getDay();
  userId: string;
  flag: boolean;
  list: any;
  supplierFounded: any;
  public recive = [];
  public check: FirebaseObjectObservable<any[]>;
  public order = [];


  constructor(public af: AngularFireDatabase , public afAuth: AngularFireAuth ) {
    this.list = [];
    this.flag = false;
    this.supplierFounded = [];

  }
  async sortSupplier(SupplierOrRecive: string) {
    let  count ;
    let  orderBeforDay: any;
    orderBeforDay = [];
    let  reciveBeforDay: any;
    reciveBeforDay = [];
    this.list = [];

    if (SupplierOrRecive === 'recive') {
      await this.af.list(`/users/${this.userId}/reciveDateSuppliers/`)
        .$ref.orderByKey().equalTo(this.day.toString()).on('child_added', snapshot => {
          for (count in snapshot.val()) {
            console.log(count);
            reciveBeforDay.push(count);
            this.list.push(count);
            this.supplierFounded.push(this.af.object(`/users/${this.userId}/suppliers/${count}`));
            this.flag = true;
            console.log(this.list);
          }
          console.log('im here in order');
        });
      return this.supplierFounded;

    }

    if (SupplierOrRecive === 'order') {
      await this.af.list(`/users/${this.userId}/orderDateSuppliers/`)
        .$ref.orderByKey().equalTo(this.day.toString()).on('child_added', snapshot => {
          for (count in snapshot.val()) {
            console.log(count);
            reciveBeforDay.push(count);
            this.list.push(count);
            console.log(this.af.object(`/users/${this.userId}/suppliers/${count}`));
            console.log(this.userId);
            this.supplierFounded.push(this.af.object(`/users/${this.userId}/suppliers/${count}`));
            this.flag = true;
            console.log(this.list);
          }
           console.log('im here in order');
         });
      return this.supplierFounded;

    }

  }
   async pushSupplier(way: string , userId )  {
    this.userId = userId;
     console.log(this.userId);
     this.recive = [];
    this.order = [];
     this.supplierFounded = [];
    console.log('return From sortSupplier order ');
     console.log('im here in pushSupplier');
     console.log(this.list);
     console.log(this.supplierFounded);

     return await this.sortSupplier(way);
  }
}
