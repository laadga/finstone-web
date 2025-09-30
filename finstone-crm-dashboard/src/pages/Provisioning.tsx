import React, { useState, useEffect } from 'react';
import { Bot, RefreshCw, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import { provisioningApi } from '@/lib/api';
import { formatDateTime } from '@/lib/utils';
import { StatusBadge } from '@/components/Badge';
import { Modal } from '@/components/Modal';

interface ProvisioningItem {
  id: string;
  customerId: string;
  agentType: string;
  requestDate: string;
  status: string;
  lastUpdate: string;
  logs: Array<{
    timestamp: string;
    level: string;
    message: string;
  }>;
}

export function Provisioning() {
  const [provisioningQueue, setProvisioningQueue] = useState<ProvisioningItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ProvisioningItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProvisioningQueue();
  }, []);

  const loadProvisioningQueue = async () => {
    try {
      setIsLoading(true);
      const data = await provisioningApi.getQueue();
      setProvisioningQueue(data);
    } catch (error) {
      console.error('Error loading provisioning queue:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = async (id: string) => {
    try {
      await provisioningApi.retryProvisioning(id);
      loadProvisioningQueue(); // Reload data
    } catch (error) {
      console.error('Error retrying provisioning:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'provisioned':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'provisioning':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'queued':
        return <Clock className="w-5 h-5 text-gray-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
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
        <h1 className="text-2xl font-bold text-gray-900">Agent Provisioning</h1>
        <p className="text-gray-600 mt-1">
          Monitor and manage AI agent provisioning requests
        </p>
      </div>

      {/* Provisioning Queue */}
      <div className="space-y-4">
        {provisioningQueue.map((item) => (
          <div key={item.id} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.agentType}</h3>
                  <p className="text-sm text-gray-500">Customer: {item.customerId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(item.status)}
                  <StatusBadge status={item.status} />
                </div>
                <button
                  onClick={() => setSelectedItem(item)}
                  className="btn-secondary"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Logs
                </button>
                {item.status === 'failed' && (
                  <button
                    onClick={() => handleRetry(item.id)}
                    className="btn-primary"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-500 mb-1">Request Date</div>
                <div className="font-medium">{formatDateTime(item.requestDate)}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Last Update</div>
                <div className="font-medium">{formatDateTime(item.lastUpdate)}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Logs</div>
                <div className="font-medium">{item.logs.length} entries</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Logs Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={`Provisioning Logs - ${selectedItem.agentType}`}
          size="lg"
        >
          <div className="space-y-4">
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
              {selectedItem.logs.map((log, index) => (
                <div key={index} className="mb-2">
                  <span className="text-gray-500">
                    [{formatDateTime(log.timestamp)}]
                  </span>
                  <span className={`ml-2 ${
                    log.level === 'error' ? 'text-red-400' : 
                    log.level === 'warning' ? 'text-yellow-400' : 
                    'text-green-400'
                  }`}>
                    [{log.level.toUpperCase()}]
                  </span>
                  <span className="ml-2">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}





















