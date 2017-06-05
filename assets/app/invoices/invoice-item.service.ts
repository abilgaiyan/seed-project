import {InvoiceItem} from './invoiceitem.model';

import {Subject} from 'rxjs/Subject';

export class InvoiceItemService {
 invoiceitems: InvoiceItem[];
 invoiceitemChanged = new  Subject<InvoiceItem[]>();
  constructor(){}
  setInvoiceItems(invoiceitems: InvoiceItem[]){
    this.invoiceitems = invoiceitems;
    this.invoiceitemChanged.next(this.invoiceitems.slice());

  }

  getInvoiceItems(){
    if (this.invoiceitems)
      return this.invoiceitems.slice();
    return this.invoiceitems;
  }

  getInvoiceItem(id:number){
    const index = this.invoiceitems.findIndex(x=> x.id == id);
    if (index !== -1)
     return this.invoiceitems[index];
  }

  getInvoiceItemByInvoiceId(invoice_id:number){
    let items: InvoiceItem[] = this.invoiceitems.filter(x=> x.invoice_id == invoice_id);
    return items;
  }

  addInvoiceItem(invoiceitem:InvoiceItem){
    this.invoiceitems.push(invoiceitem);
    this.invoiceitemChanged.next(this.invoiceitems.slice());

  }

  updateInvoiceItem(invoiceitem:InvoiceItem){
    const index = this.invoiceitems.indexOf(invoiceitem);
    if (index !== -1){
     this.invoiceitems[index] = invoiceitem;
     this.invoiceitemChanged.next(this.invoiceitems.slice());
   }
  }

  deleteInvoiceItem(invoiceitem:InvoiceItem){
    const index = this.invoiceitems.indexOf(invoiceitem);
    if (index !== -1){
     this.invoiceitems.splice(index,1);
     this.invoiceitemChanged.next(this.invoiceitems.slice());
   }
  }

}
