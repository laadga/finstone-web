"use client";

import { Header } from "@/components/ui/header";
import { useState, useEffect } from 'react';
import { 
  Headphones, 
  MessageCircle, 
  Clock, 
  Star, 
  Users, 
  Zap,
  CheckCircle,
  ArrowRight,
  Target,
  Shield,
  BarChart3,
  Mail
} from "lucide-react";
import Link from "next/link";
import { SplineSceneCustomerOps } from "@/components/ui/spline-customer-ops";

export default function CustomerOpsAgentPage() {
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
      icon: <Headphones className="h-8 w-8 text-blue-600" />,
      title: "24/7 Customer Support",
      description: "Provide round-the-clock customer support with intelligent AI that can handle inquiries, resolve issues, and escalate when needed."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-green-600" />,
      title: "Multi-Channel Communication",
      description: "Manage customer interactions across email, chat, phone, and social media. Provide consistent, high-quality support on every channel."
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-600" />,
      title: "Instant Response Times",
      description: "Respond to customer inquiries instantly, 24/7. Reduce wait times and improve customer satisfaction with immediate AI-powered responses."
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-600" />,
      title: "Personalized Service",
      description: "Deliver personalized customer experiences based on purchase history, preferences, and previous interactions. Make every customer feel valued."
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "Intelligent Routing",
      description: "Automatically route complex issues to the right human agents while handling routine inquiries with AI. Optimize your team's efficiency."
    },
    {
      icon: <Zap className="h-8 w-8 text-indigo-600" />,
      title: "Issue Resolution",
      description: "Resolve common customer issues automatically. From returns and refunds to account updates, handle routine tasks without human intervention."
    }
  ];

  const features = [
    "24/7 automated customer support",
    "Multi-channel communication management",
    "Intelligent ticket routing and prioritization",
    "Automated issue resolution and escalation",
    "Customer sentiment analysis and monitoring",
    "Knowledge base management and updates",
    "Order tracking and status updates",
    "Return and refund processing automation",
    "Customer feedback collection and analysis",
    "Integration with CRM and support tools"
  ];

  const useCases = [
    {
      title: "E-commerce Store",
      scenario: "Handling customer inquiries, order issues, and returns for online retail",
      result: "Reduced response time by 90%, increased customer satisfaction by 35%, handled 80% of inquiries without human intervention"
    },
    {
      title: "SaaS Company",
      scenario: "Providing technical support and onboarding assistance for software users",
      result: "Improved customer onboarding success by 60%, reduced support ticket volume by 50%, increased user retention by 25%"
    },
    {
      title: "Service Business",
      scenario: "Managing appointment scheduling and customer inquiries for professional services",
      result: "Automated 70% of customer interactions, reduced scheduling errors by 95%, improved customer experience scores by 40%"
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
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-100 text-cyan-800 text-sm font-medium mb-6">
              <Headphones className="h-4 w-4 mr-2" />
              Customer Ops Agent
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-navy-900 mb-6">
              Your AI Customer
              <span className="block text-cyan-600">Operations Expert</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Deliver exceptional customer experiences with our intelligent Customer Ops Agent. 
              Provide 24/7 support, resolve issues instantly, and keep your customers happy and loyal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#pricing" 
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Get Started Today
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="#demo" 
                className="border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                Watch Demo
              </Link>
            </div>
          </div>
          
          {/* 3D Robot Scene */}
          <div className="relative h-96 w-full max-w-4xl mx-auto">
            <SplineSceneCustomerOps />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Why Choose Our Customer Ops Agent?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered Customer Ops Agent transforms customer service, 
              delivering faster responses and higher satisfaction while reducing costs.
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
              Complete Customer Operations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to deliver exceptional customer experiences.
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
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">
                Seamless Integration
              </h3>
              <p className="text-gray-600 mb-6">
                Works with your existing customer service tools and platforms.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Zendesk & Freshdesk</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Intercom & Drift</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Slack & Microsoft Teams</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">CRM & Help Desk Systems</span>
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
              See how businesses like yours are transforming their customer service.
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
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Customer Service?
          </h2>
          <p className="text-xl text-cyan-100 mb-8">
            Join hundreds of businesses already delivering exceptional customer experiences with our Customer Ops Agent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#pricing" 
              className="bg-white text-cyan-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              View Pricing Plans
              <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/#contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
