import {Invoice} from './invoice.model';
import {CustomerService} from '../customers/customer.service';
import {Subject} from 'rxjs/Subject';

export class InvoiceService {
 invoices: Invoice[];
 invoiceChanged = new  Subject<Invoice[]>();
  constructor(){}
  setInvoices(invoices: Invoice[]){
    this.invoices = invoices;
    this.invoiceChanged.next(this.invoices.slice());

  }

  getInvoices(){
    if (this.invoices)
      return this.invoices.slice();
    return this.invoices;
  }

  getInvoice(id:number){
    const index = this.invoices.findIndex(x=> x.id == id);
    if (index !== -1)
     return this.invoices[index];
  }

  addInvoice(invoice:Invoice){
  //  invoice.customer_id = invoice.customer.id;
    for(let invoiceitem of invoice.invoiceitems){
       
      invoiceitem.product_id = invoiceitem.product.id;
    }

    if (!this.invoices)
     this.invoices = [];

     const newId = this.invoices.length + 1;
    invoice.id = newId;
    this.invoices.push(invoice);
    this.invoiceChanged.next(this.invoices.slice());

  }

  updateInvoice(invoice:Invoice){
    const index = this.invoices.indexOf(invoice);
    if (index !== -1){
     this.invoices[index] = invoice;
     this.invoiceChanged.next(this.invoices.slice());
   }
  }

  deleteInvoice(invoice:Invoice){
    const index = this.invoices.indexOf(invoice);
    if (index !== -1){
     this.invoices.splice(index,1);
     this.invoiceChanged.next(this.invoices.slice());
   }
  }

}
