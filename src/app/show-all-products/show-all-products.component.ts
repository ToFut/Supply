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
import {isUndefined} from 'util';
import {CheckExistProductWithAnotherSuppliersService} from './services/check-exist-product-with-another-suppliers.service';

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
  openSecondContactForm = true;
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
  color = 'primary';
  depositCchecked = false;
  disabled = false;
  orderType = [];
  orderBefore = 0;
  Completeall: boolean;
  isLinear = false;
  price = 0;
  UnitInPackaging = 1;
  secondUnitInPackaging = 1;
  unitDesposit = 0;
  secondeDesposit = 0;
  secondDespoitOpen = true;
  secondPrice = 0;
  fillDesposit = 0;
  openTypeOfFillUpDespoit = true;
  openUnitDespoit = true;
  constOrdering = [];

  constructor(public afAuth: AngularFireAuth, public checkWith: CheckExistProductWithAnotherSuppliersService,
              public route: ActivatedRoute, private _formBuilder: FormBuilder, public  router: Router,
              private ProductsService: ProductsService, public af: AngularFireDatabase) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
    this.saleProduct = 0;
    this.updateStatus = false;
    this.undifineCheck = false;
    this.unitDesposit = 0;
    this.secondeDesposit = 0;
    this.fillDesposit = 0;
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
    this.Completeall = true;
    this.af.list(`users/${this.userId}/Types`).subscribe(types => {
      types.forEach(type => {
        this.options.push({value: type.$value, viewValue: type.$value});
      });
    });
    this.item = this.af.object(`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts/${this.selectProductKey}`);
    this.af.list
    (`users/${this.userId}/suppliers/${this.SupplierKey}/orderInThisDays`).subscribe(val => {
      console.log(val);
      val.forEach(ele => {
        console.log(ele);
      });
    });

    this.item.subscribe(data => {
      if (this.selectProductKey !== undefined && !this.undifineCheck) {
        if ((data['TypeOfFillUp'])) {
          console.log('TypeOfFillUp');
        } else {
          this.TypeOfFillUp = '';
        }
        if (this.unitOFMeasurementOption.indexOf(data['TypeOfFillUp']) === -1) {
          this.changeTypeOfFillUp(data['TypeOfFillUp']);
        } else {
          this.TypeOfFillUp = data['TypeOfFillUp'];
        }

        if ((data['secondTypeOfFillUp'])) {
          console.log('secondTypeOfFillUp');
          if (this.unitOFMeasurementOption.indexOf(data['secondTypeOfFillUp']) === -1) {
            this.changesecondTypeOfFillUp(data['secondTypeOfFillUp']);
          } else {
            this.secondTypeOfFillUp = data['secondTypeOfFillUp'];
          }
        } else {
          this.secondTypeOfFillUp = '';
        }

        if ((data['unitDesposit'])) {
          console.log('unitDesposit');

          this.unitDesposit = data['unitDesposit'];
        } else {
          this.unitDesposit = 0;
        }
        if ((data['secondeDesposit'])) {
          console.log('secondeDesposit');

          this.secondeDesposit = data['secondeDesposit'];
        } else {
          this.secondeDesposit = 0;
        }
        if ((data['fillDesposit'])) {
          console.log('fillDesposit');

          this.fillDesposit = data['fillDesposit'];
        } else {
          this.fillDesposit = 0;
        }
        if ((data['UnitOfMeasure'])) {
          console.log('UnitOfMeasure');
          if (this.unitOFMeasurementOption.indexOf(data['UnitOfMeasure']) === -1) {
            this.changeUnitOfMeasure(data['UnitOfMeasure']);
          } else {
            this.UnitOfMeasure = data['UnitOfMeasure'];
          }
        } else {
          this.UnitOfMeasure = '';
        }
        if ((data['sale'])) {
          console.log('sale');

          this.saleProduct = data['sale'];
        } else {
          this.saleProduct = 0;
        }

        if ((data['price'])) {

          this.price = data['price'];
          console.log(this.price);

        } else {
          this.price = 1;
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
        // if (this.secondUnitInPackaging !== 0) {
        //   this.sumPrice = this.pricePerUnit * this.UnitInPackaging * this.secondUnitInPackaging;
        // } else {
        //   this.sumPrice = this.pricePerUnit * this.UnitInPackaging;
        // }
        this.sumPrice = this.price * this.UnitInPackaging;
        this.sumPrice += this.fillDesposit + this.unitDesposit * this.UnitInPackaging;
        this.sumPrice = Number(this.sumPrice.toFixed(2));
        this.updateStatus = true;
        this.calcSecondPrice();
        this.undifineCheck = true;
      }
    });
    this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/orderInThisDays`).subscribe(val => {
      val.forEach(day => {

        this.af.object
        (`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts/${this.selectProductKey}/MinInInventory`).subscribe(ids => {
          this.days[day['id']] = ids[day['id']];
          this.orderInThatdays[day['id']] = ids[day['id']];
        });
      });
      this.af.list
      (`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts/${this.selectProductKey}/constOrdering`).subscribe(orders => {
        orders.forEach(order => {
          this.constOrdering[order.$key] = order.$value;
        });

      });

      this.dateCurrectSupplirer = val;
    });


    console.log('this is dateCurrectSupplirer : ' + this.dateCurrectSupplirer);
    this.items = this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts`);
    this.ProductsService.getProducts(this.startWith, this.endWith)
      .subscribe(products => this.products = products);


  }

  addConstatntOrdering(id) {
    console.log(id);
  }

  changeDespoitTypeOfFillUp() {
    this.openTypeOfFillUpDespoit = !this.openTypeOfFillUpDespoit;
  }

  changeDespoitUnit() {
    this.openUnitDespoit = !this.openUnitDespoit;
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

  checkTypeFillUp(value) {
    let inside = false;
    this.af.list(`users/${this.userId}/Types`).subscribe(types => {
      types.forEach(type => {
        if (type.$value === value && type.$value !== '') {
          inside = true;
        }
      });
    });
    if (!inside) {
      this.af.list(`users/${this.userId}/Types`).push(value);
    }

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

  BuildProductForAllDB(UnitInPackaging,
                       sizeUnitPackaging, ProductName) {
    this.calcPrice();
    // this.Product.discount = discount;
    this.Product.constOrdering = this.constOrdering;
    this.Product.priceSum = Number(this.sumPrice.toFixed(2).toString());
    this.Product.UnitInPackaging = UnitInPackaging;
    this.Product.sizeUnitPackaging = sizeUnitPackaging;
    this.Product.ProductName = ProductName;
    this.Product.deposit = this.depositCchecked;
    this.Product.MinInInventory = this.orderInThatdays;
    this.Product.secondTypeOfFillUp = this.secondTypeOfFillUp;
    this.Product.TypeOfFillUp = this.TypeOfFillUp;
    this.Product.unitDesposit = this.unitDesposit;
    this.Product.secondeDesposit = this.secondeDesposit;
    this.Product.fillDesposit = this.fillDesposit;
    this.Product.UnitOfMeasure = this.UnitOfMeasure;
    this.Product.sale = this.saleProduct;
    // this.Product.depositPrice = depositPrice;
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
    this.Completeall = true;
    console.log(this.privateProduct);
    if (this.Product.ProductName !== '') {
      if (this.privateProduct) {
        this.updatePrivateUserDB();
      } else {
        this.updatePublicDB();
      }
    }
    if (!this.updateStatus && !this.undifineCheck) {
      const up = true;

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

    this.Product.UnitInPackaging = Number(UnitInPackaging);
    this.calcPrice();
  }

  onKeyDepositPrice(depositPrice: number) {
    console.log(depositPrice);

    this.Product.depositPrice = Number(depositPrice);

  }

  onKeyDespoitUnit(UnitDespoit) {
    this.unitDesposit = Number(UnitDespoit);
    this.calcPrice();


  }

  onKeyDespoitsecondTypeOfFillUp(UnitDespoit) {
    this.secondeDesposit = Number(UnitDespoit);

  }

  onKeyDespoitFillUp(UnitDespoit) {
    this.fillDesposit = Number(UnitDespoit);
    this.calcPrice();

  }

  onKeyPricePerUnit(Price: number) {
    console.log(Price);

    this.Product.price = Number(Price);
    this.price = Price;
    this.calcPrice();

  }

  onKeyPriceSum(Price: number) {
    console.log(Price);

    this.Product.priceSum = Number(Price);
    this.sumPrice = Price;
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
    this.UnitOfMeasure = this.UnitOfMeasure;

  }

  onKeySecondSizeUnitPackaging(secondUnitInPackaging: number) {

    this.secondUnitInPackaging = secondUnitInPackaging;
    this.Product.secondUnitInPackaging = secondUnitInPackaging;
    this.calcSecondPrice();

  }

  calcPrice() {
    this.sumPrice = 0;
    if (!isUndefined(this.Product.price) && !isUndefined(this.Product.UnitInPackaging)) {
      this.sumPrice = this.Product.price * this.Product.UnitInPackaging;
    } else if (isUndefined(this.Product.price) && !isUndefined(this.Product.UnitInPackaging)) {
      this.sumPrice = this.price * this.Product.UnitInPackaging;
    } else if (!isUndefined(this.Product.price) && isUndefined(this.Product.UnitInPackaging)) {
      this.sumPrice = this.Product.price * this.UnitInPackaging;
    } else {
      this.sumPrice = this.price * this.UnitInPackaging;
    }
    this.sumPrice += Number((Number(this.fillDesposit) + Number(this.unitDesposit) * Number(this.UnitInPackaging)).toFixed(2));

  }

  dateChange(Inventory: number, day: number, key: string) {
    this.dateProduct = this.af.list(`users/${this.userId}/suppliers/
    ${this.SupplierKey}/SupplierProducts/${this.selectProductKey}/MinInInventory`);
    this.dateProduct.push({day: day, inventory: Inventory});
  }

  checkWithAnotherSuppliers(name) {
    //  this.checkWith.getSupplier(name);
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

  calcSecondPrice() {
    this.secondPrice = this.secondUnitInPackaging * this.price;
  }
}
