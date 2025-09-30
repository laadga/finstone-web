"use client";

import { useState, useEffect } from "react";
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

function ActionSearchBar({ actions = defaultActions }: { actions?: Action[] }) {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<SearchResult | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [selectedAction, setSelectedAction] = useState<Action | null>(null);
    const debouncedQuery = useDebounce(query, 200);

    useEffect(() => {
        if (!isFocused) {
            setResult(null);
            return;
        }

        if (!debouncedQuery) {
            // Show only first 6 items as recommendations when no search query
            setResult({ actions: defaultActions });
            return;
        }

        // Search through ALL passed actions, not just the default 6
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

    // Reset selectedAction when focusing the input
    const handleFocus = () => {
        setSelectedAction(null);
        setIsFocused(true);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="relative flex flex-col justify-start items-center min-h-[300px]">
                <div className="w-full max-w-2xl sticky top-0 bg-transparent z-10 pt-4 pb-1">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Ask a question about AI audits, automation, or our services..."
                            value={query}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
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
                                    >
                                        <Send className="w-6 h-6 text-gray-500" />
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

                <div className="w-full max-w-2xl">
                    <AnimatePresence>
                        {isFocused && result && !selectedAction && (
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
                                            onClick={() =>
                                                setSelectedAction(action)
                                            }
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

export { ActionSearchBar, Action };
