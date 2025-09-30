# Finstone CRM Dashboard

A production-quality admin CRM dashboard built with React, TypeScript, and Tailwind CSS. This dashboard provides a comprehensive interface for managing leads, customers, subscriptions, agent provisioning, and integrations.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd finstone-crm-dashboard
   npm install
   ```

2. **Start the development servers:**
   ```bash
   npm run dev
   ```

   This will start both:
   - Frontend (Vite) on http://localhost:3000
   - Mock API server on http://localhost:3001

3. **Access the dashboard:**
   - Open http://localhost:3000 in your browser
   - The app will auto-login with the admin demo account

## 🎯 Features

### Core Functionality
- **Dashboard Overview** - KPI cards, activity feed, recent leads
- **Leads Management** - Full CRUD operations, filtering, search
- **Customer Management** - Account details, onboarding progress
- **Subscriptions & Billing** - Plan management, checkout integration
- **Agent Provisioning** - Queue monitoring, logs, retry functionality
- **Integrations Manager** - Connect/disconnect popular services
- **Responsive Design** - Works on desktop, tablet, and mobile

### UI/UX Features
- **Collapsible Sidebar** - Space-efficient navigation
- **Lead Detail Flyout** - Right-hand panel with tabs and actions
- **Real-time Updates** - Mock data updates and state management
- **Loading States** - Skeleton loaders and smooth transitions
- **Accessibility** - Keyboard navigation, ARIA labels, focus management

## 👥 Demo Accounts

The dashboard includes three demo user accounts:

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| **Admin** | admin@finstone.test | password | Full access to all features |
| **Sales** | sales@finstone.test | password | Leads, customers, dashboard |
| **Support** | support@finstone.test | password | Customers, provisioning, support |

## 📁 Project Structure

```
finstone-crm-dashboard/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Badge.tsx
│   │   ├── DataTable.tsx
│   │   ├── FlyoutLeadDetail.tsx
│   │   ├── KpiCard.tsx
│   │   ├── Layout.tsx
│   │   ├── Modal.tsx
│   │   ├── Sidebar.tsx
│   │   └── TopNav.tsx
│   ├── pages/              # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Leads.tsx
│   │   ├── Customers.tsx
│   │   ├── Subscriptions.tsx
│   │   ├── Provisioning.tsx
│   │   ├── Integrations.tsx
│   │   └── LoginPage.tsx
│   ├── lib/                # Utilities and API
│   │   ├── api.ts          # API client functions
│   │   ├── mockAuth.ts     # Authentication logic
│   │   ├── mockAuth.tsx    # Auth context provider
│   │   └── utils.ts        # Helper functions
│   ├── data/
│   │   └── seed.json       # Mock data
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── server/                 # Mock API server
│   └── server.ts
├── package.json
├── tailwind.config.js
└── README.md
```

## 🛠 Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Routing:** React Router v6
- **Charts:** Recharts
- **Icons:** Lucide React
- **Backend:** Express.js (mock server)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom design system

## 🎨 Design System

### Colors
- **Primary:** Deep navy (#0B1C2C) for headings
- **Accent:** Electric blue (#3ABEFF) for CTAs and highlights
- **Background:** Light gray (#F9FAFB)
- **Text:** Dark gray (#111827) for primary text
- **Muted:** Medium gray (#6B7280) for secondary text

### Components
- **Cards:** 16px border radius, subtle shadows
- **Buttons:** Primary (solid blue), Secondary (outline)
- **Typography:** Inter font family
- **Spacing:** 24px grid system

## 🔌 API Integration

### Mock API Endpoints

The mock server provides these endpoints:

```
GET  /api/dashboard          # Dashboard stats and activity
GET  /api/leads              # List leads with filtering
GET  /api/leads/:id          # Get single lead
POST /api/leads              # Create new lead
PATCH /api/leads/:id         # Update lead
GET  /api/customers          # List customers
GET  /api/customers/:id      # Get customer details
GET  /api/subscriptions      # List subscriptions
POST /api/checkout           # Create Stripe checkout session
POST /api/webhook/stripe     # Stripe webhook handler
GET  /api/provisioning       # Provisioning queue
POST /api/provisioning/:id/retry  # Retry provisioning
GET  /api/integrations       # List integrations
POST /api/integrations/:name/connect    # Connect integration
POST /api/integrations/:name/disconnect # Disconnect integration
```

### Real Backend Integration

To connect to a real backend:

1. **Update API base URL** in `src/lib/api.ts`
2. **Replace mock auth** in `src/lib/mockAuth.tsx`
3. **Add authentication headers** to API requests
4. **Update data models** to match your backend schemas

## 💳 Stripe Integration

### Current Implementation
- Mock checkout endpoint returns placeholder URLs
- Webhook endpoint logs events (no real processing)

### Production Setup
1. **Install Stripe SDK:**
   ```bash
   npm install stripe
   ```

2. **Update checkout endpoint** in `server/server.ts`:
   ```typescript
   // Replace mock implementation with:
   const session = await stripe.checkout.sessions.create({
     customer_email: customer.email,
     line_items: [{
       price: planId,
       quantity: 1,
     }],
     mode: 'subscription',
     success_url: `${process.env.FRONTEND_URL}/success`,
     cancel_url: `${process.env.FRONTEND_URL}/cancel`,
   });
   ```

3. **Configure webhook** for real event processing
4. **Add environment variables** for Stripe keys

## 🔐 Authentication

### Current Implementation
- Mock authentication with localStorage
- Three demo user roles
- Auto-login for demo purposes

### Production Setup
1. **Choose auth provider** (Auth0, Firebase, Supabase, etc.)
2. **Replace mock auth** in `src/lib/mockAuth.tsx`
3. **Add protected routes** and role-based access
4. **Implement JWT token management**

## 📊 Data Management

### Seed Data
The `src/data/seed.json` file contains realistic demo data:
- 12 leads with varied statuses and sources
- 6 customers with onboarding progress
- 9 provisioned agents
- 6 invoices and billing records
- 8 activity feed events
- Integration statuses

### Real Database Integration
1. **Choose database** (PostgreSQL, MongoDB, etc.)
2. **Create data models** matching the seed structure
3. **Replace mock API** with real database queries
4. **Add data validation** and error handling

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel:** Connect GitHub repo, auto-deploy
- **Netlify:** Drag & drop build folder
- **AWS S3:** Upload static files
- **Docker:** Use provided Dockerfile

### Environment Variables
```bash
VITE_API_URL=https://your-api.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Test Coverage
- Component unit tests
- API integration tests
- E2E user flows

## 📈 Performance

### Optimizations
- **Code splitting** with React.lazy
- **Image optimization** with next/image
- **Bundle analysis** with webpack-bundle-analyzer
- **Caching** with service workers

### Monitoring
- **Error tracking** with Sentry
- **Analytics** with Google Analytics
- **Performance** with Web Vitals

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues:
- Check the [documentation](./docs/)
- Open a GitHub issue
- Contact the development team

---

**Built with ❤️ by the Finstone AI team**





















