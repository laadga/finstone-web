"use client";

import { 
  DollarSign, 
  Zap, 
  TrendingUp, 
  Plug, 
  Brain, 
  Target 
} from "lucide-react";

export function BenefitsSection() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Cut Costs Without Cutting Growth",
      description: "💰 Hire AI agents at a fraction of the cost of a full-time employee. Instead of paying a salary, taxes, and benefits, you plug in a digital employee for a predictable monthly subscription.",
      color: "green"
    },
    {
      icon: Zap,
      title: "Always-On Performance",
      description: "⚡ No sick days. No burnout. No downtime. Your AI agents work 24/7, instantly responding, analyzing, and delivering so your business never slows down.",
      color: "yellow"
    },
    {
      icon: TrendingUp,
      title: "Scale Without Hiring Pains",
      description: "📈 Add a new \"team member\" in minutes, not months. Skip interviews, contracts, and training. Just activate a new AI agent when your business needs it.",
      color: "blue"
    },
    {
      icon: Plug,
      title: "Plug & Play With Your Systems",
      description: "🔌 No complicated setup. No IT headaches. Our AI employees integrate seamlessly with the tools you already use from CRMs to spreadsheets so you see results from day one.",
      color: "purple"
    },
    {
      icon: Brain,
      title: "Smarter Decisions, Faster",
      description: "🧠 Turn data into action instantly. Your AI CFO or analyst doesn't just crunch numbers, it highlights trends and recommends moves to grow your business.",
      color: "indigo"
    },
    {
      icon: Target,
      title: "Focus On What Actually Matters",
      description: "🎯 Free your human team from repetitive tasks. Let AI handle the admin, scheduling, or reporting, so your people can spend their time building relationships and closing deals.",
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return {
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          border: 'border-green-200'
        };
      case 'yellow':
        return {
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          border: 'border-yellow-200'
        };
      case 'blue':
        return {
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          border: 'border-blue-200'
        };
      case 'purple':
        return {
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
          border: 'border-purple-200'
        };
      case 'indigo':
        return {
          iconBg: 'bg-indigo-100',
          iconColor: 'text-indigo-600',
          border: 'border-indigo-200'
        };
      case 'orange':
        return {
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-600',
          border: 'border-orange-200'
        };
      default:
        return {
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600',
          border: 'border-gray-200'
        };
    }
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
            Why Choose AI Agents?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your business operations with intelligent automation that works around the clock
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const colorClasses = getColorClasses(benefit.color);
              return (
                <div 
                  key={index}
                  className={`bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border ${colorClasses.border} transition-all duration-200 hover:shadow-xl hover:scale-105`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${colorClasses.iconBg} flex-shrink-0`}>
                      <benefit.icon className={`h-6 w-6 ${colorClasses.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-navy-900 mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}






















