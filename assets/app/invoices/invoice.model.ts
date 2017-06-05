import { Customer } from '../customers/customer.model';
import {InvoiceItem} from './invoiceitem.model';

export class Invoice{
  public id: number;
  public customer_id: number;
  public discount: number;
  public total: number;
  public customer: Customer;
  public invoiceitems:InvoiceItem[];
  public customerlist: Customer[];


  constructor(id:number,
              customer_id: number,
              discount: number,
              total:number,
              customer:Customer,
              invoiceitems:InvoiceItem[]){
    this.id = id;
    this.customer_id=customer_id;
    this.discount = discount;
    this.total = total;
    this.customer = customer;
    this.invoiceitems = invoiceitems;
  }
}
