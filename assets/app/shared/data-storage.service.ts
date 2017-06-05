import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {CustomerService} from '../customers/customer.service';
import {Customer} from '../customers/customer.model';
import {Product} from '../products/product.model';
import {ProductService} from '../products/product.service';
import {Invoice} from '../invoices/invoice.model';
import {InvoiceService} from '../invoices/invoice.service';
import {InvoiceItem} from '../invoices/invoiceitem.model';
import {InvoiceItemService} from '../invoices/invoice-item.service';

@Injectable()
export class DataStorageService {

  constructor(private http: Http,
     private customerService: CustomerService,
     private productService: ProductService,
     private invoiceService: InvoiceService,
     private invoiceitemService: InvoiceItemService){

  }
  getCustomers(){

   this.http.get('/api/customers' )
     .map(
       (response: Response) => {
         const customers: Customer[] = response.json();

         return customers;
       }
     )
     .subscribe(
       (customers: Customer[]) => {
         this.customerService.setCustomers(customers);
       }
     );
  }

  getProducts(){
     this.http.get('/api/products').map(
       (response: Response) => {
         const products: Product[] = response.json();
         return products;
       }
     ).subscribe(
       (products: Product[]) => {
         this.productService.setProducts(products);
       }
     );
  }

  getInvoices(){
     this.http.get('/api/invoices').map(
       (response: Response) => {
         const invoices: Invoice[] = response.json();
         for (let invoice of invoices) {
            if (!invoice['InvoiceItems']) {
              invoice['InvoiceItems'] = [];
            }
            invoice['customer'] = this.customerService.getCustomer(invoice.customer_id);
          }
         return invoices;
       }
     ).subscribe(
       (invoices: Invoice[]) => {

         this.invoiceService.setInvoices(invoices);
       }
     );
  }

  getInvoiceItemsByInvoiceId(invoice_id: number){
     this.http.get(`/api/invoices/${invoice_id}/items`).map(
       (response: Response) => {
         const invoiceitems: InvoiceItem[] = response.json();
         for (let invoiceitem of invoiceitems) {
            invoiceitem['product'] = this.productService.getProduct(invoiceitem.product_id);
          }
         return invoiceitems;
       }
     ).subscribe(
       (invoiceitems: InvoiceItem[]) => {

         this.invoiceitemService.setInvoiceItems(invoiceitems);
       }
     );
  }

}
