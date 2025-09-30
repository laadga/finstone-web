"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Share2, Link, Twitter, Linkedin, Calendar, Mail, MessageSquare, Users, BarChart3, CheckCircle, Zap, Settings, Bot, Target, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AgentDetailProps {
  agent: {
    id: string;
    name: string;
    description: string;
    category: string;
    lastUpdated: string;
    createdBy: {
      name: string;
      avatar: string;
      verified: boolean;
    };
    workflow: {
      title: string;
      description: string;
      steps: Array<{
        id: number;
        title: string;
        subtitle: string;
        icon: React.ReactNode;
        details: string[];
      }>;
    };
    tools: string[];
    features: string[];
    useCases: string[];
    integrations: string[];
  };
}

export default function AgentDetailPage({ agent }: AgentDetailProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const router = useRouter();

  const getStepIcon = (stepId: number) => {
    const icons = [Calendar, Mail, MessageSquare, Users, Bot, Target];
    const IconComponent = icons[stepId % icons.length];
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          router.back();
        }
      }}
    >
      <div 
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="w-80 bg-white/5 backdrop-blur-sm border-r border-white/10 p-6 flex flex-col">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between mb-6">
            <a href="/saas/marketplace-new" className="flex items-center text-gray-300 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </a>
            <button 
              onClick={() => router.back()}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Integrations Icons */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center text-white text-xs font-bold">
              +4
            </div>
          </div>

          {/* Agent Title */}
          <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
            {agent.name}
          </h1>

          {/* Use for Free Button */}
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors mb-8">
            Use for free
          </button>

          {/* Created By */}
          <div className="mt-auto">
            <p className="text-gray-400 text-sm mb-3">CREATED BY</p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">{agent.createdBy.name.charAt(0)}</span>
              </div>
              <div>
                <div className="flex items-center">
                  <span className="text-white font-medium">{agent.createdBy.name}</span>
                  {agent.createdBy.verified && (
                    <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-white/5 backdrop-blur-sm">
          <div className="p-8">
            {/* Header Info */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div>
                <p className="text-gray-400 text-sm mb-2">LAST UPDATE</p>
                <p className="text-white">{agent.lastUpdated}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">CATEGORIES</p>
                <div className="flex gap-2">
                  <span className="bg-purple-700 text-purple-200 px-3 py-1 rounded-full text-sm">
                    {agent.category}
                  </span>
                  <span className="bg-blue-700 text-blue-200 px-3 py-1 rounded-full text-sm">
                    AI Assistant
                  </span>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">SHARE</p>
                <div className="flex gap-3">
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Link className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-gray-300 text-lg leading-relaxed">
                {agent.description}
              </p>
            </div>

            {/* How It Works Section */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <Settings className="w-6 h-6 text-orange-500 mr-3" />
                <h2 className="text-2xl font-bold text-white">How It Works [Step-by-Step]:</h2>
              </div>

              <div className="space-y-6">
                {agent.workflow.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={cn(
                      "border border-gray-700 rounded-lg p-6 transition-all duration-300 cursor-pointer",
                      activeStep === step.id 
                        ? "border-orange-500 bg-gray-800/50" 
                        : "hover:border-gray-600 hover:bg-gray-800/30"
                    )}
                    onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        {getStepIcon(step.id)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {step.id}. {step.title}
                        </h3>
                        <p className="text-gray-400 mb-4">{step.subtitle}</p>
                        
                        <div className={cn(
                          "transition-all duration-300 overflow-hidden",
                          activeStep === step.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        )}>
                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <ul className="space-y-2">
                              {step.details.map((detail, idx) => (
                                <li key={idx} className="text-gray-300 text-sm flex items-start">
                                  <span className="text-orange-500 mr-2 mt-1">•</span>
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools Used */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Tools Used:</h3>
              <div className="grid grid-cols-2 gap-4">
                {agent.tools.map((tool, index) => (
                  <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <p className="text-gray-300">{tool}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Key Features:</h3>
              <div className="grid grid-cols-2 gap-4">
                {agent.features.map((feature, index) => (
                  <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <p className="text-gray-300">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ideal Use Cases */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Ideal Use Cases:</h3>
              <div className="grid grid-cols-2 gap-4">
                {agent.useCases.map((useCase, index) => (
                  <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <p className="text-gray-300">{useCase}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
