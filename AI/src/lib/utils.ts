import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  return formatDate(dateString);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getStatusColor(status: string): {
  bg: string;
  text: string;
  border: string;
} {
  switch (status.toLowerCase()) {
    case 'new':
      return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' };
    case 'contacted':
      return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' };
    case 'demo scheduled':
      return { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' };
    case 'proposal sent':
      return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' };
    case 'qualified':
      return { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200' };
    case 'won':
      return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' };
    case 'lost':
      return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
    case 'active':
      return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' };
    case 'trialing':
      return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' };
    case 'provisioned':
      return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' };
    case 'provisioning':
      return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' };
    case 'failed':
      return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' };
    case 'queued':
      return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
    case 'connected':
      return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' };
    case 'available':
      return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
  }
}

export function getSourceIcon(source: string): string {
  switch (source.toLowerCase()) {
    case 'linkedin outreach':
      return '💼';
    case 'cold email':
      return '📧';
    case 'website':
      return '🌐';
    case 'referral':
      return '👥';
    case 'event':
      return '🎪';
    case 'social media':
      return '📱';
    case 'paid ads':
      return '📢';
    default:
      return '📞';
  }
}

export function calculateOnboardingProgress(steps: any[]): number {
  if (!steps || steps.length === 0) return 0;
  const completedSteps = steps.filter(step => step.done).length;
  return Math.round((completedSteps / steps.length) * 100);
}

export function generateSparklineData(data: number[]): string {
  if (!data || data.length < 2) return '';
  
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');
  
  return points;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}