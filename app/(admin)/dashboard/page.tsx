import { auth } from '@/auth';
import { Container } from '@/components/container';

const DashboardPage = async () => {
	const session = await auth();

	console.log(session);

	return (
		<div>
			<Container>
				<h1 className='text-2xl font-bold'>DashboardPage</h1>
				<span>{session?.user?.email}</span>
			</Container>
		</div>
	);
};

export default DashboardPage;
