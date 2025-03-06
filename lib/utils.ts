import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getBreadcrumbs(pathname: string) {
	// Remove trailing slash and split path into segments
	const segments = pathname
		.replace(/\/$/, '')
		.split('/')
		.filter(Boolean)
		.slice(1);

	// Generate breadcrumb items
	return segments.map((segment, index) => {
		// Create the path for this breadcrumb
		const path = `/${segments.slice(0, index + 1).join('/')}`;

		// Format the label (capitalize and replace hyphens)
		const label = segment
			.split('-')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');

		return {
			label,
			path,
			isLast: index === segments.length - 1,
		};
	});
}
