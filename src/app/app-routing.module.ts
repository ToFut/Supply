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
import {OrderForCurrectSupplierComponent} from './order-for-currect-supplier/order-for-currect-supplier.component';
import {ReciveOrderComponent} from './recive-order/recive-order.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {ShowProductComponent} from './show-product/show-product.component';
import {ShowAllSupplierComponent} from './show-all-supplier/show-all-supplier.component';
import {DialogComponent} from './dialog/dialog.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full'  },
      { path: 'supplier', component: SupplierComponent , pathMatch: 'full'},
      { path: 'login', component: LoginPageComponent , pathMatch: 'full' },
      { path: 'correctSupplierProducts', component: AddProductsToSupplierComponent , pathMatch: 'full'},
      { path: 'home', component: HomeComponent , pathMatch: 'full'},
      { path: 'order', component: OrderComponent , pathMatch: 'full'},
      { path: 'orderCurrect', component: OrderForCurrectSupplierComponent , pathMatch: 'full'},
      { path: 'homeAfterLogin', component: HomeAfterLoginComponent , pathMatch: 'full'},
      { path: 'reciveOrder', component: ReciveOrderComponent , pathMatch: 'full'},
      { path: 'todoList', component: TodoListComponent , pathMatch: 'full'},
      { path: 'dialogSupplier', component: DialogComponent , pathMatch: 'full'},
      { path: 'showProduct', component: ShowProductComponent , pathMatch: 'full'}
      ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
