import { AllOrders } from './../../core/interfaces/all-orders';
import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit{
  private readonly _OrdersService=inject(OrdersService)
  private readonly _AuthService=inject(AuthService)
  
  allorders:AllOrders[]=[];
  
  ngOnInit(): void {
    this._AuthService.saveToken();
    this._OrdersService.getUserOrders(this._AuthService.token.id).subscribe({
      next:(res)=>{
        console.log(res);
        this.allorders=res;
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }

}
