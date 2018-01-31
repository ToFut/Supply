import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-accept-order',
  templateUrl: './accept-order.component.html',
  styleUrls: ['./accept-order.component.less']
})
export class AcceptOrderComponent implements OnInit {
  supplierKey: string;
  userId: string;
  viewDate: Date = new Date();
  public day = this.viewDate.getDay();
  dayInMonth = this.viewDate.getDate();
  month = this.viewDate.getMonth();
  year = this.viewDate.getFullYear();


  constructor( public af: AngularFireDatabase , public afAuth: AngularFireAuth ,
               route: ActivatedRoute , private router: Router) {
    route.queryParams.subscribe(params => {
      this.supplierKey = params['supplierKey'];
      this.userId = params['userId'];
      this.dayInMonth = params['dayInMonth'];
      this.month = params['month'];
      this.year = params['year'];
    });
    }
  ngOnInit() {
    console.log(this.month);
    this.af.list(`acceptOrders/${this.userId}/${this.year}/${this.month}/${this.dayInMonth}`).update(`${this.supplierKey}` , true);
  }

}
