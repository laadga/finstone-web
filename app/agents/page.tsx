"use client";

import * as React from 'react';
import {
  Workspaces,
  WorkspaceTrigger,
  WorkspaceContent,
  type Workspace,
} from '@/components/ui/workspaces';
import { Button } from '@/components/ui/button';
import { PlusIcon, Bot } from 'lucide-react';

// AI Agent interface
interface AIAgent extends Workspace {
  role: string;
  status: 'active' | 'inactive' | 'locked';
  color: string;
}

const aiAgents: AIAgent[] = [
  {
    id: '1',
    name: 'Finance Agent',
    role: 'CFO Assistant',
    status: 'active',
    color: 'blue'
  },
  {
    id: '2',
    name: 'Admin Agent',
    role: 'Administrative Assistant',
    status: 'active',
    color: 'purple'
  },
  {
    id: '3',
    name: 'Lead Gen Agent',
    role: 'Lead Generation Specialist',
    status: 'active',
    color: 'green'
  },
  {
    id: '4',
    name: 'Ops Agent',
    role: 'Operations Optimizer',
    status: 'active',
    color: 'orange'
  },
  {
    id: '5',
    name: 'Compliance Agent',
    role: 'Compliance Monitor',
    status: 'locked',
    color: 'indigo'
  },
  {
    id: '6',
    name: 'Customer Ops Agent',
    role: 'Customer Operations Expert',
    status: 'locked',
    color: 'cyan'
  }
];

export default function AgentsPage() {
  const [selectedAgentId, setSelectedAgentId] = React.useState('1');

  const handleAgentChange = (agent: AIAgent) => {
    setSelectedAgentId(agent.id);
    console.log('Selected agent:', agent);
  };

  return (
    <main className="relative min-h-screen">
      {/* Darker Gray Background Effect */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
        {/* Darker gray smoky elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gray-400/30 rounded-full blur-3xl animate-smoky-float"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-gray-500/25 rounded-full blur-3xl animate-smoky-drift" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gray-400/35 rounded-full blur-3xl animate-smoky-swirl" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-gray-500/30 rounded-full blur-3xl animate-smoky-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-gray-300/40 rounded-full blur-2xl animate-smoky-drift" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-60 left-1/4 w-48 h-48 bg-gray-400/20 rounded-full blur-2xl animate-smoky-swirl" style={{animationDelay: '5s'}}></div>
          <div className="absolute bottom-60 right-1/4 w-40 h-40 bg-gray-500/25 rounded-full blur-2xl animate-smoky-float" style={{animationDelay: '6s'}}></div>
        </div>
      </div>

      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="w-full max-w-6xl">

        {/* AI Agent Selector */}
        <div className="flex justify-center mb-12">
          <Workspaces
            workspaces={aiAgents}
            selectedWorkspaceId={selectedAgentId}
            onWorkspaceChange={handleAgentChange}
          >
            <WorkspaceTrigger 
              className="min-w-80 bg-transparent border border-gray-400 hover:bg-gray-100/50 hover:border-gray-500 backdrop-blur-sm rounded-lg" 
              renderTrigger={(agent, isOpen) => (
                <div className="flex min-w-0 flex-1 items-center justify-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${
                    agent.color === 'blue' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                    agent.color === 'purple' ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                    agent.color === 'green' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                    agent.color === 'orange' ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                    agent.color === 'indigo' ? 'bg-gradient-to-br from-indigo-400 to-indigo-600' :
                    'bg-gradient-to-br from-cyan-400 to-cyan-600'
                  }`}>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="font-medium text-gray-900">{agent.name}</span>
                  </div>
                </div>
              )}
            />
            <WorkspaceContent 
              title="AI Agents"
              className="bg-white/80 backdrop-blur-md border border-gray-400 rounded-lg shadow-lg"
              align="center"
              renderWorkspace={(agent, isSelected) => (
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${
                    agent.color === 'blue' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                    agent.color === 'purple' ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                    agent.color === 'green' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                    agent.color === 'orange' ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                    agent.color === 'indigo' ? 'bg-gradient-to-br from-indigo-400 to-indigo-600' :
                    'bg-gradient-to-br from-cyan-400 to-cyan-600'
                  }`}>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col items-start">
                    <span className="font-medium text-gray-900">{agent.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      (agent as AIAgent).status === 'active' ? 'bg-green-100 text-green-700' :
                      (agent as AIAgent).status === 'inactive' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {(agent as AIAgent).status}
                    </span>
                  </div>
                </div>
              )}
            >
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground w-full justify-start"
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Create new agent
              </Button>
            </WorkspaceContent>
          </Workspaces>
        </div>

        </div>
      </div>
    </main>
  );
}