import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DxDataGridComponent, DxSelectBoxModule, DxTextAreaModule,
  DxFormModule,
  DxFormComponent,
  DxTooltipModule
} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-policy-page',
  templateUrl: './policy.component.html'
})
export class AppPolicyComponent implements OnInit {

  dataSource: CustomStore;
  refreshMode: string = "repaint";
  salesAgentsData: any;
  clientEditorOptions: Object;
  salesAgentEditorOptions: Object;
  dobEditorOptions: Object;


  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  constructor(private dataService: DataService) {
    this.dataSource = new CustomStore({
      key: 'client_id',
      load: () => this.getAll(),
      insert: (values) => this.insert(values),
      update: (key, values) => this.update(key, values),
      remove: (key) => this.delete(key),
    });

    this.salesAgentsData = new CustomStore({
      key: 'Value',
      loadMode: 'raw',
      load: () => this.getSalesAgents(),
    });

    // disables client id field.
    this.clientEditorOptions = { disabled: true };

    // this.salesAgentEditorOptions
    //   = { dataSource: this.salesAgentsData, displayExpr: "first_name", valueExpr: "sales_agent_names", searchEnabled: true };
    this.dobEditorOptions = { width: '100%', valueExpr: "date_of_birth" };

  }

  async delete(key: any) {
    const response = await this.dataService.deleteClient(key);

    if (response.error != null) {
      this.dataGrid.instance.refresh();
      alert(JSON.stringify(response.error));
    }
    return;
  }

  async update(key: any, values: any) {

    let val = await this.dataGrid.instance.selectRows([key], true).then(result => result[0]);

    // values = { ...values, sales_agent_id: values.sales_agent_id.id }
    console.log('Client Object', JSON.stringify(values));

    // spread object properties.
    const clientObj = { ...val, ...values };

    console.log('Client Object', JSON.stringify(clientObj));

    const response = await this.dataService.updateClient(key, clientObj);
    if (response.error != null) {
      this.dataGrid.instance.refresh();
      alert(JSON.stringify(response.error));
    }

    return;
  }

  async insert(values: any) {
    console.log(JSON.stringify(values));

    const response = await this.dataService.addClient(values);

    // if (response.error != null) {
    //   this.dataGrid.instance.refresh();
    //   alert(JSON.stringify(response.error));
    // }

    return;
  }

  async getAll() {

    const records = await this.dataService.getClients();

    if (records.error != null) {
      alert(records.error.message);
    }
    return records.data || [];
  }

  async getSalesAgents() {
    const records = await this.dataService.getSalesAgents();
    if (records.error != null) {
      alert(records.error.message);
    }

    return records.data || [];
  }

  ngOnInit(): void {
  }


}

// export interface SalesAgent {
//   id: number
//   created_at: string
//   first_name: string
//   last_name: string
//   other_names: any
//   email: string
//   commission: number
// }
