"use client";

import { Pricing } from "@/components/ui/pricing";

const finstonePlans = [
  {
    name: "AI AUDIT",
    price: "1500",
    yearlyPrice: "1200",
    period: "one-time",
    features: [
      "In-depth AI employees analysis",
      "Audit report with clear action plan",
      "ROI projections tailored to your workflows",
      "Email support",
    ],
    description: "Comprehensive AI analysis for your business",
    buttonText: "Book Free Call",
    href: "https://calendly.com/finstone/custom",
    isPopular: false,
    bestFor: "businesses exploring how AI can create leverage before committing to a full workforce.",
  },
  {
    name: "AI WORKFORCE",
    price: "2000",
    yearlyPrice: "1600",
    period: "per month",
    features: [
      "AI agents set up & managed for your business",
      "Standard integrations (Slack, HubSpot, Gmail, etc.)",
      "Custom CRM dashboards",
      "Ongoing optimization & monitoring",
      "24/7 support",
      "ROI tracking & reporting",
    ],
    description: "Your AI employee team on autopilot",
    buttonText: "Book Free Call",
    href: "https://calendly.com/finstone/custom",
    isPopular: true,
    bestFor: "companies ready to scale with AI employees and see ongoing returns.",
  },
  {
    name: "ENTERPRISE",
    price: "Custom",
    yearlyPrice: "Custom",
    period: "Quote",
    features: [
      "Everything in AI Workforce, plus...",
      "Custom integrations & workflows",
      "Advanced compliance & security",
      "API access & automation at scale",
      "SLA guarantee",
      "Dedicated account manager",
    ],
    description: "Custom solutions for large organizations",
    buttonText: "Talk to Sales",
    href: "https://calendly.com/finstone/custom",
    isPopular: false,
    bestFor: "enterprises replacing entire teams with AI and needing tailor-made solutions.",
  },
];

function PricingDemo() {
  return (
    <Pricing 
      plans={finstonePlans}
      title="Hire Your AI Employees with Finstone AI"
      description="Choose the plan that works for you. All plans include access to our platform, AI workforce tools, and dedicated support."
    />
  );
}

export { PricingDemo };