import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotifecationMessage } from '../../../shared/services/notifecationMessage/notifecation-message';
import { AuthserviceLib } from '../../../../../projects/auth-library/src/lib/authservice-lib';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthFormComponent } from "../../shared/auth-form/auth-form";
import { ErrorMessage } from "../../components/error-message/error-message";
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-verify-code',
  imports: [AuthFormComponent, ReactiveFormsModule,  ErrorMessage,InputOtpModule  , FormsModule],
  templateUrl: './verify-code.html',
  styleUrl: './verify-code.scss',
})
export class VerifyCode {

  private _FormBuilder = inject(FormBuilder);
  private _NotifecationMessage = inject(NotifecationMessage);
  private _AuthserviceLib = inject(AuthserviceLib);
  private _Router = inject(Router);

  private _VerifyCodeSubscription?: Subscription;

  isLoading:boolean = false;

 VerifyCodeForm: FormGroup = this._FormBuilder.group({
  resetCode: [null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]

}, );


  verifyCodeSubmit():void{
    if(this.VerifyCodeForm.valid){
      this.isLoading = true;

     this._VerifyCodeSubscription = this._AuthserviceLib.verifyResetcode(this.VerifyCodeForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this._NotifecationMessage.showSuccess(res.message);
          this.isLoading = false;
          if(res.status === "Success"){
            setTimeout(() => {

              this._Router.navigate(['/ResetPassword']);
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
      this.VerifyCodeForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    if(this._VerifyCodeSubscription){
      this._VerifyCodeSubscription?.unsubscribe();
    }
  }

}

