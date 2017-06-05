import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Product} from './product.model';
import {ProductService} from './product.service';
@Component({
  selector:'app-products',
  templateUrl:'product.component.html',
  styleUrls:[
    'product.component.css'
  ]
})
export class ProductComponent implements OnInit, OnDestroy {
  products: Product[];
  private subscription: Subscription;
  constructor( private productService: ProductService){

  }
  ngOnInit(){
    this.subscription = this.productService.productsChanged.subscribe(
      (products: Product[])=>{
        this.products = products;
      }
    );
    this.products = this.productService.getProducts();
  }
  ngOnDestroy(){
    if (this.subscription)
      this.subscription.unsubscribe();
  }
  onEditProduct(product: Product){
    this.productService.updateProduct(product);
  }
}
