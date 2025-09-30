"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Users, Zap, BarChart3, Globe } from "lucide-react";

export function SaaSPlatformPreview() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail("");
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        console.error('Waitlist signup failed');
      }
    } catch (error) {
      console.error('Waitlist signup error:', error);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy-900 mb-6">
            SaaS Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The future of business automation is coming. Our SaaS platform will let you deploy and manage AI agents with just a few clicks.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-navy-900 mb-6">What's Coming</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-navy-900 mb-2">One-Click Agent Deployment</h4>
                  <p className="text-gray-600">Deploy pre-built AI agents instantly with our marketplace. No technical setup required.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-navy-900 mb-2">Team Collaboration</h4>
                  <p className="text-gray-600">Manage multiple AI agents across your entire organization from a single dashboard.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-navy-900 mb-2">Advanced Analytics</h4>
                  <p className="text-gray-600">Real-time performance monitoring and optimization insights for all your AI agents.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-8 shadow-2xl border border-white/30">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Agent Marketplace</h3>
              <p className="text-gray-600">Browse, customize, and deploy AI agents for every business function.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-navy-900">Global Marketplace</h4>
                <p className="text-sm text-gray-600">100+ pre-built agents</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-navy-900">Instant Setup</h4>
                <p className="text-sm text-gray-600">Deploy in minutes</p>
              </div>
            </div>

            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-transparent"
                  required
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Join Early Access
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
            
            {/* Success Message */}
            {isSubmitted && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      Successfully added to the waitlist! We'll notify you when the platform launches.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
