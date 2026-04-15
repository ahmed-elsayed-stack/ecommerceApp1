import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  imports: [],
  templateUrl: './error-message.html',
  styleUrl: './error-message.scss',
})
export class ErrorMessage {
  @Input({ required: true }) control!: AbstractControl | null;
  @Input({ required: true }) type!: 'name' | 'email' | 'phone' | 'password' | 'confirmPassword';

  get errorMessage(): string | null {
    if (!this.control || !this.control.errors) return null;

    const errors = this.control.errors;

    const messages: Record<string, Record<string, string>> = {
      name: {
        required: 'Name is required',
        minlength: `Name must be at least ${errors['minlength']?.requiredLength} characters`,
        maxlength: `Name must be at most ${errors['maxlength']?.requiredLength} characters`,
      },
      email: {
        required: 'Email is required',
        email: 'Please enter a valid email',
      },
      phone: {
        required: 'Phone is required',
        minlength: `Phone must be at least ${errors['minlength']?.requiredLength} characters`,
        maxlength: `Phone must be at most ${errors['maxlength']?.requiredLength} characters`,
      },
      password: {
        required: 'Password is required',
        minlength: `Password must be at least ${errors['minlength']?.requiredLength} characters`,
        maxlength: `Password must be at most ${errors['maxlength']?.requiredLength} characters`,
      },
      confirmPassword: {
        required: 'Confirm password is required',
        passwordMismatch: 'Passwords do not match',
      }
    };

    // ترجع أول رسالة خطأ موجودة
    for (const errorKey in errors) {
      if (messages[this.type] && messages[this.type][errorKey]) {
        return messages[this.type][errorKey];
      }
    }

    return null;
  }
}
