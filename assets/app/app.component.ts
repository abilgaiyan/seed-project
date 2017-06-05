import { Component, OnInit } from '@angular/core';
import {DataStorageService} from './shared/data-storage.service';
//import { Response } from '@angular/http';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService ){

  }
  ngOnInit(){
    this.dataStorageService.getCustomers();
    this.dataStorageService.getProducts();
  }

}
