"use client";

import { Header } from "@/components/ui/header";
import { useState, useEffect } from 'react';
import { 
  Calendar, 
  FileText, 
  Users, 
  Clock, 
  CheckSquare, 
  Mail,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  BookOpen,
  Shield
} from "lucide-react";
import Link from "next/link";
import { SplineSceneAdmin } from "@/components/ui/spline-admin";

export default function AdminAgentPage() {
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
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      title: "Smart Scheduling & Calendar Management",
      description: "Automatically schedule meetings, manage calendars, and coordinate team availability. Never miss an important appointment or double-book again."
    },
    {
      icon: <FileText className="h-8 w-8 text-green-600" />,
      title: "Document Management & Organization",
      description: "Automatically organize, categorize, and manage all your business documents. Find any file instantly with intelligent search and tagging."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Team Coordination",
      description: "Streamline team communication, task assignments, and project coordination. Keep everyone aligned and productive with automated workflows."
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-600" />,
      title: "Time Management",
      description: "Optimize your daily schedule and identify time-wasting activities. Get personalized recommendations for better productivity and work-life balance."
    },
    {
      icon: <CheckSquare className="h-8 w-8 text-indigo-600" />,
      title: "Task Automation",
      description: "Automate repetitive administrative tasks like data entry, form processing, and routine follow-ups. Focus on high-value work while AI handles the rest."
    },
    {
      icon: <Mail className="h-8 w-8 text-red-600" />,
      title: "Communication Management",
      description: "Smart email management, automated responses, and intelligent prioritization. Never miss important communications or get overwhelmed by your inbox."
    }
  ];

  const features = [
    "Automated calendar scheduling and conflict resolution",
    "Document organization and intelligent filing",
    "Email management and prioritization",
    "Task assignment and progress tracking",
    "Meeting coordination and preparation",
    "Data entry and form processing automation",
    "Team communication and collaboration tools",
    "Expense tracking and reimbursement management",
    "Travel planning and booking assistance",
    "Report generation and data compilation"
  ];

  const useCases = [
    {
      title: "Executive Assistant",
      scenario: "Managing calendar for C-level executive with 50+ meetings per week",
      result: "Reduced scheduling conflicts by 90%, saved 25 hours/week on administrative tasks, improved meeting efficiency by 40%"
    },
    {
      title: "Small Business Owner",
      scenario: "Handling all administrative tasks for growing 20-person team",
      result: "Automated 80% of routine tasks, improved team productivity by 35%, reduced administrative overhead by $50,000 annually"
    },
    {
      title: "Project Manager",
      scenario: "Coordinating multiple projects and team communications",
      result: "Streamlined project coordination, reduced miscommunication by 60%, improved project delivery time by 25%"
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
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-6">
              <Users className="h-4 w-4 mr-2" />
              Admin Agent
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-navy-900 mb-6">
              Your AI Administrative
              <span className="block text-purple-600">Assistant</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Streamline your administrative tasks with our intelligent Admin Agent. 
              From scheduling to document management, let AI handle the routine work 
              so you can focus on what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#pricing" 
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Get Started Today
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="#demo" 
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                Watch Demo
              </Link>
            </div>
          </div>
          
          {/* 3D Robot Scene */}
          <div className="relative h-96 w-full max-w-4xl mx-auto">
            <SplineSceneAdmin />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Why Choose Our Admin Agent?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered Admin Agent transforms how you handle administrative tasks, 
              making your business more efficient and organized than ever before.
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
              Complete Administrative Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your business administration efficiently, all in one place.
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
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">
                Seamless Integration
              </h3>
              <p className="text-gray-600 mb-6">
                Works with your existing tools and workflows for maximum efficiency.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Google Workspace & Microsoft 365</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Slack & Teams</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Project Management Tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">CRM & ERP Systems</span>
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
              See how businesses like yours are transforming their administrative efficiency.
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
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Streamline Your Administration?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join hundreds of businesses already saving time and improving efficiency with our Admin Agent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#pricing" 
              className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              View Pricing Plans
              <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/#contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
