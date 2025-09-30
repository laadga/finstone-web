"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative">

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-navy-900 mb-8 leading-tight max-w-5xl mx-auto animate-fade-in-up">
          Scale Smarter with AI.<br />
          <span className="text-accent-blue">Keep the Human Insight.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
          Finstone AI helps you plug in AI employees or run a full financial systems audit. 
          Save time, cut costs, and scale profitably.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
          <Button 
            size="lg"
            className="bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            asChild
          >
            <Link href="#contact">
              Get Started
            </Link>
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
            asChild
          >
            <Link href="#ai-agents">
              Explore AI Agents
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
