"use client";

import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";

export function ConsultingPath() {
  return (
    <section id="audit" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left side - Text content */}
          <div className="animate-slide-in-left">
            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
              Prefer a Human-Led Strategy First?
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Our AI Audit™ reveals inefficiencies, projects ROI, and builds a roadmap to scale. 
              Get expert insights combined with AI-powered analysis to transform your business.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-accent-blue rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Comprehensive Analysis</h3>
                  <p className="text-gray-600">AI scans every transaction, process, and system to identify hidden opportunities.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-accent-blue rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Expert Review</h3>
                  <p className="text-gray-600">Our team adds human insights and strategic recommendations to AI findings.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-accent-blue rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Actionable Roadmap</h3>
                  <p className="text-gray-600">Get a step-by-step plan with ROI projections and implementation timeline.</p>
                </div>
              </div>
            </div>
            
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Book Your Audit
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          
          {/* Right side - Illustration */}
          <div className="relative animate-slide-in-right">
            <div className="bg-gray-100/50 backdrop-blur-sm rounded-2xl p-8 h-96 flex items-center justify-center border border-gray-300/50">
              <div className="text-center">
                <FileText className="w-24 h-24 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-navy-900 mb-2">AI Audit™ Report</h3>
                <p className="text-gray-600">Comprehensive analysis delivered in 14 days</p>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center">
              <span className="text-accent-blue font-bold text-lg">AI</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-navy-900/20 rounded-full flex items-center justify-center">
              <span className="text-navy-900 font-bold text-sm">ROI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
