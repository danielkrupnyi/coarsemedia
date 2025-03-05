import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';

export const Container: FC<{ children: ReactNode; className?: string }> = ({
	children,
	className,
}) => {
	return (
		<div className={cn('max-w-7xl mx-auto p-4', className)}>{children}</div>
	);
};
