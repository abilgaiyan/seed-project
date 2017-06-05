import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Invoice } from '../invoice.model';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
  invoice: Invoice;
  id: number;

  constructor(private invoiceService: InvoiceService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.invoice = this.invoiceService.getInvoice(this.id);
          console.log(this.id);
          console.log(this.invoice);
        }
      );
  }

  onAddToShoppingList() {

  }

  onEditInvoice() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteInvoice() {
    this.invoiceService.deleteInvoice(this.invoice);
    this.router.navigate(['/invoices']);
  }

}
