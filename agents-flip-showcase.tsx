import CardFlip from './flip-card';

const AgentsFlipShowcase = () => {
  const agents = [
    {
      title: 'AI Sales Agents',
      subtitle: 'Automate your sales pipeline',
      description: 'Deploy AI agents that work 24/7 to find, qualify, and convert leads using advanced automation workflows.',
      features: [
        'Lead Generation & Enrichment',
        'Automated Email Sequences', 
        'CRM Data Management',
        'Sales Pipeline Optimization',
        'Customer Onboarding',
        'Revenue Forecasting'
      ],
      color: '#3b82f6', // Blue
      orbColors: {
        c1: "oklch(70% 0.15 250)", // Blue
        c2: "oklch(75% 0.12 280)", // Purple-blue
        c3: "oklch(80% 0.10 200)"  // Light blue
      }
    },
    {
      title: 'AI Marketing Agents',
      subtitle: 'Scale content & campaigns',
      description: 'Deploy specialized marketing agents that create content, manage campaigns, and analyze performance automatically.',
      features: [
        'Content Generation & SEO',
        'Social Media Automation',
        'Email Marketing Campaigns',
        'Ad Performance Optimization',
        'Brand Monitoring',
        'Customer Segmentation'
      ],
      color: '#8b5cf6', // Purple
      orbColors: {
        c1: "oklch(75% 0.15 320)", // Purple
        c2: "oklch(80% 0.12 300)", // Pink-purple
        c3: "oklch(85% 0.10 280)"  // Light purple
      }
    },
    {
      title: 'AI Support Agents',
      subtitle: '24/7 customer service',
      description: 'Deploy intelligent support agents that provide instant responses, manage tickets, and resolve issues automatically.',
      features: [
        'Multi-channel Chat Support',
        'Automated Ticket Routing',
        'Knowledge Base Management',
        'Sentiment Analysis',
        'Escalation Handling',
        'Customer Satisfaction Tracking'
      ],
      color: '#10b981', // Green
      orbColors: {
        c1: "oklch(70% 0.15 150)", // Green
        c2: "oklch(75% 0.12 180)", // Teal
        c3: "oklch(80% 0.10 120)"  // Light green
      }
    },
    {
      title: 'AI Operations Agents',
      subtitle: 'Streamline business processes',
      description: 'Deploy AI agents that optimize operations, manage workflows, and automate routine business tasks.',
      features: [
        'Process Automation',
        'Workflow Optimization',
        'Resource Management',
        'Performance Monitoring',
        'Task Scheduling',
        'Quality Assurance'
      ],
      color: '#06b6d4', // Cyan
      orbColors: {
        c1: "oklch(70% 0.15 200)", // Cyan
        c2: "oklch(75% 0.12 220)", // Blue-cyan
        c3: "oklch(80% 0.10 180)"  // Light cyan
      }
    },
    {
      title: 'AI Analytics Agents',
      subtitle: 'Data-driven insights',
      description: 'Deploy AI agents that analyze business data, generate reports, and provide predictive insights for growth.',
      features: [
        'Real-time Data Analysis',
        'Predictive Analytics',
        'Custom Report Generation',
        'Trend Identification',
        'Performance Dashboards',
        'ROI Optimization'
      ],
      color: '#ec4899', // Pink
      orbColors: {
        c1: "oklch(70% 0.15 340)", // Pink
        c2: "oklch(75% 0.12 320)", // Purple-pink
        c3: "oklch(80% 0.10 360)"  // Light pink
      }
    }
  ];

  return (
    <section id="ai-agents" className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Your First AI Employees
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deploy specialized AI agents across every department to automate your workflows and scale your operations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-8xl mx-auto">
          {agents.map((agent, index) => (
            <CardFlip
              key={index}
              title={agent.title}
              subtitle={agent.subtitle}
              description={agent.description}
              features={agent.features}
              color={agent.color}
              orbColors={agent.orbColors}
              autoFlip={index === 0} // Enable auto-flip for the first card
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsFlipShowcase;
