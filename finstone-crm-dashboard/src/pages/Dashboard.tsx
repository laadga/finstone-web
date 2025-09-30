import React, { useState, useEffect } from 'react';
import { KpiCard, KpiCardSkeleton } from '@/components/KpiCard';
import { DataTable, ColumnDef } from '@/components/DataTable';
import { FlyoutLeadDetail } from '@/components/FlyoutLeadDetail';
import { dashboardApi, leadsApi } from '@/lib/api';
import { formatCurrency, formatDateTime, getSourceIcon, getInitials } from '@/lib/utils';
import { StatusBadge } from '@/components/Badge';

interface DashboardStats {
  mrr: number;
  newLeads7d: number;
  activeCustomers: number;
  pendingOnboards: number;
  churnRate: number;
  mrrTrend: number[];
}

interface ActivityItem {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  status: string;
  estimatedValue?: number;
  lastContact: string;
  createdAt: string;
  notes: any[];
  tasks: any[];
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([]);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const data = await dashboardApi.getStats();
      setStats(data.stats);
      setActivityFeed(data.activityFeed);
      setRecentLeads(data.recentLeads);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleLeadUpdate = (updatedLead: Lead) => {
    setRecentLeads(leads => 
      leads.map(lead => lead.id === updatedLead.id ? updatedLead : lead)
    );
    setSelectedLead(updatedLead);
  };

  const handleCloseFlyout = () => {
    setSelectedLead(null);
  };

  const leadColumns: ColumnDef<Lead>[] = [
    {
      key: 'lead',
      header: 'Lead',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {getInitials(row.name)}
          </div>
          <div>
            <div className="font-medium text-gray-900">{row.name}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'company',
      header: 'Company',
      accessorKey: 'company'
    },
    {
      key: 'source',
      header: 'Source',
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <span>{getSourceIcon(row.source)}</span>
          <span className="text-sm">{row.source}</span>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.status} size="sm" />
    },
    {
      key: 'value',
      header: 'Value',
      cell: ({ row }) => (
        row.estimatedValue ? (
          <span className="font-medium text-green-600">
            {formatCurrency(row.estimatedValue)}
          </span>
        ) : (
          <span className="text-gray-400">-</span>
        )
      )
    },
    {
      key: 'lastContact',
      header: 'Last Contact',
      cell: ({ row }) => (
        <span className="text-sm text-gray-500">
          {formatDateTime(row.lastContact)}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your AI workforce today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <>
            <KpiCardSkeleton />
            <KpiCardSkeleton />
            <KpiCardSkeleton />
            <KpiCardSkeleton />
          </>
        ) : stats ? (
          <>
            <KpiCard
              title="MRR"
              value={stats.mrr}
              sparklineData={stats.mrrTrend}
              trend={5.7}
              subtitle="Monthly Recurring Revenue"
              color="blue"
            />
            <KpiCard
              title="New Leads"
              value={stats.newLeads7d}
              trend={12.5}
              subtitle="New leads (7d)"
              color="green"
            />
            <KpiCard
              title="Active Customers"
              value={stats.activeCustomers}
              trend={8.2}
              subtitle="Active customers"
              color="purple"
            />
            <KpiCard
              title="Pending Onboards"
              value={stats.pendingOnboards}
              trend={-15.3}
              subtitle="Onboarding in progress"
              color="orange"
            />
          </>
        ) : null}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2">
          <DataTable
            data={recentLeads}
            columns={leadColumns}
            onRowClick={handleLeadSelect}
            loading={isLoading}
            emptyMessage="No recent leads"
          />
        </div>

        {/* Activity Feed */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {activityFeed.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDateTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-primary text-left">
                👥 Create New Lead
              </button>
              <button className="w-full btn-secondary text-left">
                💳 Create Invoice
              </button>
              <button className="w-full btn-secondary text-left">
                🤖 Run Provisioning Test
              </button>
              <button className="w-full btn-secondary text-left">
                👤 Invite Team Member
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Detail Flyout */}
      {selectedLead && (
        <FlyoutLeadDetail
          lead={selectedLead}
          onClose={handleCloseFlyout}
          onUpdate={handleLeadUpdate}
        />
      )}
    </div>
  );
}





















