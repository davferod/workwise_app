import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '@shared/models/product.model';



@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private http = inject(HttpClient);

  constructor() { }

  getProducts() {
    const url = new URL('https://api.escuelajs.co/api/v1/products');
    return this.http.get<Product[]>(url.toString());
  }
}
