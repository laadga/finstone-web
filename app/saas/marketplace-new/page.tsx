"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ActionSearchBar } from "@/components/ui/action-search-bar";
import { AuroraHero } from "@/components/ui/futurastic-hero-section";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { PersonalLanding } from "@/components/ui/personal-landing";
import { AcademySection } from "@/components/ui/academy-section";
import { Search, Plus, ArrowRight, BarChart2, Globe, Video, PlaneTakeoff, AudioLines, Users, Mail, Phone, MessageSquare, Menu, X } from "lucide-react";
import Link from 'next/link';

interface Agent {
  name: string;
  description: string;
  integrations: string[];
  features: string[];
  rating: number;
  users: number;
  efficiency: number;
  subDepartment?: string;
}

interface SubDepartment {
  name: string;
  color: string;
  agents: Agent[];
}

interface AgentCategory {
  name: string;
  description: string;
  color: string;
  icon: string;
  avatarSrc?: string;
  agents: Agent[];
  subDepartments?: SubDepartment[];
}

const agentCategories: AgentCategory[] = [
  {
    name: "AI",
    description: "Comprehensive AI agents and automation tools based on n8n.io workflows",
    color: "from-indigo-500 to-indigo-600",
    icon: "🤖",
    avatarSrc: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=128&h=128&fit=crop&crop=face",
    agents: [],
    subDepartments: [
      {
        name: "Core AI Assistants",
        color: "from-indigo-500 to-indigo-600",
        agents: [
          {
            name: "Personal AI Assistant",
            description: "Personal AI assistant that handles voice and text interactions through Telegram with advanced automation capabilities",
            integrations: ["Telegram", "Settings", "Edit Tools"],
            features: ["Voice interactions", "Text messaging", "Personal assistance", "Telegram integration"],
            rating: 4.8,
            users: 1250,
            efficiency: 92,
            subDepartment: "Core AI Assistants"
          },
          {
            name: "AI Personal Assistant",
            description: "Comprehensive AI personal assistant that handles multiple tasks and integrations for productivity",
            integrations: ["Google Sheets", "Slack", "Mouse", "Multiple Tools"],
            features: ["Personal assistance", "Multi-platform integration", "Productivity tools", "Task management"],
            rating: 4.7,
            users: 1400,
            efficiency: 88,
            subDepartment: "Core AI Assistants"
          },
          {
            name: "Document Search Bot",
            description: "Retrieval Augmented Generation chatbot that searches and analyzes company documents from Google Drive using Gemini AI",
            integrations: ["Google Drive", "Gemini AI", "Document Processing"],
            features: ["Document search", "RAG technology", "Google Drive integration", "Gemini AI"],
            rating: 4.8,
            users: 1800,
            efficiency: 91,
            subDepartment: "Core AI Assistants"
          },
          {
            name: "Smart Email Organizer",
            description: "Automated email organization system that intelligently labels Gmail messages using OpenAI and Gmail API",
            integrations: ["Gmail API", "OpenAI", "Email Processing"],
            features: ["Automatic labeling", "Email organization", "OpenAI integration", "Gmail API"],
            rating: 4.5,
            users: 1400,
            efficiency: 85,
            subDepartment: "Core AI Assistants"
          }
        ]
      },
      {
        name: "Voice & Communication",
        color: "from-blue-500 to-blue-600",
        agents: [
          {
            name: "Voice Booking Assistant",
            description: "Voice-powered appointment booking system that uses ElevenLabs AI for voice interactions and Cal.com for scheduling",
            integrations: ["ElevenLabs AI", "Cal.com", "Voice Processing"],
            features: ["Voice booking", "Appointment scheduling", "ElevenLabs integration", "Cal.com sync"],
            rating: 4.9,
            users: 750,
            efficiency: 94,
            subDepartment: "Voice & Communication"
          },
          {
            name: "WhatsApp Multi-Modal Bot",
            description: "Multi-modal WhatsApp chatbot supporting text, voice, images, and PDFs with RAG capabilities",
            integrations: ["WhatsApp", "RAG", "Multi-modal AI", "Document Processing"],
            features: ["Multi-modal support", "WhatsApp integration", "RAG technology", "File processing"],
            rating: 4.8,
            users: 1500,
            efficiency: 92,
            subDepartment: "Voice & Communication"
          },
          {
            name: "Telegram Support Bot",
            description: "Multi-modal Telegram support bot using GPT-4 and Supabase for RAG-powered customer assistance",
            integrations: ["Telegram", "GPT-4", "Supabase", "RAG"],
            features: ["Multi-modal support", "Telegram integration", "Supabase RAG", "GPT-4 powered"],
            rating: 4.9,
            users: 1700,
            efficiency: 93,
            subDepartment: "Voice & Communication"
          },
          {
            name: "Customer Support Bot",
            description: "Customer support bot for WhatsApp that uses Google Docs as knowledge base with Gemini AI processing",
            integrations: ["WhatsApp", "Google Docs", "Gemini AI", "Customer Support"],
            features: ["Customer support", "WhatsApp integration", "Knowledge base", "Gemini AI"],
            rating: 4.7,
            users: 1300,
            efficiency: 89,
            subDepartment: "Voice & Communication"
          }
        ]
      },
      {
        name: "Research & Analysis",
        color: "from-green-500 to-green-600",
        agents: [
          {
            name: "Research Assistant",
            description: "Research-focused AI assistant accessible via Telegram using GPT-4o mini, DeepSeek R1, and SerpAPI",
            integrations: ["Telegram", "GPT-4o mini", "DeepSeek R1", "SerpAPI"],
            features: ["Research assistance", "Telegram access", "Multiple AI models", "Search integration"],
            rating: 4.6,
            users: 900,
            efficiency: 87,
            subDepartment: "Research & Analysis"
          },
          {
            name: "Stock Analysis Bot",
            description: "Advanced stock analysis assistant that provides insights through Telegram using Claude and GPT-4O Vision",
            integrations: ["Telegram", "Claude AI", "GPT-4O Vision", "Stock APIs"],
            features: ["Stock analysis", "Telegram integration", "Vision capabilities", "AI insights"],
            rating: 4.8,
            users: 1200,
            efficiency: 90,
            subDepartment: "Research & Analysis"
          },
          {
            name: "SEO Tracker",
            description: "SEO keyword tracking system that uses Bright Data MCP and GPT-4o for intelligent analysis and reporting",
            integrations: ["Bright Data MCP", "GPT-4o", "SEO Tools", "Google Docs"],
            features: ["SEO tracking", "Keyword analysis", "AI insights", "Automated reporting"],
            rating: 4.7,
            users: 1200,
            efficiency: 88,
            subDepartment: "Research & Analysis"
          }
        ]
      },
      {
        name: "Content Creation",
        color: "from-purple-500 to-purple-600",
        agents: [
          {
            name: "Video Creator",
            description: "Automated video generation and social media posting system using Veo3 AI and Blotato platform",
            integrations: ["Veo3 AI", "Blotato", "Social Media APIs", "Video Generation"],
            features: ["AI video generation", "Auto-posting", "Social media integration", "Veo3 AI"],
            rating: 4.8,
            users: 900,
            efficiency: 91,
            subDepartment: "Content Creation"
          },
          {
            name: "Image Generator",
            description: "Free AI image generation system using n8n automation workflows with Gemini and ChatGPT integration",
            integrations: ["n8n", "Gemini", "ChatGPT", "Image Generation APIs"],
            features: ["Image generation", "n8n automation", "Multi-AI support", "Free access"],
            rating: 4.6,
            users: 1800,
            efficiency: 85,
            subDepartment: "Content Creation"
          },
          {
            name: "LinkedIn Content Creator",
            description: "LinkedIn content automation system using GPT-4 for text and DALL-E for images with scheduled posting",
            integrations: ["LinkedIn", "GPT-4", "DALL-E", "Scheduling Tools"],
            features: ["Content creation", "LinkedIn automation", "Image generation", "Scheduled posting"],
            rating: 4.8,
            users: 1100,
            efficiency: 89,
            subDepartment: "Content Creation"
          }
        ]
      },
      {
        name: "Automation & Management",
        color: "from-orange-500 to-orange-600",
        agents: [
          {
            name: "Timesheet Generator",
            description: "Automated timesheet generation system that integrates Gmail, Calendar, and GitHub data into Google Sheets",
            integrations: ["Gmail", "Calendar", "GitHub", "Google Sheets"],
            features: ["Timesheet automation", "Multi-platform integration", "Data synchronization", "Google Sheets output"],
            rating: 4.8,
            users: 1400,
            efficiency: 90,
            subDepartment: "Automation & Management"
          },
          {
            name: "Email Manager",
            description: "Intelligent Gmail email management system with AI-powered organization and response capabilities",
            integrations: ["Gmail", "AI Processing", "Email Management"],
            features: ["Email organization", "AI management", "Gmail integration", "Automated responses"],
            rating: 4.6,
            users: 1500,
            efficiency: 85,
            subDepartment: "Automation & Management"
          }
        ]
      }
    ]
  },
  {
    name: "Sales",
    description: "AI-powered sales automation and lead generation tools",
    color: "from-blue-500 to-blue-600",
    icon: "💼",
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face",
    agents: [],
    subDepartments: [
      {
        name: "Core Sales Agents",
        color: "from-blue-500 to-blue-600",
        agents: [
          {
            name: "Sales Call Prep",
            description: "Close more deals with detailed meeting briefings and prospect research",
            integrations: ["Calendar", "CRM", "Research Tools"],
            features: ["Meeting Briefings", "Prospect Research", "Call Preparation"],
            rating: 4.8,
            users: 1250,
            efficiency: 92,
            subDepartment: "Core Sales Agents"
          },
          {
            name: "Lead Generator",
            description: "Find and organize leads instantly from multiple sources",
            integrations: ["HubSpot", "Salesforce", "LinkedIn"],
            features: ["Multi-source Leads", "Lead Organization", "CRM Integration"],
            rating: 4.7,
            users: 1800,
            efficiency: 89,
            subDepartment: "Core Sales Agents"
          },
          {
            name: "Lead Outreacher",
            description: "Automated sales outreach and lead engagement across channels",
            integrations: ["Email", "LinkedIn", "CRM"],
            features: ["Multi-channel Outreach", "Automated Follow-up", "Engagement Tracking"],
            rating: 4.6,
            users: 950,
            efficiency: 87,
            subDepartment: "Core Sales Agents"
          },
          {
            name: "Sales Coach",
            description: "Real-time call coaching and deal guidance for your team",
            integrations: ["Call Recording", "CRM", "Analytics"],
            features: ["Real-time Coaching", "Deal Guidance", "Performance Insights"],
            rating: 4.5,
            users: 1100,
            efficiency: 85,
            subDepartment: "Core Sales Agents"
          },
          {
            name: "Proposal Drafter",
            description: "Create professional proposals in minutes with AI assistance",
            integrations: ["CRM", "Templates", "Document Tools"],
            features: ["AI Writing", "Template Library", "Custom Branding"],
            rating: 4.9,
            users: 890,
            efficiency: 88,
            subDepartment: "Core Sales Agents"
          },
          {
            name: "Meeting Recorder",
            description: "Take notes during sales calls and automatically update your CRM",
            integrations: ["CRM", "Calendar", "Note-taking"],
            features: ["Auto Note-taking", "CRM Updates", "Action Items"],
            rating: 4.7,
            users: 1200,
            efficiency: 86,
            subDepartment: "Core Sales Agents"
          },
          {
            name: "Lead Qualifier",
            description: "Qualify leads automatically and alert your team on Slack",
            integrations: ["Slack", "CRM", "Lead Scoring"],
            features: ["Auto Qualification", "Team Alerts", "Lead Scoring"],
            rating: 4.6,
            users: 800,
            efficiency: 84,
            subDepartment: "Core Sales Agents"
          }
        ]
      },
      {
        name: "Advanced Sales Templates",
        color: "from-indigo-500 to-indigo-600",
        agents: [
          {
            name: "News Scraper",
            description: "Research prospects and gather recent news to personalize sales conversations",
            integrations: ["News APIs", "CRM", "Research Tools"],
            features: ["News Research", "Prospect Insights", "Personalization"],
            rating: 4.6,
            users: 950,
            efficiency: 86,
            subDepartment: "Advanced Sales Templates"
          },
          {
            name: "Salesforce Sync",
            description: "Sync lead data from Google Sheets directly into Salesforce accounts",
            integrations: ["Salesforce", "Google Sheets", "Data Sync"],
            features: ["Data Synchronization", "Lead Import", "Account Creation"],
            rating: 4.7,
            users: 750,
            efficiency: 88,
            subDepartment: "Advanced Sales Templates"
          },
          {
            name: "Maps Lead Generator",
            description: "Find local businesses and extract contact information from Google Maps",
            integrations: ["Google Maps", "Data Extraction", "CRM"],
            features: ["Local Business Search", "Contact Extraction", "CRM Import"],
            rating: 4.5,
            users: 1100,
            efficiency: 85,
            subDepartment: "Advanced Sales Templates"
          },
          {
            name: "Company Enrichment",
            description: "Analyze company websites with AI to extract key insights and enrich lead data",
            integrations: ["Web Scraping", "AI Analysis", "CRM"],
            features: ["Website Analysis", "Data Enrichment", "Lead Insights"],
            rating: 4.4,
            users: 600,
            efficiency: 83,
            subDepartment: "Advanced Sales Templates"
          },
          {
            name: "Email Campaign Sender",
            description: "Send personalized bulk emails and automatically follow up with non-responders",
            integrations: ["Email Platform", "CRM", "Automation"],
            features: ["Bulk Email", "Personalization", "Auto Follow-up"],
            rating: 4.6,
            users: 950,
            efficiency: 86,
            subDepartment: "Advanced Sales Templates"
          }
        ]
      },
      {
        name: "CRM Automation",
        color: "from-cyan-500 to-cyan-600",
        agents: [
          {
            name: "Customer Onboarding",
            description: "Automate customer onboarding with email sequences and team alerts in HubSpot",
            integrations: ["HubSpot", "Email", "Team Alerts"],
            features: ["Onboarding Sequences", "Team Notifications", "Progress Tracking"],
            rating: 4.7,
            users: 750,
            efficiency: 88,
            subDepartment: "CRM Automation"
          },
          {
            name: "Call Summarizer",
            description: "Automatically summarize sales calls and notify teams via Slack and HubSpot",
            integrations: ["Slack", "HubSpot", "Call Recording"],
            features: ["Auto Summaries", "Team Notifications", "CRM Updates"],
            rating: 4.5,
            users: 1100,
            efficiency: 85,
            subDepartment: "CRM Automation"
          },
          {
            name: "Quote Generator",
            description: "Automatically generate and send price quotes using Gmail and Google Sheets",
            integrations: ["Gmail", "Google Sheets", "Pricing Tools"],
            features: ["Auto Quote Generation", "Email Delivery", "Price Calculation"],
            rating: 4.4,
            users: 600,
            efficiency: 83,
            subDepartment: "CRM Automation"
          }
        ]
      },
      {
        name: "Lead Generation",
        color: "from-green-500 to-green-600",
        agents: [
          {
            name: "Maps Email Scraper",
            description: "Extract business emails from Google Maps and export to Google Sheets",
            integrations: ["Google Maps", "Google Sheets", "Email Extraction"],
            features: ["Email Extraction", "Data Export", "Business Discovery"],
            rating: 4.6,
            users: 950,
            efficiency: 86,
            subDepartment: "Lead Generation"
          },
          {
            name: "LinkedIn Lead Extractor",
            description: "Extract LinkedIn comments and convert them into qualified leads",
            integrations: ["LinkedIn", "Lead Qualification", "CRM"],
            features: ["Comment Extraction", "Lead Qualification", "CRM Integration"],
            rating: 4.7,
            users: 750,
            efficiency: 88,
            subDepartment: "Lead Generation"
          },
          {
            name: "B2B Lead Qualifier",
            description: "Qualify and reach out to B2B leads using AI and automation",
            integrations: ["AI Qualification", "Outreach Tools", "CRM"],
            features: ["AI Qualification", "Automated Outreach", "B2B Focus"],
            rating: 4.5,
            users: 1100,
            efficiency: 85,
            subDepartment: "Lead Generation"
          }
        ]
      },
      {
        name: "Lead Nurturing",
        color: "from-purple-500 to-purple-600",
        agents: [
          {
            name: "Personalized Email Generator",
            description: "Create personalized sales emails using LinkedIn data and AI",
            integrations: ["LinkedIn", "AI Writing", "Email Platform"],
            features: ["Personalization", "AI Writing", "LinkedIn Data"],
            rating: 4.4,
            users: 600,
            efficiency: 83,
            subDepartment: "Lead Nurturing"
          },
          {
            name: "Lead Researcher",
            description: "Research leads and generate personalized emails with AI",
            integrations: ["Research Tools", "AI Analysis", "Email Generation"],
            features: ["Lead Research", "AI Analysis", "Email Personalization"],
            rating: 4.6,
            users: 950,
            efficiency: 86,
            subDepartment: "Lead Nurturing"
          },
          {
            name: "WhatsApp Proposal Generator",
            description: "Generate WhatsApp proposals automatically from voice or text",
            integrations: ["WhatsApp", "Voice Processing", "Proposal Tools"],
            features: ["Voice Processing", "Auto Proposals", "WhatsApp Integration"],
            rating: 4.7,
            users: 750,
            efficiency: 88,
            subDepartment: "Lead Nurturing"
          },
          {
            name: "LinkedIn Response Generator",
            description: "Generate personalized LinkedIn responses with AI and Notion routing",
            integrations: ["LinkedIn", "AI Writing", "Notion"],
            features: ["Response Generation", "AI Personalization", "Notion Integration"],
            rating: 4.5,
            users: 1100,
            efficiency: 85,
            subDepartment: "Lead Nurturing"
          }
        ]
      }
    ]
  },
  {
    name: "IT Ops",
    description: "IT operations and infrastructure automation",
    color: "from-red-500 to-red-600",
    icon: "⚙️",
    avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face",
    agents: [],
    subDepartments: [
      {
        name: "DevOps & Monitoring",
        color: "from-red-500 to-red-600",
        agents: [
          {
            name: "Website Monitoring with Notifications",
            description: "Multiple websites monitoring with notifications including phone calls",
            integrations: ["Monitoring APIs", "Phone Systems", "Alert Management"],
            features: ["Multi-site Monitoring", "Phone Call Alerts", "Downtime Detection"],
            rating: 4.6,
            users: 1200,
            efficiency: 88,
            subDepartment: "DevOps & Monitoring"
          },
          {
            name: "n8n Instance Remote Control",
            description: "Control your n8n instance remotely with Telegram bot commands",
            integrations: ["Telegram", "n8n API", "Bot Commands"],
            features: ["Remote Control", "Telegram Integration", "Instance Management"],
            rating: 4.5,
            users: 1400,
            efficiency: 86,
            subDepartment: "DevOps & Monitoring"
          },
          {
            name: "URL Downtime Monitoring",
            description: "Automatic monitoring of multiple URLs with downtime alerts",
            integrations: ["URL Monitoring", "Alert Systems", "Notification APIs"],
            features: ["URL Monitoring", "Downtime Alerts", "Multi-URL Support"],
            rating: 4.7,
            users: 900,
            efficiency: 89,
            subDepartment: "DevOps & Monitoring"
          },
          {
            name: "Workflow Error Monitoring",
            description: "Monitor n8n workflow errors with Telegram alerts (multi-language setup)",
            integrations: ["n8n", "Telegram", "Error Tracking"],
            features: ["Error Monitoring", "Telegram Alerts", "Multi-language Support"],
            rating: 4.4,
            users: 750,
            efficiency: 87,
            subDepartment: "DevOps & Monitoring"
          },
          {
            name: "Daily Workflow Backups",
            description: "Daily workflow backups to GitHub with Slack notifications",
            integrations: ["GitHub", "Slack", "Backup Systems"],
            features: ["Daily Backups", "GitHub Integration", "Slack Notifications"],
            rating: 4.6,
            users: 1100,
            efficiency: 85,
            subDepartment: "DevOps & Monitoring"
          }
        ]
      },
      {
        name: "Security Operations",
        color: "from-orange-500 to-orange-600",
        agents: [
          {
            name: "SSL Certificate Monitoring",
            description: "Comprehensive SSL certificate monitoring with Discord alerts and Notion integration",
            integrations: ["SSL APIs", "Discord", "Notion"],
            features: ["SSL Monitoring", "Discord Alerts", "Notion Integration"],
            rating: 4.7,
            users: 900,
            efficiency: 89,
            subDepartment: "Security Operations"
          },
          {
            name: "Website Scam Risk Detector",
            description: "Website scam risk detection with GPT-4o and SerpAPI",
            integrations: ["GPT-4o", "SerpAPI", "Risk Analysis"],
            features: ["Scam Detection", "AI Analysis", "Risk Assessment"],
            rating: 4.6,
            users: 1200,
            efficiency: 88,
            subDepartment: "Security Operations"
          },
          {
            name: "URL Phishing & Threat Analysis",
            description: "Automated URL phishing & threat analysis with NixGuard AI",
            integrations: ["NixGuard AI", "Threat Analysis", "URL Scanning"],
            features: ["Phishing Detection", "Threat Analysis", "AI-powered Scanning"],
            rating: 4.5,
            users: 800,
            efficiency: 87,
            subDepartment: "Security Operations"
          },
          {
            name: "Email Header Analysis",
            description: "Analyze email headers for IP reputation and spoofing detection - Gmail",
            integrations: ["Gmail API", "Email Analysis", "IP Reputation"],
            features: ["Header Analysis", "IP Reputation", "Spoofing Detection"],
            rating: 4.4,
            users: 600,
            efficiency: 85,
            subDepartment: "Security Operations"
          }
        ]
      },
      {
        name: "Engineering & Development",
        color: "from-cyan-500 to-cyan-600",
        agents: [
          {
            name: "Pull Request Reviewer",
            description: "Reviews your code reviews according to any guide",
            integrations: ["Git Platforms", "Code Review Tools", "CI/CD"],
            features: ["Code Review", "Guide Compliance", "Automated Review"],
            rating: 4.6,
            users: 1100,
            efficiency: 85,
            subDepartment: "Engineering & Development"
          },
          {
            name: "QA Engineer",
            description: "Automated software testing and debugging",
            integrations: ["Testing Frameworks", "Debugging Tools", "CI/CD"],
            features: ["Automated Testing", "Debugging", "Quality Assurance"],
            rating: 4.5,
            users: 800,
            efficiency: 87,
            subDepartment: "Engineering & Development"
          },
          {
            name: "Code Q/A Assistant",
            description: "Get expert coding answers instantly",
            integrations: ["AI Models", "Code Analysis", "Knowledge Base"],
            features: ["Instant Answers", "Expert Knowledge", "Code Analysis"],
            rating: 4.7,
            users: 1200,
            efficiency: 89,
            subDepartment: "Engineering & Development"
          },
          {
            name: "Bug Reports & Resolution Agent",
            description: "Debug smarter, resolve issues faster",
            integrations: ["Bug Tracking", "Debugging Tools", "Resolution Systems"],
            features: ["Smart Debugging", "Issue Resolution", "Bug Tracking"],
            rating: 4.4,
            users: 600,
            efficiency: 86,
            subDepartment: "Engineering & Development"
          }
        ]
      },
      {
        name: "Data & Integration",
        color: "from-purple-500 to-purple-600",
        agents: [
          {
            name: "Web Scraping with AI",
            description: "Scrape any web page into structured JSON data with ScrapeNinja and AI",
            integrations: ["ScrapeNinja", "AI Processing", "Data Transformation"],
            features: ["Web Scraping", "AI Processing", "Structured Data"],
            rating: 4.6,
            users: 1000,
            efficiency: 88,
            subDepartment: "Data & Integration"
          },
          {
            name: "MySQL to Google Sheets Import",
            description: "Import data from MySQL into Google Sheets",
            integrations: ["MySQL", "Google Sheets", "Data Import"],
            features: ["Database Import", "Sheet Integration", "Data Synchronization"],
            rating: 4.5,
            users: 750,
            efficiency: 87,
            subDepartment: "Data & Integration"
          },
          {
            name: "GitLab Merge Request Review",
            description: "GitLab merge request review & risk analysis with Claude/GPT AI",
            integrations: ["GitLab", "Claude AI", "GPT AI", "Risk Analysis"],
            features: ["Merge Request Review", "AI Analysis", "Risk Assessment"],
            rating: 4.7,
            users: 900,
            efficiency: 89,
            subDepartment: "Data & Integration"
          }
        ]
      }
    ]
  },
  {
    name: "Marketing",
    description: "Creative and analytical marketing automation solutions",
    color: "from-purple-500 to-purple-600",
    icon: "📈",
    avatarSrc: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=128&h=128&fit=crop&crop=face",
    agents: [],
    subDepartments: [
      {
        name: "Content Creation",
        color: "from-purple-500 to-purple-600",
        agents: [
          {
            name: "SEO Blog Writer",
            description: "Create optimized blog posts tailored to your brand effortlessly",
            integrations: ["WordPress", "SEO Tools", "Content Management"],
            features: ["SEO Optimization", "Brand Tailoring", "Content Generation"],
            rating: 4.7,
            users: 2100,
            efficiency: 85,
            subDepartment: "Content Creation"
          },
          {
            name: "Content Repurposing Agent",
            description: "Transform content across multiple platforms easily",
            integrations: ["Multi-platform APIs", "Content Tools", "Social Media"],
            features: ["Multi-platform Repurposing", "Content Transformation", "Platform Optimization"],
            rating: 4.5,
            users: 1650,
            efficiency: 82,
            subDepartment: "Content Creation"
          },
          {
            name: "Turn Podcasts into Blog Posts",
            description: "Transform podcasts into high-quality blog posts",
            integrations: ["Podcast Platforms", "Blog Tools", "Content Management"],
            features: ["Podcast Transcription", "Blog Conversion", "Content Optimization"],
            rating: 4.4,
            users: 900,
            efficiency: 84,
            subDepartment: "Content Creation"
          },
          {
            name: "AI Video Generator",
            description: "Generate & auto-post AI videos to social media with Veo3 and Blotato",
            integrations: ["Veo3 AI", "Blotato", "Social Media APIs"],
            features: ["AI Video Generation", "Auto-posting", "Social Media Integration"],
            rating: 4.8,
            users: 2200,
            efficiency: 88,
            subDepartment: "Content Creation"
          },
          {
            name: "Free AI Image Generator",
            description: "Free AI image generation system using n8n automation workflows",
            integrations: ["n8n", "Gemini", "ChatGPT", "Image APIs"],
            features: ["Image Generation", "n8n Automation", "Multi-AI Support"],
            rating: 4.6,
            users: 1500,
            efficiency: 86,
            subDepartment: "Content Creation"
          }
        ]
      },
      {
        name: "SEO & Analytics",
        color: "from-indigo-500 to-indigo-600",
        agents: [
          {
            name: "SEO Audit Agent",
            description: "Boost your website's search rankings fast",
            integrations: ["Google Search Console", "SEO Tools", "Analytics"],
            features: ["Website Analysis", "Ranking Optimization", "Performance Insights"],
            rating: 4.8,
            users: 2200,
            efficiency: 88,
            subDepartment: "SEO & Analytics"
          },
          {
            name: "SEO Assistant",
            description: "Help your articles rank higher using SEO techniques",
            integrations: ["Content Tools", "SEO APIs", "Analytics"],
            features: ["SEO Optimization", "Ranking Assistance", "Content Analysis"],
            rating: 4.6,
            users: 1500,
            efficiency: 86,
            subDepartment: "SEO & Analytics"
          },
          {
            name: "SEO Keyword Tracker",
            description: "Track SEO keyword rankings with Bright Data MCP and GPT-4o AI analysis",
            integrations: ["Bright Data MCP", "GPT-4o", "SEO Tools"],
            features: ["Keyword Tracking", "AI Analysis", "Ranking Reports"],
            rating: 4.7,
            users: 1800,
            efficiency: 87,
            subDepartment: "SEO & Analytics"
          },
          {
            name: "Landing Page Analyzer",
            description: "Analyze landing pages with OpenAI and get optimization tips",
            integrations: ["OpenAI", "Web Analysis", "Optimization Tools"],
            features: ["Page Analysis", "Optimization Tips", "AI Insights"],
            rating: 4.5,
            users: 1400,
            efficiency: 86,
            subDepartment: "SEO & Analytics"
          }
        ]
      },
      {
        name: "Social Media & Outreach",
        color: "from-pink-500 to-pink-600",
        agents: [
          {
            name: "LinkedIn Personalized Messages",
            description: "Craft magnetic messages that spark connections",
            integrations: ["LinkedIn API", "AI Writing", "CRM"],
            features: ["Message Personalization", "Connection Building", "AI Writing"],
            rating: 4.6,
            users: 1800,
            efficiency: 87,
            subDepartment: "Social Media & Outreach"
          },
          {
            name: "Influencer Outreach",
            description: "Autonomous outreach for influencer partnerships",
            integrations: ["Social Media APIs", "CRM", "Outreach Tools"],
            features: ["Autonomous Outreach", "Partnership Building", "Influencer Discovery"],
            rating: 4.7,
            users: 1400,
            efficiency: 86,
            subDepartment: "Social Media & Outreach"
          },
          {
            name: "Newsletter Writer",
            description: "Create engaging newsletters in minutes",
            integrations: ["Email Platforms", "Content Tools", "AI Writing"],
            features: ["Newsletter Creation", "Engagement Optimization", "AI Writing"],
            rating: 4.5,
            users: 1200,
            efficiency: 85,
            subDepartment: "Social Media & Outreach"
          },
          {
            name: "Newsletters to Twitter Content",
            description: "Transform newsletters into engaging tweets",
            integrations: ["Twitter API", "Content Tools", "AI Processing"],
            features: ["Content Transformation", "Twitter Optimization", "Engagement Focus"],
            rating: 4.4,
            users: 900,
            efficiency: 84,
            subDepartment: "Social Media & Outreach"
          }
        ]
      },
      {
        name: "Research & Intelligence",
        color: "from-green-500 to-green-600",
        agents: [
          {
            name: "Brand Monitor",
            description: "Track your brand's digital footprint",
            integrations: ["Brandwatch", "Mention", "Social Media APIs"],
            features: ["Brand Tracking", "Digital Footprint", "Sentiment Analysis"],
            rating: 4.4,
            users: 900,
            efficiency: 84,
            subDepartment: "Research & Intelligence"
          },
          {
            name: "Competitor Pricing Monitor",
            description: "Automated competitor pricing monitoring with Bright Data MCP & OpenAI",
            integrations: ["Bright Data MCP", "OpenAI", "Pricing APIs"],
            features: ["Competitor Monitoring", "Pricing Analysis", "Automated Alerts"],
            rating: 4.7,
            users: 1000,
            efficiency: 87,
            subDepartment: "Research & Intelligence"
          },
          {
            name: "Contact Finder",
            description: "Find anyone's contact details instantly",
            integrations: ["Contact APIs", "CRM", "Data Sources"],
            features: ["Contact Discovery", "Data Enrichment", "Instant Results"],
            rating: 4.6,
            users: 1100,
            efficiency: 85,
            subDepartment: "Research & Intelligence"
          }
        ]
      }
    ]
  },
  {
    name: "Document Ops",
    description: "Document processing and management automation",
    color: "from-green-500 to-green-600",
    icon: "📄",
    avatarSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face",
    agents: [],
    subDepartments: [
      {
        name: "Document Processing",
        color: "from-green-500 to-green-600",
    agents: [
      {
            name: "PDF Document RAG System",
            description: "Build a PDF Document RAG System with Mistral OCR, Qdrant and Gemini AI",
            integrations: ["Mistral OCR", "Qdrant", "Gemini AI", "PDF Processing"],
            features: ["PDF RAG", "OCR Processing", "Vector Search", "AI Analysis"],
            rating: 4.8,
        users: 1800,
            efficiency: 91,
            subDepartment: "Document Processing"
          },
          {
            name: "Scientific Research PDF Summaries",
            description: "Generate structured scientific research PDF summaries with GPT-4o",
            integrations: ["GPT-4o", "PDF Processing", "Research Tools"],
            features: ["PDF Summarization", "Structured Output", "Research Analysis"],
        rating: 4.7,
        users: 950,
            efficiency: 87,
            subDepartment: "Document Processing"
          },
          {
            name: "Custom PDF Document Creator",
            description: "Create custom PDF documents from templates with Gemini & Google Drive",
            integrations: ["Gemini AI", "Google Drive", "PDF Generation"],
            features: ["Template-based Creation", "AI Generation", "Drive Integration"],
            rating: 4.6,
            users: 1200,
            efficiency: 85,
            subDepartment: "Document Processing"
          },
          {
            name: "Markdown to Notion Blocks",
            description: "Transform Markdown content into structured Notion blocks",
            integrations: ["Notion API", "Markdown Processing", "Content Transformation"],
            features: ["Markdown Conversion", "Notion Integration", "Structured Blocks"],
        rating: 4.4,
            users: 800,
            efficiency: 84,
            subDepartment: "Document Processing"
          },
          {
            name: "Research Paper Collection",
            description: "Automate research paper collection with Bright Data & n8n",
            integrations: ["Bright Data", "n8n", "Research APIs"],
            features: ["Automated Collection", "Research Automation", "Data Processing"],
            rating: 4.5,
            users: 600,
            efficiency: 83,
            subDepartment: "Document Processing"
          }
        ]
      },
      {
        name: "Invoice Processing",
        color: "from-blue-500 to-blue-600",
        agents: [
          {
            name: "Automated Invoice Processing",
            description: "Automated invoice processing with Telegram, GPT-4o, OCR and SAP integration",
            integrations: ["Telegram", "GPT-4o", "OCR", "SAP"],
            features: ["Invoice Processing", "OCR Recognition", "SAP Integration", "Telegram Notifications"],
            rating: 4.8,
            users: 1400,
            efficiency: 90,
            subDepartment: "Invoice Processing"
          },
          {
            name: "Invoice Data Extractor",
            description: "Extract invoice data from Google Drive to Sheets with Mistral OCR and Gemini",
            integrations: ["Google Drive", "Google Sheets", "Mistral OCR", "Gemini AI"],
            features: ["Data Extraction", "OCR Processing", "Sheet Integration", "AI Analysis"],
            rating: 4.7,
            users: 1100,
            efficiency: 88,
            subDepartment: "Invoice Processing"
          },
          {
            name: "Invoice Processor & Validator",
            description: "Invoice processor & validator with OCR, AI & Google Sheets",
            integrations: ["OCR", "AI Processing", "Google Sheets", "Validation Tools"],
            features: ["Invoice Processing", "Data Validation", "OCR Recognition", "Sheet Integration"],
            rating: 4.6,
            users: 900,
            efficiency: 86,
            subDepartment: "Invoice Processing"
          },
          {
            name: "Smart Invoice Collection",
            description: "Smart invoice collection system with GPT-4.1, Gmail & Google Sheets",
            integrations: ["GPT-4.1", "Gmail", "Google Sheets", "Collection Tools"],
            features: ["Smart Collection", "Email Processing", "AI Analysis", "Sheet Integration"],
            rating: 4.5,
            users: 750,
            efficiency: 85,
            subDepartment: "Invoice Processing"
          }
        ]
      },
      {
        name: "File Management",
        color: "from-purple-500 to-purple-600",
        agents: [
          {
            name: "Multi-Platform File Sync",
            description: "One-way sync between Telegram, Notion, Google Drive, and Google Sheets",
            integrations: ["Telegram", "Notion", "Google Drive", "Google Sheets"],
            features: ["Multi-platform Sync", "File Synchronization", "Cross-platform Integration"],
            rating: 4.6,
            users: 1000,
            efficiency: 87,
            subDepartment: "File Management"
          },
          {
            name: "AI-Powered File Management",
            description: "AI-powered file management automation for Google Drive with MCP",
            integrations: ["Google Drive", "MCP", "AI Processing", "File Management"],
            features: ["AI Automation", "Drive Integration", "File Organization", "Smart Management"],
            rating: 4.7,
        users: 1200,
            efficiency: 89,
            subDepartment: "File Management"
          },
          {
            name: "File Upload & Categorization",
            description: "Upload & categorize files with Supabase Storage and secure URL generation",
            integrations: ["Supabase", "File Storage", "URL Generation", "Categorization"],
            features: ["File Upload", "Auto Categorization", "Secure URLs", "Storage Management"],
            rating: 4.5,
            users: 800,
            efficiency: 86,
            subDepartment: "File Management"
          },
          {
            name: "PDF from Images Creator",
            description: "Create PDF from images for free via Google Slides and Google Drive",
            integrations: ["Google Slides", "Google Drive", "Image Processing", "PDF Generation"],
            features: ["Image to PDF", "Free Processing", "Google Integration", "Document Creation"],
            rating: 4.4,
            users: 600,
            efficiency: 84,
            subDepartment: "File Management"
          }
        ]
      },
      {
        name: "Data Extraction",
        color: "from-orange-500 to-orange-600",
        agents: [
          {
            name: "CV Screening with AI",
            description: "Automate CV screening with AI candidate analysis",
            integrations: ["AI Analysis", "CV Processing", "Candidate Management"],
            features: ["CV Screening", "AI Analysis", "Candidate Evaluation", "Automated Processing"],
            rating: 4.6,
            users: 900,
            efficiency: 87,
            subDepartment: "Data Extraction"
          },
          {
            name: "Expense Extraction",
            description: "Extract expenses from emails and add to Google Sheets",
            integrations: ["Email Processing", "Google Sheets", "Expense Management"],
            features: ["Email Extraction", "Expense Processing", "Sheet Integration", "Data Organization"],
            rating: 4.5,
            users: 750,
            efficiency: 85,
            subDepartment: "Data Extraction"
          },
          {
            name: "Image Analysis & Delivery",
            description: "Analyze images from forms using GPT-4o-mini Vision and deliver to Telegram",
            integrations: ["GPT-4o-mini Vision", "Telegram", "Image Processing", "Form Analysis"],
            features: ["Image Analysis", "Vision AI", "Telegram Delivery", "Form Processing"],
            rating: 4.4,
            users: 600,
            efficiency: 83,
            subDepartment: "Data Extraction"
          }
        ]
      }
    ]
  },
  {
    name: "Other",
    description: "Specialized and miscellaneous automation tools",
    color: "from-gray-500 to-gray-600",
    icon: "🔧",
    avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face",
    agents: [],
    subDepartments: [
      {
        name: "Human Resources",
        color: "from-gray-500 to-gray-600",
        agents: [
          {
            name: "Recruiting Agent",
            description: "Find and organize leads instantly",
            integrations: ["LinkedIn", "Indeed", "Workday"],
            features: ["Lead Organization", "Candidate Discovery", "Recruitment Automation"],
            rating: 4.5,
            users: 1100,
            efficiency: 86,
            subDepartment: "Human Resources"
          },
          {
            name: "Resume Screening Agent",
            description: "Smart resume ranking and candidate insights",
            integrations: ["ATS Systems", "AI Processing", "Candidate Management"],
            features: ["Resume Screening", "Candidate Ranking", "AI Insights"],
            rating: 4.6,
            users: 1300,
            efficiency: 87,
            subDepartment: "Human Resources"
          },
          {
            name: "Employee Onboarding Assistant",
            description: "Seamlessly welcome new team members onboard",
            integrations: ["HR Systems", "Documentation", "Workflow Automation"],
            features: ["Onboarding Automation", "Document Management", "Workflow Tracking"],
            rating: 4.4,
            users: 900,
            efficiency: 85,
            subDepartment: "Human Resources"
          },
          {
            name: "Candidate Background Checker",
            description: "Find and analyze candidate histories instantly",
            integrations: ["Background Check APIs", "AI Analysis", "Candidate Database"],
            features: ["Background Analysis", "History Verification", "Risk Assessment"],
            rating: 4.3,
            users: 750,
            efficiency: 83,
            subDepartment: "Human Resources"
          },
          {
            name: "Interview Questions Generator",
            description: "Create smart, targeted interview questions instantly",
            integrations: ["AI Processing", "Job Analysis", "Interview Tools"],
            features: ["Question Generation", "Job Targeting", "Interview Preparation"],
            rating: 4.5,
            users: 800,
            efficiency: 84,
            subDepartment: "Human Resources"
          },
          {
            name: "Offer Letter Generator",
            description: "Create professional offers in minutes instantly",
            integrations: ["Document Generation", "HR Systems", "Legal Templates"],
            features: ["Offer Generation", "Template Management", "Legal Compliance"],
            rating: 4.4,
            users: 700,
            efficiency: 82,
            subDepartment: "Human Resources"
          }
        ]
      },
      {
        name: "Operations",
        color: "from-blue-500 to-blue-600",
        agents: [
          {
            name: "AI Todos Manager",
            description: "Organize tasks from chats effortlessly",
            integrations: ["Chat Platforms", "Task Management", "AI Processing"],
            features: ["Task Organization", "Chat Integration", "AI Automation"],
            rating: 4.6,
            users: 1200,
            efficiency: 88,
            subDepartment: "Operations"
          },
          {
            name: "Vendor Invoice & Payment Tracker",
            description: "Track and manage vendor payments easily",
            integrations: ["Invoice Systems", "Payment Platforms", "Accounting Software"],
            features: ["Invoice Tracking", "Payment Management", "Vendor Relations"],
            rating: 4.5,
            users: 900,
            efficiency: 86,
            subDepartment: "Operations"
          },
          {
            name: "Daily Ops Digest",
            description: "Stay on top of daily operations",
            integrations: ["Analytics Tools", "Reporting Systems", "Notification Platforms"],
            features: ["Daily Summaries", "Operations Tracking", "Performance Insights"],
            rating: 4.4,
            users: 800,
            efficiency: 85,
            subDepartment: "Operations"
          },
          {
            name: "Project Status Updater",
            description: "Track project changes automatically in Notion",
            integrations: ["Notion", "Project Management", "Status Tracking"],
            features: ["Project Tracking", "Status Updates", "Notion Integration"],
            rating: 4.3,
            users: 700,
            efficiency: 83,
            subDepartment: "Operations"
          },
          {
            name: "Meeting Agenda & Follow-up",
            description: "Extract, organize, and share key insights",
            integrations: ["Meeting Platforms", "Documentation", "Team Collaboration"],
            features: ["Agenda Generation", "Insight Extraction", "Follow-up Automation"],
            rating: 4.5,
            users: 950,
            efficiency: 87,
            subDepartment: "Operations"
          }
        ]
      },
      {
        name: "Product",
        color: "from-green-500 to-green-600",
        agents: [
          {
            name: "Voice of the Customer",
            description: "Extract customer insights and share them to your team",
            integrations: ["Customer Data", "Analytics Tools", "Team Collaboration"],
            features: ["Customer Insights", "Data Extraction", "Team Sharing"],
            rating: 4.7,
            users: 1400,
            efficiency: 89,
            subDepartment: "Product"
          },
          {
            name: "Competition Tracker",
            description: "Monitor competitors with real-time insights",
            integrations: ["Market Research", "Competitor Analysis", "Alert Systems"],
            features: ["Competitor Monitoring", "Real-time Insights", "Market Analysis"],
            rating: 4.6,
            users: 1200,
            efficiency: 88,
            subDepartment: "Product"
          },
          {
            name: "User Feedback Collector",
            description: "Gather and analyze customer feedback effortlessly",
            integrations: ["Feedback Systems", "Analytics Tools", "Customer Data"],
            features: ["Feedback Collection", "Data Analysis", "Customer Insights"],
            rating: 4.5,
            users: 1000,
            efficiency: 86,
            subDepartment: "Product"
          },
          {
            name: "Product Documentation Creator",
            description: "Create product manuals in minutes",
            integrations: ["Documentation Tools", "Product Data", "AI Processing"],
            features: ["Document Generation", "Manual Creation", "Product Integration"],
            rating: 4.4,
            users: 800,
            efficiency: 84,
            subDepartment: "Product"
          },
          {
            name: "Bug Triage & Prioritization",
            description: "Smart bug tracking and priority management",
            integrations: ["Bug Tracking", "Priority Systems", "Development Tools"],
            features: ["Bug Tracking", "Priority Management", "Smart Triage"],
            rating: 4.6,
            users: 1100,
            efficiency: 87,
            subDepartment: "Product"
          }
        ]
      }
    ]
  },
  {
    name: "Support",
    description: "24/7 customer service and support automation",
    color: "from-orange-500 to-orange-600",
    icon: "🎧",
    avatarSrc: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=128&h=128&fit=crop&crop=face",
    agents: [],
    subDepartments: [
      {
        name: "Customer Service",
        color: "from-orange-500 to-orange-600",
        agents: [
          {
            name: "Support Bot",
            description: "Handles customer inquiries and provides instant solutions",
            integrations: ["Zendesk", "Intercom", "Slack"],
            features: ["Ticket Routing", "FAQ Answers", "Escalation"],
            rating: 4.6,
            users: 3200,
            efficiency: 90,
            subDepartment: "Customer Service"
          },
          {
            name: "Live Chat Assistant",
            description: "Real-time customer support with human-like conversations",
            integrations: ["Intercom", "Drift", "Crisp"],
            features: ["Real-time Chat", "Sentiment Analysis", "Multi-language"],
            rating: 4.7,
            users: 2800,
            efficiency: 87,
            subDepartment: "Customer Service"
          },
          {
            name: "WhatsApp Support Agent",
            description: "Smart messaging bot for WhatsApp",
            integrations: ["WhatsApp", "AI Processing", "CRM"],
            features: ["WhatsApp Integration", "Smart Messaging", "CRM Sync"],
            rating: 4.5,
            users: 1500,
            efficiency: 86,
            subDepartment: "Customer Service"
          },
          {
            name: "Phone Support Agent",
            description: "Phone support made simple",
            integrations: ["Phone Systems", "CRM", "Call Routing"],
            features: ["Phone Integration", "Call Routing", "CRM Integration"],
            rating: 4.4,
            users: 1200,
            efficiency: 84,
            subDepartment: "Customer Service"
          },
          {
            name: "AI Receptionist",
            description: "Professional call handling made simple",
            integrations: ["Phone Systems", "Calendar", "CRM"],
            features: ["Call Handling", "Calendar Integration", "Professional Service"],
            rating: 4.6,
            users: 1000,
            efficiency: 88,
            subDepartment: "Customer Service"
          }
        ]
      },
      {
        name: "Support Chatbots",
        color: "from-blue-500 to-blue-600",
        agents: [
          {
            name: "AI-Powered WhatsApp Chatbot",
            description: "Multi-modal WhatsApp chatbot for text, voice, images, and PDF with RAG",
            integrations: ["WhatsApp", "RAG", "Multi-modal AI", "Document Processing"],
            features: ["Multi-modal Support", "WhatsApp Integration", "RAG Technology", "File Processing"],
            rating: 4.8,
            users: 1800,
            efficiency: 91,
            subDepartment: "Support Chatbots"
          },
          {
            name: "Customer Support WhatsApp Bot",
            description: "Customer support WhatsApp bot with Google Docs knowledge base and Gemini AI",
            integrations: ["WhatsApp", "Google Docs", "Gemini AI", "Customer Support"],
            features: ["Customer Support", "WhatsApp Integration", "Knowledge Base", "Gemini AI"],
            rating: 4.7,
            users: 1300,
            efficiency: 89,
            subDepartment: "Support Chatbots"
          },
          {
            name: "Multi-Modal Telegram Support Bot",
            description: "Multi-modal Telegram support bot with GPT-4 and Supabase RAG",
            integrations: ["Telegram", "GPT-4", "Supabase", "RAG"],
            features: ["Multi-modal Support", "Telegram Integration", "Supabase RAG", "GPT-4 powered"],
            rating: 4.9,
            users: 1700,
            efficiency: 93,
            subDepartment: "Support Chatbots"
          },
          {
            name: "Branded AI-Powered Website Chatbot",
            description: "Create a branded AI-powered website chatbot",
            integrations: ["Website Integration", "AI Processing", "Branding Tools"],
            features: ["Website Integration", "AI Processing", "Custom Branding", "Instant Answers"],
            rating: 4.6,
            users: 1100,
            efficiency: 87,
            subDepartment: "Support Chatbots"
          }
        ]
      },
      {
        name: "Ticket Management",
        color: "from-green-500 to-green-600",
        agents: [
          {
            name: "Ticket Triage Expert",
            description: "Intelligent ticket classification and priority assignment",
            integrations: ["Zendesk", "Freshdesk", "Jira Service Desk"],
            features: ["Auto Classification", "Priority Scoring", "Agent Assignment"],
            rating: 4.5,
            users: 1500,
            efficiency: 86,
            subDepartment: "Ticket Management"
          },
          {
            name: "Gmail AI Email Manager",
            description: "Intelligent email organization with AI-powered content classification for Gmail",
            integrations: ["Gmail", "AI Processing", "Email Management"],
            features: ["Email Organization", "AI Classification", "Gmail Integration", "Smart Management"],
            rating: 4.6,
            users: 1200,
            efficiency: 88,
            subDepartment: "Ticket Management"
          },
          {
            name: "Smart Email Responder",
            description: "Smart email responder workflow using AI",
            integrations: ["Email Systems", "AI Processing", "Response Automation"],
            features: ["Email Automation", "AI Responses", "Smart Routing", "Response Generation"],
            rating: 4.4,
            users: 900,
            efficiency: 85,
            subDepartment: "Ticket Management"
          },
          {
            name: "Customer Support Automation",
            description: "Automate customer support with Gmail, Google Sheets, ERP Data & GPT-4o AI",
            integrations: ["Gmail", "Google Sheets", "ERP Systems", "GPT-4o AI"],
            features: ["Support Automation", "Data Integration", "AI Processing", "Multi-platform Sync"],
            rating: 4.7,
            users: 1000,
            efficiency: 89,
            subDepartment: "Ticket Management"
          }
        ]
      },
      {
        name: "Knowledge & Analytics",
        color: "from-purple-500 to-purple-600",
        agents: [
          {
            name: "Knowledge Base Manager",
            description: "Automatically maintains and updates support documentation",
            integrations: ["Confluence", "Notion", "GitBook"],
            features: ["Auto Updates", "Content Generation", "Search Optimization"],
            rating: 4.4,
            users: 1200,
            efficiency: 84,
            subDepartment: "Knowledge & Analytics"
          },
          {
            name: "Customer Success Manager",
            description: "Proactive customer health monitoring and retention",
            integrations: ["Gainsight", "Totango", "HubSpot"],
            features: ["Health Scoring", "Churn Prediction", "Success Metrics"],
            rating: 4.6,
            users: 1000,
            efficiency: 88,
            subDepartment: "Knowledge & Analytics"
          },
          {
            name: "Feedback Analyzer",
            description: "AI-powered customer feedback analysis and insights",
            integrations: ["SurveyMonkey", "Typeform", "Qualtrics"],
            features: ["Sentiment Analysis", "Trend Detection", "Action Items"],
            rating: 4.3,
            users: 800,
            efficiency: 82,
            subDepartment: "Knowledge & Analytics"
          }
        ]
      }
    ]
  },
];

