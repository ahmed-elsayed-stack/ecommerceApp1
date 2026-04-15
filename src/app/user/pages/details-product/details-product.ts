import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { RatingStars } from "../../shared/components/rating-stars/rating-stars";
import { GalleriaModule } from 'primeng/galleria';
import { AddToCartButton } from "../../shared/components/add-to-cart-button/add-to-cart-button";

@Component({
  selector: 'app-details-product',
  imports: [CurrencyPipe, RatingStars, GalleriaModule, AddToCartButton],
  templateUrl: './details-product.html',
  styleUrl: './details-product.scss',
})
export class DetailsProduct {

  private _ActivatedRoute = inject(ActivatedRoute);
  detailsProduct = signal<Iproduct | null>(null);
  imagesList: string[] = [];
  activeIndex: number = 0;


  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 5 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 }
  ];

  onImageChange(index: number) {
    this.activeIndex = index;
  }

  ngOnInit(): void {
    // جلب البيانات من Resolver مباشرة
    const data = this._ActivatedRoute.snapshot.data['product'];
    this.detailsProduct.set(data);
    this.imagesList = [...(data?.images || [])];
    this.activeIndex = 0;
  }
}
