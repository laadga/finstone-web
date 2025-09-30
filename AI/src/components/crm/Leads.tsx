"use client";

import React, { useState } from 'react';
import { formatCurrency, formatDateTime, getSourceIcon, getInitials } from '@/lib/utils';

const mockLeads = [
  {
    id: "L-001",
    name: "Sofia Ramos",
    company: "Ramos Legal",
    email: "sofia@ramoslegal.com",
    phone: "+1-415-555-0101",
    source: "LinkedIn Outreach",
    interestedPlan: "Growth",
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
    phone: "+1-212-555-0123",
    source: "Cold Email",
    interestedPlan: "Starter",
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
    phone: "+1-310-555-0145",
    source: "Website",
    interestedPlan: "Business",
    status: "New",
    estimatedValue: 12000,
    lastContact: "2025-01-20T14:00:00Z",
    createdAt: "2025-01-20T14:00:00Z"
  },
  {
    id: "L-004",
    name: "Marcus Johnson",
    company: "Johnson & Associates",
    email: "marcus@jassoc.com",
    phone: "+1-312-555-0167",
    source: "Referral",
    interestedPlan: "Enterprise",
    status: "Proposal Sent",
    estimatedValue: 25000,
    lastContact: "2025-01-19T16:30:00Z",
    createdAt: "2025-01-15T11:00:00Z"
  },
  {
    id: "L-005",
    name: "Sarah Williams",
    company: "Williams Consulting",
    email: "sarah@williamsconsulting.com",
    phone: "+1-617-555-0189",
    source: "Event",
    interestedPlan: "Growth",
    status: "Won",
    estimatedValue: 8000,
    lastContact: "2025-01-18T09:00:00Z",
    createdAt: "2025-01-05T10:00:00Z"
  }
];

export function Leads() {
  const [leads, setLeads] = useState(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || lead.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const LeadRow = ({ lead }) => (
    <tr 
      className="hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={() => setSelectedLead(lead)}
    >
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
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
      <td className="px-6 py-4 text-sm text-gray-900">{lead.interestedPlan}</td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          lead.status === 'Demo Scheduled' ? 'bg-purple-100 text-purple-800' :
          lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' :
          lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
          lead.status === 'Proposal Sent' ? 'bg-orange-100 text-orange-800' :
          lead.status === 'Won' ? 'bg-green-100 text-green-800' :
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
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Email
          </button>
          <button className="text-green-600 hover:text-green-800 text-sm font-medium">
            Schedule
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600 mt-1">
            Manage your sales pipeline and track lead progress
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-medium px-4 py-2 rounded-lg transition-colors">
            📥 Export
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
            👥 Add Lead
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="demo scheduled">Demo Scheduled</option>
            <option value="proposal sent">Proposal Sent</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>

          <div className="text-sm text-gray-500">
            {filteredLeads.length} leads
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <LeadRow key={lead.id} lead={lead} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedLead(null)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedLead.name}</h2>
                  <p className="text-gray-600">{selectedLead.company}</p>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div><strong>Email:</strong> {selectedLead.email}</div>
                  <div><strong>Phone:</strong> {selectedLead.phone}</div>
                  <div><strong>Source:</strong> {selectedLead.source}</div>
                  <div><strong>Plan:</strong> {selectedLead.interestedPlan}</div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Lead Details</h3>
                <div className="space-y-3">
                  <div><strong>Status:</strong> {selectedLead.status}</div>
                  <div><strong>Estimated Value:</strong> {formatCurrency(selectedLead.estimatedValue)}</div>
                  <div><strong>Created:</strong> {formatDateTime(selectedLead.createdAt)}</div>
                  <div><strong>Last Contact:</strong> {formatDateTime(selectedLead.lastContact)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





















