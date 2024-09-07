import { NgClass } from '@angular/common';
import { AuthService } from './../../core/services/auth.service';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _AuthService=inject(AuthService)
  private readonly _Router=inject(Router)

  errorMessage:string='';

  isLoding:boolean=false;

// ===========================
  registerForm:FormGroup= new FormGroup (
    {
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(25)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
    rePassword:new FormControl(null),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[1250][0-9]{8}$/)]),
  },this.confirmPass)


// ===========================
  confirmPass(f:AbstractControl){
   if(f.get('password')?.value===f.get('rePassword')?.value)
    {
       return null ;
   }
   else{
    return {mismatch:true}
   }
  }

// ===========================
  submit(){
        if(this.registerForm.valid){
           this.isLoding=true;
            console.log(this.registerForm.value);
            this._AuthService.setRegisterData(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.isLoding=false;

        if (res.message=="success") {
          this._Router.navigate(['auth/login']);
              }
  },
  error:(err)=>{
    this.errorMessage=err.error.message;
    console.log(err);
    this.isLoding=false;

  }
})
        } else{
  this.registerForm.markAllAsTouched();
  this.registerForm.setErrors({mismatch:true})
}   
          }


}
