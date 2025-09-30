"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Send,
    DollarSign,
    Clock,
    Shield,
    Zap,
    Users,
    MessageSquare,
    Mail,
    HelpCircle,
    FileText,
    Settings,
    TrendingUp,
    AlertCircle,
    CheckCircle,
    Info,
    X,
} from "lucide-react";

function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export interface Action {
    id: string;
    label: string;
    icon: React.ReactNode;
    description?: string;
    short?: string;
    end?: string;
}

interface SearchResult {
    actions: Action[];
}

const defaultActions = [
    {
        id: "1",
        label: "How much does the AI Audit cost?",
        icon: <DollarSign className="h-4 w-4 text-green-600" />,
        description: "Pricing information",
        short: "",
        end: "Pricing",
    },
    {
        id: "2",
        label: "How long does an AI Audit take?",
        icon: <Clock className="h-4 w-4 text-blue-600" />,
        description: "Timeline details",
        short: "",
        end: "Timeline",
    },
    {
        id: "3",
        label: "What do I receive after the audit?",
        icon: <FileText className="h-4 w-4 text-purple-600" />,
        description: "Deliverables",
        short: "",
        end: "Results",
    },
    {
        id: "4",
        label: "How do you protect my data?",
        icon: <Shield className="h-4 w-4 text-red-600" />,
        description: "Security measures",
        short: "",
        end: "Security",
    },
    {
        id: "5",
        label: "What is AI Workforce?",
        icon: <Zap className="h-4 w-4 text-yellow-600" />,
        description: "AI agents service",
        short: "",
        end: "Service",
    },
    {
        id: "6",
        label: "Do I need to be technical to use your service?",
        icon: <Settings className="h-4 w-4 text-gray-600" />,
        description: "Technical requirements",
        short: "",
        end: "Requirements",
    },
    {
        id: "7",
        label: "How soon can I get started?",
        icon: <TrendingUp className="h-4 w-4 text-indigo-600" />,
        description: "Getting started",
        short: "",
        end: "Onboarding",
    },
    {
        id: "8",
        label: "What kind of ROI can I expect?",
        icon: <DollarSign className="h-4 w-4 text-emerald-600" />,
        description: "Return on investment",
        short: "",
        end: "ROI",
    },
    {
        id: "9",
        label: "Which tools do you integrate with?",
        icon: <Settings className="h-4 w-4 text-cyan-600" />,
        description: "Integrations",
        short: "",
        end: "Integrations",
    },
    {
        id: "10",
        label: "Do you offer refunds?",
        icon: <CheckCircle className="h-4 w-4 text-green-500" />,
        description: "Refund policy",
        short: "",
        end: "Policy",
    },
    {
        id: "11",
        label: "How do I contact support?",
        icon: <MessageSquare className="h-4 w-4 text-blue-500" />,
        description: "Support contact",
        short: "",
        end: "Support",
    },
    {
        id: "12",
        label: "What if I have an urgent issue?",
        icon: <AlertCircle className="h-4 w-4 text-orange-600" />,
        description: "Urgent support",
        short: "",
        end: "Urgent",
    },
];

