import React from "react";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { useState, useCallback } from "react";

// Error boundary component
class ShaderErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ShaderDemo Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative w-full h-[4000px] overflow-hidden rounded-xl border bg-blue-700 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Shader Animation Temporarily Unavailable</h2>
            <p className="text-blue-200">The interactive animation is loading...</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ShaderDemo() {
  const [activeSalesTab, setActiveSalesTab] = useState("Lead Generation");
  const [activeMarketingTab, setActiveMarketingTab] = useState("Content Creation");
  const [activeSupportTab, setActiveSupportTab] = useState("Live Chat");

  // Memoized tab handlers for better performance
  const handleSalesTab = useCallback((tab: string) => setActiveSalesTab(tab), []);
  const handleMarketingTab = useCallback((tab: string) => setActiveMarketingTab(tab), []);
  const handleSupportTab = useCallback((tab: string) => setActiveSupportTab(tab), []);
  return (
    <ShaderErrorBoundary>
      <div className="relative w-full h-[4000px] overflow-hidden rounded-xl border bg-blue-700 will-change-transform">
        <ShaderAnimation/>
      
      {/* Agent Sections Overlay */}
      <div className="absolute inset-0 z-10">
        {/* Sales Agents Section */}
        <section className="py-24 bg-transparent">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
                <span className="text-white font-medium">Agents for Sales</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Close more deals than ever with AI.</h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">Deploy AI agents that work 24/7 to find, qualify, and convert leads into customers.</p>
              
              {/* Tab Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button 
                  onClick={() => handleSalesTab("Lead Generation")}
                  className={`backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    activeSalesTab === "Lead Generation" 
                      ? "bg-blue-100/70 text-gray-900" 
                      : "bg-blue-50/40 text-gray-700 hover:bg-blue-100/60"
                  }`}
                >
                  Lead Generation
                </button>
                <button 
                  onClick={() => handleSalesTab("Lead Qualification")}
                  className={`backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    activeSalesTab === "Lead Qualification" 
                      ? "bg-white/90 text-gray-900" 
                      : "bg-white/60 text-gray-700 hover:bg-white/80"
                  }`}
                >
                  Lead Qualification
                </button>
                <button 
                  onClick={() => handleSalesTab("Lead Outreach")}
                  className={`backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    activeSalesTab === "Lead Outreach" 
                      ? "bg-white/90 text-gray-900" 
                      : "bg-white/60 text-gray-700 hover:bg-white/80"
                  }`}
                >
                  Lead Outreach
                </button>
              </div>
            </div>

            {/* Big Feature Boxes */}
            <div className="mb-16">
              {/* Dynamic Big Box based on active tab */}
              <div className="bg-blue-50/60 backdrop-blur-sm border border-blue-200/40 rounded-xl p-8 hover:bg-blue-50/70 transition-all duration-300 will-change-transform">
                {activeSalesTab === "Lead Generation" && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white">Lead Generation</h3>
                    </div>
                    <h4 className="text-xl font-semibold text-blue-100 mb-4">AI Prospecting</h4>
                    <p className="text-white mb-6">Find leads across 200+ sources</p>
                    <p className="text-gray-100 mb-6">Use Finstone's 200+ web scrapers to find your perfect leads. Your AI agent scans databases, social platforms, and business directories to identify high-quality prospects that match your ideal customer profile.</p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Try it →
                    </button>
                  </>
                )}
                {activeSalesTab === "Lead Qualification" && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white">Lead Qualification</h3>
                    </div>
                    <h4 className="text-xl font-semibold text-blue-100 mb-4">Smart Scoring</h4>
                    <p className="text-white mb-6">Score and prioritize prospects</p>
                    <p className="text-gray-100 mb-6">Our AI analyzes lead behavior, engagement patterns, and demographic data to automatically score and qualify prospects. Focus on the highest-value leads that are most likely to convert.</p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Try it →
                    </button>
                  </>
                )}
                {activeSalesTab === "Lead Outreach" && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white">Lead Outreach</h3>
                    </div>
                    <h4 className="text-xl font-semibold text-blue-100 mb-4">Personalized Campaigns</h4>
                    <p className="text-gray-600 mb-6">Convert prospects into customers</p>
                    <p className="text-gray-700 mb-6">Create personalized email sequences and LinkedIn outreach campaigns that adapt to each prospect's industry, role, and engagement level. Our AI ensures every message feels human and relevant.</p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Try it →
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Sales Agent Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              {[
                {
                  title: "Lead Generator",
                  description: "500+ leads/day",
                  subtitle: "AI-powered prospecting across 200+ sources with automated lead discovery and qualification",
                  status: "Live",
                  tags: ["#Prospecting", "#Discovery", "#AI"],
                  icon: "🎯"
                },
                {
                  title: "Lead Qualifier",
                  description: "85% accuracy", 
                  subtitle: "Intelligent lead scoring and qualification with custom criteria and real-time insights",
                  status: "Updated",
                  tags: ["#Qualification", "#Scoring"],
                  icon: "📊"
                },
                {
                  title: "Sales Outreach",
                  description: "24/7 active",
                  subtitle: "Personalized email sequences and LinkedIn outreach that convert prospects into customers",
                  status: "Live",
                  tags: ["#Outreach", "#Personalization"],
                  icon: "📧"
                },
                {
                  title: "Sales Analytics",
                  description: "Real-time",
                  subtitle: "AI-powered sales insights, pipeline tracking, and performance analytics for your team",
                  status: "Beta",
                  tags: ["#Analytics", "#Pipeline"],
                  icon: "📈"
                }
              ].map((agent, index) => (
                <div
                  key={index}
                  className="bg-blue-50/60 backdrop-blur-sm border border-blue-200/40 rounded-xl p-4 hover:bg-blue-50/70 transition-all duration-300 hover:scale-105 will-change-transform"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      agent.status === 'Live' ? 'bg-green-100 text-green-800' :
                      agent.status === 'Updated' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{agent.title}</h3>
                  <p className="text-xs font-medium text-blue-100 mb-2">{agent.description}</p>
                  <p className="text-white text-xs mb-3">{agent.subtitle}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {agent.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs bg-gray-100 text-gray-600 px-1 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="w-full text-xs font-medium text-blue-100 hover:text-white transition-colors">
                    Explore →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marketing Agents Section */}
        <section className="py-24 bg-transparent">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
                <span className="text-white font-medium">Agents for Marketing</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Scale your marketing with AI agents</h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">Deploy specialized marketing agents that work around the clock to grow your brand and drive engagement.</p>
              
              {/* Tab Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button 
                  onClick={() => handleMarketingTab("Content Creation")}
                  className={`backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    activeMarketingTab === "Content Creation" 
                      ? "bg-blue-100/70 text-gray-900" 
                      : "bg-blue-50/40 text-gray-700 hover:bg-blue-100/60"
                  }`}
                >
                  Content Creation
                </button>
                <button 
                  onClick={() => handleMarketingTab("Social Media")}
                  className={`backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    activeMarketingTab === "Social Media" 
                      ? "bg-white/90 text-gray-900" 
                      : "bg-white/60 text-gray-700 hover:bg-white/80"
                  }`}
                >
                  Social Media
                </button>
                <button 
                  onClick={() => handleMarketingTab("Email Marketing")}
                  className={`backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    activeMarketingTab === "Email Marketing" 
                      ? "bg-white/90 text-gray-900" 
                      : "bg-white/60 text-gray-700 hover:bg-white/80"
                  }`}
                >
                  Email Marketing
                </button>
              </div>
            </div>

            {/* Big Feature Boxes */}
            <div className="mb-16">
              {/* Dynamic Big Box based on active tab */}
              <div className="bg-blue-50/60 backdrop-blur-sm border border-blue-200/40 rounded-xl p-8 hover:bg-blue-50/70 transition-all duration-300 will-change-transform">
                {activeMarketingTab === "Content Creation" && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white">AI Content</h3>
                    </div>
                    <h4 className="text-xl font-semibold text-blue-100 mb-4">Create engaging content at scale</h4>
                    <p className="text-gray-600 mb-6">Content Creation</p>
                    <p className="text-gray-700 mb-6">Generate blog posts, social media content, and marketing copy that resonates with your audience. Our AI agents understand your brand voice and create compelling content that drives engagement and conversions.</p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Start creating →
                    </button>
                  </>
                )}
                {activeMarketingTab === "Social Media" && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white">Social Media</h3>
                    </div>
                    <h4 className="text-xl font-semibold text-blue-100 mb-4">Automated social management</h4>
                    <p className="text-gray-600 mb-6">Social Media</p>
                    <p className="text-gray-700 mb-6">Manage all your social media accounts with AI-powered automation. Schedule posts, engage with followers, and grow your community across platforms while maintaining authentic brand voice.</p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Start managing →
                    </button>
                  </>
                )}
                {activeMarketingTab === "Email Marketing" && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white">Email Marketing</h3>
                    </div>
                    <h4 className="text-xl font-semibold text-blue-100 mb-4">Personalized email campaigns</h4>
                    <p className="text-gray-600 mb-6">Email Marketing</p>
                    <p className="text-gray-700 mb-6">Create personalized email sequences that adapt to subscriber behavior. Our AI optimizes send times, subject lines, and content to maximize open rates and conversions.</p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Start campaigns →
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Marketing Agent Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              {[
                {
                  title: "Content Writer",
                  description: "50+ posts/week",
                  subtitle: "AI-powered content creation for blogs, social media, and marketing materials with brand voice consistency",
                  status: "Live",
                  tags: ["#Content", "#Writing", "#AI"],
                  icon: "✍️"
                },
                {
                  title: "Social Manager",
                  description: "24/7 active",
                  subtitle: "Automated social media posting, engagement, and community management across all platforms",
                  status: "Live",
                  tags: ["#Social", "#Management"],
                  icon: "📱"
                },
                {
                  title: "Email Campaigner",
                  description: "95% deliverability",
                  subtitle: "Personalized email sequences, A/B testing, and automated nurture campaigns for maximum ROI",
                  status: "Updated",
                  tags: ["#Email", "#Campaigns"],
                  icon: "📬"
                },
                {
                  title: "Marketing Analytics",
                  description: "Real-time",
                  subtitle: "Comprehensive marketing performance tracking, ROI analysis, and campaign optimization insights",
                  status: "Beta",
                  tags: ["#Analytics", "#ROI"],
                  icon: "📊"
                }
              ].map((agent, index) => (
                <div
                  key={index}
                  className="bg-blue-50/60 backdrop-blur-sm border border-blue-200/40 rounded-xl p-4 hover:bg-blue-50/70 transition-all duration-300 hover:scale-105 will-change-transform"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      agent.status === 'Live' ? 'bg-green-100 text-green-800' :
                      agent.status === 'Updated' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{agent.title}</h3>
                  <p className="text-xs font-medium text-blue-100 mb-2">{agent.description}</p>
                  <p className="text-white text-xs mb-3">{agent.subtitle}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {agent.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs bg-gray-100 text-gray-600 px-1 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="w-full text-xs font-medium text-blue-100 hover:text-white transition-colors">
                    Explore →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Agents Section */}
        <section className="py-24 bg-transparent">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
                <span className="text-white font-medium">Agents for Support</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Deliver exceptional customer service with AI</h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">Deploy intelligent support agents that provide instant, accurate responses and resolve issues 24/7.</p>
              
              {/* Tab Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button 
                  onClick={() => handleSupportTab("Live Chat")}
                  className={`backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    activeSupportTab === "Live Chat" 
                      ? "bg-blue-100/70 text-gray-900" 
                      : "bg-blue-50/40 text-gray-700 hover:bg-blue-100/60"
                  }`}
                >
                  Live Chat
                </button>
                <button 
                  onClick={() => handleSupportTab("Ticket Management")}
                  className={`backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    activeSupportTab === "Ticket Management" 
                      ? "bg-white/90 text-gray-900" 
                      : "bg-white/60 text-gray-700 hover:bg-white/80"
                  }`}
                >
                  Ticket Management
                </button>
                <button 
                  onClick={() => handleSupportTab("Knowledge Base")}
                  className={`backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    activeSupportTab === "Knowledge Base" 
                      ? "bg-white/90 text-gray-900" 
                      : "bg-white/60 text-gray-700 hover:bg-white/80"
                  }`}
                >
                  Knowledge Base
                </button>
              </div>
            </div>

            {/* Big Feature Boxes */}
            <div className="mb-16">
              {/* Dynamic Big Box based on active tab */}
              <div className="bg-blue-50/60 backdrop-blur-sm border border-blue-200/40 rounded-xl p-8 hover:bg-blue-50/70 transition-all duration-300 will-change-transform">
                {activeSupportTab === "Live Chat" && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white">AI Chat Support</h3>
                    </div>
                    <h4 className="text-xl font-semibold text-blue-100 mb-4">Instant customer support</h4>
                    <p className="text-gray-600 mb-6">Live Chat</p>
                    <p className="text-gray-700 mb-6">Provide real-time assistance through intelligent chat agents that understand context, answer questions, and escalate complex issues to human agents when needed.</p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Start chatting →
                    </button>
                  </>
                )}
                {activeSupportTab === "Ticket Management" && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white">Ticket Management</h3>
                    </div>
                    <h4 className="text-xl font-semibold text-blue-100 mb-4">Automated ticket resolution</h4>
                    <p className="text-gray-600 mb-6">Ticket Management</p>
                    <p className="text-gray-700 mb-6">Intelligent ticket management that categorizes, prioritizes, and resolves common issues automatically. Our AI learns from past interactions to provide faster, more accurate solutions.</p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Start managing →
                    </button>
                  </>
                )}
                {activeSupportTab === "Knowledge Base" && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white">Knowledge Base</h3>
                    </div>
                    <h4 className="text-xl font-semibold text-blue-100 mb-4">Self-service support</h4>
                    <p className="text-gray-600 mb-6">Knowledge Base</p>
                    <p className="text-gray-700 mb-6">Maintains and updates knowledge bases, learns from interactions, and provides accurate self-service support. Customers get instant answers while reducing support workload.</p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Start building →
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Support Agent Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  title: "Chat Assistant",
                  description: "24/7 available",
                  subtitle: "AI-powered live chat that provides instant responses, understands context, and escalates complex issues to human agents",
                  status: "Live",
                  tags: ["#Chat", "#Support", "#AI"],
                  icon: "💬"
                },
                {
                  title: "Ticket Resolver",
                  description: "85% auto-resolve",
                  subtitle: "Intelligent ticket management that categorizes, prioritizes, and resolves common issues automatically",
                  status: "Live",
                  tags: ["#Tickets", "#Automation"],
                  icon: "🎫"
                },
                {
                  title: "Knowledge Manager",
                  description: "Self-service",
                  subtitle: "Maintains and updates knowledge bases, learns from interactions, and provides accurate self-service support",
                  status: "Updated",
                  tags: ["#Knowledge", "#Learning"],
                  icon: "📚"
                },
                {
                  title: "Support Analytics",
                  description: "Real-time",
                  subtitle: "Comprehensive support metrics, customer satisfaction tracking, and performance optimization insights",
                  status: "Beta",
                  tags: ["#Analytics", "#Metrics"],
                  icon: "📊"
                }
              ].map((agent, index) => (
                <div
                  key={index}
                  className="bg-blue-50/60 backdrop-blur-sm border border-blue-200/40 rounded-xl p-4 hover:bg-blue-50/70 transition-all duration-300 hover:scale-105 will-change-transform"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      agent.status === 'Live' ? 'bg-green-100 text-green-800' :
                      agent.status === 'Updated' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{agent.title}</h3>
                  <p className="text-xs font-medium text-blue-100 mb-2">{agent.description}</p>
                  <p className="text-white text-xs mb-3">{agent.subtitle}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {agent.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs bg-gray-100 text-gray-600 px-1 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="w-full text-xs font-medium text-blue-100 hover:text-white transition-colors">
                    Explore →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      </div>
    </ShaderErrorBoundary>
  );
}
