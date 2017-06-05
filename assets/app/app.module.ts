import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './core/header/header.component';
import {CustomerComponent} from './customers/customer.component';
import {ProductComponent} from './products/product.component';
import {CustomerService} from './customers/customer.service';
import {InvoicesComponent} from './invoices/invoices.component';
import {InvoiceStartComponent} from './invoices/invoice-start/invoice-start.component';
import {InvoiceEditComponent} from './invoices/invoice-edit/invoice-edit.component';
import {InvoiceDetailComponent} from './invoices/invoice-detail/invoice-detail.component';
import {invoiceListComponent} from './invoices/invoice-list/invoice-list.component';
import {InvoiceItemComponent}  from './invoices/invoice-list/invoice-item/invoice-item.component';
import {InvoiceService} from './invoices/invoice.service';
import {InvoiceItemService} from './invoices/invoice-item.service';
import {ProductService} from './products/product.service';
import {DataStorageService} from './shared/data-storage.service';
import {DropdownDirective} from './shared/dropdown.directive';
import {objectToArray} from './shared/objecttoarray-pipe';
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customers',component: CustomerComponent },
  { path: 'products', component: ProductComponent },
  { path: 'invoices', component: InvoicesComponent, children: [
    { path: '', component: InvoiceStartComponent },
    { path: 'new', component: InvoiceEditComponent },
    { path: ':id', component: InvoiceDetailComponent },
    { path: ':id/edit', component: InvoiceEditComponent },
  ] },
];
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        CustomerComponent,
        ProductComponent,
        DropdownDirective,
        InvoicesComponent,
        InvoiceStartComponent,
        InvoiceEditComponent,
        InvoiceDetailComponent,
        invoiceListComponent,
        InvoiceItemComponent,
        objectToArray

    ],
    imports: [
      BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    bootstrap: [AppComponent],
    providers:[
      CustomerService,
      ProductService,
      InvoiceService,
      InvoiceItemService,
      DataStorageService
    ]
})
export class AppModule {

}
