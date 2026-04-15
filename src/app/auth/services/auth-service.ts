import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import {  inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _HttpClient = inject(HttpClient);
  private _Router = inject(Router);
  userData:any = null;
  username:WritableSignal<string> = signal('');

   email: string = '';

  saveUserdata(){
    if(localStorage.getItem('userToken') !== null){
      this.userData = jwtDecode(localStorage.getItem('userToken')!)
    }
  }

  saveUserName():void{
    if(localStorage.getItem('userName') !== null){
      this.username.set(localStorage.getItem('userName')!)
    }
  }

   logOut():void{
      localStorage.removeItem('userToken');
      localStorage.removeItem('userName');
      this.userData = null;
      this._Router.navigate(['/login'])

    }

}



