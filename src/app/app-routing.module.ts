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
import {SatisticsComponent} from './satistics/satistics.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ReturnProductsComponent} from './return-products/return-products.component';
import {SettingsComponent} from './settings/settings.component';
import {ShowAllProductsComponent} from './show-all-products/show-all-products.component';
import {AcceptOrderComponent} from './accept-order/accept-order.component';
import {SignUpPageSubUserComponent} from './sign-up-page-sub-user/sign-up-page-sub-user.component';
import {SubUserOrderListComponent} from './sub-user-order-list/sub-user-order-list.component';
import {SubUserReciveListComponent} from './sub-user-recive-list/sub-user-recive-list.component';
import {SubUserTodoListComponent} from './sub-user-todo-list/sub-user-todo-list.component';

const routes: Routes = [
      { path: 'supplier', component: SupplierComponent , pathMatch: 'full'},
      { path: 'correctSupplierProducts', component: AddProductsToSupplierComponent , pathMatch: 'full'},
      { path: 'home', component: HomeComponent , pathMatch: 'full'},
      { path: 'order', component: OrderComponent , pathMatch: 'full'},
      { path: 'orderCurrect', component: OrderForCurrectSupplierComponent , pathMatch: 'full'},
      { path: 'homeAfterLogin', component: HomeAfterLoginComponent , pathMatch: 'full'},
      { path: 'reciveOrder', component: ReciveOrderComponent , pathMatch: 'full'},
      { path: 'todoList', component: TodoListComponent , pathMatch: 'full'},
      { path: 'dialogSupplier', component: DialogComponent , pathMatch: 'full'},
      { path: 'showProduct', component: ShowProductComponent , pathMatch: 'full'},
      { path: 'satistics', component: SatisticsComponent , pathMatch: 'full'},
      { path: 'loginPage', component: LoginPageComponent , pathMatch: 'full'},
      { path: 'signUp', component: SignUpComponent , pathMatch: 'full'},
      { path: 'returnProdcts', component: ReturnProductsComponent , pathMatch: 'full'},
      { path: 'setting', component: SettingsComponent , pathMatch: 'full'},
      { path: 'showCurrentSupplierProducts', component: ShowAllProductsComponent , pathMatch: 'full'},
      { path: 'acceptOrder', component: AcceptOrderComponent , pathMatch: 'full'},
      { path: 'subUserSignUp', component: SignUpPageSubUserComponent , pathMatch: 'full'},
      { path: 'subUserOrderList', component: SubUserOrderListComponent , pathMatch: 'full'},
       { path: 'subUserReciveList', component: SubUserReciveListComponent , pathMatch: 'full'},
      { path: 'subUserTodoList', component: SubUserTodoListComponent , pathMatch: 'full'},





];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
