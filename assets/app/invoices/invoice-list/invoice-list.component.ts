import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Invoice } from '../invoice.model';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class invoiceListComponent implements OnInit, OnDestroy {
  invoices: Invoice[];
  private subscription: Subscription;

  constructor(private invoiceService: InvoiceService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.invoiceService.invoiceChanged
      .subscribe(
        (invoices: Invoice[]) => {
          this.invoices = invoices;
        }
      );
    this.invoices = this.invoiceService.getInvoices();
    console.log(this.invoices);
  }

  onNewInvoice() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
