import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { UserLayout } from './layouts/user-layout/user-layout';
import { authGuard } from './auth/core/guards/auth-guard/auth-guard';
import { logedGuard } from './auth/core/guards/loged-guard/loged-guard';
import { detailsProductResolver } from './user/resolvers/details-product-resolver';
import { detailsCategoryResolver } from './user/resolvers/details-category-resolver';


export const routes: Routes = [
  {path: '' , component: AuthLayout , canActivate:[logedGuard] , children:[
    {path: '' , redirectTo: 'login' , pathMatch:'full'},
   {
  path: 'login',
  loadComponent: () =>
    import('./auth/pages/login/login').then(m => m.Login)
},
{
  path: 'register',
  loadComponent: () =>
    import('./auth/pages/register/register').then(m => m.Register)
},
{
  path: 'forgotPassword',
  loadComponent: () =>
    import('./auth/pages/forgot-password/forgot-password').then(m => m.ForgetPassword)
},
{
  path: 'VerifyCode',
  loadComponent: () =>
    import('./auth/pages/verify-code/verify-code').then(m => m.VerifyCode)
},
{
  path: 'ResetPassword',
  loadComponent: () =>
    import('./auth/pages/reset-password/reset-password').then(m => m.ResetPassword)
}
  ]},
  {path: '' , component: UserLayout , canActivate:[authGuard] ,children:[
    {path: '' , redirectTo: 'home' , pathMatch:'full'},
  {
  path: 'home',
  loadComponent: () =>
    import('./user/pages/home/home').then(m => m.Home)
},
{
  path: 'products',
  loadComponent: () =>
    import('./user/pages/products/products').then(m => m.Products)
},
{
  path: 'cart',
  loadComponent: () =>
    import('./user/pages/cart/cart').then(m => m.Cart)
},
{
  path: 'categories',
  loadComponent: () =>
    import('./user/pages/categories/categories').then(m => m.Categories)
},
{
  path: 'detailsProduct/:id',
  loadComponent: () =>
    import('./user/pages/details-product/details-product').then(m => m.DetailsProduct),
  resolve: { product: detailsProductResolver }
},
{
  path: 'detailscategory/:id',
  loadComponent: () =>
    import('./user/pages/details-category/details-category').then(m => m.DetailsCategory),
  resolve: { category: detailsCategoryResolver }
},
   {
  path: '**',
  loadComponent: () =>
    import('./user/pages/notfound/notfound').then(m => m.Notfound)
}
  ]},
];
