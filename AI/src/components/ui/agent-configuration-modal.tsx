"use client";

import { useState } from 'react';
import { X, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { agentService } from '@/lib/agent-service';
import { useRouter } from 'next/navigation';

interface AgentConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentId: string;
  agentName: string;
  requiredFields: string[];
  optionalFields: string[];
  onDeploy: (configuration: Record<string, any>) => void;
}

export const AgentConfigurationModal = ({
  isOpen,
  onClose,
  agentId,
  agentName,
  requiredFields,
  optionalFields,
  onDeploy
}: AgentConfigurationModalProps) => {
  const [configuration, setConfiguration] = useState<Record<string, any>>({});
  const [isDeploying, setIsDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setConfiguration(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    setError(null);

    try {
      // Validate required fields
      const missingFields = requiredFields.filter(field => !configuration[field]);
      if (missingFields.length > 0) {
        setError(`Please fill in required fields: ${missingFields.join(', ')}`);
        setIsDeploying(false);
        return;
      }

      await onDeploy(configuration);
      onClose();
      // Redirect to pricing page after successful deployment
      router.push('/pricing');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to deploy agent');
    } finally {
      setIsDeploying(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Settings className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Configure {agentName}</h2>
              <p className="text-gray-600 text-sm">Set up your agent before deployment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Required Fields */}
            {requiredFields.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-red-500" />
                  Required Configuration
                </h3>
                <div className="space-y-4">
                  {requiredFields.map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} *
                      </label>
                      <input
                        type="text"
                        value={configuration[field] || ''}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Enter ${field.replace(/_/g, ' ')}`}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optional Fields */}
            {optionalFields.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Settings className="h-4 w-4 text-blue-500" />
                  Optional Configuration
                </h3>
                <div className="space-y-4">
                  {optionalFields.map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </label>
                      <input
                        type="text"
                        value={configuration[field] || ''}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Enter ${field.replace(/_/g, ' ')} (optional)`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            disabled={isDeploying}
          >
            Cancel
          </button>
          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isDeploying ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Deploying...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                Deploy Agent
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};





