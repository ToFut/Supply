import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class SupplierPrivateProductsService {
  userId: string;
  constructor(private db: AngularFireDatabase , public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {this.userId = user.uid;
      }
    });
  }
  getProductsFromCurrectSupplier(start, end , SupplierKey , path): FirebaseListObservable<any> {
    console.log(path);
    return this.db.list(path, {
      query: {
        orderByChild: 'ProductName',
        limitToFirst: 20,
        startAt: start,
        endAt: end
      }
    });
  }

}
