"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Chatbot } from "@/components/ui/chatbot";
import { useState, useEffect } from "react";

export default function GuidesPage() {
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
              Implementation Guides
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Step-by-step guides to help you successfully implement AI automation 
              in your business, from planning to execution and optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Download All Guides
              </button>
              <button className="border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Request Custom Guide
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Guides */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            Featured Guides
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="w-full h-48 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg mb-4 flex items-center justify-center text-white text-2xl font-bold">
                Getting Started
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-cyan-100 text-cyan-800 text-xs font-semibold px-2 py-1 rounded-full">Beginner</span>
                <span className="text-sm text-gray-500">45 min read</span>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">AI Automation: Complete Beginner's Guide</h3>
              <p className="text-gray-600 mb-4">
                Everything you need to know to get started with AI automation, 
                including terminology, benefits, and first steps.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Free</span>
                <button className="text-cyan-600 hover:text-cyan-700 font-semibold">Download PDF →</button>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="w-full h-48 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg mb-4 flex items-center justify-center text-white text-2xl font-bold">
                Implementation
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">Intermediate</span>
                <span className="text-sm text-gray-500">90 min read</span>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">30-Day AI Implementation Roadmap</h3>
              <p className="text-gray-600 mb-4">
                A detailed roadmap for implementing AI automation in your business 
                within 30 days, with daily tasks and milestones.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Premium</span>
                <button className="text-cyan-600 hover:text-cyan-700 font-semibold">Download PDF →</button>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="w-full h-48 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center text-white text-2xl font-bold">
                Advanced
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">Advanced</span>
                <span className="text-sm text-gray-500">120 min read</span>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Enterprise AI Strategy & Scaling</h3>
              <p className="text-gray-600 mb-4">
                Advanced strategies for scaling AI automation across large organizations 
                and complex business processes.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Enterprise</span>
                <button className="text-cyan-600 hover:text-cyan-700 font-semibold">Download PDF →</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Categories */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            Browse by Category
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🚀
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Getting Started</h3>
              <p className="text-gray-600 text-sm mb-4">5 guides</p>
              <button className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm">View All →</button>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                ⚙️
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Implementation</h3>
              <p className="text-gray-600 text-sm mb-4">8 guides</p>
              <button className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm">View All →</button>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                📊
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Analytics & ROI</h3>
              <p className="text-gray-600 text-sm mb-4">6 guides</p>
              <button className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm">View All →</button>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🔧
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Technical</h3>
              <p className="text-gray-600 text-sm mb-4">4 guides</p>
              <button className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm">View All →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Guides */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            Most Popular Guides
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">Sales Automation Setup Guide</h3>
                  <p className="text-gray-600 text-sm mb-3">Complete walkthrough for setting up AI-powered sales automation</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>2,500+ downloads</span>
                    <span>•</span>
                    <span>4.9/5 rating</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">ROI Calculation Framework</h3>
                  <p className="text-gray-600 text-sm mb-3">How to measure and maximize ROI from AI automation investments</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>1,800+ downloads</span>
                    <span>•</span>
                    <span>4.8/5 rating</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">Change Management Playbook</h3>
                  <p className="text-gray-600 text-sm mb-3">Managing team adoption and organizational change during AI implementation</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>1,200+ downloads</span>
                    <span>•</span>
                    <span>4.7/5 rating</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">Security & Compliance Guide</h3>
                  <p className="text-gray-600 text-sm mb-3">Ensuring data security and regulatory compliance in AI implementations</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>950+ downloads</span>
                    <span>•</span>
                    <span>4.9/5 rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">
            Need a Custom Implementation Guide?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our experts can create a personalized guide tailored to your specific business needs and industry.
          </p>
          <button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
            Request Custom Guide
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
