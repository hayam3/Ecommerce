import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategores } from '../../core/interfaces/icategores';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit,OnDestroy {
  private readonly _CategoriesService=inject(CategoriesService);

  CategoriesList:Icategores[]=[]
getCategoriesSup!:Subscription;

ngOnInit(): void {
  this.getCategoriesSup=this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.CategoriesList=res.data;
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

ngOnDestroy(): void {
  this.getCategoriesSup?.unsubscribe();
}




}
