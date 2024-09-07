import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

private readonly _HttpClient=inject(HttpClient);
myHeaders:any={token: localStorage.getItem('userToken')}

checkOut(id:string|null ,shippingDetails:object):Observable<any>{

  return this._HttpClient.post(`${environment.baseURL}/api/v1/orders/checkout-session/${id}?url=${window.location.origin}`,
    {
      "shippingAddress":shippingDetails
    }
    ,
    {headers:this.myHeaders}
  )
}


getUserOrders(id:string|null):Observable<any>{

  return this._HttpClient.get(`${environment.baseURL}/api/v1/orders/user/${id}`)
}




}
