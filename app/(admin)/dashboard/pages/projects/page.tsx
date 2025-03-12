import { getProjectsPageSettings } from '@/actions/dashboard';
import { Container } from '@/components/container';
import { ProjectsPageForm } from '@/components/pages-form/projects-page-form';

const PagesProjectsPage = async () => {
	const pageData = await getProjectsPageSettings();

	return (
		<Container variant='dashboard'>
			<ProjectsPageForm pageData={pageData} />
		</Container>
	);
};

export default PagesProjectsPage;
