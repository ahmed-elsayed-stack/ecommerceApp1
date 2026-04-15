import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Button } from "primeng/button";

@Component({
  selector: 'app-auth-nav',
  imports: [AvatarModule, BadgeModule, MenubarModule, InputTextModule, RippleModule, RouterLink, RouterLinkActive, Button],
  templateUrl: './auth-nav.html',
  standalone:true,
  styleUrl: './auth-nav.scss',
})
export class AuthNav implements OnInit {

    items: MenuItem[] | undefined;

     toggleDarkMode() {
    const element = document.querySelector('html')!;
    element.classList.toggle('my-app-dark');
}

   private initMenu(): void {
  this.items = [
    {
      label: 'login',
      icon: 'pi pi-sign-in',
      path: 'login'
    },
    {
      label: 'register',
      icon: 'pi pi-user-plus',
      path: 'register'
    },
  ];
}

  ngOnInit(): void {
       this.initMenu();
  }

}
