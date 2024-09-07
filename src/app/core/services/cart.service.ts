import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _HttpClient = inject(HttpClient);
  myHeader: any = { token: localStorage.getItem('userToken') };

  addProductToCart(id: string): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseURL}/api/v1/cart`,
      {
        productId: id,
      },
      {
        headers: this.myHeader,
      }
    );
  }

  getProductsCate(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/api/v1/cart`, {
      headers: this.myHeader,
    });
  }

  removeProductCart(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart/${id}`, {
      headers: this.myHeader,
    });
  }

  UpdateCartProductQuantity(id: string, newCount: number): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseURL}/api/v1/cart/${id}`,
      {
        count: newCount,
      },
      { headers: this.myHeader }
    );
  }


  clearCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart` ,{ headers: this.myHeader,})
  }
}
