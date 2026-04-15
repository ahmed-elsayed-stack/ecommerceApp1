import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthserviceLib } from '../../../../../projects/auth-library/src/lib/authservice-lib';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ErrorMessage } from '../../components/error-message/error-message';
import { ToastModule } from 'primeng/toast';
import { AuthLinkComponent } from '../../components/app-auth-link/app-auth-link';
import { AutoFocusModule } from 'primeng/autofocus';
import { AuthService } from '../../services/auth-service';
import { AuthFormComponent } from "../../shared/auth-form/auth-form";
import {  Subscription } from 'rxjs';
import { NotifecationMessage } from '../../../shared/services/notifecationMessage/notifecation-message';

@Component({
  selector: 'app-login',
  imports: [AutoFocusModule, InputGroupModule, ReactiveFormsModule, InputGroupAddonModule, InputTextModule, ToastModule, AuthLinkComponent, AuthFormComponent, ErrorMessage, RouterLink],
  templateUrl: './login.html',
  standalone:true,
  styleUrl: './login.scss',
  providers: [MessageService]
})
export class Login {

  private _FormBuilder = inject(FormBuilder);
  private _NotifecationMessage = inject(NotifecationMessage);
  private _AuthserviceLib = inject(AuthserviceLib);
  private _Router = inject(Router);
  private _AuthService = inject(AuthService);
  private _loginSubscription?: Subscription;

  isLoading:boolean = false;

loginForm: FormGroup = this._FormBuilder.group({
  email: [null, [Validators.required, Validators.email]],
  password: [null, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)]],

}, );


  loginSubmit():void{
    if(this.loginForm.valid){
      this.isLoading = true;

     this._loginSubscription = this._AuthserviceLib.login(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this._NotifecationMessage.showSuccess(res.message)
          this.isLoading = false;
          this._AuthService.username.set(res.name);
          localStorage.setItem('userName', res.name )
          if(res.message === "success"){
            setTimeout(() => {
              // save the token in localstorge
              localStorage.setItem('userToken' , res.token);
              // JwtDecode
              this._AuthService.saveUserdata()
              this._Router.navigate(['/home'])
            }, 2000);
          }

        },error:(err:HttpErrorResponse)=>{
          console.log(err)
          const msg = err?.error?.message || 'Something went wrong';
       this._NotifecationMessage.showError(msg)
        this.isLoading = false;


        }
      })
    }else{
      this.loginForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    if(this._loginSubscription){
      this._loginSubscription.unsubscribe();
    }
  }

}
