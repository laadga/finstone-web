"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from '@iconify/react';
import { AgentConfigurationModal } from './agent-configuration-modal';
import { agentService } from '@/lib/agent-service';
import {
    CheckCircle,
    Clock,
    Star,
    TrendingUp,
    Video,
    Globe,
    X,
    Plus,
    Play,
    FileText,
    Users,
    ArrowLeft,
    Mail,
    MessageSquare,
    Bot,
    Target,
    Settings,
    Calendar,
    Zap,
    BarChart2,
} from "lucide-react";

export interface BentoItem {
    id?: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    status?: string;
    tags?: string[];
    meta?: string;
    cta?: string;
    colSpan?: number;
    hasPersistentHover?: boolean;
    integrations?: string[];
}

interface BentoGridProps {
    items: BentoItem[];
    onModalStateChange?: (isOpen: boolean) => void;
}

const itemsSample: BentoItem[] = [
    {
        title: "Analytics Dashboard",
        meta: "v2.4.1",
        description:
            "Real-time metrics with AI-powered insights and predictive analytics",
        icon: <TrendingUp className="w-4 h-4 text-blue-500" />,
        status: "Live",
        tags: ["Statistics", "Reports", "AI"],
        colSpan: 2,
        hasPersistentHover: true,
    },
    {
        title: "Task Manager",
        meta: "84 completed",
        description: "Automated workflow management with priority scheduling",
        icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
        status: "Updated",
        tags: ["Productivity", "Automation"],
    },
    {
        title: "Media Library",
        meta: "12GB used",
        description: "Cloud storage with intelligent content processing",
        icon: <Video className="w-4 h-4 text-purple-500" />,
        tags: ["Storage", "CDN"],
        colSpan: 2,
    },
    {
        title: "Global Network",
        meta: "6 regions",
        description: "Multi-region deployment with edge computing",
        icon: <Globe className="w-4 h-4 text-sky-500" />,
        status: "Beta",
        tags: ["Infrastructure", "Edge"],
    },
];

