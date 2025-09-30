import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenTool, Share2, Mail, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MarketingFeature108 = () => {
  const tabs = [
    {
      value: "content",
      icon: <PenTool className="h-auto w-4 shrink-0" />,
      label: "Content Creation",
      content: {
        badge: "AI Content",
        title: "Create engaging content at scale",
        description:
          "Generate blog posts, social media content, and marketing copy that resonates with your audience. Our AI agents understand your brand voice and create compelling content that drives engagement and conversions.",
        buttonText: "Try it",
        imageSrc:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Content creation workspace",
      },
    },
    {
      value: "social",
      icon: <Share2 className="h-auto w-4 shrink-0" />,
      label: "Social Media",
      content: {
        badge: "Social Management",
        title: "Automated social media management",
        description:
          "Deploy AI agents that handle all your social media platforms. From posting content to engaging with your audience, our agents work 24/7 to grow your brand and drive engagement across all channels.",
        buttonText: "Try it",
        imageSrc:
          "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Social media dashboard",
      },
    },
    {
      value: "email",
      icon: <Mail className="h-auto w-4 shrink-0" />,
      label: "Email Marketing",
      content: {
        badge: "Email Campaigns",
        title: "Personalized email sequences",
        description:
          "Create and manage sophisticated email marketing campaigns with AI. Our agents craft personalized sequences, run A/B tests, and optimize for maximum ROI with automated nurture campaigns.",
        buttonText: "Try it",
        imageSrc:
          "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Email marketing interface",
      },
    },
  ];

  return (
    <section className="py-8 bg-transparent">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">Marketing Department</Badge>
          <h1 className="max-w-2xl text-3xl font-semibold md:text-4xl">
            Scale your marketing efforts
          </h1>
          <p className="text-muted-foreground">
            Deploy specialized marketing agents that work around the clock to grow your brand and drive engagement.
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

export { MarketingFeature108 };
