import { Layout, Pointer, Zap, Users, Target, MessageSquare } from "lucide-react";

import { Feature108 } from "@/components/ui/shadcnblocks-com-feature108"

const demoData = {
  badge: "AI Agents",
  heading: "Deploy AI Agents That Work 24/7",
  description: "Transform your business with intelligent AI agents that handle sales, marketing, and support tasks automatically.",
  tabs: [
    {
      value: "sales",
      icon: <Target className="h-auto w-4 shrink-0" />,
      label: "Sales Agents",
      content: {
        badge: "Lead Generation",
        title: "Close more deals than ever with AI.",
        description:
          "Deploy AI agents that work 24/7 to find, qualify, and convert leads into customers. Our sales agents use advanced prospecting across 200+ sources to identify high-quality prospects that match your ideal customer profile.",
        buttonText: "Try Sales Agents",
        imageSrc:
          "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Sales dashboard showing lead generation metrics",
      },
    },
    {
      value: "marketing",
      icon: <Users className="h-auto w-4 shrink-0" />,
      label: "Marketing Agents",
      content: {
        badge: "Content Creation",
        title: "Scale your marketing with AI agents.",
        description:
          "Deploy specialized marketing agents that work around the clock to grow your brand and drive engagement. Generate blog posts, social media content, and marketing copy that resonates with your audience and drives conversions.",
        buttonText: "Start Marketing",
        imageSrc:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Marketing analytics dashboard",
      },
    },
    {
      value: "support",
      icon: <MessageSquare className="h-auto w-4 shrink-0" />,
      label: "Support Agents",
      content: {
        badge: "Live Chat",
        title: "Deliver exceptional customer service with AI.",
        description:
          "Deploy intelligent support agents that provide instant, accurate responses and resolve issues 24/7. Provide real-time assistance through intelligent chat agents that understand context and escalate complex issues when needed.",
        buttonText: "Get Support",
        imageSrc:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Customer support interface",
      },
    },
  ],
};

function Feature108Demo() {
  return <Feature108 {...demoData} />;
}

export { Feature108Demo };

























