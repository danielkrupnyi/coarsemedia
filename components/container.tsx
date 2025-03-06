import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';

interface ContainerProps {
	children: ReactNode;
	className?: string;
	variant?: 'dashboard';
}

export const Container: FC<ContainerProps> = ({
	children,
	className,
	variant,
}) => {
	return (
		<div
			className={cn(
				variant ? 'pt-6 pb-12 px-6' : 'max-w-7xl mx-auto p-4',
				className
			)}
		>
			{children}
		</div>
	);
};
