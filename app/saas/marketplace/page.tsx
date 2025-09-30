"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PersistentElements } from '@/components/ui/persistent-elements';
import { ShoppingCart, Plus, Check } from "lucide-react";
import Link from 'next/link';

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  features: string[];
  icon: string;
}

const availableAgents: Agent[] = [
  {
    id: 'sales-agent',
    name: 'Sales Agent',
    description: 'Automate your sales process with intelligent lead qualification and follow-ups',
    category: 'Sales',
    price: 49,
    features: ['Lead Qualification', 'Email Automation', 'CRM Integration', 'Performance Analytics'],
    icon: '💼'
  },
  {
    id: 'marketing-agent',
    name: 'Marketing Agent', 
    description: 'Create and execute marketing campaigns with AI-powered content generation',
    category: 'Marketing',
    price: 39,
    features: ['Content Creation', 'Campaign Management', 'Social Media Automation', 'Analytics'],
    icon: '📈'
  },
  {
    id: 'support-agent',
    name: 'Support Agent',
    description: 'Provide 24/7 customer support with intelligent ticket routing and responses',
    category: 'Support',
    price: 29,
    features: ['Ticket Management', 'Auto-Response', 'Knowledge Base', 'Escalation Rules'],
    icon: '🎧'
  },
  {
    id: 'finance-agent',
    name: 'Finance Agent',
    description: 'Automate financial processes including invoicing, expense tracking, and reporting',
    category: 'Finance',
    price: 59,
    features: ['Invoice Automation', 'Expense Tracking', 'Financial Reports', 'Tax Compliance'],
    icon: '💰'
  },
  {
    id: 'ops-agent',
    name: 'Operations Agent',
    description: 'Streamline operations with workflow automation and process optimization',
    category: 'Operations',
    price: 45,
    features: ['Workflow Automation', 'Process Optimization', 'Task Management', 'Resource Planning'],
    icon: '⚙️'
  },
  {
    id: 'compliance-agent',
    name: 'Compliance Agent',
    description: 'Ensure regulatory compliance with automated monitoring and reporting',
    category: 'Compliance',
    price: 69,
    features: ['Regulatory Monitoring', 'Compliance Reports', 'Risk Assessment', 'Audit Trail'],
    icon: '🛡️'
  }
];

export default function AgentMarketplace() {
  const [cart, setCart] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(availableAgents.map(agent => agent.category)))];
  const filteredAgents = selectedCategory === 'All' 
    ? availableAgents 
    : availableAgents.filter(agent => agent.category === selectedCategory);

  const addToCart = (agentId: string) => {
    if (!cart.includes(agentId)) {
      setCart([...cart, agentId]);
    }
  };

  const removeFromCart = (agentId: string) => {
    setCart(cart.filter(id => id !== agentId));
  };

  const cartTotal = cart.reduce((total, agentId) => {
    const agent = availableAgents.find(a => a.id === agentId);
    return total + (agent?.price || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      {/* Profile Component - Only for SaaS pages */}
      <PersistentElements 
        clientName="John Doe"
        batteryLevel={85}
        academyCategory="AI"
      />
      
      {/* Header */}
      <div className="border-b border-orange-200/30 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-light text-gray-800 mb-2">How can I help?</h1>
              <div className="relative max-w-md mx-auto">
                <input 
                  type="text" 
                  placeholder="Build an agent or perform a task"
                  className="w-full px-4 py-3 rounded-xl bg-white/80 border border-orange-200 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
                  <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">🤖</div>
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">💡</div>
                </div>
              </div>
            </div>
            <div className="absolute right-6">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
                + New Agent
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm">📊 Personal website</div>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm">📧 Customer Support Email</div>
          <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm">📞 Outbound Sales Calls</div>
          <div className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm">🎯 Lead gen</div>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center gap-8 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                selectedCategory === category 
                  ? 'text-gray-800 border-orange-400' 
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => {
            const isInCart = cart.includes(agent.id);
            
            return (
              <Card key={agent.id} className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
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
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">${agent.price}</div>
                      <div className="text-sm text-gray-600">/month</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">{agent.description}</p>

                  <div className="space-y-2 mb-6">
                    <h4 className="font-medium text-gray-900">Features:</h4>
                    <ul className="space-y-1">
                      {agent.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <Check className="w-3 h-3 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={() => isInCart ? removeFromCart(agent.id) : addToCart(agent.id)}
                    className={`w-full ${isInCart 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                    }`}
                  >
                    {isInCart ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 right-6 bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-4">
              <div>
                <div className="font-semibold text-gray-900">{cart.length} agents selected</div>
                <div className="text-sm text-gray-600">Total: ${cartTotal}/month</div>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
