// Frontend Integration Example
// This shows how your clients can integrate with the OAuth backend

class OAuthIntegration {
  constructor(backendUrl = 'http://localhost:3001') {
    this.backendUrl = backendUrl;
  }

  // Connect to a service
  async connectService(service) {
    try {
      const response = await fetch(`${this.backendUrl}/api/integrations/${service}/connect`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to initiate ${service} connection`);
      }

      const { url } = await response.json();
      
      // Open OAuth popup
      const popup = window.open(
        url,
        `${service}-oauth`,
        'width=600,height=700,scrollbars=yes,resizable=yes'
      );

      // Wait for popup to close and check connection status
      return new Promise((resolve, reject) => {
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            this.getIntegrationStatus(service)
              .then(resolve)
              .catch(reject);
          }
        }, 1000);
      });
    } catch (error) {
      console.error(`Error connecting to ${service}:`, error);
      throw error;
    }
  }

  // Get status of all integrations
  async getAllIntegrations() {
    try {
      const response = await fetch(`${this.backendUrl}/api/integrations`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch integrations');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching integrations:', error);
      throw error;
    }
  }

  // Get status of specific integration
  async getIntegrationStatus(service) {
    try {
      const response = await fetch(`${this.backendUrl}/api/integrations/${service}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${service} status`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${service} status:`, error);
      throw error;
    }
  }

  // Disconnect a service
  async disconnectService(service) {
    try {
      const response = await fetch(`${this.backendUrl}/api/integrations/${service}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to disconnect ${service}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error disconnecting ${service}:`, error);
      throw error;
    }
  }

  // Check if backend is healthy
  async healthCheck() {
    try {
      const response = await fetch(`${this.backendUrl}/api/health`);
      return response.ok;
    } catch (error) {
      console.error('Backend health check failed:', error);
      return false;
    }
  }
}

// Usage Examples:

// Initialize the integration helper
const oauth = new OAuthIntegration();

// Example 1: Connect to Google
async function connectGoogle() {
  try {
    console.log('Connecting to Google...');
    const result = await oauth.connectService('google');
    console.log('Google connected:', result);
  } catch (error) {
    console.error('Google connection failed:', error);
  }
}

// Example 2: Connect to Slack
async function connectSlack() {
  try {
    console.log('Connecting to Slack...');
    const result = await oauth.connectService('slack');
    console.log('Slack connected:', result);
  } catch (error) {
    console.error('Slack connection failed:', error);
  }
}

// Example 3: Connect to Airtable
async function connectAirtable() {
  try {
    console.log('Connecting to Airtable...');
    const result = await oauth.connectService('airtable');
    console.log('Airtable connected:', result);
  } catch (error) {
    console.error('Airtable connection failed:', error);
  }
}

// Example 4: Connect to HubSpot
async function connectHubSpot() {
  try {
    console.log('Connecting to HubSpot...');
    const result = await oauth.connectService('hubspot');
    console.log('HubSpot connected:', result);
  } catch (error) {
    console.error('HubSpot connection failed:', error);
  }
}

// Example 5: Connect to Salesforce
async function connectSalesforce() {
  try {
    console.log('Connecting to Salesforce...');
    const result = await oauth.connectService('salesforce');
    console.log('Salesforce connected:', result);
  } catch (error) {
    console.error('Salesforce connection failed:', error);
  }
}

// Example 6: Get all integration statuses
async function checkAllIntegrations() {
  try {
    const integrations = await oauth.getAllIntegrations();
    console.log('All integrations:', integrations);
    
    integrations.forEach(integration => {
      console.log(`${integration.name}: ${integration.status}`);
    });
  } catch (error) {
    console.error('Failed to check integrations:', error);
  }
}

// Example 7: Disconnect a service
async function disconnectGoogle() {
  try {
    const result = await oauth.disconnectService('google');
    console.log('Google disconnected:', result);
  } catch (error) {
    console.error('Failed to disconnect Google:', error);
  }
}

// Example 8: React component integration
/*
import React, { useState, useEffect } from 'react';

function IntegrationManager() {
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    try {
      const data = await oauth.getAllIntegrations();
      setIntegrations(data);
    } catch (error) {
      console.error('Failed to load integrations:', error);
    }
  };

  const handleConnect = async (service) => {
    setLoading(true);
    try {
      await oauth.connectService(service);
      await loadIntegrations(); // Refresh the list
    } catch (error) {
      console.error(`Failed to connect ${service}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async (service) => {
    try {
      await oauth.disconnectService(service);
      await loadIntegrations(); // Refresh the list
    } catch (error) {
      console.error(`Failed to disconnect ${service}:`, error);
    }
  };

  return (
    <div>
      <h2>Integrations</h2>
      {integrations.map(integration => (
        <div key={integration.name}>
          <span>{integration.name}: {integration.status}</span>
          {integration.status === 'connected' ? (
            <button onClick={() => handleDisconnect(integration.name)}>
              Disconnect
            </button>
          ) : (
            <button 
              onClick={() => handleConnect(integration.name)}
              disabled={loading}
            >
              Connect
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
*/

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OAuthIntegration;
}
