import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotifecationMessage } from '../../../shared/services/notifecationMessage/notifecation-message';
import { AuthserviceLib } from '../../../../../projects/auth-library/src/lib/authservice-lib';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth-service';
import { ErrorMessage } from "../../components/error-message/error-message";
import { InputGroup } from "primeng/inputgroup";
import { InputGroupAddon } from "primeng/inputgroupaddon";
import { AutoFocus } from "primeng/autofocus";
import { AuthFormComponent } from "../../shared/auth-form/auth-form";

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, ErrorMessage, InputGroup, InputGroupAddon, AutoFocus, AuthFormComponent],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {


  private _FormBuilder = inject(FormBuilder);
  private _NotifecationMessage = inject(NotifecationMessage);
  private _AuthserviceLib = inject(AuthserviceLib);
  private _AuthService = inject(AuthService);
  private _Router = inject(Router);

  private _ResetPassSubscription?: Subscription;

  isLoading:boolean = false;
  showPassword: boolean = false;

resetPassForm: FormGroup = this._FormBuilder.group({
  email: [null, [Validators.required, Validators.email]],
  newPassword: [
    null,
    [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)
    ]
  ]
});



  resetPasswordSubmit(): void {
    if (this.resetPassForm.invalid) {
      this.resetPassForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this._ResetPassSubscription = this._AuthserviceLib.resetPassword(this.resetPassForm.value).subscribe({
      next: (res: { token: string }) => {
        console.log(res);

        // خزّن التوكن فقط
        localStorage.setItem('userToken', res.token);

        // Save user data من التوكن
        this._AuthService.saveUserdata();

        this._NotifecationMessage.showSuccess('Password reset successfully');

        this.isLoading = false;

        // redirect للـ home
        this._Router.navigate(['/home']);
      },
      error: (err: HttpErrorResponse) => {
        const msg = err?.error?.message || 'Something went wrong';
        this._NotifecationMessage.showError(msg);
        this.isLoading = false;
      }
    });
  }


ngOnInit(): void {
  const email = this._AuthService.email || localStorage.getItem('resetEmail');

  console.log('EMAIL:', email); // للتأكد

  this.resetPassForm.patchValue({
    email: email
  });
  
}



  ngOnDestroy(): void {
    if(this._ResetPassSubscription){
      this._ResetPassSubscription?.unsubscribe();
    }
  }

}
