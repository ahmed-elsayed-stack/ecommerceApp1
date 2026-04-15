
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

// PrimeNG
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { AutoFocusModule } from 'primeng/autofocus';
import { ToastModule } from 'primeng/toast';

// Components
import { AuthFormComponent } from "../../shared/auth-form/auth-form";
import { ErrorMessage } from '../../components/error-message/error-message';
import { AuthLinkComponent } from '../../components/app-auth-link/app-auth-link';

// Services
import { AuthserviceLib } from '../../../../../projects/auth-library/src/lib/authservice-lib';
import { NotifecationMessage } from '../../../shared/services/notifecationMessage/notifecation-message';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  templateUrl: './forgot-password.html',
  styleUrls: ['forgot-password.scss'],
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    AutoFocusModule,
    ToastModule,
    AuthFormComponent,
    ErrorMessage,
    AuthLinkComponent,
  ]
})
export class ForgetPassword implements  OnDestroy   {

  private _FormBuilder = inject(FormBuilder);
  private _NotifecationMessage = inject(NotifecationMessage);
  private _AuthserviceLib = inject(AuthserviceLib);
  private _AuthService = inject(AuthService);
  private _Router = inject(Router);

  private _ForgotPassSubscription?: Subscription;

  isLoading:boolean = false;


ForgotPassForm: FormGroup = this._FormBuilder.group({
  email: [null, [Validators.required, Validators.email]]

}, );


  ForgotPassSubmit():void{
    if(this.ForgotPassForm.valid){
      this.isLoading = true;

      this._AuthService.email = this.ForgotPassForm.get('email')?.value
      localStorage.setItem('resetEmail', this._AuthService.email);
     this._ForgotPassSubscription = this._AuthserviceLib.forgotPassword(this.ForgotPassForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this._NotifecationMessage.showSuccess(res.message);
          this.isLoading = false;
          if(res.statusMsg === "success"){
            setTimeout(() => {

              this._Router.navigate(['/VerifyCode']

);
            }, 2000);
          }

        },error:(err:HttpErrorResponse)=>{
          console.log(err);
          const msg = err?.error?.message || 'Something went wrong';
       this._NotifecationMessage.showError(msg);
        this.isLoading = false;


        }
      });
    }else{
      this.ForgotPassForm.markAllAsTouched();
    }
  }


  ngOnDestroy(): void {
    if(this._ForgotPassSubscription){
      this._ForgotPassSubscription?.unsubscribe();
    }
  }

}
