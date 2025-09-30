"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  TrendingUp, 
  Megaphone, 
  Headphones, 
  Settings, 
  FileText, 
  Shield,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface PersistentNavigationProps {
  className?: string;
}

export const PersistentNavigation: React.FC<PersistentNavigationProps> = ({ className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const navigationItems = [
    {
      id: 'ai',
      label: 'AI Agents',
      icon: Bot,
      href: '/#ai-agents',
      color: 'from-blue-500 to-indigo-600',
      description: 'Core AI workforce'
    },
    {
      id: 'sales',
      label: 'Sales',
      icon: TrendingUp,
      href: '/#sales',
      color: 'from-green-500 to-emerald-600',
      description: 'Lead generation & sales'
    },
    {
      id: 'marketing',
      label: 'Marketing',
      icon: Megaphone,
      href: '/#marketing',
      color: 'from-purple-500 to-violet-600',
      description: 'Content & campaigns'
    },
    {
      id: 'support',
      label: 'Support',
      icon: Headphones,
      href: '/#support',
      color: 'from-orange-500 to-red-600',
      description: 'Customer service'
    },
    {
      id: 'ops',
      label: 'Operations',
      icon: Settings,
      href: '/#operations',
      color: 'from-cyan-500 to-blue-600',
      description: 'Business operations'
    },
    {
      id: 'compliance',
      label: 'Compliance',
      icon: Shield,
      href: '/#compliance',
      color: 'from-indigo-500 to-purple-600',
      description: 'Legal & compliance'
    },
    {
      id: 'document',
      label: 'Document Ops',
      icon: FileText,
      href: '/#document-ops',
      color: 'from-teal-500 to-green-600',
      description: 'Document management'
    }
  ];

  const handleItemClick = (itemId: string) => {
    setActiveSection(activeSection === itemId ? null : itemId);
  };

  return (
    <div className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-40 ${className}`}>
      {/* Collapsed State - Vertical Menu */}
      {!isExpanded && (
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl p-2">
          <div className="flex flex-col space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group relative p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105"
                onMouseEnter={() => setActiveSection(item.id)}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-lg`}>
                  <item.icon className="w-4 h-4" />
                </div>
                
                {/* Tooltip */}
                {activeSection === item.id && (
                  <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-50">
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-xs text-gray-300">{item.description}</div>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </Link>
            ))}
            
            {/* Expand Button */}
            <button
              onClick={() => setIsExpanded(true)}
              className="p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105 group"
            >
              <ChevronDown className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
            </button>
          </div>
        </div>
      )}

      {/* Expanded State - Full Menu */}
      {isExpanded && (
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl p-4 w-80 animate-in slide-in-from-left-2 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">AI Workforce</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronUp className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 group-hover:text-gray-900">
                    {item.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {item.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm font-semibold text-gray-800 mb-3">Quick Actions</div>
            <div className="space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700"
              >
                <Settings className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                href="/pricing"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700"
              >
                <TrendingUp className="w-4 h-4" />
                Pricing
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};









