import {Component, Input, OnInit} from '@angular/core';
import {DialogModule, MenuItem, Message} from 'primeng/primeng';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {SupplierPersonal} from '../SupplierPersonal';
import {AngularFireAuth} from 'angularfire2/auth';
import {ProductOptions} from '../ProductOptions';
import {FileHolder} from 'angular2-image-upload/lib/image-upload/image-upload.component';
import {DialogEditProductsComponent} from '../dialog-edit-products/dialog-edit-products.component';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ProductsService} from '../products.service';
import {Subject} from 'rxjs/Subject';
import {DeleteProductComponent} from '../delete-product/delete-product.component';
import {isUndefined} from "util";

@Component({
  selector: 'app-show-all-products',
  templateUrl: './show-all-products.component.html',
  styleUrls: ['./show-all-products.component.css']
})
export class ShowAllProductsComponent implements OnInit {

  ProductKey: string;
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
  sumPrice = 0;
  selectedUnitOfMeasure: string;
  selectedsecondTypeOfFillUp: string;
  selectedTypeOfFillUp: string;
  openselectedUnitOfMeasure = true;
  openselectedsecondTypeOfFillUp = true;
  openselectedTypeOfFillUp = true;

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
  secondFillUp = [
    {value: 'פאוץ', viewValue: 'פאוץ'},
    {value: 'שרוול', viewValue: 'שרוול'},
    {value: 'שקיות', viewValue: 'שקיות'},
    {value: 'יחידות', viewValue: 'יחידות'}

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
    {value: 'יחידה', viewValue: 'יחידה'},


  ];
  orderDays = 0;
  UnitOfMeasure: string;
  TypeOfFillUp: string;
  secondTypeOfFillUp: string;
  color = '#26D367';
  depositCchecked = false;
  disabled = false;
  orderType = [];
  orderBefore = 0;
  Completeall = true;
  isLinear = false;
  pricePerUnit = 1;
  UnitInPackaging = 1;
  secondUnitInPackaging = 1;

