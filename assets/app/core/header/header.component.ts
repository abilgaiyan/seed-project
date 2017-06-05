import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../../shared/data-storage.service';
//import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService
          //   ,private authService: AuthService
           ) {
  }

  onSaveData() {
  }

  onFetchData() {
    this.dataStorageService.getProducts();
    this.dataStorageService.getCustomers();
  }

  onLogout() {
  //  this.authService.logout();
  }
}
