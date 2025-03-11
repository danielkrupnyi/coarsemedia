import { Container } from '@/components/container';
import { NewProjectForm } from '@/components/new-project-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CreateNewProjectPage = () => {
	return (
		<Container variant='dashboard'>
			<div className='flex justify-center'>
				<Card className='w-2/5'>
					<CardHeader>
						<CardTitle className='text-xl font-bold capitalize'>
							Create project
						</CardTitle>
					</CardHeader>
					<CardContent>
						<NewProjectForm />
					</CardContent>
				</Card>
			</div>
		</Container>
	);
};

export default CreateNewProjectPage;
