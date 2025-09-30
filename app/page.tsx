
"use client";

import { useState, useEffect } from 'react'
import { Header } from '@/components/ui/header'
import { SplineSceneBasic } from '@/components/ui/spline-demo'
import { AIAuditHero } from '@/components/ui/ai-audit-hero'
import { AIImplementationSection } from '@/components/ui/ai-implementation-section'
import { SaaSPlatformPreview } from '@/components/ui/saas-platform-preview'
import AgentsFlipShowcase from '@/components/ui/agents-flip-showcase'
import CaseStudies from '@/components/ui/case-studies'
import { FAQ } from '@/components/ui/faq'
import { Footer } from '@/components/ui/footer'
import { Chatbot } from '@/components/ui/chatbot'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  // Scroll-based detection - floating when scrolled, static at top
  useEffect(() => {
    const handleScroll = () => {
      // Check actual scroll position using multiple methods
      const scrollTop = window.pageYOffset || 
                       document.documentElement.scrollTop || 
                       document.body.scrollTop || 0;
      
      
      // If scrolled down (more than 20px), make floating
      if (scrollTop > 20) {
        setIsScrolled(true);
      }
      // If scrolled back to top (20px or less), make static
      else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener to both window and document
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });

    // Also try wheel event as backup
    const handleWheel = () => {
      const scrollTop = window.pageYOffset || 
                       document.documentElement.scrollTop || 
                       document.body.scrollTop || 0;
      if (scrollTop > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
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
        
        /* Hide the profile element in the Spline scene */
        canvas {
          position: relative;
        }
        
        /* Target any profile-like elements that might be in the 3D scene */
        .profile-element,
        [class*="profile"],
        [class*="battery"],
        [class*="status"] {
          display: none !important;
          visibility: hidden !important;
        }
      `}</style>
      <main className="relative" style={{background: 'linear-gradient(to bottom right, rgb(219 234 254), rgb(239 246 255), rgb(229 231 235))'}}>
      {/* Simple Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-gray-200"></div>
      </div>

      {/* Navigation */}
      <Header isScrolled={isScrolled} />
      

      {/* 3D Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-8">
        <SplineSceneBasic />
      </section>

      {/* AI Audit Hero Section - PRIMARY FOCUS */}
      <AIAuditHero />

      {/* AI Implementation Section - SECONDARY FOCUS */}
      <AIImplementationSection />

      {/* AI Agents Showcase - Available Now */}
      <AgentsFlipShowcase />

      {/* SaaS Platform Preview */}
      <SaaSPlatformPreview />

      {/* Case Studies */}
      <CaseStudies />

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />

      {/* Chatbot */}
      <Chatbot />
    </main>
    </>
  );
}
