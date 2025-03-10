'use client';

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { Button } from '../ui/button';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			<div className='flex justify-between'>
				<div className='text-xl font-bold capitalize'>projects table</div>
				<Button className='rounded-md border capitalize' asChild>
					<Link href='/dashboard/content/projects/new'>add entry</Link>
				</Button>
			</div>
			<div className='rounded-md border mt-2'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell, idx) => (
										<TableCell key={cell.id}>
											{idx === 0 ? (
												<Link
													href={`/dashboard/content/projects/${
														(row.original as { slug: string }).slug
													}`}
													className='block'
												>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</Link>
											) : (
												<>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</>
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</>
	);
}
