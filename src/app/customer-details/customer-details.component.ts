import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from '../model/customer';
import { CustomersService } from '../services/customers.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  public customer: Customer;
  public isEditMode: boolean = false;
  public error: string = '';
  currentKey: string = 'current-customer';


  subscription: Subscription;
  constructor(private customersService: CustomersService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.customersService.error$.subscribe(error => this.error = error);
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.isEditMode = true;
      this.customer = { id: null, isDeleted: false, customerNumber: null, created: null, name: '', contacts: [], addresses: [] };
    } else {
      this.subscription = this.customersService.customers$.subscribe((customers) => {
        this.customer = customers.find(c => c.id === parseInt(id));
        if (!this.customer) {
          this.customer = JSON.parse(localStorage.getItem(this.currentKey));
        }
        else {
          localStorage.setItem(this.currentKey, JSON.stringify(this.customer));
        }
      })
    }
  }
  onAddRow(type: string) {
    if (!this.isEditMode) return;
    if (type === 'address') {
      this.customer.addresses.push({ customerId: this.customer.id, isDeleted: false, city: '', street: '', id: null, created: null });
    } else {
      this.customer.contacts.push({ customerId: this.customer.id, isDeleted: false, fullName: '', officeNumber: '', id: null, created: null });
    }
  }
  onFocusOutEvent() {
    localStorage.setItem(this.currentKey, JSON.stringify(this.customer));
  }
  toggleEdit() {
    this.isEditMode = !this.isEditMode;
  }
  save() {
    console.log('before save');
    try {
      this.customersService.saveCustomer(this.customer);
    } catch (error) {
      console.log('test');
      console.log(error);
      this.error = error;
    }

  }
  onGoBack() {

    if (!this.isEditMode) this.goBack();
    else {
      console.log('in edit mode')
      const dialogRef = this.dialog.open(DialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) this.goBack();
      });
    }

  }
  goBack() {
    localStorage.removeItem(this.currentKey);
    this.router.navigate(['/customers']);
  }
}
