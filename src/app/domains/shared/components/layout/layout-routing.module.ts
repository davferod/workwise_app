import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { UsersComponent } from '@domains/users/users.component';
import { authGuard } from '@domains/auth/guards/auth.guard';
import { ProfileComponent } from '@domains/profile/profile.component';
import { PhysicalTestComponent } from '@app/domains/physical-test/physical-test.component';
import { AnthropometricComponent } from '@app/domains/anthropometric/anthropometric.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'boards',
        pathMatch: 'full'
      },
      {
        path: 'boards',
        canActivate: [authGuard],
        loadChildren: () =>
          import('@domains/boards/boards-routing.module').then((m) => m.BoardsRoutingModule),
      },
      {
        path: 'users',
        canActivate: [authGuard],
        component: UsersComponent
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () => import('@domains/profile/profile.component').then((c) => c.ProfileComponent)
      },
      {
        path: 'physical-test',
        canActivate: [authGuard],
        component: PhysicalTestComponent
      }
      ,
      {
        path: 'anthropometric-measures',
        canActivate: [authGuard],
        loadComponent: () => import('@domains/anthropometric/anthropometric.component').then((c) => c.AnthropometricComponent)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
