import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproducts } from '../../core/interfaces/iproducts';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink,FormsModule,SearchPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit,OnDestroy {
  private readonly _ProductsService=inject(ProductsService)
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _WishListService= inject(WishListService);

  productList:Iproducts[]=[]
  getProductSup!:Subscription;
  text:string='';

  ngOnInit(): void {
    this.getProductSup=this._ProductsService.getAllproducts().subscribe({
      next:(res)=>{
        this.productList=res.data;

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
        this._ToastrService.success(res.message,'Fresh Cart')
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.getProductSup?.unsubscribe();

  }

  addWishList(id:string):void{
    this._WishListService.addProductToWishList(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message ,'Fresh Cart')
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
}
