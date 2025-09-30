"use client";

import React, { useState } from 'react';

const mockIntegrations = [
  {
    id: "int-001",
    name: "Slack",
    description: "Team communication and notifications",
    status: "connected",
    connectedAt: "2025-01-15T10:00:00Z",
    icon: "💬"
  },
  {
    id: "int-002",
    name: "HubSpot",
    description: "CRM and marketing automation",
    status: "connected",
    connectedAt: "2025-01-12T14:00:00Z",
    icon: "🎯"
  },
  {
    id: "int-003",
    name: "QuickBooks",
    description: "Accounting and financial management",
    status: "available",
    icon: "📊"
  },
  {
    id: "int-004",
    name: "Gmail",
    description: "Email integration and tracking",
    status: "connected",
    connectedAt: "2025-01-10T09:00:00Z",
    icon: "📧"
  },
  {
    id: "int-005",
    name: "Calendly",
    description: "Schedule meetings and demos",
    status: "available",
    icon: "📅"
  },
  {
    id: "int-006",
    name: "Shopify",
    description: "E-commerce platform integration",
    status: "available",
    icon: "🛒"
  }
];

export function Integrations() {
  const [integrations, setIntegrations] = useState(mockIntegrations);

  const handleConnect = (name) => {
    setIntegrations(integrations => 
      integrations.map(integration => 
        integration.name === name 
          ? { ...integration, status: 'connected', connectedAt: new Date().toISOString() }
          : integration
      )
    );
  };

  const handleDisconnect = (name) => {
    setIntegrations(integrations => 
      integrations.map(integration => 
        integration.name === name 
          ? { ...integration, status: 'available', connectedAt: undefined }
          : integration
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-600 mt-1">
          Connect your favorite tools and services to streamline your workflow
        </p>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div key={integration.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                  {integration.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                  <p className="text-sm text-gray-500">{integration.description}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                integration.status === 'connected' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {integration.status}
              </span>
            </div>

            {integration.status === 'connected' && integration.connectedAt && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span className="text-sm text-green-800">
                    Connected on {new Date(integration.connectedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              {integration.status === 'connected' ? (
                <>
                  <button
                    onClick={() => handleDisconnect(integration.name)}
                    className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-200 font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    ❌ Disconnect
                  </button>
                  <button className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-medium px-4 py-2 rounded-lg transition-colors">
                    🔗
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleConnect(integration.name)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  🔗 Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Integration Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-sm">ℹ</span>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">About Integrations</h3>
            <p className="text-blue-800 text-sm">
              Integrations help you connect Finstone CRM with your existing tools and workflows. 
              Each integration is designed to streamline specific processes and improve your team's productivity.
            </p>
            <p className="text-blue-800 text-sm mt-2">
              <strong>Note:</strong> This is a demo environment. In production, integrations would 
              connect to real APIs and services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}





















