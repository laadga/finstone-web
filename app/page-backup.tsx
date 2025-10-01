"use client";

import { useState, useEffect } from 'react'
import { Header } from '@/components/ui/header'
import { SplineSceneBasic } from '@/components/ui/spline-demo'
import AgentsFlipShowcase from '@/components/ui/agents-flip-showcase'
import { SalesFeature108 } from '@/components/ui/feature108-sales'
import { MarketingFeature108 } from '@/components/ui/feature108-marketing'
import { SupportFeature108 } from '@/components/ui/feature108-support'
import { CompanyLogosArc } from '@/components/ui/company-logos-arc'
import CaseStudies from '@/components/ui/case-studies'
// import { PricingSectionDemo } from '@/components/ui/pricing-demo'
import { FAQ } from '@/components/ui/faq'
import { Footer } from '@/components/ui/footer'
// import { CRMNotification } from '@/components/ui/crm-notification'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  // const [showCRMNotification, setShowCRMNotification] = useState(false);

  // Scroll-based detection - floating when scrolled, static at top
  useEffect(() => {
    let scrollPosition = 0;

    const handleWheel = (e: WheelEvent) => {
      // Update scroll position based on wheel movement
      scrollPosition += e.deltaY;
      
      // If scrolled down (positive scroll), make floating
      if (scrollPosition > 0) {
        setIsScrolled(true);
      }
      // If scrolled back to top (0 or negative), make static
      else {
        scrollPosition = 0; // Don't allow negative scroll
        setIsScrolled(false);
      }
    };

    // Add wheel event listener
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Show CRM notification after page load - Temporarily disabled
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowCRMNotification(true);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      <style jsx global>{`
        html, body {
          overflow-x: hidden;
          overflow-y: auto;
          height: 100%;
        }
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <main className="relative bg-gradient-to-br from-blue-100 via-blue-50 to-gray-200" style={{ minHeight: '100vh' }}>
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
      

      {/* AI Agents Flip Cards Showcase */}
      <AgentsFlipShowcase />

      {/* Sales Agents Section */}
      <SalesFeature108 />

      {/* Marketing Agents Section */}
      <MarketingFeature108 />

      {/* Support Agents Section */}
      <SupportFeature108 />

      {/* Company Logos Arc - Integrations */}
      <CompanyLogosArc />

      {/* Case Studies */}
      <CaseStudies />

      {/* Pricing Section */}
      {/* <PricingSectionDemo /> */}

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />


      {/* CRM Notification - Temporarily disabled */}
      {/* {showCRMNotification && (
        <CRMNotification onClose={() => setShowCRMNotification(false)} />
      )} */}
    </main>
    </>
  );
}




















