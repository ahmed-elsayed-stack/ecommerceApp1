import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';


@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [ButtonModule, RippleModule,CommonModule ],
  template: `
    <button
      pButton
      [type]="type"
      [label]="!loading ? label : ''"
      [icon]="!loading ? (icon || '') : ''"
      [class]="styleClass"
      [disabled]="disabled || loading"
      class="relative flex items-center justify-center"
    >
   <span *ngIf="loading" class="spinner-border animate-spin inline-block w-5 h-5 border-2 rounded-full border-t-transparent"></span>

    </button>
  `,
  styles: [`
    .spinner-border {
      border-color: rgba(0,0,0,.25);
      border-top-color: #3498db;
    }
  `]
})
export class AuthButton {
  @Input() label: string = 'Button';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() icon?: string;
  @Input() styleClass?: string;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;

}
