// Agent Management Service
import { getN8nAgent } from './n8n-config';

export interface AgentDeployment {
  id: string;
  agentId: string;
  userId: string;
  status: 'deployed' | 'active' | 'paused' | 'error';
  deployedAt: string;
  configuration: Record<string, any>;
  n8nWorkflowId: string;
}

export interface AgentStatus {
  agentId: string;
  status: 'online' | 'offline' | 'error';
  lastActivity: string;
  executions: number;
  successRate: number;
}

class AgentService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  }

  // Deploy an agent
  async deployAgent(agentId: string, userId: string, configuration: Record<string, any> = {}) {
    try {
      const response = await fetch(`${this.baseUrl}/api/agents/deploy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentId,
          userId,
          configuration
        })
      });

      if (!response.ok) {
        throw new Error(`Deployment failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error deploying agent:', error);
      throw error;
    }
  }

  // Get user's deployed agents
  async getUserAgents(userId: string): Promise<AgentDeployment[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/agents/deploy?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch agents: ${response.statusText}`);
      }

      const data = await response.json();
      return data.agents || [];
    } catch (error) {
      console.error('Error fetching user agents:', error);
      return [];
    }
  }

  // Get agent status
  async getAgentStatus(agentId: string): Promise<AgentStatus | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/agents/status?agentId=${agentId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch agent status: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching agent status:', error);
      return null;
    }
  }

  // Pause an agent
  async pauseAgent(deploymentId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/api/agents/pause`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deploymentId })
      });

      if (!response.ok) {
        throw new Error(`Failed to pause agent: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error pausing agent:', error);
      throw error;
    }
  }

  // Resume an agent
  async resumeAgent(deploymentId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/api/agents/resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deploymentId })
      });

      if (!response.ok) {
        throw new Error(`Failed to resume agent: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error resuming agent:', error);
      throw error;
    }
  }

  // Delete an agent
  async deleteAgent(deploymentId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/api/agents/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deploymentId })
      });

      if (!response.ok) {
        throw new Error(`Failed to delete agent: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting agent:', error);
      throw error;
    }
  }

  // Get agent configuration form
  getAgentConfigurationForm(agentId: string) {
    const agent = getN8nAgent(agentId);
    if (!agent) return null;

    return {
      agentId: agent.id,
      name: agent.name,
      requiredFields: agent.requiredFields,
      optionalFields: agent.optionalFields,
      webhookUrl: agent.webhookUrl
    };
  }
}

export const agentService = new AgentService();






