import {Injectable, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AssociateProductToSupplierService implements OnInit {
  Product: FirebaseObjectObservable<any[]>;


  constructor(private db: AngularFireDatabase , public afAuth: AngularFireAuth , public af: AngularFireDatabase) {
  }
  ngOnInit(): void {
  }
  getThisProductInsideThisSupplier(productsInCurrectSupplier , key) {
    this.Product = this.af.object(`/products/${key}`);
    productsInCurrectSupplier.set(this.Product);
  }

}
