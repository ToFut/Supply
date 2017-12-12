import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {ActivatedRoute} from '@angular/router';
import {escape} from 'querystring';
import {element} from 'protractor';

@Component({
  selector: 'app-order-for-currect-supplier',
  templateUrl: './order-for-currect-supplier.component.html',
  styleUrls: ['./order-for-currect-supplier.component.scss']
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
  StringDay: string;
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
    this.dayToString();
  }
  dayToString() {
    switch (this.day) {
      case 0 :
        this.StringDay = 'ראשון';
        break;
      case 1 :
        this.StringDay = 'שני';
        break;
      case 2 :
        this.StringDay = 'שלישי';
        break;
      case 3 :
        this.StringDay = 'רביעי';
        break;
      case 4 :
        this.StringDay = 'חמישי';
        break;
      case 5 :
        this.StringDay = 'שישי';
        break;
      case 6 :
        this.StringDay = 'שבת';
        break;

    }
  }

  ngOnInit() {
    this.phoneSupplier = this.af.object(`/users/${this.userId}/suppliers/${this.supplierKey}/wayToOrder/phone`);
    this.emailSupplier = this.af.object(`/users/${this.userId}/suppliers/${this.supplierKey}/wayToOrder/email`);

    this.fullDate = this.dayInMonth + '.' + this.month + '.' + this.year ;
    this.Products = this.af.list(`users/${this.userId}/suppliers/${this.supplierKey}/SupplierProducts/`);
    this.currentOrderInformation = this.af.list(
      `users/${this.userId}/orderHistory/${this.year}/${this.month}/${this.dayInMonth}/${this.supplierKey}`);
    this.supplierProperty = this.af.object(`users/${this.userId}/suppliers/${this.supplierKey}`);


  }
   whatsapp() {
    console.log(this.stringToOrder)
      location.href =  'whatsapp://send?phone=972525754040&text=שלום, ' +
        ' להלן הזמנה עבור ' + this.userName + '%0A'
        + ' ' + this.stringToOrder + ' אנא אשר קבלת הזמנה בלחיצת על הקישור הבא ' +  '%0A' ;

    }

  mail() {
    this.currentOrderInformation.update(`${this.supplierKey}` , this.stringToOrder)
    location.href =  'mailto:' + '' + '' + 'subject=הזמנת אספקה' +
      '&amp;' + '&text=שלום ,' +
      'להלן ההזמנה עבור ' + this.userName + ' לאספקה ביום ___'   +
      this.stringToOrder
      + 'אנא אשר קבלת הזמנה בלחיצת על הקישור הבא';
  }
  buildMessageWhatsApp() {
    let name = '';
    let TypeOfFillUp = '';
    let amount = '';
    let count = 1;
    this.currentOrderInformation.$ref.on('child_added' , element => {
      if ( element !== null) {
        console.log(count)
        count++;
        name = element.val().name;
        amount = element.val().amount;
        console.log(name);
        console.log(amount);
        TypeOfFillUp = element.val().TypeOfFillUp;
        console.log(TypeOfFillUp);

        this.stringToOrder.push(' ' + amount + ' ' + TypeOfFillUp + '  ' + name + ' %0A');
        console.log(this.stringToOrder)

      }
    }).call(this.whatsapp());

  }
  buildMessageEmail() {
    let name = '';
    let TypeOfFillUp = '';
    let amount = '';
    this.currentOrderInformation.$ref.on('child_added' , element => {
      name = element.exportVal().name;
      amount = element.exportVal().amount;
      TypeOfFillUp = element.exportVal().TypeOfFillUp;
      this.stringToOrder.push(' ' + amount + ' ' + TypeOfFillUp + '  ' + name  + ' %0A');
    }).call(this.mail());

  }

  update(values: number , currentProductKey: string , currentMin: number , productName: string , TypeOfFillUp: string ) {
    const path = 'table[' + currentProductKey + ']';
    /*this.value.forEach(function(element) {
      if (element[0] = currentProductKey ) {
        element[1] = values ;
        bool = false;
      }
    });*/
    console.log(values);
    console.log(currentProductKey);

    this.currentOrderInformation.set(`${currentProductKey}` , {amount: values, name: productName , TypeOfFillUp: TypeOfFillUp})
    this.currentProduct = this.af.object(`users/${this.userId}/suppliers/${this.supplierKey}/${currentProductKey}`);
    console.log(TypeOfFillUp);
    this.value.push({[currentProductKey]: values});
    if (values >= currentMin) { // TODO stack in 100 need to check why
      document.getElementById(path).style.color = 'LimeGreen';
    } else {
      console.log(values + '' + currentMin );
      document.getElementById(path).style.color = 'red';
    }
  }
}



