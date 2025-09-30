"use client";

import { Header } from "@/components/ui/header";
import { useState, useEffect } from 'react';
import { 
  Target, 
  Search, 
  Users, 
  TrendingUp, 
  Phone, 
  Mail,
  CheckCircle,
  ArrowRight,
  Zap,
  BarChart3,
  Clock,
  Shield
} from "lucide-react";
import Link from "next/link";
import { SplineSceneLeadGen } from "@/components/ui/spline-lead-gen";

export default function LeadGenAgentPage() {
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
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Intelligent Lead Qualification",
      description: "Automatically identify and score leads based on your ideal customer profile. Focus on prospects most likely to convert with AI-powered qualification."
    },
    {
      icon: <Search className="h-8 w-8 text-green-600" />,
      title: "24/7 Lead Research",
      description: "Continuously research and discover new prospects across multiple channels. Never run out of potential customers with automated lead discovery."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Contact Information Enrichment",
      description: "Find accurate contact details, social profiles, and company information for every lead. Build comprehensive prospect profiles automatically."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      title: "Pipeline Management",
      description: "Track lead progression through your sales funnel with intelligent automation. Get insights on conversion rates and optimization opportunities."
    },
    {
      icon: <Phone className="h-8 w-8 text-indigo-600" />,
      title: "Automated Outreach",
      description: "Send personalized emails, LinkedIn messages, and follow-ups at scale. Maintain human-like communication while reaching hundreds of prospects daily."
    },
    {
      icon: <Mail className="h-8 w-8 text-red-600" />,
      title: "CRM Integration & Updates",
      description: "Automatically update your CRM with new leads, interactions, and status changes. Keep your sales team informed without manual data entry."
    }
  ];

  const features = [
    "Automated lead discovery and research",
    "Intelligent lead scoring and qualification",
    "Contact information enrichment and verification",
    "Multi-channel outreach automation",
    "Personalized email and message generation",
    "LinkedIn and social media prospecting",
    "CRM integration and data synchronization",
    "Lead nurturing and follow-up sequences",
    "A/B testing for outreach campaigns",
    "Real-time lead activity monitoring"
  ];

  const useCases = [
    {
      title: "B2B SaaS Company",
      scenario: "Generating leads for enterprise software with 500+ employee companies",
      result: "Increased qualified leads by 300%, reduced cost per lead by 60%, improved conversion rate by 45%"
    },
    {
      title: "Real Estate Agency",
      scenario: "Finding potential home buyers and sellers in specific neighborhoods",
      result: "Generated 200+ qualified leads monthly, increased listing appointments by 150%, reduced marketing spend by 40%"
    },
    {
      title: "Marketing Agency",
      scenario: "Prospecting for small business clients needing digital marketing services",
      result: "Automated 90% of prospecting activities, increased client acquisition by 250%, saved 30 hours/week on manual research"
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
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6">
              <Target className="h-4 w-4 mr-2" />
              Lead Gen Agent
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-navy-900 mb-6">
              Your AI Lead Generation
              <span className="block text-green-600">Specialist</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Never run out of qualified leads again. Our AI-powered Lead Gen Agent works 24/7 
              to find, qualify, and nurture prospects that are most likely to become your customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#pricing" 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Get Started Today
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="#demo" 
                className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                Watch Demo
              </Link>
            </div>
          </div>
          
          {/* 3D Robot Scene */}
          <div className="relative h-96 w-full max-w-4xl mx-auto">
            <SplineSceneLeadGen />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Why Choose Our Lead Gen Agent?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered Lead Gen Agent doesn't just find leads, it finds the RIGHT leads 
              and nurtures them through your entire sales process.
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
              Complete Lead Generation System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to generate, qualify, and convert leads automatically.
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
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">
                Multi-Channel Prospecting
              </h3>
              <p className="text-gray-600 mb-6">
                Reach prospects across all major platforms and channels.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">LinkedIn & Social Media</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Email & Phone Outreach</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Industry Directories</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Website & Content Analysis</span>
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
              See how businesses like yours are transforming their lead generation.
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
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Generate More Qualified Leads?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join hundreds of businesses already growing their pipeline with our Lead Gen Agent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#pricing" 
              className="bg-white text-green-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              View Pricing Plans
              <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/#contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
