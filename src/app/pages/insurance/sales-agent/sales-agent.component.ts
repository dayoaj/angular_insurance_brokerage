import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sales-page',
  templateUrl: './sales-agent.component.html'
})
export class AppSalesAgentComponent implements OnInit {

  dataSource: CustomStore;
  refreshMode: string = "repaint";
  sAgentEditorOptions: Object;

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  constructor(private dataService: DataService) {
    this.dataSource = new CustomStore({
      key: 'id',
      load: () => this.getAll(),
      insert: (values) => this.insert(values),
      update: (key, values) => this.update(key, values),
      remove: (key) => this.delete(key),
    });

    this.sAgentEditorOptions = { disabled: true };
  }

  async delete(key: any) {
    const response = await this.dataService.deleteSalesAgent(key);

    if (response.error != null) {
      this.dataGrid.instance.refresh();
      alert(JSON.stringify(response.error));
    }
    return;
  }

  async update(key: any, values: any) {
    const response = await this.dataService.updateSalesAgent(key, values);

    if (response.error != null) {
      this.dataGrid.instance.refresh();
      alert(JSON.stringify(response.error));
    }

    return;
  }

  async insert(values: any) {

    const response = await this.dataService.addSalesAgent(values);

    if (response.error != null) {
      this.dataGrid.instance.refresh();
      alert(JSON.stringify(response.error));
    }

    return;
  }

  async getAll() {

    const records = await this.dataService.getSalesAgents();
    // lastValueFrom(records).then(res => res[0] || []);
    if (records.error != null) {
      this.dataGrid.instance.refresh();
      alert(records.error.message);
    }
    return records.data || [];
  }

  ngOnInit(): void {
  }


}
