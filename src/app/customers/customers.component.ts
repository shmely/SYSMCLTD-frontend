import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/customer';
import { CustomersService } from '../services/customers.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  public customers: Customer[];
  subscription: Subscription;
  constructor(private customersService: CustomersService, private router: Router) { }

  ngOnInit(): void {
    this.customersService.getCustomers();
    this.subscription = this.customersService.customers$.subscribe((customers) => {
      this.customers = [...customers];
      console.log(this.customers);
    })
  }
  onDelete(customer : Customer) {
    console.log(customer);
    this.customersService.deleteCustomer(customer);
  }
  onDetails(customer : Customer) {

    this.router.navigate(['/customers/edit/' + customer.id  ]);
   
  }
  onAddCustomer() {
    this.router.navigate(['/customers/add']);
  }

}
