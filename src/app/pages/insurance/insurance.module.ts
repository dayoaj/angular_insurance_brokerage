import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { DevExtremeModule } from '../../devextreme.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { InsuranceRoutes } from './insurance.routing';

import { AppSalesAgentComponent } from './sales-agent/sales-agent.component';
import { AppClientComponent } from './client/client.component';
import { AppPolicyComponent } from './policy/policy.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(InsuranceRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    DevExtremeModule
  ],
  declarations: [
    AppSalesAgentComponent, AppClientComponent, AppPolicyComponent
  ],
})
export class InsuranceModule { }
