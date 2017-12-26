import {Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {MatchSupplierService} from '../match-supplier.service';
import {MdDialog} from '@angular/material';
import {TodoListComponent} from '../todo-list/todo-list.component';
import {NavigationExtras, Router} from '@angular/router';
import {element} from 'protractor';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-recive-order',
  templateUrl: './recive-order.component.html',
  styleUrls: ['./recive-order.component.scss'],
  exportAs: 'i'

})
export class ReciveOrderComponent implements OnInit {
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
  reciveOrderBefore: number;

  constructor(public matchSupplier: MatchSupplierService , public af: AngularFireDatabase , public afAuth: AngularFireAuth ,
              public dialog: MdDialog , private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
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
  }

     ngOnInit() {
       if (this.month === 12) {
         this.month = 1;
       } else {
         this.month += 1;
       }
       this.currentReciveInformation = this.af.list(`users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}`);
       this.allOrderForToday = this.af.list(`users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}`);


     }

   showProducts(supplierKey , name) {
     const x = document.getElementById(name);
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }
  checkWhatFinish(key , event) {

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
        'supplierFounded': this.supplierFounded
      }
    };
    this.router.navigate(['todoList'], navigationExtras);

  }

  checkForSupplier() {
    let key;
    let index;
    this.af.list(`users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}/status`)
      .$ref.orderByKey().on('child_added' ,  element => {
          this.finisheSupplierArray.push(element.key.toString());
          console.log(this.finisheSupplierArray);
    });
    console.log(this.finisheSupplierArray);

    this.matchSupplier.pushSupplier('recive').then((data) => {
      this.supplierFounded = data;
      console.log(this.supplierFounded);
      this.supplierFounded.map(snapshot => {
        key = snapshot.$ref.key;
        console.log(this.supplierFounded);
        this.allOrderForToday.$ref.on('value', check => {
          if ( check.key === key) {
            this.checkIfExist = true;
          }
        });
        console.log(this.month);
        console.log(this.dayInMonth);

        console.log(this.finisheSupplierArray.length === 0 );
        console.log(this.finisheSupplierArray.indexOf(key) === -1);
        console.log(this.checkIfFinisheSupplier.indexOf(key) > -1 );
        console.log(this.reciveComplete.indexOf(key) === -1);

        if ( this.checkIfExist ) {
          index = this.checkIfNONEFinisheSupplier.indexOf(key);
          if ( index === -1) {
            this.checkIfNONEFinisheSupplier.splice(index , 1);
          }

          console.log(this.checkIfFinisheSupplier);
          this.checkIfFinisheSupplier.push(key);
          this.reciveComplete.push(snapshot);
        } else if (!(this.finisheSupplierArray.includes(key)) && !(this.checkIfNONEFinisheSupplier.includes(key))) {
            this.checkIfNONEFinisheSupplier.push(key);
            this.reciveNONEComplete.push(snapshot);
        }
        console.log(this.checkIfNONEFinisheSupplier);
        if (this.checkIfNONEFinisheSupplier.length === 0) {
            this.allSupplierFinishe = true;
          } else {
            this.allSupplierFinishe = false;
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
    });

  }
}
