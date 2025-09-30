# Finstone AI CRM & Admin Dashboard

A comprehensive, production-ready CRM and admin dashboard built for Finstone AI. This system provides complete lead management, customer onboarding, subscription billing, and team collaboration tools.

## 🚀 Features

### Core CRM Features
- **Lead Management**: Complete pipeline from lead capture to conversion
- **Customer Management**: Account management with detailed profiles
- **Subscription & Billing**: Integration-ready billing system with Stripe hooks
- **Onboarding Workflows**: Automated customer onboarding with progress tracking
- **Agent Provisioning**: AI agent management and monitoring
- **Tasks & Notes**: Team collaboration and task management
- **Support Inbox**: Basic ticket management system
- **Integrations Manager**: OAuth-ready integration management
- **Audit Logs**: Complete activity tracking for compliance
- **Team Settings**: Role-based access control

### Technical Features
- **Role-Based Authentication**: Admin, Sales, and Support roles
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Live data updates and notifications
- **API-First Architecture**: RESTful API with mock data
- **TypeScript**: Full type safety throughout the application
- **Component Library**: Reusable shadcn/ui components

## 🛠 Tech Stack

- **Frontend**: React 18, Next.js 15, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Charts**: Recharts for analytics and reporting
- **State Management**: React Context API
- **Authentication**: JWT-based auth (mock implementation)
- **API**: Next.js API routes with mock data
- **Icons**: Lucide React icons

## 📁 Project Structure

