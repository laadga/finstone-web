"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PersistentElements } from '@/components/ui/persistent-elements';
import { Loader2, ArrowRight } from "lucide-react";
import Link from 'next/link';

export default function SaaSEntry() {
  const router = useRouter();

  // Simulate checking user status and redirecting
  useEffect(() => {
    // In a real app, you'd check if user has purchased agents
    // For demo purposes, we'll just show the entry page
    const timer = setTimeout(() => {
      // Uncomment to auto-redirect to marketplace for first-time users
      // router.push('/saas/marketplace');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-gray-200 flex items-center justify-center relative">
      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-4 text-center shadow-2xl border border-white/30">
          <div className="mb-6">
            <div className="text-6xl mb-4">🚀</div>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
              Coming Soon
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">SaaS Platform Launching Soon</h1>
            <p className="text-gray-600 mb-6">Our AI agent marketplace and management platform is currently in development. Join the waitlist to be the first to access it.</p>
          </div>

          <div className="space-y-4">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12">
              <ArrowRight className="w-4 h-4 mr-2" />
              Join Waitlist
            </Button>

            <Link href="/consulting/audit" className="block">
              <Button variant="outline" className="w-full bg-white/20 border-gray-300 hover:bg-gray-50 h-12">
                Get AI Audit Instead
              </Button>
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              <strong>Expected Launch:</strong> Q2 2024
              <br />
              <strong>Current Services:</strong> AI Audits & Implementations Available Now
            </p>
          </div>
        </div>
      </div>

      {/* Original Content (Hidden behind overlay) */}
      <div className="opacity-30">
        {/* Profile Component - Only for SaaS pages */}
        <PersistentElements 
          clientName="John Doe"
          batteryLevel={85}
          academyCategory="AI"
        />
        
        <Card className="bg-white/20 backdrop-blur-sm border-white/30 p-8 max-w-md w-full mx-4 text-center">
          <div className="mb-6">
            <div className="text-4xl mb-4">🚀</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Finstone AI</h1>
            <p className="text-gray-600">Choose your path to get started with AI automation</p>
          </div>

          <div className="space-y-4">
            <Link href="/saas/marketplace" className="block">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12">
                <ArrowRight className="w-4 h-4 mr-2" />
                Explore Agent Marketplace
              </Button>
            </Link>

            <Link href="/saas/dashboard" className="block">
              <Button variant="outline" className="w-full bg-white/20 border-white/30 hover:bg-white/30 h-12">
                Go to My Dashboard
              </Button>
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-xs text-gray-500">
              New to Finstone? Start with the marketplace to choose your AI agents.
              <br />
              Returning user? Access your dashboard directly.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}






