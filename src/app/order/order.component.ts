import { Component, OnInit , ChangeDetectionStrategy } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class OrderComponent implements OnInit {
  viewDate: Date = new Date();
  today: number = Date.now();
  day = this.viewDate.getDay();
  userId: string;
  items: FirebaseListObservable<any[]>;

  constructor(public af: AngularFireDatabase , public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
    this.searchItem();
  }
  searchItem() {
    this.items = this.af.list(`/users/${this.userId}/datesSuppliers/`, {
      query: {
        orderByValue: this.day
      }
    });
    console.log(this.items.$ref);
  }


  ngOnInit() {
    console.log('today is : ' + this.day);
    this.searchItem();
  }

}
