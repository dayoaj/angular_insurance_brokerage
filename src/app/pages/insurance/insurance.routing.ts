import { Routes } from '@angular/router';

// pages
import { AppSalesAgentComponent } from './sales-agent/sales-agent.component';
import { AppClientComponent } from './client/client.component';
import { AppPolicyComponent } from './policy/policy.component';

export const InsuranceRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sales-agent',
        component: AppSalesAgentComponent,
      },
      {
        path: 'client',
        component: AppClientComponent,
      },
      {
        path: 'policy',
        component: AppPolicyComponent,
      },
    ],
  },
];
