"use client";

import { useState } from 'react';
import { 
  ArrowLeft, 
  CreditCard, 
  Download, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2
} from "lucide-react";
import Link from "next/link";

export default function Billing() {
  const [activeTab, setActiveTab] = useState('overview');

  const currentPlan = {
    name: "Growth Plan",
    price: 697,
    status: "active",
    nextBilling: "2024-02-15",
    features: [
      "Up to 3 AI Agents",
      "Unlimited team seats",
      "5,000 monthly tasks",
      "Priority support"
    ]
  };

  const billingHistory = [
    {
      id: "inv_001",
      date: "2024-01-15",
      amount: 697,
      status: "paid",
      description: "Growth Plan - Monthly"
    },
    {
      id: "inv_002",
      date: "2023-12-15",
      amount: 697,
      status: "paid",
      description: "Growth Plan - Monthly"
    },
    {
      id: "inv_003",
      date: "2023-11-15",
      amount: 297,
      status: "paid",
      description: "Starter Plan - Monthly"
    }
  ];

  const paymentMethods = [
    {
      id: "pm_001",
      type: "card",
      last4: "4242",
      brand: "Visa",
      expiry: "12/26",
      isDefault: true
    },
    {
      id: "pm_002",
      type: "card",
      last4: "5555",
      brand: "Mastercard",
      expiry: "08/25",
      isDefault: false
    }
  ];

  const usageStats = [
    {
      title: "AI Agents Used",
      current: 3,
      limit: 3,
      unit: "agents"
    },
    {
      title: "Tasks This Month",
      current: 3247,
      limit: 5000,
      unit: "tasks"
    },
    {
      title: "Team Members",
      current: 8,
      limit: "unlimited",
      unit: "members"
    },
    {
      title: "Storage Used",
      current: 2.4,
      limit: 10,
      unit: "GB"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400">
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/images/smoky-texture.png')] bg-repeat opacity-5 animate-smoky-drift"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-navy-900 mb-2">Account & Billing</h1>
          <p className="text-xl text-gray-600">Manage your subscription, billing, and account settings</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'billing', label: 'Billing History' },
                { id: 'payment', label: 'Payment Methods' },
                { id: 'usage', label: 'Usage' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Current Plan */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-navy-900">Current Plan</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">Active</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">{currentPlan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-navy-900">${currentPlan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600 mb-4">Next billing date: {currentPlan.nextBilling}</p>
                  
                  <ul className="space-y-2">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                    Change Plan
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Download Invoice
                  </button>
                  <button className="w-full text-red-600 py-2 px-4 rounded-lg font-medium hover:bg-red-50 transition-colors">
                    Cancel Subscription
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">This Month</p>
                    <p className="text-2xl font-bold text-navy-900">$697</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Next Billing</p>
                    <p className="text-2xl font-bold text-navy-900">Feb 15</p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Saved</p>
                    <p className="text-2xl font-bold text-navy-900">$12,450</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">ROI</p>
                    <p className="text-2xl font-bold text-navy-900">1,687%</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-navy-900">Billing History</h2>
              <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Invoice</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm font-medium text-navy-900">{invoice.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{invoice.date}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{invoice.description}</td>
                      <td className="py-3 px-4 text-sm font-medium text-navy-900">${invoice.amount}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-navy-900">Payment Methods</h2>
                <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </button>
              </div>
              
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <CreditCard className="h-8 w-8 text-gray-400" />
                      <div>
                        <p className="font-medium text-navy-900">{method.brand} •••• {method.last4}</p>
                        <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.isDefault && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          Default
                        </span>
                      )}
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
              <h2 className="text-2xl font-semibold text-navy-900 mb-6">Usage This Month</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {usageStats.map((stat, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-navy-900">{stat.title}</h3>
                      <span className="text-sm text-gray-600">
                        {stat.current} / {stat.limit} {stat.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          stat.limit === 'unlimited' ? 'bg-green-500' :
                          (stat.current / (typeof stat.limit === 'number' ? stat.limit : 1)) > 0.8 ? 'bg-red-500' :
                          (stat.current / (typeof stat.limit === 'number' ? stat.limit : 1)) > 0.6 ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`}
                        style={{ 
                          width: stat.limit === 'unlimited' ? '100%' : 
                          `${Math.min((stat.current / (typeof stat.limit === 'number' ? stat.limit : 1)) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                    {stat.limit !== 'unlimited' && typeof stat.limit === 'number' && (stat.current / stat.limit) > 0.8 && (
                      <p className="text-xs text-red-600 mt-1">Approaching limit</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

