"use client";

import { Header } from "@/components/ui/header";
import { useState, useEffect } from 'react';
import { 
  Shield, 
  FileCheck, 
  AlertTriangle, 
  BookOpen, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Target,
  Users,
  Zap,
  BarChart3,
  Mail
} from "lucide-react";
import Link from "next/link";
import { SplineSceneCompliance } from "@/components/ui/spline-compliance";

export default function ComplianceAgentPage() {
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
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Regulatory Monitoring",
      description: "Stay updated on regulatory changes and requirements in real-time. Get instant alerts when new regulations affect your business."
    },
    {
      icon: <FileCheck className="h-8 w-8 text-green-600" />,
      title: "Compliance Auditing",
      description: "Automatically audit your processes and documentation for compliance. Identify gaps and ensure adherence to industry standards."
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-red-600" />,
      title: "Risk Assessment",
      description: "Proactively identify compliance risks and vulnerabilities. Get recommendations to mitigate potential issues before they become problems."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      title: "Policy Management",
      description: "Create, update, and distribute compliance policies automatically. Ensure all team members have access to current regulations and procedures."
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-600" />,
      title: "Deadline Tracking",
      description: "Never miss important compliance deadlines. Get automated reminders for filings, renewals, and regulatory submissions."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-indigo-600" />,
      title: "Documentation Management",
      description: "Maintain comprehensive compliance documentation with automated record-keeping. Ensure audit readiness at all times."
    }
  ];

  const features = [
    "Real-time regulatory change monitoring",
    "Automated compliance auditing and reporting",
    "Risk assessment and mitigation planning",
    "Policy creation and distribution management",
    "Deadline tracking and automated reminders",
    "Documentation and record-keeping automation",
    "Training and certification management",
    "Incident reporting and investigation tracking",
    "Audit preparation and support",
    "Industry-specific compliance frameworks"
  ];

  const useCases = [
    {
      title: "Healthcare Provider",
      scenario: "Managing HIPAA compliance and healthcare regulations",
      result: "Achieved 100% HIPAA compliance, reduced audit preparation time by 80%, eliminated compliance violations"
    },
    {
      title: "Financial Services Firm",
      scenario: "Ensuring SEC and FINRA compliance for investment advisory services",
      result: "Streamlined regulatory reporting, reduced compliance costs by 60%, improved audit scores by 40%"
    },
    {
      title: "E-commerce Business",
      scenario: "Managing data privacy regulations (GDPR, CCPA) and consumer protection laws",
      result: "Automated privacy compliance, reduced legal risks by 75%, improved customer trust and retention"
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
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-6">
              <Shield className="h-4 w-4 mr-2" />
              Compliance Agent
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-navy-900 mb-6">
              Your AI Compliance
              <span className="block text-indigo-600">Monitor</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Stay compliant and protected with our intelligent Compliance Agent. 
              Monitor regulations, manage policies, and ensure your business meets 
              all industry standards automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#pricing" 
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Get Started Today
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="#demo" 
                className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                Watch Demo
              </Link>
            </div>
          </div>
          
          {/* 3D Robot Scene */}
          <div className="relative h-96 w-full max-w-4xl mx-auto">
            <SplineSceneCompliance />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Why Choose Our Compliance Agent?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered Compliance Agent keeps your business protected and compliant, 
              reducing risks and ensuring peace of mind.
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
              Complete Compliance Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to maintain compliance and reduce regulatory risks.
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
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">
                Industry-Specific Compliance
              </h3>
              <p className="text-gray-600 mb-6">
                Tailored compliance monitoring for your specific industry and regulations.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Healthcare (HIPAA, FDA)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Finance (SEC, FINRA, PCI)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Data Privacy (GDPR, CCPA)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">General Business (OSHA, EEOC)</span>
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
              See how businesses like yours are maintaining compliance with confidence.
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
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Ensure Compliance?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join hundreds of businesses already maintaining compliance with our Compliance Agent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#pricing" 
              className="bg-white text-indigo-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              View Pricing Plans
              <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/#contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
