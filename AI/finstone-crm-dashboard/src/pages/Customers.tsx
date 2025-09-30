import React, { useState, useEffect } from 'react';
import { Building2, Users, DollarSign, Calendar, CheckCircle, Clock } from 'lucide-react';
import { customersApi } from '@/lib/api';
import { formatCurrency, formatDateTime, calculateOnboardingProgress } from '@/lib/utils';
import { StatusBadge } from '@/components/Badge';

interface Customer {
  id: string;
  company: string;
  plan: string;
  contacts: Array<{
    name: string;
    email: string;
    role: string;
  }>;
  billingStatus: string;
  onboardingProgress: Array<{
    step: string;
    done: boolean;
    completedAt?: string;
    dueDate?: string;
  }>;
  agents: Array<{
    id: string;
    type: string;
    status: string;
    provisionedAt?: string;
  }>;
  mrr: number;
  nextBillingDate: string;
  createdAt: string;
}

export function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setIsLoading(true);
      const data = await customersApi.getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error loading customers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-6">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
        {customers.map((customer) => {
          const progress = calculateOnboardingProgress(customer.onboardingProgress);
          
          return (
            <div
              key={customer.id}
              className="card p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedCustomer(customer)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{customer.company}</h3>
                    <p className="text-sm text-gray-500">{customer.plan} Plan</p>
                  </div>
                </div>
                <StatusBadge status={customer.billingStatus} size="sm" />
              </div>

              {/* MRR */}
              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className="w-4 h-4 text-green-600" />
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
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Agents */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Agents ({customer.agents.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {customer.agents.map((agent) => (
                    <StatusBadge
                      key={agent.id}
                      status={agent.status}
                      size="sm"
                    />
                  ))}
                </div>
              </div>

              {/* Next Billing */}
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Next billing: {formatDateTime(customer.nextBillingDate)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
}

interface CustomerDetailModalProps {
  customer: Customer;
  onClose: () => void;
}

function CustomerDetailModal({ customer, onClose }: CustomerDetailModalProps) {
  const progress = calculateOnboardingProgress(customer.onboardingProgress);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{customer.company}</h2>
                <p className="text-gray-600">{customer.plan} Plan • {formatCurrency(customer.mrr)}/mo</p>
              </div>
            </div>
            <button
              onClick={onClose}
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
                <span className="text-sm text-gray-500">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-primary-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-3">
              {customer.onboardingProgress.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {step.done ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-gray-400" />
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
              {customer.agents.map((agent) => (
                <div key={agent.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{agent.type}</h4>
                    <StatusBadge status={agent.status} size="sm" />
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
              {customer.contacts.map((contact, index) => (
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
  );
}





















