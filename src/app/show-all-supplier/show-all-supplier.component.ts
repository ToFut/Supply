import {Component, Input, OnInit} from '@angular/core';
import {DialogModule} from 'primeng/primeng';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {SupplierPersonal} from '../SupplierPersonal';
import {AngularFireAuth} from 'angularfire2/auth';
import {ProductOptions} from '../ProductOptions';
import {FileHolder} from 'angular2-image-upload/lib/image-upload/image-upload.component';
import {DialogEditProductsComponent} from '../dialog-edit-products/dialog-edit-products.component';
import {DialogComponent} from '../dialog/dialog.component';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-show-all-supplier',
  templateUrl: './show-all-supplier.component.html',
  styleUrls: ['./show-all-supplier.component.scss']
})
export class ShowAllSupplierComponent implements OnInit {

  key: string;
  infoSupply: FirebaseObjectObservable<any[]>;
  productInCurrectSupply: FirebaseListObservable<any[]>;
  removeDays: FirebaseObjectObservable<any[]>;
  dayBefor: FirebaseObjectObservable<any[]>;

  userId: string;
  public Product = new ProductOptions();


  constructor( public af: AngularFireDatabase, public afAuth: AngularFireAuth,
               private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {this.userId = user.uid; }
    });
  }

  ngOnInit(): void {
    let  count ;
    this.infoSupply = this.af.object(`users/${this.userId}/suppliers/${this.key}`);
    console.log(this.infoSupply);
    this.infoSupply.$ref.orderByKey().equalTo('OrderDays').on( 'value' , snapshot => {
      console.log(snapshot.val());
    });
      this.infoSupply.$ref.orderByKey().equalTo('date').on( 'child_added' , snapshot => {
      for (count in snapshot.val()) {
        console.log(count);
        this.removeDays = this.af.object(`users/${this.userId}/reciveDateSuppliers/${count}/${this.key}`);
        console.log(this.removeDays);
      }
    });

  }
  deleteItem() {
    this.infoSupply.remove();

  }
  associateProduct() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'userId': this.userId,
        'supplierKey': this.key
      }
    };
    this.router.navigate(['correctSupplierProducts'], navigationExtras);

  }
  editSupplierPage() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'supplierKey': this.key,
      }
    };
    this.router.navigate(['dialogSupplier'], navigationExtras);

  }

}
