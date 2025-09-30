import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Load seed data
const seedDataPath = join(__dirname, '../src/data/seed.json');
let seedData: any;

try {
  const seedDataRaw = fs.readFileSync(seedDataPath, 'utf8');
  seedData = JSON.parse(seedDataRaw);
} catch (error) {
  console.error('Error loading seed data:', error);
  process.exit(1);
}

// Helper function to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Dashboard API
app.get('/api/dashboard', async (req, res) => {
  await delay(300); // Simulate network delay
  res.json({
    stats: seedData.dashboardStats,
    activityFeed: seedData.activityFeed.slice(0, 5),
    recentLeads: seedData.leads.slice(0, 5)
  });
});

// Leads API
app.get('/api/leads', async (req, res) => {
  await delay(200);
  const { page = 1, limit = 10, status, assigned } = req.query;
  
  let filteredLeads = [...seedData.leads];
  
  if (status) {
    filteredLeads = filteredLeads.filter((lead: any) => 
      lead.status.toLowerCase() === status.toString().toLowerCase()
    );
  }
  
  if (assigned) {
    filteredLeads = filteredLeads.filter((lead: any) => 
      lead.assignedTo === assigned
    );
  }
  
  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = startIndex + Number(limit);
  const paginatedLeads = filteredLeads.slice(startIndex, endIndex);
  
  res.json({
    leads: paginatedLeads,
    total: filteredLeads.length,
    page: Number(page),
    limit: Number(limit)
  });
});

app.get('/api/leads/:id', async (req, res) => {
  await delay(150);
  const lead = seedData.leads.find((l: any) => l.id === req.params.id);
  if (!lead) {
    return res.status(404).json({ error: 'Lead not found' });
  }
  res.json(lead);
});

app.post('/api/leads', async (req, res) => {
  await delay(300);
  const newLead = {
    id: `L-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString(),
    lastContact: new Date().toISOString(),
    notes: [],
    tasks: []
  };
  seedData.leads.unshift(newLead);
  res.status(201).json(newLead);
});

app.patch('/api/leads/:id', async (req, res) => {
  await delay(200);
  const leadIndex = seedData.leads.findIndex((l: any) => l.id === req.params.id);
  if (leadIndex === -1) {
    return res.status(404).json({ error: 'Lead not found' });
  }
  
  seedData.leads[leadIndex] = {
    ...seedData.leads[leadIndex],
    ...req.body,
    lastContact: new Date().toISOString()
  };
  
  res.json(seedData.leads[leadIndex]);
});

// Customers API
app.get('/api/customers', async (req, res) => {
  await delay(200);
  res.json(seedData.customers);
});

app.get('/api/customers/:id', async (req, res) => {
  await delay(150);
  const customer = seedData.customers.find((c: any) => c.id === req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  res.json(customer);
});

// Subscriptions & Billing API
app.get('/api/subscriptions', async (req, res) => {
  await delay(200);
  const subscriptions = seedData.customers.map((customer: any) => ({
    ...customer,
    invoices: seedData.invoices.filter((inv: any) => inv.customerId === customer.id)
  }));
  res.json(subscriptions);
});

// Checkout API (Stripe placeholder)
app.post('/api/checkout', async (req, res) => {
  await delay(500);
  const { customerId, planId } = req.body;
  
  // TODO: Replace with actual Stripe checkout session creation
  // const session = await stripe.checkout.sessions.create({...});
  
  res.json({
    checkoutUrl: `https://checkout.stripe.com/pay/cs_test_${Date.now()}`,
    sessionId: `cs_test_${Date.now()}`
  });
});

// Stripe Webhook (placeholder)
app.post('/api/webhook/stripe', async (req, res) => {
  await delay(100);
  
  // TODO: Implement actual Stripe webhook handling
  // const sig = req.headers['stripe-signature'];
  // const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  
  console.log('Stripe webhook received:', req.body);
  res.status(200).json({ received: true });
});

// Provisioning API
app.get('/api/provisioning', async (req, res) => {
  await delay(200);
  res.json(seedData.provisioningQueue);
});

app.post('/api/provisioning/:id/retry', async (req, res) => {
  await delay(300);
  const item = seedData.provisioningQueue.find((p: any) => p.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Provisioning item not found' });
  }
  
  item.status = 'provisioning';
  item.lastUpdate = new Date().toISOString();
  item.logs.push({
    timestamp: new Date().toISOString(),
    level: 'info',
    message: 'Retry initiated'
  });
  
  res.json(item);
});

// Integrations API
app.get('/api/integrations', async (req, res) => {
  await delay(200);
  res.json(seedData.integrations);
});

app.post('/api/integrations/:name/connect', async (req, res) => {
  await delay(1000); // Simulate OAuth flow
  const integration = seedData.integrations.find((i: any) => 
    i.name.toLowerCase() === req.params.name.toLowerCase()
  );
  
  if (!integration) {
    return res.status(404).json({ error: 'Integration not found' });
  }
  
  integration.status = 'connected';
  integration.connectedAt = new Date().toISOString();
  
  res.json(integration);
});

app.post('/api/integrations/:name/disconnect', async (req, res) => {
  await delay(300);
  const integration = seedData.integrations.find((i: any) => 
    i.name.toLowerCase() === req.params.name.toLowerCase()
  );
  
  if (!integration) {
    return res.status(404).json({ error: 'Integration not found' });
  }
  
  integration.status = 'available';
  delete integration.connectedAt;
  
  res.json(integration);
});

// Tasks API
app.get('/api/tasks', async (req, res) => {
  await delay(200);
  res.json(seedData.tasks);
});

app.post('/api/tasks', async (req, res) => {
  await delay(300);
  const newTask = {
    id: `T-${Date.now()}`,
    ...req.body,
    status: 'open',
    createdAt: new Date().toISOString()
  };
  seedData.tasks.push(newTask);
  res.status(201).json(newTask);
});

app.patch('/api/tasks/:id', async (req, res) => {
  await delay(200);
  const taskIndex = seedData.tasks.findIndex((t: any) => t.id === req.params.id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  seedData.tasks[taskIndex] = {
    ...seedData.tasks[taskIndex],
    ...req.body
  };
  
  res.json(seedData.tasks[taskIndex]);
});

// Support API
app.get('/api/support/tickets', async (req, res) => {
  await delay(200);
  res.json(seedData.supportTickets);
});

app.post('/api/support/tickets', async (req, res) => {
  await delay(300);
  const newTicket = {
    id: `ticket-${Date.now()}`,
    ...req.body,
    status: 'open',
    createdAt: new Date().toISOString()
  };
  seedData.supportTickets.unshift(newTicket);
  res.status(201).json(newTicket);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Mock API server running on http://localhost:${PORT}`);
  console.log(`📊 Seed data loaded: ${seedData.leads.length} leads, ${seedData.customers.length} customers`);
});





















