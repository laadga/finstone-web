import React, { useState, useEffect } from 'react';
import { Plus, Filter, Download } from 'lucide-react';
import { DataTable, ColumnDef } from '@/components/DataTable';
import { FlyoutLeadDetail } from '@/components/FlyoutLeadDetail';
import { leadsApi } from '@/lib/api';
import { formatCurrency, formatDateTime, getSourceIcon, getInitials } from '@/lib/utils';
import { StatusBadge } from '@/components/Badge';

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

export function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');
  const [assignedFilter, setAssignedFilter] = useState('');

  useEffect(() => {
    loadLeads();
  }, [currentPage, statusFilter, assignedFilter]);

  const loadLeads = async () => {
    try {
      setIsLoading(true);
      const response = await leadsApi.getLeads({
        page: currentPage,
        limit: 20,
        status: statusFilter || undefined,
        assigned: assignedFilter || undefined
      });
      setLeads(response.leads);
      setTotalLeads(response.total);
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleLeadUpdate = (updatedLead: Lead) => {
    setLeads(leads => 
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
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
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
      key: 'plan',
      header: 'Plan',
      accessorKey: 'interestedPlan'
    },
    {
      key: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.status} />
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
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
            Email
          </button>
          <button className="text-green-600 hover:text-green-800 text-sm font-medium">
            Schedule
          </button>
        </div>
      )
    }
  ];

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
          <button className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field w-40"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="demo scheduled">Demo Scheduled</option>
            <option value="proposal sent">Proposal Sent</option>
            <option value="qualified">Qualified</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>

          <select
            value={assignedFilter}
            onChange={(e) => setAssignedFilter(e.target.value)}
            className="input-field w-40"
          >
            <option value="">All Assignees</option>
            <option value="u_sales">Maya Sales</option>
            <option value="u_support">Jon Support</option>
          </select>

          <div className="text-sm text-gray-500">
            {totalLeads} total leads
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <DataTable
        data={leads}
        columns={leadColumns}
        onRowClick={handleLeadSelect}
        loading={isLoading}
        emptyMessage="No leads found"
      />

      {/* Pagination */}
      {totalLeads > 20 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {((currentPage - 1) * 20) + 1} to {Math.min(currentPage * 20, totalLeads)} of {totalLeads} leads
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {Math.ceil(totalLeads / 20)}
            </span>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage >= Math.ceil(totalLeads / 20)}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

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





















