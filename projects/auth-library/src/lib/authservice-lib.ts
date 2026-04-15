import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { authApi } from './base/authApi';
import { AuthApiAdaptor } from './adaptor/auth-api';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthEndPoint } from './enums/authEndPoint';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceLib  implements authApi {


  _HttpClient = inject(HttpClient);
  _AuthApiAdaptor = inject(AuthApiAdaptor);




login(data: any): Observable<any> {
  return this._HttpClient.post(AuthEndPoint.LOGIN, data).pipe(
    map(res => this._AuthApiAdaptor.adapt(res)),
    catchError(err => throwError(() => err))
  );
}


 register(data: any): Observable<any> {
  return this._HttpClient.post(AuthEndPoint.REGISTER, data).pipe(
    map(res => this._AuthApiAdaptor.adapt(res)),
    catchError(err => {
      return throwError(() => err); // ✅ يرجع الخطأ للـ component
    })
  );
}
   forgotPassword(data: any): Observable<any> {
      return this._HttpClient.post(AuthEndPoint.FORGOTPASSWORD , data)
  }
   verifyResetcode(data: any): Observable<any> {
      return this._HttpClient.post(AuthEndPoint.VERIFYRESETCODE , data)
  }

   resetPassword(data: any): Observable<any> {
      return this._HttpClient.put(AuthEndPoint.RESETPASSWORD , data)
  }
   editProfile(data: any): Observable<any> {
      return this._HttpClient.put(AuthEndPoint.EDITPROFILE , data)
  }
   getProfileData(): Observable<any> {
      return this._HttpClient.get(AuthEndPoint.getProfileData )
  }
   changePassword(data: any): Observable<any> {
      return this._HttpClient.patch(AuthEndPoint.CHANGEpASSWORD , data)
  }
   deleteMyAccount(): Observable<any> {
      return this._HttpClient.delete(AuthEndPoint.DELETEMYACCOUNT )
  }
   logout(): Observable<any> {
      return this._HttpClient.get(AuthEndPoint.LOGOUT )
  }
}
