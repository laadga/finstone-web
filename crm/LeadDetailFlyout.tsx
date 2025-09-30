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

interface LeadDetailFlyoutProps {
  lead: Lead | null;
  onClose: () => void;
  onUpdate: (lead: Lead) => void;
}

export default function LeadDetailFlyout({ lead, onClose, onUpdate }: LeadDetailFlyoutProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'notes' | 'tasks'>('overview');
  const [newNote, setNewNote] = useState('');

  if (!lead) return null;

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedLead = {
        ...lead,
        notes: [...lead.notes, {
          author: 'u_admin',
          text: newNote,
          createdAt: new Date().toISOString()
        }]
      };
      onUpdate(updatedLead);
      setNewNote('');
    }
  };

  const statusColors = getStatusColor(lead.status);

  return (
    <div style={{
      position: 'fixed',
      right: 0,
      top: 0,
      width: '420px',
      height: '100vh',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '24px',
        borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
        backgroundColor: 'rgba(249, 250, 251, 0.5)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#111827',
              margin: '0 0 4px 0'
            }}>
              {lead.name}
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#6B7280',
              margin: 0
            }}>
              {lead.company}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              color: '#6B7280'
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
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
          {lead.estimatedValue && (
            <span style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#10B981',
              backgroundColor: '#ECFDF5',
              border: '1px solid #10B981',
              padding: '4px 8px',
              borderRadius: '6px'
            }}>
              {formatCurrency(lead.estimatedValue)}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{
            padding: '8px 12px',
            fontSize: '12px',
            backgroundColor: '#3ABEFF',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            📞 Call
          </button>
          <button style={{
            padding: '8px 12px',
            fontSize: '12px',
            backgroundColor: '#10B981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            📧 Email
          </button>
          <button style={{
            padding: '8px 12px',
            fontSize: '12px',
            backgroundColor: '#8B5CF6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            📅 Schedule
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #E5E7EB',
        backgroundColor: 'white'
      }}>
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'timeline', label: 'Timeline' },
          { id: 'notes', label: 'Notes' },
          { id: 'tasks', label: 'Tasks' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '500',
              color: activeTab === tab.id ? '#3ABEFF' : '#6B7280',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #3ABEFF' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Contact Info */}
            <div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Contact Information
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>Email:</span>
                  <div style={{ fontSize: '14px', color: '#111827' }}>{lead.email}</div>
                </div>
                {lead.phone && (
                  <div>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>Phone:</span>
                    <div style={{ fontSize: '14px', color: '#111827' }}>{lead.phone}</div>
                  </div>
                )}
                <div>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>Source:</span>
                  <div style={{ fontSize: '14px', color: '#111827' }}>{lead.source}</div>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>Interested Plan:</span>
                  <div style={{ fontSize: '14px', color: '#111827' }}>{lead.interestedPlan}</div>
                </div>
              </div>
            </div>

            {/* Lead Details */}
            <div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Lead Details
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>Created:</span>
                  <div style={{ fontSize: '14px', color: '#111827' }}>{formatDate(lead.createdAt)}</div>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>Last Contact:</span>
                  <div style={{ fontSize: '14px', color: '#111827' }}>{formatDate(lead.lastContact)}</div>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>Assigned To:</span>
                  <div style={{ fontSize: '14px', color: '#111827' }}>Maya Sales</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '16px'
            }}>
              Notes
            </h3>
            
            {/* Add Note */}
            <div style={{ marginBottom: '20px' }}>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                style={{
                  width: '100%',
                  minHeight: '80px',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
              />
              <button
                onClick={handleAddNote}
                style={{
                  marginTop: '8px',
                  padding: '8px 16px',
                  backgroundColor: '#3ABEFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Add Note
              </button>
            </div>

            {/* Notes List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {lead.notes.map((note, index) => (
                <div key={index} style={{
                  padding: '12px',
                  backgroundColor: '#F9FAFB',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB'
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#111827',
                    marginBottom: '4px'
                  }}>
                    {note.text}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6B7280'
                  }}>
                    {note.author} • {formatDate(note.createdAt || new Date().toISOString())}
                  </div>
                </div>
              ))}
              {lead.notes.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  color: '#6B7280',
                  fontSize: '14px',
                  padding: '20px'
                }}>
                  No notes yet
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '16px'
            }}>
              Activity Timeline
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                padding: '12px',
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
                border: '1px solid #E5E7EB'
              }}>
                <div style={{ fontSize: '14px', color: '#111827', marginBottom: '4px' }}>
                  Lead created
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>
                  {formatDate(lead.createdAt)}
                </div>
              </div>
              <div style={{
                padding: '12px',
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
                border: '1px solid #E5E7EB'
              }}>
                <div style={{ fontSize: '14px', color: '#111827', marginBottom: '4px' }}>
                  Last contact made
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>
                  {formatDate(lead.lastContact)}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '16px'
            }}>
              Tasks
            </h3>
            <div style={{
              textAlign: 'center',
              color: '#6B7280',
              fontSize: '14px',
              padding: '20px'
            }}>
              No tasks yet
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
