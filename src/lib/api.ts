// API Client for CRM System
import { 
  Lead, 
  Customer, 
  Task, 
  Note, 
  Invoice, 
  SupportTicket, 
  Integration, 
  AuditLog,
  DashboardStats,
  CreateLeadForm,
  UpdateLeadForm,
  CreateTaskForm,
  CreateNoteForm,
  ApiResponse,
  PaginatedResponse
} from '@/types/crm';

// Mock API delay to simulate network requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      // Simulate network delay
      await delay(500);

      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private async requestPaginated<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<PaginatedResponse<T>> {
    try {
      // Simulate network delay
      await delay(500);

      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication
  async login(email: string, password: string): Promise<ApiResponse<{ user: any; token: string }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // Dashboard
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return this.request('/dashboard/stats');
  }

  // Leads
  async getLeads(page: number = 1, limit: number = 50): Promise<PaginatedResponse<Lead>> {
    return this.requestPaginated(`/leads?page=${page}&limit=${limit}`);
  }

  async getLead(id: string): Promise<ApiResponse<Lead>> {
    return this.request(`/leads/${id}`);
  }

  async createLead(lead: CreateLeadForm): Promise<ApiResponse<Lead>> {
    return this.request('/leads', {
      method: 'POST',
      body: JSON.stringify(lead),
    });
  }

  async updateLead(id: string, updates: UpdateLeadForm): Promise<ApiResponse<Lead>> {
    return this.request(`/leads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteLead(id: string): Promise<ApiResponse<void>> {
    return this.request(`/leads/${id}`, {
      method: 'DELETE',
    });
  }

  // Customers
  async getCustomers(page: number = 1, limit: number = 50): Promise<PaginatedResponse<Customer>> {
    return this.requestPaginated(`/customers?page=${page}&limit=${limit}`);
  }

  async getCustomer(id: string): Promise<ApiResponse<Customer>> {
    return this.request(`/customers/${id}`);
  }

  async createCustomer(customer: Partial<Customer>): Promise<ApiResponse<Customer>> {
    return this.request('/customers', {
      method: 'POST',
      body: JSON.stringify(customer),
    });
  }

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<ApiResponse<Customer>> {
    return this.request(`/customers/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  // Tasks
  async getTasks(page: number = 1, limit: number = 50): Promise<PaginatedResponse<Task>> {
    return this.requestPaginated(`/tasks?page=${page}&limit=${limit}`);
  }

  async getTask(id: string): Promise<ApiResponse<Task>> {
    return this.request(`/tasks/${id}`);
  }

  async createTask(task: CreateTaskForm): Promise<ApiResponse<Task>> {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<ApiResponse<Task>> {
    return this.request(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteTask(id: string): Promise<ApiResponse<void>> {
    return this.request(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  // Notes
  async getNotes(relatedToId: string, relatedToType: 'lead' | 'customer'): Promise<ApiResponse<Note[]>> {
    return this.request(`/notes?relatedToId=${relatedToId}&relatedToType=${relatedToType}`);
  }

  async createNote(note: CreateNoteForm): Promise<ApiResponse<Note>> {
    return this.request('/notes', {
      method: 'POST',
      body: JSON.stringify(note),
    });
  }

  async updateNote(id: string, updates: Partial<Note>): Promise<ApiResponse<Note>> {
    return this.request(`/notes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteNote(id: string): Promise<ApiResponse<void>> {
    return this.request(`/notes/${id}`, {
      method: 'DELETE',
    });
  }

  // Invoices
  async getInvoices(page: number = 1, limit: number = 50): Promise<PaginatedResponse<Invoice>> {
    return this.requestPaginated(`/invoices?page=${page}&limit=${limit}`);
  }

  async getInvoice(id: string): Promise<ApiResponse<Invoice>> {
    return this.request(`/invoices/${id}`);
  }

  async createInvoice(invoice: Partial<Invoice>): Promise<ApiResponse<Invoice>> {
    return this.request('/invoices', {
      method: 'POST',
      body: JSON.stringify(invoice),
    });
  }

  // Support Tickets
  async getSupportTickets(page: number = 1, limit: number = 50): Promise<PaginatedResponse<SupportTicket>> {
    return this.request(`/support/tickets?page=${page}&limit=${limit}`);
  }

  async getSupportTicket(id: string): Promise<ApiResponse<SupportTicket>> {
    return this.request(`/support/tickets/${id}`);
  }

  async createSupportTicket(ticket: Partial<SupportTicket>): Promise<ApiResponse<SupportTicket>> {
    return this.request('/support/tickets', {
      method: 'POST',
      body: JSON.stringify(ticket),
    });
  }

  async updateSupportTicket(id: string, updates: Partial<SupportTicket>): Promise<ApiResponse<SupportTicket>> {
    return this.request(`/support/tickets/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  // Integrations
  async getIntegrations(): Promise<ApiResponse<Integration[]>> {
    return this.request('/integrations');
  }

  async connectIntegration(integrationName: string, config: any): Promise<ApiResponse<Integration>> {
    return this.request(`/integrations/${integrationName}/connect`, {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }

  async disconnectIntegration(integrationName: string): Promise<ApiResponse<void>> {
    return this.request(`/integrations/${integrationName}/disconnect`, {
      method: 'POST',
    });
  }

  // Audit Logs
  async getAuditLogs(page: number = 1, limit: number = 50): Promise<PaginatedResponse<AuditLog>> {
    return this.request(`/audit/logs?page=${page}&limit=${limit}`);
  }

  // Billing & Checkout
  async createCheckoutSession(customerId: string, planId: string): Promise<ApiResponse<{ url: string }>> {
    return this.request('/billing/checkout', {
      method: 'POST',
      body: JSON.stringify({ customerId, planId }),
    });
  }

  async getBillingHistory(customerId: string): Promise<ApiResponse<Invoice[]>> {
    return this.request(`/billing/history/${customerId}`);
  }

  // Webhooks
  async handleStripeWebhook(payload: any): Promise<ApiResponse<void>> {
    return this.request('/webhooks/stripe', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export individual methods for convenience
export const {
  login,
  logout,
  getDashboardStats,
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getInvoices,
  getInvoice,
  createInvoice,
  getSupportTickets,
  getSupportTicket,
  createSupportTicket,
  updateSupportTicket,
  getIntegrations,
  connectIntegration,
  disconnectIntegration,
  getAuditLogs,
  createCheckoutSession,
  getBillingHistory,
  handleStripeWebhook,
} = apiClient;





















