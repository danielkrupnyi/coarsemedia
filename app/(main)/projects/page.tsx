import { getAllProjects } from '@/actions';
import { Container } from '@/components/container';
import { ProjectsGrid } from '@/components/projects-grid';

const ProjectsPage = async () => {
	const projects = await getAllProjects();

	return (
		<Container>
			<h1 className='text-4xl mb-8'>Check out my latest work</h1>
			<ProjectsGrid projects={projects} />
		</Container>
	);
};

export default ProjectsPage;
