import { getHomePageSettings } from '@/actions/dashboard';
import { Container } from '@/components/container';
import { HomePageForm } from '@/components/pages-form/home-page-form';

const PagesHomePage = async () => {
	const pageData = await getHomePageSettings();

	return (
		<Container variant='dashboard'>
			<HomePageForm pageData={pageData} />
		</Container>
	);
};

export default PagesHomePage;
