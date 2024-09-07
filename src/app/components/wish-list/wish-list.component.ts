import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart, Product, wishList } from '../../core/interfaces/icart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { WishListService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{
  private readonly _WishListService=inject(WishListService);
private readonly _ToastrService=inject(ToastrService);

private readonly _CartService=inject(CartService);

cartItems:wishList= {} as wishList;

ngOnInit(): void {
  this._WishListService.getProductsWishList().subscribe({
    next:(res)=>{
      console.log(res);
      this.cartItems=res;
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}


addCart(id: string): void {
  this._CartService.addProductToCart(id).subscribe({
    next: (res) => {
      console.log(res);
      this._ToastrService.success(res.message ,'Fresh Cart')
    },
    error: (err) => {
      console.log(err);
    },
  });
}

removeItem(id:string):void{
  this._WishListService.removeProductWishList(id).subscribe({
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

 



}
