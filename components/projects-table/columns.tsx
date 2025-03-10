'use client';

import { Project } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Project>[] = [
	{
		accessorKey: 'title',
		header: 'Title',
	},
	{
		accessorKey: 'slug',
		header: 'Slug',
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
];
