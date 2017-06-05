import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Customer} from './customer.model';
import {CustomerService} from './customer.service';

@Component({
   selector:'app-customer',
   templateUrl:'customer.component.html',
   styleUrls: ['customer.component.css']
 })
export class CustomerComponent implements OnInit, OnDestroy {
  customers: Customer[];
  subscription: Subscription;
  constructor(private customerService: CustomerService){

  }
  ngOnInit(){
    this.customerService.customersChanged.subscribe(
      (customers: Customer[])=>{
        this.customers = customers;
      }
    );
    this.customers = this.customerService.getCustomers();
  }
  onEditCustomer(customer:Customer){
     this.customerService.updateCustomer(customer);
  }
  ngOnDestroy(){
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
