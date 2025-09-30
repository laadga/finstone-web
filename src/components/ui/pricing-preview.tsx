"use client";

import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

export function PricingPreview() {
  const plans = [
    {
      title: "AI Agents",
      price: "From $497/month",
      description: "per agent",
      features: [
        "Deploy specialized AI employees",
        "24/7 automated operations",
        "Real-time monitoring & reporting",
        "Easy integration with existing systems",
        "Dedicated support team"
      ],
      cta: "See AI Agents",
      popular: false
    },
    {
      title: "Audit",
      price: "From $2,000",
      description: "flat rate",
      features: [
        "Comprehensive business analysis",
        "AI-powered inefficiency detection",
        "Expert human review & insights",
        "Detailed action roadmap",
        "ROI projections & tracking",
        "30-day implementation support"
      ],
      cta: "Book Your Audit",
      popular: true
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
            Flexible Plans for Every Business
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the approach that fits your needs. Deploy AI agents for ongoing optimization or get a comprehensive audit to start your transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                plan.popular 
                  ? 'border-accent-blue bg-accent-blue/10 backdrop-blur-sm' 
                  : 'border-gray-200/50 bg-white/95 backdrop-blur-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Most Popular
                </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-navy-900 mb-2">
                  {plan.title}
                </h3>
                <div className="text-4xl font-bold text-navy-900 mb-1">
                  {plan.price}
                </div>
                <p className="text-gray-600">
                  {plan.description}
                </p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-accent-blue mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
