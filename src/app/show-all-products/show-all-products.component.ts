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
import {ProductsService} from '../products.service';
import {Subject} from 'rxjs/Subject';

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
  item: FirebaseListObservable<any[]>;
  itemProduct: FirebaseListObservable<any[]>;
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
  publicProduct = false;
  privateProduct = false;
  showhidepregnant: boolean;
  startWith = new Subject();
  endWith = new Subject();
  products: any[];
  lastKeypress = 0;
  productName = '';
  options = [
    {value: 'ארגז', viewValue: 'ארגז'},
    {value: 'קרטון', viewValue: 'קרטון'},
    {value: 'יחידות', viewValue: 'יחידות'},
    {value: 'שקיות', viewValue: 'שקיות'}

  ];

  TypeOfFillUp: string;

  isLinear = false;


  constructor(public dialogRef: MdDialogRef<any>, public af: AngularFireDatabase, public afAuth: AngularFireAuth,
              public dialog: MdDialog , public route: ActivatedRoute , private _formBuilder: FormBuilder ,
              private ProductsService: ProductsService) {
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
    this.itemProduct = this.af.list(`/products`);
    this.item = this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts/${this.selectProductKey}`);
     this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/date`).subscribe(data => {
       this.dateCurrectSupplirer = data;
     });
    console.log('this is dateCurrectSupplirer : ' + this.dateCurrectSupplirer);

    console.log(this.dateCurrectSupplirer);
    this.items = this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts`);

    this.ProductsService.getProducts(this.startWith, this.endWith)
      .subscribe(products => this.products = products);


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
    this.Product.TypeOfFillUp = this.TypeOfFillUp;
    console.log(this.days);
    console.log(this.TypeOfFillUp);


    console.log('key is ' + this.ProductKey + ' supplier key ' + this.SupplierKey + ' MinInInventory :' );
    this.updateItem(this.Product);
  }
  updatePublicDB() {
    this.itemProduct = this.af.list(`/products`);
    this.itemProduct.push({ProductName: this.Product.ProductName });
  }
  updatePrivateUserDB() {
    this.itemProduct = this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/privateProducts`);
    this.itemProduct.push( this.Product);
  }
  updateItem(Product) {
    console.log(this.privateProduct);
    if (this.privateProduct) {
      this.updatePrivateUserDB();

    }else {
      this.updatePublicDB();
    }
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
    console.log(ProductName);
    this.Product.ProductName = ProductName;

  }
  onKeyUnitInPackaging (UnitInPackaging: number) {
    console.log(UnitInPackaging);

    this.Product.UnitInPackaging = UnitInPackaging;

  }
  onKeyPrice (Price: number) {
    console.log(Price);

    this.Product.price = Price;

  }
  onKeyUnitOfMeasure (UnitOfMeasure: string) {
    console.log(UnitOfMeasure);

    this.Product.UnitOfMeasure = UnitOfMeasure;

  }
  dateChange(Inventory: number , day: number , key: string) {
    this.dateProduct = this.af.list(`users/${this.userId}/suppliers/
    ${this.SupplierKey}/SupplierProducts/${this.selectProductKey}/Inventory`);
    this.dateProduct.push({day : day , inventory : Inventory });
  }
  search($event) {
    if ($event.timeStamp - this.lastKeypress > 200) {
      const q = $event.target.value;
      this.startWith.next(q);
      this.endWith.next(q + '\uf8ff');
    }
    this.lastKeypress = $event.timeStamp;
  }

  changename(productName) {
    this.productName = productName;
    this.products = null;
  }

}
