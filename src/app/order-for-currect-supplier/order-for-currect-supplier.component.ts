import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {escape} from 'querystring';
import {element} from 'protractor';
import {DayPilot} from "daypilot-pro-angular";
import today = DayPilot.Date.today;

@Component({
  selector: 'app-order-for-currect-supplier',
  templateUrl: './order-for-currect-supplier.component.html',
  styleUrls: ['./order-for-currect-supplier.component.scss']
})
export class OrderForCurrectSupplierComponent implements OnInit {
  supplierKey: string;
  userId: string;
  pageDimmed = false;
  phoneSupplier: number;
  emailSupplier: string;
  nameSupplier: string;
  Products = [];
  supplierProperty: FirebaseObjectObservable<any[]>;
  value = [];
  stringToOrder = [];
  sentenceToReturn = [];
  reciveUpdate: FirebaseListObservable<any[]>;
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
  reciveAfter: number;
  private reciveDay: Date;
  returnProducts: FirebaseListObservable<any[]>;
  ifTodayIsReturnDay = false;
  returnHistory: FirebaseListObservable<any[]>;
  acceptOrder: FirebaseListObservable<any[]>;
  acceptLink: string;
  orderForTodayFromSpesificProduct = [];

  // ToDo day - (supplierProperty |async)?.OrderDays check and put with absulote
  constructor(public af: AngularFireDatabase, public afAuth: AngularFireAuth, public route: Router, public link: ActivatedRoute) {
    link.queryParams.subscribe(params => {
      this.supplierKey = params['supplierKey'];
      this.userId = params['userId'];
    });
    console.log(this.userId);
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

  dayToNumber(day) {
    console.log(this.day);
    switch (day) {
      case 'יום ראשון' :
        if (this.day === 0) {
          this.ifTodayIsReturnDay = true;
        }
        break;
      case 'יום שני' :
        if (this.day === 1) {
          this.ifTodayIsReturnDay = true;
        }
        break;
      case 'יום שלישי' :
        if (this.day === 2) {
          this.ifTodayIsReturnDay = true;
        }
        break;
      case 'יום רביעי' :
        if (this.day === 3) {
          this.ifTodayIsReturnDay = true;
        }
        break;
      case 'יום חמישי' :
        if (this.day === 4) {
          this.ifTodayIsReturnDay = true;
        }
        break;
      case 'יום שישי' :
        if (this.day === 5) {
          this.ifTodayIsReturnDay = true;
        }
        break;
      case 'יום שבת' :
        if (this.day === 6) {
          this.ifTodayIsReturnDay = true;
        }
        break;

    }
  }

  ngOnInit() {
    if (this.month === 12) {
      this.month = 1;
    } else {
      this.month += 1;
    }

    this.acceptOrder =
      this.af.list(`acceptOrders/${this.userId}/${this.year}/${this.month}/${this.dayInMonth}`);
    this.af.object(`/users/${this.userId}/suppliers/${this.supplierKey}`).subscribe(data => {
      this.phoneSupplier = data['ContactNum'];
      this.emailSupplier = data['ContactEmail'];
      this.nameSupplier = data['ContactName'];
      console.log('name ' + this.nameSupplier + ' email ' + this.emailSupplier + ' phone number ' + this.phoneSupplier);
    });
    this.fullDate = this.dayInMonth + '.' + this.month + '.' + this.year;
    console.log(this.month);
    this.returnProducts = this.af.list(`users/${this.userId}/returnList/${this.supplierKey}`);
    console.log(this.returnProducts);
    // this.returnDay();
    this.af.list(`users/${this.userId}/suppliers/${this.supplierKey}/SupplierProducts/`).subscribe(data => {
      console.log(data);
      data.forEach(snapshot => {
        if (snapshot['MinInInventory'] !== undefined) {
          console.log(snapshot);
          console.log(snapshot['MinInInventory'][this.day]);

          if (snapshot['MinInInventory'][this.day] !== undefined) {
            this.Products.push(snapshot);
            console.log(this.Products);
          }
        }

      });
    });
    this.supplierProperty = this.af.object(`users/${this.userId}/suppliers/${this.supplierKey}`);
    this.currentOrderInformation = this.af.list(
      `users/${this.userId}/orderHistory/${this.year}/${this.month}/${this.dayInMonth}/${this.supplierKey}`);
    this.currentOrderInformation.subscribe(value => {
      console.log(value);
      value.forEach(element => {
        this.orderForTodayFromSpesificProduct[element.$key] = element['amount'];
        console.log(this.orderForTodayFromSpesificProduct);
      });
    });
    this.returnHistory = this.af.list(
      `users/${this.userId}/returnHistory/${this.year}/${this.month}/${this.dayInMonth}/${this.supplierKey}`);
    this.returnProducts.$ref.on('value', snap => {
      this.ifTodayIsReturnDay = snap.hasChildren();
    });
    this.af.object(`users/${this.userId}/suppliers/${this.supplierKey}/OrderDays`).subscribe(data => {
      this.reciveAfter = data.$value;
      this.reciveDay = new Date(this.viewDate);
      this.reciveDay.setDate(this.viewDate.getDate() + this.reciveAfter);

    });
  }

  /* returnDay() { TODO dependes the day return
    this.af.list(`users/${this.userId}/returnHistory/${this.supplierKey}`).subscribe( data => {
     this.dayToNumber(data[3].$value);
      console.log(data);
      if ( this.ifTodayIsReturnDay) {
       this.returnProducts.push(data);
     }
   });
    console.log(this.returnProducts);
  } */

  mail() {
  }

  async buildMessageWhatsApp() {
    let name = '';
    let TypeOfFillUp = '';
    let amount = '';
    let count = 0;
    let WhatsAppMesage = '';
    let check = true;
    await this.returnProduct();
    this.acceptLink = 'https://app.supplyme.net/#/acceptOrder?userId=' + this.userId +
      '&supplierKey=' + this.supplierKey + '&dayInMonth=' + this.dayInMonth + '&month=' + this.month + '&year=' + this.year;
    this.acceptLink = encodeURIComponent(this.acceptLink);

    console.log(this.sentenceToReturn);
    this.currentOrderInformation.$ref.on('child_added', element => {
      count++;
      check = true;
      if (element !== undefined) {
        name = element.val().name;
        amount = element.val().amount;
        console.log(name);
        TypeOfFillUp = element.val().TypeOfFillUp;
        this.stringToOrder.forEach(data => {
          if (data.includes(name)) {
            check = false;
          }
        });
        console.log(check);
        if (check && amount !== '0') {
          this.stringToOrder.push(' ' + amount + ' ' + TypeOfFillUp + '  ' + name + ' %0A');
        }

      }
      this.currentOrderInformation.subscribe(data => {
        if (count === data.length) {
          console.log('first');
          const demo = 'whatsapp://send?phone=972' + this.phoneSupplier + '&text=שלום ' + this.nameSupplier +
            ' להלן הזמנה עבור ' + this.userName + '%0A'
            + ' ' + this.stringToOrder + ' אנא אשר קבלת הזמנה בלחיצת על הקישור הבא ' + '%0A';
          WhatsAppMesage = ' https://api.whatsapp.com/send?phone=972' + this.phoneSupplier + '&text=שלום ' + this.nameSupplier +
            ' להלן הזמנה עבור ' + this.userName + '%0A'
            + ' ' + this.stringToOrder + '%0A' + this.sentenceToReturn +
            '%0A' + 'אנא אשר קבלת הזמנה בלחיצת על הקישור הבא ' + '%0A' + this.acceptLink;
          location.href = WhatsAppMesage;
          this.af.object(`acceptOrders/${this.userId}/${this.year}/${this.month}/${this.dayInMonth}/${this.supplierKey}`)
            .set(false);
          this.returnProducts.update(element.key, {status: true});

        }
      });
    });
  }

  buildMessageEmail() {
    let name = '';
    let TypeOfFillUp = '';
    let amount = '';
    let count = 0;
    this.returnProduct();
    this.acceptLink = 'https://app.supplyme.net?userId=' + this.userId +
      '&supplierKey=' + this.supplierKey + '&dayInMonth=' + this.dayInMonth + '&month=' + this.month + '&year=' + this.year;
    this.acceptLink = encodeURIComponent(this.acceptLink);

    this.currentOrderInformation.$ref.on('child_added', element => {
      count++;
      if (element !== undefined) {
        name = element.val().name;
        amount = element.val().amount;
        this.returnProducts.remove(element.key);
        console.log(name);
        console.log(amount);
        TypeOfFillUp = element.val().TypeOfFillUp;
        if (this.stringToOrder.indexOf(name) !== -1) {
          this.stringToOrder.push(' ' + amount + ' ' + TypeOfFillUp + '  ' + name + ' %0A');
        }
      }
      this.currentOrderInformation.subscribe(data => {
        console.log('data.length' + data.length + ' and count is ' + count);
        if (count === data.length) {
          this.currentOrderInformation.update(`${this.supplierKey}`, this.stringToOrder);
          location.href = 'mailto:' + this.emailSupplier + 'subject=הזמנת אספקה' +
            '&amp;' + '&body=שלום ' +
            'להלן ההזמנה עבור ' + this.userName + ' לאספקה ביום ___' +
            this.stringToOrder + this.sentenceToReturn + '%0A'
            + 'אנא אשר קבלת הזמנה בלחיצת על הקישור הבא' + '%0A' + this.acceptLink;
        }
      });
    });
  }

  redurectOrder() {

  }

  returnProduct() {
    let check = false;
    this.returnProducts.subscribe(data => {
      this.sentenceToReturn.push('\n  אלו המוצרים שצריכים להחזיר\n');
      data.forEach(element => {
        check = true;
        this.af.list
        (`users/${this.userId}/returnHistory/${this.year}/${this.month}/${this.dayInMonth}/${this.supplierKey}`).update(`${element.$key}`, {
          TypeOfFillUp: element['TypeOfFillUp'], amount: element['amount'],
          productName: element['productName'], reason: element['reason']
          , supplierName: element['supplierName']
        });
        this.sentenceToReturn.forEach(snap => {
          if (snap.indexOf(element['productName']) !== -1) {
            check = false;
          }
        });

        if (check) {
          this.sentenceToReturn.push('\n' + ' ' +
            element['amount'] + ' ' + element['TypeOfFillUp'] + ' ' + element['productName'] +
            '' + ' בגלל שהמוצר ' + element['reason'] + '\n');
        }

      });
    });

  }

  update(values: number, currentProductKey: string, currentMin: number, productName: string,
         TypeOfFillUp: string, price: number, unit: number) { // TODO last month
    const path = 'table[' + currentProductKey + ']';
    let reciveMonth, reciveYear, reciveDay;
    /*this.value.forEach(function(element) {
      if (element[0] = currentProductKey ) {
        element[1] = values ;
        bool = false;
      }
    });*/
    const cost = price * unit * values;
    this.currentOrderInformation.update(`${currentProductKey}`, {
      amount: values, name: productName
      , TypeOfFillUp: TypeOfFillUp, reciveAfter: this.reciveAfter, cost: cost
    });
    reciveDay = this.reciveDay.getDate();
    reciveMonth = this.reciveDay.getMonth();
    reciveYear = this.reciveDay.getFullYear();
    if (reciveMonth === 12) {
      reciveMonth = 1;
    } else {
      reciveMonth += 1;
    }

    this.af.list(`users/${this.userId}/reciveHistory/${reciveYear}/${reciveMonth}/${reciveDay}/${this.supplierKey}`)
      .update(`${currentProductKey}`, {
        amount: values, name: productName
        , TypeOfFillUp: TypeOfFillUp, reciveAfter: this.reciveAfter
      });
    this.value.push({[currentProductKey]: values});
    if (values >= currentMin) { // TODO stack in 100 need to check why
      document.getElementById(path).style.color = 'LimeGreen';
    } else {
      document.getElementById(path).style.color = 'red';
    }
  }

  comppare(minIn, updateVal) {
    if (minIn <= updateVal) {
      this.pageDimmed = true;
    } else {
      this.pageDimmed = false;
    }
  }
}
