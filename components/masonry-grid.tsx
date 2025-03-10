import { exit, stagger } from '@/animations';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

interface MasonryGridProps {
	children: ReactNode;
	className?: string;
	animate?: boolean;
}

export const MasonryGrid: FC<MasonryGridProps> = ({
	children,
	className,
	animate,
}) => {
	if (animate) {
		return (
			<motion.section
				exit={exit}
				initial='initial'
				animate='animate'
				variants={stagger}
				className={cn('columns-1 sm:columns-2 lg:columns-3 gap-4', className)}
			>
				{children}
			</motion.section>
		);
	}

	return (
		<section
			className={cn('columns-1 sm:columns-2 lg:columns-3 gap-4', className)}
		>
			{children}
		</section>
	);
};
