import Container from 'typedi';
import { v4 as uuid } from 'uuid';

import type { WorkflowHistory } from '@/databases/entities/workflow-history';
import { WorkflowHistoryRepository } from '@/databases/repositories/workflow-history.repository';

export async function createWorkflowHistoryItem(
	workflowId: string,
	data?: Partial<WorkflowHistory>,
) {
	return await Container.get(WorkflowHistoryRepository).save({
		authors: 'John Smith',
		connections: {},
		nodes: [
			{
				id: 'uuid-1234',
				name: 'Start',
				parameters: {},
				position: [-20, 260],
				type: 'n8n-nodes-base.start',
				typeVersion: 1,
			},
		],
		versionId: uuid(),
		...(data ?? {}),
		workflowId,
	});
}

export async function createManyWorkflowHistoryItems(
	workflowId: string,
	count: number,
	time?: Date,
) {
	const baseTime = (time ?? new Date()).valueOf();
	return await Promise.all(
		[...Array(count)].map(
			async (_, i) =>
				await createWorkflowHistoryItem(workflowId, {
					createdAt: new Date(baseTime + i),
					updatedAt: new Date(baseTime + i),
				}),
		),
	);
}
