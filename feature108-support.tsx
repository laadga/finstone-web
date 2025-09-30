import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Ticket, BookOpen, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SupportFeature108 = () => {
  const tabs = [
    {
      value: "chat",
      icon: <MessageSquare className="h-auto w-4 shrink-0" />,
      label: "Live Chat",
      content: {
        badge: "AI Chat Support",
        title: "Instant customer support",
        description:
          "Provide real-time assistance through intelligent chat agents that understand context, answer questions, and escalate complex issues to human agents when needed. Available 24/7 for your customers.",
        buttonText: "Try it",
        imageSrc:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Live chat support interface",
      },
    },
    {
      value: "tickets",
      icon: <Ticket className="h-auto w-4 shrink-0" />,
      label: "Ticket Management",
      content: {
        badge: "Smart Resolution",
        title: "Intelligent ticket management",
        description:
          "Deploy AI agents that categorize, prioritize, and resolve common issues automatically. Our intelligent system learns from interactions and provides accurate solutions while escalating complex cases to human agents.",
        buttonText: "Try it",
        imageSrc:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Ticket management dashboard",
      },
    },
    {
      value: "knowledge",
      icon: <BookOpen className="h-auto w-4 shrink-0" />,
      label: "Knowledge Base",
      content: {
        badge: "Self-Service",
        title: "Maintain and update knowledge bases",
        description:
          "Keep your knowledge base current with AI agents that learn from customer interactions and automatically update documentation. Provide accurate self-service support that reduces ticket volume and improves customer satisfaction.",
        buttonText: "Try it",
        imageSrc:
          "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Knowledge base interface",
      },
    },
  ];

  return (
    <section className="pt-8 pb-16 bg-transparent">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">Support Department</Badge>
          <h1 className="max-w-2xl text-3xl font-semibold md:text-4xl">
            Deliver exceptional customer service
          </h1>
          <p className="text-muted-foreground">
            Deploy intelligent support agents that provide instant, accurate responses and resolve issues 24/7.
          </p>
        </div>
        <Tabs defaultValue={tabs[0].value} className="mt-8">
          <TabsList className="container flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10 bg-transparent p-2">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mx-auto mt-8 max-w-screen-xl rounded-2xl bg-gradient-to-br from-blue-50/30 to-blue-100/20 backdrop-blur-sm border border-white/30 shadow-2xl shadow-blue-300/30 p-6 lg:p-16">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit bg-background">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-3xl font-semibold lg:text-5xl">
                    {tab.content.title}
                  </h3>
                  <p className="text-muted-foreground lg:text-lg">
                    {tab.content.description}
                  </p>
                  <Button className="mt-2.5 w-fit gap-2 bg-blue-600 hover:bg-blue-700 text-white" size="default">
                    {tab.content.buttonText}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <img
                  src={tab.content.imageSrc}
                  alt={tab.content.imageAlt}
                  className="rounded-xl"
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { SupportFeature108 };
