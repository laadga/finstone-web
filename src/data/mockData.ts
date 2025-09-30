// Mock Data for CRM System
import { 
  User, 
  Lead, 
  Customer, 
  Task, 
  Note, 
  Invoice, 
  SupportTicket, 
  Integration, 
  AuditLog,
  DashboardStats,
  OnboardingStep,
  AgentProvision,
  Contact
} from '@/types/crm';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@finstone.ai',
    name: 'Admin User',
    role: 'admin',
    avatar: '/avatars/admin.jpg',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-01-15'),
  },
  {
    id: '2',
    email: 'sales@finstone.ai',
    name: 'Sales Rep',
    role: 'sales',
    avatar: '/avatars/sales.jpg',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-01-14'),
  },
  {
    id: '3',
    email: 'support@finstone.ai',
    name: 'Support Agent',
    role: 'support',
    avatar: '/avatars/support.jpg',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-01-13'),
  },
];

// Mock Contacts
export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@techcorp.com',
    phone: '+1-555-0123',
    role: 'CEO',
    isPrimary: true,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@techcorp.com',
    phone: '+1-555-0124',
    role: 'CTO',
    isPrimary: false,
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@startup.io',
    phone: '+1-555-0125',
    role: 'Founder',
    isPrimary: true,
  },
];

// Mock Onboarding Steps
export const mockOnboardingSteps: OnboardingStep[] = [
  {
    id: '1',
    title: 'Kickoff Call',
    description: 'Initial discovery call with customer',
    status: 'completed',
    assignedTo: '2',
    dueDate: new Date('2024-01-10'),
    completedAt: new Date('2024-01-08'),
    order: 1,
  },
  {
    id: '2',
    title: 'Integrations Connected',
    description: 'Connect required third-party integrations',
    status: 'in_progress',
    assignedTo: '3',
    dueDate: new Date('2024-01-15'),
    order: 2,
  },
  {
    id: '3',
    title: 'Agent Provisioning',
    description: 'Set up and configure AI agents',
    status: 'pending',
    assignedTo: '1',
    dueDate: new Date('2024-01-20'),
    order: 3,
  },
  {
    id: '4',
    title: 'Training & Review',
    description: 'Customer training and final review',
    status: 'pending',
    assignedTo: '2',
    dueDate: new Date('2024-01-25'),
    order: 4,
  },
];

// Mock Agent Provisions
export const mockAgentProvisions: AgentProvision[] = [
  {
    id: '1',
    agentType: 'sales',
    status: 'provisioned',
    lastRun: new Date('2024-01-12'),
    logs: [
      {
        id: '1',
        timestamp: new Date('2024-01-12T10:00:00'),
        level: 'info',
        message: 'Agent successfully provisioned',
      },
      {
        id: '2',
        timestamp: new Date('2024-01-12T10:05:00'),
        level: 'info',
        message: 'Initial configuration completed',
      },
    ],
    customerId: '1',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    agentType: 'marketing',
    status: 'provisioning',
    customerId: '1',
    createdAt: new Date('2024-01-11'),
  },
];

// Mock Notes
export const mockNotes: Note[] = [
  {
    id: '1',
    content: 'Initial contact made via website form. Very interested in Growth plan.',
    author: '2',
    createdAt: new Date('2024-01-05'),
    isPrivate: false,
    relatedToId: '1',
    relatedToType: 'lead',
  },
  {
    id: '2',
    content: 'Demo scheduled for next week. Technical team will join.',
    author: '2',
    createdAt: new Date('2024-01-08'),
    isPrivate: false,
    relatedToId: '1',
    relatedToType: 'lead',
  },
  {
    id: '3',
    content: 'Customer has specific requirements for Slack integration.',
    author: '3',
    createdAt: new Date('2024-01-10'),
    isPrivate: true,
    relatedToId: '1',
    relatedToType: 'customer',
  },
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Follow up with TechCorp demo',
    description: 'Send follow-up email after demo presentation',
    assignee: '2',
    dueDate: new Date('2024-01-16'),
    relatedToId: '1',
    relatedToType: 'lead',
    status: 'pending',
    priority: 'high',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    title: 'Configure Slack integration',
    description: 'Set up Slack integration for Startup.io',
    assignee: '3',
    dueDate: new Date('2024-01-18'),
    relatedToId: '2',
    relatedToType: 'customer',
    status: 'in_progress',
    priority: 'medium',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-14'),
  },
  {
    id: '3',
    title: 'Review onboarding checklist',
    description: 'Review and update onboarding process',
    assignee: '1',
    dueDate: new Date('2024-01-20'),
    relatedToId: '1',
    relatedToType: 'customer',
    status: 'completed',
    priority: 'low',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-15'),
    completedAt: new Date('2024-01-15'),
  },
];

