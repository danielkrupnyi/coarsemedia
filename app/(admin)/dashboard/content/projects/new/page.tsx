import { Container } from '@/components/container';
import { NewProjectForm } from '@/components/new-project-form';

const CreateNewProjectPage = () => {
	return (
		<Container variant='dashboard'>
			<NewProjectForm title='Create New Project' />
		</Container>
	);
};

export default CreateNewProjectPage;
