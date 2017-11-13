import {Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {MatchSupplierService} from '../match-supplier.service';
import {MdDialog} from '@angular/material';
import {TodoListComponent} from '../todo-list/todo-list.component';
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-recive-order',
  templateUrl: './recive-order.component.html',
  styleUrls: ['./recive-order.component.css'],
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
  fullDate: string;

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

  }

     ngOnInit() {
       this.currentReciveInformation = this.af.list(`users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}`);
     }

   showProducts(supplierKey , name) {
     const x = document.getElementById(name);
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  todoListNavigation(supplierKey) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'supplierKey': supplierKey.$ref.key,
      }
    };
    this.router.navigate(['todoList'], navigationExtras);

  }

  checkForSupplier() {
    this.matchSupplier.pushSupplier('recive').then((data) => {
      this.supplierFounded = data;

    });

  }
}
