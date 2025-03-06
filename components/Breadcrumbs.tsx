'use client';
import { usePathname } from 'next/navigation';

import { getBreadcrumbs } from '@/lib/utils';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from './ui/breadcrumb';

export const Breadcrumbs = () => {
	const pathname = usePathname();
	const breadcrumbs = getBreadcrumbs(pathname);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem className='hidden md:block'>
					<BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
				</BreadcrumbItem>
				{breadcrumbs.map((breadcrumb, index) => (
					<div
						className='flex items-center gap-2'
						key={`/dashboard${breadcrumb.path}`}
					>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							{breadcrumb.isLast ? (
								<BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
							) : (
								<BreadcrumbLink
									className={index === 0 ? 'pointer-events-none' : ''}
									href={`/dashboard${breadcrumb.path}`}
								>
									{breadcrumb.label}
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
					</div>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
