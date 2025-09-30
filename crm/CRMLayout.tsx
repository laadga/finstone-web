"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuItem, 
//   DropdownMenuLabel, 
//   DropdownMenuSeparator, 
//   DropdownMenuTrigger 
// } from '@/components/ui/dropdown-menu';
// import { 
//   Sidebar, 
//   SidebarContent, 
//   SidebarHeader, 
//   SidebarMenu, 
//   SidebarMenuItem, 
//   SidebarMenuButton,
//   SidebarTrigger 
// } from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  CreditCard, 
  Settings, 
  LogOut, 
  Menu,
  Bell,
  Search,
  HelpCircle,
  BarChart3,
  FileText,
  Zap,
  MessageSquare,
  Shield,
  UserPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CRMLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'sales', 'support'],
  },
  {
    title: 'Leads',
    href: '/dashboard/leads',
    icon: UserPlus,
    roles: ['admin', 'sales'],
  },
  {
    title: 'Customers',
    href: '/dashboard/customers',
    icon: Users,
    roles: ['admin', 'sales', 'support'],
  },
  {
    title: 'Subscriptions',
    href: '/dashboard/billing',
    icon: CreditCard,
    roles: ['admin', 'sales'],
  },
  {
    title: 'Onboarding',
    href: '/dashboard/onboarding',
    icon: UserCheck,
    roles: ['admin', 'sales', 'support'],
  },
  {
    title: 'Agent Management',
    href: '/dashboard/agents',
    icon: Zap,
    roles: ['admin', 'sales', 'support'],
  },
  {
    title: 'Tasks & Notes',
    href: '/dashboard/tasks',
    icon: FileText,
    roles: ['admin', 'sales', 'support'],
  },
  {
    title: 'Support',
    href: '/dashboard/support',
    icon: MessageSquare,
    roles: ['admin', 'support'],
  },
  {
    title: 'Integrations',
    href: '/dashboard/integrations',
    icon: BarChart3,
    roles: ['admin', 'sales'],
  },
  {
    title: 'Audit Logs',
    href: '/dashboard/audit',
    icon: Shield,
    roles: ['admin'],
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    roles: ['admin'],
  },
];

export const CRMLayout: React.FC<CRMLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return null;
  }

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(user.role)
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-blue to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Finstone CRM</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Help */}
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>

            {/* User Menu - Simplified */}
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-accent-blue text-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
            </div>
            
            <nav className="flex-1 px-4 pb-4">
              <ul className="space-y-1">
                {filteredNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
