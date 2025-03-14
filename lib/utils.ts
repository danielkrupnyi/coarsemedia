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

export const ImgPlaceholder = {
	shimmer: (w: number, h: number) => `
	<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<defs>
			<linearGradient id="g">
				<stop stop-color="#333" offset="20%" />
				<stop stop-color="#222" offset="50%" />
				<stop stop-color="#333" offset="70%" />
			</linearGradient>
		</defs>
		<rect width="${w}" height="${h}" fill="#333" />
		<rect id="r" width="${w}" height="${h}" fill="url(#g)" />
		<animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
	</svg>`,
	toBase64: (str: string) =>
		typeof window === 'undefined'
			? Buffer.from(str).toString('base64')
			: window.btoa(str),
};

const makeImgPlaceholder = () => {
	const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

	const toBase64 = (str: string) =>
		typeof window === 'undefined'
			? Buffer.from(str).toString('base64')
			: window.btoa(str);

	return { toBase64, shimmer };
};

makeImgPlaceholder();

export const favicons = [
	{
		media: '(prefers-color-scheme: dark)',
		url: '/images/favicon-dark.png',
		href: '/images/favicon-dark.png',
	},
	{
		media: '(prefers-color-scheme: light)',
		url: '/images/favicon-light.png',
		href: '/images/favicon-light.png',
	},
];
