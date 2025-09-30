import { ArrowRight, Search, Zap, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  imageCaption?: string;
  badge: string;
}

interface HowItWorksProps {
  tagline?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  steps?: Step[];
}

const HowItWorks = ({
  tagline = "Easy as one, two, three",
  heading = "How it works",
  description = "",
  buttonText = "Try for free",
  buttonUrl = "#contact",
  steps = [
    {
      id: "step-1",
      title: "Choose Your Agent",
      description: "Pick the digital employee you need: CFO, Sales Closer, Customer Success, and more.",
      icon: <Search className="w-6 h-6" />,
      image: "/capture.png",
      badge: "Step 1"
    },
    {
      id: "step-2",
      title: "Connect Your Tools",
      description: "Seamlessly integrate with your CRM, email, and finance stack in minutes.",
      icon: <Zap className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format",
      badge: "Step 2"
    },
    {
      id: "step-3",
      title: "Let AI Take Over",
      description: "Your agent runs 24/7, automating tasks, cutting costs, and driving growth.",
      icon: <CheckCircle className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format",
      badge: "Step 3"
    },
  ],
}: HowItWorksProps) => {
  return (
    <section className="py-32 bg-transparent">
      <div className="container mx-auto flex flex-col gap-16 lg:px-16">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
              {heading}
            </h2>
            <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
              {description}
            </p>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
            Try for free
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {steps.map((step) => (
            <Card key={step.id} className="grid grid-rows-[auto_auto_1fr_auto] bg-white/80 backdrop-blur-sm border-gray-200">
              <div className="aspect-[4/3] w-full relative">
                <img
                  src={step.image}
                  alt={step.title}
                  className="h-full w-full object-contain object-center"
                />
                {step.imageCaption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm px-3 py-2">
                    {step.imageCaption}
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{step.badge}</Badge>
                </div>
                <h3 className="text-lg font-semibold md:text-xl">
                  {step.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { HowItWorks };