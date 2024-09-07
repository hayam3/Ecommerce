import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { RouterLink } from '@angular/router';
import { brand } from '../../core/interfaces/iproducts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit,OnDestroy {
private readonly _BrandsService=inject(BrandsService);


brandsList:brand[]=[]
getBrandsSup!:Subscription;

ngOnInit(): void {
  this.getBrandsSup=this._BrandsService.getAllBrands().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.brandsList=res.data;
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

ngOnDestroy(): void {
  this.getBrandsSup?.unsubscribe();
}
}
