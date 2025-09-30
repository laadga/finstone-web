"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PersistentElements } from '@/components/ui/persistent-elements';
import { 
  MessageSquare, 
  Settings, 
  Activity, 
  ShoppingCart, 
  User,
  ChevronRight,
  Play,
  Pause,
  BarChart3
} from "lucide-react";
import Link from 'next/link';

interface PurchasedAgent {
  id: string;
  name: string;
  category: string;
  icon: string;
  status: 'active' | 'paused' | 'setup';
  lastActivity: string;
  tasksCompleted: number;
  monthlyTasks: number;
}

// Mock data for purchased agents
const purchasedAgents: PurchasedAgent[] = [
  {
    id: 'sales-agent',
    name: 'Sales Agent',
    category: 'Sales',
    icon: '💼',
    status: 'active',
    lastActivity: '2 minutes ago',
    tasksCompleted: 47,
    monthlyTasks: 150
  },
  {
    id: 'marketing-agent',
    name: 'Marketing Agent',
    category: 'Marketing', 
    icon: '📈',
    status: 'active',
    lastActivity: '1 hour ago',
    tasksCompleted: 23,
    monthlyTasks: 100
  },
  {
    id: 'support-agent',
    name: 'Support Agent',
    category: 'Support',
    icon: '🎧',
    status: 'paused',
    lastActivity: '1 day ago',
    tasksCompleted: 12,
    monthlyTasks: 200
  }
];

export default function SaaSDashboard() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'setup': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-3 h-3" />;
      case 'paused': return <Pause className="w-3 h-3" />;
      default: return <Settings className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-gray-200">
      {/* Profile Component - Only for SaaS pages */}
      <PersistentElements 
        clientName="John Doe"
        batteryLevel={85}
        academyCategory="AI"
      />
      
      {/* Header */}
      <div className="border-b border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My AI Agents</h1>
              <p className="text-gray-600 mt-1">Manage and interact with your purchased agents</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/saas/marketplace">
                <Button variant="outline" className="bg-white/20 border-white/30 hover:bg-white/30">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Marketplace
                </Button>
              </Link>
              <Button variant="outline" className="bg-white/20 border-white/30 hover:bg-white/30">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/20 backdrop-blur-sm border-white/30 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{purchasedAgents.length}</div>
                <div className="text-sm text-gray-600">Active Agents</div>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white/20 backdrop-blur-sm border-white/30 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 text-white p-2 rounded-lg">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {purchasedAgents.reduce((sum, agent) => sum + agent.tasksCompleted, 0)}
                </div>
                <div className="text-sm text-gray-600">Tasks Completed</div>
              </div>
            </div>
          </Card>

          <Card className="bg-white/20 backdrop-blur-sm border-white/30 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 text-white p-2 rounded-lg">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {purchasedAgents.filter(a => a.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600">Online Now</div>
              </div>
            </div>
          </Card>

          <Card className="bg-white/20 backdrop-blur-sm border-white/30 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-orange-600 text-white p-2 rounded-lg">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {purchasedAgents.reduce((sum, agent) => sum + agent.monthlyTasks, 0)}
                </div>
                <div className="text-sm text-gray-600">Monthly Limit</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedAgents.map((agent) => (
            <Card 
              key={agent.id} 
              className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
              onClick={() => setSelectedAgent(agent.id)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{agent.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                        {agent.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(agent.status)} text-xs flex items-center gap-1`}>
                    {getStatusIcon(agent.status)}
                    {agent.status}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Activity:</span>
                    <span className="text-gray-900">{agent.lastActivity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tasks Completed:</span>
                    <span className="text-gray-900">{agent.tasksCompleted}/{agent.monthlyTasks}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full" 
                      style={{width: `${(agent.tasksCompleted / agent.monthlyTasks) * 100}%`}}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/saas/agent/${agent.id}`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Open Agent
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}

          {/* Add More Agents Card */}
          <Link href="/saas/marketplace">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 border-dashed hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
              <div className="p-6 flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Add More Agents</h3>
                <p className="text-sm text-gray-600">Explore the marketplace to find more AI agents for your business</p>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}






