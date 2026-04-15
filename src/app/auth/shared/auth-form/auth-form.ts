import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { AuthButton } from "../../components/auth-button/auth-button";

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputGroupModule,
    ButtonModule,
    AuthButton
],
  templateUrl: './auth-form.html',
})
export class AuthFormComponent {

  @Input({ required: true }) formGroup!: FormGroup;
  @Input() title: string = '';
  @Input() loading: boolean = false;
  @Input() submitLabel: string = 'Submit';

  @Output() formSubmit = new EventEmitter<void>();

  onSubmit() {
    if (this.formGroup.valid) {
      this.formSubmit.emit();
    }
  }
}
