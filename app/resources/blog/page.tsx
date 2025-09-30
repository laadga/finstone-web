"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Chatbot } from "@/components/ui/chatbot";
import { useState, useEffect } from "react";

export default function BlogPage() {
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
    const handleWheel = (e) => {
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
          <div className="bg-gray-100 rounded-2xl p-12 flex items-center justify-between">
            {/* Left Content */}
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                Blog
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Learn more about Finstone and our approach to building the toughest AI workforce in business history.
              </p>
            </div>
            
            {/* Right Content - Logo */}
            <div className="flex-shrink-0 ml-8">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-400">F</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            Featured Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="w-full h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4 flex items-center justify-center text-white text-2xl font-bold">
                AI Trends
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-rose-100 text-rose-800 text-xs font-semibold px-2 py-1 rounded-full">Trending</span>
                <span className="text-sm text-gray-500">Dec 15, 2024</span>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">The Future of AI in Business: 2025 Predictions</h3>
              <p className="text-gray-600 mb-4">
                Explore the emerging AI trends that will shape business operations in 2025, 
                from advanced automation to intelligent decision-making systems.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">5 min read</span>
                <button className="text-rose-600 hover:text-rose-700 font-semibold">Read More →</button>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="w-full h-48 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg mb-4 flex items-center justify-center text-white text-2xl font-bold">
                How-to
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">Guide</span>
                <span className="text-sm text-gray-500">Dec 12, 2024</span>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">How to Implement AI Automation in 30 Days</h3>
              <p className="text-gray-600 mb-4">
                A step-by-step guide to successfully implementing AI automation in your business, 
                including common pitfalls and best practices.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">8 min read</span>
                <button className="text-rose-600 hover:text-rose-700 font-semibold">Read More →</button>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="w-full h-48 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg mb-4 flex items-center justify-center text-white text-2xl font-bold">
                Case Study
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded-full">Success Story</span>
                <span className="text-sm text-gray-500">Dec 10, 2024</span>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">How TechStartup Increased Revenue by 300%</h3>
              <p className="text-gray-600 mb-4">
                Discover how a small startup used AI automation to scale their sales process 
                and achieve unprecedented growth in just 6 months.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">6 min read</span>
                <button className="text-rose-600 hover:text-rose-700 font-semibold">Read More →</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Categories */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            Browse by Category
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🤖
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">AI & Automation</h3>
              <p className="text-gray-600 text-sm mb-4">24 articles</p>
              <button className="text-rose-600 hover:text-rose-700 font-semibold text-sm">View All →</button>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                📈
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Business Growth</h3>
              <p className="text-gray-600 text-sm mb-4">18 articles</p>
              <button className="text-rose-600 hover:text-rose-700 font-semibold text-sm">View All →</button>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                💡
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Best Practices</h3>
              <p className="text-gray-600 text-sm mb-4">15 articles</p>
              <button className="text-rose-600 hover:text-rose-700 font-semibold text-sm">View All →</button>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🎯
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Industry Insights</h3>
              <p className="text-gray-600 text-sm mb-4">12 articles</p>
              <button className="text-rose-600 hover:text-rose-700 font-semibold text-sm">View All →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">
            Stay Updated with Our Latest Insights
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get weekly articles, case studies, and industry insights delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <Footer />

      {/* Chatbot */}
      <Chatbot />
      </main>
    </>
  );
}
