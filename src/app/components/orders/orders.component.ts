import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _OrdersService=inject(OrdersService)
  cartId:string|null='';
  orders: FormGroup=new FormGroup({
    details:  new FormControl(null,[Validators.required]),
    phone:  new FormControl(null,[Validators.required,Validators.pattern(/^01[1250][0-9]{8}$/)]),
    city:  new FormControl(null ,[Validators.required]),
    
  })


ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
    this.cartId= params.get('id');
    console.log(this.cartId);
    
    }
  })
}


  orderSubmit():void{
 console.log(   this.orders.value);
 this._OrdersService.checkOut(this.cartId ,this.orders.value).subscribe({
  next:(res)=>{
    console.log(res);
    if(res.status==='success'){
window.open(res.session.url)
    }
    
  },
  error:(err)=>{
    console.log(err);
    
  }
 })
  }


}
