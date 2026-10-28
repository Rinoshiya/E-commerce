import { Routes } from '@angular/router';
import { adminGuard } from './shared/admin.guard';

export const routes: Routes = [
  { path: 'account', loadComponent: () => import('./pages/account-page/account-page.component').then(m => m.AccountPageComponent) },
  { path: 'admin/products', canActivate: [adminGuard], loadComponent: () => import('./pages/admin-products-page/admin-products-page.component').then(m => m.AdminProductsPageComponent) },
  { path: '', loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent) },
  { path: 'shop', loadComponent: () => import('./pages/product-list-page/product-list-page.component').then(m => m.ProductListPageComponent) },
  { path: 'shop/:category', loadComponent: () => import('./pages/product-list-page/product-list-page.component').then(m => m.ProductListPageComponent) },
  { path: 'product/:id', loadComponent: () => import('./pages/product-detail-page/product-detail-page.component').then(m => m.ProductDetailPageComponent) },
  { path: 'wishlist', loadComponent: () => import('./pages/wishlist-page/wishlist-page.component').then(m => m.WishlistPageComponent) },
  { path: 'bag', loadComponent: () => import('./pages/cart-page/cart-page.component').then(m => m.CartPageComponent) },
  { path: 'checkout', loadComponent: () => import('./pages/checkout-page/checkout-page.component').then(m => m.CheckoutPageComponent) },
  { path: '**', redirectTo: '' },
];
