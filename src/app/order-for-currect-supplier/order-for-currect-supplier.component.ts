import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {ActivatedRoute} from '@angular/router';
import {escape} from 'querystring';
import {element} from 'protractor';

@Component({
  selector: 'app-order-for-currect-supplier',
  templateUrl: './order-for-currect-supplier.component.html',
  styleUrls: ['./order-for-currect-supplier.component.css']
})
export class OrderForCurrectSupplierComponent implements OnInit {
  supplierKey: string;
  userId: string;
  Products: FirebaseListObservable<any[]>;
  supplierProperty: FirebaseObjectObservable<any[]>;
  value = [];
  stringToOrder = [];
  currentProduct: FirebaseObjectObservable<any[]>;
  checkInvetory: FirebaseObjectObservable<any[]>;
  sendThis: string;
  viewDate: Date = new Date();
  public day = this.viewDate.getDay();
  // ToDo day - (supplierProperty |async)?.OrderDays check and put with absulote
  constructor( public af: AngularFireDatabase , public afAuth: AngularFireAuth, route: ActivatedRoute ) {
    route.queryParams.subscribe(params => {
      this.supplierKey = params['supplierKey'];
      this.userId = params['userId'];
    });
    console.log(this.supplierKey);
    this.Products = this.af.list(`users/${this.userId}/suppliers/${this.supplierKey}/SupplierProducts/`);
    this.supplierProperty = this.af.object(`users/${this.userId}/suppliers/${this.supplierKey}`);
  }

  ngOnInit() {
    console.log(this.userId);
    console.log(this.Products);

  }
  mail() {
    console.log(this.supplierProperty.$ref.orderByKey().equalTo('email').toJSON());
    location.href =  'whatsapp://send?text= ' + this.stringToOrder + ''
    /*'mailto:'
      + '?cc='
      + this.afAuth.auth.currentUser.email
      + '&subject=' + 'הזמנה אספקה מ-'
      + this.afAuth.auth.currentUser.displayName
      + '&body=' + this.stringToOrder*/
      + '';
    }
  update(values: number , currentProductKey: string , currentMin: number , productName: string ) {
    const path = 'table[' + currentProductKey + ']';
    console.log(path);
    /*this.value.forEach(function(element) {
      if (element[0] = currentProductKey ) {
        element[1] = values ;
        bool = false;
      }
    });*/
    this.currentProduct = this.af.object(`users/${this.userId}/suppliers/${this.supplierKey}/${currentProductKey}`);
    this.stringToOrder.push(values + ' חבילות ' + productName  + '\n');
    console.log(values);
    console.log(productName);

    console.log(this.stringToOrder);
    console.log(this.value);
    this.value.push({[currentProductKey]: values});
    if (values >= currentMin) { // TODO stack in 100 need to check why
      document.getElementById(path).style.color = 'LimeGreen';
    } else {
      console.log(values + '' + currentMin );
      document.getElementById(path).style.color = 'red';
    }
  }
}



