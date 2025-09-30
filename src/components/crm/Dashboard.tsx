"use client";

import React, { useState, useEffect } from 'react';
import { formatCurrency, formatDateTime, getSourceIcon, getInitials } from '@/lib/utils';

// Mock data for demo
const mockStats = {
  mrr: 1244,
  newLeads7d: 5,
  activeCustomers: 6,
  pendingOnboards: 3,
  churnRate: 2.1,
  mrrTrend: [800, 920, 1050, 1100, 1150, 1200, 1244]
};

const mockLeads = [
  {
    id: "L-001",
    name: "Sofia Ramos",
    company: "Ramos Legal",
    email: "sofia@ramoslegal.com",
    source: "LinkedIn Outreach",
    status: "Demo Scheduled",
    estimatedValue: 5000,
    lastContact: "2025-01-19T10:30:00Z",
    createdAt: "2025-01-10T09:00:00Z"
  },
  {
    id: "L-002",
    name: "Omar Khan",
    company: "BrightBuild",
    email: "omar@brightbuild.co",
    source: "Cold Email",
    status: "Contacted",
    estimatedValue: 2000,
    lastContact: "2025-01-18T15:00:00Z",
    createdAt: "2025-01-12T08:00:00Z"
  },
  {
    id: "L-003",
    name: "Elena Chen",
    company: "TechFlow Solutions",
    email: "elena@techflow.com",
    source: "Website",
    status: "New",
    estimatedValue: 12000,
    lastContact: "2025-01-20T14:00:00Z",
    createdAt: "2025-01-20T14:00:00Z"
  }
];

const mockActivity = [
  {
    id: "act-001",
    title: "New lead created",
    description: "Sofia Ramos from Ramos Legal",
    timestamp: "2025-01-20T14:00:00Z"
  },
  {
    id: "act-002",
    title: "Subscription started",
    description: "GreenCart eCom upgraded to Pro plan",
    timestamp: "2025-01-19T16:00:00Z"
  },
  {
    id: "act-003",
    title: "Onboarding step completed",
    description: "DataFlow Inc completed integrations setup",
    timestamp: "2025-01-18T15:00:00Z"
  }
];

export function Dashboard() {
  const [stats, setStats] = useState(mockStats);
  const [leads, setLeads] = useState(mockLeads);
  const [activity, setActivity] = useState(mockActivity);
  const [selectedLead, setSelectedLead] = useState(null);

  const KpiCard = ({ title, value, trend, subtitle, color = 'blue' }) => {
    const colorClasses = {
      blue: 'bg-blue-50 border-blue-200 text-blue-600',
      green: 'bg-green-50 border-green-200 text-green-600',
      purple: 'bg-purple-50 border-purple-200 text-purple-600',
      orange: 'bg-orange-50 border-orange-200 text-orange-600'
    };

    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          {trend && (
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              trend >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <span>{trend >= 0 ? '↗' : '↘'}</span>
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        <div className="mb-4">
          <div className="text-3xl font-bold text-gray-900">
            {typeof value === 'number' ? formatCurrency(value) : value}
          </div>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    );
  };

  const LeadRow = ({ lead }) => (
    <tr 
      className="hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={() => setSelectedLead(lead)}
    >
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {getInitials(lead.name)}
          </div>
          <div>
            <div className="font-medium text-gray-900">{lead.name}</div>
            <div className="text-sm text-gray-500">{lead.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">{lead.company}</td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <span>{getSourceIcon(lead.source)}</span>
          <span className="text-sm">{lead.source}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          lead.status === 'Demo Scheduled' ? 'bg-purple-100 text-purple-800' :
          lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' :
          lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {lead.status}
        </span>
      </td>
      <td className="px-6 py-4">
        {lead.estimatedValue ? (
          <span className="font-medium text-green-600">
            {formatCurrency(lead.estimatedValue)}
          </span>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {formatDateTime(lead.lastContact)}
      </td>
    </tr>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your AI workforce today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="MRR"
          value={stats.mrr}
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
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <LeadRow key={lead.id} lead={lead} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {activity.map((item) => (
                <div key={item.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDateTime(item.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors text-left">
                👥 Create New Lead
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-medium px-4 py-2 rounded-lg transition-colors text-left">
                💳 Create Invoice
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-medium px-4 py-2 rounded-lg transition-colors text-left">
                🤖 Run Provisioning Test
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-medium px-4 py-2 rounded-lg transition-colors text-left">
                👤 Invite Team Member
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}