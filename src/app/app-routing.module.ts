import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServerConnectionComponent} from './server-connection/server-connection.component';
import {SupplierComponent} from './supplier/supplier.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {InviteProductsComponent} from './invite-products/invite-products.component';
import {AddProductsAllDBComponent} from './add-products-all-db/add-products-all-db.component';


const routes: Routes = [
  { path: '', redirectTo: '/supplier', pathMatch: 'full' },
  { path: 'server', component: ServerConnectionComponent},
  { path: 'supplier', component: SupplierComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'products', component: AddProductsAllDBComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