  constructor(public af: AngularFireDatabase, public afAuth: AngularFireAuth,
              public route: ActivatedRoute, private _formBuilder: FormBuilder, private router: Router,
              private ProductsService: ProductsService) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
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
    this.secondTypeOfFillUp = '';
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
        if ((data['secondTypeOfFillUp'])) {
          console.log('secondTypeOfFillUp');
          this.secondTypeOfFillUp = data['secondTypeOfFillUp'];
        } else {
          this.secondTypeOfFillUp = '';
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
        if ((data['pricePerUnit'])) {

          this.pricePerUnit = data['pricePerUnit'];
          console.log(this.pricePerUnit);

        } else {
          this.pricePerUnit = 1;
        }
        if ((data['UnitInPackaging'])) {

          this.UnitInPackaging = data['UnitInPackaging'];

        } else {
          this.UnitInPackaging = 1;
        }
        if ((data['secondUnitInPackaging'])) {

          this.secondUnitInPackaging = data['secondUnitInPackaging'];
          console.log(this.secondUnitInPackaging);

        } else {
          this.secondUnitInPackaging = 1;
        }
        this.sumPrice = 0;
        if (this.secondUnitInPackaging !== 0) {
          this.sumPrice = this.pricePerUnit * this.UnitInPackaging * this.secondUnitInPackaging;
        } else {
          this.sumPrice = this.pricePerUnit * this.UnitInPackaging;
        }
        this.updateStatus = true;
        this.undifineCheck = true;
      }
    });
    this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/orderInThisDays`).subscribe(val => {
      val.forEach(day => {

        this.af.object
        (`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts/${this.selectProductKey}/MinInInventory`).subscribe(ids => {
          this.days[day['id']] = ids[day['id']];
          this.orderInThatdays[day['id']] = ids[day['id']];
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

      this.dateCurrectSupplirer = val;
    });


    console.log('this is dateCurrectSupplirer : ' + this.dateCurrectSupplirer);
    this.items = this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts`);
    this.ProductsService.getProducts(this.startWith, this.endWith)
      .subscribe(products => this.products = products);


  }

  changeUnitOfMeasure(value) {
    this.unitOFMeasurementOption.push({value: value, viewValue: value});
    this.UnitOfMeasure = value;
  }

  changesecondTypeOfFillUp(value) {
    this.secondFillUp.push({value: value, viewValue: value});
    this.secondTypeOfFillUp = value;
  }

  changeTypeOfFillUp(value) {
    this.options.push({value: value, viewValue: value});
    this.TypeOfFillUp = value;
  }

  funcopenselectedTypeOfFillUp() {
    this.openselectedTypeOfFillUp = !this.openselectedTypeOfFillUp;
  }

  funcopenselectedsecondTypeOfFillUp() {
    this.openselectedsecondTypeOfFillUp = !this.openselectedsecondTypeOfFillUp;
  }

  funcopenselectedUnitOfMeasure() {
    this.openselectedUnitOfMeasure = !this.openselectedUnitOfMeasure;
  }

  BuildProductForAllDB(discount, price, UnitInPackaging,
                       sizeUnitPackaging, ProductName, depositPrice) {

    this.Product.discount = discount;
    this.Product.price = this.sumPrice;
    this.Product.UnitInPackaging = UnitInPackaging;
    this.Product.sizeUnitPackaging = sizeUnitPackaging;
    this.Product.ProductName = ProductName;
    this.Product.deposit = this.depositCchecked;
    this.Product.MinInInventory = this.orderInThatdays;
    this.Product.secondTypeOfFillUp = this.secondTypeOfFillUp;
    this.Product.TypeOfFillUp = this.TypeOfFillUp;
    this.Product.UnitOfMeasure = this.UnitOfMeasure;
    this.Product.sale = this.saleProduct;
    this.Product.depositPrice = depositPrice;
    console.log('key is ' + this.selectProductKey + ' supplier key ' + this.SupplierKey + ' MinInInventory :');
    this.updateItem(this.Product);
    // this.back();
  }

  updatePublicDB() {
    this.itemProduct = this.af.list(`/products`);
    this.af.list(`/products`).subscribe(products => {
      products.forEach(product => {
        const name = product['ProductName'];
        this.existProduct.push(name);
      });
      if (this.existProduct.indexOf(this.Product.ProductName) === -1) {
        this.itemProduct.push({ProductName: this.Product.ProductName});
      }
    });
  }

  updatePrivateUserDB() {
    this.itemProduct = this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/privateProducts`);
  }

  modifyDays(index, orderIndex, value) {
    this.orderInThatdays[index] = value;
    this.days[index] = value;
  }

  updateItem(Product) {
    console.log(this.privateProduct);
    if (this.Product.ProductName !== '') {
      if (this.privateProduct) {
        this.updatePrivateUserDB();
      } else {
        this.updatePublicDB();
      }
    }
    if (!this.updateStatus && !this.undifineCheck) {
      let up = true;

      console.log(this.undifineCheck);
      console.log(this.updateStatus);
      console.log(this.selectProductKey);
      try {
        this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts`).push(Product);
        this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts/${Product}`).subscribe(newProduct => {
          console.log(newProduct);
        });

      } catch (err) {
        if (this.days.indexOf(undefined) !== -1) {
          alert('לא מילאת מצבה להשלמה');
          this.Completeall = false;
        }
        return;
      } finally {
        this.associateProduct();

      }
    } else {
      console.log(this.undifineCheck);
      console.log(this.updateStatus);
      console.log(this.selectProductKey);
      try {
        this.items.update(this.selectProductKey, Product);
        this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts/${Product}`).subscribe(newProduct => {
          console.log(newProduct);
        });

      } catch (err) {
        if (this.days.indexOf(undefined) !== -1) {
          alert('לא מילאת מצבה להשלמה');
          this.Completeall = false;
        }
        return;
      } finally {
        this.associateProduct();

      }

    }
  }

  deleteItem() {
    this.item.remove();
    this.associateProduct();
  }

  onKeyName(ProductName: string) {
    console.log(ProductName);
    this.Product.ProductName = ProductName;

  }

  onKeyUnitInPackaging(UnitInPackaging: number) {
    console.log(UnitInPackaging);

    this.Product.UnitInPackaging = UnitInPackaging;
    this.calcPrice();
  }

  onKeyDepositPrice(depositPrice: number) {
    console.log(depositPrice);

    this.Product.depositPrice = depositPrice;

  }

  onKeyPrice(Price: number) {
    console.log(Price);

    this.Product.pricePerUnit = Price;
    this.calcPrice();

  }

  onKeySizeUnitPackaging(sizeUnitPackaging: number) {

    this.Product.sizeUnitPackaging = sizeUnitPackaging;

  }

  onKeyDiscount(Discount: number) {

    this.Product.discount = Discount;

  }

  onKeyUnitOfMeasure(UnitOfMeasure: string) {
    console.log(UnitOfMeasure);

    this.Product.UnitOfMeasure = UnitOfMeasure;

  }

  onKeySecondSizeUnitPackaging(secondUnitInPackaging: number) {
    console.log(secondUnitInPackaging);

    this.Product.secondUnitInPackaging = secondUnitInPackaging;
    this.calcPrice();

  }

  calcPrice() {
    this.sumPrice = 0;
    if (!isUndefined(this.Product.pricePerUnit) && !isUndefined(this.Product.UnitInPackaging) && !isUndefined(this.Product.secondUnitInPackaging)) {
      this.sumPrice = this.Product.pricePerUnit * this.Product.UnitInPackaging * this.Product.secondUnitInPackaging;
    } else if (isUndefined(this.Product.pricePerUnit) && isUndefined(this.Product.UnitInPackaging) && !isUndefined(this.Product.secondUnitInPackaging)) {
      this.sumPrice = this.pricePerUnit * this.UnitInPackaging * this.Product.secondUnitInPackaging;
    } else if (isUndefined(this.Product.pricePerUnit) && !isUndefined(this.Product.UnitInPackaging) && isUndefined(this.Product.secondUnitInPackaging)) {
      this.sumPrice = this.pricePerUnit * this.Product.UnitInPackaging * this.secondUnitInPackaging;
    } else if (!isUndefined(this.Product.pricePerUnit) && isUndefined(this.Product.UnitInPackaging) && isUndefined(this.Product.secondUnitInPackaging)) {
      this.sumPrice = this.Product.pricePerUnit * this.UnitInPackaging * this.secondUnitInPackaging;
    } else if (isUndefined(this.Product.pricePerUnit) && !isUndefined(this.Product.UnitInPackaging) && !isUndefined(this.Product.secondUnitInPackaging)) {
      this.sumPrice = this.pricePerUnit * this.Product.UnitInPackaging * this.Product.secondUnitInPackaging;
    } else if (!isUndefined(this.Product.pricePerUnit) && !isUndefined(this.Product.UnitInPackaging) && isUndefined(this.Product.secondUnitInPackaging)) {
      this.sumPrice = this.Product.pricePerUnit * this.Product.UnitInPackaging * this.secondUnitInPackaging;
    } else if (!isUndefined(this.Product.pricePerUnit) && isUndefined(this.Product.UnitInPackaging) && !isUndefined(this.Product.secondUnitInPackaging)) {
      this.sumPrice = this.Product.pricePerUnit * this.UnitInPackaging * this.Product.secondUnitInPackaging;
    } else {
      this.sumPrice = this.pricePerUnit * this.UnitInPackaging * this.secondUnitInPackaging;
    }
  }

  dateChange(Inventory: number, day: number, key: string) {
    this.dateProduct = this.af.list(`users/${this.userId}/suppliers/
    ${this.SupplierKey}/SupplierProducts/${this.selectProductKey}/MinInInventory`);
    this.dateProduct.push({day: day, inventory: Inventory});
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
    if (this.Completeall) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'userId': this.userId,
          'SupplierKey': this.SupplierKey,
        }
      };
      this.router.navigate(['correctSupplierProducts'], navigationExtras);
    }
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
