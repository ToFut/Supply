///<reference path="../../node_modules/@angular/material/typings/module.d.ts"/>
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { SupplierComponent } from './supplier/supplier.component';
import { MockSupplierComponent } from './mock-supplier/mock-supplier.component';
import { ServerConnectionComponent} from './server-connection/server-connection.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {MdButtonModule, MdCheckboxModule, MdDialogModule} from '@angular/material';
import { GestureConfig, MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { Ng2Bs3ModalModule } from '../../node_modules/ng2-bs3-modal/ng2-bs3-modal';
import 'hammerjs';
import { LoginPageComponent } from './login-page/login-page.component';
import { DialogComponent } from './dialog/dialog.component';
import { InviteProductsComponent } from './invite-products/invite-products.component';
import { AddProductsToSupplierComponent } from './add-products-to-supplier/add-products-to-supplier.component';
import { SupplierSearchComponent } from './supplier-search/supplier-search.component';
import {ImageUploadModule} from 'angular2-image-upload';
import {ProductsService} from './products.service';
import { DialogEditProductsComponent } from './dialog-edit-products/dialog-edit-products.component';
import { ShowAllProductsComponent } from './show-all-products/show-all-products.component';
import {AddProductsAllDBComponent} from './add-products-all-db/add-products-all-db.component';
import { ShowAllSupplierComponent } from './show-all-supplier/show-all-supplier.component';
import {SupplierService} from './supplier.service';
import {AssociateProductToSupplierService} from './associate-product-to-supplier.service';
import {SupplierPrivateProductsService} from './supplier-private-products.service';

@NgModule({
  declarations: [
    AppComponent,
    SupplierComponent,
    MockSupplierComponent,
    ServerConnectionComponent,
    LoginPageComponent,
    DialogComponent,
    InviteProductsComponent,
    AddProductsToSupplierComponent,
    SupplierSearchComponent,
    DialogEditProductsComponent,
    ShowAllProductsComponent,
    AddProductsAllDBComponent,
    ShowAllSupplierComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireModule.initializeApp(environment.firebase, 'Supply'),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MdButtonModule,
    MdCheckboxModule,
    MdDialogModule,
    Ng2Bs3ModalModule,
    ImageUploadModule.forRoot(),


  ],
  exports: [MdButtonModule, MdCheckboxModule],
  providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }, ProductsService ,
    SupplierService , AssociateProductToSupplierService , SupplierPrivateProductsService],
  entryComponents: [ DialogComponent , DialogEditProductsComponent , ShowAllProductsComponent , ShowAllSupplierComponent],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {
}
