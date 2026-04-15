import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TermTextPipe } from '../../pipes/termtext/term-text-pipe';
import { RatingStars } from "../rating-stars/rating-stars";

@Component({
  selector: 'app-product-card',
  imports: [TitleCasePipe, TermTextPipe, CurrencyPipe, RatingStars],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

    @Input() product: any;
    // @Input() imageHeight: string = '200px';
}
