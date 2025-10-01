"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Chatbot } from "@/components/ui/chatbot";
import { useState, useEffect } from "react";

export default function CaseStudiesPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let scrollPosition = 0;
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || 
                       document.documentElement.scrollTop || 
                       document.body.scrollTop || 0;
      const shouldBeScrolled = scrollTop > 50;
      setIsScrolled(shouldBeScrolled);
    };

    // Wheel event with manual scroll tracking
    const handleWheel = (e: WheelEvent) => {
      scrollPosition += e.deltaY;
      const shouldBeScrolled = scrollPosition > 50;
      setIsScrolled(shouldBeScrolled);
    };

    // Initial check
    handleScroll();

    // Add scroll listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });

    // Wheel event as primary method
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        html, body {
          overflow-x: hidden;
          overflow-y: auto;
          height: auto;
          min-height: 100vh;
        }
        body {
          margin: 0;
          padding: 0;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
      <main className="relative bg-gradient-to-br from-blue-100 via-blue-50 to-gray-200">
        {/* Simple Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-gray-200"></div>
        </div>

        {/* Navigation */}
        <Header isScrolled={isScrolled} />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Success Stories
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover how businesses like yours have transformed their operations 
              and achieved remarkable results with our AI automation solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                View All Case Studies
              </button>
              <button className="border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Share Your Story
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Case Studies */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            Featured Case Studies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="w-full h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4 flex items-center justify-center text-white text-2xl font-bold">
                TechCorp
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">75% Reduction in Lead Response Time</h3>
              <p className="text-gray-600 mb-4">
                TechCorp automated their sales process and reduced lead response time from 4 hours to 1 hour, 
                resulting in a 200% increase in qualified leads.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">B2B SaaS • 50-200 employees</span>
                <button className="text-blue-600 hover:text-blue-700 font-semibold">Read More →</button>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="w-full h-48 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg mb-4 flex items-center justify-center text-white text-2xl font-bold">
                RetailPlus
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">60% Cost Savings in Customer Support</h3>
              <p className="text-gray-600 mb-4">
                RetailPlus implemented AI-powered customer support, reducing support costs by 60% while 
                improving customer satisfaction scores by 40%.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">E-commerce • 200-500 employees</span>
                <button className="text-blue-600 hover:text-blue-700 font-semibold">Read More →</button>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="w-full h-48 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg mb-4 flex items-center justify-center text-white text-2xl font-bold">
                FinanceFlow
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">80% Automation of Financial Processes</h3>
              <p className="text-gray-600 mb-4">
                FinanceFlow automated their financial reporting and invoice processing, saving 20 hours 
                per week and reducing errors by 95%.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Financial Services • 100-500 employees</span>
                <button className="text-blue-600 hover:text-blue-700 font-semibold">Read More →</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Categories */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            Browse by Industry
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                💼
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">B2B SaaS</h3>
              <p className="text-gray-600 text-sm mb-4">12 case studies</p>
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">View All →</button>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🛒
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">E-commerce</h3>
              <p className="text-gray-600 text-sm mb-4">8 case studies</p>
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">View All →</button>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🏥
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Healthcare</h3>
              <p className="text-gray-600 text-sm mb-4">6 case studies</p>
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">View All →</button>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🏦
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Financial Services</h3>
              <p className="text-gray-600 text-sm mb-4">10 case studies</p>
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">View All →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            Proven Results Across Industries
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-navy-900 mb-2">85%</div>
              <p className="text-gray-600">Average time savings</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-navy-900 mb-2">60%</div>
              <p className="text-gray-600">Average cost reduction</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-navy-900 mb-2">95%</div>
              <p className="text-gray-600">Customer satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-navy-900 mb-2">200+</div>
              <p className="text-gray-600">Successful implementations</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of businesses that have transformed their operations with AI automation.
          </p>
          <button className="bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
            Start Your Transformation
          </button>
        </div>
      </div>

      <Footer />

      {/* Chatbot */}
      <Chatbot />
      </main>
    </>
  );
}
