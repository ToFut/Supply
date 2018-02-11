import {Injectable, OnInit} from '@angular/core';
import {isUndefined} from 'util';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class GetReturnService implements OnInit {
  userId: string;
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });

  }

  ngOnInit() {
  }
  getAmount(supplierKey, productKey, Fyear, Fmonth, Fday, Tyear, Tmonth, Tday) {
    let count = 0;
    while (!(Fyear.toString() === Tyear && Fmonth.toString() === Tmonth
      && Fday.toString() === Tday)) {
      count += this.subscription(Fyear, Fmonth, Fday, supplierKey, productKey);
      Fday++;
      if (Fmonth >= '12' && Fday > '31') {
        Fmonth = '1';
        Fyear++;
        Fday = '1';
      }
      if (Fday > '31' && Fmonth < '12') {
        Fday = '1';
        Fmonth++;
      }
    }
    console.log('amount is :' + count);

    return count;
  }

  subscription(Fyear, Fmonth, Fday, supplierKey, productKey) {
    let count = 0;
    let amount = 0;
    this.af.list(`users/${this.userId}/returnHistory/${Fyear.toString()}/${Fmonth.toString()}/${Fday.toString()}/${supplierKey}`).$ref.on('value', products => {
      if (products.val() !== null) {
        if (!isUndefined(products.val()[productKey])) {
          amount = products.val()[productKey]['amount'];
          count += Number(amount);
        }
      }
    });
    /*
          .subscribe(products => {
            products.forEach(productId => {
              if (productId.$key === productKey) {
              }
            });
          });
    */
    return count;

  }

}
