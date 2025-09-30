// CRM Data Models and TypeScript Interfaces

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'sales' | 'support';
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  source: 'website' | 'referral' | 'cold_outreach' | 'social_media' | 'event' | 'other';
  interestedPlan: 'starter' | 'growth' | 'business' | 'enterprise';
  status: 'new' | 'contacted' | 'demo_scheduled' | 'proposal_sent' | 'won' | 'lost';
  assignedTo?: string; // User ID
  createdAt: Date;
  updatedAt: Date;
  notes: Note[];
  tasks: Task[];
  estimatedValue?: number;
  lastActivity?: Date;
}

export interface Customer {
  id: string;
  company: string;
  contacts: Contact[];
  plan: 'starter' | 'growth' | 'business' | 'enterprise';
  billingStatus: 'active' | 'past_due' | 'canceled' | 'trialing';
  onboardingProgress: OnboardingStep[];
  agents: AgentProvision[];
  createdAt: Date;
  updatedAt: Date;
  notes: Note[];
  mrr: number;
  nextBillingDate?: Date;
  lastActivity?: Date;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  isPrimary: boolean;
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  assignedTo?: string;
  dueDate?: Date;
  completedAt?: Date;
  order: number;
}

export interface AgentProvision {
  id: string;
  agentType: 'sales' | 'marketing' | 'support' | 'finance' | 'ops' | 'compliance' | 'lead_gen' | 'customer_ops';
  status: 'provisioned' | 'provisioning' | 'failed' | 'pending';
  lastRun?: Date;
  logs: AgentLog[];
  customerId: string;
  createdAt: Date;
}

export interface AgentLog {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error';
  message: string;
  details?: any;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: string; // User ID
  dueDate?: Date;
  relatedToId?: string; // Lead or Customer ID
  relatedToType: 'lead' | 'customer';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface Note {
  id: string;
  content: string;
  author: string; // User ID
  createdAt: Date;
  isPrivate: boolean;
  relatedToId: string;
  relatedToType: 'lead' | 'customer';
}

export interface Invoice {
  id: string;
  customerId: string;
  amount: number;
  currency: string;
  dueDate: Date;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  createdAt: Date;
  paidAt?: Date;
  stripeInvoiceId?: string;
}

export interface SupportTicket {
  id: string;
  customerId: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  replies: TicketReply[];
}

export interface TicketReply {
  id: string;
  content: string;
  author: string;
  isInternal: boolean;
  createdAt: Date;
}

export interface Integration {
  id: string;
  name: string;
  type: 'slack' | 'hubspot' | 'quickbooks' | 'gmail' | 'calendly' | 'stripe';
  status: 'connected' | 'disconnected' | 'error';
  connectedAt?: Date;
  lastSync?: Date;
  customerId?: string; // If customer-specific
  config?: any;
}

export interface AuditLog {
  id: string;
  action: string;
  entityType: 'lead' | 'customer' | 'subscription' | 'billing' | 'onboarding';
  entityId: string;
  userId: string;
  details: any;
  timestamp: Date;
}

export interface DashboardStats {
  activeCustomers: number;
  mrr: number;
  newLeads: number;
  pendingOnboards: number;
  mrrTrend: { month: string; value: number }[];
  leadConversionFunnel: { stage: string; count: number }[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface CreateLeadForm {
  name: string;
  company: string;
  email: string;
  phone?: string;
  source: Lead['source'];
  interestedPlan: Lead['interestedPlan'];
  assignedTo?: string;
}

export interface UpdateLeadForm {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  source?: Lead['source'];
  interestedPlan?: Lead['interestedPlan'];
  status?: Lead['status'];
  assignedTo?: string;
}

export interface CreateTaskForm {
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: Date;
  relatedToId?: string;
  relatedToType: 'lead' | 'customer';
  priority: Task['priority'];
}

export interface CreateNoteForm {
  content: string;
  isPrivate: boolean;
  relatedToId: string;
  relatedToType: 'lead' | 'customer';
}





















