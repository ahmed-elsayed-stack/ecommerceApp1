import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from "primeng/toast";
import { NgxSpinnerComponent } from "ngx-spinner";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, NgxSpinnerComponent],
  templateUrl: './app.html',
    standalone: true,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('youtubeEcommerce');



}
