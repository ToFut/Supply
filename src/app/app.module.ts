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
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import { GestureConfig, MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    SupplierComponent,
    MockSupplierComponent,
    ServerConnectionComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MdButtonModule,
    MdCheckboxModule

  ],
  exports: [MdButtonModule, MdCheckboxModule],
  providers: [    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
