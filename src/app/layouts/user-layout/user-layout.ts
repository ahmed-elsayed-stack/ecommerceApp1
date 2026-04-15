import { Component } from '@angular/core';
import { UserNav } from "../../user/components/user-nav/user-nav";
import { UserFooter } from "../../user/components/user-footer/user-footer";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  imports: [UserNav, RouterOutlet, UserFooter],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss',
})
export class UserLayout {

}
