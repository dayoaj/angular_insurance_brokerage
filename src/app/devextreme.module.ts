import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// DevExtreme Controls
import { DxTemplateModule, DxDataGridModule, DxButtonModule, DxSelectBoxModule, DxTextAreaModule, DxFormModule, DxTooltipModule } from 'devextreme-angular';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxHtmlEditorModule } from 'devextreme-angular/ui/html-editor';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';



@NgModule({
  declarations: [],
  exports: [
    DxButtonModule,
    DxDataGridModule,
    DxTemplateModule,
    DxHtmlEditorModule,
    DxCheckBoxModule,
    DxToolbarModule,
    DxToolbarModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxFormModule,
    DxTooltipModule
  ],
})
export class DevExtremeModule { }
