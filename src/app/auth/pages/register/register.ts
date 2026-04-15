import { AuthserviceLib } from './../../../../../projects/auth-library/src/lib/authservice-lib';
import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import {  InputGroup } from 'primeng/inputgroup';
import {  InputGroupAddon } from 'primeng/inputgroupaddon';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessage } from "../../components/error-message/error-message";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth-service';
import { AuthLinkComponent } from "../../components/app-auth-link/app-auth-link";
import { Router } from '@angular/router';
import { AutoFocusModule } from 'primeng/autofocus';
import { AuthFormComponent } from "../../shared/auth-form/auth-form";
import { Subscription } from 'rxjs';
import { NotifecationMessage } from '../../../shared/services/notifecationMessage/notifecation-message';

@Component({
  selector: 'app-register',
  imports: [AutoFocusModule, InputTextModule, ReactiveFormsModule, ErrorMessage, ToastModule, AuthLinkComponent, AuthFormComponent, InputGroupAddon, InputGroup],
  standalone:true,
  templateUrl: './register.html',
  styleUrl: './register.scss',
  providers: [MessageService]
})
export class Register {
  private _FormBuilder = inject(FormBuilder);
  private _NotifecationMessage = inject(NotifecationMessage);
  private _AuthserviceLib = inject(AuthserviceLib);
  private _AuthService = inject(AuthService);
  private _Router = inject(Router);
  private _RegisterSubscription?: Subscription;
  isLoading:boolean = false;

registerForm: FormGroup = this._FormBuilder.group({
  name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  email: [null, [Validators.required, Validators.email]],
  phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  password: [null, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)]],
  rePassword: [null, [Validators.required]]
}, { validators: this.confirmPassword });



confirmPassword(g: AbstractControl) {
  const pass = g.get('password')?.value;
  const confirm = g.get('rePassword')?.value;

  if (pass && confirm && pass === confirm ) {
    return null;
  } else {
    return { passwordMismatch: true }; // غيرت الاسم لمطابقة الاسم الموجود في ErrorMessage
  }
}

  RegisterSubmit():void{
    if(this.registerForm.valid){
      this.isLoading = true;

      this._RegisterSubscription = this._AuthserviceLib.register(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this._NotifecationMessage.showSuccess( 'Account created successfully')
          this.isLoading = false;
          if(res.message === "success"){
            setTimeout(() => {
              this._Router.navigate(['/login'])
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
      this.registerForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    if(this._RegisterSubscription){
      this._RegisterSubscription.unsubscribe();
    }
  }


}
