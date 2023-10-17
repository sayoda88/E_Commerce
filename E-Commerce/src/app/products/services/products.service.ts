import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient: HttpClient) { }
  getAllProducts(): Observable<any> {
    return this._HttpClient.get(`https://fakestoreapi.com/products`);
  }
  getAllCategory(): Observable<any> {
    return this._HttpClient.get(`https://fakestoreapi.com/products/categories`);
  }
  getProdByCategory(cateName: any): Observable<any> {
    return this._HttpClient.get(`https://fakestoreapi.com/products/category/${cateName}`);
  }
  getProdByID(id: any): Observable<any> {
    return this._HttpClient.get(`https://fakestoreapi.com/products/${id}`)
  }
}

