import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SignupComponent } from './components/signup/signup.component';
// import { AuthGuard  } from './guards/auth.guard';
// import {canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
// const redirectToLogin = () => redirectUnauthorizedTo(['login']);
// const redirectToHome = () => redirectLoggedInTo(['']);

// const routes: Routes = [
//   {path:'', component:ProductsComponent,...canActivate(redirectToLogin)},
//   {path:'orders', component:MyOrdersComponent,...canActivate(redirectToLogin)},
//   {path:'admin/orders', component:AdminOrdersComponent,...canActivate(redirectToLogin)},
//   {path:'admin/products', component:AdminProductsComponent,...canActivate(redirectToLogin)},
//   {path:'shopping-cart', component:ShoppingCartComponent,...canActivate(redirectToLogin)},
//   {path:'login', component:LoginComponent,...canActivate(redirectToHome)},
//   {path:'signup', component:SignupComponent,...canActivate(redirectToHome)},
// ];

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
