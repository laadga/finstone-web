import React, { useState } from 'react';
import { X, Phone, Mail, Calendar, User, Building, DollarSign, Clock, Plus } from 'lucide-react';
import { cn, formatCurrency, formatDateTime, getSourceIcon, getStatusColor } from '@/lib/utils';
import { StatusBadge } from './Badge';

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
  tasks: any[];
}

interface FlyoutLeadDetailProps {
  lead: Lead | null;
  onClose: () => void;
  onUpdate: (lead: Lead) => void;
}

export function FlyoutLeadDetail({ lead, onClose, onUpdate }: FlyoutLeadDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'notes' | 'tasks'>('overview');
  const [newNote, setNewNote] = useState('');

  if (!lead) return null;

  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedLead = {
        ...lead,
        notes: [
          ...lead.notes,
          {
            id: `n-${Date.now()}`,
            author: 'u_admin',
            text: newNote,
            createdAt: new Date().toISOString()
          }
        ]
      };
      onUpdate(updatedLead);
      setNewNote('');
    }
  };

  const statusColors = getStatusColor(lead.status);

  return (
    <div className="fixed right-0 top-0 w-96 h-full bg-white border-l border-gray-200 shadow-xl z-50 flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{lead.name}</h2>
            <p className="text-sm text-gray-600">{lead.company}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors focus-ring rounded-lg"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <StatusBadge status={lead.status} />
          {lead.estimatedValue && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {formatCurrency(lead.estimatedValue)}
            </span>
          )}
        </div>

        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-1.5 text-xs font-medium text-primary-700 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors">
            <Phone className="w-3 h-3 mr-1" />
            Call
          </button>
          <button className="flex items-center px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
            <Mail className="w-3 h-3 mr-1" />
            Email
          </button>
          <button className="flex items-center px-3 py-1.5 text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
            <Calendar className="w-3 h-3 mr-1" />
            Schedule
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'timeline', label: 'Timeline' },
          { id: 'notes', label: 'Notes' },
          { id: 'tasks', label: 'Tasks' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              'flex-1 px-4 py-3 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-900">{lead.email}</span>
                </div>
                {lead.phone && (
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-900">{lead.phone}</span>
                  </div>
                )}
                <div className="flex items-center text-sm">
                  <Building className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-900">{lead.company}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="w-4 h-4 text-gray-400 mr-3 flex items-center justify-center">
                    {getSourceIcon(lead.source)}
                  </span>
                  <span className="text-gray-900">{lead.source}</span>
                </div>
              </div>
            </div>

            {/* Lead Details */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Lead Details</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 text-gray-400 mr-3" />
                  <div>
                    <div className="text-gray-900">Created: {formatDateTime(lead.createdAt)}</div>
                    <div className="text-gray-500">Last Contact: {formatDateTime(lead.lastContact)}</div>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <User className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-900">Assigned to: Maya Sales</span>
                </div>
                <div className="flex items-center text-sm">
                  <DollarSign className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-900">Plan: {lead.interestedPlan}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Notes</h3>
              
              {/* Add Note */}
              <div className="mb-4">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <button
                  onClick={handleAddNote}
                  className="mt-2 btn-primary text-sm"
                  disabled={!newNote.trim()}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Note
                </button>
              </div>

              {/* Notes List */}
              <div className="space-y-3">
                {lead.notes.map((note) => (
                  <div key={note.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-900 mb-2">{note.text}</p>
                    <div className="text-xs text-gray-500">
                      {note.author} • {formatDateTime(note.createdAt)}
                    </div>
                  </div>
                ))}
                {lead.notes.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No notes yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Activity Timeline</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-900 mb-1">Lead created</div>
                <div className="text-xs text-gray-500">{formatDateTime(lead.createdAt)}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-900 mb-1">Last contact made</div>
                <div className="text-xs text-gray-500">{formatDateTime(lead.lastContact)}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Tasks</h3>
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No tasks yet</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}





















