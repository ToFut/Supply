import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServerConnectionComponent} from './server-connection/server-connection.component';
import {SupplierComponent} from './supplier/supplier.component';


const routes: Routes = [
  { path: '', redirectTo: '/supplier', pathMatch: 'full' },
  { path: 'server', component: ServerConnectionComponent},
  { path: 'supplier', component: SupplierComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
