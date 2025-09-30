import {
  AnimatedCard,
  CardBody,
  CardDescription,
  CardTitle,
  CardVisual,
  Visual2,
} from "@/components/ui/animated-card-diagram";

export function AnimatedCardDemo() {
  return (
    <div className="flex justify-center gap-12 p-8 w-full max-w-none mx-auto px-4">
      <AnimatedCard className="scale-110">
        <CardVisual>
          <Visual2 
            mainColor="#3b82f6" 
            secondaryColor="#10b981"
            hoverText="Process Analysis Complete"
            hoverSubtext="Identifying automation opportunities"
            floatingItems={[
              { id: 1, translateX: "100", translateY: "50", text: "Process Audit" },
              { id: 2, translateX: "100", translateY: "-50", text: "Strategy" },
              { id: 3, translateX: "125", translateY: "0", text: "Analysis" },
              { id: 4, translateX: "-125", translateY: "0", text: "Research" },
              { id: 5, translateX: "-100", translateY: "50", text: "Planning" },
              { id: 6, translateX: "-100", translateY: "-50", text: "Assessment" },
            ]}
          />
        </CardVisual>
        <CardBody>
          <CardTitle>Discovery & Strategy</CardTitle>
          <CardDescription>
            Comprehensive audit of your current processes to identify the highest-impact AI automation opportunities
          </CardDescription>
        </CardBody>
      </AnimatedCard>

      <AnimatedCard className="scale-110">
        <CardVisual>
          <Visual2 
            mainColor="#8b5cf6" 
            secondaryColor="#f59e0b"
            hoverText="Development Complete"
            hoverSubtext="AI agents ready for deployment"
            floatingItems={[
              { id: 1, translateX: "100", translateY: "50", text: "Development" },
              { id: 2, translateX: "100", translateY: "-50", text: "Testing" },
              { id: 3, translateX: "125", translateY: "0", text: "Deployment" },
              { id: 4, translateX: "-125", translateY: "0", text: "Integration" },
              { id: 5, translateX: "-100", translateY: "50", text: "Configuration" },
              { id: 6, translateX: "-100", translateY: "-50", text: "Setup" },
            ]}
          />
        </CardVisual>
        <CardBody>
          <CardTitle>Build & Deploy</CardTitle>
          <CardDescription>
            Custom AI agents are developed, tested, and seamlessly integrated into your existing business systems
          </CardDescription>
        </CardBody>
      </AnimatedCard>

      <AnimatedCard className="scale-110">
        <CardVisual>
          <Visual2 
            mainColor="#10b981" 
            secondaryColor="#ef4444"
            hoverText="Optimization Active"
            hoverSubtext="Monitoring performance metrics"
            floatingItems={[
              { id: 1, translateX: "100", translateY: "50", text: "Monitoring" },
              { id: 2, translateX: "100", translateY: "-50", text: "Optimization" },
              { id: 3, translateX: "125", translateY: "0", text: "Scaling" },
              { id: 4, translateX: "-125", translateY: "0", text: "Analytics" },
              { id: 5, translateX: "-100", translateY: "50", text: "Tuning" },
              { id: 6, translateX: "-100", translateY: "-50", text: "Growth" },
            ]}
          />
        </CardVisual>
        <CardBody>
          <CardTitle>Optimize & Scale</CardTitle>
          <CardDescription>
            Continuous monitoring, performance tuning, and expansion of your AI workforce for maximum efficiency
          </CardDescription>
        </CardBody>
      </AnimatedCard>
    </div>
  );
}
