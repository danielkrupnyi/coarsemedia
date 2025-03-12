import { getProjectsData, getProjectsPageData } from '@/actions';
import { Container } from '@/components/container';
import { ProjectsGrid } from '@/components/projects-grid';

const ProjectsPage = async () => {
	const pageData = await getProjectsPageData();
	const projects = await getProjectsData();

	return (
		<Container>
			<div className='py-8 space-y-8'>
				<div className='space-y-2'>
					<h1 className='text-3xl font-bold'>{pageData?.title}</h1>
					<p className='text-muted-foreground'>{pageData?.subtitle}</p>
				</div>
				<ProjectsGrid projects={projects} />
			</div>
		</Container>
	);
};

export default ProjectsPage;
