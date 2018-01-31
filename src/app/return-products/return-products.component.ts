import {Component, NgModule, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Router} from '@angular/router';
import {element} from "protractor";
@Component({
  selector: 'app-return-products',
  templateUrl: './return-products.component.html',
  styleUrls: ['./return-products.component.css']
})

export class ReturnProductsComponent implements OnInit {
  fieldArray = [];
  newAttribute: any = {};
  selectedType = [];
  list = [];
  userId: string;
  selectedSupplier: string;
  selectedProduct: FirebaseObjectObservable<any[]>
  selectedReturnDay: string;
  returnsDays: FirebaseListObservable<any[]>;
  suppliers: FirebaseListObservable<any[]>;
  productsSuppliers: FirebaseListObservable<any[]>;
  returnProductsToSuppliers = [];
  retProductsToCurrentSupplier: FirebaseListObservable<any[]>;
  demoList = [];
  productKey: string;
  TypeOfFillUp: string;
  sizePast = 1;
  checkSize = 0;
  updateLater = true;



  typeOption = [
  ];
  constructor( public af: AngularFireDatabase , public afAuth: AngularFireAuth , private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });

  }
  ngOnInit(): void {
    this.suppliers = this.af.list(`users/${this.userId}/suppliers`);
    this.suppliers.subscribe( data => {
      {
        data.forEach( elem => {
          console.log(elem.name);
          this.list.push({itemName: elem.name, key: elem.$key});
          console.log(this.list);

        });
      }
    });
    this.af.list(`users/${this.userId}/returnList`).subscribe( data => {
      console.log(data);
      data.forEach( snapshot => {
          console.log(snapshot.$key);

          this.af.list(`users/${this.userId}/returnList/${snapshot.$key}`).subscribe(after => {
            console.log(after);

            after.forEach(element => {
              console.log(element);
              const size = after.length;
              console.log(this.checkSize);
              console.log(size);

              if ( this.checkSize <= size && this.updateLater) {
                if (this.sizePast >= 0) {
                console.log(this.fieldArray.length);
                console.log(size);
                  this.demoList = [];
                  console.log('im push');
                  this.fieldArray.push({
                    productName: element.productName, amount: element.amount,
                    reason: element.reason, returnDay: element.returnDay, supplierName: element.supplierName,
                    TypeOfFillUp: element.TypeOfFillUp
                  });

                }
              }
            });
            console.log(this.checkSize);

            this.checkSize ++;
          });

      });


    });
  }
  changeProductSelectors() {
    const key = this.selectedSupplier['key'];
    this.productsSuppliers = this.af.list(`users/${this.userId}/suppliers/${key}/SupplierProducts`);
    this.returnsDays = this.af.list(`users/${this.userId}/suppliers/${key}/date`);
  }
  updateProductKeyAndTypeOfFillUp (key, TypeOfFillUp) {
    this.productKey = key;
    this.TypeOfFillUp = TypeOfFillUp;
  }
  addFieldValue() {
    this.updateLater = false;
    const key = this.selectedSupplier['key'];
    this.newAttribute.supplierName = this.selectedSupplier['itemName'];
    this.newAttribute.productName = this.selectedProduct['ProductName'];
    this.newAttribute.returnDay = this.selectedReturnDay['itemName'];
    this.newAttribute.TypeOfFillUp = this.TypeOfFillUp;

    console.log(this.selectedProduct.$ref);
    this.retProductsToCurrentSupplier = this.af.list(`users/${this.userId}/returnList/${key}`);
    this.retProductsToCurrentSupplier.update(`${this.productKey}` ,
      { supplierName: this.newAttribute.supplierName , productName: this.newAttribute.productName, returnDay: this.newAttribute.returnDay
        , reason: this.newAttribute.reason , amount:  this.newAttribute.amount , TypeOfFillUp: this.TypeOfFillUp});
    console.log(this.newAttribute);
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
    this.selectedProduct = null;
    this.selectedReturnDay = '';
    this.selectedSupplier = '';
      console.log(this.fieldArray);
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }
}

