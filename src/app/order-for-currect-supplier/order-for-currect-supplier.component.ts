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
  phoneSupplier: FirebaseObjectObservable<any[]>;
  emailSupplier: FirebaseObjectObservable<any[]>;
  Products: FirebaseListObservable<any[]>;
  supplierProperty: FirebaseObjectObservable<any[]>;
  value = [];
  stringToOrder = [];
  currentProduct: FirebaseObjectObservable<any[]>;
  currentOrderInformation: FirebaseListObservable<any[]>;
  sendThis: string;
  viewDate: Date = new Date();
  public day = this.viewDate.getDay();
  dayInMonth = this.viewDate.getDate();
  month = this.viewDate.getMonth();
  year = this.viewDate.getFullYear();
  fullDate: string;
  supplierName: string;
  userName = this.afAuth.auth.currentUser.displayName;
  // ToDo day - (supplierProperty |async)?.OrderDays check and put with absulote
  constructor( public af: AngularFireDatabase , public afAuth: AngularFireAuth, route: ActivatedRoute ) {
    route.queryParams.subscribe(params => {
      this.supplierKey = params['supplierKey'];
      this.userId = params['userId'];

    });
    console.log(this.supplierKey);
  }

  ngOnInit() {
    this.phoneSupplier = this.af.object(`/users/${this.userId}/suppliers/${this.supplierKey}/wayToOrder/phone`);
    this.emailSupplier = this.af.object(`/users/${this.userId}/suppliers/${this.supplierKey}/wayToOrder/email`);

    this.fullDate = this.dayInMonth + '.' + this.month + '.' + this.year ;
    this.Products = this.af.list(`users/${this.userId}/suppliers/${this.supplierKey}/SupplierProducts/`);
    this.currentOrderInformation = this.af.list(`users/${this.userId}/orderHistory/${this.year}/${this.month}/${this.dayInMonth}`);
    console.log(this.dayInMonth);
    console.log(this.month);
    console.log(this.currentOrderInformation);
    this.supplierProperty = this.af.object(`users/${this.userId}/suppliers/${this.supplierKey}`);


  }
  whatsapp() {
    console.log(this.phoneSupplier.toString());
    this.currentOrderInformation.update(`${this.supplierKey}` , this.stringToOrder)
    location.href =  'whatsapp://send?phone=+972525754040?text=שלום, ' +
      ' להלן הזמנה עבור ' + this.userName + '  לאספקה ביום ____ ' + '/n'
      + this.stringToOrder   /*'mailto:'
      + '?cc='
      + this.afAuth.auth.currentUser.email
      + '&subject=' + 'הזמנה אספקה מ-'
      + this.afAuth.auth.currentUser.displayName
      + '&body=' + this.stringToOrder*/
      + ' אנא אשר קבלת הזמנה בלחיצת על הקישור הבא ';
    }

  mail() {
    this.currentOrderInformation.update(`${this.supplierKey}` , this.stringToOrder)
    console.log(this.supplierProperty.$ref.orderByKey().equalTo('email').toJSON());
    location.href =  'mailto:' + '' + '' + 'subject=הזמנת אספקה' +
      '&amp;' + 'body=שלום ,' +
      'להלן ההזמנה עבור ' + this.userName + ' לאספקה ביום ___'   +
      this.stringToOrder
    /*'mailto:'
    mailto:name1@rapidtables.com?cc=name2@rapidtables.com&bcc=name3@rapidtables.com
&amp;subject=The%20subject%20of%20the%20email
&amp;body=The%20body%20of%20the%20email
      + '?cc='
      + this.afAuth.auth.currentUser.email
      + '&subject=' + 'הזמנה אספקה מ-'
      + this.afAuth.auth.currentUser.displayName
      + '&body=' + this.stringToOrder*/
      + 'אנא אשר קבלת הזמנה בלחיצת על הקישור הבא';
  }

  update(values: number , currentProductKey: string , currentMin: number , productName: string ) {
    const path = 'table[' + currentProductKey + ']';
    /*this.value.forEach(function(element) {
      if (element[0] = currentProductKey ) {
        element[1] = values ;
        bool = false;
      }
    });*/
    this.currentProduct = this.af.object(`users/${this.userId}/suppliers/${this.supplierKey}/${currentProductKey}`);
    this.stringToOrder.push(values + ' חבילות ' + productName  + '\n');
    console.log(values);

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



