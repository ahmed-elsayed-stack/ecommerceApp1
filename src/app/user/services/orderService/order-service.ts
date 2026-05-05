import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private _HttpClient = inject(HttpClient)

  checkout(cartId: string | null, shippingAddress: any) {
  return this._HttpClient.post<any>(
    `${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}`,
    {
      shippingAddress,
      success_url: 'http://localhost:4200/allorders',
      cancel_url: 'http://localhost:4200/cart'
    }
  );
}

}
