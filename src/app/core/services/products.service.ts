import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _HttpClient=inject(HttpClient)
  // constructor() { }

  getAllproducts():Observable<any>{
return this._HttpClient.get(`${environment.baseURL}/api/v1/products`)
  }


  
  getSpecificProducts(id:string|null):Observable<any>{
return this._HttpClient.get(`${environment.baseURL}/api/v1/products/${id}`)
  }
}
