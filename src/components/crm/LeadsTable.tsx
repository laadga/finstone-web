"use client";

import React, { useState } from 'react';

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

interface LeadsTableProps {
  leads: Lead[];
  onLeadSelect: (lead: Lead) => void;
  selectedLead?: Lead | null;
}

export default function LeadsTable({ leads, onLeadSelect, selectedLead }: LeadsTableProps) {
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new': return { bg: '#EBF8FF', text: '#1E40AF', border: '#3ABEFF' };
      case 'contacted': return { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B' };
      case 'demo scheduled': return { bg: '#EDE9FE', text: '#5B21B6', border: '#8B5CF6' };
      case 'proposal sent': return { bg: '#FEE2E2', text: '#991B1B', border: '#EF4444' };
      case 'won': return { bg: '#D1FAE5', text: '#065F46', border: '#10B981' };
      case 'lost': return { bg: '#F3F4F6', text: '#374151', border: '#6B7280' };
      default: return { bg: '#F3F4F6', text: '#374151', border: '#6B7280' };
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'linkedin outreach': return '💼';
      case 'cold email': return '📧';
      case 'website': return '🌐';
      case 'referral': return '👥';
      case 'event': return '🎪';
      default: return '📞';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedLeads = [...leads].sort((a, b) => {
    const aValue = a[sortField as keyof Lead];
    const bValue = b[sortField as keyof Lead];
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden'
    }}>
      {/* Table Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
        backgroundColor: 'rgba(249, 250, 251, 0.5)'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#111827',
          margin: 0
        }}>
          Recent Leads ({leads.length})
        </h3>
      </div>

      {/* Table */}
      <div style={{ overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F9FAFB' }}>
              <th style={{
                padding: '12px 20px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '1px solid #E5E7EB'
              }}>
                Lead
              </th>
              <th style={{
                padding: '12px 20px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '1px solid #E5E7EB'
              }}>
                Company
              </th>
              <th style={{
                padding: '12px 20px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '1px solid #E5E7EB'
              }}>
                Source
              </th>
              <th style={{
                padding: '12px 20px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '1px solid #E5E7EB'
              }}>
                Plan
              </th>
              <th style={{
                padding: '12px 20px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '1px solid #E5E7EB'
              }}>
                Status
              </th>
              <th style={{
                padding: '12px 20px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '1px solid #E5E7EB'
              }}>
                Value
              </th>
              <th style={{
                padding: '12px 20px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '1px solid #E5E7EB'
              }}>
                Last Contact
              </th>
              <th style={{
                padding: '12px 20px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '1px solid #E5E7EB'
              }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedLeads.map((lead) => {
              const statusColors = getStatusColor(lead.status);
              const isSelected = selectedLead?.id === lead.id;
              
              return (
                <tr
                  key={lead.id}
                  style={{
                    backgroundColor: isSelected ? '#EBF8FF' : 'white',
                    borderBottom: '1px solid #E5E7EB',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = '#F9FAFB';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'white';
                    }
                  }}
                  onClick={() => onLeadSelect(lead)}
                >
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#3ABEFF',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '14px'
                      }}>
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '500',
                          color: '#111827',
                          marginBottom: '2px'
                        }}>
                          {lead.name}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: '#6B7280'
                        }}>
                          {lead.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#111827'
                    }}>
                      {lead.company}
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '14px' }}>{getSourceIcon(lead.source)}</span>
                      <span style={{
                        fontSize: '12px',
                        color: '#6B7280'
                      }}>
                        {lead.source}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#6B7280',
                      backgroundColor: '#F3F4F6',
                      padding: '4px 8px',
                      borderRadius: '6px'
                    }}>
                      {lead.interestedPlan}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      color: statusColors.text,
                      backgroundColor: statusColors.bg,
                      border: `1px solid ${statusColors.border}`,
                      padding: '4px 8px',
                      borderRadius: '6px'
                    }}>
                      {lead.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    {lead.estimatedValue ? (
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#10B981'
                      }}>
                        {formatCurrency(lead.estimatedValue)}
                      </div>
                    ) : (
                      <span style={{ color: '#9CA3AF' }}>-</span>
                    )}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{
                      fontSize: '12px',
                      color: '#6B7280'
                    }}>
                      {formatDate(lead.lastContact)}
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        style={{
                          padding: '4px 8px',
                          fontSize: '12px',
                          backgroundColor: '#3ABEFF',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle email action
                        }}
                      >
                        📧
                      </button>
                      <button
                        style={{
                          padding: '4px 8px',
                          fontSize: '12px',
                          backgroundColor: '#10B981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle schedule action
                        }}
                      >
                        📅
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
