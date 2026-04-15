import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { UserLayout } from './layouts/user-layout/user-layout';
import { Login } from './auth/pages/login/login';
import { Register } from './auth/pages/register/register';
import { Home } from './user/pages/home/home';
import { authGuard } from './auth/core/guards/auth-guard/auth-guard';
import { logedGuard } from './auth/core/guards/loged-guard/loged-guard';
import { Products } from './user/pages/products/products';
import { Cart } from './user/pages/cart/cart';
import { Categories } from './user/pages/categories/categories';
import { DetailsProduct } from './user/pages/details-product/details-product';
import { DetailsCategory } from './user/pages/details-category/details-category';
import { detailsProductResolver } from './user/resolvers/details-product-resolver';
import { detailsCategoryResolver } from './user/resolvers/details-category-resolver';
import { VerifyCode } from './auth/pages/verify-code/verify-code';
import { ResetPassword } from './auth/pages/reset-password/reset-password';
import { ForgetPassword } from './auth/pages/forgot-password/forgot-password';

export const routes: Routes = [
  {path: '' , component: AuthLayout , canActivate:[logedGuard] , children:[
    {path: '' , redirectTo: 'login' , pathMatch:'full'},
    {path: 'login' , component: Login},
    {path: 'register' , component: Register},
    {path: 'forgotPassword' , component: ForgetPassword},
    {path: 'VerifyCode' , component: VerifyCode},
    {path: 'ResetPassword' , component: ResetPassword},
  ]},
  {path: '' , component: UserLayout , canActivate:[authGuard] ,children:[
    {path: '' , redirectTo: 'home' , pathMatch:'full'},
    {path: 'home' , component: Home},
    {path: 'products' , component: Products},
    {path: 'cart' , component: Cart},
    {path: 'detailsProduct/:id' , component: DetailsProduct ,  resolve: { product: detailsProductResolver }},
    {path: 'detailscategory/:id' , component: DetailsCategory , resolve: {category: detailsCategoryResolver}},
    {path: 'categories' , component: Categories},
  ]},
];
