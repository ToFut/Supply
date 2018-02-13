///<reference path="../../node_modules/angularfire2/auth/auth.module.d.ts"/>
import {DropdownMultiselectModule} from 'ng2-dropdown-multiselect';
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SupplierComponent} from './supplier/supplier.component';
import {MockSupplierComponent} from './mock-supplier/mock-supplier.component';
import {ServerConnectionComponent} from './server-connection/server-connection.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from '../environments/environment';
import {Ng2Bs3ModalModule} from '../../node_modules/ng2-bs3-modal/ng2-bs3-modal';
import 'hammerjs';
import {LoginPageComponent} from './login-page/login-page.component';
import {DialogComponent} from './dialog/dialog.component';
import {InviteProductsComponent} from './invite-products/invite-products.component';
import {AddProductsToSupplierComponent} from './add-products-to-supplier/add-products-to-supplier.component';
import {SupplierSearchComponent} from './supplier-search/supplier-search.component';
import {ImageUploadModule} from 'angular2-image-upload';
import {ProductsService} from './products.service';
import {DialogEditProductsComponent} from './dialog-edit-products/dialog-edit-products.component';
import {ShowAllProductsComponent} from './show-all-products/show-all-products.component';
import {ShowAllSupplierComponent} from './show-all-supplier/show-all-supplier.component';
import {SupplierService} from './supplier.service';
import {AssociateProductToSupplierService} from './associate-product-to-supplier.service';
import {SupplierPrivateProductsService} from './supplier-private-products.service';
import {HomeComponent} from './home/home.component';
import {AmazingTimePickerModule} from 'amazing-time-picker'; // this line you need
import { FormWizardModule } from 'angular2-wizard';

import {
  AccordionModule,
  CheckboxModule, FieldsetModule, InputMaskModule, InputTextModule, MultiSelectModule, PasswordModule,
  SelectButtonModule,
} from 'primeng/primeng';
import {
  MatSlideToggleModule,
  MatSelectModule,
  MatButtonModule,
  MatCheckboxModule,
} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TooltipModule} from 'primeng/tooltip';
import {SuiModule} from 'ng2-semantic-ui';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

import {SplitButtonModule} from 'primeng/primeng';
import {OrderComponent} from './order/order.component';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {HomeAfterLoginComponent} from './home-after-login/home-after-login.component';
import {MatchSupplierService} from './match-supplier.service';
import {OrderForCurrectSupplierComponent} from './order-for-currect-supplier/order-for-currect-supplier.component';
import {ReciveOrderComponent} from './recive-order/recive-order.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {LoaderComponent} from './loader/loader.component';
import {ShowProductComponent} from './show-product/show-product.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {TestBed} from '@angular/core/testing';
import {HomeRegisterComponent} from './home-register/home-register.component';
import {Ng2CompleterModule} from 'ng2-completer';
import {SatisticsComponent} from './satistics/satistics.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ReturnProductsComponent} from './return-products/return-products.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {SettingsComponent} from './settings/settings.component';
import {AcceptOrderComponent} from './accept-order/accept-order.component';
import {SignUpPageSubUserComponent} from './sign-up-page-sub-user/sign-up-page-sub-user.component';
import {SubUserOrderListComponent} from './sub-user-order-list/sub-user-order-list.component';
import {SubUserReciveListComponent} from './sub-user-recive-list/sub-user-recive-list.component';
import {SubUserTodoListComponent} from './sub-user-todo-list/sub-user-todo-list.component';
import {EditSupplierComponent} from './edit-supplier/edit-supplier.component';
import {DeleteSupplierComponent} from './delete-supplier/delete-supplier.component';
import {DeleteProductComponent} from './delete-product/delete-product.component';
import {CalcSumService} from './satistics/services/calc-sum.service';
import {CalcAmountService} from './satistics/services/calc-amount.service';
import {SuppliersDeatilService} from './satistics/services/suppliers-deatil.service';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {GetReturnService} from './getReturn.service';
import { ContactComponent } from './contact/contact.component';

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
    ShowAllSupplierComponent,
    HomeComponent,
    OrderComponent,
    HomeAfterLoginComponent,
    OrderForCurrectSupplierComponent,
    ReciveOrderComponent,
    TodoListComponent,
    LoaderComponent,
    ShowProductComponent,
    HomeRegisterComponent,
    SatisticsComponent,
    SignUpComponent,
    ReturnProductsComponent,
    SettingsComponent,
    AcceptOrderComponent,
    SignUpPageSubUserComponent,
    SubUserOrderListComponent,
    SubUserReciveListComponent,
    SubUserTodoListComponent,
    EditSupplierComponent,
    DeleteSupplierComponent,
    DeleteProductComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    Ng2Bs3ModalModule,
    ImageUploadModule.forRoot(),
    TooltipModule,
    SplitButtonModule,
    AngularMultiSelectModule,
    InputTextModule,
    FormsModule,
    CheckboxModule,
    SelectButtonModule,
    MultiSelectModule,
    Ng2CompleterModule,
    PasswordModule,
    InputMaskModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    FieldsetModule,
    AccordionModule,
    AmazingTimePickerModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatTooltipModule,
    SuiModule,
    NgbModule,
    ChartsModule,
    NgxChartsModule,
    FormWizardModule
  ],
  exports: [OrderComponent],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy} ,
    ProductsService,
    SupplierService, AssociateProductToSupplierService, SupplierPrivateProductsService,
    MatchSupplierService, CalcSumService , CalcAmountService , GetReturnService ,
    SuppliersDeatilService , MatButtonModule, MatTooltipModule , MatCheckboxModule],
  entryComponents: [DialogEditProductsComponent , ShowAllProductsComponent,
    ShowAllSupplierComponent, DeleteProductComponent,
    DeleteSupplierComponent, ShowProductComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {
}
