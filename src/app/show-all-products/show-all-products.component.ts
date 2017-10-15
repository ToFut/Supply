import {Component, Input, OnInit} from '@angular/core';
import {DialogModule, MenuItem, Message} from 'primeng/primeng';
import {MdDialog, MdDialogRef} from '@angular/material';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {SupplierPersonal} from '../SupplierPersonal';
import {AngularFireAuth} from 'angularfire2/auth';
import {ProductOptions} from '../ProductOptions';
import {FileHolder} from 'angular2-image-upload/lib/image-upload/image-upload.component';
import {DialogEditProductsComponent} from '../dialog-edit-products/dialog-edit-products.component';
import {ActivatedRoute} from '@angular/router';
import { OnChanges } from '@angular/core';


@Component({
  selector: 'app-show-all-products',
  templateUrl: './show-all-products.component.html',
  styleUrls: ['./show-all-products.component.css']
})
export class ShowAllProductsComponent implements OnInit {

  ProductKey:  string;
  SupplierKey: string;
  key: string;
  items: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any[]>;
  userChoiseAboutsecuringy: string;
  productsInCurrectSupplier: FirebaseObjectObservable<any[]>;
  path: string;
  selectProductKey: string;
  userId: string;
  securing = [
    'public',
    'private',
  ];
  publicProductRef: FirebaseListObservable<any[]>;
  public Product = new ProductOptions();


  constructor(public dialogRef: MdDialogRef<any>, public af: AngularFireDatabase, public afAuth: AngularFireAuth,
              public dialog: MdDialog , public route: ActivatedRoute) {
    this.afAuth.authState.subscribe(user => {
      if (user) {this.userId = user.uid;
      }
    });
    route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.SupplierKey = params['supplierKey'];
      this.selectProductKey = params['selectProductKey'];
    });

  }

  editProduct() {
    const dialogRef = this.dialog.open(DialogEditProductsComponent , {
        width: '600px',
        height: '600px'
      }
    );
    dialogRef.componentInstance.ProductKey = this.key;
  }

  ngOnInit(): void {
    this.item = this.af.object(`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts/${this.selectProductKey}`);
    this.items = this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts`);
    console.log('key is constratcor ' + this.userId + 'this supplier is ' +
      this.SupplierKey + 'this ProductKey is ' + this.selectProductKey);

  }
  OnChanges(): void {
    if (this.userChoiseAboutsecuringy === 'public' ) {
      this.item = this.af.object(`/products/${this.selectProductKey}`);

    } else {
      this.updatePrivateUserDB(this.Product);
      this.item = this.af.object(`users/${this.userId}/suppliers/${this.SupplierKey}/privateProducts/${this.selectProductKey}`);

    }
  }
  BuildProductForAllDB (ProductName: string, ProductNumber: number, UnitOfMeasure: string, price: number,
                        discount: number, UnitInPackaging: number, MinInInventory: number, model: string,
                        comments: string) {

    this.Product.ProductName = ProductName;
    this.Product.ProductNumber = ProductNumber;
    this.Product.UnitOfMeasure = UnitOfMeasure;
    this.Product.price = price;
    this.Product.discount = discount;
    this.Product.UnitInPackaging = UnitInPackaging;
    this.Product.MinInInventory = MinInInventory;
    this.Product.model = model;
    this.Product.comments = comments;

    console.log('key is ' + this.ProductKey + ' supplier key ' + this.SupplierKey + 'user id : ' + this.userId);
    console.log('BuildProductForAllCurectSupplier');
    this.updateItem(this.Product);
  }
  updatePublicDB(ProductName , model) {
    this.publicProductRef = this.af.list(`/products`);
    this.publicProductRef.push({ProductName: ProductName , model: model});
  }
  updatePrivateUserDB(Product) {
    this.publicProductRef = this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/privateProducts`);
    this.publicProductRef.push( Product);
  }
  updateItem(Product) {
    this.items.push( Product);
    this.closeDialog();
  }

  deleteItem() {
    this.items.remove();
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
