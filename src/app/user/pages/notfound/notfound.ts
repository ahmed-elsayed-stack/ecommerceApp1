import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">

      <div class="text-center px-4">

        <h1 class="text-8xl font-extrabold text-sky-400 mb-4 animate-pulse">
          404
        </h1>

        <h2 class="text-3xl font-semibold mb-2">
          Page Not Found
        </h2>

        <p class="text-gray-400 mb-6">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <button
          routerLink="/home"
          class="bg-sky-500 cursor-pointer hover:bg-sky-600 transition px-6 py-3 rounded-xl text-white font-medium shadow-lg flex items-center gap-2 mx-auto"
        >
          <i class="pi pi-home"></i>
          Go Home
        </button>

      </div>

    </div>
  `,
})
export class Notfound {}
