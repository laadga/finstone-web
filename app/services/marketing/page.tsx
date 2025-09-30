"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Chatbot } from "@/components/ui/chatbot";
import { useState, useEffect } from "react";

export default function MarketingPage() {
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
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              AI Marketing Agents
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Scale your marketing efforts with AI agents that create content, 
              manage campaigns, and optimize performance across all channels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Start Free Trial
              </button>
              <button className="border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            Marketing Automation Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Content Creation</h3>
              <p className="text-gray-600">
                AI agents generate high-quality content for blogs, social media, 
                emails, and ads tailored to your brand voice.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Campaign Management</h3>
              <p className="text-gray-600">
                Automate multi-channel marketing campaigns across email, 
                social media, and paid advertising platforms.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Audience Segmentation</h3>
              <p className="text-gray-600">
                Intelligent audience analysis and segmentation to deliver 
                personalized messages to the right people.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-navy-900 mb-3">A/B Testing</h3>
              <p className="text-gray-600">
                Automated A/B testing of campaigns, content, and messaging 
                to optimize performance and conversion rates.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-navy-900 mb-3">ROI Optimization</h3>
              <p className="text-gray-600">
                Continuous optimization of marketing spend and strategies 
                to maximize return on investment.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-navy-900 mb-3">Social Media Management</h3>
              <p className="text-gray-600">
                Automated posting, engagement, and community management 
                across all major social media platforms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">
            Ready to Scale Your Marketing?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Transform your marketing with AI agents that work 24/7 to grow your brand.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
            Get Started Today
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
