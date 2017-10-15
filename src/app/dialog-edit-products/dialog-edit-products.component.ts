import {Component, Input, OnInit} from '@angular/core';
import {DialogModule} from 'primeng/primeng';
import {MdDialogRef} from '@angular/material';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {SupplierPersonal} from '../SupplierPersonal';
import {AngularFireAuth} from 'angularfire2/auth';
import {ProductOptions} from '../ProductOptions';
import {FileHolder} from 'angular2-image-upload/lib/image-upload/image-upload.component';

@Component({
  selector: 'app-dialog-edit-products',
  templateUrl: './dialog-edit-products.component.html',
  styleUrls: ['./dialog-edit-products.component.css']
})
export class DialogEditProductsComponent implements OnInit {
  ProductKey:  string;
  SupplierKey: string;
  productFirebaseRef: FirebaseListObservable<any[]>;
  userChoiseAboutsecuringy: string;
  selectProductKey: string;
  securing = [
    'public',
    'private',
  ];
  userId: string;
  public Product = new ProductOptions();



  constructor(public dialogRef: MdDialogRef<any> , public af: AngularFireDatabase , public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {this.userId = user.uid;
      }
    });

  }
  ngOnInit(): void {
    this.productFirebaseRef = this.af.list(`/products`);
    console.log('key is ' + this.ProductKey + ' supplier key ' + this.SupplierKey + 'user id : ' + this.userId);
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
    console.log('BuildProductForAllDB');
    this.updateItem(this.Product);
  }
  updateItem(Product) {
    this.productFirebaseRef.push( Product);
    console.log('updated ');
    this.closeDialog();
  }
  deleteItem() {
    this.productFirebaseRef.remove();
    this.closeDialog();
  }
  closeDialog() {
    this.dialogRef.close();
  }
  imageFinishedUploading(file: FileHolder) {
    console.log(JSON.stringify(file.serverResponse));
  }
  uploadStateChange() {
  }

  imageRemoved(file: FileHolder) {
    // do some stuff with the removed file.
  }
}
