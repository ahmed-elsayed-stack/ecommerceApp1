import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { ProductCard } from "../../shared/components/product-card/product-card";
import { Productservice } from '../../services/productsrvice/productservice';
import { Iproduct } from '../../interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchProductPipe } from '../../shared/pipes/searchProduct/search-product-pipe';
import { AddToCartButton } from "../../shared/components/add-to-cart-button/add-to-cart-button";

@Component({
  selector: 'app-products',
  imports: [ButtonModule, ProductCard, RouterLink, FormsModule, SearchProductPipe, AddToCartButton],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {

  private _Productservice = inject(Productservice);
  productList: WritableSignal<Iproduct[]> = signal([]);

  searchTerm:string = ''

  AllProducts():void{
    this._Productservice.getAlllProducts().subscribe({
      next:(res)=>{
        console.log(res);
        this.productList.set(res.data)
      }
    })
  }

  ngOnInit(): void {
    this.AllProducts()

  }

}