// Function to generate comprehensive search data from all agents
const generateSearchableAgents = () => {
  const searchableAgents: any[] = [];
  
  // Add all individual agents from all categories and sub-departments
  agentCategories.forEach(category => {
    // Add category as a searchable item
    searchableAgents.push({
      id: `category-${category.name.toLowerCase().replace(/\s+/g, '-')}`,
      label: `${category.name} Department`,
      icon: <BarChart2 className="h-4 w-4 text-blue-500" />,
      description: category.description,
      short: category.name,
      end: "Department",
    });

    // Add all agents from sub-departments
    if (category.subDepartments) {
      category.subDepartments.forEach(subDept => {
        // Add sub-department as a searchable item
        searchableAgents.push({
          id: `subdept-${subDept.name.toLowerCase().replace(/\s+/g, '-')}`,
          label: subDept.name,
          icon: <BarChart2 className="h-4 w-4 text-blue-500" />,
          description: `${category.name} - ${subDept.name}`,
          short: category.name,
          end: "Department",
        });

        // Add all individual agents
        subDept.agents.forEach(agent => {
          // Create comprehensive searchable text including features and integrations
          const searchableText = `${agent.name} ${agent.description} ${agent.features.join(' ')} ${agent.integrations.join(' ')}`;
          
          searchableAgents.push({
            id: `agent-${agent.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
            label: agent.name,
            icon: <BarChart2 className="h-4 w-4 text-blue-500" />,
            description: `${agent.description} | Features: ${agent.features.slice(0, 3).join(', ')} | Integrations: ${agent.integrations.slice(0, 3).join(', ')}`,
            short: category.name,
    end: "Agent",
          });
        });
      });
    } else if (category.agents) {
      // Add agents from categories without sub-departments
      category.agents.forEach(agent => {
        // Create comprehensive searchable text including features and integrations
        const searchableText = `${agent.name} ${agent.description} ${agent.features.join(' ')} ${agent.integrations.join(' ')}`;
        
        searchableAgents.push({
          id: `agent-${agent.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
          label: agent.name,
          icon: <BarChart2 className="h-4 w-4 text-blue-500" />,
          description: `${agent.description} | Features: ${agent.features.slice(0, 3).join(', ')} | Integrations: ${agent.integrations.slice(0, 3).join(', ')}`,
          short: category.name,
    end: "Agent",
        });
      });
    }
  });

  return searchableAgents;
};

const finstoneAgentsAndDepartments = generateSearchableAgents();

// Helper functions for PersonalLanding customization
const getCategoryColors = (categoryName: string) => {
  const colorMap: { [key: string]: { c1: string; c2: string; c3: string } } = {
    "AI": {
      c1: "oklch(75% 0.15 350)", // Pink
      c2: "oklch(80% 0.12 200)", // Light blue
      c3: "oklch(78% 0.14 280)"  // Purple
    },
    "Sales": {
      c1: "oklch(70% 0.15 120)", // Green
      c2: "oklch(75% 0.12 60)",  // Yellow
      c3: "oklch(80% 0.10 100)"  // Light green
    },
    "IT Ops": {
      c1: "oklch(70% 0.15 200)", // Cyan
      c2: "oklch(75% 0.12 220)", // Blue
      c3: "oklch(80% 0.10 180)"  // Light cyan
    },
    "Marketing": {
      c1: "oklch(70% 0.15 30)",  // Orange
      c2: "oklch(75% 0.12 60)",  // Yellow
      c3: "oklch(80% 0.10 20)"   // Light orange
    },
    "Document Ops": {
      c1: "oklch(70% 0.15 300)", // Purple
      c2: "oklch(75% 0.12 320)", // Pink
      c3: "oklch(80% 0.10 280)"  // Light purple
    },
    "Other": {
      c1: "oklch(70% 0.15 60)",  // Yellow
      c2: "oklch(75% 0.12 30)",  // Orange
      c3: "oklch(80% 0.10 50)"   // Light yellow
    },
    "Support": {
      c1: "oklch(70% 0.15 320)", // Magenta
      c2: "oklch(75% 0.12 340)", // Pink
      c3: "oklch(80% 0.10 300)"  // Light magenta
    },
    "Document Ops": {
      c1: "oklch(70% 0.15 140)", // Green
      c2: "oklch(75% 0.12 160)", // Green-cyan
      c3: "oklch(80% 0.10 120)"  // Light green
    },
    "Other": {
      c1: "oklch(70% 0.15 0)",   // Gray
      c2: "oklch(75% 0.12 0)",   // Dark gray
      c3: "oklch(80% 0.10 0)"    // Light gray
    }
  };
  return colorMap[categoryName] || colorMap["AI"];
};

const getCategoryDescription = (categoryName: string) => {
  const descriptionMap: { [key: string]: string } = {
    "AI": "Deploy specialized AI agents across every department to automate your workflows and scale your operations.",
    "Sales": "Boost your sales performance with AI-powered lead generation, CRM automation, and revenue optimization tools.",
    "Marketing": "Create, optimize, and scale your marketing campaigns with intelligent content generation and analytics.",
    "Support": "Deliver exceptional customer service with AI-powered support bots and automated ticket management.",
    "IT Ops": "Streamline IT operations with automated monitoring, security, and infrastructure management solutions.",
    "Document Ops": "Automate document processing, analysis, and management with intelligent AI-powered tools.",
    "Other": "Specialized AI agents for HR, legal, finance, and other business functions to complete your automation suite."
  };
  return descriptionMap[categoryName] || descriptionMap["AI"];
};

export default function LinydStyleMarketplace() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("AI");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleModalStateChange = (isOpen: boolean) => {
    console.log('Modal state changed:', isOpen);
    setIsModalOpen(isOpen);
  };

  // Handle URL parameters for category selection
  useEffect(() => {
    const category = searchParams.get('category');
    if (category && agentCategories.some(cat => cat.name === category)) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredCategory = agentCategories.find(cat => cat.name === selectedCategory);

  return (
    <>
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        /* Navigation transparency only */
        .fixed.top-0 {
          background: transparent !important;
        }
      `}</style>
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-gray-200">
      
      {/* Aurora Hero Section */}
        <AuroraHero finstoneAgentsAndDepartments={finstoneAgentsAndDepartments} />
      
      {/* Sticky Department Navigation - Right under header */}
      <div className="sticky top-0 left-0 right-0 z-[9999] w-full bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 backdrop-blur-sm" style={{background: 'linear-gradient(to bottom right, rgb(191 219 254), rgb(219 234 254), rgb(239 246 255)) !important', width: '100vw', marginLeft: 'calc(-50vw + 50%)'}}>
        <div className="max-w-7xl mx-auto px-4 py-3 bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50" style={{background: 'linear-gradient(to bottom right, rgb(191 219 254), rgb(219 234 254), rgb(239 246 255)) !important'}}>
          <div className="flex justify-center space-x-1 overflow-x-auto scrollbar-hide" style={{background: 'transparent !important', backgroundColor: 'transparent !important'}}>
            {agentCategories.map((category) => (
              <button 
                key={category.name}
                onClick={() => handleCategoryChange(category.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category.name 
                    ? 'bg-blue-500/20 text-blue-700 shadow-sm' 
                    : 'text-gray-700 hover:bg-white/30 hover:text-gray-900'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section with Subtle Gradient Transition */}
      <div className="relative bg-gradient-to-br from-blue-100 via-blue-50 to-gray-200">
        
        <div className="px-8 pb-8 pt-8 bg-gradient-to-br from-blue-100 via-blue-50 to-gray-200">
          {/* Category Section */}
          {filteredCategory ? (
            <div>

              {/* Personal Landing Component */}
              <div className="mb-8">
                <PersonalLanding 
                  name={filteredCategory.name}
                  colors={getCategoryColors(filteredCategory.name)}
                  description={getCategoryDescription(filteredCategory.name)}
                  icon={filteredCategory.icon}
                  avatarSrc={filteredCategory.avatarSrc}
                />
              </div>

              {/* Agents Bento Grid */}
              <div className="px-4">
                {filteredCategory.subDepartments ? (
                  // Render sub-departments
                  <div className="space-y-8">
                    {filteredCategory.subDepartments.map((subDept, subIndex) => (
                      <div key={subIndex}>
                        <div className="flex justify-start mb-6 max-w-4xl mx-auto">
                          <h3 className="text-lg font-semibold text-gray-800">{subDept.name}</h3>
                        </div>
                            <BentoGrid 
                              items={subDept.agents.map((agent, index) => ({
                                id: agent.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                                title: agent.name,
                                description: agent.description,
                                icon: <BarChart2 className="w-4 h-4 text-blue-500" />,
                                status: agent.efficiency > 90 ? "Live" : agent.efficiency > 80 ? "Updated" : "Beta",
                                tags: agent.features.slice(0, 3),
                                meta: `${agent.users} users`,
                                cta: "Deploy Agent",
                                hasPersistentHover: index === 0,
                                integrations: agent.integrations,
                              }))}
                              onModalStateChange={handleModalStateChange}
                            />
                      </div>
                    ))}
                  </div>
                ) : (
                  // Render regular agents
                      <BentoGrid 
                        items={filteredCategory.agents.map((agent, index) => ({
                          id: agent.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                          title: agent.name,
                          description: agent.description,
                          icon: <BarChart2 className="w-4 h-4 text-blue-500" />,
                          status: agent.efficiency > 90 ? "Live" : agent.efficiency > 80 ? "Updated" : "Beta",
                          tags: agent.features.slice(0, 3),
                          meta: `${agent.users} users`,
                          cta: "Deploy Agent",
                          hasPersistentHover: index === 0,
                          integrations: agent.integrations,
                        }))}
                        onModalStateChange={setIsModalOpen}
                      />
                )}
              </div>

              {/* Battery System Explanation Section */}
              <div className="mt-48 px-4">
                <div className="py-16 px-4 bg-gradient-to-br from-blue-100 via-blue-50 to-gray-200 rounded-2xl border border-blue-300">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                      <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        The Battery System - Simple, Transparent, Unlimited Potential
                      </h2>
                      <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                        Instead of confusing credits or tokens, we use a Battery System to make things simple. Think of your Battery as the "energy" that powers your AI Employees. Every time an agent completes a task (like sending an email, analyzing leads, or generating a report), it uses a small amount of energy from your Battery.
                      </p>
                      <p className="text-lg text-gray-600 max-w-4xl mx-auto mt-4">
                        When your Battery runs low, your AI Employees don't get weaker or worse - they just need a quick recharge. You can easily top up your Battery anytime, with no hidden costs or complicated rules.
                      </p>
                    </div>
                    
                    {/* How it works section */}
                    <div className="mb-16">
                      <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">
                        How it works
                      </h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center p-6 bg-blue-100 backdrop-blur-sm rounded-xl border border-blue-400">
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">Monthly Allowance</h4>
                          <p className="text-sm text-gray-600">
                            Each plan comes with a monthly Battery allowance (tasks included in your subscription).
                        </p>
                      </div>
                        <div className="text-center p-6 bg-blue-100 backdrop-blur-sm rounded-xl border border-blue-400">
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">Task Usage</h4>
                          <p className="text-sm text-gray-600">
                            Every time your AI Employees perform a task, a little bit of Battery is used.
                        </p>
                      </div>
                        <div className="text-center p-6 bg-blue-100 backdrop-blur-sm rounded-xl border border-blue-400">
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">Easy Recharge</h4>
                          <p className="text-sm text-gray-600">
                            If you run out, simply recharge your Battery instantly to keep them working.
                          </p>
                        </div>
                        <div className="text-center p-6 bg-blue-100 backdrop-blur-sm rounded-xl border border-blue-400">
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">No Hidden Costs</h4>
                          <p className="text-sm text-gray-600">
                            Recharges are affordable and straightforward with no confusing limits.
                          </p>
                        </div>
                      </div>
                      </div>
                      
                    {/* Example section */}
                    <div className="mt-16">
                      <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">
                        Example
                      </h3>
                      <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-8 border border-blue-400">
                        <div className="max-w-4xl mx-auto">
                          <div className="grid md:grid-cols-2 gap-8">
                            <div>
                              <h4 className="text-xl font-semibold text-gray-800 mb-4">Starter Plan Battery</h4>
                              <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  <span className="text-gray-700">3,000 tasks per month included</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  <span className="text-gray-700">Automatic monthly renewal</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  <span className="text-gray-700">Easy recharge when needed</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-xl font-semibold text-gray-800 mb-4">Sample Usage</h4>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded-lg border border-blue-200">
                                  <span className="text-gray-700">Sales Agent qualifies 50 leads</span>
                                  <span className="font-semibold text-blue-600">~150 tasks</span>
                                </div>
                                <div className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded-lg border border-blue-200">
                                  <span className="text-gray-700">Sends 200 outreach emails</span>
                                  <span className="font-semibold text-blue-600">~200 tasks</span>
                                </div>
                                <div className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded-lg border border-blue-200">
                                  <span className="text-gray-700">Analytics Agent runs 20 reports</span>
                                  <span className="font-semibold text-blue-600">~450 tasks</span>
                                </div>
                                <div className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded-lg border border-blue-200">
                                  <span className="text-gray-700 font-semibold">Total used this month</span>
                                  <span className="font-bold text-green-600">800 tasks</span>
                                </div>
                                <div className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded-lg border border-blue-200">
                                  <span className="text-gray-700 font-semibold">Remaining in Battery</span>
                                  <span className="font-bold text-blue-600">2,200 tasks</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-gray-700 text-center">
                              <strong>If you ever use all 3,000 tasks,</strong> you just recharge your Battery and keep going. No interruptions, no complicated limits.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academy Section */}
              <div className="mt-12 px-4">
                <AcademySection categoryName={filteredCategory.name} />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Loading...</h2>
              <p className="text-gray-600">Please select a category from the navigation above.</p>
            </div>
          )}
        </div>
      </div>

    </div>
    </>
  );
}