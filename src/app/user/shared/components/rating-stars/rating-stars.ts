import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  imports: [],
   template: `
    <div class="flex items-center gap-1">

      @for (num of [1,2,3,4,5].slice(0, rating); track $index) {
        <i class="pi pi-star-fill rating-color text-sm"></i>
      }

      @if (rating % 1 !== 0) {
        <i class="pi pi-star-half-fill rating-color text-sm"></i>
      }

      <span class="text-gray-500 text-sm ml-1">
        {{ rating }}
      </span>

    </div>
  `
})
export class RatingStars {
  @Input() rating: number  = 0;
}
