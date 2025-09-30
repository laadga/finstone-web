"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { useState, useEffect } from "react";

export default function TermsOfService() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: 'linear-gradient(to bottom right, rgb(219 234 254), rgb(239 246 255), rgb(229 231 235))',
        position: 'relative'
      }}
    >
      {/* Override any component backgrounds */}
      <style jsx global>{`
        body {
          background: linear-gradient(to bottom right, rgb(219 234 254), rgb(239 246 255), rgb(229 231 235)) !important;
        }
        .min-h-screen {
          background: linear-gradient(to bottom right, rgb(219 234 254), rgb(239 246 255), rgb(229 231 235)) !important;
        }
      `}</style>
      
      {/* Navigation Header */}
      <Header isScrolled={isScrolled} />
      
      {/* Main Content */}
      <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 p-8 shadow-lg">
            <h1 className="text-4xl font-bold text-navy-900 mb-8">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last updated: December 2024</p>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-navy-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-6">
                By accessing and using Finstone AI's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-6">
                Finstone AI provides AI-powered business automation services including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>AI Audit services for business process analysis</li>
                <li>AI Workforce deployment and management</li>
                <li>Custom AI agent development and implementation</li>
                <li>Business automation consulting and strategy</li>
                <li>SaaS platform for AI agent management (coming soon)</li>
              </ul>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">You agree to:</p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Provide accurate and complete information when using our services</li>
                <li>Use our services only for lawful purposes and in accordance with these terms</li>
                <li>Not attempt to gain unauthorized access to our systems or other users' accounts</li>
                <li>Not use our services to transmit any harmful or malicious code</li>
                <li>Respect intellectual property rights and not infringe on others' rights</li>
              </ul>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">4. Payment Terms</h2>
              <p className="text-gray-700 mb-4">
                Payment terms for our services are as follows:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>AI Audit:</strong> $1,500 one-time payment, due upon service completion</li>
                <li><strong>AI Workforce:</strong> $2,000/month recurring payment, billed monthly</li>
                <li><strong>Enterprise:</strong> Custom pricing based on scope and requirements</li>
                <li>All payments are non-refundable unless otherwise specified in writing</li>
                <li>Late payments may result in service suspension</li>
              </ul>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">5. Data Protection and Privacy</h2>
              <p className="text-gray-700 mb-6">
                We are committed to protecting your data and privacy. Our data handling practices are detailed in our Privacy Policy. By using our services, you consent to the collection and use of information in accordance with our Privacy Policy.
              </p>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700 mb-6">
                All content, features, and functionality of our services are owned by Finstone AI and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.
              </p>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 mb-6">
                To the maximum extent permitted by law, Finstone AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services.
              </p>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">8. Service Availability</h2>
              <p className="text-gray-700 mb-6">
                We strive to maintain high service availability but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of our services at any time with or without notice.
              </p>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">9. Termination</h2>
              <p className="text-gray-700 mb-6">
                We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">10. Changes to Terms</h2>
              <p className="text-gray-700 mb-6">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> contact@finstonelab.com</p>
                <p className="text-gray-700"><strong>Website:</strong> finstonelab.com</p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  These Terms of Service constitute the entire agreement between you and Finstone AI regarding the use of our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
