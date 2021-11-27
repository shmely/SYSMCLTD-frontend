import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { CommonModule } from '@angular/common';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { HomeComponent } from './home/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { ErrorPageComponent } from './error-page/error-page.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule} from '@angular/material/dialog'



@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerDetailsComponent,
    HomeComponent,
    ErrorPageComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
