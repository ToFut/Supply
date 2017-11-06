import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {
  userId: string;
  items: FirebaseListObservable<any[]>;
  SupplierKey: string;
  selectProductKey: string;
  product: FirebaseObjectObservable<any[]>;

  constructor(public af: AngularFireDatabase, public afAuth: AngularFireAuth , public route: ActivatedRoute) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
    route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.SupplierKey = params['supplierKey'];
      this.selectProductKey = params['selectProductKey'];
    });

  }

  ngOnInit() {
    this.product = this.af.object(`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts/${this.selectProductKey}`);
  }

}
