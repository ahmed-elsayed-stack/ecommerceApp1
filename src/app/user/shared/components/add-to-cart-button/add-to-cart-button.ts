import { Component, inject, Input, signal } from '@angular/core';
import { CartService } from '../../../services/cartservice/cart-service';
import { NotifecationMessage } from '../../../../shared/services/notifecationMessage/notifecation-message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-to-cart-button',
  imports: [],
  template: `
   @if (productId && !addedProducts().has(productId)) {
  <button (click)="addToCart(); $event.stopPropagation()" class="btn-main w-full">
    {{ loading() ? 'Adding...' : 'Add To Cart' }}
    <span><i class="pi pi-cart-plus"></i></span>
  </button>
} @else if (productId) {
  <button (click)="goToCart(); $event.stopPropagation()" class="text-white w-full rounded-lg cursor-pointer p-2 bg-green-600">
    Go To Cart
    <span><i class="pi pi-shopping-cart"></i></span>
  </button>
}
  `
})

export class AddToCartButton {

   @Input() productId?: string;

  private _CartService = inject(CartService);
  private _NotifecationMessage = inject(NotifecationMessage);
  private _Router = inject(Router);

  // نستخدم signal لتتبع المنتجات المضافة
  addedProducts = signal<Set<string>>(new Set());

  loading = signal(false);

  addToCart() {
    if (!this.productId) return;

    this.loading.set(true);

    this._CartService.addProductToCart(this.productId).subscribe({
      next: (res) => {
        console.log(res)
        this.addedProducts.update((set) => set.add(this.productId!));
        this._NotifecationMessage.showSuccess(res.message);
        this.loading.set(false);
        this._CartService.numOfCart.set(res.numOfCartItems)
      },
      error: () => this.loading.set(false),
    });
  }

  goToCart() {
    this._Router.navigate(['/cart']);
  }
}
