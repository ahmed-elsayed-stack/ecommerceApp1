import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotifecationMessage } from '../../shared/services/notifecationMessage/notifecation-message';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {


  const notification = inject(NotifecationMessage);

  return next(req).pipe(
    catchError((error) => {

      // 🔥 show error message
      notification.showError(
        error?.error?.message || 'Something went wrong'
      );

      return throwError(() => error);
    })
  );
};
