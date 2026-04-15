import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptors/header-interceptor';
import { provideClientHydration } from '@angular/platform-browser';
import MyPreset from '../style';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes , withViewTransitions()),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor])),
       providePrimeNG({
            theme: {
                preset: MyPreset,
        options: {
            darkModeSelector:'.my-app-dark'
        }
            }
        }),
         MessageService
  ]
};
