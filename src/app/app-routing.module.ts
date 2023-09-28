import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        redirectTo: '/authentication/login',
        pathMatch: 'full',
      },
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then((m) => m.AuthenticationModule),
      },
    ],
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'insurance',
        loadChildren: () =>
          import('./pages/insurance/insurance.module').then((m) => m.InsuranceModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('./pages/accounts/accounts.module').then(
            (m) => m.AccountsModule
          ),
      },
      // {
      //   path: 'ui-components',
      //   loadChildren: () =>
      //     import('./pages/ui-components/ui-components.module').then(
      //       (m) => m.UicomponentsModule
      //     ),
      // },
      // {
      //   path: 'extra',
      //   loadChildren: () =>
      //     import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      // },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
