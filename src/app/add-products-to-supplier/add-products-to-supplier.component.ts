import {Component, Input, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {MdDialog } from '@angular/material';
import {AngularFireAuth} from 'angularfire2/auth';
import {Subject} from 'rxjs/Subject';
import {ProductsService} from '../products.service';
import {DialogEditProductsComponent} from '../dialog-edit-products/dialog-edit-products.component';
import {ShowAllProductsComponent} from '../show-all-products/show-all-products.component';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {AssociateProductToSupplierService} from '../associate-product-to-supplier.service';
import {ProductOptions} from '../ProductOptions';
import {SupplierPrivateProductsService} from '../supplier-private-products.service';
import {AddProductsAllDBComponent} from '../../..//src/app/add-products-all-db/add-products-all-db.component';
import {ShowProductComponent} from '../show-product/show-product.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-products-to-supplier',
  templateUrl: './add-products-to-supplier.component.html',
  styleUrls: ['./add-products-to-supplier.component.css']
})
export class AddProductsToSupplierComponent implements OnInit {

  SupplierKey: string;
  lastKeypress = 0;
  public result: any;
  userId: string;
  public productsInCurrectSupplier: FirebaseListObservable<any[]>;
  public item: FirebaseObjectObservable<any[]>;
  startWith = new Subject();
  endWith = new Subject();
  products: any[];
  public Product = new ProductOptions();
  path: string;
  stateCtrl: FormControl;
  text: string;
  supplierName: FirebaseObjectObservable<any[]>;
  results: string[];


  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase , public dialog: MdDialog ,
              private ProductsService: ProductsService , route: ActivatedRoute ,
              private AssociateProductToSupplierService: AssociateProductToSupplierService ,
              private SupplierPrivateProductsService: SupplierPrivateProductsService, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {this.userId = user.uid;
        this.productsInCurrectSupplier = this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts`);
        this.supplierName = this.af.object(`users/${this.userId}/suppliers/${this.SupplierKey}`);
      }
    });
    route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.SupplierKey = params['SupplierKey'];
    });

  }
  ngOnInit() {
    this.SupplierPrivateProductsService.getProductsFromCurrectSupplier(this.startWith, this.endWith , this.SupplierKey ,
      `users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts` )
      .subscribe(products => this.products = products);


  }
  showListOfAllDB (): any[] {
    return this.products;
  }
  searchItem(UserInputType: string) {
    this.productsInCurrectSupplier = this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts`, {
      query: {
        orderByChild: 'type',
        equalTo: UserInputType
      }
    });
  }
  addItem() {
    this.ProductAssociationToProvide();
  }
  deleteEverything() {
    this.productsInCurrectSupplier.remove();

  }
  ProductAssociationToProvide() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'userId': this.userId,
        'SupplierKey': this.SupplierKey,
        'path': `users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts`
      }
    };
    this.router.navigate(['showCurrentSupplierProducts'], navigationExtras);
  }

  openDialogShowProducts(selectProductKey) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'userId': this.userId,
        'SupplierKey': this.SupplierKey,
        'selectProductKey': selectProductKey,
        'path': `users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts`
      }
    };
    this.router.navigate(['showCurrentSupplierProducts'], navigationExtras);
  }

  addThisProductToCurrectSupplier(selectProductKey , ProductName ) {
    this.openDialogShowProducts(selectProductKey);

  }

  search($event) {
    if ($event.timeStamp - this.lastKeypress > 200) {
      const q = $event.target.value;
      this.startWith.next(q);
      this.endWith.next(q + '\uf8ff');
    }
    this.lastKeypress = $event.timeStamp;
  }
}
