import { environment } from './environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
token:any=null;
private readonly _HttpClient=inject(HttpClient);
private readonly _Router=inject(Router);
 
setRegisterData(data:object):Observable<any>{
 return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signup`,data)
}
setloginData(data:object):Observable<any>{
 return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signin`,data)
}

saveToken(){
  if (localStorage.getItem('userToken')!==null) {

    this.token=  jwtDecode( localStorage.getItem('userToken')! );
    console.log(this.token.id);
    
  
  }
}


logOut(){
  localStorage.removeItem('userToken')
  this.token=null;
  this._Router.navigate(['auth/login']);
}


setEmailVerify(data:object):Observable<any>{
return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/forgotPasswords`, data);
}

setCodeVerify(data:object):Observable<any>{
return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/verifyResetCode`, data);
}

setResetPassword(data:object):Observable<any>{
return this._HttpClient.put(`${environment.baseURL}/api/v1/auth/resetPassword`, data);
}
}
