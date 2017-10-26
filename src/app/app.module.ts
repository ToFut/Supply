///<reference path="../../node_modules/@angular/material/typings/module.d.ts"/>
///<reference path="../../node_modules/daypilot-pro-angular/daypilot-angular.min.d.ts"/>
import { DropdownMultiselectModule } from 'ng2-dropdown-multiselect';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { SupplierComponent } from './supplier/supplier.component';
import { MockSupplierComponent } from './mock-supplier/mock-supplier.component';
import { ServerConnectionComponent} from './server-connection/server-connection.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {MdButtonModule, MdCheckboxModule, MdDialogModule , MdGridListModule} from '@angular/material';
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
import { HomeComponent } from './home/home.component';
import {TooltipModule} from 'primeng/primeng';
import {SplitButtonModule} from 'primeng/primeng';
import { OrderComponent } from './order/order.component';
import { CalendarModule } from 'angular2-calendar';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { HomeAfterLoginComponent } from './home-after-login/home-after-login.component';
import {MatchSupplierService} from './match-supplier.service';
import { OrderForCurrectSupplierComponent } from './order-for-currect-supplier/order-for-currect-supplier.component';
import { ReciveOrderComponent } from './recive-order/recive-order.component';


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
    ShowAllSupplierComponent,
    HomeComponent,
    OrderComponent,
    HomeAfterLoginComponent,
    OrderForCurrectSupplierComponent,
    ReciveOrderComponent,


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
    TooltipModule,
    SplitButtonModule,
    CalendarModule.forRoot(),
    MultiselectDropdownModule,
    AngularMultiSelectModule,
    MdGridListModule,
  ],
  exports: [MdButtonModule, MdCheckboxModule , OrderComponent],
  providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }, ProductsService ,
    SupplierService , AssociateProductToSupplierService , SupplierPrivateProductsService ,
    MatchSupplierService],
  entryComponents: [ DialogComponent , DialogEditProductsComponent , ShowAllProductsComponent ,
    ShowAllSupplierComponent , AddProductsAllDBComponent],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {
}
