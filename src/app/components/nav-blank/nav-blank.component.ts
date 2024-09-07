import { AuthService } from './../../core/services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit{
  readonly _AuthService =inject(AuthService)
  private readonly _CartService=inject(CartService);

countCart:number = 0;

ngOnInit(): void {
  this._CartService.getProductsCate().subscribe({
    next:(res)=>{
      console.log(res);
      this.countCart=res.numOfCartItems;

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
      this.countCart=res.numOfCartItems;

    },
    error:(err)=>{
console.log(err);

    }
  })
}



}
