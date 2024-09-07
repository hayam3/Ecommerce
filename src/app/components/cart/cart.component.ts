import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent  implements OnInit{
private readonly _CartService=inject(CartService);
private readonly _ToastrService=inject(ToastrService);

cartItems:Icart={} as Icart;

ngOnInit(): void {
  this._CartService.getProductsCate().subscribe({
    next:(res)=>{
      console.log(res);
      this.cartItems=res.data;

    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

removeItem(id:string):void{
  this._CartService.removeProductCart(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.cartItems=res.data;

      this._ToastrService.success('Product deleted successfully from your cart','Fresh Cart')
    },
    error:(err)=>{
console.log(err);

    }
  })
}

updateQuantity(id:string ,count:number):void{
this._CartService.UpdateCartProductQuantity(id ,count).subscribe({
  next:(res)=>{
    console.log(res);
    this.cartItems=res.data;
  },
  error:(err)=>{
console.log(err);

  }
})
}

clearCart():void{
  this._CartService.clearCart().subscribe({
    next:(res)=>{
      console.log(res);
      this.cartItems= {} as Icart;
    },
    error:(err)=>{
  console.log(err);
  
    }
  })
}
}
