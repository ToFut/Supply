import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Injectable()
export class ProductsService {
  constructor(private db: AngularFireDatabase) { }
  getProducts(start, end): FirebaseListObservable<any> {
    return this.db.list('/products', {
      query: {
        orderByChild: 'ProductName',
        limitToFirst: 20,
        startAt: start,
        endAt: end
      }
    });
  }

}
