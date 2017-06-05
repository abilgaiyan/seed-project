import {Customer} from './customer.model';
import {Subject} from 'rxjs/Subject';

export class CustomerService {
  customers: Customer[];
  customersChanged = new  Subject<Customer[]>();
  constructor(){}
  setCustomers(customers: Customer[]) {
    this.customers = customers;
    this.customersChanged.next(this.customers.slice());
  }
  getCustomers(){


      if (this.customers)
        return this.customers.slice();
      // else
      //   this.gettmpCustomers();

      return   this.customers;
  }
  getCustomer(id:number){
    const index = this.customers.findIndex(x => x.id==id);
    if (index !== -1){
      return this.customers[index];
    }
    return null;


  }
  addCustomer(customer: Customer){
    this.customers.push(customer);
    this.customersChanged.next(this.customers.slice());
  }
  updateCustomer(customer: Customer){
    const index = this.customers.indexOf(customer);
    if (index !== -1){
       this.customers[index] = customer;
       this.customersChanged.next(this.customers.slice());
    }
  }
  deleteCustomer(customer: Customer){
    const index = this.customers.indexOf(customer);
    if (index !== -1){
      this.customers.splice(index, 1);
      this.customersChanged.next(this.customers.slice());
    }
  }
}
