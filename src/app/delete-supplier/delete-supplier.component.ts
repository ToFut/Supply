import {Component, Inject, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-delete-supplier',
  templateUrl: './delete-supplier.component.html',
  styleUrls: ['./delete-supplier.component.css']
})
export class DeleteSupplierComponent implements OnInit {
  userId: string;
  public itemToDel: FirebaseListObservable<any[]>;
  key: string;
  name: string;
  constructor( public afAuth: AngularFireAuth,
              public af: AngularFireDatabase ,  private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });

  }
  deleteItem() {
    this.itemToDel = this.af.list(`users/${this.userId}/suppliers/${this.key}`);
    for (let i = 0 ; i < 7 ; i++ ) {
      this.af.list(`users/${this.userId}/orderDateSuppliers/${i}/${this.key}`).remove();
      this.af.list(`users/${this.userId}/reciveDateSuppliers/${i}/${this.key}`).remove();
    }

    this.itemToDel.remove();

  }

  ngOnInit() {
  }
}
