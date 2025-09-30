"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Eye,
  Building,
  Users,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { mockCustomers, mockUsers, getUserById } from '@/data/mockData';
import { Customer } from '@/types/crm';

export const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contacts.some(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesStatus = statusFilter === 'all' || customer.billingStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Customer['billingStatus']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'past_due': return 'bg-red-100 text-red-800';
      case 'canceled': return 'bg-gray-100 text-gray-800';
      case 'trialing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOnboardingProgress = (customer: Customer) => {
    const completed = customer.onboardingProgress.filter(step => step.status === 'completed').length;
    const total = customer.onboardingProgress.length;
    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage your customer accounts and subscriptions</p>
        </div>
        <Button className="bg-accent-blue hover:bg-accent-blue/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-accent-blue" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total MRR</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(customers.reduce((sum, c) => sum + c.mrr, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customers.filter(c => c.billingStatus === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Onboarding</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customers.filter(c => c.billingStatus === 'trialing').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="trialing">Trialing</SelectItem>
                <SelectItem value="past_due">Past Due</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => {
          const progress = getOnboardingProgress(customer);
          const primaryContact = customer.contacts.find(c => c.isPrimary) || customer.contacts[0];
          
          return (
            <Card key={customer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-blue-600 rounded-lg flex items-center justify-center">
                      <Building className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{customer.company}</CardTitle>
                      <CardDescription>
                        {primaryContact?.name} • {primaryContact?.role}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setIsDetailDialogOpen(true);
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Plan & Status */}
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="capitalize">
                    {customer.plan}
                  </Badge>
                  <Badge className={`${getStatusColor(customer.billingStatus)} border-0`}>
                    {customer.billingStatus.replace('_', ' ')}
                  </Badge>
                </div>

                {/* MRR */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Monthly Revenue</span>
                  <span className="text-lg font-semibold text-green-600">
                    {formatCurrency(customer.mrr)}
                  </span>
                </div>

                {/* Onboarding Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Onboarding</span>
                    <span className="text-sm font-medium">{progress.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-accent-blue h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {progress.completed} of {progress.total} steps completed
                  </p>
                </div>

                {/* Next Billing */}
                {customer.nextBillingDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Next Billing</span>
                    <span className="text-sm">
                      {new Date(customer.nextBillingDate).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {/* Last Activity */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Activity</span>
                  <span className="text-sm">
                    {customer.lastActivity ? 
                      new Date(customer.lastActivity).toLocaleDateString() : 
                      'Never'
                    }
                  </span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setIsDetailDialogOpen(true);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Customer Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
              View and manage customer account information
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              {/* Company Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Company</Label>
                  <p className="text-lg font-semibold">{selectedCustomer.company}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Plan</Label>
                  <Badge variant="outline" className="capitalize">
                    {selectedCustomer.plan}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Billing Status</Label>
                  <Badge className={`${getStatusColor(selectedCustomer.billingStatus)} border-0`}>
                    {selectedCustomer.billingStatus.replace('_', ' ')}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Monthly Revenue</Label>
                  <p className="text-lg font-semibold text-green-600">
                    {formatCurrency(selectedCustomer.mrr)}
                  </p>
                </div>
              </div>

              {/* Contacts */}
              <div>
                <Label className="text-sm font-medium text-gray-500">Contacts</Label>
                <div className="mt-2 space-y-3">
                  {selectedCustomer.contacts.map((contact) => (
                    <div key={contact.id} className="p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-gray-600">{contact.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{contact.email}</p>
                          {contact.phone && <p className="text-sm text-gray-600">{contact.phone}</p>}
                        </div>
                      </div>
                      {contact.isPrimary && (
                        <Badge variant="secondary" className="mt-2">Primary Contact</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Onboarding Progress */}
              <div>
                <Label className="text-sm font-medium text-gray-500">Onboarding Progress</Label>
                <div className="mt-2 space-y-3">
                  {selectedCustomer.onboardingProgress.map((step) => (
                    <div key={step.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                      <div className="flex-shrink-0">
                        {step.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : step.status === 'in_progress' ? (
                          <Clock className="h-5 w-5 text-yellow-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{step.title}</p>
                        <p className="text-sm text-gray-600">{step.description}</p>
                        {step.dueDate && (
                          <p className="text-xs text-gray-500">
                            Due: {new Date(step.dueDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <Badge 
                        variant={
                          step.status === 'completed' ? 'default' :
                          step.status === 'in_progress' ? 'secondary' :
                          'outline'
                        }
                      >
                        {step.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agents */}
              <div>
                <Label className="text-sm font-medium text-gray-500">AI Agents</Label>
                <div className="mt-2 space-y-2">
                  {selectedCustomer.agents.length > 0 ? (
                    selectedCustomer.agents.map((agent) => (
                      <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div>
                          <p className="font-medium capitalize">{agent.agentType.replace('_', ' ')}</p>
                          <p className="text-sm text-gray-600">
                            Last run: {agent.lastRun ? new Date(agent.lastRun).toLocaleString() : 'Never'}
                          </p>
                        </div>
                        <Badge 
                          variant={
                            agent.status === 'provisioned' ? 'default' :
                            agent.status === 'provisioning' ? 'secondary' :
                            agent.status === 'failed' ? 'destructive' :
                            'outline'
                          }
                        >
                          {agent.status}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No agents provisioned yet</p>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label className="text-sm font-medium text-gray-500">Notes</Label>
                <div className="mt-2 space-y-2">
                  {selectedCustomer.notes.length > 0 ? (
                    selectedCustomer.notes.map((note) => (
                      <div key={note.id} className="p-3 bg-gray-50 rounded-md">
                        <p className="text-sm">{note.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(note.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No notes yet</p>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Close
            </Button>
            <Button className="bg-accent-blue hover:bg-accent-blue/90">
              Edit Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};





















