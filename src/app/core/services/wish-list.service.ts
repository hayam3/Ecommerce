import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  private readonly _HttpClient = inject(HttpClient);
  myHeader: any = { token: localStorage.getItem('userToken') };


  addProductToWishList(id: string): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseURL}/api/v1/wishlist`,
      {
        productId: id,
      },
      {
        headers: this.myHeader,
      }
    );
  }

  getProductsWishList(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/api/v1/wishlist`, {
      headers: this.myHeader,
    });
  }



  
  removeProductWishList(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/wishlist/${id}`, {
      headers: this.myHeader,
    });
  }
}


