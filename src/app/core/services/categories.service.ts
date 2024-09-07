import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
 
  private readonly _HttpClient=inject(HttpClient)

  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/categories`)
      }

      getSpecificCategory(id:string):Observable<any>{
        return this._HttpClient.get(`${environment.baseURL}/api/v1/categories/${id}`)
      }
}
