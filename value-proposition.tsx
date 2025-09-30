"use client";

import { Zap, Users, TrendingUp } from "lucide-react";

export function ValueProposition() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-gray-600" />,
      title: "Plug & Play AI Agents",
      description: "Deploy CFO Assistants, Lead Gen bots, and more. Ready-to-use AI employees that integrate seamlessly with your existing systems."
    },
    {
      icon: <Users className="w-8 h-8 text-gray-600" />,
      title: "Expert-Led Audits",
      description: "Consulting insight + AI-powered systems. Our team of experts combines human intelligence with AI analysis for comprehensive audits."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-gray-600" />,
      title: "Proven ROI",
      description: "Measurable savings and efficiency. Our clients typically see 10-30x return on investment within the first year."
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
            Why Finstone AI?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine the power of AI with human expertise to deliver results that traditional consulting can't match.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 md:p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
