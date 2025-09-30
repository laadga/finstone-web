"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedCardDemo } from "@/components/ui/animated-card-demo";
import Link from "next/link";

export function AIImplementationSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="max-w-none mx-auto text-center mb-16 px-4">
          <h3 className="text-3xl font-bold text-navy-900 mb-6">How We Implement AI</h3>
          
          {/* Interactive Implementation Cards */}
          <div className="mt-8">
            <h4 className="text-2xl font-bold text-navy-900 text-center mb-8">See Our Process in Action</h4>
            <AnimatedCardDemo />
          </div>
          
          <div className="mt-8">
            <Button 
              asChild
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link href="/pricing">
                Get Implementation Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-3">No technical setup required, we handle everything for you.</p>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="bg-transparent backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-2xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">80%</div>
            <p className="text-gray-600">Reduction in manual tasks</p>
          </div>
          <div className="bg-transparent backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-2xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">3x</div>
            <p className="text-gray-600">Faster response times</p>
          </div>
          <div className="bg-transparent backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-2xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">$2M+</div>
            <p className="text-gray-600">Revenue recovered annually</p>
          </div>
          <div className="bg-transparent backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-2xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <p className="text-gray-600">AI agent availability</p>
          </div>
        </div>
      </div>
    </section>
  );
}
