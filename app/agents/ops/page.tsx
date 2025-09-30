"use client";

import { Header } from "@/components/ui/header";
import { useState, useEffect } from 'react';
import { 
  Settings, 
  BarChart3, 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  Clock,
  CheckCircle,
  ArrowRight,
  Target,
  Shield,
  Users,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { SplineSceneOps } from "@/components/ui/spline-ops";

export default function OpsAgentPage() {
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
      icon: <Settings className="h-8 w-8 text-blue-600" />,
      title: "Process Optimization",
      description: "Identify bottlenecks and inefficiencies in your operations. Get AI-powered recommendations to streamline workflows and improve productivity."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      title: "Performance Monitoring",
      description: "Track key operational metrics in real-time. Monitor team performance, resource utilization, and operational efficiency with intelligent dashboards."
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-600" />,
      title: "Workflow Automation",
      description: "Automate repetitive operational tasks and processes. Reduce manual work and human error while increasing speed and accuracy."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      title: "Efficiency Analytics",
      description: "Analyze operational data to identify trends and opportunities. Make data-driven decisions to improve your business performance."
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-red-600" />,
      title: "Issue Detection & Resolution",
      description: "Proactively identify operational issues before they become problems. Get instant alerts and automated solutions for common issues."
    },
    {
      icon: <Clock className="h-8 w-8 text-indigo-600" />,
      title: "Resource Management",
      description: "Optimize resource allocation and scheduling. Ensure your team and assets are used efficiently across all projects and operations."
    }
  ];

  const features = [
    "Process mapping and optimization analysis",
    "Real-time performance monitoring and alerts",
    "Workflow automation and task management",
    "Resource allocation and scheduling optimization",
    "Quality control and compliance monitoring",
    "Supply chain and inventory management",
    "Team productivity tracking and insights",
    "Cost analysis and budget optimization",
    "Risk assessment and mitigation planning",
    "Custom reporting and analytics dashboards"
  ];

  const useCases = [
    {
      title: "Manufacturing Company",
      scenario: "Optimizing production line efficiency and quality control",
      result: "Increased production efficiency by 35%, reduced defects by 60%, saved $200,000 annually in operational costs"
    },
    {
      title: "E-commerce Business",
      scenario: "Managing inventory, fulfillment, and customer service operations",
      result: "Reduced order processing time by 50%, improved inventory accuracy by 95%, increased customer satisfaction by 40%"
    },
    {
      title: "Professional Services Firm",
      scenario: "Streamlining project delivery and resource management",
      result: "Improved project delivery time by 30%, increased billable hours by 25%, reduced operational overhead by $150,000"
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
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-6">
              <Settings className="h-4 w-4 mr-2" />
              Ops Agent
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-navy-900 mb-6">
              Your AI Operations
              <span className="block text-orange-600">Optimizer</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Streamline and optimize your business operations with our intelligent Ops Agent. 
              Identify bottlenecks, automate processes, and maximize efficiency across your entire organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#pricing" 
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Get Started Today
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="#demo" 
                className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                Watch Demo
              </Link>
            </div>
          </div>
          
          {/* 3D Robot Scene */}
          <div className="relative h-96 w-full max-w-4xl mx-auto">
            <SplineSceneOps />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Why Choose Our Ops Agent?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered Ops Agent transforms how you manage operations, 
              delivering measurable improvements in efficiency, quality, and cost savings.
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
              Complete Operations Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to optimize and manage your business operations efficiently.
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
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">
                Industry-Specific Solutions
              </h3>
              <p className="text-gray-600 mb-6">
                Tailored optimization strategies for your specific industry and business model.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Manufacturing & Production</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">E-commerce & Retail</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Professional Services</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Healthcare & Finance</span>
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
              See how businesses like yours are transforming their operations.
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
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-red-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Optimize Your Operations?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join hundreds of businesses already improving efficiency with our Ops Agent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#pricing" 
              className="bg-white text-orange-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              View Pricing Plans
              <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/#contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
