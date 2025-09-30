"use client";

import React, { useState } from 'react';
import { formatCurrency, formatDateTime } from '@/lib/utils';

const mockSubscriptions = [
  {
    id: "C-100",
    company: "GreenCart eCom",
    plan: "Pro",
    billingStatus: "Active",
    mrr: 149,
    nextBillingDate: "2025-02-01T00:00:00Z",
    invoices: [
      { id: "I-001", amount: 149, dueDate: "2025-02-01", status: "paid" }
    ]
  },
  {
    id: "C-101",
    company: "DataFlow Inc",
    plan: "Business",
    billingStatus: "Active",
    mrr: 299,
    nextBillingDate: "2025-02-01T00:00:00Z",
    invoices: [
      { id: "I-002", amount: 299, dueDate: "2025-02-01", status: "paid" }
    ]
  },
  {
    id: "C-102",
    company: "StartupXYZ",
    plan: "Starter",
    billingStatus: "Trialing",
    mrr: 49,
    nextBillingDate: "2025-02-01T00:00:00Z",
    invoices: [
      { id: "I-003", amount: 49, dueDate: "2025-02-01", status: "sent" }
    ]
  }
];

export function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);

  const handleCheckout = (customerId, planId) => {
    // Mock checkout - in real app, this would redirect to Stripe
    alert(`Opening checkout for ${customerId} - ${planId} plan`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscriptions & Billing</h1>
        <p className="text-gray-600 mt-1">
          Manage customer subscriptions and billing information
        </p>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-4">
        {subscriptions.map((subscription) => (
          <div key={subscription.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">💳</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{subscription.company}</h3>
                  <p className="text-sm text-gray-500">{subscription.plan} Plan</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  subscription.billingStatus === 'Active' ? 'bg-green-100 text-green-800' :
                  subscription.billingStatus === 'Trialing' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {subscription.billingStatus}
                </span>
                <button
                  onClick={() => handleCheckout(subscription.id, subscription.plan)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  🔗 Open Checkout
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* MRR */}
              <div>
                <div className="text-sm text-gray-500 mb-1">Monthly Revenue</div>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(subscription.mrr)}
                </div>
              </div>

              {/* Next Billing */}
              <div>
                <div className="text-sm text-gray-500 mb-1">Next Billing</div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">📅</span>
                  <span className="font-medium text-gray-900">
                    {formatDateTime(subscription.nextBillingDate)}
                  </span>
                </div>
              </div>

              {/* Recent Invoices */}
              <div>
                <div className="text-sm text-gray-500 mb-1">Recent Invoices</div>
                <div className="space-y-1">
                  {subscription.invoices.slice(0, 2).map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">#{invoice.id}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{formatCurrency(invoice.amount)}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                          invoice.status === 'sent' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Billing Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(subscriptions.reduce((sum, sub) => sum + sub.mrr, 0))}
            </div>
            <div className="text-sm text-gray-500">Total MRR</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {subscriptions.filter(sub => sub.billingStatus === 'Active').length}
            </div>
            <div className="text-sm text-gray-500">Active Subscriptions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {subscriptions.filter(sub => sub.billingStatus === 'Trialing').length}
            </div>
            <div className="text-sm text-gray-500">Trialing</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {subscriptions.length}
            </div>
            <div className="text-sm text-gray-500">Total Customers</div>
          </div>
        </div>
      </div>
    </div>
  );
}





















