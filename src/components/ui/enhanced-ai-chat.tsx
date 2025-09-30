"use client";

import { useState, useRef, useEffect } from "react";
import { Send, ImageIcon, FileText, Zap, MessageSquare, X } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface CommandSuggestion {
  icon: React.ReactNode;
  text: string;
  action: () => void;
}

export function EnhancedAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationContext, setConversationContext] = useState({
    currentTopic: '',
    userPreferences: {},
    conversationHistory: []
  });

  // Comprehensive Knowledge Base from Database
  const knowledgeBase = [
    {"id":"company_overview_01","category":"Company","question":"What does your company do?","answer":"We help businesses save time, cut costs, and scale by building AI-powered 'employees' and delivering AI audits + implementations. We analyze workflows, propose high-impact automations, implement AI agents (Sales, Marketing, Support, Analytics), and provide ongoing optimization or enterprise-grade custom work.","tags":["overview","company","what we do"]},
    {"id":"company_mission_01","category":"Company","question":"What is your mission?","answer":"Our mission is to make AI practical and profitable for businesses of all sizes — by delivering clear audits, predictable implementation, and ongoing AI operations so teams spend less time on manual work and more time on growth.","tags":["mission","purpose"]},
    {"id":"offers_summary_01","category":"Offers","question":"What services do you offer?","answer":"We currently sell three core offerings: 1) AI Audit — a one-time analysis and roadmap; 2) AI Workforce — a managed subscription where we deploy and run AI agents for you; 3) Enterprise — fully-custom AI workforce builds, integrations, and support. The SaaS self-serve platform is coming soon but not public yet.","tags":["services","offers"]},
    {"id":"audit_what_01","category":"Audit","question":"What is an AI Audit?","answer":"An AI Audit is a structured, one-time service where we map your processes, identify where time and money are being lost, and produce a prioritized roadmap of AI agents and automations with clear ROI estimates. It includes a written report and a strategy call.","tags":["audit","what is","deliverable"]},
    {"id":"audit_price_01","category":"Pricing","question":"How much does the AI Audit cost?","answer":"The AI Audit is $1,500 (one-time). It includes workflow analysis, a written action plan, ROI projections, and an onboarding/strategy call to walk you through recommendations.","tags":["audit","price","cost"]},
    {"id":"audit_timeline_01","category":"Audit","question":"How long does an AI Audit take?","answer":"Standard delivery is 7 business days from kickoff. We collect data (forms + optional short call), analyze workflows, create the report, and deliver a walkthrough. Priority (3-day) delivery is available as a paid upgrade.","tags":["audit","timeline","delivery"]},
    {"id":"audit_deliverables_01","category":"Audit","question":"What do I receive after the audit?","answer":"You get a professional report (PDF or Notion) including: workflow maps, the top 3–5 automation opportunities, expected savings and ROI, a 30-day quick-wins plan, recommended AI agents, and a suggested implementation roadmap.","tags":["audit","deliverables"]},
    {"id":"workforce_overview_01","category":"Offers","question":"What is AI Workforce?","answer":"AI Workforce is our managed subscription service where we deploy and operate AI agents for you. We handle setup, integrations, ongoing optimization, monitoring, and reporting so your team gets continuous value without the technical burden.","tags":["workforce","subscription"]},
    {"id":"pricing_overview_01","category":"Pricing","question":"What are your prices?","answer":"Current core pricing: AI Audit — $1,500 one-time; AI Workforce — $2,000/month; Enterprise — custom pricing. Exact quotes for implementations are provided after the audit or discovery call.","tags":["pricing","costs"]},
    {"id":"integrations_overview_01","category":"Integrations","question":"Which tools do you integrate with?","answer":"We support standard integrations: Slack, HubSpot, Gmail, Google Workspace, Notion, Excel/Google Sheets, Stripe, Calendly/Calendly alternatives, and most CRMs. For more niche tools we use connector services (Zapier, Make, Pipedream) or build custom integrations for Enterprise clients.","tags":["integrations","list","tools"]},
    {"id":"security_01","category":"Security","question":"How do you protect my data?","answer":"Security is a priority. We use encrypted storage for credentials and tokens, limited scopes for OAuth, role-based access, and follow industry best practices for data handling. Enterprise clients get additional compliance measures (SOC2-level options, dedicated encryption policies) on request.","tags":["security","data protection","compliance"]},
    {"id":"privacy_01","category":"Security","question":"Do you share or sell my data?","answer":"No — we do not sell or share client data. Integrations only use the minimum permissions required to provide the service. We can sign NDAs and custom data processing agreements for enterprise clients.","tags":["privacy","data","policy"]},
    {"id":"support_levels_01","category":"Support","question":"What kind of support do you provide?","answer":"AI Audit customers get email support. Workforce customers get 24/7 support and a performance report. Enterprise customers have a dedicated account manager and SLA-backed support.","tags":["support","levels"]},
    {"id":"contact_01","category":"Contact","question":"How can I contact you?","answer":"Use the contact form on the website, email our sales address, or book a call via the scheduling link on the site. Enterprise inquiries can use the 'Contact Sales' button.","tags":["contact","sales"]},
    {"id":"demo_request_01","category":"Sales","question":"Can I get a demo?","answer":"Yes — book a demo via the website contact form. For audit customers we provide a live walkthrough of the audit or recorded demo showing how suggested agents would work.","tags":["sales","demo"]},
    {"id":"faq_short_01","category":"FAQ","question":"Do I need to be technical to use your service?","answer":"No — we handle the technical work. Clients approve the plan and we implement integrations; we present results in plain language and offer training for teams.","tags":["faq","non-tech"]},
    {"id":"faq_time_01","category":"FAQ","question":"How soon can I get started?","answer":"You can book an audit or discovery call immediately on the site. Audit delivery is typically 7 business days after kickoff. Implementation scheduling depends on plan and availability.","tags":["faq","start","timeline"]},
    {"id":"faq_after_01","category":"FAQ","question":"What happens after the audit?","answer":"You receive a clear roadmap and a quoted implementation package. You can implement in-house, hire us for a one-off implementation, or start a Workforce subscription (audit included in onboarding).","tags":["faq","next steps"]},
    {"id":"enterprise_what_01","category":"Enterprise","question":"What is included in the Enterprise plan?","answer":"Enterprise includes everything in AI Workforce plus custom integrations, advanced security & compliance, API access, SLA guarantees, a dedicated account manager, and large-scale agent deployment. Pricing is custom and based on scope.","tags":["enterprise","features","sla"]},
    {"id":"billing_cycle_01","category":"Billing","question":"How does billing work?","answer":"AI Audit is a one-time invoice due at purchase. Workforce and Enterprise are billed monthly by card (Stripe or similar) and include invoices accessible in your account. We support annual invoicing for Enterprise and can set up net terms for large customers.","tags":["billing","invoice","payment"]},
    {"id":"refunds_01","category":"Billing","question":"Do you offer refunds?","answer":"Audit fees are typically non-refundable (they pay for analysis time). For subscription plans, we can prorate or refund under specific circumstances — we handle those on a case-by-case basis through support.","tags":["refunds","billing","policy"]},
    {"id":"case_example_01","category":"Case Studies","question":"Do you have examples of results?","answer":"Example (fictional but realistic): A $5M ecommerce client automated order reconciliation and billing, reducing manual work by 80% and recovering $60K/year in cash flow. Another SaaS firm automated lead qualification and booked 3x more demos in 30 days. We use these templates as case studies in sales materials.","tags":["case study","results","examples"]},
    {"id":"team_01","category":"Company","question":"Who is behind the company?","answer":"Our team includes AI engineers, automation specialists, and finance/operations consultants who build and iterate on AI agents and workflows. We work with vetted legal/tax partners for global compliance when needed.","tags":["team","about"]},
    {"id":"battery_explainer_01","category":"SaaS","question":"What is the Battery System?","answer":"The Battery System is a simple way to visualize monthly usage for AI agents (we avoid confusing 'credits'). Each plan includes a monthly allowance of agent activity. If you reach your allowance you can top up instantly. Quality of output does not change — battery only controls how much work agents can do in a period.","tags":["battery","usage","explain"]},
    {"id":"platform_launch_01","category":"Platform","question":"Is the SaaS platform live?","answer":"The SaaS self-serve platform is currently in development. The website displays the coming-soon platform; core managed Workforce and Enterprise services are available now via our consulting offerings.","tags":["platform","status"]},
    {"id":"training_01","category":"Support","question":"Do you provide training for my team?","answer":"Yes — Starter customers receive a basic training session; Growth/Workforce customers receive guided onboarding and documentation; Enterprise customers get customized training programs as part of their onboarding.","tags":["training","onboarding"]},
    {"id":"reporting_01","category":"Platform","question":"What kind of reporting do you provide?","answer":"We provide ROI projections in the audit and ongoing performance dashboards for Workforce customers: conversion metrics, time saved, automation coverage, and cost reductions. Enterprise packages include custom dashboards and scheduled performance reviews.","tags":["reporting","dashboards"]},
    {"id":"metrics_tracked_01","category":"Reporting","question":"What KPIs do you track?","answer":"Common KPIs: time saved (hours/week), cost saved, lead conversion lift, response time reduction, automation coverage, and revenue influenced. We tailor KPIs to your business goals during the audit.","tags":["kpi","metrics","reporting"]},
    {"id":"legal_ndas_01","category":"Legal","question":"Can you sign an NDA?","answer":"Yes — we can sign NDAs before starting work. For enterprise clients we can negotiate custom data processing and security agreements.","tags":["legal","nda"]},
    {"id":"privacy_policy_01","category":"Legal","question":"Where can I find your privacy policy?","answer":"Our privacy policy and terms of service are available on the website footer. If you need specific contractual language for enterprise, we'll provide it as part of the sales process.","tags":["legal","privacy"]},
    {"id":"sso_01","category":"Platform","question":"Do you support Single Sign-On (SSO)?","answer":"SSO is available for Enterprise customers as part of custom onboarding and compliance requirements. Standard Workforce customers use normal account auth; we can add SSO at the request of larger customers.","tags":["platform","sso"]},
    {"id":"trial_01","category":"Offers","question":"Do you offer trials?","answer":"We do not offer an open SaaS trial yet. For audit clients who move to Workforce we provide a guided onboarding and short pilot phase so you can validate outcomes before committing longer-term.","tags":["offers","trial"]},
    {"id":"refunds_subscription_01","category":"Billing","question":"Can I cancel my subscription?","answer":"Workforce subscriptions can be canceled any time (monthly billing). For Enterprise we negotiate terms with notice periods. Refunds are handled on a case-by-case basis and you can discuss directly with support.","tags":["billing","cancel"]},
    {"id":"custom_integration_request_01","category":"Integrations","question":"Can you build custom integrations?","answer":"Yes — custom integrations are part of Enterprise or paid implementation work. We'll provide a project quote after scoping the integration and expected security requirements.","tags":["integrations","custom"]},
    {"id":"pilot_option_01","category":"Offers","question":"Do you offer a pilot or proof-of-concept?","answer":"Yes — we offer short pilots for Workforce adoption (mini-implementation) to validate impact before committing to a longer subscription. Pilots are quoted based on scope.","tags":["pilot","poc","offer"]},
    {"id":"content_generation_01","category":"Marketing","question":"Do you create marketing content with AI?","answer":"Yes. We can create automated content workflows (copy drafts, social posts, email sequences) using marketing agents. We also provide templates and training for your team.","tags":["marketing","content","ai"]},
    {"id":"pricing_negotiation_01","category":"Sales","question":"Can pricing be negotiated?","answer":"Enterprise pricing is negotiable and based on scale and custom work. For small clients, we offer payment plans or phased delivery to match budgets.","tags":["pricing","negotiation"]},
    {"id":"partner_integrations_01","category":"Integrations","question":"Do you work with partners for integrations?","answer":"Yes — we partner with integration platforms like Zapier, Make, and Pipedream and can also integrate with client-selected partners for advanced use cases.","tags":["partners","integrations"]},
    {"id":"future_saas_access_01","category":"Platform","question":"How will current clients get access to the SaaS when it launches?","answer":"Audit and Workforce customers will get priority access and special offers when the SaaS platform launches. Enterprise customers will have a tailored migration plan.","tags":["platform","launch","migration"]},
    {"id":"academy_01","category":"Marketing","question":"Do you have a community or academy?","answer":"Yes — we plan to host an academy/community (Whop or similar) offering free resources, templates, and a paid academy tier in future. Early access and discounts will be available to audit and Workforce customers.","tags":["academy","community"]},
    {"id":"faq_shortlist_01","category":"FAQ","question":"Top quick answers (short FAQ)","answer":"Q: Do I need to be technical? No. Q: How long is an audit? 7 days. Q: Cost of audit? $1,500 one-time. Q: Can you implement? Yes, we offer managed implementation and subscription options. Q: Is the SaaS live? No, coming soon.","tags":["faq","short"]},
    {"id":"white_label_01","category":"Enterprise","question":"Do you offer white-label or reseller options?","answer":"We offer reseller and agency partnerships as part of Enterprise arrangements. Resellers can apply for partnership terms and recurring commissions.","tags":["partners","reseller","whitelabel"]},
    {"id":"analytics_privacy_01","category":"Security","question":"Do you store client data for analytics?","answer":"We store only what's necessary for reporting and service delivery. For Workforce, aggregated analytics are provided in dashboards. Raw data storage and retention policies are agreed during onboarding.","tags":["analytics","privacy"]},
    {"id":"deployment_methods_01","category":"Technical","question":"How do you deploy agents technically?","answer":"Agents run on our managed backend and securely call connected APIs (via OAuth tokens) to perform tasks. For enterprise clients we can host in customer-controlled environments or provide on-premises options depending on security needs.","tags":["technical","deployment"]},
    {"id":"work_with_sdrs_01","category":"Sales","question":"How should SDRs sell this offering?","answer":"SDRs should use a two-door approach: 1) Offer the $1,500 AI Audit as a fast, low-risk way to find value; 2) Offer the Workforce subscription for ongoing automation (audit included in onboarding). Focus on ROI, time saved, and concrete examples from audits.","tags":["sales","sdr","scripts"]},
    {"id":"lead_time_01","category":"Operations","question":"How long until implementation can start after an audit?","answer":"Implementation typically starts within 1–2 weeks after the audit, depending on integrations and scheduling. For Enterprise custom builds timelines vary and are agreed in the project plan.","tags":["operations","timing"]},
    {"id":"workforce_cancel_01","category":"Billing","question":"Can I cancel the Workforce subscription?","answer":"Yes — Workforce subscriptions are monthly and can be canceled at any time. We will assist with data export and sign-off during offboarding.","tags":["billing","cancel"]},
    {"id":"escalation_01","category":"Support","question":"How do I escalate an urgent issue?","answer":"Open a support ticket via the dashboard or email support@yourdomain.com. Workforce customers get priority triage; Enterprise customers use their dedicated account manager and SLA contact channels.","tags":["support","escalation","urgent"]},
    {"id":"marketing_channels_01","category":"Marketing","question":"How will you market the SaaS and services?","answer":"Initial growth will rely on content (LinkedIn, short-form video), micro-demos, organic SEO, and a reseller/affiliate program. We also plan targeted outreach for consulting sales.","tags":["marketing","go-to-market"]},
    {"id":"legal_compliance_01","category":"Legal","question":"Do you handle compliance across countries?","answer":"We advise on cross-border compliance and can engage vetted legal/tax partners for entity or contractor setup. For Enterprise clients we include compliance reviews in scope.","tags":["legal","compliance","global"]},
    {"id":"knowledgebase_update_01","category":"Operations","question":"How often should this chatbot knowledge base be updated?","answer":"Update the knowledge base whenever pricing, deliverables, SLA, integrations, or product status change. A monthly review cycle is recommended; critical updates should be applied immediately.","tags":["maintenance","kb"]}
  ];

  // Enhanced AI response generation with database integration
  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // First, try to find exact matches in the knowledge base
    for (const item of knowledgeBase) {
      const questionWords = item.question.toLowerCase().split(' ');
      const answerWords = item.answer.toLowerCase().split(' ');
      const tagWords = item.tags.join(' ').toLowerCase().split(' ');
      
      // Check if user message contains key words from question, answer, or tags
      const hasQuestionMatch = questionWords.some(word => 
        word.length > 3 && lowerMessage.includes(word)
      );
      const hasAnswerMatch = answerWords.some(word => 
        word.length > 3 && lowerMessage.includes(word)
      );
      const hasTagMatch = tagWords.some(word => 
        word.length > 3 && lowerMessage.includes(word)
      );
      
      if (hasQuestionMatch || hasAnswerMatch || hasTagMatch) {
        return item.answer;
      }
    }
    
    // Enhanced general knowledge and conversational responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm here to help you with any questions you might have. I can tell you about our AI Audit services, answer general business questions, or just have a friendly conversation. What's on your mind today?";
    }

    if (lowerMessage.includes('how are you') || lowerMessage.includes('how\'s it going')) {
      return "I'm doing great, thank you for asking! I'm here and ready to help you with whatever you need. Whether you have questions about our AI Audit services, need business advice, or just want to chat, I'm all ears. What can I help you with today?";
    }

    if (lowerMessage.includes('thank you') || lowerMessage.includes('thanks')) {
      return "You're very welcome! I'm always happy to help. Is there anything else you'd like to know about our AI Audit services or any other questions I can answer for you?";
    }

    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
      return "Goodbye! It was great chatting with you. If you ever want to learn more about our AI Audit services or have any other questions, feel free to come back anytime. Have a wonderful day!";
    }

    // Business and general advice questions
    if (lowerMessage.includes('business advice') || lowerMessage.includes('business help') || lowerMessage.includes('business tips')) {
      return "I'd be happy to share some business insights! While I specialize in AI-powered financial audits, I can offer general business advice on topics like operations, efficiency, and growth strategies. What specific area of your business would you like to discuss? I can also tell you how our AI Audit might help identify opportunities in your business.";
    }

    if (lowerMessage.includes('finance') || lowerMessage.includes('financial') || lowerMessage.includes('money')) {
      return "Financial topics are right up my alley! I can discuss general financial concepts, business finance, or tell you about our AI Audit service that helps businesses uncover hidden inefficiencies and recover lost profits. What specific financial question do you have?";
    }

    if (lowerMessage.includes('automation') || lowerMessage.includes('efficiency') || lowerMessage.includes('productivity')) {
      return "Great topic! Automation and efficiency are key to business success. I can discuss general automation strategies, or tell you about our AI Audit service that identifies specific automation opportunities in your financial operations. What aspect of automation interests you most?";
    }

    if (lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('software')) {
      return "Technology is fascinating! I can discuss various tech topics, software solutions, or tell you about how we use AI technology in our audit services to analyze financial systems. What technology topic would you like to explore?";
    }

    if (lowerMessage.includes('startup') || lowerMessage.includes('entrepreneur') || lowerMessage.includes('small business')) {
      return "Startups and small businesses are the backbone of the economy! I can offer general advice for entrepreneurs, or discuss how our AI Audit service helps $2M-$50M businesses optimize their financial operations. What challenges are you facing in your business?";
    }

    if (lowerMessage.includes('growth') || lowerMessage.includes('scaling') || lowerMessage.includes('expansion')) {
      return "Growth and scaling are exciting challenges! I can discuss general growth strategies, or explain how our AI Audit helps businesses identify opportunities to scale more efficiently by uncovering hidden inefficiencies. What's your current growth stage?";
    }

    if (lowerMessage.includes('problem') || lowerMessage.includes('issue') || lowerMessage.includes('challenge')) {
      return "I'm here to help with whatever challenges you're facing! I can offer general problem-solving advice, or tell you about our AI Audit service that specifically helps businesses identify and solve hidden operational problems. What's troubling you today?";
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('assist') || lowerMessage.includes('support')) {
      return "I'm absolutely here to help! I can assist with questions about our AI Audit services, general business topics, or just about anything else you'd like to discuss. What do you need help with today?";
    }

    // General knowledge and conversational responses
    if (lowerMessage.includes('weather') || lowerMessage.includes('temperature')) {
      return "I don't have access to real-time weather data, but I'd be happy to help you with business questions or tell you about our AI Audit services! Is there something else I can assist you with?";
    }

    if (lowerMessage.includes('time') || lowerMessage.includes('date')) {
      return "I don't have access to real-time clock information, but I'm here to help with business questions or discuss our AI Audit services! What else can I help you with today?";
    }

    if (lowerMessage.includes('joke') || lowerMessage.includes('funny') || lowerMessage.includes('humor')) {
      return "I'm more focused on being helpful than funny, but I can definitely help you with business questions or tell you about our AI Audit services! What would you like to know about?";
    }

    // More specific general knowledge responses
    if (lowerMessage.includes('what is') && (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence'))) {
      return "Artificial Intelligence (AI) is technology that enables machines to perform tasks that typically require human intelligence, like learning, reasoning, and problem-solving. In business, AI can analyze data, automate processes, and identify patterns humans might miss. Our AI Audit service uses AI to analyze financial systems and uncover hidden inefficiencies. What specific aspect of AI interests you?";
    }

    if (lowerMessage.includes('what is') && lowerMessage.includes('business')) {
      return "A business is an organization that provides goods or services to customers in exchange for money. Successful businesses focus on solving problems, creating value, and optimizing their operations for efficiency and growth. Our AI Audit service helps businesses identify hidden inefficiencies and recover lost profits. What specific business topic would you like to explore?";
    }

    if (lowerMessage.includes('how to') && (lowerMessage.includes('start') || lowerMessage.includes('begin'))) {
      return "Starting something new can be exciting! Whether you're starting a business, a project, or learning something new, the key is to begin with a clear goal and take small, consistent steps. If you're starting a business, our AI Audit can help identify opportunities and optimize your financial operations from the beginning. What are you looking to start?";
    }

    if (lowerMessage.includes('how to') && lowerMessage.includes('improve')) {
      return "Improvement is all about identifying areas for growth and taking action! Whether it's personal development, business operations, or any other area, the key is to measure current performance, identify gaps, and implement changes. Our AI Audit service specializes in helping businesses improve by identifying hidden inefficiencies and missed opportunities. What area would you like to improve?";
    }

    if (lowerMessage.includes('why') && lowerMessage.includes('important')) {
      return "That's a great question! Understanding why something is important helps us prioritize and make better decisions. In business, it's important to focus on what drives value and growth. Our AI Audit helps businesses understand why certain inefficiencies are important to address - they can cost thousands of dollars in lost profits. What specific topic are you curious about?";
    }

    if (lowerMessage.includes('when') && (lowerMessage.includes('best') || lowerMessage.includes('right'))) {
      return "Timing is often crucial! The best time to do something depends on your specific situation and goals. In business, the best time to optimize operations is usually now - inefficiencies compound over time. Our AI Audit can help you identify the right time to implement changes by showing you exactly where you're losing money. What timing question do you have?";
    }

    if (lowerMessage.includes('where') && (lowerMessage.includes('find') || lowerMessage.includes('get'))) {
      return "Finding the right resources or information can be challenging! The best place to look depends on what you're trying to find. For business optimization, our AI Audit is a great place to start - it finds hidden opportunities you didn't know existed. What are you looking to find or get?";
    }

    // Catch-all for general questions
    if (lowerMessage.includes('what') || lowerMessage.includes('how') || lowerMessage.includes('why') || lowerMessage.includes('when') || lowerMessage.includes('where')) {
      return "That's an interesting question! While I specialize in AI-powered financial audits and business optimization, I can try to help with general topics too. Could you be more specific about what you'd like to know? I can also tell you about our AI Audit service that helps businesses uncover hidden inefficiencies and recover lost profits.";
    }

    // Default response with broader scope
    return "That's a great question! I'm here to help with a wide range of topics. I specialize in AI-powered financial audits and business optimization, but I can also discuss general business topics, answer questions about technology, or just have a friendly conversation. What would you like to talk about? I can tell you about our AI Audit service that helps businesses recover $50K–$250K/year in lost profits, or we can explore other topics together.";
  };

  const commandSuggestions: CommandSuggestion[] = [
    { 
      icon: <ImageIcon className="w-4 h-4" />, 
      text: "What does your company do?", 
      action: () => handleSendMessage("What does your company do?") 
    },
    { 
      icon: <FileText className="w-4 h-4" />, 
      text: "How much does the AI Audit cost?", 
      action: () => handleSendMessage("How much does the AI Audit cost?") 
    },
    { 
      icon: <Zap className="w-4 h-4" />, 
      text: "What is AI Workforce?", 
      action: () => handleSendMessage("What is AI Workforce?") 
    },
    { 
      icon: <MessageSquare className="w-4 h-4" />, 
      text: "Can I get a demo?", 
      action: () => handleSendMessage("Can I get a demo?") 
    }
  ];

  const handleSendMessage = (message?: string) => {
    const text = message || inputValue.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs text-blue-100">Ask me anything!</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-sm">Hi! I'm your AI assistant. I can help you with questions about our services, general business topics, or just have a friendly conversation. What would you like to know?</p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Command Suggestions */}
          {messages.length === 0 && (
            <div className="p-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-3">Try asking:</p>
              <div className="grid grid-cols-2 gap-2">
                {commandSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={suggestion.action}
                    className="flex items-center space-x-2 p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                  >
                    {suggestion.icon}
                    <span className="truncate">{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity text-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
