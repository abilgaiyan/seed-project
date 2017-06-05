import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl,FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { InvoiceService } from '../invoice.service';
import { CustomerService } from '../../customers/customer.service';
import { ProductService } from '../../products/product.service';

import { Customer } from '../../customers/customer.model';
import { Product } from '../../products/product.model';
import {Invoice} from '../../invoices/invoice.model';
import {InvoiceItem} from '../../invoices/invoiceitem.model';

const resolvedPromise = Promise.resolve(null);
@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit {
  id: number;
  editMode = false;
  invoiceForm: FormGroup;
  productList: Product[];
  customerList: Customer[];
  invoice: Invoice;
  constructor(private route: ActivatedRoute,
              private invoiceService: InvoiceService,
              private customerService: CustomerService,
              private productService: ProductService,
              private router: Router) {
                this.fillCustomerlist();
                this.initForm();
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.fillProductlist();
          this.fillCustomerlist();
          this.initForm();
        }
      );

      this.invoiceForm.get('invoiceitems').valueChanges.subscribe(values  => {

      //  let formarray =  (<FormArray>this.invoiceForm.get('invoiceitems'));
      let total = 0;
      resolvedPromise.then(() => {
        total= values.reduce((acc, cur) =>  acc + cur.subtotal, 0);
        (<FormControl>this.invoiceForm.controls['total']).setValue(total)
     });

       //value[0].price.set(product.price);
       //value.controls['price']
       //value.controls['price'].patchValue({'price': product.price});

       //value.price = product.price;
      // console.log(product);
       //console.log(formgroup.controls['price'].value);
  });



  }
  onQuantityChange(data, formarrayindex){

    let formarray =  (<FormArray>this.invoiceForm.get('invoiceitems'));
    let formgroup = <FormGroup> formarray.controls[formarrayindex];
    let qty =  parseFloat(data);

    let price = (<FormControl>formgroup.controls['price']).value;
    (<FormControl>formgroup.controls['subtotal']).setValue(price * qty);

  }
  getCurrentInvoiceTotal(){
    let formarray =  (<FormArray>this.invoiceForm.get('invoiceitems'));

  }
  onProductChange(data, formarrayindex){
  //  console.log(formarrayindex);
  //  console.log(data);
    let formarray =  (<FormArray>this.invoiceForm.get('invoiceitems'));
    // console.log(formarray);
    // console.log(formarray.controls);//
    // console.log(formarray.controls.length);
    let formgroup = <FormGroup> formarray.controls[formarrayindex];
    //console.log(formgroup);
    //console.log(formgroup.controls);
  //  console.log(formgroup.controls.length);

   let product =  (<Product>JSON.parse(data));
   //console.log(product.price);
   //console.log(data.price);
  // (<FormControl>formgroup.controls['price']).setValue(product.price);
   (<FormControl>formgroup.controls['price']).setValue(product.price);
   let qty = (<FormControl>formgroup.controls['quantity']).value;
   (<FormControl>formgroup.controls['subtotal']).setValue(product.price * qty);
    //console.log(<FormControl>(formgroup.controls['price']).value);
  }
  fillProductlist(){

    this.productList = this.productService.getProducts();
  }

  fillCustomerlist(){
    this.customerList = this.customerService.getCustomers();

  }
  getInvoiceModelFromInvoiceForm(){
    //console.log(invoicefrm);
    // constructor(id:number,
    //             customer_id: number,
    //             discount: number,
    //             total:number,
    //             customer:Customer,
    //             invoiceitems:InvoiceItem[])

    const cust_id =(<Customer>JSON.parse(this.invoiceForm.value.customer)).id;
    let items:InvoiceItem[]  =[];
    for(let sitem of this.invoiceForm.value.invoiceitems){
        let item = (<InvoiceItem>sitem);
        let product = (<Product> JSON.parse(sitem.product));
        item.product = product;
        items.push(item)
    }
    let invoice = new Invoice(this.invoiceForm.value.id,
                              cust_id,
                              this.invoiceForm.value.discount,
                              this.invoiceForm.value.total,
                              (<Customer>JSON.parse(this.invoiceForm.value.customer)),
                              items );
    return invoice;
  }
  onSubmit() {
      //console.log(this.invoiceForm.value);
      let invoice = this.getInvoiceModelFromInvoiceForm();
    if (this.editMode) {
      // this.invoiceService.updateInvoice(this.id, this.invoiceForm.value);

      this.invoiceService.updateInvoice(invoice);
    } else {

      this.invoiceService.addInvoice(invoice);

    }

    this.onCancel();
  }

  onAddInvoiceItems() {

    (<FormArray>this.invoiceForm.get('invoiceitems')).push(
      new FormGroup({
        //'id': new FormControl(null, Validators.required),
        'product': new FormControl(null,Validators.required),
        'quantity': new FormControl(1, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
        'price': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
        'subtotal': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteInvoiceItem(index: number) {
    (<FormArray>this.invoiceForm.get('invoiceitems')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let id = 0;
    let customer_id = 0;
    let discount =0;
    let total =0;

    let invoiceitems = new FormArray([]);


    if (this.editMode) {
       this.invoice = this.invoiceService.getInvoice(this.id);
      id = this.invoice.id;
      customer_id = this.invoice.customer_id;
      discount = this.invoice.discount;
      total = this.invoice.total;

      if (this.invoice['invoiceitems']) {
         console.log();
        for (let invoiceitem of this.invoice.invoiceitems) {
           console.log(invoiceitem);
          invoiceitems.push(
            new FormGroup({
            //  'id': new FormControl(invoiceitem.id, Validators.required),
            //  'product': new FormControl(invoiceitem.product_id, Validators.required),
              'product': new FormControl(invoiceitem.product, Validators.required),
              'quantity': new FormControl(invoiceitem.quantity, Validators.required),
              'price': new FormControl(invoiceitem.product.price, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
              'subtotal': new FormControl(invoiceitem.quantity * invoiceitem.product.price, Validators.required),
            })
          );
        }
      }
    }
    else{
      invoiceitems.push(
      new FormGroup({
      //  'id': new FormControl(0),
        'product': new FormControl(null,Validators.required),
        'quantity': new FormControl(1,[
           Validators.required,
           Validators.pattern(/^[1-9]+[0-9]*$/)
         ]),
        'price': new FormControl(),
        'subtotal': new FormControl(),
      })
    );
    }

    this.invoiceForm = new FormGroup({
      'id': new FormControl(id, Validators.required),
    //  'customer_id': new FormControl(customer_id, Validators.required),
      'customer': new FormControl(customer_id, Validators.required),
      'discount': new FormControl(discount, Validators.required),
      'total': new FormControl(total, Validators.required),
      'invoiceitems': invoiceitems
    });
  }

}
