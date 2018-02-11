 import {Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {MatchSupplierService} from '../match-supplier.service';
import {TodoListComponent} from '../todo-list/todo-list.component';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {element} from 'protractor';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-sub-user-recive-list',
  templateUrl: './sub-user-recive-list.component.html',
  styleUrls: ['./sub-user-recive-list.component.scss']
})
export class SubUserReciveListComponent implements OnInit {
  userId: string;
  supplierFounded = [];
  currentSupplierProducts: FirebaseListObservable<any[]>;
  objLoaderStatus: boolean;
  viewDate: Date = new Date();
  today: number = Date.now();
  currentReciveInformation: FirebaseListObservable<any[]>;
  public day = this.viewDate.getDay();
  dayInMonth = this.viewDate.getDate();
  month = this.viewDate.getMonth();
  year = this.viewDate.getFullYear();
  time = new Date().getHours();
  finisheSupplierArray = [];
  checkIfFinisheSupplier = [];
  checkIfNONEFinisheSupplier = [];
  show = true;
  someSupplierFinish: boolean;
  reciveComplete = [];
  reciveNONEComplete = [];
  allSupplierFinishe = false;
  checkIfExist = false;
  noStatusOfOrders = false;
  allOrderForToday: FirebaseListObservable<any[]>;
  reciveOrderBefore = [];
  KEYSNONacceptedRecive = [];
  KEYSacceptedRecive = [];

  constructor(public matchSupplier: MatchSupplierService , public af: AngularFireDatabase , public afAuth: AngularFireAuth ,
               private router: Router , public route: ActivatedRoute) {
  route.queryParams.subscribe(params => {
    this.userId = params['domainUserId'];
  });
    console.log(this.userId);
    setTimeout(() => {
      this.checkForSupplier();
      setTimeout(() => {
        this.checkForSupplier();
      }, 1000);
    }, 1000);
    if (this.checkIfNONEFinisheSupplier.length === 0) {
      this.allSupplierFinishe = true;
    }
    this.reciveComplete = [];
    this.currentReciveInformation = this.af.list(`users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}`);
    this.allOrderForToday = this.af.list(`users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}`);

  }

  ngOnInit() {
    if (this.month === 12) {
      this.month = 1;
    } else {
      this.month += 1;
    }
    console.log(this.month)
    this.reciveOrderBefore = [];

  }

