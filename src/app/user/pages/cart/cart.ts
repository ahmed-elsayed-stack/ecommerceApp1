import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../services/cartservice/cart-service';
import { Icart } from '../../interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { NotifecationMessage } from '../../../shared/services/notifecationMessage/notifecation-message';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {

  private _CartService = inject(CartService);
  private _NotifecationMessage = inject(NotifecationMessage);



  cartProduct = signal<Icart | null>(null);

  AllCart():void{
    this._CartService.getLoggedUserCart().subscribe({
      next:(res)=>{
          console.log(res);
          this.cartProduct.set(res.data);
          this._CartService.numOfCart.set(res.numOfCartItems ?? 0);
      }
    })
  }

updateQty(id: string, newCount: number) {
  if (newCount < 1) return;

  this._CartService.Updatecartproductquantity(id, newCount)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.cartProduct.set(res.data);

        // ✅ استدعاء التوست
        this._NotifecationMessage.showSuccess("Quantity updated successfully.");
      },
      error: () => {
        this._NotifecationMessage.showError("Quantity updated successfully.");
      }
    });
}

  removeItem(id: string) {
  this._CartService.RemovespecificcartItem(id)
    .subscribe({
      next: (res) => {
        console.log(res)
        this.cartProduct.set(res.data);
        this.cartProduct();
        this._CartService.numOfCart.set(res.numOfCartItems ?? 0);
        this._NotifecationMessage.showSuccess("Item removed from cart successfully ✅");
      },
      error:(err)=>{
         console.error(err);
        this._NotifecationMessage.showError("Failed to remove item ❌");
      }
    });
}

  clearCart() {
  this._CartService.clearUserCart()
    .subscribe({
      next: (res) => {
        console.log(res)
       this.cartProduct.set(null);
       this._CartService.numOfCart.set(0);
       this._NotifecationMessage.showSuccess("Cart cleared successfully 🧹");
      },
       error: (err) => {
        console.error(err);
        this._NotifecationMessage.showError("Failed to clear cart ❌");
      }
    });
}

  ngOnInit(): void {
    this.AllCart()

  }

}
