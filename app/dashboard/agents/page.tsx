"use client";

import { useState } from 'react';
import { 
  ArrowLeft, 
  Bot, 
  Plus, 
  Settings,
  BarChart3,
  MessageSquare,
  Upload,
  Download,
  Play,
  Pause,
  RotateCcw,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  Clock,
  X
} from "lucide-react";
import Link from "next/link";

export default function MyAgents() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const myAgents = [
    {
      id: "finance",
      name: "Finance Agent",
      role: "CFO Assistant",
      description: "Real-time financial monitoring and automated reporting",
      status: "active",
      avatar: "🤖",
      color: "blue",
      lastActive: "2 minutes ago",
      tasksCompleted: 1247,
      efficiency: 94,
      uptime: "99.9%",
      performance: "excellent"
    },
    {
      id: "admin",
      name: "Admin Agent",
      role: "Administrative Assistant",
      description: "Smart scheduling and document management",
      status: "active",
      avatar: "🤖",
      color: "purple",
      lastActive: "5 minutes ago",
      tasksCompleted: 892,
      efficiency: 87,
      uptime: "99.7%",
      performance: "good"
    },
    {
      id: "lead-gen",
      name: "Lead Gen Agent",
      role: "Lead Generation Specialist",
      description: "Find and qualify prospects 24/7",
      status: "active",
      avatar: "🤖",
      color: "green",
      lastActive: "1 minute ago",
      tasksCompleted: 2103,
      efficiency: 91,
      uptime: "99.8%",
      performance: "excellent"
    },
    {
      id: "ops",
      name: "Ops Agent",
      role: "Operations Optimizer",
      description: "Streamline processes and maximize efficiency",
      status: "paused",
      avatar: "🤖",
      color: "orange",
      lastActive: "2 hours ago",
      tasksCompleted: 456,
      efficiency: 82,
      uptime: "98.5%",
      performance: "good"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-navy-900 mb-2">My Agents</h1>
              <p className="text-xl text-gray-600">Manage and monitor your AI workforce</p>
            </div>
            <Link 
              href="/dashboard/add-agents"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Agent
            </Link>
          </div>
        </div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {myAgents.map((agent) => (
            <div 
              key={agent.id} 
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 transition-all duration-200 hover:shadow-xl"
            >
              {/* Agent Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    agent.color === 'blue' ? 'bg-blue-100' :
                    agent.color === 'purple' ? 'bg-purple-100' :
                    agent.color === 'green' ? 'bg-green-100' :
                    'bg-orange-100'
                  }`}>
                    {agent.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900">{agent.name}</h3>
                    <p className="text-sm text-gray-600">{agent.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                    {agent.status}
                  </span>
                  <button className="p-1 rounded-lg hover:bg-gray-100">
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4">{agent.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-navy-900">{agent.tasksCompleted.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Tasks Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-navy-900">{agent.efficiency}%</p>
                  <p className="text-xs text-gray-600">Efficiency</p>
                </div>
              </div>

              {/* Performance Indicators */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Uptime</span>
                  <span className="font-medium text-navy-900">{agent.uptime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Performance</span>
                  <span className={`font-medium ${getPerformanceColor(agent.performance)}`}>
                    {agent.performance}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Active</span>
                  <span className="font-medium text-navy-900">{agent.lastActive}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedAgent(agent.id)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat
                </button>
                <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  <Settings className="h-4 w-4" />
                </button>
                <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  {agent.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Agents</p>
                <p className="text-3xl font-bold text-navy-900">{myAgents.length}</p>
              </div>
              <Bot className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Agents</p>
                <p className="text-3xl font-bold text-navy-900">
                  {myAgents.filter(a => a.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-3xl font-bold text-navy-900">
                  {myAgents.reduce((sum, agent) => sum + agent.tasksCompleted, 0).toLocaleString()}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Efficiency</p>
                <p className="text-3xl font-bold text-navy-900">
                  {Math.round(myAgents.reduce((sum, agent) => sum + agent.efficiency, 0) / myAgents.length)}%
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
          <h3 className="text-xl font-semibold text-navy-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-navy-900">Finance Agent completed 47 tasks</p>
                <p className="text-sm text-gray-600">2 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-navy-900">Lead Gen Agent found 12 new prospects</p>
                <p className="text-sm text-gray-600">15 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-navy-900">Ops Agent paused due to maintenance</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Chat Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy-900">
                    {myAgents.find(a => a.id === selectedAgent)?.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {myAgents.find(a => a.id === selectedAgent)?.role}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAgent(null)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 flex">
              {/* Chat Interface */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Bot className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-md">
                        <p className="text-sm">Hello! I'm your AI assistant. How can I help you today?</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                      <MessageSquare className="h-5 w-5" />
                    </button>
                    <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200">
                      <Upload className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-80 border-l border-gray-200 p-6">
                <h4 className="font-semibold text-navy-900 mb-4">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm">
                    Generate Report
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm">
                    Analyze Data
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm">
                    Schedule Task
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm">
                    View Analytics
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

