# Component Documentation

This document provides detailed information about all UI components in the Finstone CRM Dashboard.

## Core Components

### Badge

A versatile badge component for displaying status, labels, and categories.

**Props:**
- `children: React.ReactNode` - Content to display
- `variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'gray'` - Color variant
- `size?: 'sm' | 'md' | 'lg'` - Size variant
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
<Badge variant="success" size="sm">Active</Badge>
<StatusBadge status="provisioned" />
```

### KpiCard

Displays key performance indicators with optional sparklines and trend indicators.

**Props:**
- `title: string` - Card title
- `value: number | string` - Main value to display
- `sparklineData?: number[]` - Data for sparkline chart
- `trend?: number` - Trend percentage (positive/negative)
- `subtitle?: string` - Subtitle text
- `color?: 'blue' | 'green' | 'purple' | 'orange' | 'red'` - Color theme
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
<KpiCard
  title="MRR"
  value={1244}
  sparklineData={[800, 920, 1050, 1100, 1150, 1200, 1244]}
  trend={5.7}
  subtitle="Monthly Recurring Revenue"
  color="blue"
/>
```

### DataTable

A flexible data table with sorting, filtering, and row selection.

**Props:**
- `data: T[]` - Array of data objects
- `columns: ColumnDef<T>[]` - Column definitions
- `onRowClick?: (row: T) => void` - Row click handler
- `searchable?: boolean` - Enable search functionality
- `filterable?: boolean` - Enable filtering
- `loading?: boolean` - Show loading state
- `className?: string` - Additional CSS classes
- `emptyMessage?: string` - Message when no data

**Column Definition:**
```tsx
interface ColumnDef<T> {
  key: string;
  header: string;
  accessorKey?: keyof T;
  cell?: (props: { row: T; value: any }) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  className?: string;
}
```

**Usage:**
```tsx
<DataTable
  data={leads}
  columns={leadColumns}
  onRowClick={handleLeadSelect}
  searchable
  filterable
/>
```

### Modal

A modal dialog component with backdrop and keyboard navigation.

**Props:**
- `isOpen: boolean` - Modal visibility
- `onClose: () => void` - Close handler
- `title?: string` - Modal title
- `children: React.ReactNode` - Modal content
- `size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'` - Modal size
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Confirm Action"
  size="md"
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

### FlyoutLeadDetail

A right-hand flyout panel for displaying lead details with tabs.

**Props:**
- `lead: Lead | null` - Lead data to display
- `onClose: () => void` - Close handler
- `onUpdate: (lead: Lead) => void` - Update handler

**Features:**
- Overview tab with contact information
- Timeline tab with activity history
- Notes tab with add/edit functionality
- Tasks tab (placeholder)
- Action buttons (Call, Email, Schedule)

**Usage:**
```tsx
<FlyoutLeadDetail
  lead={selectedLead}
  onClose={handleCloseFlyout}
  onUpdate={handleLeadUpdate}
/>
```

## Layout Components

### Layout

Main application layout with sidebar and top navigation.

**Props:**
- `children: React.ReactNode` - Page content

**Features:**
- Responsive sidebar
- Top navigation bar
- User menu
- Authentication integration

### Sidebar

Collapsible navigation sidebar.

**Props:**
- `collapsed: boolean` - Collapsed state
- `currentPage: string` - Active page identifier
- `onNavigate: (page: string) => void` - Navigation handler
- `onToggle: () => void` - Toggle handler

**Features:**
- Collapsible design
- Active state indication
- Icon-based navigation
- Responsive behavior

### TopNav

Top navigation bar with search and user menu.

**Props:**
- `user: User | null` - Current user
- `onLogout: () => void` - Logout handler
- `onToggleSidebar: () => void` - Sidebar toggle
- `sidebarCollapsed: boolean` - Sidebar state
- `currentPage?: string` - Current page title

**Features:**
- Global search
- Notifications bell
- User avatar and menu
- Responsive design

## Page Components

### Dashboard

Main dashboard page with KPIs, activity feed, and recent leads.

**Features:**
- KPI cards with sparklines
- Recent activity timeline
- Leads table with selection
- Quick action buttons
- Lead detail flyout integration

### Leads

Comprehensive leads management page.

**Features:**
- Full leads table with pagination
- Advanced filtering and search
- Bulk actions
- Lead detail flyout
- Export functionality

### Customers

Customer management with onboarding progress.

**Features:**
- Customer grid view
- Onboarding progress tracking
- Agent status monitoring
- Customer detail modal
- Billing information

### Subscriptions

Subscription and billing management.

**Features:**
- Subscription list view
- Stripe checkout integration
- Invoice management
- Billing status tracking

### Provisioning

AI agent provisioning queue management.

**Features:**
- Provisioning queue table
- Status monitoring
- Logs viewer modal
- Retry functionality
- Real-time updates

### Integrations

Third-party integrations management.

**Features:**
- Integration grid
- Connect/disconnect actions
- Status indicators
- OAuth flow simulation

## Utility Components

### Loading Skeletons

Skeleton loaders for better UX during data loading.

**Components:**
- `KpiCardSkeleton` - KPI card loading state
- `DataTableSkeleton` - Table loading state

### Status Indicators

Visual status indicators for various states.

**Types:**
- Provisioning status (provisioned, provisioning, failed, queued)
- Lead status (new, contacted, demo scheduled, etc.)
- Billing status (active, trialing, etc.)
- Integration status (connected, available)

## Styling and Theming

### Design System

The components follow a consistent design system:

- **Colors:** Primary blue (#3ABEFF), deep navy (#0B1C2C)
- **Typography:** Inter font family
- **Spacing:** 24px grid system
- **Border Radius:** 16px for cards, 8px for buttons
- **Shadows:** Subtle elevation with hover effects

### Responsive Design

All components are responsive and work across:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

### Accessibility

Components include:
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast compliance

## Customization

### Theme Customization

Update `tailwind.config.js` to customize:
- Colors
- Typography
- Spacing
- Border radius
- Animations

### Component Customization

Components accept `className` props for additional styling:
```tsx
<Badge className="custom-badge-styles" />
```

### Adding New Components

1. Create component file in `src/components/`
2. Follow existing patterns and prop interfaces
3. Add TypeScript types
4. Include accessibility features
5. Update this documentation





















