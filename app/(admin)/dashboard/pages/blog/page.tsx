import { getBlogPageSettings } from '@/actions/dashboard';
import { Container } from '@/components/container';
import { BlogPageForm } from '@/components/pages-form/blog-page-form';

const PagesBlogPage = async () => {
	const pageData = await getBlogPageSettings();

	return (
		<Container variant='dashboard'>
			<BlogPageForm pageData={pageData} />
		</Container>
	);
};

export default PagesBlogPage;
