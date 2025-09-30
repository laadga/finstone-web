"use client";

import { useState } from 'react';
import { 
  ArrowLeft, 
  FileCheck, 
  Download, 
  Calendar,
  Filter,
  Search,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Bot,
  Eye,
  RefreshCw
} from "lucide-react";
import Link from "next/link";

export default function Audit() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedAgent, setSelectedAgent] = useState('all');

  const auditData = {
    overview: {
      totalTasks: 4697,
      completedTasks: 4456,
      failedTasks: 241,
      successRate: 94.9,
      avgResponseTime: 1.2,
      costSavings: 12450,
      timeSaved: 127
    },
    agents: [
      {
        id: "finance",
        name: "Finance Agent",
        tasks: 1247,
        successRate: 96.2,
        avgTime: 0.8,
        costSavings: 4200,
        issues: 2
      },
      {
        id: "admin",
        name: "Admin Agent",
        tasks: 892,
        successRate: 94.1,
        avgTime: 1.1,
        costSavings: 2800,
        issues: 1
      },
      {
        id: "lead-gen",
        name: "Lead Gen Agent",
        tasks: 2103,
        successRate: 95.8,
        avgTime: 0.9,
        costSavings: 3800,
        issues: 3
      },
      {
        id: "ops",
        name: "Ops Agent",
        tasks: 456,
        successRate: 92.3,
        avgTime: 1.5,
        costSavings: 1650,
        issues: 5
      }
    ],
    recentActivity: [
      {
        id: 1,
        agent: "Finance Agent",
        action: "Generated monthly P&L report",
        status: "completed",
        timestamp: "2 minutes ago",
        duration: "45 seconds"
      },
      {
        id: 2,
        agent: "Lead Gen Agent",
        action: "Qualified 12 new prospects",
        status: "completed",
        timestamp: "5 minutes ago",
        duration: "2 minutes"
      },
      {
        id: 3,
        agent: "Admin Agent",
        action: "Scheduled team meeting",
        status: "failed",
        timestamp: "8 minutes ago",
        duration: "30 seconds"
      },
      {
        id: 4,
        agent: "Ops Agent",
        action: "Optimized workflow process",
        status: "completed",
        timestamp: "15 minutes ago",
        duration: "3 minutes"
      }
    ],
    issues: [
      {
        id: 1,
        agent: "Ops Agent",
        type: "Performance",
        severity: "medium",
        description: "Response time increased by 40%",
        timestamp: "1 hour ago",
        status: "investigating"
      },
      {
        id: 2,
        agent: "Finance Agent",
        type: "Data",
        severity: "low",
        description: "Missing data in quarterly report",
        timestamp: "2 hours ago",
        status: "resolved"
      },
      {
        id: 3,
        agent: "Lead Gen Agent",
        type: "Integration",
        severity: "high",
        description: "CRM sync failed",
        timestamp: "3 hours ago",
        status: "investigating"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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
              <h1 className="text-4xl font-bold text-navy-900 mb-2">Audit & Analytics</h1>
              <p className="text-xl text-gray-600">Monitor performance and track your AI workforce</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-gray-200">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
              <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-gray-400" />
              <select 
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Agents</option>
                <option value="finance">Finance Agent</option>
                <option value="admin">Admin Agent</option>
                <option value="lead-gen">Lead Gen Agent</option>
                <option value="ops">Ops Agent</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-3xl font-bold text-navy-900">{auditData.overview.totalTasks.toLocaleString()}</p>
                <p className="text-sm text-green-600">{auditData.overview.completedTasks.toLocaleString()} completed</p>
              </div>
              <FileCheck className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-navy-900">{auditData.overview.successRate}%</p>
                <p className="text-sm text-green-600">+2.1% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-3xl font-bold text-navy-900">{auditData.overview.avgResponseTime}s</p>
                <p className="text-sm text-blue-600">-0.3s improvement</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cost Savings</p>
                <p className="text-3xl font-bold text-navy-900">${auditData.overview.costSavings.toLocaleString()}</p>
                <p className="text-sm text-green-600">+$2,100 this month</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Agent Performance */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 mb-8">
          <h3 className="text-xl font-semibold text-navy-900 mb-6">Agent Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Agent</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Tasks</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Success Rate</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Avg Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Cost Savings</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Issues</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {auditData.agents.map((agent) => (
                  <tr key={agent.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Bot className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="font-medium text-navy-900">{agent.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{agent.tasks.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        agent.successRate >= 95 ? 'bg-green-100 text-green-800' :
                        agent.successRate >= 90 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {agent.successRate}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{agent.avgTime}s</td>
                    <td className="py-3 px-4 text-sm font-medium text-green-600">${agent.costSavings.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        agent.issues === 0 ? 'bg-green-100 text-green-800' :
                        agent.issues <= 2 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {agent.issues} {agent.issues === 1 ? 'issue' : 'issues'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity & Issues */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
            <h3 className="text-xl font-semibold text-navy-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {auditData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.status === 'completed' ? 'bg-green-100' :
                    activity.status === 'failed' ? 'bg-red-100' :
                    'bg-yellow-100'
                  }`}>
                    {activity.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : activity.status === 'failed' ? (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-navy-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.agent} • {activity.timestamp}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{activity.duration}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Issues & Alerts */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
            <h3 className="text-xl font-semibold text-navy-900 mb-6">Issues & Alerts</h3>
            <div className="space-y-4">
              {auditData.issues.map((issue) => (
                <div key={issue.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    issue.severity === 'high' ? 'bg-red-100' :
                    issue.severity === 'medium' ? 'bg-yellow-100' :
                    'bg-green-100'
                  }`}>
                    <AlertTriangle className={`h-5 w-5 ${
                      issue.severity === 'high' ? 'text-red-600' :
                      issue.severity === 'medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-navy-900">{issue.type}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{issue.description}</p>
                    <p className="text-xs text-gray-500">{issue.agent} • {issue.timestamp}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      issue.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      issue.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {issue.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



























