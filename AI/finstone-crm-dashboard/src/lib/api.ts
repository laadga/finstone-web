// API utility functions for the CRM dashboard
// TODO: Replace with actual API client when connecting to real backend

const API_BASE_URL = '/api';

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP ${response.status}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error', 0);
  }
}

// Dashboard API
export const dashboardApi = {
  getStats: () => fetchApi<{
    stats: any;
    activityFeed: any[];
    recentLeads: any[];
  }>('/dashboard'),
};

// Leads API
export const leadsApi = {
  getLeads: (params?: {
    page?: number;
    limit?: number;
    status?: string;
    assigned?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.status) searchParams.set('status', params.status);
    if (params?.assigned) searchParams.set('assigned', params.assigned);
    
    const query = searchParams.toString();
    return fetchApi<{
      leads: any[];
      total: number;
      page: number;
      limit: number;
    }>(`/leads${query ? `?${query}` : ''}`);
  },

  getLead: (id: string) => fetchApi<any>(`/leads/${id}`),

  createLead: (data: any) => fetchApi<any>('/leads', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  updateLead: (id: string, data: any) => fetchApi<any>(`/leads/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
};

// Customers API
export const customersApi = {
  getCustomers: () => fetchApi<any[]>('/customers'),
  getCustomer: (id: string) => fetchApi<any>(`/customers/${id}`),
};

// Subscriptions API
export const subscriptionsApi = {
  getSubscriptions: () => fetchApi<any[]>('/subscriptions'),
  
  createCheckout: (customerId: string, planId: string) => fetchApi<{
    checkoutUrl: string;
    sessionId: string;
  }>('/checkout', {
    method: 'POST',
    body: JSON.stringify({ customerId, planId }),
  }),
};

// Provisioning API
export const provisioningApi = {
  getQueue: () => fetchApi<any[]>('/provisioning'),
  
  retryProvisioning: (id: string) => fetchApi<any>(`/provisioning/${id}/retry`, {
    method: 'POST',
  }),
};

// Integrations API
export const integrationsApi = {
  getIntegrations: () => fetchApi<any[]>('/integrations'),
  
  connectIntegration: (name: string) => fetchApi<any>(`/integrations/${name}/connect`, {
    method: 'POST',
  }),
  
  disconnectIntegration: (name: string) => fetchApi<any>(`/integrations/${name}/disconnect`, {
    method: 'POST',
  }),
};

// Tasks API
export const tasksApi = {
  getTasks: () => fetchApi<any[]>('/tasks'),
  
  createTask: (data: any) => fetchApi<any>('/tasks', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  updateTask: (id: string, data: any) => fetchApi<any>(`/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
};

// Support API
export const supportApi = {
  getTickets: () => fetchApi<any[]>('/support/tickets'),
  
  createTicket: (data: any) => fetchApi<any>('/support/tickets', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Stripe Webhook (for server-side use)
export const stripeWebhook = {
  handleWebhook: (payload: any) => fetchApi<any>('/webhook/stripe', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
};

// Health check
export const healthApi = {
  check: () => fetchApi<{ status: string; timestamp: string }>('/health'),
};

export { ApiError };





















