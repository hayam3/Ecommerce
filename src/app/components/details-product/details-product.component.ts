import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproducts } from '../../core/interfaces/iproducts';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details-product',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.scss'
})
export class DetailsProductComponent  implements OnInit{

  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _ProductsService=inject(ProductsService);
  private readonly _CartService=inject(CartService);
  private readonly _ToastrService=inject(ToastrService);


  detailsProduct:Iproducts | null= null;
  

  customOptionsDetails: OwlOptions = {
    loop: true,
    // autoplay:true,
    // autoplayTimeout:2000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 500,
    navText: ['', ''],
    items:1,
    nav: false
  }


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(data)=>{
       console.log(data.get('id'));



 let Idproduct=data.get('id');
this._ProductsService.getSpecificProducts(Idproduct).subscribe({

  next:(res)=>{
    console.log([res.data]);
    this.detailsProduct=res.data;
 
  },
  error:(err)=>{
    console.log(err);
  }
})


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
}
