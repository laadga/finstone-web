import { NextResponse } from 'next/server';

export async function GET() {
  // Mock dashboard data
  const dashboardData = {
    stats: {
      mrr: 1244,
      newLeads7d: 5,
      activeCustomers: 6,
      pendingOnboards: 3,
      churnRate: 2.1,
      mrrTrend: [800, 920, 1050, 1100, 1150, 1200, 1244]
    },
    activityFeed: [
      {
        id: "act-001",
        title: "New lead created",
        description: "Sofia Ramos from Ramos Legal",
        timestamp: "2025-01-20T14:00:00Z"
      },
      {
        id: "act-002",
        title: "Subscription started",
        description: "GreenCart eCom upgraded to Pro plan",
        timestamp: "2025-01-19T16:00:00Z"
      },
      {
        id: "act-003",
        title: "Onboarding step completed",
        description: "DataFlow Inc completed integrations setup",
        timestamp: "2025-01-18T15:00:00Z"
      }
    ],
    recentLeads: [
      {
        id: "L-001",
        name: "Sofia Ramos",
        company: "Ramos Legal",
        email: "sofia@ramoslegal.com",
        source: "LinkedIn Outreach",
        status: "Demo Scheduled",
        estimatedValue: 5000,
        lastContact: "2025-01-19T10:30:00Z",
        createdAt: "2025-01-10T09:00:00Z"
      },
      {
        id: "L-002",
        name: "Omar Khan",
        company: "BrightBuild",
        email: "omar@brightbuild.co",
        source: "Cold Email",
        status: "Contacted",
        estimatedValue: 2000,
        lastContact: "2025-01-18T15:00:00Z",
        createdAt: "2025-01-12T08:00:00Z"
      },
      {
        id: "L-003",
        name: "Elena Chen",
        company: "TechFlow Solutions",
        email: "elena@techflow.com",
        source: "Website",
        status: "New",
        estimatedValue: 12000,
        lastContact: "2025-01-20T14:00:00Z",
        createdAt: "2025-01-20T14:00:00Z"
      }
    ]
  };

  return NextResponse.json(dashboardData);
}





















