"use client";

import React, { useState } from 'react';
import { formatCurrency, formatDateTime, calculateOnboardingProgress } from '@/lib/utils';

const mockCustomers = [
  {
    id: "C-100",
    company: "GreenCart eCom",
    plan: "Pro",
    contacts: [
      { name: "Lina Park", email: "lina@greencart.com", role: "CFO" }
    ],
    billingStatus: "Active",
    onboardingProgress: [
      { step: "Kickoff Call", done: true, completedAt: "2025-01-15T10:00:00Z" },
      { step: "Integrations", done: false, dueDate: "2025-01-25T00:00:00Z" },
      { step: "Provision Agents", done: false, dueDate: "2025-01-30T00:00:00Z" },
      { step: "Training", done: false, dueDate: "2025-02-05T00:00:00Z" }
    ],
    agents: [
      { id: "A-1", type: "Sales Closer", status: "provisioned", provisionedAt: "2025-01-16T14:00:00Z" },
      { id: "A-2", type: "CFO Agent", status: "provisioning", startedAt: "2025-01-20T09:00:00Z" }
    ],
    mrr: 149,
    nextBillingDate: "2025-02-01T00:00:00Z",
    createdAt: "2025-01-10T08:00:00Z"
  },
  {
    id: "C-101",
    company: "DataFlow Inc",
    plan: "Business",
    contacts: [
      { name: "David Kim", email: "david@dataflow.com", role: "CTO" }
    ],
    billingStatus: "Active",
    onboardingProgress: [
      { step: "Kickoff Call", done: true, completedAt: "2025-01-12T11:00:00Z" },
      { step: "Integrations", done: true, completedAt: "2025-01-18T15:00:00Z" },
      { step: "Provision Agents", done: true, completedAt: "2025-01-20T10:00:00Z" },
      { step: "Training", done: false, dueDate: "2025-01-28T00:00:00Z" }
    ],
    agents: [
      { id: "A-3", type: "Sales Closer", status: "provisioned", provisionedAt: "2025-01-20T10:00:00Z" },
      { id: "A-4", type: "Support Agent", status: "provisioned", provisionedAt: "2025-01-20T11:00:00Z" }
    ],
    mrr: 299,
    nextBillingDate: "2025-02-01T00:00:00Z",
    createdAt: "2025-01-08T09:00:00Z"
  },
  {
    id: "C-102",
    company: "StartupXYZ",
    plan: "Starter",
    contacts: [
      { name: "Alex Rivera", email: "alex@startupxyz.com", role: "Founder" }
    ],
    billingStatus: "Trialing",
    onboardingProgress: [
      { step: "Kickoff Call", done: true, completedAt: "2025-01-19T14:00:00Z" },
      { step: "Integrations", done: false, dueDate: "2025-01-26T00:00:00Z" },
      { step: "Provision Agents", done: false, dueDate: "2025-02-02T00:00:00Z" },
      { step: "Training", done: false, dueDate: "2025-02-09T00:00:00Z" }
    ],
    agents: [],
    mrr: 49,
    nextBillingDate: "2025-02-01T00:00:00Z",
    createdAt: "2025-01-18T13:00:00Z"
  }
];

export function Customers() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const CustomerCard = ({ customer }) => {
    const progress = calculateOnboardingProgress(customer.onboardingProgress);
    
    return (
      <div
        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setSelectedCustomer(customer)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🏢</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{customer.company}</h3>
              <p className="text-sm text-gray-500">{customer.plan} Plan</p>
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            customer.billingStatus === 'Active' ? 'bg-green-100 text-green-800' :
            customer.billingStatus === 'Trialing' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {customer.billingStatus}
          </span>
        </div>

        {/* MRR */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-green-600">💰</span>
          <span className="font-semibold text-green-600">
            {formatCurrency(customer.mrr)}/mo
          </span>
        </div>

        {/* Onboarding Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Onboarding</span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Agents */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-gray-500">🤖</span>
            <span className="text-sm font-medium text-gray-700">
              Agents ({customer.agents.length})
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {customer.agents.map((agent) => (
              <span
                key={agent.id}
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  agent.status === 'provisioned' ? 'bg-green-100 text-green-800' :
                  agent.status === 'provisioning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}
              >
                {agent.status}
              </span>
            ))}
          </div>
        </div>

        {/* Next Billing */}
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>📅</span>
          <span>Next billing: {formatDateTime(customer.nextBillingDate)}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-1">
          Manage your customer accounts and onboarding progress
        </p>
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedCustomer(null)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">🏢</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCustomer.company}</h2>
                    <p className="text-gray-600">{selectedCustomer.plan} Plan • {formatCurrency(selectedCustomer.mrr)}/mo</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Onboarding Progress */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Onboarding Progress</h3>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                    <span className="text-sm text-gray-500">{calculateOnboardingProgress(selectedCustomer.onboardingProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${calculateOnboardingProgress(selectedCustomer.onboardingProgress)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-3">
                  {selectedCustomer.onboardingProgress.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {step.done ? (
                        <span className="text-green-500">✅</span>
                      ) : (
                        <span className="text-gray-400">⏳</span>
                      )}
                      <span className={`text-sm ${step.done ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.step}
                      </span>
                      {step.done && step.completedAt && (
                        <span className="text-xs text-gray-500">
                          {formatDateTime(step.completedAt)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Agents */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Provisioned Agents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCustomer.agents.map((agent) => (
                    <div key={agent.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{agent.type}</h4>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          agent.status === 'provisioned' ? 'bg-green-100 text-green-800' :
                          agent.status === 'provisioning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {agent.status}
                        </span>
                      </div>
                      {agent.provisionedAt && (
                        <p className="text-sm text-gray-500">
                          Provisioned: {formatDateTime(agent.provisionedAt)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contacts */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacts</h3>
                <div className="space-y-3">
                  {selectedCustomer.contacts.map((contact, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-500">{contact.email} • {contact.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





















