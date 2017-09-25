import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServerConnectionComponent} from './server-connection/server-connection.component';
import {SupplierComponent} from './supplier/supplier.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {InviteProductsComponent} from './invite-products/invite-products.component';
import {AddProductsAllDBComponent} from './add-products-all-db/add-products-all-db.component';
import {AddProductsToSupplierComponent} from "./add-products-to-supplier/add-products-to-supplier.component";


const routes: Routes = [
  { path: 'server', component: ServerConnectionComponent},
  { path: 'supplier', component: SupplierComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'products', component: AddProductsAllDBComponent},
  { path: 'correctSupplierProducts', component: AddProductsToSupplierComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