function BentoGrid({ items = itemsSample, onModalStateChange }: BentoGridProps) {
    const [selectedItem, setSelectedItem] = useState<BentoItem | null>(null);
    const [showAgentDetail, setShowAgentDetail] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<BentoItem | null>(null);
    const [showConfigModal, setShowConfigModal] = useState(false);
    const [isDeploying, setIsDeploying] = useState(false);

    // Function to handle agent card click
    const handleAgentClick = (agent: BentoItem) => {
        console.log('Agent clicked, notifying parent modal is opening');
        onModalStateChange?.(true); // Notify parent first
        setSelectedAgent(agent);
        setShowAgentDetail(true);
    };

    // Function to handle agent deployment
    const handleDeployAgent = async (configuration: Record<string, any>) => {
        if (!selectedAgent) return;

        setIsDeploying(true);
        try {
            // Get agent configuration
            const agentConfig = agentService.getAgentConfigurationForm(selectedAgent.id || '');
            
            if (!agentConfig) {
                throw new Error('Agent configuration not found');
            }

            // Deploy the agent
            const result = await agentService.deployAgent(
                selectedAgent.id || '',
                'current-user-id', // TODO: Get from auth context
                configuration
            );

            console.log('Agent deployed successfully:', result);
            
            // Close modals
            setShowConfigModal(false);
            setShowAgentDetail(false);
            setSelectedAgent(null);
            onModalStateChange?.(false);

            // TODO: Show success notification
            alert('Agent deployed successfully!');

        } catch (error) {
            console.error('Failed to deploy agent:', error);
            alert('Failed to deploy agent. Please try again.');
        } finally {
            setIsDeploying(false);
        }
    };

    // Function to handle "Start Using Agent" button click
    const handleStartUsingAgent = () => {
        if (!selectedAgent) return;

        const agentConfig = agentService.getAgentConfigurationForm(selectedAgent.id || '');
        
        if (agentConfig && (agentConfig.requiredFields.length > 0 || agentConfig.optionalFields.length > 0)) {
            // Show configuration modal
            setShowConfigModal(true);
        } else {
            // Deploy directly without configuration
            handleDeployAgent({});
        }
    };

    // Function to get the appropriate Iconify icon for each integration
    const getIntegrationIcon = (integration: string) => {
        const iconMap: { [key: string]: string } = {
            // Sales & CRM
            'HubSpot': 'logos:hubspot',
            'Salesforce': 'logos:salesforce',
            'LinkedIn': 'logos:linkedin-icon',
            'Apollo': 'logos:apollo-graphql',
            'Pipedrive': 'logos:pipedrive',
            'Zapier': 'logos:zapier',
            
            // Marketing & Social
            'Hootsuite': 'logos:hootsuite',
            'Canva': 'logos:canva-icon',
            'Mailchimp': 'logos:mailchimp',
            'Google Analytics': 'logos:google-analytics',
            'Twitter': 'logos:twitter',
            'Facebook': 'logos:facebook',
            'Instagram': 'logos:instagram-icon',
            
            // Support & Communication
            'Zendesk': 'logos:zendesk',
            'Intercom': 'logos:intercom-icon',
            'Slack': 'logos:slack-icon',
            'Crisp': 'logos:crisp',
            'Telegram': 'logos:telegram',
            'WhatsApp': 'logos:whatsapp-icon',
            'Microsoft Teams': 'logos:microsoft-teams',
            
            // Project Management
            'Asana': 'logos:asana',
            'Trello': 'logos:trello',
            'Monday.com': 'logos:monday',
            'Jira': 'logos:jira',
            'Notion': 'logos:notion-icon',
            
            // AI & Voice
            'ElevenLabs AI': 'logos:openai-icon',
            'OpenAI': 'logos:openai-icon',
            'Claude AI': 'logos:anthropic',
            'GPT-4O Vision': 'logos:openai-icon',
            'GPT-4o mini': 'logos:openai-icon',
            'DeepSeek R1': 'logos:openai-icon',
            
            // Calendar & Scheduling
            'Cal.com': 'logos:cal',
            'Google Calendar': 'logos:google-calendar',
            'Zoom': 'logos:zoom',
            
            // Data & Analytics
            'Google Sheets': 'logos:microsoft-excel',
            'Excel': 'logos:microsoft-excel',
            'Airtable': 'logos:airtable',
            'Tableau': 'logos:tableau',
            'Power BI': 'logos:microsoft-power-bi',
            'Mixpanel': 'logos:mixpanel',
            
            // Development & APIs
            'SerpAPI': 'logos:google',
            'Vector Databases': 'logos:postgresql',
            'InfraNodus': 'logos:notion-icon',
            
            // Content & Media
            'WordPress': 'logos:wordpress-icon',
            'Medium': 'logos:medium-icon',
            'YouTube': 'logos:youtube-icon',
            'TikTok': 'logos:tiktok-icon',
            
            // Storage & Files
            'Google Drive': 'logos:google-drive',
            'Dropbox': 'logos:dropbox',
            'OneDrive': 'logos:microsoft-onedrive',
            
            // Finance & Business
            'QuickBooks': 'logos:quickbooks',
            'Xero': 'logos:xero',
            'Sage': 'logos:sage',
            
            // Security & Monitoring
            'Datadog': 'logos:datadog',
            'New Relic': 'logos:new-relic',
            'PagerDuty': 'logos:pagerduty',
            'Splunk': 'logos:splunk',
            'CrowdStrike': 'logos:crowdstrike',
            'SentinelOne': 'logos:sentinelone',
            
            // Cloud & Infrastructure
            'AWS': 'logos:aws',
            'Azure': 'logos:microsoft-azure',
            'Google Cloud': 'logos:google-cloud',
            'Veeam': 'logos:veeam',
            'Acronis': 'logos:acronis',
            
            // SEO & Marketing Tools
            'Google Search Console': 'logos:google',
            'SEMrush': 'logos:semrush',
            'Ahrefs': 'logos:ahrefs',
            'SimilarWeb': 'logos:similarweb',
            'Brandwatch': 'logos:brandwatch',
            'Mention': 'logos:mention',
            
            // Email & Communication
            'Gmail': 'logos:gmail-icon',
            'SendGrid': 'logos:sendgrid-icon',
            'Klaviyo': 'logos:klaviyo',
            'ActiveCampaign': 'logos:activecampaign',
            
            // Document & Legal
            'DocuSign': 'logos:docusign',
            'Adobe Sign': 'logos:adobe',
            'PandaDoc': 'logos:pandadoc',
            'Proposify': 'logos:proposify',
            
            // HR & Recruiting
            'Workday': 'logos:workday',
            'Indeed': 'logos:indeed',
            'Gainsight': 'logos:gainsight',
            'Totango': 'logos:totango',
            
            // Survey & Feedback
            'SurveyMonkey': 'logos:surveymonkey',
            'Typeform': 'logos:typeform-icon',
            'Qualtrics': 'logos:qualtrics',
            
            // E-commerce
            'Shopify': 'logos:shopify',
            'WooCommerce': 'logos:woocommerce',
            'Square': 'logos:square',
            
            // Knowledge & Documentation
            'Confluence': 'logos:confluence',
            'GitBook': 'logos:gitbook',
            
            // Testing & Quality
            'Selenium': 'logos:selenium',
            'Jest': 'logos:jest',
            'Cypress': 'logos:cypress',
            
            // Compliance & Legal
            'Clio': 'logos:clio',
            'LexisNexis': 'logos:lexisnexis',
            'OneTrust': 'logos:onetrust',
            'TrustArc': 'logos:trustarc'
        };

        return iconMap[integration] || null; // Return null instead of default icon
    };

    return (
        <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-6xl mx-auto">
                {items.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => handleAgentClick(item)}
                            className={cn(
                                "group relative p-6 rounded-xl overflow-hidden transition-all duration-300",
                                "border border-blue-300/40 bg-gradient-to-br from-blue-200 via-blue-150 to-blue-100",
                                "hover:shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:from-blue-300 hover:via-blue-200 hover:to-blue-150",
                                "hover:-translate-y-0.5 will-change-transform cursor-pointer",
                                "h-64 flex flex-col", // Fixed height and flex layout
                                {
                                    "shadow-[0_2px_12px_rgba(0,0,0,0.03)] -translate-y-0.5":
                                        item.hasPersistentHover,
                                    "dark:shadow-[0_2px_12px_rgba(255,255,255,0.03)]":
                                        item.hasPersistentHover,
                                }
                            )}
                        >
                    <div
                        className={`absolute inset-0 ${
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        } transition-opacity duration-300`}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
                    </div>

                    <div className="relative flex flex-col h-full">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-200/70 group-hover:bg-blue-300/90 transition-all duration-300">
                                {item.icon}
                            </div>
                        </div>

                        <div className="flex-1 space-y-2 mb-4">
                            <h3 className="font-semibold text-gray-800 tracking-tight text-lg">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-snug font-[425] line-clamp-3">
                                {item.description}
                            </p>
                        </div>

                        <div className="mt-auto">
                            <button 
                                onClick={() => setSelectedItem(item)}
                                className="text-blue-600 hover:text-blue-700 text-xs font-medium hover:underline transition-colors duration-200"
                            >
                                Use Agent
                            </button>
                        </div>

                    </div>

                    <div
                        className={`absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-blue-200/50 to-transparent ${
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        } transition-opacity duration-300`}
                    />
                        </div>
                    );
                })}
            </div>

            {/* Floating Agent Detail Modal */}
            {showAgentDetail && selectedAgent && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setShowAgentDetail(false);
                            setSelectedAgent(null);
                            onModalStateChange?.(false);
                        }
                    }}
                >
                    <div 
                        className="bg-gradient-to-br from-blue-100/80 via-blue-50/80 to-gray-200/80 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl w-full h-[85vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex h-full">
                            {/* Left Sidebar */}
                            <div className="w-72 bg-gradient-to-b from-blue-100/40 via-blue-50/40 to-gray-200/40 backdrop-blur-md border-r border-gray-300/20 p-4 flex flex-col">
                                {/* Header with Close Button */}
                                <div className="flex items-center justify-between mb-6">
                                    <button 
                                        onClick={() => {
                                            console.log('Modal closing via back button');
                                            setShowAgentDetail(false);
                                            setSelectedAgent(null);
                                            onModalStateChange?.(false);
                                        }}
                                        className="flex items-center text-gray-600 hover:text-blue-800 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setShowAgentDetail(false);
                                            setSelectedAgent(null);
                                            onModalStateChange?.(false);
                                        }}
                                        className="text-gray-600 hover:text-blue-800 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Integrations Icons */}
                                <div className="flex items-center gap-3 mb-6">
                                    {selectedAgent.integrations && selectedAgent.integrations
                                        .filter(integration => getIntegrationIcon(integration) !== null)
                                        .slice(0, 4)
                                        .map((integration, idx) => {
                                            const iconName = getIntegrationIcon(integration);
                                            return (
                                                <div key={idx} className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center border border-white/30">
                                                    <Icon icon={iconName!} className="w-6 h-6 text-gray-700 opacity-70" />
                                                </div>
                                            );
                                        })}
                                    {selectedAgent.integrations && selectedAgent.integrations.filter(integration => getIntegrationIcon(integration) !== null).length > 4 && (
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center text-gray-700 text-sm font-bold opacity-70 border border-white/30">
                                            +{selectedAgent.integrations.filter(integration => getIntegrationIcon(integration) !== null).length - 4}
                                        </div>
                                    )}
                                </div>

                                {/* Agent Title */}
                                <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
                                    {selectedAgent.title}
                                </h1>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <button 
                                        onClick={handleStartUsingAgent}
                                        disabled={isDeploying}
                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isDeploying ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Deploying...
                                            </>
                                        ) : (
                                            <>
                                                <Zap className="w-4 h-4" />
                                                Start Using Agent
                                            </>
                                        )}
                                    </button>
                                    <button className="w-full bg-white/20 hover:bg-white/30 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors border border-gray-300/30">
                                        View Documentation
                                    </button>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-100/30 via-blue-50/30 to-gray-200/30 backdrop-blur-md">
                                <div className="p-8">
                                    {/* Agent Overview */}
                                    <div className="mb-8">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                                                {selectedAgent.icon}
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-800">{selectedAgent.title}</h2>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                        selectedAgent.status === 'Live' ? 'bg-green-100 text-green-700' :
                                                        selectedAgent.status === 'Updated' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-orange-100 text-orange-700'
                                                    }`}>
                                                        {selectedAgent.status || 'Live'}
                                                    </span>
                                                    {selectedAgent.meta && (
                                                        <span className="text-gray-600 text-sm flex items-center gap-1">
                                                            <Users className="w-4 h-4" />
                                                            {selectedAgent.meta}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 text-lg leading-relaxed">
                                            {selectedAgent.description}
                                        </p>
                                    </div>

                                    {/* Key Features */}
                                    {selectedAgent.tags && selectedAgent.tags.length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                <Zap className="h-5 w-5 text-blue-500" />
                                                Key Features
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {selectedAgent.tags.map((feature, index) => (
                                                    <div key={index} className="bg-white/50 border border-blue-200/50 rounded-xl p-4 flex items-center gap-3">
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                                        <span className="text-gray-700 font-medium">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Integrations */}
                                    {selectedAgent.integrations && selectedAgent.integrations.length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                <Globe className="h-5 w-5 text-green-500" />
                                                Integrations
                                            </h3>
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                                {selectedAgent.integrations.map((integration, index) => {
                                                    const iconName = getIntegrationIcon(integration);
                                                    return (
                                                        <div key={index} className="bg-white/50 border border-green-200/50 rounded-xl p-4 flex flex-col items-center gap-2">
                                                            {iconName ? (
                                                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                                                    <Icon icon={iconName} className="w-5 h-5 text-gray-700" />
                                                                </div>
                                                            ) : (
                                                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                                                    <Settings className="w-4 h-4 text-gray-500" />
                                                                </div>
                                                            )}
                                                            <span className="text-gray-700 text-sm font-medium text-center">{integration}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Usage & Performance */}
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                            <BarChart2 className="h-5 w-5 text-purple-500" />
                                            Performance & Usage
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="bg-white/50 border border-purple-200/50 rounded-xl p-4">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 bg-green-100 rounded-lg">
                                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                                    </div>
                                                    <span className="text-gray-600 font-medium">Status</span>
                                                </div>
                                                <p className="text-gray-800 font-bold text-lg">{selectedAgent.status || 'Live'}</p>
                                            </div>
                                            <div className="bg-white/50 border border-purple-200/50 rounded-xl p-4">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 bg-blue-100 rounded-lg">
                                                        <Users className="h-4 w-4 text-blue-600" />
                                                    </div>
                                                    <span className="text-gray-600 font-medium">Active Users</span>
                                                </div>
                                                <p className="text-gray-800 font-bold text-lg">{selectedAgent.meta || 'Active'}</p>
                                            </div>
                                            <div className="bg-white/50 border border-purple-200/50 rounded-xl p-4">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 bg-orange-100 rounded-lg">
                                                        <Clock className="h-4 w-4 text-orange-600" />
                                                    </div>
                                                    <span className="text-gray-600 font-medium">Deployment</span>
                                                </div>
                                                <p className="text-gray-800 font-bold text-lg">Instant</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Getting Started */}
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                            <Play className="h-5 w-5 text-indigo-500" />
                                            Getting Started
                                        </h3>
                                        <div className="bg-white/50 border border-indigo-200/50 rounded-xl p-6">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                                                    <span className="text-gray-700">Click "Start Using Agent" to deploy</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                                                    <span className="text-gray-700">Configure integrations and settings</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                                                    <span className="text-gray-700">Start automating your workflows</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Agent Configuration Modal */}
            {selectedAgent && (
                <AgentConfigurationModal
                    isOpen={showConfigModal}
                    onClose={() => setShowConfigModal(false)}
                    agentId={selectedAgent.id || ''}
                    agentName={selectedAgent.title}
                    requiredFields={agentService.getAgentConfigurationForm(selectedAgent.id || '')?.requiredFields || []}
                    optionalFields={agentService.getAgentConfigurationForm(selectedAgent.id || '')?.optionalFields || []}
                    onDeploy={handleDeployAgent}
                />
            )}
        </>
    );
}

export { BentoGrid }
