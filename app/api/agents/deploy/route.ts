import { NextRequest, NextResponse } from 'next/server';
import { getN8nAgent } from '@/lib/n8n-config';

export async function POST(request: NextRequest) {
  try {
    const { agentId, userId, configuration } = await request.json();

    // Validate required fields
    if (!agentId || !userId) {
      return NextResponse.json(
        { error: 'Agent ID and User ID are required' },
        { status: 400 }
      );
    }

    // Get agent configuration
    const agent = getN8nAgent(agentId);
    if (!agent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      );
    }

    // Check if agent is active
    if (agent.status !== 'active') {
      return NextResponse.json(
        { error: 'Agent is currently unavailable' },
        { status: 503 }
      );
    }

    // Prepare webhook payload
    const webhookPayload = {
      user_id: userId,
      agent_id: agentId,
      workflow_id: agent.workflowId,
      configuration: configuration || {},
      timestamp: new Date().toISOString(),
      ...configuration
    };

    // Call n8n webhook
    const n8nResponse = await fetch(agent.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.N8N_API_KEY}` // Add your n8n API key
      },
      body: JSON.stringify(webhookPayload)
    });

    if (!n8nResponse.ok) {
      throw new Error(`n8n webhook failed: ${n8nResponse.statusText}`);
    }

    const n8nResult = await n8nResponse.json();

    // Store deployment record in your database
    // This would typically go to your database
    const deploymentRecord = {
      id: `deploy_${Date.now()}`,
      agentId,
      userId,
      status: 'deployed',
      deployedAt: new Date().toISOString(),
      n8nWorkflowId: agent.workflowId,
      configuration
    };

    // TODO: Save to database
    console.log('Deployment record:', deploymentRecord);

    return NextResponse.json({
      success: true,
      deploymentId: deploymentRecord.id,
      agent: {
        id: agent.id,
        name: agent.name,
        status: 'deployed'
      },
      n8nResult
    });

  } catch (error) {
    console.error('Agent deployment error:', error);
    return NextResponse.json(
      { error: 'Failed to deploy agent' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // TODO: Fetch user's deployed agents from database
    const deployedAgents = [
      // This would come from your database
      {
        id: 'deploy_123',
        agentId: 'personal-ai-assistant',
        name: 'Personal AI Assistant',
        status: 'active',
        deployedAt: '2024-01-15T10:30:00Z'
      }
    ];

    return NextResponse.json({
      success: true,
      agents: deployedAgents
    });

  } catch (error) {
    console.error('Error fetching deployed agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deployed agents' },
      { status: 500 }
    );
  }
}






