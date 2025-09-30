"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/crm/DashboardLayout';
import KPICard from '@/components/crm/KPICard';
import LeadsTable from '@/components/crm/LeadsTable';
import LeadDetailFlyout from '@/components/crm/LeadDetailFlyout';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  source: string;
  interestedPlan: string;
  assignedTo: string;
  status: string;
  lastContact: string;
  createdAt: string;
  estimatedValue?: number;
  notes: any[];
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [dashboardStats, setDashboardStats] = useState<any>(null);

  useEffect(() => {
    // Load seed data
    const loadData = async () => {
      try {
        const response = await fetch('/api/seed');
        const data = await response.json();
        setLeads(data.leads || []);
        setDashboardStats(data.dashboardStats || {});
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to mock data
        setLeads([
          {
            id: "L-001",
            name: "Sofia Ramos",
            company: "Ramos Legal",
            email: "sofia@ramoslegal.com",
            phone: "+1-415-555-0101",
            source: "LinkedIn Outreach",
            interestedPlan: "Growth",
            assignedTo: "u_sales",
            status: "Demo Scheduled",
            lastContact: "2025-08-19T10:30:00Z",
            createdAt: "2025-08-10T09:00:00Z",
            estimatedValue: 5000,
            notes: [{ author: "u_sales", text: "Interested in CFO + Support agent. Booked demo 8/21." }]
          },
          {
            id: "L-002",
            name: "Omar Khan",
            company: "BrightBuild",
            email: "omar@brightbuild.co",
            phone: "+1-212-555-0123",
            source: "Cold Email",
            interestedPlan: "Starter",
            assignedTo: "u_sales",
            status: "Contacted",
            lastContact: "2025-08-18T15:00:00Z",
            createdAt: "2025-08-12T08:00:00Z",
            estimatedValue: 2000,
            notes: []
          },
          {
            id: "L-003",
            name: "Elena Chen",
            company: "TechFlow Solutions",
            email: "elena@techflow.com",
            phone: "+1-310-555-0145",
            source: "Website",
            interestedPlan: "Business",
            assignedTo: "u_sales",
            status: "New",
            lastContact: "2025-08-20T14:00:00Z",
            createdAt: "2025-08-20T14:00:00Z",
            estimatedValue: 12000,
            notes: []
          },
          {
            id: "L-004",
            name: "Marcus Johnson",
            company: "Johnson & Associates",
            email: "marcus@jassoc.com",
            phone: "+1-312-555-0167",
            source: "Referral",
            interestedPlan: "Enterprise",
            assignedTo: "u_sales",
            status: "Proposal Sent",
            lastContact: "2025-08-19T16:30:00Z",
            createdAt: "2025-08-15T11:00:00Z",
            estimatedValue: 25000,
            notes: [{ author: "u_sales", text: "High-value prospect. Sent custom proposal for enterprise package." }]
          },
          {
            id: "L-005",
            name: "Sarah Williams",
            company: "Williams Consulting",
            email: "sarah@williamsconsulting.com",
            phone: "+1-617-555-0189",
            source: "Event",
            interestedPlan: "Growth",
            assignedTo: "u_sales",
            status: "Won",
            lastContact: "2025-08-18T09:00:00Z",
            createdAt: "2025-08-05T10:00:00Z",
            estimatedValue: 8000,
            notes: [{ author: "u_sales", text: "Closed! Starting onboarding next week." }]
          }
        ]);
        setDashboardStats({
          mrr: 497,
          newLeads7d: 3,
          activeCustomers: 3,
          pendingOnboards: 2,
          churnRate: 2.1,
          mrrTrend: [320, 340, 380, 420, 450, 480, 470, 497]
        });
      }
    };

    loadData();
  }, []);

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleLeadUpdate = (updatedLead: Lead) => {
    setLeads(leads.map(lead => lead.id === updatedLead.id ? updatedLead : lead));
    setSelectedLead(updatedLead);
  };

  const handleCloseFlyout = () => {
    setSelectedLead(null);
  };

  return (
    <DashboardLayout currentPage="dashboard">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Welcome Message */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            margin: '0 0 8px 0'
          }}>
            Welcome back, Alex Founder
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#6B7280',
            margin: 0
          }}>
            Here's the current snapshot of your AI workforce.
          </p>
        </div>

        {/* KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          <KPICard
            title="MRR"
            primaryNumber={`$${dashboardStats?.mrr || 497}`}
            trendPercent={5.7}
            sparklineData={dashboardStats?.mrrTrend || [320, 340, 380, 420, 450, 480, 470, 497]}
            subtitle="Monthly Recurring Revenue"
            color="blue"
          />
          <KPICard
            title="New Leads"
            primaryNumber={dashboardStats?.newLeads7d || 3}
            trendPercent={12.5}
            subtitle="New leads (7d)"
            color="green"
          />
          <KPICard
            title="Active Customers"
            primaryNumber={dashboardStats?.activeCustomers || 3}
            trendPercent={8.2}
            subtitle="Active customers"
            color="purple"
          />
          <KPICard
            title="Pending Onboards"
            primaryNumber={dashboardStats?.pendingOnboards || 2}
            trendPercent={-15.3}
            subtitle="Onboarding in progress"
            color="orange"
          />
          <KPICard
            title="Churn Rate"
            primaryNumber={`${dashboardStats?.churnRate || 2.1}%`}
            trendPercent={-2.1}
            subtitle="Monthly churn"
            color="red"
          />
        </div>

        {/* Quick Actions */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '16px'
          }}>
            Quick Actions
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px'
          }}>
            <button style={{
              padding: '16px',
              border: '1px solid #D1D5DB',
              borderRadius: '8px',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#F9FAFB';
              e.currentTarget.style.borderColor = '#3ABEFF';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = '#D1D5DB';
            }}
            >
              👥 Create Lead
            </button>
            <button style={{
              padding: '16px',
              border: '1px solid #D1D5DB',
              borderRadius: '8px',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#F9FAFB';
              e.currentTarget.style.borderColor = '#3ABEFF';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = '#D1D5DB';
            }}
            >
              💳 Create Invoice
            </button>
            <button style={{
              padding: '16px',
              border: '1px solid #D1D5DB',
              borderRadius: '8px',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#F9FAFB';
              e.currentTarget.style.borderColor = '#3ABEFF';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = '#D1D5DB';
            }}
            >
              🤖 Run Provisioning Test
            </button>
            <button style={{
              padding: '16px',
              border: '1px solid #D1D5DB',
              borderRadius: '8px',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#F9FAFB';
              e.currentTarget.style.borderColor = '#3ABEFF';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = '#D1D5DB';
            }}
            >
              👤 Invite Teammate
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '24px'
        }}>
          {/* Leads Table */}
          <div>
            <LeadsTable
              leads={leads}
              onLeadSelect={handleLeadSelect}
              selectedLead={selectedLead}
            />
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Recent Activity */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '16px'
              }}>
                Recent Activity
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{
                  padding: '12px',
                  backgroundColor: '#F9FAFB',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB'
                }}>
                  <div style={{ fontSize: '14px', color: '#111827', marginBottom: '4px' }}>
                    Lead created: Sofia Ramos
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>
                    2 hours ago
                  </div>
                </div>
                <div style={{
                  padding: '12px',
                  backgroundColor: '#F9FAFB',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB'
                }}>
                  <div style={{ fontSize: '14px', color: '#111827', marginBottom: '4px' }}>
                    Subscription started: GreenCart eCom
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>
                    4 hours ago
                  </div>
                </div>
                <div style={{
                  padding: '12px',
                  backgroundColor: '#F9FAFB',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB'
                }}>
                  <div style={{ fontSize: '14px', color: '#111827', marginBottom: '4px' }}>
                    Onboarding step completed: DataFlow Inc
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>
                    6 hours ago
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Provisioning Monitor */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '16px'
              }}>
                Agent Provisioning
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  backgroundColor: '#FEF3C7',
                  borderRadius: '6px',
                  border: '1px solid #F59E0B'
                }}>
                  <span style={{ fontSize: '12px', color: '#92400E' }}>CFO Agent</span>
                  <span style={{ fontSize: '12px', color: '#92400E', fontWeight: '500' }}>Provisioning</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  backgroundColor: '#D1FAE5',
                  borderRadius: '6px',
                  border: '1px solid #10B981'
                }}>
                  <span style={{ fontSize: '12px', color: '#065F46' }}>Sales Closer</span>
                  <span style={{ fontSize: '12px', color: '#065F46', fontWeight: '500' }}>Provisioned</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Detail Flyout */}
      {selectedLead && (
        <LeadDetailFlyout
          lead={selectedLead}
          onClose={handleCloseFlyout}
          onUpdate={handleLeadUpdate}
        />
      )}
    </DashboardLayout>
  );
}
