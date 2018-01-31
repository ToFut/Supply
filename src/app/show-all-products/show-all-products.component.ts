import {Component, Input, OnInit} from '@angular/core';
import {DialogModule, MenuItem, Message} from 'primeng/primeng';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {SupplierPersonal} from '../SupplierPersonal';
import {AngularFireAuth} from 'angularfire2/auth';
import {ProductOptions} from '../ProductOptions';
import {FileHolder} from 'angular2-image-upload/lib/image-upload/image-upload.component';
import {DialogEditProductsComponent} from '../dialog-edit-products/dialog-edit-products.component';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import { OnChanges } from '@angular/core';
import {FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import {ProductsService} from '../products.service';
import {Subject} from 'rxjs/Subject';
import {DeleteProductComponent} from '../delete-product/delete-product.component';

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
  itemProduct: FirebaseListObservable<any[]>;
  dateCurrectSupplirer = [];
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
  existProduct = [];
  orderInThatdays = [];
  publicProductRef: FirebaseListObservable<any[]>;
  public Product = new ProductOptions();
  publicProduct = false;
  privateProduct = false;
  showhidepregnant: boolean;
  startWith = new Subject();
  endWith = new Subject();
  products: any[];
  lastKeypress = 0;
  productName = '';
  MinInIvatory: FirebaseListObservable<any[]>;
  updateStatus: boolean;
  undifineCheck: boolean;
  saleProduct: number;
  sales = [
    {value: 100, viewValue: '1+1'},
    {value: 90, viewValue: 'השני ב90%'},
    {value: 80, viewValue: 'השני ב80%'},
    {value: 70, viewValue: 'השני ב70%'},
    {value: 60, viewValue: 'השני ב60%'},
    {value: 50, viewValue: 'השני ב50%'},
    {value: 40, viewValue: 'השני ב40%'},
    {value: 30, viewValue: 'השני ב30%'},
    {value: 20, viewValue: 'השני ב20%'},
    {value: 10, viewValue: 'השני ב10%'},
    {value: 0, viewValue: 'ללא מבצע'},



  ];
  options = [
    {value: 'ארגז', viewValue: 'ארגז'},
    {value: 'קרטון', viewValue: 'קרטון'},
    {value: 'יחידות', viewValue: 'יחידות'},
    {value: 'שקיות', viewValue: 'שקיות'}

  ];
  unitOFMeasurementOption = [
    {value: 'ליטר', viewValue: 'ליטר'},
    {value: 'קג', viewValue: 'קג'},
    {value: 'גר', viewValue: 'גר'},
    {value: 'מל', viewValue: 'מל'},
    {value: 'מל', viewValue: 'סמק'},
    {value: 'יחידה', viewValue: 'יחידה'},


  ];
  orderDays = 0;
  UnitOfMeasure: string;
  TypeOfFillUp: string;
  color = 'primary';
  depositCchecked = false;
  disabled = false;
  orderType = [];
  orderBefore = 0;
  isLinear = false;


  constructor( public af: AngularFireDatabase, public afAuth: AngularFireAuth,
               public route: ActivatedRoute , private _formBuilder: FormBuilder , private router: Router ,
              private ProductsService: ProductsService ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {this.userId = user.uid;
      }
    });
    this.saleProduct = 0;
    this.updateStatus = false;
    this.undifineCheck = false;
    route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.SupplierKey = params['SupplierKey'];
      this.path = params['path'];
      this.selectProductKey = params['selectProductKey'];

    });

  }

  ngOnInit(): void {
    this.itemProduct = this.af.list(`/products`);
    this.TypeOfFillUp = '';
    this.depositCchecked = false;
    this.saleProduct = 0;
    this.UnitOfMeasure = '';
    this.item = this.af.object(`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts/${this.selectProductKey}`);
    this.af.list
    (`users/${this.userId}/suppliers/${this.SupplierKey}/orderInThisDays`).subscribe(val => {
      console.log(val);
      val.forEach(ele => {
        console.log(ele);
      });
      /*
            this.orderDays = val['orderInThisDays'];
            val['orderInThisDays'].forEach( ids => {
              console.log(ids);
            });
      */
    });

    this.item.subscribe(data => {
      if (this.selectProductKey !== undefined && !this.undifineCheck) {
        console.log('inside');
        if ((data['TypeOfFillUp'])) {
          console.log('TypeOfFillUp');
          this.TypeOfFillUp = data['TypeOfFillUp'];
        } else {
          this.TypeOfFillUp = '';
        }
        if ((data['deposit'])) {
          console.log('deposit');

          this.depositCchecked = data['deposit'];
        } else {
          this.depositCchecked = false;
        }
        if ((data['UnitOfMeasure'])) {
          console.log('UnitOfMeasure');

          this.UnitOfMeasure = data['UnitOfMeasure'];
        } else {
          this.UnitOfMeasure = '';
        }
        if ((data['sale'])) {
          console.log('sale');

          this.saleProduct = data['sale'];
        } else {
          this.saleProduct = 0;
        }
        this.updateStatus = true;
        this.undifineCheck = true;
      }
      console.log(this.selectProductKey !== undefined);
      console.log(!this.undifineCheck);
    console.log(this.selectProductKey);
    console.log(this.orderType);
    console.log(this.TypeOfFillUp);
    console.log(this.UnitOfMeasure);
    console.log(this.updateStatus);
    });
    this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/orderInThisDays`).subscribe( val => {
      console.log(val);
      val.forEach( day => {
        console.log(day['orderIn']);

        this.af.object
        (`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts/${this.selectProductKey}/MinInInventory`).subscribe( ids => {
          console.log(ids);
          this.days[day['id']] = ids[day['id']] ;
/*
        this.af.object
        (`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts/${this.selectProductKey}/MinInInventory/${day['id']}`).
        remove();
        this.af.list
        (`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts/${this.selectProductKey}/MinInInventory`).
        set(`${day['id']}` , this.days[day['orderIn']]);
        */
        });
      });

      console.log(val);
      this.dateCurrectSupplirer = val;
    });


    console.log('this is dateCurrectSupplirer : ' + this.dateCurrectSupplirer);
    this.items = this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts`);
    this.ProductsService.getProducts(this.startWith, this.endWith)
      .subscribe(products => this.products = products);


  }
  BuildProductForAllDB (discount , price, UnitInPackaging,
                         sizeUnitPackaging, ProductName , depositPrice) {

    this.Product.discount = discount;
    this.Product.price = price;
    this.Product.UnitInPackaging = UnitInPackaging;
    this.Product.sizeUnitPackaging = sizeUnitPackaging;
    this.Product.ProductName = ProductName;
    console.log(this.depositCchecked);
    this.Product.deposit = this.depositCchecked;
    this.Product.MinInInventory = this.orderInThatdays;
    console.log(this.Product.MinInInventory);
    this.Product.TypeOfFillUp = this.TypeOfFillUp;
    this.Product.UnitOfMeasure = this.UnitOfMeasure;
    this.Product.sale = this.saleProduct;
    this.Product.depositPrice = depositPrice;
    console.log('key is ' + this.selectProductKey + ' supplier key ' + this.SupplierKey + ' MinInInventory :' );
    this.updateItem(this.Product);
    this.back();
  }
  updatePublicDB() {
    this.itemProduct = this.af.list(`/products`);
    this.af.list(`/products`).subscribe( products => {
      products.forEach( product => {
        const name = product['ProductName'];
          this.existProduct.push(name);
      });
      if (this.existProduct.indexOf(this.Product.ProductName) === -1) {
        this.itemProduct.push({ProductName: this.Product.ProductName });
      }
    });
  }
  updatePrivateUserDB() {
    this.itemProduct = this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/privateProducts`);
  }
  modifyDays(index , orderIndex , value) {
  console.log(value);
  console.log(index);
    console.log(orderIndex);
    this.orderInThatdays[index] = value;
  this.days[index] = value;
  console.log(this.days);
    console.log(this.orderInThatdays[orderIndex]);
  }
  updateItem(Product) {
    console.log(this.privateProduct);
    if (this.Product.ProductName !== '') {
      if (this.privateProduct) {
        this.updatePrivateUserDB();
      }else {
        this.updatePublicDB();
      }
    }
    if (!this.updateStatus && !this.undifineCheck ) {
      console.log(this.undifineCheck);
      console.log(this.updateStatus);
      console.log(this.selectProductKey);
      this.items.push( Product);

    } else {
      console.log(this.undifineCheck);
      console.log(this.updateStatus);
      console.log(this.selectProductKey);
      this.items.update(this.selectProductKey , Product);

      this.items.update(this.selectProductKey , Product);
    }
    this.associateProduct();
  }

  deleteItem() {
    this.item.remove();
    this.associateProduct();
  }

  onKeyName (ProductName: string) {
    console.log(ProductName);
    this.Product.ProductName = ProductName;

  }
  onKeyUnitInPackaging (UnitInPackaging: number) {
    console.log(UnitInPackaging);

    this.Product.UnitInPackaging = UnitInPackaging;

  }
  onKeyDepositPrice(depositPrice: number) {
    console.log(depositPrice);

    this.Product.depositPrice = depositPrice;

  }
  onKeyPrice (Price: number) {
    console.log(Price);

    this.Product.price = Price;

  }
  onKeySizeUnitPackaging (sizeUnitPackaging: number) {

    this.Product.sizeUnitPackaging = sizeUnitPackaging;

  }

  onKeyDiscount (Discount: number) {

    this.Product.discount = Discount;

  }
  onKeyUnitOfMeasure (UnitOfMeasure: string) {
    console.log(UnitOfMeasure);

    this.Product.UnitOfMeasure = UnitOfMeasure;

  }
  dateChange(Inventory: number , day: number , key: string) {
    this.dateProduct = this.af.list(`users/${this.userId}/suppliers/
    ${this.SupplierKey}/SupplierProducts/${this.selectProductKey}/MinInInventory`);
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
  associateProduct() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'userId': this.userId,
        'SupplierKey': this.SupplierKey,
      }
    };
    this.router.navigate(['correctSupplierProducts'], navigationExtras);
  }

  back() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'userId': this.userId,
        'SupplierKey': this.SupplierKey,
      }
    };
    this.router.navigate(['correctSupplierProducts'], navigationExtras);
  }


  changename(productName) {
    this.productName = productName;
    this.products = null;
  }

}
