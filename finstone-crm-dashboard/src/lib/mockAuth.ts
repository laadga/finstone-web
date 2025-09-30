// Mock authentication system for demo purposes
// TODO: Replace with real authentication when connecting to actual backend

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'sales' | 'support';
  avatar: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Demo users
export const DEMO_USERS: User[] = [
  {
    id: 'u_admin',
    name: 'Alex Founder',
    email: 'admin@finstone.test',
    role: 'admin',
    avatar: 'AF'
  },
  {
    id: 'u_sales',
    name: 'Maya Sales',
    email: 'sales@finstone.test',
    role: 'sales',
    avatar: 'MS'
  },
  {
    id: 'u_support',
    name: 'Jon Support',
    email: 'support@finstone.test',
    role: 'support',
    avatar: 'JS'
  }
];

// Mock session storage key
const SESSION_KEY = 'finstone_crm_session';

// Get current user from localStorage
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Set current user in localStorage
export function setCurrentUser(user: User): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error setting current user:', error);
  }
}

// Clear current user from localStorage
export function clearCurrentUser(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Error clearing current user:', error);
  }
}

// Mock login function
export function mockLogin(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      const user = DEMO_USERS.find(u => u.email === email);
      
      if (user && password === 'password') {
        setCurrentUser(user);
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
}

// Mock logout function
export function mockLogout(): Promise<void> {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      clearCurrentUser();
      resolve();
    }, 200);
  });
}

// Check if user has permission for a role
export function hasPermission(user: User | null, requiredRole: 'admin' | 'sales' | 'support'): boolean {
  if (!user) return false;
  
  const roleHierarchy = {
    admin: ['admin', 'sales', 'support'],
    sales: ['sales'],
    support: ['support']
  };
  
  return roleHierarchy[user.role].includes(requiredRole);
}

// Get user display name
export function getUserDisplayName(user: User | null): string {
  return user ? user.name : 'Guest';
}

// Get user initials for avatar
export function getUserInitials(user: User | null): string {
  if (!user) return 'G';
  return user.avatar || user.name.split(' ').map(n => n[0]).join('').toUpperCase();
}

// Mock session validation
export function validateSession(): Promise<User | null> {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const user = getCurrentUser();
      resolve(user);
    }, 100);
  });
}

// Auto-login for demo purposes
export function autoLogin(): Promise<User> {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const adminUser = DEMO_USERS.find(u => u.role === 'admin')!;
      setCurrentUser(adminUser);
      resolve(adminUser);
    }, 300);
  });
}





















