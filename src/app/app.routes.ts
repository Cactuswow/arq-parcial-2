import type { Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { protectionGuard } from './pages/home/guards/protection.guard'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/get-products',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'home',
    canActivate: [protectionGuard],
    redirectTo: 'home/get-products',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'get-products',
        loadComponent: () =>
          import('./pages/home/pages/get-products/get-products.component').then(
            m => m.GetProductsComponent
          )
      },
      {
        path: 'create-product',
        loadComponent: () =>
          import(
            './pages/home/pages/post-products/post-products.component'
          ).then(m => m.PostProductsComponent)
      },
      {
        path: 'update-product/:id',
        loadComponent: () =>
          import(
            './pages/home/pages/update-products/update-products.component'
          ).then(m => m.UpdateProductsComponent)
      },
      {
        path: 'get-product/:id',
        loadComponent: () =>
          import('./pages/home/pages/get-product/get-product.component').then(
            m => m.GetProductComponent
          )
      },
      {
        path: '**',
        redirectTo: '**'
      }
    ]
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        m => m.NotFoundComponent
      )
  }
]