// Comprehensive AI Knowledge Base from Database
const aiKnowledgeBase: { [key: string]: string } = {
    // Company & Mission
    "what does your company do": "We help businesses save time, cut costs, and scale by building AI-powered 'employees' and delivering AI audits + implementations. We analyze workflows, propose high-impact automations, implement AI agents (Sales, Marketing, Support, Analytics), and provide ongoing optimization or enterprise-grade custom work.",
    
    "what is your mission": "Our mission is to make AI practical and profitable for businesses of all sizes — by delivering clear audits, predictable implementation, and ongoing AI operations so teams spend less time on manual work and more time on growth.",
    
    "what services do you offer": "We currently sell three core offerings: 1) AI Audit — a one-time analysis and roadmap; 2) AI Workforce — a managed subscription where we deploy and run AI agents for you; 3) Enterprise — fully-custom AI workforce builds, integrations, and support. The SaaS self-serve platform is coming soon but not public yet.",
    
    // AI Audit
    "what is an ai audit": "An AI Audit is a structured, one-time service where we map your processes, identify where time and money are being lost, and produce a prioritized roadmap of AI agents and automations with clear ROI estimates. It includes a written report and a strategy call.",
    
    "how much does the ai audit cost": "The AI Audit is $1,500 (one-time). It includes workflow analysis, a written action plan, ROI projections, and an onboarding/strategy call to walk you through recommendations.",
    
    "how long does an ai audit take": "Standard delivery is 7 business days from kickoff. We collect data (forms + optional short call), analyze workflows, create the report, and deliver a walkthrough. Priority (3-day) delivery is available as a paid upgrade.",
    
    "what do i receive after the audit": "You get a professional report (PDF or Notion) including: workflow maps, the top 3–5 automation opportunities, expected savings and ROI, a 30-day quick-wins plan, recommended AI agents, and a suggested implementation roadmap.",
    
    "will it get implemented to my workflows": "Yes! We offer two implementation options: 1) **We implement for you** - Our team handles all the technical work and integrates the automations directly into your existing workflows, or 2) **DIY implementation** - We provide you with detailed step-by-step instructions and support to implement the recommendations yourself. Most clients choose our implementation service to ensure everything works perfectly with their current systems.",
    
    "do you implement the recommendations": "Absolutely! We offer full implementation services where our team will integrate all the recommended automations directly into your existing workflows and systems. We handle all the technical work, testing, and training so you don't have to worry about the implementation process.",
    
    // AI Workforce
    "what is ai workforce": "AI Workforce is our managed subscription service where we deploy and operate AI agents for you. We handle setup, integrations, ongoing optimization, monitoring, and reporting so your team gets continuous value without the technical burden.",
    
    "what is the battery system": "The Battery System is a simple way to visualize monthly usage for AI agents (we avoid confusing 'credits'). Each plan includes a monthly allowance of agent activity. If you reach your allowance you can top up instantly. Quality of output does not change — battery only controls how much work agents can do in a period.",
    
    // Pricing
    "what are your prices": "Current core pricing: AI Audit — $1,500 one-time; AI Workforce — $2,000/month; Enterprise — custom pricing. Exact quotes for implementations are provided after the audit or discovery call.",
    
    "do i need the audit before the workforce subscription": "No — the audit is recommended but optional. If you start a subscription, we include the audit as part of onboarding so you get the roadmap and ROI projections before implementation.",
    
    // Integrations
    "which tools do you integrate with": "We support standard integrations: Slack, HubSpot, Gmail, Google Workspace, Notion, Excel/Google Sheets, Stripe, Calendly/Calendly alternatives, and most CRMs. For more niche tools we use connector services (Zapier, Make, Pipedream) or build custom integrations for Enterprise clients.",
    
    "will i need api keys to connect my apps": "No. For most major tools we use OAuth: you click Connect, log in, and authorize the integration — no manual API key handling. For niche tools that require keys, we hide the complexity or offer a done-for-you setup as part of Enterprise or implementation services.",
    
    "can you build custom integrations": "Yes — custom integrations are part of Enterprise or paid implementation work. We'll provide a project quote after scoping the integration and expected security requirements.",
    
    // Security & Privacy
    "how do you protect my data": "Security is a priority. We use encrypted storage for credentials and tokens, limited scopes for OAuth, role-based access, and follow industry best practices for data handling. Enterprise clients get additional compliance measures (SOC2-level options, dedicated encryption policies) on request.",
    
    "do you share or sell my data": "No — we do not sell or share client data. Integrations only use the minimum permissions required to provide the service. We can sign NDAs and custom data processing agreements for enterprise clients.",
    
    // Support & Training
    "what kind of support do you provide": "AI Audit customers get email support. Workforce customers get 24/7 support and a performance report. Enterprise customers have a dedicated account manager and SLA-backed support.",
    
    "do you provide training for my team": "Yes — Starter customers receive a basic training session; Growth/Workforce customers receive guided onboarding and documentation; Enterprise customers get customized training programs as part of their onboarding.",
    
    "how do i escalate an urgent issue": "Open a support ticket via the dashboard or email contact@finstonelab.com. Workforce customers get priority triage; Enterprise customers use their dedicated account manager and SLA contact channels.",
    
    // Billing & Refunds
    "how does billing work": "AI Audit is a one-time invoice due at purchase. Workforce and Enterprise are billed monthly by card (Stripe or similar) and include invoices accessible in your account. We support annual invoicing for Enterprise and can set up net terms for large customers.",
    
    "do you offer refunds": "Audit fees are typically non-refundable (they pay for analysis time). For subscription plans, we can prorate or refund under specific circumstances — we handle those on a case-by-case basis through support.",
    
    "can i cancel my subscription": "Workforce subscriptions can be canceled any time (monthly billing). For Enterprise we negotiate terms with notice periods. Refunds are handled on a case-by-case basis and you can discuss directly with support.",
    
    // Getting Started
    "how do i start what is the onboarding process": "1) Book the audit or schedule a discovery call via the site. 2) Complete an intake form and share access to relevant tools (OAuth connections). 3) We deliver the audit (7 days) and review it with you. 4) If you pick Workforce, we schedule implementation and run onboarding sessions.",
    
    "how soon can i get started": "You can book an audit or discovery call immediately on the site. Audit delivery is typically 7 business days after kickoff. Implementation scheduling depends on plan and availability.",
    
    "do i need to be technical to use your service": "No — we handle the technical work. Clients approve the plan and we implement integrations; we present results in plain language and offer training for teams.",
    
    // Enterprise
    "what is included in the enterprise plan": "Enterprise includes everything in AI Workforce plus custom integrations, advanced security & compliance, API access, SLA guarantees, a dedicated account manager, and large-scale agent deployment. Pricing is custom and based on scope.",
    
    "do you offer slas": "Yes — SLA guarantees (uptime, response times) are available for Enterprise customers and will be included in the custom contract.",
    
    // Platform & SaaS
    "is the saas platform live": "The SaaS self-serve platform is currently in development. The website displays the coming-soon platform; core managed Workforce and Enterprise services are available now via our consulting offerings.",
    
    "do you support single sign-on sso": "SSO is available for Enterprise customers as part of custom onboarding and compliance requirements. Standard Workforce customers use normal account auth; we can add SSO at the request of larger customers.",
    
    // Contact & Sales
    "how can i contact you": "Use the contact form on the website, email contact@finstonelab.com, or book a call via the scheduling link on the site. Enterprise inquiries can use the 'Contact Sales' button.",
    
    "can i get a demo": "Yes — book a demo via the website contact form. For audit customers we provide a live walkthrough of the audit or recorded demo showing how suggested agents would work.",
    
    "do you offer trials": "We do not offer an open SaaS trial yet. For audit clients who move to Workforce we provide a guided onboarding and short pilot phase so you can validate outcomes before committing longer-term.",
    
    // Implementation Details
    "what does implementation starter include": "Starter Implementation is a one-time package (price listed on the site) that implements 1–2 AI agents, integrates them with core tools (e.g., Slack, Gmail, HubSpot), and includes 30 days of optimization support and basic team training.",
    
    "what does growth implementation include": "Growth Implementation covers a wider rollout (3–5 AI agents), cross-department integrations, training sessions, and 60 days of active optimization. This plan is for companies scaling automation across functions.",
    
    // General Keywords
    "implementation": "We offer full implementation services! Our team will integrate all recommended automations directly into your existing workflows and systems. We handle all the technical work, testing, and training so you don't have to worry about the implementation process.",
    
    "workflow": "Yes, we work directly with your existing workflows! Our AI agents and automations integrate seamlessly into your current business processes. We analyze your workflows during the audit and then implement solutions that work with your specific systems and processes.",
    
    "integrate": "We integrate with 200+ business tools and can work with your existing systems. Our team handles all the technical integration work, ensuring everything works smoothly with your current workflows and processes.",
    
    "roi": "Our clients typically see 300-500% ROI within the first year. Most recover $50K-$250K annually in saved costs and increased efficiency. The AI Audit alone often pays for itself within 2-3 months through identified savings opportunities.",
    
    "pricing": "Current core pricing: AI Audit — $1,500 one-time; AI Workforce — $2,000/month; Enterprise — custom pricing. Exact quotes for implementations are provided after the audit or discovery call.",
    
    "cost": "The AI Audit is $1,500 (one-time). It includes workflow analysis, a written action plan, ROI projections, and an onboarding/strategy call to walk you through recommendations.",
    
    "timeline": "Standard delivery is 7 business days from kickoff. We collect data (forms + optional short call), analyze workflows, create the report, and deliver a walkthrough. Priority (3-day) delivery is available as a paid upgrade.",
    
    "security": "Security is a priority. We use encrypted storage for credentials and tokens, limited scopes for OAuth, role-based access, and follow industry best practices for data handling. Enterprise clients get additional compliance measures (SOC2-level options, dedicated encryption policies) on request.",
    
    "support": "AI Audit customers get email support. Workforce customers get 24/7 support and a performance report. Enterprise customers have a dedicated account manager and SLA-backed support. Contact us at contact@finstonelab.com.",
    
    "contact": "Use the contact form on the website, email contact@finstonelab.com, or book a call via the scheduling link on the site. Enterprise inquiries can use the 'Contact Sales' button.",
};

