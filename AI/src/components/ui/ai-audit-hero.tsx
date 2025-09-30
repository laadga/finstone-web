"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { RoadmapCard } from "@/components/ui/roadmap-card";

export function AIAuditHero() {
  return (
    <section id="audit" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-navy-900 mb-6 leading-tight">
            Business Audit
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Discover hidden automation opportunities and recover $100K+ in lost revenue with our comprehensive AI-powered business audit.
          </p>
          
          {/* Key Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-gray-700">ROI Guaranteed</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-gray-700">Fast Turnaround</span>
            </div>
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-gray-700">$100K+ Recovery</span>
            </div>
          </div>

        </div>

        {/* Timeline Below */}
        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            <RoadmapCard
              title="AI Audit Process"
              description="Our proven methodology for identifying automation opportunities"
              items={[
                {
                  quarter: "Step 1",
                  title: "Business Analysis",
                  description: "Deep dive into your processes and workflows",
                  status: "done",
                },
                {
                  quarter: "Step 2",
                  title: "AI Opportunity Scan",
                  description: "Identify automation potential and bottlenecks",
                  status: "in-progress",
                },
                {
                  quarter: "Step 3",
                  title: "ROI Report",
                  description: "Detailed implementation plan and savings projection",
                  status: "upcoming",
                },
                {
                  quarter: "Step 4",
                  title: "Implementation Support",
                  description: "Ongoing guidance for successful AI adoption",
                  status: "upcoming",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
