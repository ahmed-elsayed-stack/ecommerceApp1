import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-link',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="mt-4 text-center sm:text-left md:text-center">
      <span class="text-gray-600">{{ text }}</span>
      <a
        [routerLink]="link"
        class="cursor-pointer ml-1 text-blue-600 font-semibold hover:text-blue-500 transition-colors duration-200"
      >
        {{ linkText }}
      </a>
    </div>
  `,
})
export class AuthLinkComponent {

  @Input() text: string = '';
  @Input() linkText: string = '';
  @Input() link: string = '';
}
