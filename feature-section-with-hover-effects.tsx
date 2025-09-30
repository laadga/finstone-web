import { cn } from "@/lib/utils";
import { 
  Terminal, 
  Zap, 
  DollarSign, 
  Cloud, 
  Route, 
  HelpCircle, 
  Settings, 
  Heart 
} from "lucide-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "AI-Powered Financial Analysis",
      description:
        "Advanced AI agents analyze your financial systems to identify hidden inefficiencies and cost-saving opportunities.",
      icon: <Terminal className="w-6 h-6" />,
    },
    {
      title: "Easy Implementation",
      description:
        "Deploy AI workforce solutions in days, not months. No complex setup or technical expertise required.",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "Transparent Pricing",
      description:
        "Clear, upfront pricing with no hidden fees. Pay only for what you need, when you need it.",
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      title: "24/7 AI Workforce",
      description: "Your AI agents work around the clock, never take breaks, and never make human errors.",
      icon: <Cloud className="w-6 h-6" />,
    },
    {
      title: "Scalable Solutions",
      description: "Grow your AI workforce as your business grows. Add or remove agents instantly.",
      icon: <Route className="w-6 h-6" />,
    },
    {
      title: "Expert Support",
      description:
        "Dedicated support team with deep expertise in AI implementation and financial optimization.",
      icon: <HelpCircle className="w-6 h-6" />,
    },
    {
      title: "Comprehensive Audit",
      description:
        "Complete financial system analysis covering processes, workflows, and automation opportunities.",
      icon: <Settings className="w-6 h-6" />,
    },
    {
      title: "Proven Results",
      description: "Trusted by $2M-$50M businesses with over $85M in recovered profits and savings.",
      icon: <Heart className="w-6 h-6" />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
