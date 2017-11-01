import {Component, Input, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {MdDialog } from '@angular/material';
import {AngularFireAuth} from 'angularfire2/auth';
import {Subject} from 'rxjs/Subject';
import {ProductsService} from '../products.service';
import {DialogEditProductsComponent} from '../dialog-edit-products/dialog-edit-products.component';
import {ShowAllProductsComponent} from '../show-all-products/show-all-products.component';
import {ActivatedRoute, NavigationExtras} from '@angular/router';
import {AssociateProductToSupplierService} from '../associate-product-to-supplier.service';
import {ProductOptions} from '../ProductOptions';
import {SupplierPrivateProductsService} from '../supplier-private-products.service';
import {AddProductsAllDBComponent} from '../../..//src/app/add-products-all-db/add-products-all-db.component';
import {ShowProductComponent} from '../show-product/show-product.component';

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

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase , public dialog: MdDialog ,
              private ProductsService: ProductsService , route: ActivatedRoute ,
              private AssociateProductToSupplierService: AssociateProductToSupplierService ,
              private SupplierPrivateProductsService: SupplierPrivateProductsService) {
    this.afAuth.authState.subscribe(user => {
      if (user) {this.userId = user.uid;
        this.productsInCurrectSupplier = this.af.list(`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts`);
        console.log(this.SupplierKey);
      }
    });
    route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.SupplierKey = params['supplierKey'];
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
    const dialogRef = this.dialog.open(AddProductsAllDBComponent , {
      width: '300px',
      height: '600px'
    } );
    dialogRef.componentInstance.userId = this.userId;
    dialogRef.componentInstance.SupplierKey = this.SupplierKey;
    console.log('supplier key ' + this.SupplierKey + ' user id : ' + this.userId + ' this selectProdduct key is ' );
    dialogRef.componentInstance.path = `users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts`;
  }
  openDialogShowProducts(selectProductKey) {
    const dialogRef = this.dialog.open(ShowProductComponent , {
      width: '300px',
      height: '600px'
      }
    );
    dialogRef.componentInstance.userId = this.userId;
    dialogRef.componentInstance.SupplierKey = this.SupplierKey;
    dialogRef.componentInstance.selectProductKey = selectProductKey;
    console.log('supplier key ' + this.SupplierKey + ' user id : ' + this.userId + ' this selectProdduct key is ' + selectProductKey);

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
