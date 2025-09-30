import React, { useState, useEffect } from 'react';
import { CreditCard, ExternalLink, Calendar } from 'lucide-react';
import { subscriptionsApi } from '@/lib/api';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import { StatusBadge } from '@/components/Badge';

interface Subscription {
  id: string;
  company: string;
  plan: string;
  billingStatus: string;
  mrr: number;
  nextBillingDate: string;
  invoices: Array<{
    id: string;
    amount: number;
    dueDate: string;
    status: string;
  }>;
}

export function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      setIsLoading(true);
      const data = await subscriptionsApi.getSubscriptions();
      setSubscriptions(data);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = async (customerId: string, planId: string) => {
    try {
      const result = await subscriptionsApi.createCheckout(customerId, planId);
      // In a real app, redirect to Stripe checkout
      window.open(result.checkoutUrl, '_blank');
    } catch (error) {
      console.error('Error creating checkout:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="card p-6">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
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
        <h1 className="text-2xl font-bold text-gray-900">Subscriptions & Billing</h1>
        <p className="text-gray-600 mt-1">
          Manage customer subscriptions and billing information
        </p>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-4">
        {subscriptions.map((subscription) => (
          <div key={subscription.id} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{subscription.company}</h3>
                  <p className="text-sm text-gray-500">{subscription.plan} Plan</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <StatusBadge status={subscription.billingStatus} />
                <button
                  onClick={() => handleCheckout(subscription.id, subscription.plan)}
                  className="btn-primary"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Checkout
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
                  <Calendar className="w-4 h-4 text-gray-400" />
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
                        <StatusBadge status={invoice.status} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}





















