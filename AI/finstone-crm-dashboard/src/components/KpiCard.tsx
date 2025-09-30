import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn, formatCurrency, generateSparklineData } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: number | string;
  sparklineData?: number[];
  trend?: number;
  subtitle?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  className?: string;
}

export function KpiCard({
  title,
  value,
  sparklineData,
  trend,
  subtitle,
  color = 'blue',
  className
}: KpiCardProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      sparkline: '#3B82F6'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-600',
      sparkline: '#10B981'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
      sparkline: '#8B5CF6'
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-600',
      sparkline: '#F59E0B'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-600',
      sparkline: '#EF4444'
    }
  };

  const colors = colorClasses[color];
  const sparklinePoints = sparklineData ? generateSparklineData(sparklineData) : '';

  return (
    <div
      className={cn(
        'card p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {trend !== undefined && (
          <div className={cn(
            'flex items-center space-x-1 text-sm font-medium',
            trend >= 0 ? 'text-green-600' : 'text-red-600'
          )}>
            {trend >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900">
          {typeof value === 'number' ? formatCurrency(value) : value}
        </div>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>

      {/* Sparkline */}
      {sparklineData && sparklinePoints && (
        <div className="h-12 w-full">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            className="overflow-visible"
            preserveAspectRatio="none"
          >
            <polyline
              points={sparklinePoints}
              fill="none"
              stroke={colors.sparkline}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

// Loading skeleton for KPI cards
export function KpiCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('card p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="skeleton h-4 w-20"></div>
        <div className="skeleton h-4 w-12"></div>
      </div>
      
      <div className="mb-4">
        <div className="skeleton h-8 w-24 mb-2"></div>
        <div className="skeleton h-3 w-16"></div>
      </div>
      
      <div className="skeleton h-12 w-full"></div>
    </div>
  );
}





















