import { Routes } from '@angular/router';
import { authGuard } from '@domains/auth/guards/auth.guard';
import { redirectGuard } from '@domains/auth/guards/redirect.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [redirectGuard],
    loadChildren: () => import('@domains/auth/auth-routing.module').then((m) => m.AuthRoutingModule),
  },
  {
    path: 'app',
    canActivate: [authGuard],
    loadChildren: () => import('@shared/components/layout/layout-routing.module').then((m) => m.LayoutRoutingModule),
}
];
