import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';
import { AnimatedGridPattern } from './magicui/animated-grid-pattern';

interface ContainerProps {
	children: ReactNode;
	className?: string;
	variant?: 'dashboard' | 'secondary';
}

export const Container: FC<ContainerProps> = ({
	children,
	className,
	variant,
}) => {
	return (
		<>
			{variant !== 'dashboard' && (
				<AnimatedGridPattern
					numSquares={30}
					maxOpacity={0.1}
					duration={3}
					repeatDelay={1}
					className={cn(
						variant === 'secondary' &&
							'[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]'
					)}
				/>
			)}

			<div
				className={cn(
					'relative',
					variant === 'dashboard'
						? 'pt-6 pb-12 px-6'
						: 'max-w-7xl mx-auto px-4 pt-4 pb-24',
					className
				)}
			>
				{children}
			</div>
		</>
	);
};
