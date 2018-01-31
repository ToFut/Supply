import {Component, Inject, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  userId: string;
  public itemToDel: FirebaseObjectObservable<any[]>;
  key: string;
  name: string;
  SupplierKey: string;
  selectProductKey: string;
  constructor( public afAuth: AngularFireAuth,
              public af: AngularFireDatabase ,   private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });

  }
  deleteItem() {
    this.itemToDel = this.af.object(`users/${this.userId}/suppliers/${this.SupplierKey}/SupplierProducts/${this.selectProductKey}`);
    this.itemToDel.remove();

  }

  ngOnInit() {
  }
}
