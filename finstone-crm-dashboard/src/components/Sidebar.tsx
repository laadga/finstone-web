import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  CreditCard, 
  Rocket, 
  Bot, 
  CheckSquare, 
  Headphones, 
  Link, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  currentPage: string;
  onNavigate: (page: string) => void;
  onToggle: () => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'leads', label: 'Leads', icon: Users, path: '/leads' },
  { id: 'customers', label: 'Customers', icon: Building2, path: '/customers' },
  { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard, path: '/subscriptions' },
  { id: 'onboarding', label: 'Onboarding', icon: Rocket, path: '/onboarding' },
  { id: 'provisioning', label: 'Agents', icon: Bot, path: '/provisioning' },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare, path: '/tasks' },
  { id: 'support', label: 'Support', icon: Headphones, path: '/support' },
  { id: 'integrations', label: 'Integrations', icon: Link, path: '/integrations' },
  { id: 'reports', label: 'Reports', icon: BarChart3, path: '/reports' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

export function Sidebar({ collapsed, currentPage, onNavigate, onToggle }: SidebarProps) {
  return (
    <div className={cn(
      'bg-white border-r border-gray-200 flex flex-col transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Finstone</h1>
                <p className="text-xs text-gray-500">CRM Dashboard</p>
              </div>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors focus-ring"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.path)}
                  className={cn(
                    'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group',
                    isActive
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className={cn(
                    'w-5 h-5 transition-colors',
                    isActive ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-700'
                  )} />
                  {!collapsed && (
                    <span className="ml-3">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>Finstone CRM v1.0</p>
            <p className="mt-1">© 2025 Finstone AI</p>
          </div>
        </div>
      )}
    </div>
  );
}





















