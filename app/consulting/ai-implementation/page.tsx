"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Chatbot } from "@/components/ui/chatbot";
import { useState, useEffect } from "react";

export default function AIImplementationPage() {
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
              AI Agent Implementation
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your business processes with custom AI agents. We build, deploy, and optimize AI solutions that work 24/7 to grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Book Implementation Call
              </button>
              <button className="border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Process Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            Our Implementation Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Discovery & Audit</h3>
              <p className="text-gray-600">
                Comprehensive analysis of your current processes and identification of automation opportunities.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Strategy & Design</h3>
              <p className="text-gray-600">
                Custom AI agent strategy tailored to your business needs and integration requirements.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Build & Deploy</h3>
              <p className="text-gray-600">
                Development and deployment of your custom AI agents with full integration into your existing systems.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Optimize & Scale</h3>
              <p className="text-gray-600">
                Continuous monitoring, optimization, and scaling of your AI agents for maximum performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Types Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            Implementation Packages
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Starter Package</h3>
              <p className="text-gray-600 mb-4">
                Perfect for small businesses looking to automate basic processes.
              </p>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• 1-2 AI Agents</li>
                <li>• Basic integrations</li>
                <li>• 30-day support</li>
                <li>• Performance monitoring</li>
              </ul>
              <div className="text-2xl font-bold text-navy-900 mb-4">$5,000 - $10,000</div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                Get Quote
              </button>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Professional Package</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive solution for growing businesses with complex workflows.
              </p>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• 3-5 AI Agents</li>
                <li>• Advanced integrations</li>
                <li>• 90-day support</li>
                <li>• Custom training</li>
                <li>• Analytics dashboard</li>
              </ul>
              <div className="text-2xl font-bold text-navy-900 mb-4">$15,000 - $30,000</div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                Get Quote
              </button>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Enterprise Package</h3>
              <p className="text-gray-600 mb-4">
                Full-scale AI transformation for large organizations.
              </p>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• 5+ AI Agents</li>
                <li>• Enterprise integrations</li>
                <li>• 6-month support</li>
                <li>• Dedicated team</li>
                <li>• Custom development</li>
                <li>• SLA guarantee</li>
              </ul>
              <div className="text-2xl font-bold text-navy-900 mb-4">$50,000+</div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Metrics Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            Proven Results
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">80%</div>
              <p className="text-gray-600">Reduction in manual tasks</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">3x</div>
              <p className="text-gray-600">Faster lead response time</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">$2M+</div>
              <p className="text-gray-600">Revenue recovered annually</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-gray-600">AI agent availability</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Book a free consultation to discover how AI agents can revolutionize your business processes and drive growth.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
            Book Implementation Call
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



