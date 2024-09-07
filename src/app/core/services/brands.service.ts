import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private readonly _HttpClient=inject(HttpClient);

 getAllBrands():Observable<any>{
return this._HttpClient.get(`${environment.baseURL}/api/v1/brands`)
  }

  getSpecificBrands(id:string|null):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/brands/${id}`)
      }
}
