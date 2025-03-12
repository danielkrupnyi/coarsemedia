import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';

export default function Loading() {
	return (
		<AnimatedGridPattern
			numSquares={30}
			maxOpacity={0.1}
			duration={3}
			repeatDelay={1}
		/>
	);
}
