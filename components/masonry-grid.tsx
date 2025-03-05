import { exit, stagger } from '@/animations';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

interface MasonryGridProps {
	children: ReactNode;
	className?: string;
}

export const MasonryGrid: FC<MasonryGridProps> = ({ children, className }) => {
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
};
