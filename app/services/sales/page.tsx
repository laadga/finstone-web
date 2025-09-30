"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SiriOrb } from "@/components/ui/siri-orb";
import { Chatbot } from "@/components/ui/chatbot";
import SalesOverwhelmedSection from "@/components/ui/sales-overwhelmed-section";
import { useState, useEffect } from "react";

export default function SalesPage() {
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-navy-900 mb-6 leading-tight">
                Turn Conversations Into Conversions With Your AI Sales Team
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Your AI Sales Employees handle lead generation, qualification, and outreach 24/7 so you never miss a deal.
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Hire Your AI Sales Employee Today
              </button>
            </div>
            
            {/* Right: 3D Sales Robot Visual */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-80 h-80 rounded-full shadow-2xl overflow-hidden">
                <SiriOrb
                  size="320px"
                  colors={{
                    c1: "oklch(70% 0.15 250)", // Blue
                    c2: "oklch(75% 0.12 280)", // Purple-blue
                    c3: "oklch(80% 0.10 200)"  // Light blue
                  }}
                  animationDuration={12}
                  className="drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem & Pain Section */}
      <SalesOverwhelmedSection />

      {/* Core Sales Agents Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-navy-900 mb-4">
            Core Sales Employees
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Essential AI employees for every sales team
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sales Call Prep */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-xl">📧</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+12</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">Sales Call Prep</h3>
              <p className="text-gray-600 text-sm mb-4">Close more deals with detailed meeting briefings and prospect research.</p>
            </div>

            {/* Lead Generator */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600 text-xl">👥</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+18</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">Lead Generator</h3>
              <p className="text-gray-600 text-sm mb-4">Find and organize leads instantly from multiple sources.</p>
            </div>

            {/* Lead Outreacher */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600 text-xl">📨</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+15</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">Lead Outreacher</h3>
              <p className="text-gray-600 text-sm mb-4">Automated sales outreach and lead engagement across channels.</p>
            </div>

            {/* Sales Coach */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-xl">⭐</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+9</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">Sales Coach</h3>
              <p className="text-gray-600 text-sm mb-4">Real-time call coaching and deal guidance for your team.</p>
            </div>

            {/* Proposal Drafter */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 text-xl">📄</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+11</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">Proposal Drafter</h3>
              <p className="text-gray-600 text-sm mb-4">Create professional proposals in minutes with AI assistance.</p>
            </div>


            {/* Meeting Recorder */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600 text-xl">#</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+14</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">Meeting Recorder</h3>
              <p className="text-gray-600 text-sm mb-4">Take notes during sales calls and automatically update your CRM.</p>
            </div>

            {/* Lead Qualifier */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <span className="text-pink-600 text-xl">❤️</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+13</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">Lead Qualifier</h3>
              <p className="text-gray-600 text-sm mb-4">Qualify leads automatically and alert your team on Slack.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Sales Templates Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-navy-900 mb-4">
            Advanced Sales Employees
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Specialized AI employees for complex sales workflows
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* News Scraper Agent */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-xl">🌐</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+6</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">News Scraper</h3>
              <p className="text-gray-600 text-sm mb-4">Research prospects and gather recent news to personalize sales conversations.</p>
            </div>

            {/* Salesforce Account Creator */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-xl">📊</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+5</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">Salesforce Sync</h3>
              <p className="text-gray-600 text-sm mb-4">Sync lead data from Google Sheets directly into Salesforce accounts.</p>
            </div>

            {/* Google Maps Lead Generator */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-xl">🗺️</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+13</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">Maps Lead Generator</h3>
              <p className="text-gray-600 text-sm mb-4">Find local businesses and extract contact information from Google Maps.</p>
            </div>

            {/* Company Enrichment Agent */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-xl">🔍</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+6</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">Company Enrichment</h3>
              <p className="text-gray-600 text-sm mb-4">Analyze company websites with AI to extract key insights and enrich lead data.</p>
            </div>
            
            {/* Gmail Campaign Sender */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 text-xl">📧</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+7</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">Email Campaign Sender</h3>
              <p className="text-gray-600 text-sm mb-4">Send personalized bulk emails and automatically follow up with non-responders.</p>
            </div>


          </div>
        </div>
      </div>

      {/* CRM Automation Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-navy-900 mb-4">
            CRM Automation
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Streamline your customer relationship management with AI-powered automation
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Customer Onboarding */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 text-xl">🚀</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+4</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">Customer Onboarding</h3>
              <p className="text-gray-600 text-sm mb-4">Automate customer onboarding with email sequences and team alerts in HubSpot.</p>
            </div>

            {/* Call Summarization */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-xl">📝</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+6</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">Call Summarizer</h3>
              <p className="text-gray-600 text-sm mb-4">Automatically summarize sales calls and notify teams via Slack and HubSpot.</p>
            </div>
            
            {/* Quote Generator */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-xl">💰</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+4</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">Quote Generator</h3>
              <p className="text-gray-600 text-sm mb-4">Automatically generate and send price quotes using Gmail and Google Sheets.</p>
            </div>



          </div>
        </div>
      </div>

      {/* Lead Generation Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-navy-900 mb-4">
            Lead Generation
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Automatically find and qualify prospects from multiple sources
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Google Maps to Email Scraper */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-xl">🗺️</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+8</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">Maps Email Scraper</h3>
              <p className="text-gray-600 text-sm mb-4">Extract business emails from Google Maps and export to Google Sheets.</p>
            </div>

            {/* LinkedIn Lead Extractor */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-xl">💼</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+10</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">LinkedIn Lead Extractor</h3>
              <p className="text-gray-600 text-sm mb-4">Extract LinkedIn comments and convert them into qualified leads.</p>
            </div>
            
            {/* B2B Lead Qualifier */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-xl">🎯</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+6</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">B2B Lead Qualifier</h3>
              <p className="text-gray-600 text-sm mb-4">Qualify and reach out to B2B leads using AI and automation.</p>
            </div>


          </div>
        </div>
      </div>

      {/* Lead Nurturing Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-navy-900 mb-4">
            Lead Nurturing
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Convert prospects into customers with personalized AI-powered outreach
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Personalized Sales Emails */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-xl">📧</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+10</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">Personalized Email Generator</h3>
              <p className="text-gray-600 text-sm mb-4">Create personalized sales emails using LinkedIn data and AI.</p>
            </div>

            {/* AI-Powered Lead Research */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-xl">🔍</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+6</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">Lead Researcher</h3>
              <p className="text-gray-600 text-sm mb-4">Research leads and generate personalized emails with AI.</p>
            </div>

            {/* WhatsApp Proposal Generator */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-xl">💬</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+10</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">WhatsApp Proposal Generator</h3>
              <p className="text-gray-600 text-sm mb-4">Generate WhatsApp proposals automatically from voice or text.</p>
            </div>

            {/* LinkedIn Response Generator */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-xl">💼</span>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">+6</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">LinkedIn Response Generator</h3>
              <p className="text-gray-600 text-sm mb-4">Generate personalized LinkedIn responses with AI and Notion routing.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-navy-900 mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Hire Your Employee</h3>
              <p className="text-gray-600">Choose your Sales AI Employee with one click.</p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Connect Your Tools</h3>
              <p className="text-gray-600">Seamlessly integrates with your CRM, email, and calendar.</p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Let AI Do the Work</h3>
              <p className="text-gray-600">Watch your pipeline grow while you focus on closing deals.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Choose Your AI Workforce
            </h2>
            <p className="text-xl text-gray-600">
              Hire AI employees that work 24/7 to grow your business
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* AI Audit Plan */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-navy-900 mb-2">AI Audit</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">$1,500</div>
                <div className="text-gray-500">one-time</div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Complete analysis of your workflows</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Identify where AI can save costs & time</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Custom roadmap with ROI projections</span>
                </li>
              </ul>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 font-medium">
                  💡 <strong>Free with Workforce subscription!</strong>
                </p>
              </div>
              
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-all duration-300">
                Get AI Audit
              </button>
            </div>

            {/* AI Workforce Plan - Featured */}
            <div className="bg-white rounded-xl p-8 shadow-2xl border-2 border-blue-500 relative hover:shadow-2xl transition-all duration-300 transform scale-105">
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold">
                  ⭐ Most Popular
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-navy-900 mb-2">AI Workforce</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">$2,000</div>
                <div className="text-gray-500">per month</div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Access to multiple AI employees (Sales, Marketing, Support, Analytics)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Unlimited usage (fair battery system)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">10,000 tasks/month included</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Standard integrations (Slack, HubSpot, Gmail, etc.)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 font-semibold text-blue-600">Audit included in onboarding</span>
                </li>
              </ul>
              
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Hire Your AI Workforce
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-navy-900 mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-gray-600 mb-2">Custom</div>
                <div className="text-gray-500">Quote</div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Everything in AI Workforce</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Hire unlimited agents</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">50,000+ tasks/month</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Custom CRM dashboards</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Dedicated onboarding & training</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Compliance & security support</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Tailored integrations</span>
                </li>
              </ul>
              
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-all duration-300">
                Contact Sales
              </button>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              All plans include 24/7 support and regular AI employee updates
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <span>✓ No setup fees</span>
              <span>✓ Cancel anytime</span>
              <span>✓ 30-day money back guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof / Case Study Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Testimonial */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-blue-600 font-bold text-2xl">"</div>
              </div>
              <blockquote className="text-xl text-gray-700 mb-6 italic">
                "We cut manual prospecting by 80% and booked 3x more sales calls in the first month."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">COO</div>
                <div>
                  <p className="font-semibold text-navy-900">B2B SaaS Company</p>
                </div>
              </div>
            </div>
            
            {/* Right: Measurable Results */}
            <div>
              <h3 className="text-3xl font-bold text-navy-900 mb-8">Measurable Results</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <div className="text-green-600 font-bold text-lg">↗</div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">+180%</p>
                    <p className="text-gray-600">more booked calls</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="text-blue-600 font-bold text-lg">⚡</div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">80%</p>
                    <p className="text-gray-600">less manual work</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <div className="text-green-600 font-bold text-lg">$</div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">$87K</p>
                    <p className="text-gray-600">annual revenue recovered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-8">
            Plugs Into the Tools You Already Use
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-blue-600">Salesforce</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-orange-600">HubSpot</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-purple-600">Pipedrive</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-green-600">Slack</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-gray-600">Notion</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-blue-500">Gmail</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Grow Your Pipeline?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start with your first AI Sales Employee today.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
            View Pricing
          </button>
        </div>
      </div>


      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Can the AI employees replace my sales team?</h3>
              <p className="text-gray-600">No, they support your team by handling repetitive tasks like prospecting, outreach, and scheduling, so your reps can focus on closing deals.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Does it integrate with my CRM?</h3>
              <p className="text-gray-600">Yes. We integrate with Salesforce, HubSpot, Pipedrive, and more.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Will it sound robotic in outreach?</h3>
              <p className="text-gray-600">No. Our AI personalizes messages with natural, human-like language.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-navy-900 mb-2">How fast can I start?</h3>
              <p className="text-gray-600">Your AI Sales Employee can be live and generating leads within 24 hours.</p>
            </div>
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
