import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomersComponent } from './customers/customers.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '' ,component: HomeComponent},
  { path: 'customers', component: CustomersComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: 'customers/add', component: CustomerDetailsComponent },
  { path: 'customers/edit/:id', component: CustomerDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
