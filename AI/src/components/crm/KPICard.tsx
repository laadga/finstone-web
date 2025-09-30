"use client";

import React from 'react';

interface KPICardProps {
  title: string;
  primaryNumber: string | number;
  trendPercent?: number;
  sparklineData?: number[];
  subtitle?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export default function KPICard({ 
  title, 
  primaryNumber, 
  trendPercent, 
  sparklineData, 
  subtitle,
  color = 'blue'
}: KPICardProps) {
  const colorClasses = {
    blue: { bg: '#3ABEFF', light: '#EBF8FF' },
    green: { bg: '#10B981', light: '#ECFDF5' },
    purple: { bg: '#8B5CF6', light: '#F3E8FF' },
    orange: { bg: '#F59E0B', light: '#FFFBEB' },
    red: { bg: '#EF4444', light: '#FEF2F2' }
  };

  const colors = colorClasses[color];

  // Simple sparkline component
  const Sparkline = ({ data }: { data: number[] }) => {
    if (!data || data.length < 2) return null;
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width="100%" height="40" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
        <polyline
          points={points}
          fill="none"
          stroke={colors.bg}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.2s ease'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '500',
          color: '#6B7280',
          margin: 0
        }}>
          {title}
        </h3>
        {trendPercent !== undefined && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            fontWeight: '500',
            color: trendPercent >= 0 ? '#10B981' : '#EF4444'
          }}>
            <span>{trendPercent >= 0 ? '↗' : '↘'}</span>
            <span>{Math.abs(trendPercent)}%</span>
          </div>
        )}
      </div>

      {/* Main Number */}
      <div style={{
        fontSize: '32px',
        fontWeight: '700',
        color: '#111827',
        marginBottom: '8px',
        lineHeight: 1
      }}>
        {primaryNumber}
      </div>

      {/* Sparkline */}
      {sparklineData && (
        <div style={{ marginBottom: '8px' }}>
          <Sparkline data={sparklineData} />
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p style={{
          fontSize: '12px',
          color: '#6B7280',
          margin: 0
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