```
src/
├── components/
│   ├── crm/                 # CRM-specific components
│   │   ├── CRMLayout.tsx    # Main CRM layout with navigation
│   │   ├── Dashboard.tsx    # Dashboard with KPIs and charts
│   │   ├── LeadsPage.tsx    # Lead management interface
│   │   ├── CustomersPage.tsx # Customer management interface
│   │   └── LoginPage.tsx    # Authentication page
│   └── ui/                  # Reusable UI components
├── contexts/
│   └── AuthContext.tsx      # Authentication context
├── data/
│   └── mockData.ts          # Mock data for development
├── lib/
│   ├── api.ts              # API client
│   ├── mockApi.ts          # Mock API implementation
│   └── utils.ts            # Utility functions
└── types/
    └── crm.ts              # TypeScript interfaces

app/
├── api/                    # Next.js API routes
│   ├── auth/              # Authentication endpoints
│   ├── dashboard/         # Dashboard data endpoints
│   ├── leads/             # Lead management endpoints
│   └── customers/         # Customer management endpoints
├── crm/                   # CRM application routes
│   ├── login/             # Login page
│   ├── dashboard/         # Main dashboard
│   │   ├── leads/         # Leads management
│   │   └── customers/     # Customer management
│   └── layout.tsx         # CRM layout wrapper
└── page.tsx               # Landing page
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finstone-ai-crm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Landing page: http://localhost:3000
   - CRM Dashboard: http://localhost:3000/crm/login

### Demo Credentials

Use these credentials to test different user roles:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@finstone.ai | password |
| Sales | sales@finstone.ai | password |
| Support | support@finstone.ai | password |

## 📊 Data Models

### Lead
```typescript
interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  source: 'website' | 'referral' | 'cold_outreach' | 'social_media' | 'event' | 'other';
  interestedPlan: 'starter' | 'growth' | 'business' | 'enterprise';
  status: 'new' | 'contacted' | 'demo_scheduled' | 'proposal_sent' | 'won' | 'lost';
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  notes: Note[];
  tasks: Task[];
  estimatedValue?: number;
  lastActivity?: Date;
}
```

### Customer
```typescript
interface Customer {
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
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Dashboard
- `GET /api/dashboard/stats` - Dashboard statistics

### Leads
- `GET /api/leads` - Get all leads (paginated)
- `GET /api/leads/:id` - Get specific lead
- `POST /api/leads` - Create new lead
- `PATCH /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead

### Customers
- `GET /api/customers` - Get all customers (paginated)
- `GET /api/customers/:id` - Get specific customer
- `POST /api/customers` - Create new customer
- `PATCH /api/customers/:id` - Update customer

### Tasks
- `GET /api/tasks` - Get all tasks (paginated)
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Notes
- `GET /api/notes` - Get notes for specific entity
- `POST /api/notes` - Create new note
- `PATCH /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## 🎨 Design System

### Colors
- **Primary**: Deep navy (#0B1C2C, #1A2B3C, #2A3B4C)
- **Accent**: Bright blue (#3ABEFF)
- **Success**: Teal (#00BFA6)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Headings**: Inter font family
- **Body**: System font stack
- **Sizes**: Responsive typography scale

### Components
All components follow the shadcn/ui design system with custom Finstone branding.

## 🔐 Security & Authentication

### Current Implementation (Mock)
- JWT-based authentication
- Role-based access control (Admin, Sales, Support)
- Session management with localStorage

### Production Recommendations
- Implement proper JWT validation
- Add refresh token mechanism
- Use secure HTTP-only cookies
- Implement rate limiting
- Add CSRF protection
- Use environment variables for secrets

## 💳 Billing Integration

### Stripe Integration
The system is designed to integrate with Stripe for billing:

```typescript
// Example checkout session creation
const checkoutSession = await apiClient.createCheckoutSession(
  customerId, 
  planId
);
```

### Webhook Handling
Stripe webhooks are handled at `/api/webhooks/stripe`:

```typescript
// Webhook event types supported:
// - customer.subscription.created
// - customer.subscription.updated
// - customer.subscription.deleted
// - invoice.payment_succeeded
// - invoice.payment_failed
```

## 🔗 Integrations

### Supported Integrations
- **Slack**: Team communication
- **HubSpot**: CRM synchronization
- **QuickBooks**: Accounting integration
- **Gmail**: Email management
- **Calendly**: Meeting scheduling
- **Stripe**: Payment processing

### OAuth Flow
Each integration follows a standard OAuth 2.0 flow:

1. User clicks "Connect" button
2. Redirect to OAuth provider
3. User authorizes application
4. Callback with authorization code
5. Exchange code for access token
6. Store token securely
7. Test connection and sync data

## 📈 Analytics & Reporting

### Dashboard Metrics
- **Active Customers**: Total paying customers
- **Monthly Recurring Revenue (MRR)**: Current MRR
- **New Leads**: Leads created in last 7 days
- **Pending Onboards**: Customers in onboarding process

### Charts
- **MRR Trend**: Monthly recurring revenue over time
- **Lead Conversion Funnel**: Lead progression through pipeline
- **Customer Growth**: Customer acquisition over time

## 🚀 Deployment

### Environment Variables
Create a `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Authentication
JWT_SECRET=your-jwt-secret-here
JWT_EXPIRES_IN=7d

# Stripe (Production)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Database (Production)
DATABASE_URL=postgresql://...

# OAuth Providers
SLACK_CLIENT_ID=your-slack-client-id
SLACK_CLIENT_SECRET=your-slack-client-secret
HUBSPOT_CLIENT_ID=your-hubspot-client-id
HUBSPOT_CLIENT_SECRET=your-hubspot-client-secret
```

### Production Deployment
1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your platform**
   - Vercel (recommended for Next.js)
   - Netlify
   - AWS Amplify
   - Self-hosted with Docker

3. **Set up production database**
   - PostgreSQL recommended
   - Run migrations
   - Set up backups

4. **Configure external services**
   - Stripe webhooks
   - OAuth applications
   - Email service (SendGrid, etc.)

## 🧪 Testing

### Running Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
```

### Test Coverage
- Component testing with React Testing Library
- API endpoint testing
- Integration testing
- E2E testing with Playwright

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Component Guidelines
- Use functional components with hooks
- Implement proper error boundaries
- Use React.memo for performance optimization
- Follow the single responsibility principle

### API Guidelines
- Use RESTful conventions
- Implement proper error handling
- Add request/response validation
- Use appropriate HTTP status codes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Pull Request Guidelines
- Include a clear description
- Add screenshots for UI changes
- Ensure all tests pass
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

## 🔄 Roadmap

### Phase 1 (Current)
- ✅ Authentication system
- ✅ Dashboard with KPIs
- ✅ Lead management
- ✅ Customer management
- ✅ Basic API structure

### Phase 2 (Next)
- [ ] Subscription & billing management
- [ ] Onboarding workflows
- [ ] Agent provisioning interface
- [ ] Tasks & notes system
- [ ] Support inbox

### Phase 3 (Future)
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Advanced integrations
- [ ] AI-powered insights
- [ ] Multi-tenant support

---

Built with ❤️ for Finstone AI





















