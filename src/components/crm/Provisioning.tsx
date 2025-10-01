"use client";

import React, { useState } from 'react';
import { formatDateTime } from '@/lib/utils';

const mockProvisioningQueue = [
  {
    id: "P-1",
    customerId: "C-100",
    agentType: "CFO Agent",
    requestDate: "2025-01-20T09:00:00Z",
    status: "provisioning",
    lastUpdate: "2025-01-20T14:30:00Z",
    logs: [
      { timestamp: "2025-01-20T09:00:00Z", level: "info", message: "Provisioning started for CFO Agent" },
      { timestamp: "2025-01-20T09:15:00Z", level: "info", message: "Configuration loaded successfully" },
      { timestamp: "2025-01-20T14:30:00Z", level: "info", message: "Agent initialization in progress" }
    ]
  },
  {
    id: "P-2",
    customerId: "C-102",
    agentType: "Sales Closer",
    requestDate: "2025-01-21T10:00:00Z",
    status: "queued",
    lastUpdate: "2025-01-21T10:00:00Z",
    logs: [
      { timestamp: "2025-01-21T10:00:00Z", level: "info", message: "Added to provisioning queue" }
    ]
  },
  {
    id: "P-3",
    customerId: "C-105",
    agentType: "Support Agent",
    requestDate: "2025-01-22T08:00:00Z",
    status: "failed",
    lastUpdate: "2025-01-22T10:00:00Z",
    logs: [
      { timestamp: "2025-01-22T08:00:00Z", level: "info", message: "Provisioning started for Support Agent" },
      { timestamp: "2025-01-22T09:30:00Z", level: "error", message: "Configuration validation failed" },
      { timestamp: "2025-01-22T10:00:00Z", level: "error", message: "Provisioning failed - retry required" }
    ]
  }
];

export function Provisioning() {
  const [provisioningQueue, setProvisioningQueue] = useState(mockProvisioningQueue);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleRetry = (id: string) => {
    setProvisioningQueue(queue => 
      queue.map((item: any) => 
        item.id === id 
          ? { ...item, status: 'provisioning', lastUpdate: new Date().toISOString() }
          : item
      )
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'provisioned':
        return <span className="text-green-500">✅</span>;
      case 'provisioning':
        return <span className="text-yellow-500">⏳</span>;
      case 'failed':
        return <span className="text-red-500">❌</span>;
      case 'queued':
        return <span className="text-gray-500">⏸️</span>;
      default:
        return <span className="text-gray-500">⏸️</span>;
    }
  };

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
        {provisioningQueue.map((item: any) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">🤖</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.agentType}</h3>
                  <p className="text-sm text-gray-500">Customer: {item.customerId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(item.status)}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.status === 'provisioned' ? 'bg-green-100 text-green-800' :
                    item.status === 'provisioning' ? 'bg-yellow-100 text-yellow-800' :
                    item.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedItem(item)}
                  className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  👁️ View Logs
                </button>
                {item.status === 'failed' && (
                  <button
                    onClick={() => handleRetry(item.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    🔄 Retry
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedItem(null)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Provisioning Logs</h2>
                  <p className="text-gray-600">{selectedItem.agentType} - {selectedItem.customerId}</p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
                {selectedItem.logs.map((log: any, index: number) => (
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
          </div>
        </div>
      )}
    </div>
  );
}





















