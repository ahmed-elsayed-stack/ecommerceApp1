import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../services/categoriesService/categories-service';
import { Icategories } from '../../interfaces/iccategories/icategories';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories implements OnInit {

  private _CategoriesService = inject(CategoriesService);
  categoriesList:WritableSignal<Icategories[]> = signal([])

  AllCategories():void{
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categoriesList.set(res.data)
      }
    })

  }

  ngOnInit(): void {
      this.AllCategories();

  }

}