// Mock Leads
export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    company: 'TechCorp',
    email: 'john@techcorp.com',
    phone: '+1-555-0123',
    source: 'website',
    interestedPlan: 'growth',
    status: 'demo_scheduled',
    assignedTo: '2',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-10'),
    notes: mockNotes.filter(note => note.relatedToId === '1'),
    tasks: mockTasks.filter(task => task.relatedToId === '1'),
    estimatedValue: 5000,
    lastActivity: new Date('2024-01-10'),
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    company: 'InnovateLabs',
    email: 'sarah@innovatelabs.com',
    phone: '+1-555-0124',
    source: 'referral',
    interestedPlan: 'business',
    status: 'contacted',
    assignedTo: '2',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-12'),
    notes: [],
    tasks: [],
    estimatedValue: 12000,
    lastActivity: new Date('2024-01-12'),
  },
  {
    id: '3',
    name: 'Mike Chen',
    company: 'Startup.io',
    email: 'mike@startup.io',
    phone: '+1-555-0125',
    source: 'cold_outreach',
    interestedPlan: 'starter',
    status: 'new',
    assignedTo: '2',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    notes: [],
    tasks: [],
    estimatedValue: 2000,
    lastActivity: new Date('2024-01-12'),
  },
];

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    id: '1',
    company: 'TechCorp',
    contacts: [mockContacts[0], mockContacts[1]],
    plan: 'growth',
    billingStatus: 'active',
    onboardingProgress: mockOnboardingSteps,
    agents: mockAgentProvisions,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-14'),
    notes: mockNotes.filter(note => note.relatedToId === '1' && note.relatedToType === 'customer'),
    mrr: 5000,
    nextBillingDate: new Date('2024-02-10'),
    lastActivity: new Date('2024-01-14'),
  },
  {
    id: '2',
    company: 'Startup.io',
    contacts: [mockContacts[2]],
    plan: 'starter',
    billingStatus: 'trialing',
    onboardingProgress: [
      {
        id: '5',
        title: 'Kickoff Call',
        description: 'Initial discovery call with customer',
        status: 'completed',
        assignedTo: '2',
        dueDate: new Date('2024-01-15'),
        completedAt: new Date('2024-01-13'),
        order: 1,
      },
      {
        id: '6',
        title: 'Integrations Connected',
        description: 'Connect required third-party integrations',
        status: 'in_progress',
        assignedTo: '3',
        dueDate: new Date('2024-01-20'),
        order: 2,
      },
    ],
    agents: [],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-14'),
    notes: [],
    mrr: 2000,
    nextBillingDate: new Date('2024-02-12'),
    lastActivity: new Date('2024-01-14'),
  },
];

// Mock Invoices
export const mockInvoices: Invoice[] = [
  {
    id: '1',
    customerId: '1',
    amount: 5000,
    currency: 'USD',
    dueDate: new Date('2024-02-10'),
    status: 'paid',
    createdAt: new Date('2024-01-10'),
    paidAt: new Date('2024-01-10'),
    stripeInvoiceId: 'in_1234567890',
  },
  {
    id: '2',
    customerId: '2',
    amount: 2000,
    currency: 'USD',
    dueDate: new Date('2024-02-12'),
    status: 'sent',
    createdAt: new Date('2024-01-12'),
  },
];

// Mock Support Tickets
export const mockSupportTickets: SupportTicket[] = [
  {
    id: '1',
    customerId: '1',
    subject: 'Integration Issue',
    description: 'Having trouble connecting Slack integration',
    status: 'in_progress',
    priority: 'medium',
    assignedTo: '3',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-14'),
    replies: [
      {
        id: '1',
        content: 'Looking into this issue. Will update you shortly.',
        author: '3',
        isInternal: false,
        createdAt: new Date('2024-01-13'),
      },
    ],
  },
  {
    id: '2',
    customerId: '2',
    subject: 'Billing Question',
    description: 'Question about upcoming billing cycle',
    status: 'open',
    priority: 'low',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    replies: [],
  },
];

// Mock Integrations
export const mockIntegrations: Integration[] = [
  {
    id: '1',
    name: 'Slack',
    type: 'slack',
    status: 'connected',
    connectedAt: new Date('2024-01-10'),
    lastSync: new Date('2024-01-14'),
    customerId: '1',
  },
  {
    id: '2',
    name: 'HubSpot',
    type: 'hubspot',
    status: 'disconnected',
    customerId: '1',
  },
  {
    id: '3',
    name: 'Gmail',
    type: 'gmail',
    status: 'connected',
    connectedAt: new Date('2024-01-12'),
    lastSync: new Date('2024-01-14'),
    customerId: '2',
  },
];

// Mock Audit Logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    action: 'lead_created',
    entityType: 'lead',
    entityId: '1',
    userId: '2',
    details: { leadName: 'John Smith', company: 'TechCorp' },
    timestamp: new Date('2024-01-05'),
  },
  {
    id: '2',
    action: 'subscription_created',
    entityType: 'subscription',
    entityId: '1',
    userId: '2',
    details: { plan: 'growth', amount: 5000 },
    timestamp: new Date('2024-01-10'),
  },
  {
    id: '3',
    action: 'onboarding_step_completed',
    entityType: 'onboarding',
    entityId: '1',
    userId: '2',
    details: { step: 'Kickoff Call' },
    timestamp: new Date('2024-01-08'),
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  activeCustomers: 2,
  mrr: 7000,
  newLeads: 3,
  pendingOnboards: 1,
  mrrTrend: [
    { month: 'Oct 2023', value: 4000 },
    { month: 'Nov 2023', value: 4500 },
    { month: 'Dec 2023', value: 5000 },
    { month: 'Jan 2024', value: 7000 },
  ],
  leadConversionFunnel: [
    { stage: 'New Leads', count: 15 },
    { stage: 'Contacted', count: 12 },
    { stage: 'Demo Scheduled', count: 8 },
    { stage: 'Proposal Sent', count: 5 },
    { stage: 'Won', count: 3 },
  ],
};

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Helper function to get lead by ID
export const getLeadById = (id: string): Lead | undefined => {
  return mockLeads.find(lead => lead.id === id);
};

// Helper function to get customer by ID
export const getCustomerById = (id: string): Customer | undefined => {
  return mockCustomers.find(customer => customer.id === id);
};

// Helper function to get tasks by related ID
export const getTasksByRelatedId = (relatedToId: string): Task[] => {
  return mockTasks.filter(task => task.relatedToId === relatedToId);
};

// Helper function to get notes by related ID
export const getNotesByRelatedId = (relatedToId: string): Note[] => {
  return mockNotes.filter(note => note.relatedToId === relatedToId);
};





















