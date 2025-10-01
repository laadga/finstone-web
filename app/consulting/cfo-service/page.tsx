"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Chatbot } from "@/components/ui/chatbot";
import { useState, useEffect } from "react";

export default function CFOAsAServicePage() {
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
              CFO-as-a-Service
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get expert financial leadership and strategic guidance without the 
              full-time cost. Our AI-powered CFO services provide the insights 
              you need to make informed business decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Book a Call
              </button>
              <button className="border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            Our CFO Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Financial Planning & Analysis</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive financial modeling, budgeting, and forecasting to guide your business decisions.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Budget development & monitoring</li>
                <li>• Cash flow forecasting</li>
                <li>• Financial scenario planning</li>
                <li>• KPI tracking & analysis</li>
              </ul>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Strategic Financial Guidance</h3>
              <p className="text-gray-600 mb-4">
                Expert advice on funding, growth strategies, and financial optimization opportunities.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Fundraising strategy</li>
                <li>• Investment analysis</li>
                <li>• M&A evaluation</li>
                <li>• Risk management</li>
              </ul>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Financial Operations</h3>
              <p className="text-gray-600 mb-4">
                Streamline your financial processes with AI-powered automation and optimization.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Accounting automation</li>
                <li>• Invoice processing</li>
                <li>• Expense management</li>
                <li>• Financial reporting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* AI-Powered Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            AI-Powered Financial Intelligence
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                📊
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Real-time Analytics</h3>
              <p className="text-gray-600 text-sm">
                AI-driven insights and predictions based on your financial data.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🔍
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Anomaly Detection</h3>
              <p className="text-gray-600 text-sm">
                Automatically identify unusual patterns and potential issues.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                📈
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Predictive Modeling</h3>
              <p className="text-gray-600 text-sm">
                Forecast future performance and identify growth opportunities.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🎯
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Smart Recommendations</h3>
              <p className="text-gray-600 text-sm">
                Get actionable insights and recommendations for financial optimization.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Tiers Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            Service Tiers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Starter</h3>
              <p className="text-3xl font-bold text-navy-900 mb-4">$2,500<span className="text-lg text-gray-600">/month</span></p>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Monthly financial review</li>
                <li>• Basic reporting & analysis</li>
                <li>• Email support</li>
                <li>• Quarterly strategy calls</li>
              </ul>
              <button className="w-full border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300">
                Get Started
              </button>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border-2 border-amber-500">
              <div className="bg-amber-500 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Professional</h3>
              <p className="text-3xl font-bold text-navy-900 mb-4">$5,000<span className="text-lg text-gray-600">/month</span></p>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Weekly financial monitoring</li>
                <li>• Advanced analytics & insights</li>
                <li>• Priority support</li>
                <li>• Monthly strategy sessions</li>
                <li>• AI-powered recommendations</li>
              </ul>
              <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300">
                Get Started
              </button>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Enterprise</h3>
              <p className="text-3xl font-bold text-navy-900 mb-4">Custom</p>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Dedicated CFO support</li>
                <li>• Real-time monitoring</li>
                <li>• 24/7 support</li>
                <li>• Weekly strategy calls</li>
                <li>• Custom integrations</li>
                <li>• Board presentation prep</li>
              </ul>
              <button className="w-full border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">
            Ready for Expert Financial Leadership?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the financial expertise you need to scale your business with confidence.
          </p>
          <button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
            Book Your CFO Consultation
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
