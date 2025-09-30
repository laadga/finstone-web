"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/admin/dashboard' },
  { id: 'leads', label: 'Leads', icon: '👥', path: '/admin/leads' },
  { id: 'customers', label: 'Accounts', icon: '🏢', path: '/admin/customers' },
  { id: 'billing', label: 'Subscriptions & Billing', icon: '💳', path: '/admin/billing' },
  { id: 'onboarding', label: 'Onboarding', icon: '🚀', path: '/admin/onboarding' },
  { id: 'agents', label: 'Agents Provisioning', icon: '🤖', path: '/admin/agents' },
  { id: 'tasks', label: 'Tasks', icon: '✅', path: '/admin/tasks' },
  { id: 'support', label: 'Support Inbox', icon: '🎧', path: '/admin/support' },
  { id: 'integrations', label: 'Integrations', icon: '🔗', path: '/admin/integrations' },
  { id: 'reports', label: 'Reports', icon: '📈', path: '/admin/reports' },
  { id: 'settings', label: 'Settings / Team', icon: '⚙️', path: '/admin/settings' },
];

export default function DashboardLayout({ children, currentPage = 'dashboard' }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleLogout = () => {
    router.push('/admin/login');
  };

  const getPageTitle = () => {
    const item = navigationItems.find(nav => nav.id === currentPage);
    return item ? item.label : 'Dashboard';
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #DBEAFE 0%, #EFF6FF 50%, #E5E7EB 100%)'
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarCollapsed ? '60px' : '240px',
        backgroundColor: 'white',
        borderRight: '1px solid #E5E7EB',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Logo */}
        <div style={{
          padding: '16px',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarCollapsed ? 'center' : 'space-between'
        }}>
          {!sidebarCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #3ABEFF 0%, #2563EB 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                F
              </div>
              <span style={{ fontWeight: '600', color: '#111827' }}>Finstone CRM</span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              color: '#6B7280'
            }}
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '8px' }}>
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                marginBottom: '4px',
                borderRadius: '8px',
                border: 'none',
                background: currentPage === item.id ? '#3ABEFF' : 'transparent',
                color: currentPage === item.id ? 'white' : '#374151',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: currentPage === item.id ? '500' : '400',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                if (currentPage !== item.id) {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                }
              }}
              onMouseOut={(e) => {
                if (currentPage !== item.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <header style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #E5E7EB',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Left: Page Title */}
          <div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#111827',
              margin: 0
            }}>
              {getPageTitle()}
            </h1>
          </div>

          {/* Center: Search */}
          <div style={{ flex: 1, maxWidth: '400px', margin: '0 24px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search leads, customers, agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: '#F9FAFB'
                }}
              />
              <span style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6B7280'
              }}>
                🔍
              </span>
            </div>
          </div>

          {/* Right: Notifications & User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Notifications */}
            <button style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              color: '#6B7280'
            }}>
              🔔
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                backgroundColor: '#EF4444',
                borderRadius: '50%'
              }} />
            </button>

            {/* User Menu */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#3ABEFF',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                AF
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                  Alex Founder
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>
                  admin@finstone.test
                </div>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                  color: '#6B7280'
                }}
              >
                ⚙️
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main style={{ 
          flex: 1, 
          padding: '24px', 
          overflow: 'auto',
          background: 'transparent'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
