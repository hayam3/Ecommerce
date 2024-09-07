
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const _Router=inject(Router)
  const _PLATFORM_ID=inject(PLATFORM_ID)
 
 if ( isPlatformBrowser(_PLATFORM_ID)) {
  if (localStorage.getItem('userToken') !== null) {
    // _Router.navigate(['/blank/home']);

    return true;
  }
  else{

    _Router.navigate(['/auth/login']);

     return false;
  }
 }else{
  return false
 }
  
};