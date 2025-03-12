import { getHomePageData } from '@/actions';
import { Container } from '@/components/container';
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { TextAnimate } from '@/components/magicui/text-animate';
import Logo from '@/components/ui/logo';

const HomePage = async () => {
	const pageData = await getHomePageData();

	return (
		<>
			<AnimatedGridPattern
				numSquares={30}
				maxOpacity={0.1}
				duration={3}
				repeatDelay={1}
			/>
			<div className='absolute inset-0 z-20 h-full w-full flex items-center'>
				<Container className='flex flex-1 justify-between items-center'>
					<div>
						<TextAnimate
							animation='blurInUp'
							by='word'
							as='h1'
							once
							className='text-4xl font-bold mb-8'
						>
							{pageData?.title || ''}
						</TextAnimate>
						<TextAnimate
							animation='blurInUp'
							by='word'
							as='h2'
							once
							className='text-xl max-w-[450px]'
						>
							{pageData?.subtitle || ''}
						</TextAnimate>
					</div>
					<Logo />
				</Container>
			</div>
		</>
	);
};

export default HomePage;
