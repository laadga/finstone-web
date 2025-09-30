"use client";

import { Header } from "@/components/ui/header";
import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  DollarSign, 
  AlertTriangle, 
  Clock, 
  Shield,
  CheckCircle,
  ArrowRight,
  Users,
  Target,
  Zap,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { SplineSceneFinance } from "@/components/ui/spline-finance";

export default function FinanceAgentPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Real-time Financial Monitoring",
      description: "Track your financial health 24/7 with automated monitoring of cash flow, revenue, and expenses. Get instant alerts when metrics deviate from expected ranges."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      title: "Automated Financial Reporting",
      description: "Generate comprehensive financial reports automatically. From P&L statements to balance sheets, your reports are always up-to-date and accurate."
    },
    {
      icon: <DollarSign className="h-8 w-8 text-yellow-600" />,
      title: "Cost Optimization",
      description: "Identify cost-saving opportunities and optimize your spending. Our AI analyzes patterns to suggest where you can reduce expenses without impacting operations."
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-red-600" />,
      title: "Risk Management",
      description: "Proactively identify financial risks and anomalies. Get early warnings about potential issues before they become major problems."
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-600" />,
      title: "Time Savings",
      description: "Save 15-20 hours per week on financial tasks. Focus on strategic decisions while our AI handles routine financial analysis and reporting."
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      title: "Compliance & Accuracy",
      description: "Ensure 100% accuracy in financial calculations and maintain compliance with accounting standards. Reduce human error and audit risks."
    }
  ];

  const features = [
    "Automated P&L statement generation",
    "Real-time cash flow monitoring",
    "Expense categorization and tracking",
    "Budget vs actual analysis",
    "Financial forecasting and projections",
    "Integration with QuickBooks, Xero, and other accounting software",
    "Custom KPI tracking and alerts",
    "Automated invoice processing",
    "Tax preparation assistance",
    "Financial dashboard and visualizations"
  ];

  const useCases = [
    {
      title: "Small Business Owner",
      scenario: "Running a consulting firm with 10 employees",
      result: "Saves 20 hours/week on financial tasks, improved cash flow visibility by 40%, reduced accounting errors by 95%"
    },
    {
      title: "E-commerce Store",
      scenario: "Managing multiple revenue streams and inventory costs",
      result: "Automated expense tracking saved $15,000 annually, real-time profit margin monitoring increased profitability by 25%"
    },
    {
      title: "SaaS Startup",
      scenario: "Tracking MRR, churn, and customer acquisition costs",
      result: "Automated financial reporting reduced reporting time by 80%, improved investor communication with real-time metrics"
    }
  ];

  return (
    <main className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
      </div>

      <Header isScrolled={isScrolled} />

      {/* Hero Section with 3D Robot */}
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              <DollarSign className="h-4 w-4 mr-2" />
              Finance Agent
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-navy-900 mb-6">
              Your AI Financial
              <span className="block text-blue-600">CFO Assistant</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Transform your financial management with our AI-powered Finance Agent. 
              Get real-time insights, automated reporting, and intelligent cost optimization 
              that saves you time and money.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#pricing" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Get Started Today
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="#demo" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                Watch Demo
              </Link>
            </div>
          </div>
          
          {/* 3D Robot Scene */}
          <div className="relative h-96 w-full max-w-4xl mx-auto">
            <SplineSceneFinance />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Why Choose Our Finance Agent?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered Finance Agent doesn't just crunch numbers, it provides intelligent insights 
              that help you make better financial decisions and grow your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
                <div className="mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Complete Financial Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your finances intelligently, all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg">{feature}</span>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">
                Integration Ready
              </h3>
              <p className="text-gray-600 mb-6">
                Seamlessly connects with your existing financial tools and workflows.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">QuickBooks & Xero</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Banking APIs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">CRM Systems</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Custom APIs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Real Results from Real Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how businesses like yours are transforming their financial management.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200/50">
                <h3 className="text-xl font-semibold text-navy-900 mb-2">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {useCase.scenario}
                </p>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-green-800 font-medium">
                    {useCase.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Financial Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of businesses already saving time and money with our Finance Agent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#pricing" 
              className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              View Pricing Plans
              <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/#contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
