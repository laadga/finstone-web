"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { EnhancedAIChat } from "./enhanced-ai-chat";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ConversationContext {
  currentTopic: string;
  userInfo: {
    businessSize?: string;
    industry?: string;
    painPoints?: string[];
  };
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Finstone's AI assistant. I can help you learn about our AI workforce, pricing, services, or answer any questions about our AI employees and consulting. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    currentTopic: '',
    userInfo: {}
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "What are AI employees?",
    "What's the pricing?",
    "AI Audit vs SaaS Platform",
    "How does implementation work?",
    "What integrations do you support?",
    "Contact support"
  ];

  const aiResponses = {
    // Company Overview
    "what does your company do": "We provide AI-powered 'employees' (AI agents) and consulting services to help businesses save time, reduce costs, and scale operations. Our AI employees work 24/7 in different departments like Sales, Marketing, Support, and Analytics.",
    "what are ai employees": "AI employees are specialized AI agents that act like digital workers in different departments: Sales, Marketing, Support, and Analytics. They work 24/7 and integrate seamlessly with your existing tools like Slack, HubSpot, Gmail, and CRM systems.",
    "what are ai agents": "AI agents are specialized AI employees that act like digital workers in different departments: Sales, Marketing, Support, and Analytics. They work 24/7 and integrate seamlessly with your existing tools like Slack, HubSpot, Gmail, and CRM systems.",
    
    // Services & Pricing
    "what's the pricing": "We offer three main services: **AI Audit** at $1,500 (one-time), **AI Workforce** at $2,000/month, and **Enterprise** with custom pricing. The AI Workforce includes ongoing AI employee services, CRM dashboards, and integrations. Would you like details about any specific service?",
    "what services do you offer": "We offer three main services: **AI Audit** ($1,500 one-time) - comprehensive analysis with automation roadmap, **AI Workforce** ($2,000/month) - ongoing AI employee services with CRM dashboards, and **Enterprise** (custom pricing) - custom-built AI workforce with dedicated support.",
    "how much do the services cost": "**AI Audit**: $1,500 one-time. **AI Workforce**: $2,000/month. **Enterprise**: Custom pricing. The AI Workforce includes ongoing AI employee services, CRM dashboards, and integrations. Do you need the Audit before getting AI Workforce? No, but it's recommended for maximum ROI.",
    
    // AI Audit vs SaaS Platform
    "ai audit vs saas platform": "Great question! The **AI Audit** is a one-time service where we analyze your workflows, identify automation opportunities, and deliver ROI projections. The **SaaS Platform** (coming soon) gives you direct access to AI agents you can use on a monthly subscription. The audit gives you a roadmap and ensures maximum ROI from AI employees.",
    "difference between ai audit and saas platform": "The **AI Audit** is a one-time service where we analyze your workflows, identify automation opportunities, and deliver ROI projections. The **SaaS Platform** (coming soon) gives you direct access to AI agents you can use on a monthly subscription. The audit gives you a roadmap and ensures maximum ROI from AI employees.",
    "do i need the audit before getting ai workforce": "No, but it's recommended! The audit gives you a roadmap and ensures maximum ROI from AI employees. It helps identify the best automation opportunities for your specific business.",
    
    // SaaS Platform (Coming Soon)
    "what is the saas platform": "The SaaS platform is a subscription-based platform where businesses can hire AI agents (sales, marketing, support, analytics) and manage them through a dashboard. It's currently in development and will be released soon.",
    "when will the saas platform be available": "The SaaS platform is currently in development and will be released soon. We'll notify you when it's ready!",
    "what is the battery system": "Instead of credits, we use a battery metaphor. Each agent uses part of your monthly battery when completing tasks. If the battery runs low, you can recharge. The quality of work does not decrease as the battery depletes—it only controls how much work agents can do.",
    
    // Integrations
    "what integrations do you support": "AI employees can integrate with Slack, HubSpot, Notion, Excel, Google Workspace, CRM systems, email platforms, and more. We handle integrations on the backend to make the process simple - clients connect apps securely without technical setup.",
    "what tools can ai employees integrate with": "Slack, HubSpot, Notion, Excel, Google Workspace, CRM systems, email platforms, and more. We handle integrations on the backend to make the process simple - clients connect apps securely without technical setup.",
    "do clients need to provide api keys": "No! We handle integrations on the backend to make the process simple. Clients connect apps securely without technical setup.",
    "can you build custom integrations": "Yes! Enterprise clients get custom integrations and workflows. We can build custom integrations for your specific business needs.",
    
    // Implementation Process
    "how does implementation work": "**AI Audit Process**: 1) Book the audit, 2) We analyze your workflows and current tools, 3) We create a roadmap showing ROI projections and where AI employees can help. **AI Workforce Onboarding**: 1) Choose your plan, 2) Get guided onboarding, 3) Start using AI employees with dashboards & support.",
    "how does an ai audit work": "1) Book the audit, 2) We analyze your workflows and current tools, 3) We create a roadmap showing ROI projections and where AI employees can help.",
    "how does ai workforce onboarding work": "1) Choose your plan, 2) Get guided onboarding, 3) Start using AI employees with dashboards & support.",
    
    // Support & Contact
    "what support do you provide": "**AI Audit**: Email support. **AI Workforce**: 24/7 support. **Enterprise**: Dedicated account manager & SLA guarantee. We're here to help you succeed!",
    "contact support": "I'm here to help! For technical support, email support@finstone.com. For sales inquiries, contact sales@finstone.com. You can also reach out through our website contact form or schedule a call with our team.",
    "how can i contact you": "Through our website contact form, email, or scheduling a call with our team. For technical support: support@finstone.com. For sales: sales@finstone.com.",
    
    // General responses
    "book a demo": "Great! I can help you schedule a personalized demo. Our demos show you exactly how our AI employees would work for your specific business. Would you like me to connect you with our sales team?",
    "default": "That's a great question! I'd be happy to help you learn more about our AI workforce solutions. Could you be more specific about what you'd like to know? I can tell you about our services, pricing, implementation process, or connect you with our team."
  };

  const detailedPricingInfo = `
**Detailed Service Breakdown:**

**🔍 AI Audit - $1,500 (one-time)**
Comprehensive analysis for your business
• In-depth AI employees analysis
• Audit report with clear action plan
• ROI projections tailored to your workflows
• Email support
• Perfect for businesses exploring AI before committing to a full workforce

**👥 AI Workforce - $2,000/month**
Your AI employee team on autopilot
• AI agents set up & managed for your business
• Standard integrations (Slack, HubSpot, Gmail, etc.)
• Custom CRM dashboards
• Ongoing optimization & monitoring
• 24/7 support
• ROI tracking & reporting
• Most popular choice for companies ready to scale

**🏢 Enterprise - Custom Pricing**
Custom solutions for large organizations
• Everything in AI Workforce, plus...
• Custom integrations & workflows
• Advanced compliance & security
• API access & automation at scale
• SLA guarantee
• Dedicated account manager
• Perfect for enterprises replacing entire teams with AI

**💡 Special Offer**
Get your AI Audit FREE when you start an AI Workforce subscription! This $1,500 value is included at no extra cost, making the $2,000/month plan an incredible value.

Would you like to know more about any specific service or discuss which one might be right for your business?
`;

  const agentDetails = {
    "sales": "Our AI Sales Employee works 24/7 to find and qualify leads for your business. It researches prospects, scores leads, updates your CRM, and even schedules initial calls. It integrates with HubSpot, Salesforce, and other sales tools.",
    "marketing": "The AI Marketing Employee handles your marketing campaigns and content creation. It creates social media posts, email campaigns, analyzes performance metrics, and optimizes your marketing efforts across all channels.",
    "support": "The AI Support Employee handles customer inquiries and support automatically. It can answer common questions, resolve issues, escalate complex problems, and even process returns or refunds. It's available 24/7 in multiple languages.",
    "analytics": "Our AI Analytics Employee analyzes your business data and provides insights. It tracks KPIs, generates reports, identifies trends, and helps you make data-driven decisions. It integrates with your existing analytics tools.",
    "finance": "The AI Finance Employee handles financial monitoring and reporting. It analyzes your financial data, generates reports, tracks KPIs, and alerts you to important trends. It integrates with QuickBooks, Xero, and other accounting software.",
    "admin": "The AI Admin Employee streamlines your administrative tasks. It handles scheduling, document management, data entry, and routine administrative processes, freeing up your time for more strategic work."
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for service recommendation requests FIRST (highest priority)
    if (lowerMessage.includes('best fit') || lowerMessage.includes('which one') || lowerMessage.includes('recommend') || 
        lowerMessage.includes('right for') || lowerMessage.includes('suitable') || lowerMessage.includes('choose') ||
        lowerMessage.includes('find out which') || lowerMessage.includes('help me choose')) {
      setConversationContext(prev => ({ ...prev, currentTopic: 'recommendation' }));
      return `Great question! To recommend the best service for your business, I'd love to learn more about your needs:

**Quick Assessment Questions:**
• How many employees does your business have?
• What's your monthly revenue range?
• Which areas need the most help? (Sales, Marketing, Finance, Customer Service, Data Analysis)
• Are you looking to explore AI first or jump straight into implementation?

Based on your answers, I can recommend whether the **AI Audit** ($1,500 one-time), **AI Workforce** ($2,000/month), or **Enterprise** (custom pricing) would be perfect for you. 

**Quick Guide:**
• **AI Audit ($1,500)**: Perfect for exploring AI potential and getting a roadmap
• **AI Workforce ($2,000/month)**: Ideal for companies ready to scale with AI employees
• **Enterprise (Custom)**: Best for large organizations needing custom solutions

What's your business size and main pain points?`;
    }

    // Check for business size indicators
    if (lowerMessage.includes('small') || lowerMessage.includes('startup') || lowerMessage.includes('1-50') || lowerMessage.includes('under 50')) {
      return "Based on your business size, I'd recommend starting with the **AI Audit ($1,500 one-time)** to explore your AI potential and get a clear roadmap. If you're ready to jump straight into AI implementation, the **AI Workforce ($2,000/month)** would be perfect! It includes AI agents set up & managed for your business, standard integrations, custom CRM dashboards, and 24/7 support. Would you like to know more about either service?";
    }

    if (lowerMessage.includes('medium') || lowerMessage.includes('growing') || lowerMessage.includes('50-500') || lowerMessage.includes('mid-size')) {
      return "For a growing business like yours, the **AI Workforce ($2,000/month)** is ideal! It includes AI agents set up & managed for your business, standard integrations (Slack, HubSpot, Gmail, etc.), custom CRM dashboards, ongoing optimization & monitoring, and 24/7 support. This service is perfect for companies ready to scale with AI employees. Would you like to discuss which AI employees would be most valuable for your specific needs?";
    }

    if (lowerMessage.includes('large') || lowerMessage.includes('enterprise') || lowerMessage.includes('500+') || lowerMessage.includes('corporation')) {
      return "For a large enterprise like yours, the **Enterprise (Custom Pricing)** would be the best fit! It includes everything in AI Workforce, plus custom integrations & workflows, advanced compliance & security, API access & automation at scale, SLA guarantee, and a dedicated account manager. Would you like me to connect you with our enterprise team to discuss your specific requirements?";
    }

    // Check for confirmation responses (yes, sure, etc.)
    if (lowerMessage.includes('yes') || lowerMessage.includes('sure') || lowerMessage.includes('ok') || lowerMessage.includes('please')) {
      // Check if the last AI message was about pricing
      const lastAIMessage = messages.filter(m => !m.isUser).pop();
      if (lastAIMessage && (lastAIMessage.text.includes('detailed pricing') || lastAIMessage.text.includes('details about any specific service'))) {
        setConversationContext(prev => ({ ...prev, currentTopic: 'pricing' }));
        return detailedPricingInfo;
      }
      
      // Check if the last AI message was about AI employees
      if (lastAIMessage && (lastAIMessage.text.includes('AI employees') || lastAIMessage.text.includes('AI agents'))) {
        setConversationContext(prev => ({ ...prev, currentTopic: 'agents' }));
        return "Great! Which specific AI employee would you like to learn more about? I can tell you about our AI Sales Employee, AI Marketing Employee, AI Support Employee, AI Analytics Employee, AI Finance Employee, or AI Admin Employee.";
      }
      
      // Check if the last AI message was about demo
      if (lastAIMessage && lastAIMessage.text.includes('demo')) {
        return "Perfect! I'll connect you with our sales team right away. They'll reach out within 24 hours to schedule your personalized demo. In the meantime, is there anything else you'd like to know about our AI workforce?";
      }
    }

    // Check for specific agent questions
    for (const [agentName, details] of Object.entries(agentDetails)) {
      if (lowerMessage.includes(agentName)) {
        setConversationContext(prev => ({ ...prev, currentTopic: 'agents' }));
        return details;
      }
    }

    // Check for specific questions about services
    if (lowerMessage.includes('ai audit') || lowerMessage.includes('ai workforce') || lowerMessage.includes('enterprise')) {
      if (lowerMessage.includes('ai audit')) {
        return "The AI Audit is perfect for exploring AI potential! For $1,500 one-time, you get comprehensive analysis of your business, in-depth AI employees analysis, audit report with clear action plan, ROI projections tailored to your workflows, and email support. It's ideal for businesses exploring AI before committing to a full workforce. Would you like to know more about the audit process?";
      }
      if (lowerMessage.includes('ai workforce')) {
        return "The AI Workforce is our most popular choice! For $2,000/month, you get AI agents set up & managed for your business, standard integrations (Slack, HubSpot, Gmail, etc.), custom CRM dashboards, ongoing optimization & monitoring, 24/7 support, and ROI tracking & reporting. It's perfect for companies ready to scale with AI employees. Would you like to discuss which AI employees would be most valuable for your specific needs?";
      }
      if (lowerMessage.includes('enterprise')) {
        return "Enterprise is perfect for large organizations! You get everything in AI Workforce, plus custom integrations & workflows, advanced compliance & security, API access & automation at scale, SLA guarantee, and a dedicated account manager. Pricing is custom based on your specific needs. Would you like me to connect you with our enterprise team?";
      }
    }

    // Check for pricing questions
    if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
          setConversationContext(prev => ({ ...prev, currentTopic: 'pricing' }));
      return "Here's our pricing breakdown:\n\n**AI Audit**: $1,500 (one-time)\n**AI Workforce**: $2,000/month\n**Enterprise**: Custom pricing\n\nWould you like detailed information about any specific service?";
    }

    // Check for integration questions
    if (lowerMessage.includes('integrate') || lowerMessage.includes('integration') || lowerMessage.includes('connect')) {
      return "Great question! Our AI employees integrate with over 4000+ tools including Slack, HubSpot, Notion, Excel, Google Workspace, CRM systems, email platforms, and more. We handle all integrations on the backend - you just connect your apps securely without any technical setup. Would you like to know about specific integrations for your business?";
    }

    // Check for implementation questions
    if (lowerMessage.includes('implement') || lowerMessage.includes('setup') || lowerMessage.includes('get started')) {
      return "Getting started is easy! For the **AI Audit**: 1) Book the audit, 2) We analyze your workflows, 3) You get a detailed roadmap. For **AI Workforce**: 1) Choose your plan, 2) Get guided onboarding, 3) Start using AI employees. No technical expertise required - we handle everything! Which service interests you most?";
    }

    // Check for support questions
    if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('contact')) {
      return "We provide excellent support! **AI Audit**: Email support. **AI Workforce**: 24/7 support. **Enterprise**: Dedicated account manager. For technical support: support@finstone.com. For sales: sales@finstone.com. How can I help you today?";
    }

    // Check for demo requests
    if (lowerMessage.includes('demo') || lowerMessage.includes('show me') || lowerMessage.includes('see it')) {
      return "I'd love to show you how our AI employees work! Our demos are personalized to your business and show exactly how AI agents would help your specific workflows. Would you like me to connect you with our sales team to schedule a demo?";
    }

    // Check for ROI questions
    if (lowerMessage.includes('roi') || lowerMessage.includes('return') || lowerMessage.includes('benefit')) {
      return "Our clients typically see 60-80% reduction in manual work, 30-50% cost savings, and 200-300% improvement in process efficiency. Most businesses achieve ROI within 3-6 months. The AI Audit provides detailed ROI projections for your specific business. Would you like to learn more about potential savings for your company?";
    }

    // Check for security questions
    if (lowerMessage.includes('security') || lowerMessage.includes('safe') || lowerMessage.includes('secure')) {
      return "Security is our top priority! We're SOC 2 compliant, encrypt all data in transit and at rest, and follow strict privacy regulations including GDPR and CCPA. We provide detailed security documentation and work with your IT team to meet specific compliance requirements. Your data is always safe with us!";
    }

    // Check for specific keywords in the knowledge base
    for (const [keyword, response] of Object.entries(aiResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    // Default response
    return aiResponses.default;
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");

    // Generate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setMessage(reply);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
            <h3 className="font-semibold">Finstone AI Assistant</h3>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-blue-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.isUser ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap",
                    msg.isUser
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Quick Replies - Show after every AI response */}
            {messages.length > 0 && !messages[messages.length - 1].isUser && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="h-10 w-10 bg-blue-600 hover:bg-blue-700"
              >
                  <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
