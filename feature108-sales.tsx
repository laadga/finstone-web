import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Search, Mail, ArrowRight } from "lucide-react";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SalesFeature108 = () => {
  const tabs = [
    {
      value: "lead-gen",
      icon: <Search className="h-auto w-4 shrink-0" />,
      label: "Lead Generation",
      content: {
        badge: "AI Prospecting",
        title: "Find leads across 200+ sources",
        description:
          "Use Finstone's 200+ web scrapers to find your perfect leads. Your AI agent scans databases, social platforms, and business directories to identify high-quality prospects that match your ideal customer profile.",
        buttonText: "Try it",
        imageSrc:
          "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Lead generation dashboard",
      },
    },
    {
      value: "lead-qual",
      icon: <Target className="h-auto w-4 shrink-0" />,
      label: "Lead Qualification",
      content: {
        badge: "Smart Scoring",
        title: "Intelligent lead scoring and qualification",
        description:
          "Our AI agents use advanced algorithms to score and qualify leads based on your custom criteria. Get real-time insights and prioritize the most promising prospects for maximum conversion rates.",
        buttonText: "Try it",
        imageSrc:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Lead qualification interface",
      },
    },
    {
      value: "lead-outreach",
      icon: <Mail className="h-auto w-4 shrink-0" />,
      label: "Lead Outreach",
      content: {
        badge: "Personalized Outreach",
        title: "Convert prospects into customers",
        description:
          "Deploy AI agents that craft personalized email sequences and LinkedIn outreach campaigns. Our agents work 24/7 to nurture leads and convert them into paying customers with human-like personalization.",
        buttonText: "Try it",
        imageSrc:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Email outreach dashboard",
      },
    },
  ];

  return (
    <section className="pt-16 pb-8 bg-transparent">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">Sales Department</Badge>
          <h1 className="max-w-2xl text-3xl font-semibold md:text-4xl">
            Close more deals than ever
          </h1>
          <p className="text-muted-foreground">
            Deploy AI agents that work 24/7 to find, qualify, and convert leads into customers.
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
                {tab.value === "lead-gen" ? (
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200">
                    <CpuArchitecture 
                      width="400"
                      height="200"
                      text="AI"
                      showCpuConnections={true}
                      animateText={true}
                      animateLines={true}
                      animateMarkers={true}
                    />
                  </div>
                ) : (
                  <img
                    src={tab.content.imageSrc}
                    alt={tab.content.imageAlt}
                    className="rounded-xl"
                  />
                )}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { SalesFeature108 };
