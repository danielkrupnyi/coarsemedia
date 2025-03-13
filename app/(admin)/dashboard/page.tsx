import { Container } from '@/components/container';
import { TypingAnimation } from '@/components/magicui/typing-animation';

const DashboardPage = () => {
	return (
		<Container
			variant='dashboard'
			className='flex justify-center items-center h-full'
		>
			<div className='bg-background z-20'>
				<TypingAnimation as='h1' className='text-2xl'>
					Hello! Just open any item in the sidebar.
				</TypingAnimation>
			</div>
		</Container>
	);
};

export default DashboardPage;
