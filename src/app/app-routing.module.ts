import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServerConnectionComponent} from './server-connection/server-connection.component';
import {SupplierComponent} from './supplier/supplier.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {InviteProductsComponent} from './invite-products/invite-products.component';
import {AddProductsAllDBComponent} from './add-products-all-db/add-products-all-db.component';
import {AddProductsToSupplierComponent} from './add-products-to-supplier/add-products-to-supplier.component';
import {HomeComponent} from './home/home.component';
import {OrderComponent} from './order/order.component';
import {HomeAfterLoginComponent} from './home-after-login/home-after-login.component';
import {OrderForCurrectSupplierComponent} from "./order-for-currect-supplier/order-for-currect-supplier.component";

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full'  },
  { path: 'server', component: ServerConnectionComponent},
  { path: 'supplier', component: SupplierComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'correctSupplierProducts', component: AddProductsToSupplierComponent},
  { path: 'home', component: HomeComponent},
  { path: 'order', component: OrderComponent},
  { path: 'orderCurrect', component: OrderForCurrectSupplierComponent},
  { path: 'homeAfterLogin', component: HomeAfterLoginComponent
  },


];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
