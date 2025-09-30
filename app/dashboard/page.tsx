"use client";

import { useState } from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Plus, 
  FileCheck, 
  CreditCard, 
  HelpCircle,
  Menu,
  X,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  ChevronRight,
  BarChart3,
  MessageSquare,
  Upload,
  Settings
} from "lucide-react";
import Link from "next/link";
import {
  Workspaces,
  WorkspaceTrigger,
  WorkspaceContent,
  type Workspace,
} from '@/components/ui/workspaces';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

// Extended workspace interface for this specific use case
interface MyWorkspace extends Workspace {
  logo: string;
  plan: string;
  slug: string;
}

const workspaces: MyWorkspace[] = [
  {
    id: '1',
    name: 'Finstone AI',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&auto=format',
    plan: 'Pro',
    slug: 'finstone-ai',
  },
  {
    id: '2',
    name: 'TechStart Inc.',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format',
    plan: 'Free',
    slug: 'techstart',
  },
  {
    id: '3',
    name: 'GrowthCo',
    logo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format',
    plan: 'Team',
    slug: 'growthco',
  },
  {
    id: '4',
    name: 'ScaleUp Solutions',
    logo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format',
    plan: 'Free',
    slug: 'scaleup',
  },
  {
    id: '5',
    name: 'AI Ventures',
    logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop&auto=format',
    plan: 'Pro',
    slug: 'ai-ventures',
  },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState('1');

  const handleWorkspaceChange = (workspace: MyWorkspace) => {
    setActiveWorkspaceId(workspace.id);
    console.log('Selected workspace:', workspace);
  };

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
    { icon: Bot, label: "My Agents", href: "/dashboard/agents" },
    { icon: Plus, label: "Add Agents", href: "/dashboard/add-agents" },
    { icon: FileCheck, label: "Audit", href: "/dashboard/audit" },
    { icon: CreditCard, label: "Account & Billing", href: "/dashboard/billing" },
    { icon: Users, label: "Workspaces Demo", href: "/dashboard/workspaces-demo" },
    { icon: HelpCircle, label: "Support", href: "/dashboard/support" },
  ];

  const overviewStats = [
    {
      title: "Active Agents",
      value: "6",
      change: "+2 this month",
      icon: Bot,
      color: "blue"
    },
    {
      title: "Hours Saved",
      value: "127",
      change: "+23 this week",
      icon: Clock,
      color: "green"
    },
    {
      title: "Cost Savings",
      value: "$12,450",
      change: "+$2,100 this month",
      icon: DollarSign,
      color: "purple"
    },
    {
      title: "Tasks Completed",
      value: "2,847",
      change: "+456 this week",
      icon: TrendingUp,
      color: "orange"
    }
  ];

  const myAgents = [
    {
      id: "finance",
      name: "Finance Agent",
      role: "CFO Assistant",
      description: "Real-time financial monitoring and automated reporting",
      status: "active",
      avatar: "🤖",
      color: "blue"
    },
    {
      id: "admin",
      name: "Admin Agent",
      role: "Administrative Assistant",
      description: "Smart scheduling and document management",
      status: "active",
      avatar: "🤖",
      color: "purple"
    },
    {
      id: "lead-gen",
      name: "Lead Gen Agent",
      role: "Lead Generation Specialist",
      description: "Find and qualify prospects 24/7",
      status: "active",
      avatar: "🤖",
      color: "green"
    },
    {
      id: "ops",
      name: "Ops Agent",
      role: "Operations Optimizer",
      description: "Streamline processes and maximize efficiency",
      status: "active",
      avatar: "🤖",
      color: "orange"
    },
    {
      id: "compliance",
      name: "Compliance Agent",
      role: "Compliance Monitor",
      description: "Regulatory monitoring and risk management",
      status: "locked",
      avatar: "🔒",
      color: "indigo"
    },
    {
      id: "customer-ops",
      name: "Customer Ops Agent",
      role: "Customer Operations Expert",
      description: "24/7 customer support and issue resolution",
      status: "locked",
      avatar: "🔒",
      color: "cyan"
    }
  ];

  const roiData = [
    { month: 'Jan', savings: 8500, hours: 45 },
    { month: 'Feb', savings: 9200, hours: 52 },
    { month: 'Mar', savings: 10800, hours: 61 },
    { month: 'Apr', savings: 11200, hours: 68 },
    { month: 'May', savings: 12450, hours: 75 },
    { month: 'Jun', savings: 13100, hours: 82 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400">
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/images/smoky-texture.png')] bg-repeat opacity-5 animate-smoky-drift"></div>
      </div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-sm border-r border-gray-200/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
              <Link href="/" className="flex items-center">
                <span className="font-bold text-2xl text-navy-900">Finstone</span>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSidebarOpen(false);
                }}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    item.active
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* User Info */}
            <div className="p-4 border-t border-gray-200/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">JD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                  <p className="text-xs text-gray-500 truncate">john@company.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="bg-white/20 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSidebarOpen(true);
                }}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold text-navy-900">Dashboard</h1>
              <div className="flex items-center space-x-4">
                {/* Workspace Selector */}
                <Workspaces
                  workspaces={workspaces}
                  selectedWorkspaceId={activeWorkspaceId}
                  onWorkspaceChange={handleWorkspaceChange}
                >
                  <WorkspaceTrigger className="min-w-48" />
                  <WorkspaceContent>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground w-full justify-start"
                    >
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Create workspace
                    </Button>
                  </WorkspaceContent>
                </Workspaces>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Settings clicked');
                  }}
                  className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <Settings className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-navy-900 mb-2">Welcome back, John!</h2>
              <p className="text-gray-600">Here's what your AI workforce has been up to today.</p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {overviewStats.map((stat, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-navy-900">{stat.value}</p>
                      <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      stat.color === 'blue' ? 'bg-blue-100' :
                      stat.color === 'green' ? 'bg-green-100' :
                      stat.color === 'purple' ? 'bg-purple-100' :
                      'bg-orange-100'
                    }`}>
                      <stat.icon className={`h-6 w-6 ${
                        stat.color === 'blue' ? 'text-blue-600' :
                        stat.color === 'green' ? 'text-green-600' :
                        stat.color === 'purple' ? 'text-purple-600' :
                        'text-orange-600'
                      }`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ROI Chart */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-navy-900">ROI Overview</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Cost Savings</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Hours Saved</span>
                  </div>
                </div>
              </div>
              <div className="h-64 flex items-end space-x-2">
                {roiData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col items-center space-y-1 mb-2">
                      <div 
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${(data.savings / 14000) * 200}px` }}
                      ></div>
                      <div 
                        className="w-full bg-green-500 rounded-t"
                        style={{ height: `${(data.hours / 100) * 200}px` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* My Agents Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-navy-900">My Agents</h3>
                <Link 
                  href="/dashboard/add-agents"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  Add More Agents
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myAgents.map((agent) => (
                  <div key={agent.id} className={`bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 transition-all duration-200 hover:shadow-xl ${
                    agent.status === 'locked' ? 'opacity-60' : 'hover:scale-105'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                          agent.status === 'locked' ? 'bg-gray-200' : 
                          agent.color === 'blue' ? 'bg-blue-100' :
                          agent.color === 'purple' ? 'bg-purple-100' :
                          agent.color === 'green' ? 'bg-green-100' :
                          agent.color === 'orange' ? 'bg-orange-100' :
                          agent.color === 'indigo' ? 'bg-indigo-100' :
                          'bg-cyan-100'
                        }`}>
                          {agent.avatar}
                        </div>
                        <div>
                          <h4 className="font-semibold text-navy-900">{agent.name}</h4>
                          <p className="text-sm text-gray-600">{agent.role}</p>
                        </div>
                      </div>
                      {agent.status === 'locked' && (
                        <div className="px-2 py-1 bg-gray-100 rounded-full">
                          <span className="text-xs text-gray-500">Locked</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{agent.description}</p>
                    
                    {agent.status === 'active' ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('Opening agent:', agent.id);
                          setSelectedAgent(agent.id);
                        }}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg cursor-pointer"
                      >
                        Open Agent
                      </button>
                    ) : (
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('Adding agent:', agent.id);
                        }}
                        className="w-full bg-gray-200 text-gray-500 py-2 px-4 rounded-lg font-medium cursor-pointer hover:bg-gray-300 transition-colors"
                      >
                        Add This Agent
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Interface Modal */}
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedAgent(null);
                }}
                className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
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
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Send message clicked');
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
                    >
                      <MessageSquare className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Upload clicked');
                      }}
                      className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 cursor-pointer"
                    >
                      <Upload className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-80 border-l border-gray-200 p-6">
                <h4 className="font-semibold text-navy-900 mb-4">Quick Actions</h4>
                <div className="space-y-2">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Generate Report clicked');
                    }}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm cursor-pointer"
                  >
                    Generate Report
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Analyze Data clicked');
                    }}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm cursor-pointer"
                  >
                    Analyze Data
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Schedule Task clicked');
                    }}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm cursor-pointer"
                  >
                    Schedule Task
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('View Analytics clicked');
                    }}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm cursor-pointer"
                  >
                    View Analytics
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
