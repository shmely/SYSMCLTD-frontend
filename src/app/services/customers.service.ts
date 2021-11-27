import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject, pipe } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Customer } from '../model/customer';
import { Response } from '../model/response';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private baseUrl = (environment.production) ? '/api' : 'https://localhost:44302/api';
  private _customers$ = new BehaviorSubject<Customer[]>([]);
  private _error$=new BehaviorSubject<string>('');
  public error$=this._error$.asObservable();
  public customers$ = this._customers$.asObservable();
  
  constructor(
    private http: HttpClient, private router: Router
  ) { }

  getCustomers() {
    console.log(this.baseUrl);

    try {
      this.http.get<Response<Customer[]>>(`${this.baseUrl}/customer`).pipe(
        map(r => {
          if (!r.success) throw (r.message);
          return r.data;
        }
        )
      ).subscribe(cust => this._customers$.next(cust));

    } catch (error) {
      console.log(error);
    }
  }
  deleteCustomer(customer: Customer) {
    try {
      console.log(`${this.baseUrl}/customer/${customer.id}`);
      this.http.delete<Response<Customer>>(`${this.baseUrl}/customer/${customer.id}`).subscribe(({
        next: data => {
          this.getCustomers();
        },
        error: error => {
          this.router.navigate(['/error']);
        }
      }))

    } catch (error) {

      console.log(error)
    }
  }
  saveCustomer(customer: Customer) {
    console.log(customer);
   
      this.http.post<Response<Customer>>(`${this.baseUrl}/customer`, customer).subscribe(({
        next: data => {
          if (data.success) this.router.navigate(['/customers']);
          else if (data.message.includes('Violation of UNIQUE KEY')) this._error$.next('Customer number must be unique')
          else this.router.navigate(['/error']);
        },
        error: error => {
          this.router.navigate(['/error']);
        }
      }));
  } 

}
