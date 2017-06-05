import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Product} from './product.model';
//import {DataStorageService} from '../shared/data-storage.service';

@Injectable()
export class ProductService {
 products:Product[];
 productsChanged = new Subject<Product[]>();

 constructor(){

 }
 setProducts(products: Product[]) {
   this.products = products;
   this.productsChanged.next(this.products.slice());
 }
 getProducts(){
     if (this.products)
       return this.products.slice();
      // else
      //   this.datastorageService.getProducts();

     return   this.products;
 }
 getProduct(id:number){
   const index = this.products.findIndex(x => x.id==id);
   if (index !== -1){
     return this.products[index];
   }
   return null;


 }
 addProduct(product: Product){
   this.products.push(product);
   this.productsChanged.next(this.products.slice());
 }
 updateProduct(product: Product){
   const index = this.products.indexOf(product);
   if (index !== -1){
      this.products[index] = product;
      this.productsChanged.next(this.products.slice());
   }
 }

 deleteProduct(product: Product){
   const index = this.products.indexOf(product);
   if (index !== -1){
     this.products.splice(index, 1);
     this.productsChanged.next(this.products.slice());
   }
 }

}
