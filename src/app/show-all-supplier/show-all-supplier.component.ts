import {Component, Input, OnInit} from '@angular/core';
import {DialogModule} from 'primeng/primeng';
import {MdDialog, MdDialogRef} from '@angular/material';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {SupplierPersonal} from '../SupplierPersonal';
import {AngularFireAuth} from 'angularfire2/auth';
import {ProductOptions} from '../ProductOptions';
import {FileHolder} from 'angular2-image-upload/lib/image-upload/image-upload.component';
import {DialogEditProductsComponent} from '../dialog-edit-products/dialog-edit-products.component';
import {DialogComponent} from '../dialog/dialog.component';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-show-all-supplier',
  templateUrl: './show-all-supplier.component.html',
  styleUrls: ['./show-all-supplier.component.css']
})
export class ShowAllSupplierComponent implements OnInit {

  key: string;
  infoSupply: FirebaseObjectObservable<any[]>;
  productInCurrectSupply: FirebaseListObservable<any[]>;

  userId: string;
  public Product = new ProductOptions();


  constructor(public dialogRef: MdDialogRef<any>, public af: AngularFireDatabase, public afAuth: AngularFireAuth,
              public dialog: MdDialog , private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {this.userId = user.uid; }
    });
  }

  editSupplier() {
    const dialogRef = this.dialog.open(DialogComponent , {
        width: '600px',
        height: '600px'
      }
    );
    dialogRef.componentInstance.supplierKey = this.key;
  }

  ngOnInit(): void {
    this.infoSupply = this.af.object(`users/${this.userId}/suppliers/${this.key}`);
    console.log(this.infoSupply);
  }
  deleteItem() {
    this.infoSupply.remove();
    this.closeDialog();
  }
  associateProduct() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'userId': this.userId,
        'supplierKey': this.key
      }
    };
    this.router.navigate(['correctSupplierProducts'], navigationExtras);
    console.log('userId' + this.userId + ' supplier key ' + this.key)
    this.closeDialog();

  }
  closeDialog() {
    this.dialogRef.close();
  }
}
