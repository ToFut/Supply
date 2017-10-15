import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-supplier-search',
  templateUrl: './supplier-search.component.html',
  styleUrls: ['./supplier-search.component.css']
})
export class SupplierSearchComponent implements OnInit {
  public items: FirebaseListObservable<any[]>;
  userId: string;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.afAuth.authState.subscribe(user => {
      if (user) {this.userId = user.uid; }
    });
  }

  ngOnInit() {
  }

}
