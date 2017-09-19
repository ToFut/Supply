import {Component, Input, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {MdDialog } from '@angular/material';
import {AngularFireAuth} from 'angularfire2/auth';
import {Subject} from 'rxjs/Subject';
import {ProductsService} from '../products.service';
import {DialogEditProductsComponent} from '../dialog-edit-products/dialog-edit-products.component';
import {ShowAllProductsComponent} from '../show-all-products/show-all-products.component';

@Component({
  selector: 'app-add-products-all-db',
  templateUrl: './add-products-all-db.component.html',
  styleUrls: ['./add-products-all-db.component.css']
})
export class AddProductsAllDBComponent implements OnInit {

  @Input() key;
  lastKeypress = 0;
  public result: any;
  userId: string;
  public items: FirebaseListObservable<any[]>;
  startWith = new Subject();
  endWith = new Subject();
  products: any[];
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase , public dialog: MdDialog ,
              private ProductsService: ProductsService) {
    this.items = this.af.list(`/products`);
  }
  ngOnInit() {
    this.ProductsService.getProducts(this.startWith, this.endWith)
      .subscribe(products => this.products = products);
  }
  showListOfAllDB (): any[] {
    return this.products;
  }
  searchItem(UserInputType: string) {
    this.items = this.af.list(`/products`, {
      query: {
        orderByChild: 'type',
        equalTo: UserInputType
      }
    });
  }


  addItem() {
    const newRefToNewProduct = this.items.push({name : ''});
    const newProductKey = newRefToNewProduct.key;
    this.openDialog(newProductKey);
  }
  deleteEverything() {
    this.items.remove();

  }
  openDialog(key) {
    console.log(key);
    const dialogRef = this.dialog.open(ShowAllProductsComponent , {
      width: '600px',
      height: '600px'
    }
    );
    dialogRef.componentInstance.key = key;
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
