import React, { useState, useEffect } from 'react';
import { Link, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { integrationsApi } from '@/lib/api';
import { StatusBadge } from '@/components/Badge';

interface Integration {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'available';
  connectedAt?: string;
  icon: string;
}

export function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    try {
      setIsLoading(true);
      const data = await integrationsApi.getIntegrations();
      setIntegrations(data);
    } catch (error) {
      console.error('Error loading integrations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async (name: string) => {
    try {
      await integrationsApi.connectIntegration(name);
      loadIntegrations(); // Reload data
    } catch (error) {
      console.error('Error connecting integration:', error);
    }
  };

  const handleDisconnect = async (name: string) => {
    try {
      await integrationsApi.disconnectIntegration(name);
      loadIntegrations(); // Reload data
    } catch (error) {
      console.error('Error disconnecting integration:', error);
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
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-600 mt-1">
          Connect your favorite tools and services to streamline your workflow
        </p>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div key={integration.id} className="card p-6 hover:shadow-md transition-shadow">
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
              <StatusBadge 
                status={integration.status} 
                size="sm"
              />
            </div>

            {integration.status === 'connected' && integration.connectedAt && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
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
                    className="flex-1 btn-secondary text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Disconnect
                  </button>
                  <button className="btn-secondary">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleConnect(integration.name)}
                  className="flex-1 btn-primary"
                >
                  <Link className="w-4 h-4 mr-2" />
                  Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Integration Info */}
      <div className="card p-6 bg-blue-50 border-blue-200">
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





















