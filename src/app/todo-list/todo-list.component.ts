import { Component, OnInit , OnChanges} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import {
  AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable,
  onChildRemoved
} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  exportAs: 'productName'
})
export class TodoListComponent implements OnInit {
  userId: string;
  currentSupplierProducts: FirebaseListObservable<any[]>;
  supplier: FirebaseObjectObservable<any[]>;
  currentReciveInformation: FirebaseListObservable<any[]>;
  viewDate: Date = new Date();
  public day = this.viewDate.getDay();
  dayInMonth = this.viewDate.getDate();
  month = this.viewDate.getMonth();
  year = this.viewDate.getFullYear();
  fullDate: string;

  supplierKey: string;
  checkFordone: boolean;
  selectedValues: string[] = [];
  count: number;
  ngOnInit(): void {
    console.log(this.supplierKey);
    this.currentSupplierProducts = this.af.list(`/users/${this.userId}/suppliers/${this.supplierKey}/SupplierProducts/`);
    this.supplier = this.af.object(`/users/${this.userId}/suppliers/${this.supplierKey}`);
    console.log(this.currentSupplierProducts);
    this.currentSupplierProducts.subscribe(list => this.count = list.length )


  }
  OnChanges() {
    this.currentSupplierProducts = this.af.list(`/users/${this.userId}/suppliers/${this.supplierKey}/SupplierProducts/`);

  }
  constructor( public af: AngularFireDatabase, public afAuth: AngularFireAuth ,
              route: ActivatedRoute , private router: Router ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
    route.queryParams.subscribe(params => {
      this.supplierKey = params['supplierKey'];
    });


  }
    updateRecive() {
      this.currentReciveInformation = this.af.list(`users/${this.userId}/reciveHistory/${this.year}/${this.month}/${this.dayInMonth}`);

      if (this.count !== this.selectedValues.length ) {
        console.log( 'be carfule' );
      }
        this.currentReciveInformation.update(`${this.supplierKey}` , this.selectedValues);
    }
  toggleEditable( name ) {
    let checked = false;
    this.selectedValues.map(value => {
      if (value === name) {
        checked = true;
      }
    })
    if (checked) {
      this.selectedValues = this.selectedValues.filter( data => data !== name );
    } else {
      this.selectedValues.push(name);
    }
    console.log(this.selectedValues);
  }

   ani() {
    document.getElementById('plane').className = 'animation';
  }
   anitwo() {
    document.getElementById('bg').className = 'animation2';
  }

}
