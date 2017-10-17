import {Component, OnInit, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
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
  public day = this.viewDate.getDay();
  userId: string;
  search: FirebaseListObservable<any[]>;
  list = [];
  listOfMatchSupplier: object;
  public supplierFounded: Array<any>;

  constructor(public af: AngularFireDatabase , public afAuth: AngularFireAuth ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  ngOnInit() {
    this.getFirebaseObject();
  }
  searchItem(today): any {
    let retur = [];
    const ref = this.af.list(`/users/${this.userId}/datesSuppliers/` , {
      preserveSnapshot: true
    } ).$ref.orderByKey().equalTo('0').on('child_added', function(snapshot) {
      console.log(snapshot.val());
      retur = snapshot.val();
    });
    return retur;
  }
  getFirebaseObject() {
    let obj: string;
    let i = 0;
    this.listOfMatchSupplier = this.searchItem(this.day.toString());
    for ( obj in this.listOfMatchSupplier) {
      console.log(obj);
      this.supplierFounded[i] = this.af.object(`/users/${this.userId}/${obj}`);
      i++;
      console.log(this.supplierFounded);
    }

  }
}
