import { formatCurrency } from '@angular/common';
import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';

export const S_AGENTS = 'sales_agents';
export const CLIENTS_V = 'clients_view';
export const CLIENTS = 'clients';
export const CLIENT_AGENT = 'client_agent';
export const CLIENT_TEMP = 'client_temp';
export const CLIENT_TEMP_ADD = 'client_temp_add';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  /* SALES AGENTS */
  async getSalesAgents() {
    const { data, error } = await this.supabase
      .from(S_AGENTS)
      .select();
    return { data: data, error: error };

  }


  async addSalesAgent(values: any) {
    return await this.supabase
      .from(S_AGENTS)
      .insert(values);
  }

  async deleteSalesAgent(id: any) {
    return await this.supabase
      .from(S_AGENTS)
      .delete()
      .eq('id', id);
  }

  async updateSalesAgent(id: any, values: any) {
    return await this.supabase
      .from(S_AGENTS)
      .update(values)
      .eq('id', id);
  }

  /* CLIENTS */
  async getClients() {
    const { data, error } = await this.supabase
      .from(CLIENTS_V)
      .select();
    return { data: data, error: error };
  }

  async addClient(values: any) {
    await this.supabase
      .from(CLIENTS)
      .upsert({ metadata: values });
  }

  async deleteClient(id: any) {
    return await this.supabase
      .from(CLIENTS)
      .delete()
      .eq('client_id', id);
  }

  async updateClient(id: any, client: any) {

    return await this.supabase
      .from(CLIENT_TEMP)
      .upsert({ id: id, metadata: client });

  }
}
