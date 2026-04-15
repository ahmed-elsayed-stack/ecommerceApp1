import { InjectionToken, inject } from '@angular/core';

// InjectionToken للـ Base URL فقط
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => 'https://ecommerce.routemisr.com'
});

// AuthEndPoint class مع Injection للـ Base URL
export class AuthEndPoint {
  // الحصول على Base URL من الـ InjectionToken
  private static getBaseUrl(): string {
    try {
      // محاولة الحصول على الـ Base URL من الـ injector
      return inject(API_BASE_URL);
    } catch (error) {
      // إذا فشل الـ injection نستخدم القيمة الافتراضية
      console.warn('API_BASE_URL injection failed, using default base URL');
      return 'https://ecommerce.routemisr.com';
    }
  }

  // الحساب الديناميكي للـ URLs
  private static baseUrl = AuthEndPoint.getBaseUrl();

  static readonly REGISTER = `${AuthEndPoint.baseUrl}/api/v1/auth/signup`;
  static readonly LOGIN = `${AuthEndPoint.baseUrl}/api/v1/auth/signin`;
  static readonly CHANGEpASSWORD = `${AuthEndPoint.baseUrl}/api/v1/users/changeMyPassword`;
  static readonly DELETEMYACCOUNT = `${AuthEndPoint.baseUrl}/auth/deleteMe`;
  static readonly EDITPROFILE = `${AuthEndPoint.baseUrl}/api/v1/users/updateMe/`;
  static readonly getProfileData = `${AuthEndPoint.baseUrl}/auth/profileData`;
  static readonly LOGOUT = `${AuthEndPoint.baseUrl}/auth/logout`;
  static readonly FORGOTPASSWORD = `${AuthEndPoint.baseUrl}/api/v1/auth/forgotPasswords`;
  static readonly VERIFYRESETCODE = `${AuthEndPoint.baseUrl}/api/v1/auth/verifyResetCode`;
  static readonly RESETPASSWORD = `${AuthEndPoint.baseUrl}/api/v1/auth/resetPassword`;
}
