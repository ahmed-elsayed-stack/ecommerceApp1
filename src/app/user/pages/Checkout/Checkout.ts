import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../services/orderService/order-service';
import { ActivatedRoute } from '@angular/router';
import { Button } from "primeng/button";
import { InputGroup } from "primeng/inputgroup";
import { InputGroupAddon } from "primeng/inputgroupaddon";
import { InputText } from "primeng/inputtext";

@Component({
  selector: 'app-orders',
  imports: [ReactiveFormsModule, Button, InputGroup, InputGroupAddon, InputText],
  templateUrl: './Checkout.html',
  styleUrl: './Checkout.scss',
})
export class CheckoutComponent implements OnInit {

 private _OrderService = inject(OrderService);
  private fb = inject(FormBuilder);
  private _ActivatedRoute = inject(ActivatedRoute);

  cartId!: string;

  checkoutForm = this.fb.group({
    details: [''],
    phone: [''],
    city: ['']
  });

  ngOnInit(): void {
    // ✅ ناخد cartId من URL
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.cartId = params.get('id')!;
    });
  }

  submit() {
     const shippingAddress = {
    shippingAddress: JSON.stringify(this.checkoutForm.value)
  };

    this._OrderService.checkout(this.cartId, shippingAddress).subscribe({
      next: (res) => {
        if (res?.session?.url) {
          // 🔥 تحويل المستخدم لـ Stripe
          window.location.href = res.session.url;
        }
      },
      error: (err) => {
        console.log('Checkout error:', err);
      }
    });
  }
}
