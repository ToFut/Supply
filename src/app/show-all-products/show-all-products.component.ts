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
import {FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import { MdStepper } from '@angular/material';
import {element} from "protractor";

@Component({
  selector: 'app-show-all-products',
  templateUrl: './show-all-products.component.html',
  styleUrls: ['./show-all-products.component.scss']
})
export class ShowAllProductsComponent implements OnInit {

  ProductKey:  string;
  SupplierKey: string;
  key: string;
  items: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any[]>;
  dateCurrectSupplirer: any[];
  dateProduct: FirebaseListObservable<any[]>;
  userChoiseAboutsecuringy: string;
  path: string;
  selectProductKey: string;
  userId: string;
  securing = [
    'public',
    'private',
  ];
  days = [];
  publicProductRef: FirebaseListObservable<any[]>;
  public Product = new ProductOptions();
  color = 'green';
  checked = false;
  disabled = false;
  showhidepregnant: boolean;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ThirdFormGroup: FormGroup;


  constructor(public dialogRef: MdDialogRef<any>, public af: AngularFireDatabase, public afAuth: AngularFireAuth,
              public dialog: MdDialog , public route: ActivatedRoute , private _formBuilder: FormBuilder) {
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
     this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/date`).subscribe(data => {
       this.dateCurrectSupplirer = data;
     });
    console.log('this is dateCurrectSupplirer : ' + this.dateCurrectSupplirer);

    console.log(this.dateCurrectSupplirer);
    this.items = this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts`);
    console.log('this is items : ' + this.items);
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
  BuildProductForAllDB (/*ProductName: string, UnitOfMeasure: string, price: number,
                         UnitInPackaging: number, MinInInventory: number*/) {

    /*this.Product.ProductName = ProductName;
    this.Product.UnitOfMeasure = UnitOfMeasure;
    this.Product.price = price;
    this.Product.UnitInPackaging = UnitInPackaging;
    this.Product.MinInInventory = MinInInventory;
*/
    this.Product.MinInInventory = this.days;
    console.log('key is ' + this.ProductKey + ' supplier key ' + this.SupplierKey + ' MinInInventory :' );
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
  onKeyName (ProductName: string) {
    this.Product.ProductName = ProductName;

  }
  onKeyUnitInPackaging (UnitInPackaging: number) {
    this.Product.UnitInPackaging = UnitInPackaging;

  }
  onKeyPrice (Price: number) {
    this.Product.price = Price;

  }
  onKeyUnitOfMeasure (UnitOfMeasure: string) {
    this.Product.UnitOfMeasure = UnitOfMeasure;

  }
  dateChange(Inventory: number , day: number , key: string) {
    this.dateProduct = this.af.list(`users/${this.userId}/suppliers/
    ${this.SupplierKey}/SupplierProducts/${this.selectProductKey}/Inventory`);
    this.dateProduct.push({day : day , inventory : Inventory });
  }
}
