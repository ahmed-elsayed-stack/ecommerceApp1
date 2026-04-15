
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { Iproduct } from '../../interfaces/iproduct';
import { ProductCard } from "../../shared/components/product-card/product-card";
import { Productservice } from '../../services/productsrvice/productservice';
import { RouterLink } from "@angular/router";
import { AddToCartButton } from "../../shared/components/add-to-cart-button/add-to-cart-button";

@Component({
  selector: 'app-home',
  imports: [CarouselModule, TagModule, ProductCard, RouterLink, AddToCartButton],
  templateUrl: './home.html',
  styleUrl: './home.scss',

})
export class Home {
  responsiveOptions: any[] | undefined;
  private _Productservice = inject(Productservice);
  productList: WritableSignal<Iproduct[]> = signal([]);

    AllProducts(){
      this._Productservice.getAlllProducts().subscribe({
        next:(res)=>{
          console.log( 'products' ,  res.data)
          this.productList.set(res.data)
        }
      })
    }



   imgs= [
   {
      image: './assets/1551.jpg',
    },
     {
      image: './assets/1654.jpg',
    },
     {
      image: './assets/1663.jpg',
    },
     {
      image: '../../../../assets/Kerfin7-NEA-2185.jpg',
    },
   ]

 ngOnInit() {

  this.responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  this.AllProducts()
}

}
