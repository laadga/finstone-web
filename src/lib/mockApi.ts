// Mock API Implementation for Development
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
import { 
  mockLeads, 
  mockCustomers, 
  mockTasks, 
  mockNotes, 
  mockInvoices, 
  mockSupportTickets, 
  mockIntegrations, 
  mockAuditLogs,
  mockDashboardStats,
  mockUsers
} from '@/data/mockData';

// Mock delay to simulate network requests
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage for mock data
let leads = [...mockLeads];
let customers = [...mockCustomers];
let tasks = [...mockTasks];
let notes = [...mockNotes];
let invoices = [...mockInvoices];
let supportTickets = [...mockSupportTickets];
let integrations = [...mockIntegrations];
let auditLogs = [...mockAuditLogs];

// Helper function to create API response
const createResponse = <T>(data: T, success: boolean = true, message?: string): ApiResponse<T> => ({
  data,
  success,
  message,
});

// Helper function to create paginated response
const createPaginatedResponse = <T>(
  data: T[], 
  page: number = 1, 
  limit: number = 50
): PaginatedResponse<T> => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total: data.length,
      totalPages: Math.ceil(data.length / limit),
    },
    success: true,
  };
};

// Mock API implementation
export const mockApi = {
  // Authentication
  async login(email: string, password: string): Promise<ApiResponse<{ user: any; token: string }>> {
    await delay();
    
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password') {
      const token = `mock_token_${Date.now()}`;
      return createResponse({ user, token });
    }
    
    throw new Error('Invalid credentials');
  },

  async logout(): Promise<ApiResponse<void>> {
    await delay();
    return createResponse(undefined);
  },

  // Dashboard
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    await delay();
    return createResponse(mockDashboardStats);
  },

  // Leads
  async getLeads(page: number = 1, limit: number = 50): Promise<PaginatedResponse<Lead>> {
    await delay();
    return createPaginatedResponse(leads, page, limit);
  },

  async getLead(id: string): Promise<ApiResponse<Lead>> {
    await delay();
    const lead = leads.find(l => l.id === id);
    if (!lead) {
      throw new Error('Lead not found');
    }
    return createResponse(lead);
  },

  async createLead(leadData: CreateLeadForm): Promise<ApiResponse<Lead>> {
    await delay();
    
    const newLead: Lead = {
      id: Date.now().toString(),
      ...leadData,
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date(),
      notes: [],
      tasks: [],
      lastActivity: new Date(),
    };
    
    leads.unshift(newLead);
    return createResponse(newLead);
  },

  async updateLead(id: string, updates: UpdateLeadForm): Promise<ApiResponse<Lead>> {
    await delay();
    
    const leadIndex = leads.findIndex(l => l.id === id);
    if (leadIndex === -1) {
      throw new Error('Lead not found');
    }
    
    leads[leadIndex] = {
      ...leads[leadIndex],
      ...updates,
      updatedAt: new Date(),
    };
    
    return createResponse(leads[leadIndex]);
  },

  async deleteLead(id: string): Promise<ApiResponse<void>> {
    await delay();
    
    const leadIndex = leads.findIndex(l => l.id === id);
    if (leadIndex === -1) {
      throw new Error('Lead not found');
    }
    
    leads.splice(leadIndex, 1);
    return createResponse(undefined);
  },

  // Customers
  async getCustomers(page: number = 1, limit: number = 50): Promise<PaginatedResponse<Customer>> {
    await delay();
    return createPaginatedResponse(customers, page, limit);
  },

  async getCustomer(id: string): Promise<ApiResponse<Customer>> {
    await delay();
    const customer = customers.find(c => c.id === id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    return createResponse(customer);
  },

  async createCustomer(customerData: Partial<Customer>): Promise<ApiResponse<Customer>> {
    await delay();
    
    const newCustomer: Customer = {
      id: Date.now().toString(),
      company: customerData.company || '',
      contacts: customerData.contacts || [],
      plan: customerData.plan || 'starter',
      billingStatus: customerData.billingStatus || 'trialing',
      onboardingProgress: customerData.onboardingProgress || [],
      agents: customerData.agents || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      notes: [],
      mrr: customerData.mrr || 0,
      nextBillingDate: customerData.nextBillingDate,
      lastActivity: new Date(),
    };
    
    customers.unshift(newCustomer);
    return createResponse(newCustomer);
  },

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<ApiResponse<Customer>> {
    await delay();
    
    const customerIndex = customers.findIndex(c => c.id === id);
    if (customerIndex === -1) {
      throw new Error('Customer not found');
    }
    
    customers[customerIndex] = {
      ...customers[customerIndex],
      ...updates,
      updatedAt: new Date(),
    };
    
    return createResponse(customers[customerIndex]);
  },

  // Tasks
  async getTasks(page: number = 1, limit: number = 50): Promise<PaginatedResponse<Task>> {
    await delay();
    return createPaginatedResponse(tasks, page, limit);
  },

  async getTask(id: string): Promise<ApiResponse<Task>> {
    await delay();
    const task = tasks.find(t => t.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return createResponse(task);
  },

  async createTask(taskData: CreateTaskForm): Promise<ApiResponse<Task>> {
    await delay();
    
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    tasks.unshift(newTask);
    return createResponse(newTask);
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<ApiResponse<Task>> {
    await delay();
    
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date(),
      completedAt: updates.status === 'completed' ? new Date() : tasks[taskIndex].completedAt,
    };
    
    return createResponse(tasks[taskIndex]);
  },

  async deleteTask(id: string): Promise<ApiResponse<void>> {
    await delay();
    
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    tasks.splice(taskIndex, 1);
    return createResponse(undefined);
  },

  // Notes
  async getNotes(relatedToId: string, relatedToType: 'lead' | 'customer'): Promise<ApiResponse<Note[]>> {
    await delay();
    const filteredNotes = notes.filter(n => 
      n.relatedToId === relatedToId && n.relatedToType === relatedToType
    );
    return createResponse(filteredNotes);
  },

  async createNote(noteData: CreateNoteForm): Promise<ApiResponse<Note>> {
    await delay();
    
    const newNote: Note = {
      id: Date.now().toString(),
      ...noteData,
      author: '1', // Mock user ID
      createdAt: new Date(),
    };
    
    notes.unshift(newNote);
    return createResponse(newNote);
  },

  async updateNote(id: string, updates: Partial<Note>): Promise<ApiResponse<Note>> {
    await delay();
    
    const noteIndex = notes.findIndex(n => n.id === id);
    if (noteIndex === -1) {
      throw new Error('Note not found');
    }
    
    notes[noteIndex] = {
      ...notes[noteIndex],
      ...updates,
    };
    
    return createResponse(notes[noteIndex]);
  },

  async deleteNote(id: string): Promise<ApiResponse<void>> {
    await delay();
    
    const noteIndex = notes.findIndex(n => n.id === id);
    if (noteIndex === -1) {
      throw new Error('Note not found');
    }
    
    notes.splice(noteIndex, 1);
    return createResponse(undefined);
  },

  // Invoices
  async getInvoices(page: number = 1, limit: number = 50): Promise<PaginatedResponse<Invoice>> {
    await delay();
    return createPaginatedResponse(invoices, page, limit);
  },

  async getInvoice(id: string): Promise<ApiResponse<Invoice>> {
    await delay();
    const invoice = invoices.find(i => i.id === id);
    if (!invoice) {
      throw new Error('Invoice not found');
    }
    return createResponse(invoice);
  },

  async createInvoice(invoiceData: Partial<Invoice>): Promise<ApiResponse<Invoice>> {
    await delay();
    
    const newInvoice: Invoice = {
      id: Date.now().toString(),
      customerId: invoiceData.customerId || '',
      amount: invoiceData.amount || 0,
      currency: invoiceData.currency || 'USD',
      dueDate: invoiceData.dueDate || new Date(),
      status: invoiceData.status || 'draft',
      createdAt: new Date(),
    };
    
    invoices.unshift(newInvoice);
    return createResponse(newInvoice);
  },

  // Support Tickets
  async getSupportTickets(page: number = 1, limit: number = 50): Promise<PaginatedResponse<SupportTicket>> {
    await delay();
    return createPaginatedResponse(supportTickets, page, limit);
  },

  async getSupportTicket(id: string): Promise<ApiResponse<SupportTicket>> {
    await delay();
    const ticket = supportTickets.find(t => t.id === id);
    if (!ticket) {
      throw new Error('Support ticket not found');
    }
    return createResponse(ticket);
  },

  async createSupportTicket(ticketData: Partial<SupportTicket>): Promise<ApiResponse<SupportTicket>> {
    await delay();
    
    const newTicket: SupportTicket = {
      id: Date.now().toString(),
      customerId: ticketData.customerId || '',
      subject: ticketData.subject || '',
      description: ticketData.description || '',
      status: ticketData.status || 'open',
      priority: ticketData.priority || 'medium',
      createdAt: new Date(),
      updatedAt: new Date(),
      replies: [],
    };
    
    supportTickets.unshift(newTicket);
    return createResponse(newTicket);
  },

  async updateSupportTicket(id: string, updates: Partial<SupportTicket>): Promise<ApiResponse<SupportTicket>> {
    await delay();
    
    const ticketIndex = supportTickets.findIndex(t => t.id === id);
    if (ticketIndex === -1) {
      throw new Error('Support ticket not found');
    }
    
    supportTickets[ticketIndex] = {
      ...supportTickets[ticketIndex],
      ...updates,
      updatedAt: new Date(),
      resolvedAt: updates.status === 'resolved' ? new Date() : supportTickets[ticketIndex].resolvedAt,
    };
    
    return createResponse(supportTickets[ticketIndex]);
  },

  // Integrations
  async getIntegrations(): Promise<ApiResponse<Integration[]>> {
    await delay();
    return createResponse(integrations);
  },

  async connectIntegration(integrationName: string, config: any): Promise<ApiResponse<Integration>> {
    await delay();
    
    const integrationIndex = integrations.findIndex(i => i.name.toLowerCase() === integrationName.toLowerCase());
    if (integrationIndex === -1) {
      throw new Error('Integration not found');
    }
    
    integrations[integrationIndex] = {
      ...integrations[integrationIndex],
      status: 'connected',
      connectedAt: new Date(),
      lastSync: new Date(),
      config,
    };
    
    return createResponse(integrations[integrationIndex]);
  },

  async disconnectIntegration(integrationName: string): Promise<ApiResponse<void>> {
    await delay();
    
    const integrationIndex = integrations.findIndex(i => i.name.toLowerCase() === integrationName.toLowerCase());
    if (integrationIndex === -1) {
      throw new Error('Integration not found');
    }
    
    integrations[integrationIndex] = {
      ...integrations[integrationIndex],
      status: 'disconnected',
      connectedAt: undefined,
      lastSync: undefined,
      config: undefined,
    };
    
    return createResponse(undefined);
  },

  // Audit Logs
  async getAuditLogs(page: number = 1, limit: number = 50): Promise<PaginatedResponse<AuditLog>> {
    await delay();
    return createPaginatedResponse(auditLogs, page, limit);
  },

  // Billing & Checkout
  async createCheckoutSession(customerId: string, planId: string): Promise<ApiResponse<{ url: string }>> {
    await delay();
    
    // Mock checkout session creation
    const checkoutUrl = `https://checkout.stripe.com/mock-session-${Date.now()}`;
    return createResponse({ url: checkoutUrl });
  },

  async getBillingHistory(customerId: string): Promise<ApiResponse<Invoice[]>> {
    await delay();
    const customerInvoices = invoices.filter(i => i.customerId === customerId);
    return createResponse(customerInvoices);
  },

  // Webhooks
  async handleStripeWebhook(payload: any): Promise<ApiResponse<void>> {
    await delay();
    
    // Mock webhook handling
    console.log('Mock Stripe webhook received:', payload);
    
    // In a real implementation, you would:
    // 1. Verify the webhook signature
    // 2. Parse the event type
    // 3. Update the relevant data in your database
    // 4. Send notifications if needed
    
    return createResponse(undefined);
  },
};

// Export for use in development
export default mockApi;





