  showProducts(supplierKey, name) {
    const x = document.getElementById(name);
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  checkWhatFinish(key, event) {

    console.log(event);

    this.af.list(`users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}/status`)
      .$ref.orderByChild(key).on('child_added', snapshot => {
    });

  }

  todoListNavigation(supplierKey) {
    console.log(this.supplierFounded);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'supplierKey': supplierKey.$ref.key,
        'supplierFounded': this.supplierFounded,
        'userId': this.userId,
      }
    };
    this.router.navigate(['todoList'], navigationExtras);
  }

  getWarning(key) {
    console.log(key.$ref.key);
    console.log(this.KEYSacceptedRecive);
    if (this.KEYSNONacceptedRecive.indexOf(key.$ref.key) > -1) {
      console.log('warning');
      return true;
    }
    return false;
  }

  checkForSupplier() {
    let key;
    let index;
    this.af.list(`users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}/status`).subscribe(ele => {
      console.log(ele);
      ele.forEach(val => {
        console.log(val.$value);
        if (this.KEYSacceptedRecive.indexOf(val.$key) === -1 && val.$value) {
          let indexNONEAccept = this.KEYSNONacceptedRecive.indexOf(val.$key);
          this.KEYSNONacceptedRecive.splice(indexNONEAccept, 1);
          console.log(val.$key);
          this.KEYSacceptedRecive.push(val.$key);
        } else if (this.KEYSNONacceptedRecive.indexOf(val.$key) === -1 && !val.$value) {
          let indexAccept = this.KEYSacceptedRecive.indexOf(val.$key);
          this.KEYSacceptedRecive.splice(indexAccept, 1);
          this.KEYSNONacceptedRecive.push(val.$key);
          console.log(this.KEYSNONacceptedRecive.indexOf(val.$key));
        }

      });
    });
    this.af.list(`users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}/status`)
      .$ref.orderByKey().on('child_added', element => {
      console.log(element.val());
      if (element.val() && this.finisheSupplierArray.indexOf(element.key) === -1) {
        this.finisheSupplierArray.push(element.key.toString());
        console.log(this.finisheSupplierArray);
      }
    });
    this.af.list(`users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}`)
      .$ref.orderByKey().on('child_added', element => {
      this.reciveOrderBefore.push(element.key);
    });

    console.log(this.finisheSupplierArray);

    this.matchSupplier.pushSupplier('recive', this.userId).then((data) => {
      this.supplierFounded = data;
      console.log(this.supplierFounded);
      this.supplierFounded.map(snapshot => {
        key = snapshot.$ref.key;
        console.log(key);
        console.log(this.finisheSupplierArray);
        console.log(this.checkIfFinisheSupplier);
        console.log(this.checkIfNONEFinisheSupplier);
        console.log(this.checkIfFinisheSupplier.indexOf(key));
        console.log(this.finisheSupplierArray.indexOf(key));

        if (this.finisheSupplierArray.indexOf(key) !== -1 && this.checkIfFinisheSupplier.indexOf(key) === -1 &&
          this.reciveOrderBefore.indexOf(key) !== -1) {
          //  finish status and no inside check finish
          index = this.checkIfNONEFinisheSupplier.indexOf(key);
          console.log(this.checkIfFinisheSupplier);
          this.checkIfFinisheSupplier.push(key);
          this.reciveComplete.push(snapshot);
        } else if ((this.finisheSupplierArray.indexOf(key) === -1) && (this.checkIfNONEFinisheSupplier.indexOf(key) === -1) &&
          this.reciveOrderBefore.indexOf(key) !== -1) {
          index = this.checkIfNONEFinisheSupplier.indexOf(key);
          console.log(this.checkIfNONEFinisheSupplier);
          this.checkIfNONEFinisheSupplier.push(key);
          this.reciveNONEComplete.push(snapshot);
          console.log(this.checkIfNONEFinisheSupplier);
        }
        console.log(this.checkIfNONEFinisheSupplier);
        if (this.checkIfNONEFinisheSupplier.length === 0) {
          this.allSupplierFinishe = true;
        } else {
          this.allSupplierFinishe = false;
        }

      });
      this.checkIfNONEFinisheSupplier.forEach(id => {
        console.log(id);
        let equal = false;
        let exist = false;
        this.af.list(`users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}/${id}`)
          .subscribe(val => {
            console.log(val);
            val.forEach(ele => {
              if (ele['accepted'] !== undefined) {
                exist = true;
              }
              console.log(ele['accepted']);
              console.log(ele['amount']);
              if (ele['accepted'] === ele['amount']) {
                equal = true;
              } else {
                equal = false;
                return;
              }
            });
          });
        if (!equal && exist && this.KEYSNONacceptedRecive.indexOf(id) === -1) {
          this.KEYSNONacceptedRecive.push(id);
        }
      });
      if (this.reciveComplete.length === 0) {
        this.someSupplierFinish = false;
        console.log(this.someSupplierFinish);
      } else {
        console.log(this.reciveComplete.length);
        this.someSupplierFinish = true;
      }

      console.log(this.finisheSupplierArray.length + ' and ' + this.reciveComplete.length);
    }).catch(error => {
      if (this.reciveComplete.length === 0 && this.reciveNONEComplete.length === 0) {
        this.checkIfExist = false;
        console.log(this.checkIfExist);
      } else {
        console.log(this.checkIfExist);
        this.checkIfExist = true;
      }
    });

  }
}
