"use client";

import { useEffect, useRef, useCallback, useTransition } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/ui/header";
import {
    ImageIcon,
    FileUp,
    Figma,
    MonitorIcon,
    CircleUserRound,
    ArrowUpIcon,
    Paperclip,
    PlusIcon,
    SendIcon,
    XIcon,
    LoaderIcon,
    Sparkles,
    Command,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react"

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            textarea.style.height = `${minHeight}px`;
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

interface CommandSuggestion {
    icon: React.ReactNode;
    label: string;
    description: string;
    prefix: string;
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  showRing?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, containerClassName, showRing = true, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    
    return (
      <div className={cn(
        "relative",
        containerClassName
      )}>
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            "transition-all duration-200 ease-in-out",
            "placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50",
            showRing ? "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" : "",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {showRing && isFocused && (
          <motion.span 
            className="absolute inset-0 rounded-md pointer-events-none ring-2 ring-offset-0 ring-blue-500/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {props.onChange && (
          <div 
            className="absolute bottom-2 right-2 opacity-0 w-2 h-2 bg-blue-500 rounded-full"
            style={{
              animation: 'none',
            }}
            id="textarea-ripple"
          />
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export function AnimatedAIChat() {
    const [value, setValue] = useState("");
    const [attachments, setAttachments] = useState<string[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const [recentCommand, setRecentCommand] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [messages, setMessages] = useState<Array<{id: string, text: string, isUser: boolean, timestamp: Date}>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [conversationContext, setConversationContext] = useState({
        currentTopic: '',
        userInfo: {}
    });
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });
    const [inputFocused, setInputFocused] = useState(false);
    const commandPaletteRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Complete AI Knowledge Base - Finstone AI Audit™
    const aiResponses = {
        // Company Overview - AI Audit Focus
        "what does your company do": "We provide AI-powered finance & operations audits that uncover wasted time, hidden costs, and missed revenue in your business. Our AI analyzes your financial systems to identify inefficiencies, cash leaks, and automation opportunities you never knew existed, then gives you a step-by-step roadmap to recover profits.",
        "what is finstone ai": "Finstone AI Audit™ is an AI-powered finance & operations audit service that helps $2M-$50M businesses transform from financial chaos to predictable profits. We use AI to analyze your financial systems and uncover hidden inefficiencies, then provide a complete roadmap to recover lost revenue.",
        "what do you do": "We specialize in AI-powered finance & operations audits. Our AI scans your financial systems to identify hidden inefficiencies, cash leaks, and automation opportunities, then delivers a complete roadmap showing exactly how to recover $50K–$250K/year in lost profits.",
        
        // Core Services - AI Audit Focus
        "what services do you offer": "Our main service is the **AI Audit** - a comprehensive analysis of your financial operations that uncovers hidden inefficiencies and missed revenue opportunities. We also provide implementation services to help you execute the recommendations from your audit report.",
        "what is an ai audit": "An AI Audit is our core service where we use artificial intelligence to analyze your financial operations, workflows, and reporting processes. We identify inefficiencies, errors, and automation opportunities, then deliver a complete roadmap showing exactly how to recover lost profits and optimize your financial systems.",
        "what does the ai audit include": "The AI Audit includes: 1) Complete financial systems analysis, 2) Hidden inefficiency identification, 3) Cash leak detection, 4) Automation opportunity mapping, 5) Risk & compliance scan, 6) 30-day quick wins plan, 7) Implementation roadmap, and 8) ROI projections showing potential $50K–$250K/year recovery.",
        
        // Pricing & Cost
        "what's the pricing": "Our AI Audit pricing depends on the scope and complexity of your business operations. We provide detailed pricing during our initial consultation based on your specific needs and expected ROI. Most clients see the audit pay for itself within the first week of implementation.",
        "how much does the ai audit cost": "AI Audit pricing varies based on your business size and complexity. We provide detailed pricing during our initial consultation based on your specific needs and expected ROI. Most clients see the audit pay for itself within the first week of implementation.",
        "what's the cost": "Pricing depends on the scope and complexity of your business operations. We provide detailed pricing during our initial consultation based on your specific needs and expected ROI. Most clients see the audit pay for itself within the first week of implementation.",
        
        // Process & Timeline
        "how does the ai audit work": "Our AI Audit process: 1) Book your audit, 2) We analyze your financial systems and workflows using AI, 3) We identify hidden inefficiencies and cash leaks, 4) We deliver your complete audit report in 48 hours, 5) We provide a full implementation roadmap within 2 weeks showing exactly how to recover lost profits.",
        "how long does the audit take": "We deliver your complete AI audit report in 48 hours, and provide a full implementation roadmap within 2 weeks. Our process is designed to be fast and actionable - we give you a complete roadmap in 2 weeks or you don't pay.",
        "what's the timeline": "48 hours for your complete audit report, 2 weeks for the full implementation roadmap. We're confident in our process - if we don't deliver your complete roadmap in 2 weeks, you don't pay.",
        
        // ROI & Results
        "what roi can i expect": "Our clients regularly see $50K–$250K/year in recovered profit after implementation. We don't sell you random automations - we build systems that make your business faster, smarter, and safer. Every recommendation comes with dollar-impact projections, and most businesses achieve ROI within 3-6 months.",
        "what results do you deliver": "Our clients typically see 60-80% reduction in manual work, 30-50% cost savings, and 200-300% improvement in process efficiency. Most businesses achieve ROI within 3-6 months of implementation. We provide detailed ROI projections during our audit process.",
        "how much money can i save": "Our clients regularly recover $50K–$250K/year in lost profits after implementing our recommendations. The audit identifies exactly where you're losing money and shows you how to recover it. Most clients see the audit pay for itself in the first week.",
        
        // Target Audience
        "who is this for": "Our AI Audit is designed for $2M-$50M businesses that are experiencing financial chaos and want to transform to predictable profits. We help businesses that have hidden inefficiencies, cash leaks, and missed revenue opportunities they don't even know about.",
        "what size business do you work with": "We specialize in $2M-$50M businesses that are ready to transform their financial operations. Our AI Audit is perfect for businesses that want to uncover hidden inefficiencies and recover lost profits through intelligent automation.",
        
        // Security & Data
        "is my data secure": "Yes, we take data security extremely seriously. All data is encrypted in transit and at rest, and we follow strict data privacy regulations. We provide detailed security documentation and can work with your IT team to meet specific compliance requirements. Your financial data is never stored permanently on our systems.",
        "is my financial data safe": "Absolutely. We take data security extremely seriously. All data is encrypted in transit and at rest, and we follow strict data privacy regulations. We provide detailed security documentation and can work with your IT team to meet specific compliance requirements.",
        
        // Implementation
        "do i need technical expertise": "No technical expertise is required. We provide two paths: you can hire us to build everything for you, or follow our detailed DIY roadmap if you prefer to implement yourself. Our team handles all technical implementation, and you'll have access to our support team whenever you need assistance.",
        "how do i implement the recommendations": "We provide two implementation paths: 1) Hire us to build everything for you, or 2) Follow our detailed DIY roadmap. No technical expertise is required - we handle all technical implementation and provide ongoing support.",
        
        // Integrations
        "what systems do you work with": "Our AI audit works with all major accounting software, ERP systems, and financial platforms. We analyze your current systems to understand how they work together and identify integration opportunities. We can also create custom solutions for proprietary systems if needed.",
        "what accounting software do you support": "We work with all major accounting software including QuickBooks, Xero, Sage, and ERP systems. Our AI analyzes your current systems to understand how they work together and identify integration opportunities.",
        
        // Guarantee & Support
        "what if it doesn't work": "We stand behind our work with a 100% ROI guarantee. If our recommendations don't deliver the projected results, we'll work with you to refine the approach or provide a full refund. We're confident in our process because we audit first, sell second - complete transparency.",
        "what support do you provide": "We provide comprehensive ongoing support including implementation guidance, regular check-ins, and optimization recommendations. We also offer the option to hire us for full implementation, ongoing monitoring, and continuous improvement.",
        
        // Contact & Next Steps
        "how do i get started": "Getting started is easy! Simply book your AI Audit through our website. We'll contact you within 2 hours to discuss your audit scope and timeline. The process is designed to be fast and actionable - you'll have your complete roadmap in 2 weeks or you don't pay.",
        "book an audit": "Great! I can help you get started with your AI Audit. We'll contact you within 2 hours to discuss your audit scope and timeline. The process is designed to be fast and actionable - you'll have your complete roadmap in 2 weeks or you don't pay.",
        "contact you": "You can reach us through our website contact form, email, or by booking an audit. For technical support: support@finstonelab.com. For sales inquiries: contact@finstonelab.com. We'll respond within 2 hours.",
        
        // Industry Specific
        "do you work with my industry": "Yes! Our AI audit is highly customizable and can be tailored to your specific industry, business model, and operational requirements. We understand that different industries have unique financial challenges, and we work closely with you to ensure the audit addresses your specific pain points and opportunities.",
        "what industries do you serve": "We serve all industries within the $2M-$50M revenue range. Our AI audit is highly customizable and can be tailored to your specific industry, business model, and operational requirements. We understand that different industries have unique financial challenges.",
        
        // General responses
        "book a demo": "Great! I can help you schedule a personalized demo of our AI Audit process. Our demos show you exactly how we analyze financial systems and uncover hidden inefficiencies. Would you like me to connect you with our team?",
        "default": "That's a great question! I'd be happy to help you learn more about our AI Audit service. We specialize in uncovering hidden inefficiencies and missed revenue in financial operations. Could you be more specific about what you'd like to know? I can tell you about our audit process, pricing, timeline, or connect you with our team."
    };

    const detailedPricingInfo = `
**Finstone AI Audit™ - Detailed Service Breakdown:**

**🔍 AI Audit - Custom Pricing**
Comprehensive AI-powered finance & operations analysis
• Complete financial systems analysis using AI
• Hidden inefficiency identification
• Cash leak detection and quantification
• Automation opportunity mapping
• Risk & compliance scan
• 30-day quick wins plan
• Complete implementation roadmap
• ROI projections ($50K–$250K/year potential recovery)
• 48-hour audit report delivery
• 2-week implementation roadmap
• 100% ROI guarantee

**📊 What You Get:**
• Detailed analysis of your financial operations
• Identification of exactly where you're losing money
• Step-by-step roadmap to recover lost profits
• Specific automation recommendations
• Risk assessment and compliance check
• Prioritized action plan for immediate implementation
• Ongoing support and guidance

**💡 Why Choose Our AI Audit:**
• We audit first, sell second - complete transparency
• 2 weeks or you don't pay guarantee
• Clients regularly see $50K–$250K/year in recovered profit
• No technical expertise required
• Works with all major accounting software and ERP systems
• Customized for your specific industry and business model

**🎯 Perfect For:**
• $2M-$50M businesses experiencing financial chaos
• Companies wanting to transform to predictable profits
• Businesses with hidden inefficiencies they don't know about
• Organizations ready to recover lost revenue through intelligent automation

Would you like to know more about our AI Audit process or discuss how it could help your specific business?
`;

    const auditDetails = {
        "financial analysis": "Our AI analyzes your financial systems to identify hidden inefficiencies, cash leaks, and missed revenue opportunities. It examines your accounting processes, payment flows, and financial reporting to uncover exactly where money is being lost.",
        "process optimization": "We identify bottlenecks and inefficiencies in your financial operations that are costing you money. Our AI maps your current workflows and finds opportunities to automate repetitive tasks and eliminate manual errors.",
        "compliance check": "Our AI performs a comprehensive risk & compliance scan to identify process gaps that could cause legal, tax, or reputational damage. We ensure your financial operations meet all regulatory requirements and best practices.",
        "automation opportunities": "We identify specific areas where automation can save you time and money. Our AI finds repetitive tasks, manual processes, and error-prone workflows that can be automated to improve efficiency and reduce costs.",
        "roi projections": "We provide detailed ROI projections showing exactly how much money you can recover. Our clients typically see $50K–$250K/year in recovered profit after implementing our recommendations.",
        "implementation roadmap": "We provide a complete step-by-step roadmap showing exactly how to implement our recommendations. This includes a 30-day quick wins plan and a comprehensive implementation path that you can follow yourself or hire us to execute."
    };


    // Intelligent AI response generation
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
            return "That's exciting! Small businesses and startups are the backbone of innovation. Our AI Audit service is perfect for businesses of your size - it helps identify hidden inefficiencies and missed revenue opportunities that can make a huge difference for growing companies. The audit typically pays for itself within the first week of implementation. Would you like to know more about how our AI Audit could help your business?";
        }

        if (lowerMessage.includes('medium') || lowerMessage.includes('growing') || lowerMessage.includes('50-500') || lowerMessage.includes('mid-size')) {
            return "That's a great growth stage! Medium-sized businesses often have the most to gain from our AI Audit service. You're at the perfect size where hidden inefficiencies can really add up - our clients in your range typically recover $50K–$250K/year in lost profits. The audit helps you scale more efficiently by identifying exactly where you're losing money. Would you like to discuss how our AI Audit could help optimize your growing business?";
        }

        if (lowerMessage.includes('large') || lowerMessage.includes('enterprise') || lowerMessage.includes('500+') || lowerMessage.includes('corporation')) {
            return "Large enterprises have complex financial operations with many opportunities for optimization! Our AI Audit is highly customizable and can be tailored to your specific industry and operational requirements. We understand that large organizations have unique challenges, and our audit can identify significant cost savings and efficiency improvements. Would you like to discuss how our AI Audit could help your enterprise optimize its financial operations?";
        }

        // Check for confirmation responses (yes, sure, etc.)
        if (lowerMessage.includes('yes') || lowerMessage.includes('sure') || lowerMessage.includes('ok') || lowerMessage.includes('please')) {
            // Check if the last AI message was about pricing
            const lastAIMessage = messages.filter(m => !m.isUser).pop();
            if (lastAIMessage && (lastAIMessage.text.includes('detailed pricing') || lastAIMessage.text.includes('details about any specific service'))) {
                setConversationContext(prev => ({ ...prev, currentTopic: 'pricing' }));
                return detailedPricingInfo;
            }
            
            // Check if the last AI message was about audit details
            if (lastAIMessage && (lastAIMessage.text.includes('audit') || lastAIMessage.text.includes('financial analysis'))) {
                setConversationContext(prev => ({ ...prev, currentTopic: 'audit' }));
                return "Excellent! Our AI Audit includes complete financial systems analysis, hidden inefficiency identification, cash leak detection, automation opportunity mapping, risk & compliance scan, 30-day quick wins plan, and ROI projections showing potential $50K–$250K/year recovery. Would you like to know more about any specific aspect of the audit?";
            }
            
            // Check if the last AI message was about demo
            if (lastAIMessage && lastAIMessage.text.includes('demo')) {
                return "Perfect! I'll connect you with our team right away. They'll reach out within 2 hours to schedule your personalized demo of our AI Audit process. In the meantime, is there anything else you'd like to know about our services?";
            }
            
            // Check if the last AI message was about general help
            if (lastAIMessage && lastAIMessage.text.includes('help')) {
                return "Great! I'm here to assist you. What specific topic would you like to explore? I can help with questions about our AI Audit services, general business advice, technology topics, or just about anything else you'd like to discuss.";
            }
        }

        // Check for specific audit component questions
        for (const [auditComponent, details] of Object.entries(auditDetails)) {
            if (lowerMessage.includes(auditComponent)) {
                setConversationContext(prev => ({ ...prev, currentTopic: 'audit' }));
                return details;
            }
        }

        // Check for specific questions about services
        if (lowerMessage.includes('ai audit') || lowerMessage.includes('audit') || lowerMessage.includes('financial audit')) {
            return "Our AI Audit is our core service! We use artificial intelligence to analyze your financial operations and uncover hidden inefficiencies, cash leaks, and missed revenue opportunities. The audit includes complete financial systems analysis, risk & compliance scan, 30-day quick wins plan, implementation roadmap, and ROI projections showing potential $50K–$250K/year recovery. We deliver your complete audit report in 48 hours and full implementation roadmap within 2 weeks. Would you like to know more about the audit process?";
        }

        // Check for pricing questions
        if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
            setConversationContext(prev => ({ ...prev, currentTopic: 'pricing' }));
            return "Our AI Audit pricing depends on the scope and complexity of your business operations. We provide detailed pricing during our initial consultation based on your specific needs and expected ROI. Most clients see the audit pay for itself within the first week of implementation. Would you like to discuss your specific needs to get a more accurate quote?";
        }

        // Check for integration questions
        if (lowerMessage.includes('integrate') || lowerMessage.includes('integration') || lowerMessage.includes('connect')) {
            return "Our AI audit works with all major accounting software, ERP systems, and financial platforms including QuickBooks, Xero, Sage, and more. We analyze your current systems to understand how they work together and identify integration opportunities. We can also create custom solutions for proprietary systems if needed. Would you like to know about specific integrations for your business?";
        }

        // Check for implementation questions
        if (lowerMessage.includes('implement') || lowerMessage.includes('setup') || lowerMessage.includes('get started')) {
            return "Getting started with our AI Audit is easy! 1) Book your audit through our website, 2) We analyze your financial systems and workflows using AI, 3) We deliver your complete audit report in 48 hours, 4) We provide your full implementation roadmap within 2 weeks. No technical expertise required - we handle everything! Would you like to book your audit?";
        }

        // Check for support questions
        if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('contact')) {
            return "We provide comprehensive ongoing support including implementation guidance, regular check-ins, and optimization recommendations. We also offer the option to hire us for full implementation, ongoing monitoring, and continuous improvement. For technical support: support@finstonelab.com. For sales inquiries: contact@finstonelab.com. How can I help you today?";
        }

        // Check for demo requests
        if (lowerMessage.includes('demo') || lowerMessage.includes('show me') || lowerMessage.includes('see it')) {
            return "I'd love to show you how our AI Audit process works! Our demos are personalized to your business and show exactly how we analyze financial systems and uncover hidden inefficiencies. Would you like me to connect you with our team to schedule a demo?";
        }

        // Check for ROI questions
        if (lowerMessage.includes('roi') || lowerMessage.includes('return') || lowerMessage.includes('benefit')) {
            return "Our clients regularly see $50K–$250K/year in recovered profit after implementing our recommendations. We don't sell you random automations - we build systems that make your business faster, smarter, and safer. Every recommendation comes with dollar-impact projections, and most businesses achieve ROI within 3-6 months. Would you like to learn more about potential savings for your company?";
        }

        // Check for security questions
        if (lowerMessage.includes('security') || lowerMessage.includes('safe') || lowerMessage.includes('secure')) {
            return "Yes, we take data security extremely seriously. All data is encrypted in transit and at rest, and we follow strict data privacy regulations. We provide detailed security documentation and can work with your IT team to meet specific compliance requirements. Your financial data is never stored permanently on our systems.";
        }

        // Check for specific keywords in the knowledge base
        for (const [keyword, response] of Object.entries(aiResponses)) {
            if (lowerMessage.includes(keyword)) {
                return response;
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
            label: "AI Sales Agent", 
            description: "Deploy AI sales employee", 
            prefix: "/sales" 
        },
        { 
            icon: <Figma className="w-4 h-4" />, 
            label: "AI Marketing Agent", 
            description: "Deploy AI marketing employee", 
            prefix: "/marketing" 
        },
        { 
            icon: <MonitorIcon className="w-4 h-4" />, 
            label: "AI Support Agent", 
            description: "Deploy AI support employee", 
            prefix: "/support" 
        },
        { 
            icon: <Sparkles className="w-4 h-4" />, 
            label: "AI Analytics Agent", 
            description: "Deploy AI analytics employee", 
            prefix: "/analytics" 
        },
    ];

    useEffect(() => {
        if (value.startsWith('/') && !value.includes(' ')) {
            setShowCommandPalette(true);
            
            const matchingSuggestionIndex = commandSuggestions.findIndex(
                (cmd) => cmd.prefix.startsWith(value)
            );
            
            if (matchingSuggestionIndex >= 0) {
                setActiveSuggestion(matchingSuggestionIndex);
            } else {
                setActiveSuggestion(-1);
            }
        } else {
            setShowCommandPalette(false);
        }
    }, [value]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const commandButton = document.querySelector('[data-command-button]');
            
            if (commandPaletteRef.current && 
                !commandPaletteRef.current.contains(target) && 
                !commandButton?.contains(target)) {
                setShowCommandPalette(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (showCommandPalette) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveSuggestion(prev => 
                    prev < commandSuggestions.length - 1 ? prev + 1 : 0
                );
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveSuggestion(prev => 
                    prev > 0 ? prev - 1 : commandSuggestions.length - 1
                );
            } else if (e.key === 'Tab' || e.key === 'Enter') {
                e.preventDefault();
                if (activeSuggestion >= 0) {
                    const selectedCommand = commandSuggestions[activeSuggestion];
                    setValue(selectedCommand.prefix + ' ');
                    setShowCommandPalette(false);
                    
                    setRecentCommand(selectedCommand.label);
                    setTimeout(() => setRecentCommand(null), 3500);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                setShowCommandPalette(false);
            }
        } else if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (value.trim()) {
                handleSendMessage();
            }
        }
    };

    const handleSendMessage = () => {
        if (value.trim()) {
            const userMessage = value.trim();
            
            // Add user message to chat
            const newUserMessage = {
                id: Date.now().toString(),
                text: userMessage,
                isUser: true,
                timestamp: new Date()
            };
            
            setMessages(prev => [...prev, newUserMessage]);
            setValue("");
            adjustHeight(true);
            setIsLoading(true);
            
            // Simulate AI thinking and generate response
            setTimeout(() => {
                const aiResponse = generateAIResponse(userMessage);
                const newAIMessage = {
                    id: (Date.now() + 1).toString(),
                    text: aiResponse,
                    isUser: false,
                    timestamp: new Date()
                };
                
                setMessages(prev => [...prev, newAIMessage]);
                setIsLoading(false);
            }, 1500);
        }
    };

    const handleAttachFile = () => {
        const mockFileName = `file-${Math.floor(Math.random() * 1000)}.pdf`;
        setAttachments(prev => [...prev, mockFileName]);
    };

    const removeAttachment = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };
    
    const selectCommandSuggestion = (index: number) => {
        const selectedCommand = commandSuggestions[index];
        setValue(selectedCommand.prefix + ' ');
        setShowCommandPalette(false);
        
        setRecentCommand(selectedCommand.label);
        setTimeout(() => setRecentCommand(null), 2000);
    };

    return (
        <>
            <Header isScrolled={false} />
            <div className="min-h-screen flex flex-col w-full items-center justify-center bg-transparent text-gray-900 p-6 relative overflow-hidden pt-40">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
                <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-blue-400/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
            </div>
            <div className="w-full max-w-2xl mx-auto relative">
                <motion.div 
                    className="relative z-10 space-y-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="text-center space-y-3">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-block"
                        >
                            <h1 className="text-3xl font-medium tracking-tight text-gray-900 pb-1">
                                How can I help today?
                            </h1>
                            <motion.div 
                                className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "100%", opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            />
                        </motion.div>
                        <motion.p 
                            className="text-sm text-gray-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Type a command or ask a question
                        </motion.p>
                    </div>

                    {/* Chat Messages */}
                    {messages.length > 0 && (
                        <motion.div 
                            className="w-full max-h-96 overflow-y-auto space-y-4 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                        message.isUser 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-gray-100 text-gray-900'
                                    }`}>
                                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <motion.div
                                    className="flex justify-start"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm">AI is thinking</span>
                                            <TypingDots />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    <motion.div 
                        className="relative backdrop-blur-2xl bg-white/80 rounded-2xl border border-gray-200 shadow-2xl"
                        initial={{ scale: 0.98 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <AnimatePresence>
                            {showCommandPalette && (
                                <motion.div 
                                    ref={commandPaletteRef}
                                    className="absolute left-4 right-4 bottom-full mb-2 backdrop-blur-xl bg-white/95 rounded-lg z-50 shadow-lg border border-gray-200 overflow-hidden"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <div className="py-1 bg-white/95">
                                        {commandSuggestions.map((suggestion, index) => (
                                            <motion.div
                                                key={suggestion.prefix}
                                                className={cn(
                                                    "flex items-center gap-2 px-3 py-2 text-xs transition-colors cursor-pointer",
                                                    activeSuggestion === index 
                                                        ? "bg-gray-100 text-gray-900" 
                                                        : "text-gray-700 hover:bg-gray-50"
                                                )}
                                                onClick={() => selectCommandSuggestion(index)}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.03 }}
                                            >
                                                <div className="w-5 h-5 flex items-center justify-center text-gray-500">
                                                    {suggestion.icon}
                                                </div>
                                                <div className="font-medium">{suggestion.label}</div>
                                                <div className="text-gray-400 text-xs ml-1">
                                                    {suggestion.prefix}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="p-4">
                            <Textarea
                                ref={textareaRef}
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                    adjustHeight();
                                }}
                                onKeyDown={handleKeyDown}
                                onFocus={() => setInputFocused(true)}
                                onBlur={() => setInputFocused(false)}
                                placeholder="Ask Finstone AI a question..."
                                containerClassName="w-full"
                                className={cn(
                                    "w-full px-4 py-3",
                                    "resize-none",
                                    "bg-transparent",
                                    "border-none",
                                    "text-gray-900 text-sm",
                                    "focus:outline-none",
                                    "placeholder:text-gray-400",
                                    "min-h-[60px]"
                                )}
                                style={{
                                    overflow: "hidden",
                                }}
                                showRing={false}
                            />
                        </div>

                        <AnimatePresence>
                            {attachments.length > 0 && (
                                <motion.div 
                                    className="px-4 pb-3 flex gap-2 flex-wrap"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    {attachments.map((file, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center gap-2 text-xs bg-gray-100 py-1.5 px-3 rounded-lg text-gray-700"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                        >
                                            <span>{file}</span>
                                            <button 
                                                onClick={() => removeAttachment(index)}
                                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                <XIcon className="w-3 h-3" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="p-4 border-t border-gray-200 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <motion.button
                                    type="button"
                                    onClick={handleAttachFile}
                                    whileTap={{ scale: 0.94 }}
                                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors relative group"
                                >
                                    <Paperclip className="w-4 h-4" />
                                    <motion.span
                                        className="absolute inset-0 bg-white/[0.05] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        layoutId="button-highlight"
                                    />
                                </motion.button>
                                <motion.button
                                    type="button"
                                    data-command-button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowCommandPalette(prev => !prev);
                                    }}
                                    whileTap={{ scale: 0.94 }}
                                    className={cn(
                                        "p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors relative group",
                                        showCommandPalette && "bg-blue-100 text-blue-900"
                                    )}
                                >
                                    <Command className="w-4 h-4" />
                                    <motion.span
                                        className="absolute inset-0 bg-white/[0.05] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        layoutId="button-highlight"
                                    />
                                </motion.button>
                            </div>
                            
                            <motion.button
                                type="button"
                                onClick={handleSendMessage}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isLoading || !value.trim()}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                    "flex items-center gap-2",
                                    value.trim() && !isLoading
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                        : "bg-gray-100 text-gray-400"
                                )}
                            >
                                {isLoading ? (
                                    <LoaderIcon className="w-4 h-4 animate-[spin_2s_linear_infinite]" />
                                ) : (
                                    <SendIcon className="w-4 h-4" />
                                )}
                                <span>Send</span>
                            </motion.button>
                        </div>
                    </motion.div>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {commandSuggestions.map((suggestion, index) => (
                            <motion.button
                                key={suggestion.prefix}
                                onClick={() => selectCommandSuggestion(index)}
                                className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 hover:text-gray-900 transition-all relative group"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {suggestion.icon}
                                <span>{suggestion.label}</span>
                                <motion.div
                                    className="absolute inset-0 border border-gray-200 rounded-lg"
                                    initial={false}
                                    animate={{
                                        opacity: [0, 1],
                                        scale: [0.98, 1],
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeOut",
                                    }}
                                />
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>


            {inputFocused && (
                <motion.div 
                    className="fixed w-[50rem] h-[50rem] rounded-full pointer-events-none z-0 opacity-[0.02] bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400 blur-[96px]"
                    animate={{
                        x: mousePosition.x - 400,
                        y: mousePosition.y - 400,
                    }}
                    transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 150,
                        mass: 0.5,
                    }}
                />
            )}
        </div>
        </>
    );
}

function TypingDots() {
    return (
        <div className="flex items-center ml-1">
            {[1, 2, 3].map((dot) => (
                <motion.div
                    key={dot}
                    className="w-1.5 h-1.5 bg-gray-600 rounded-full mx-0.5"
                    initial={{ opacity: 0.3 }}
                    animate={{ 
                        opacity: [0.3, 0.9, 0.3],
                        scale: [0.85, 1.1, 0.85]
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: dot * 0.15,
                        ease: "easeInOut",
                    }}
                    style={{
                        boxShadow: "0 0 4px rgba(75, 85, 99, 0.3)"
                    }}
                />
            ))}
        </div>
    );
}

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
}

function ActionButton({ icon, label }: ActionButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <motion.button
            type="button"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 rounded-full border border-neutral-800 text-neutral-400 hover:text-white transition-all relative overflow-hidden group"
        >
            <div className="relative z-10 flex items-center gap-2">
                {icon}
                <span className="text-xs relative z-10">{label}</span>
            </div>
            
            <AnimatePresence>
                {isHovered && (
                    <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </AnimatePresence>
            
            <motion.span 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-600"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
            />
        </motion.button>
    );
}

const rippleKeyframes = `
@keyframes ripple {
  0% { transform: scale(0.5); opacity: 0.6; }
  100% { transform: scale(2); opacity: 0; }
}
`;

if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = rippleKeyframes;
    document.head.appendChild(style);
}
