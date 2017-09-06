///<reference path="../../node_modules/@angular/material/typings/module.d.ts"/>
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { SupplierComponent } from './supplier/supplier.component';
import { MockSupplierComponent } from './mock-supplier/mock-supplier.component';
import { ServerConnectionComponent } from './server-connection/server-connection.component';
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

import 'hammerjs';
import { LoginPageComponent } from './login-page/login-page.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ModalModule } from 'ng2-modal-dialog/modal.module';
import { LoginModalComponent } from './login-modal/login-modal.component';
import {DialogsService} from './dialog.service';

declare var require: any;
declare var module: any;



@NgModule({
  declarations: [
    AppComponent,
    SupplierComponent,
    MockSupplierComponent,
    ServerConnectionComponent,
    LoginPageComponent,
    ConfirmDialogComponent,
    LoginModalComponent
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
    MdButtonModule,
    ModalModule




  ],
  exports: [MdButtonModule, MdCheckboxModule, ConfirmDialogComponent],
  providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig } , DialogsService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {
}
