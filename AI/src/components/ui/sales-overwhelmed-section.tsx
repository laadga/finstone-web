"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  TrendingDown,
  DollarSign,
  Users,
  Target,
} from "lucide-react";

const painPoints = [
  {
    title: "Leads slipping through cracks",
    subtitle: "Missing 40% of potential opportunities",
    icon: <AlertTriangle className="w-4 h-4 text-blue-600" />,
  },
  {
    title: "Manual outreach overload",
    subtitle: "Spending 6+ hours daily on repetitive tasks",
    icon: <Clock className="w-4 h-4 text-blue-600" />,
  },
  {
    title: "Slow follow-ups = lost deals",
    subtitle: "Average response time: 2+ days",
    icon: <TrendingDown className="w-4 h-4 text-blue-600" />,
  },
  {
    title: "Rising hiring costs",
    subtitle: "Training new reps costs $50K+ per hire",
    icon: <DollarSign className="w-4 h-4 text-blue-600" />,
  },
  {
    title: "Team burnout & turnover",
    subtitle: "67% of sales reps consider quitting",
    icon: <Users className="w-4 h-4 text-blue-600" />,
  },
  {
    title: "Inconsistent performance",
    subtitle: "Top performers vs average: 300% gap",
    icon: <Target className="w-4 h-4 text-blue-600" />,
  },
];

export default function SalesOverwhelmedSection() {
  return (
    <section className="relative w-full py-20 px-4">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* LEFT SIDE - Pain Points Loop */}
        <div className="relative w-full max-w-md">
          <Card className="overflow-hidden bg-white/60 backdrop-blur-md shadow-xl rounded-xl border border-white/30">
            <CardContent className="relative h-[400px] p-0 overflow-hidden">
              {/* Scrollable Container */}
              <div className="relative h-full overflow-hidden">
                {/* Motion list */}
                <motion.div
                  className="flex flex-col gap-0 absolute w-full"
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 16,
                    ease: "linear",
                  }}
                >
                  {[...painPoints, ...painPoints].map((point, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 px-6 py-4 border-b border-gray-200/50 relative bg-white/40"
                    >
                      {/* Icon + Content */}
                      <div className="flex items-center justify-between flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-md flex items-center justify-center">
                            {point.icon}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-navy-900">{point.title}</p>
                            <p className="text-xs text-gray-600">{point.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Fade effect only inside card */}
                <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white/80 via-white/40 to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/80 via-white/40 to-transparent pointer-events-none z-10" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE - Content */}
        <div className="space-y-6">
          <Badge variant="secondary" className="px-4 py-2 text-sm bg-blue-100 text-blue-700 border-blue-200">
            Sales Team Crisis
          </Badge>
          <h2 className="text-4xl font-bold text-navy-900 leading-tight">
            Sales Teams Are Overwhelmed. Here's Why.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Your sales team is drowning in manual work, missing opportunities, and burning out. 
            The traditional approach to sales is broken, it's time for AI to take over the repetitive tasks 
            so your team can focus on what they do best: closing deals.
          </p>

          <div className="flex gap-3 flex-wrap">
            <Badge className="px-4 py-2 text-sm bg-blue-100 text-blue-700 border-blue-200">Manual Overload</Badge>
            <Badge className="px-4 py-2 text-sm bg-blue-100 text-blue-700 border-blue-200">Missed Opportunities</Badge>
            <Badge className="px-4 py-2 text-sm bg-blue-100 text-blue-700 border-blue-200">High Turnover</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
