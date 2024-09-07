import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _AuthService= inject(AuthService)
  private readonly _Router=inject(Router)

  errorMessage:string='';

  isLoding:boolean=false;
  // ===============

  loginForm: FormGroup= new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
    
  })


  login(){
if (this.loginForm.valid) {
  console.log(this.loginForm.value);


this._AuthService.setloginData(this.loginForm.value).subscribe({
  next:(res)=>{
    console.log(res);

    if (res.message=="success") {
      localStorage.setItem('userToken', res.token);
      this._AuthService.saveToken();

      this._Router.navigate(['blank/home']);

          }
  },
  error:(err)=>{
    this.errorMessage=err.error.message;
    console.log(err);
  }
})
} else{
  this.loginForm.markAllAsTouched();
  this.loginForm.setErrors({mismatch:true})
}   
  }
}
