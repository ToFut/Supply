import {Injectable, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class SupplierService implements OnInit {
  userId: string;


  constructor(private db: AngularFireDatabase , public afAuth: AngularFireAuth , public af: AngularFireDatabase) {
    this.afAuth.authState.subscribe(user => {
      if (user) {this.userId = user.uid; }
    });
  }
  ngOnInit(): void {

  }

  getSupplier(start, end): FirebaseListObservable<any> {
    return this.db.list(`users/${this.userId}/supplier`, {
      query: {
        orderByChild: 'name',
        limitToFirst: 20,
        startAt: start,
        endAt: end
      }
    });
  }

}
