"use client";

import { useState } from 'react';
import { 
  ArrowLeft, 
  Bot, 
  CheckCircle, 
  Plus,
  DollarSign,
  Clock,
  Users,
  Shield,
  Target,
  Settings,
  Headphones
} from "lucide-react";
import Link from "next/link";

export default function AddAgents() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const allAgents = [
    {
      id: "finance",
      name: "Finance Agent",
      role: "CFO Assistant",
      description: "Real-time financial monitoring, automated reporting, and intelligent cost optimization",
      icon: DollarSign,
      color: "blue",
      status: "active",
      features: [
        "Real-time financial monitoring",
        "Automated P&L statements",
        "Cost optimization insights",
        "Risk management alerts"
      ],
      stats: {
        timeSaved: "15-20 hours/week",
        accuracy: "100% accuracy",
        costReduction: "Up to 40%"
      }
    },
    {
      id: "admin",
      name: "Admin Agent",
      role: "Administrative Assistant",
      description: "Smart scheduling, document management, and team coordination automation",
      icon: Users,
      color: "purple",
      status: "active",
      features: [
        "Smart calendar management",
        "Document organization",
        "Team coordination",
        "Task automation"
      ],
      stats: {
        timeSaved: "25 hours/week",
        efficiency: "35% improvement",
        costReduction: "$50,000 annually"
      }
    },
    {
      id: "lead-gen",
      name: "Lead Gen Agent",
      role: "Lead Generation Specialist",
      description: "Find, qualify, and nurture prospects 24/7 with intelligent automation",
      icon: Target,
      color: "green",
      status: "active",
      features: [
        "Intelligent lead qualification",
        "24/7 lead research",
        "Contact enrichment",
        "Automated outreach"
      ],
      stats: {
        leads: "300% increase",
        costReduction: "60% cost per lead",
        conversion: "45% improvement"
      }
    },
    {
      id: "ops",
      name: "Ops Agent",
      role: "Operations Optimizer",
      description: "Streamline processes, monitor performance, and maximize operational efficiency",
      icon: Settings,
      color: "orange",
      status: "active",
      features: [
        "Process optimization",
        "Performance monitoring",
        "Workflow automation",
        "Efficiency analytics"
      ],
      stats: {
        efficiency: "35% increase",
        defects: "60% reduction",
        costSavings: "$200,000 annually"
      }
    },
    {
      id: "compliance",
      name: "Compliance Agent",
      role: "Compliance Monitor",
      description: "Stay compliant and protected with automated regulatory monitoring and management",
      icon: Shield,
      color: "indigo",
      status: "locked",
      features: [
        "Regulatory monitoring",
        "Compliance auditing",
        "Risk assessment",
        "Policy management"
      ],
      stats: {
        compliance: "100% achievement",
        auditTime: "80% reduction",
        violations: "0 violations"
      }
    },
    {
      id: "customer-ops",
      name: "Customer Ops Agent",
      role: "Customer Operations Expert",
      description: "Deliver exceptional customer experiences with 24/7 support and intelligent automation",
      icon: Headphones,
      color: "cyan",
      status: "locked",
      features: [
        "24/7 customer support",
        "Multi-channel communication",
        "Instant response times",
        "Personalized service"
      ],
      stats: {
        responseTime: "90% reduction",
        satisfaction: "35% increase",
        automation: "80% of inquiries"
      }
    }
  ];

  const pricingPlans = [
    {
      id: "starter",
      name: "Starter",
      price: 297,
      description: "Perfect for small businesses",
      features: ["1 AI Agent", "Up to 3 team seats", "500 monthly tasks", "Email support"],
      popular: false
    },
    {
      id: "growth",
      name: "Growth",
      price: 697,
      description: "For scaling businesses",
      features: ["Up to 3 AI Agents", "Unlimited team seats", "5,000 monthly tasks", "Priority support"],
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 1497,
      description: "For established businesses",
      features: ["All AI Agents", "Unlimited team seats", "20,000 monthly tasks", "Dedicated support"],
      popular: false
    }
  ];

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
          <h1 className="text-4xl font-bold text-navy-900 mb-2">Add AI Agents</h1>
          <p className="text-xl text-gray-600">Choose the AI agents that best fit your business needs</p>
        </div>

        {/* Pricing Plans */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-navy-900 mb-6">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 cursor-pointer transition-all duration-200 hover:shadow-xl ${
                  selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''
                } ${plan.popular ? 'scale-105' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-orange-500/40 to-red-500/40 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-navy-900">${plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    selectedPlan === plan.id
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Agents */}
        <div>
          <h2 className="text-2xl font-semibold text-navy-900 mb-6">Available AI Agents</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allAgents.map((agent) => (
              <div 
                key={agent.id} 
                className={`bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 transition-all duration-200 hover:shadow-xl ${
                  agent.status === 'locked' ? 'opacity-60' : 'hover:scale-105'
                }`}
              >
                {/* Agent Header */}
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    agent.status === 'locked' ? 'bg-gray-200' : 
                    agent.color === 'blue' ? 'bg-blue-100' :
                    agent.color === 'purple' ? 'bg-purple-100' :
                    agent.color === 'green' ? 'bg-green-100' :
                    agent.color === 'orange' ? 'bg-orange-100' :
                    agent.color === 'indigo' ? 'bg-indigo-100' :
                    'bg-cyan-100'
                  }`}>
                    <agent.icon className={`h-8 w-8 ${
                      agent.status === 'locked' ? 'text-gray-400' :
                      agent.color === 'blue' ? 'text-blue-600' :
                      agent.color === 'purple' ? 'text-purple-600' :
                      agent.color === 'green' ? 'text-green-600' :
                      agent.color === 'orange' ? 'text-orange-600' :
                      agent.color === 'indigo' ? 'text-indigo-600' :
                      'text-cyan-600'
                    }`} />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-1">{agent.name}</h3>
                  <p className="text-gray-600 font-medium">{agent.role}</p>
                  {agent.status === 'locked' && (
                    <div className="mt-2 px-3 py-1 bg-gray-100 rounded-full inline-block">
                      <span className="text-xs text-gray-500">Requires Upgrade</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {agent.description}
                </p>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-navy-900 mb-3 text-sm">Key Features:</h4>
                  <ul className="space-y-1">
                    {agent.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 gap-2 text-center">
                    {Object.entries(agent.stats).map(([key, value], index) => (
                      <div key={index} className="text-xs">
                        <span className="font-semibold text-navy-900">{value}</span>
                        <span className="text-gray-600 ml-1">
                          {key === 'timeSaved' ? 'time saved' : 
                           key === 'accuracy' ? 'accuracy' :
                           key === 'costReduction' ? 'cost reduction' :
                           key === 'efficiency' ? 'efficiency boost' :
                           key === 'leads' ? 'more leads' :
                           key === 'conversion' ? 'conversion rate' :
                           key === 'defects' ? 'fewer defects' :
                           key === 'costSavings' ? 'cost savings' :
                           key === 'compliance' ? 'compliance' :
                           key === 'auditTime' ? 'audit prep time' :
                           key === 'violations' ? 'compliance violations' :
                           key === 'responseTime' ? 'faster response' :
                           key === 'satisfaction' ? 'satisfaction boost' :
                           key === 'automation' ? 'automated' : key}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                {agent.status === 'active' ? (
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Already Active
                  </button>
                ) : (
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Agent
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Deploy Your AI Workforce?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join hundreds of businesses already transforming their operations with our complete AI workforce.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-200">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



























