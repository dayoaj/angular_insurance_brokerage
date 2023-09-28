import { Routes } from '@angular/router';

import { AppLoginComponent } from './login/login.component';
// import { AppSideRegisterComponent } from './register/register.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppLoginComponent,
      },
      // {
      //   path: 'register',
      //   component: AppSideRegisterComponent,
      // },
    ],
  },
];
