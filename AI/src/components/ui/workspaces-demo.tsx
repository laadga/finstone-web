'use client';

import * as React from 'react';
import {
	Workspaces,
	WorkspaceTrigger,
	WorkspaceContent,
	type Workspace,
} from '@/components/ui/workspaces';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

// Extended workspace interface for this specific use case
interface MyWorkspace extends Workspace {
	logo: string;
	plan: string;
	slug: string;
}

const workspaces: MyWorkspace[] = [
	{
		id: '1',
		name: 'Finstone AI',
		logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&auto=format',
		plan: 'Pro',
		slug: 'finstone-ai',
	},
	{
		id: '2',
		name: 'TechStart Inc.',
		logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format',
		plan: 'Free',
		slug: 'techstart',
	},
	{
		id: '3',
		name: 'GrowthCo',
		logo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format',
		plan: 'Team',
		slug: 'growthco',
	},
	{
		id: '4',
		name: 'ScaleUp Solutions',
		logo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format',
		plan: 'Free',
		slug: 'scaleup',
	},
	{
		id: '5',
		name: 'AI Ventures',
		logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop&auto=format',
		plan: 'Pro',
		slug: 'ai-ventures',
	},
];

export default function WorkspacesDemo() {
	const [activeWorkspaceId, setActiveWorkspaceId] = React.useState('1');

	const handleWorkspaceChange = (workspace: MyWorkspace) => {
		setActiveWorkspaceId(workspace.id);
		console.log('Selected workspace:', workspace);
	};

	return (
		<div className="flex min-h-screen items-start justify-center gap-8 px-4 py-24">
			<Workspaces
				workspaces={workspaces}
				selectedWorkspaceId={activeWorkspaceId}
				onWorkspaceChange={handleWorkspaceChange}
			>
				<WorkspaceTrigger className="min-w-72" />
				<WorkspaceContent>
					<Button
						variant="ghost"
						size="sm"
						className="text-muted-foreground w-full justify-start"
					>
						<PlusIcon className="mr-2 h-4 w-4" />
						Create workspace
					</Button>
				</WorkspaceContent>
			</Workspaces>
		</div>
	);
}


























