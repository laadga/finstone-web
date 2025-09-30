"use client";

import { useState } from 'react';
import { 
  ArrowLeft, 
  MessageCircle, 
  Mail, 
  Phone,
  Search,
  HelpCircle,
  BookOpen,
  Video,
  FileText,
  Send,
  Bot,
  Clock,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

export default function Support() {
  const [activeTab, setActiveTab] = useState('help');
  const [message, setMessage] = useState('');

  const helpCategories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      articles: [
        "How to set up your first AI agent",
        "Understanding agent capabilities",
        "Best practices for agent management",
        "Integrating with your existing tools"
      ]
    },
    {
      title: "Agent Management",
      icon: Bot,
      articles: [
        "Adding new agents to your account",
        "Configuring agent settings",
        "Monitoring agent performance",
        "Troubleshooting agent issues"
      ]
    },
    {
      title: "Billing & Account",
      icon: FileText,
      articles: [
        "Understanding your billing cycle",
        "Upgrading or downgrading plans",
        "Managing payment methods",
        "Account security settings"
      ]
    },
    {
      title: "Technical Support",
      icon: HelpCircle,
      articles: [
        "API documentation and integration",
        "Data export and backup",
        "System requirements",
        "Performance optimization"
      ]
    }
  ];

  const faqs = [
    {
      question: "How do I use the AI Agents?",
      answer: "You simply log in to your dashboard, select the agents you've subscribed to, and start interacting with them. Agents are designed with simple, intuitive chat and workflow interfaces so you can integrate them into your daily operations immediately with no technical skills required."
    },
    {
      question: "Do I need to install anything?",
      answer: "No. Everything runs directly in your browser. You'll have a secure login to access your personalized dashboard from anywhere."
    },
    {
      question: "Can I customize the agents for my business?",
      answer: "Yes. While each agent comes pre-trained for specific tasks, we also offer customization options to adapt to your workflows, data, and goals. This ensures they add real value to your business operations."
    },
    {
      question: "How do AI Agents compare to hiring real employees?",
      answer: "AI Agents are not a replacement for human creativity and leadership. They're designed to handle repetitive, time-intensive work like reporting, scheduling, financial monitoring, and lead generation. This reduces costs, boosts efficiency, and lets your human team focus on higher-value tasks."
    },
    {
      question: "Is my data secure?",
      answer: "Yes. We use enterprise-grade encryption and follow strict data protection standards. Your information and business processes remain private and secure."
    },
    {
      question: "Do I need to be tech-savvy to use it?",
      answer: "Not at all. We designed the platform with simplicity in mind. If you can use email or chat, you can use AI Agents."
    },
    {
      question: "What if I want help beyond AI Agents?",
      answer: "We also offer consulting services, including full financial systems audits and tailored automation strategies. If you want more than \"off-the-shelf AI,\" we'll work with you directly to build custom solutions."
    },
    {
      question: "What results can I expect?",
      answer: "Most clients see immediate time savings and measurable cost reductions within the first month. Over time, AI Agents help scale operations, reduce overhead, and improve profitability."
    }
  ];

  const recentTickets = [
    {
      id: "T-001",
      subject: "Agent not responding to commands",
      status: "open",
      priority: "high",
      created: "2 hours ago"
    },
    {
      id: "T-002",
      subject: "Billing question about upgrade",
      status: "resolved",
      priority: "medium",
      created: "1 day ago"
    },
    {
      id: "T-003",
      subject: "Integration with Salesforce",
      status: "in-progress",
      priority: "low",
      created: "3 days ago"
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
          <h1 className="text-4xl font-bold text-navy-900 mb-2">Support Center</h1>
          <p className="text-xl text-gray-600">Get help with your AI agents and account</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 text-center">
            <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-navy-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Get instant help from our support team</p>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors">
              Start Chat
            </button>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 text-center">
            <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-navy-900 mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">Send us a detailed message</p>
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors">
              Send Email
            </button>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 text-center">
            <Phone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-navy-900 mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-4">Call us for urgent issues</p>
            <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-600 transition-colors">
              Call Now
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search help articles, FAQs, and documentation..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/90 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'help', label: 'Help Center' },
                { id: 'faq', label: 'FAQ' },
                { id: 'tickets', label: 'My Tickets' },
                { id: 'contact', label: 'Contact Us' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'help' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {helpCategories.map((category, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
                  <div className="flex items-center mb-4">
                    <category.icon className="h-8 w-8 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold text-navy-900">{category.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <a href="#" className="text-blue-600 hover:text-blue-700 text-sm">
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
                <h3 className="text-lg font-semibold text-navy-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-navy-900">Support Tickets</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  New Ticket
                </button>
              </div>
              
              <div className="space-y-4">
                {recentTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-navy-900">{ticket.subject}</h4>
                        <p className="text-sm text-gray-600">Ticket #{ticket.id} • {ticket.created}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ticket.status === 'open' ? 'bg-red-100 text-red-800' :
                        ticket.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {ticket.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                        ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
              <h2 className="text-2xl font-semibold text-navy-900 mb-6">Contact Support</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-4">Send us a message</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="What can we help you with?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Urgent</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe your issue in detail..."
                      ></textarea>
                    </div>
                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                      Send Message
                    </button>
                  </form>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-4">Other ways to reach us</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-navy-900">Email</p>
                        <p className="text-sm text-gray-600">support@finstone.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-navy-900">Phone</p>
                        <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-navy-900">Hours</p>
                        <p className="text-sm text-gray-600">Mon-Fri 9AM-6PM EST</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
