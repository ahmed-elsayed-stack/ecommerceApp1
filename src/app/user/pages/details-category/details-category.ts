import { Iproduct } from './../../interfaces/iproduct';
import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Icategories } from '../../interfaces/iccategories/icategories';
import { ProductCard } from "../../shared/components/product-card/product-card";
import { AddToCartButton } from "../../shared/components/add-to-cart-button/add-to-cart-button";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-category',
  templateUrl: './details-category.html',
  styleUrls: ['./details-category.scss'],
  imports: [ProductCard, CommonModule ,  RouterLink, AddToCartButton],
})
export class DetailsCategory {

  private _ActivatedRoute = inject(ActivatedRoute);

  // تفاصيل الكاتيجوري
  detailsCategory = toSignal<Icategories | null>(
    this._ActivatedRoute.data.pipe(map(data => data['category'] as Icategories | null)),
    { initialValue: null }
  );

  // كل المنتجات
productList = toSignal<Iproduct[]>(this._ActivatedRoute.data.pipe(
  map(data => data['products'] as Iproduct[] || [])
));

  // منتجات الكاتيجوري الحالي
  filteredProducts = computed(() => {
    const category = this.detailsCategory();
    if (!category) return [];
    return (this.productList() || []).filter(p => p.category?._id === category._id);
  });

  trackById(index: number, item: Iproduct) {
  return item._id;
}
}
