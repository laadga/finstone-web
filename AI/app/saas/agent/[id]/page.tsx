"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AgentDetailPage from '@/components/ui/agent-detail-page';

// Sample agent data - in a real app, this would come from an API
const getAgentData = (id: string) => {
  const agents = {
    'ai-sales-agents': {
      id: "ai-sales-agents",
      name: "AI Sales Agents",
      description: "Deploy AI agents that work 24/7 to find, qualify, and convert leads using advanced automation workflows. This comprehensive sales automation system monitors multiple channels, analyzes prospect behavior, and executes personalized outreach sequences.",
      category: "Sales Automation",
      lastUpdated: "Last update 2 weeks ago",
      createdBy: {
        name: "Sarah Chen",
        avatar: "/avatars/sarah.jpg",
        verified: true
      },
      workflow: {
        title: "AI Sales Agents - Comprehensive Lead Management",
        description: "Multi-agent AI system for end-to-end sales automation",
        steps: [
          {
            id: 1,
            title: "Lead Discovery Agent",
            subtitle: "Automatically finds and qualifies prospects:",
            icon: "🔍",
            details: [
              "Scans LinkedIn, company websites, and industry databases",
              "Identifies decision-makers and key stakeholders",
              "Analyzes company size, industry, and technology stack",
              "Scores leads based on ideal customer profile criteria",
              "Updates CRM with enriched prospect information"
            ]
          },
          {
            id: 2,
            title: "Email Outreach Agent",
            subtitle: "Manages personalized email sequences:",
            icon: "📧",
            details: [
              "Crafts personalized emails using company research",
              "Sends follow-up sequences based on engagement",
              "A/B tests subject lines and content variations",
              "Tracks open rates, click rates, and response rates",
              "Handles unsubscribe requests automatically"
            ]
          },
          {
            id: 3,
            title: "CRM Management Agent",
            subtitle: "Maintains organized sales pipeline:",
            icon: "📊",
            details: [
              "Updates lead status based on interactions",
              "Schedules follow-up tasks and reminders",
              "Tracks deal progression and stage changes",
              "Generates sales reports and analytics",
              "Integrates with calendar for meeting scheduling"
            ]
          }
        ]
      },
      tools: [
        "HubSpot: CRM integration and lead management",
        "Salesforce: Enterprise CRM and pipeline tracking",
        "LinkedIn Sales Navigator: Prospect research and outreach",
        "Apollo: Email automation and sequence management",
        "Claude AI: Email content generation and personalization",
        "Calendly: Meeting scheduling and calendar integration"
      ],
      features: [
        "Automated lead generation and qualification",
        "Personalized email sequence management",
        "Multi-channel prospect research and enrichment",
        "CRM integration and pipeline management",
        "A/B testing for email campaigns",
        "Real-time sales analytics and reporting"
      ],
      useCases: [
        "Sales teams needing automated lead generation",
        "B2B companies with high-volume prospecting",
        "Sales managers requiring pipeline visibility",
        "Outbound sales teams scaling operations",
        "Companies wanting consistent follow-up processes"
      ],
      integrations: ["HubSpot", "Salesforce", "LinkedIn", "Apollo", "Claude AI", "Calendly"]
    },
    'ai-support-agents': {
      id: "ai-support-agents",
      name: "AI Support Agents",
      description: "Deploy intelligent support agents that provide instant responses, manage tickets, and resolve issues automatically. This system handles multi-channel customer inquiries with advanced natural language processing and automated escalation protocols.",
      category: "Customer Support",
      lastUpdated: "Last update 1 month ago",
      createdBy: {
        name: "Alex Rodriguez",
        avatar: "/avatars/alex.jpg",
        verified: true
      },
      workflow: {
        title: "AI Support Agents - Intelligent Customer Service",
        description: "Multi-agent AI system for comprehensive customer support",
        steps: [
          {
            id: 1,
            title: "Ticket Classification Agent",
            subtitle: "Automatically categorizes and prioritizes tickets:",
            icon: "🏷️",
            details: [
              "Analyzes incoming support requests by category",
              "Assigns priority levels based on urgency and impact",
              "Routes tickets to appropriate support teams",
              "Identifies common issues and patterns",
              "Creates knowledge base entries for recurring problems"
            ]
          },
          {
            id: 2,
            title: "Response Generation Agent",
            subtitle: "Provides instant, accurate responses:",
            icon: "💬",
            details: [
              "Generates contextual responses using knowledge base",
              "Provides step-by-step troubleshooting guides",
              "Escalates complex issues to human agents",
              "Maintains conversation context and history",
              "Offers proactive solutions based on user behavior"
            ]
          },
          {
            id: 3,
            title: "Quality Assurance Agent",
            subtitle: "Monitors and improves support quality:",
            icon: "✅",
            details: [
              "Tracks resolution times and customer satisfaction",
              "Identifies areas for process improvement",
              "Monitors agent performance and provides feedback",
              "Analyzes customer feedback for service enhancement",
              "Generates support analytics and reports"
            ]
          }
        ]
      },
      tools: [
        "Zendesk: Ticketing system and customer management",
        "Intercom: Live chat and customer communication",
        "Slack: Internal team communication and alerts",
        "GPT-4: Natural language processing and response generation",
        "Crisp: Multi-channel customer support platform",
        "Freshdesk: Alternative ticketing and helpdesk solution"
      ],
      features: [
        "Multi-channel support (email, chat, phone, social)",
        "Automated ticket classification and routing",
        "Intelligent response generation and suggestions",
        "Real-time escalation to human agents",
        "Comprehensive knowledge base integration",
        "Performance analytics and quality monitoring"
      ],
      useCases: [
        "E-commerce companies with high support volume",
        "SaaS platforms needing 24/7 customer assistance",
        "Service businesses requiring consistent support quality",
        "Companies wanting to reduce support response times",
        "Organizations scaling customer service operations"
      ],
      integrations: ["Zendesk", "Intercom", "Slack", "GPT-4", "Crisp", "Freshdesk"]
    }
  };

  return agents[id as keyof typeof agents] || agents['ai-sales-agents'];
};

export default function AgentDetail() {
  const params = useParams();
  const router = useRouter();
  const agentId = params.id as string;
  const agentData = getAgentData(agentId);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [router]);

  return <AgentDetailPage agent={agentData} />;
}