import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../auth/services/auth-service';
import { Button } from "primeng/button";
import { CartService } from '../../services/cartservice/cart-service';

@Component({
  selector: 'app-user-nav',
  imports: [AvatarModule, BadgeModule, MenubarModule, InputTextModule, RippleModule, OverlayBadgeModule, RouterLink, Button, RouterLinkActive],
  templateUrl: './user-nav.html',
  styleUrl: './user-nav.scss',
})
export class UserNav implements OnInit {

     _AuthService = inject(AuthService)
    public _CartService = inject(CartService)
    items: MenuItem[] | undefined;

    logout:boolean = false;
    userName:Signal<string> = computed( ()=>this._AuthService.username() );

    getNAameUser():void{
      localStorage.getItem('userName')
    }

 toggleDarkMode() {
    const element = document.querySelector('html')!;
    element.classList.toggle('my-app-dark');
}

   private initMenu(): void {
  this.items = [
    { label: 'home', icon: 'pi pi-home', path: 'home' },
    { label: 'products', icon: 'pi pi-box', path: 'products' },
    { label: 'categories', icon: 'pi pi-th-large', path: 'categories' },
  ];
}

  private initUser(): void {
  this._AuthService.saveUserName();
}

  private loadCartCount(): void {
  this._CartService.getLoggedUserCart().subscribe({
    next: (res) => {
      this._CartService.numOfCart.set(res.numOfCartItems ?? 0);
    }
  });
}

  ngOnInit() {
  this.initMenu();
  this.initUser();
  this.loadCartCount();
}

}
