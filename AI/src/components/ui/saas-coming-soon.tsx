"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Rocket, Users, Zap } from "lucide-react";
import { useState } from "react";

export function SaaSComingSoon() {
  const [email, setEmail] = useState("");

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle waitlist signup
    console.log("Waitlist signup:", email);
    setEmail("");
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy-900 mb-6">
            SaaS Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The future of business automation is here. Our SaaS platform will let you deploy and manage AI agents with just a few clicks.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Platform Features Preview */}
          <div>
            <h3 className="text-3xl font-bold text-navy-900 mb-6">What's Coming</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-navy-900 mb-2">One-Click Agent Deployment</h4>
                  <p className="text-gray-600">Deploy pre-built AI agents instantly with our marketplace.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-navy-900 mb-2">Team Collaboration</h4>
                  <p className="text-gray-600">Manage multiple AI agents across your entire organization.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-navy-900 mb-2">Advanced Analytics</h4>
                  <p className="text-gray-600">Real-time performance monitoring and optimization insights.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Waitlist Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/30">
            <div className="text-center mb-6">
              <h4 className="text-2xl font-bold text-navy-900 mb-2">Join the Waitlist</h4>
              <p className="text-gray-600">Be the first to access our SaaS platform when it launches.</p>
            </div>

            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Join Waitlist
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Expected Launch: Q2 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Preview Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-navy-900 mb-2">Agent Marketplace</h4>
            <p className="text-gray-600 text-sm">Browse and deploy pre-built AI agents for every business function.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-navy-900 mb-2">Team Dashboard</h4>
            <p className="text-gray-600 text-sm">Manage all your AI agents from a single, intuitive dashboard.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-navy-900 mb-2">Smart Analytics</h4>
            <p className="text-gray-600 text-sm">Advanced insights and optimization recommendations for your AI agents.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
