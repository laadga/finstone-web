// n8n Webhook Configuration
export interface N8nAgent {
  id: string;
  name: string;
  webhookUrl: string;
  workflowId: string;
  requiredFields: string[];
  optionalFields: string[];
  status: 'active' | 'inactive' | 'maintenance';
}

export const n8nAgents: N8nAgent[] = [
  // AI Agents
  {
    id: 'personal-ai-assistant',
    name: 'Personal AI Assistant',
    webhookUrl: 'https://your-n8n-instance.com/webhook/personal-ai-assistant',
    workflowId: 'personal-ai-assistant-workflow',
    requiredFields: ['user_id', 'task_description'],
    optionalFields: ['priority', 'deadline'],
    status: 'active'
  },
  {
    id: 'document-search-bot',
    name: 'Document Search Bot',
    webhookUrl: 'https://your-n8n-instance.com/webhook/document-search-bot',
    workflowId: 'document-search-bot-workflow',
    requiredFields: ['user_id', 'search_query', 'document_source'],
    optionalFields: ['search_filters', 'result_limit'],
    status: 'active'
  },
  {
    id: 'smart-email-organizer',
    name: 'Smart Email Organizer',
    webhookUrl: 'https://your-n8n-instance.com/webhook/smart-email-organizer',
    workflowId: 'smart-email-organizer-workflow',
    requiredFields: ['user_id', 'email_account'],
    optionalFields: ['organization_rules', 'auto_apply'],
    status: 'active'
  },
  {
    id: 'voice-booking-assistant',
    name: 'Voice Booking Assistant',
    webhookUrl: 'https://your-n8n-instance.com/webhook/voice-booking-assistant',
    workflowId: 'voice-booking-assistant-workflow',
    requiredFields: ['user_id', 'calendar_integration'],
    optionalFields: ['booking_preferences', 'notification_settings'],
    status: 'active'
  },
  // Sales Agents
  {
    id: 'sales-call-prep',
    name: 'Sales Call Prep',
    webhookUrl: 'https://your-n8n-instance.com/webhook/sales-call-prep',
    workflowId: 'sales-call-prep-workflow',
    requiredFields: ['user_id', 'prospect_id', 'meeting_date'],
    optionalFields: ['research_depth', 'prep_format'],
    status: 'active'
  },
  {
    id: 'lead-generator',
    name: 'Lead Generator',
    webhookUrl: 'https://your-n8n-instance.com/webhook/lead-generator',
    workflowId: 'lead-generator-workflow',
    requiredFields: ['user_id', 'target_criteria'],
    optionalFields: ['lead_sources', 'qualification_rules'],
    status: 'active'
  },
  {
    id: 'lead-outreacher',
    name: 'Lead Outreacher',
    webhookUrl: 'https://your-n8n-instance.com/webhook/lead-outreacher',
    workflowId: 'lead-outreacher-workflow',
    requiredFields: ['user_id', 'lead_list', 'outreach_template'],
    optionalFields: ['send_schedule', 'follow_up_rules'],
    status: 'active'
  },
  // Add more agents as needed...
];

export const getN8nAgent = (agentId: string): N8nAgent | undefined => {
  return n8nAgents.find(agent => agent.id === agentId);
};

export const getActiveN8nAgents = (): N8nAgent[] => {
  return n8nAgents.filter(agent => agent.status === 'active');
};






