import { ProductsService } from './../../core/services/products.service';
import { Component, NgModule, OnDestroy, OnInit, inject } from '@angular/core';
import { NavAuthComponent } from '../nav-auth/nav-auth.component';
import { NavBlankComponent } from '../nav-blank/nav-blank.component';
import { Iproducts } from '../../core/interfaces/iproducts';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategores } from '../../core/interfaces/icategores';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule, NgModel } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wish-list.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavAuthComponent,
    FormsModule,
    NavBlankComponent,
    CarouselModule,
    RouterLink,
    SearchPipe,
    NgClass
    
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _WishListService = inject(WishListService);

  text: string = '';
  productList: Iproducts[] = [];
  categoriesList: Icategores[] = [];
  addWishListIcon:boolean=false;
  getProductSup!: Subscription;
  getCategoriesSup!: Subscription;

  customOptionsCat: OwlOptions = {
    loop: true,
    // autoplay:true,
    // autoplayTimeout:2000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };
  customOptionsMain: OwlOptions = {
    loop: true,
    // autoplay:true,
    // autoplayTimeout:2000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 500,
    responsive: {
      0: {
        items: 2,
      },

      700: {
        items: 1,
      },
    },
    nav: false,
  };

  // =====================

  ngOnInit(): void {
    this.getCategoriesSup = this._CategoriesService
      .getAllCategories()
      .subscribe({
        next: (res) => {
          console.log(res.data);
          this.categoriesList = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });

    this.getProductSup = this._ProductsService.getAllproducts().subscribe({
      next: (res) => {
        console.log(res.data);

        this.productList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.getCategoriesSup?.unsubscribe();
    this.getProductSup?.unsubscribe();
    console.log('dddddd');
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

  addWishList(id:string):void{
    this._WishListService.addProductToWishList(id).subscribe({
      next: (res) => {
        this.addWishListIcon=true;

        console.log(res);
        this._ToastrService.success(res.message ,'Fresh Cart')
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  isInWashList(id:string): boolean{
  return this.addWishListIcon=true;

  }
}