function FunctionalSearchBar({ actions = defaultActions, onQuestionSubmit }: { 
    actions?: Action[];
    onQuestionSubmit?: (question: string, answer: string) => void;
}) {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<SearchResult | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [selectedAction, setSelectedAction] = useState<Action | null>(null);
    const [answer, setAnswer] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedQuery = useDebounce(query, 200);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isFocused) {
            setResult(null);
            return;
        }

        if (!debouncedQuery) {
            setResult({ actions: defaultActions.slice(0, 6) });
            return;
        }

        const normalizedQuery = debouncedQuery.toLowerCase().trim();
        const filteredActions = actions.filter((action) => {
            const searchableText = action.label.toLowerCase() + ' ' + (action.description?.toLowerCase() || '');
            return searchableText.includes(normalizedQuery);
        });

        setResult({ actions: filteredActions });
    }, [debouncedQuery, isFocused, actions]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setIsTyping(true);
        // Clear answer when user starts typing a new question
        if (answer) {
            setAnswer(null);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.trim()) {
            handleQuestionSubmit(query.trim());
        }
    };

    const generateSmartAnswer = (question: string): string => {
        const normalizedQuestion = question.toLowerCase().trim();
        
        // First, try to find exact or highly relevant matches from knowledge base
        for (const [key, value] of Object.entries(aiKnowledgeBase)) {
            if (normalizedQuestion.includes(key) || key.includes(normalizedQuestion)) {
                return value;
            }
        }
        
        // Try partial matches with scoring
        let bestMatch = { score: 0, answer: '' };
        for (const [key, value] of Object.entries(aiKnowledgeBase)) {
            const keyWords = key.split(' ').filter(w => w.length > 2);
            const questionWords = normalizedQuestion.split(' ').filter(w => w.length > 2);
            const matchCount = keyWords.filter(word => 
                questionWords.some(qWord => qWord.includes(word) || word.includes(qWord))
            ).length;
            
            if (matchCount > bestMatch.score) {
                bestMatch = { score: matchCount, answer: value };
            }
        }
        
        // If we have a good partial match, use it
        if (bestMatch.score >= 2) {
            return bestMatch.answer;
        }
        
        // Generate intelligent answers based on question patterns and context
        return generateContextualAnswer(question, normalizedQuestion);
    };

    const generateContextualAnswer = (question: string, normalizedQuestion: string): string => {
        // Company/Service questions
        if (normalizedQuestion.includes('what') && (normalizedQuestion.includes('company') || normalizedQuestion.includes('business') || normalizedQuestion.includes('do'))) {
            return "Finstone AI helps businesses save time, cut costs, and scale by building AI-powered 'employees' and delivering AI audits + implementations. We analyze workflows, propose high-impact automations, implement AI agents (Sales, Marketing, Support, Analytics), and provide ongoing optimization or enterprise-grade custom work. Our mission is to make AI practical and profitable for businesses of all sizes.";
        }
        
        // Pricing questions
        if (normalizedQuestion.includes('price') || normalizedQuestion.includes('cost') || normalizedQuestion.includes('how much')) {
            return "Our current pricing is: AI Audit — $1,500 one-time; AI Workforce — $2,000/month; Enterprise — custom pricing. The AI Audit includes workflow analysis, a written action plan, ROI projections, and an onboarding/strategy call. Exact quotes for implementations are provided after the audit or discovery call.";
        }
        
        // Timeline questions
        if (normalizedQuestion.includes('how long') || normalizedQuestion.includes('timeline') || normalizedQuestion.includes('when')) {
            return "Standard AI Audit delivery is 7 business days from kickoff. We collect data (forms + optional short call), analyze workflows, create the report, and deliver a walkthrough. Priority (3-day) delivery is available as a paid upgrade. Implementation scheduling depends on plan and availability.";
        }
        
        // Technical questions
        if (normalizedQuestion.includes('technical') || normalizedQuestion.includes('api') || normalizedQuestion.includes('integrate')) {
            return "No technical expertise required! We handle all the technical work. For most major tools we use OAuth: you click Connect, log in, and authorize the integration — no manual API key handling. We support 200+ business tools including Slack, HubSpot, Gmail, Google Workspace, Notion, and most CRMs.";
        }
        
        // Security questions
        if (normalizedQuestion.includes('security') || normalizedQuestion.includes('data') || normalizedQuestion.includes('privacy')) {
            return "Security is a priority. We use encrypted storage for credentials and tokens, limited scopes for OAuth, role-based access, and follow industry best practices for data handling. We do not sell or share client data. Enterprise clients get additional compliance measures (SOC2-level options, dedicated encryption policies) on request.";
        }
        
        // Support questions
        if (normalizedQuestion.includes('support') || normalizedQuestion.includes('help') || normalizedQuestion.includes('contact')) {
            return "AI Audit customers get email support. Workforce customers get 24/7 support and a performance report. Enterprise customers have a dedicated account manager and SLA-backed support. You can contact us via the website contact form, email contact@finstonelab.com, or book a call via the scheduling link on the site.";
        }
        
        // Implementation questions
        if (normalizedQuestion.includes('implement') || normalizedQuestion.includes('workflow') || normalizedQuestion.includes('setup')) {
            return "Yes! We offer full implementation services where our team integrates all recommended automations directly into your existing workflows and systems. We handle all the technical work, testing, and training. We also offer Starter Implementation (1-2 AI agents) and Growth Implementation (3-5 AI agents) packages.";
        }
        
        // ROI/Results questions
        if (normalizedQuestion.includes('roi') || normalizedQuestion.includes('results') || normalizedQuestion.includes('benefit')) {
            return "Our clients typically see 300-500% ROI within the first year. Most recover $50K-$250K annually in saved costs and increased efficiency. The AI Audit alone often pays for itself within 2-3 months through identified savings opportunities. We provide detailed ROI projections in the audit report.";
        }
        
        // Getting started questions
        if (normalizedQuestion.includes('start') || normalizedQuestion.includes('begin') || normalizedQuestion.includes('onboard')) {
            return "You can get started immediately! Book an audit or discovery call via the site. The process is: 1) Complete an intake form and share access to relevant tools (OAuth connections), 2) We deliver the audit (7 days) and review it with you, 3) If you pick Workforce, we schedule implementation and run onboarding sessions.";
        }
        
        // Enterprise questions
        if (normalizedQuestion.includes('enterprise') || normalizedQuestion.includes('large') || normalizedQuestion.includes('custom')) {
            return "Enterprise includes everything in AI Workforce plus custom integrations, advanced security & compliance, API access, SLA guarantees, a dedicated account manager, and large-scale agent deployment. Pricing is custom and based on scope. We can sign NDAs and custom data processing agreements for enterprise clients.";
        }
        
        // General business questions
        if (normalizedQuestion.includes('business') || normalizedQuestion.includes('company') || normalizedQuestion.includes('help')) {
            return "We specialize in AI-powered business optimization. Our AI Audit identifies where time and money are being lost in your processes, then we provide a roadmap of AI agents and automations with clear ROI estimates. We work with $2M-$50M businesses to recover lost profits and scale efficiently.";
        }
        
        // Default intelligent response
        return `That's an interesting question about "${question}"! While I don't have a specific answer for that exact question, I can help you with information about our AI Audit services, AI Workforce subscriptions, pricing, implementation, or any other aspects of our business. 

Our core services include:
• AI Audit ($1,500) - One-time analysis and roadmap
• AI Workforce ($2,000/month) - Managed AI agents subscription  
• Enterprise - Custom AI workforce builds

Would you like to know more about any of these services, or would you prefer to contact our team directly for a personalized answer? You can reach us through the website contact form or book a call via the scheduling link.`;
    };

    const handleQuestionSubmit = async (question: string) => {
        setIsLoading(true);
        setAnswer(null);
        setSelectedAction(null);
        
        // Simulate AI processing time
        setTimeout(() => {
            const smartAnswer = generateSmartAnswer(question);
            setAnswer(smartAnswer);
            setIsLoading(false);
            
            // Call the callback if provided
            if (onQuestionSubmit) {
                onQuestionSubmit(question, smartAnswer);
            }
        }, 1000);
    };

    const handleActionClick = (action: Action) => {
        setQuery(action.label);
        setAnswer(null);
        setSelectedAction(null);
        setIsFocused(false);
        handleQuestionSubmit(action.label);
    };

    const clearSearch = () => {
        setQuery("");
        setAnswer(null);
        setSelectedAction(null);
        inputRef.current?.focus();
    };

    const container = {
        hidden: { opacity: 0, height: 0 },
        show: {
            opacity: 1,
            height: "auto",
            transition: {
                height: {
                    duration: 0.4,
                },
                staggerChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: {
                height: {
                    duration: 0.3,
                },
                opacity: {
                    duration: 0.2,
                },
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
            },
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="relative flex flex-col justify-start items-center min-h-[300px]">
                <div className="w-full max-w-2xl sticky top-0 bg-transparent z-10 pt-4 pb-1">
                    <div className="relative">
                        <Input
                            ref={inputRef}
                            type="text"
                            placeholder="Ask a question about AI audits, automation, or our services..."
                            value={query}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() =>
                                setTimeout(() => setIsFocused(false), 200)
                            }
                            className="pl-6 pr-12 py-4 h-14 text-lg rounded-2xl bg-white/40 backdrop-blur-sm border border-white/30 focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-blue-400 placeholder:text-gray-500 shadow-lg"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6">
                            <AnimatePresence mode="popLayout">
                                {query.length > 0 ? (
                                    <motion.div
                                        key="send"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="cursor-pointer"
                                        onClick={() => handleQuestionSubmit(query)}
                                    >
                                        <Send className="w-6 h-6 text-blue-500 hover:text-blue-600" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="search"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Search className="w-6 h-6 text-gray-500" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Answer Display */}
                {answer && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-2xl mt-4 p-6 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Answer:</h3>
                            <button
                                onClick={clearSearch}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{answer}</p>
                    </motion.div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-2xl mt-4 p-6 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                            <span className="text-gray-700">Finding the best answer for you...</span>
                        </div>
                    </motion.div>
                )}

                {/* Search Suggestions */}
                <div className="w-full max-w-2xl">
                    <AnimatePresence>
                        {isFocused && result && !answer && !isLoading && (
                            <motion.div
                                className="w-full border rounded-2xl shadow-lg overflow-hidden bg-white/60 backdrop-blur-sm border-white/40 mt-2"
                                variants={container}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                            >
                                <motion.ul className="p-2">
                                    {result.actions.map((action) => (
                                        <motion.li
                                            key={action.id}
                                            className="px-4 py-3 flex items-center justify-between hover:bg-white/60 cursor-pointer rounded-xl transition-all duration-200"
                                            variants={item}
                                            layout
                                            onClick={() => handleActionClick(action)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-gray-600">
                                                        {action.icon}
                                                    </span>
                                                    <span className="text-base font-medium text-gray-900">
                                                        {action.label}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {action.description}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm text-gray-400 font-mono">
                                                    {action.short}
                                                </span>
                                                <span className="text-sm text-blue-600 font-medium">
                                                    {action.end}
                                                </span>
                                            </div>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export { FunctionalSearchBar, Action };
