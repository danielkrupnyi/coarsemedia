import { getProject } from '@/actions';
import { Container } from '@/components/container';
import { NewProjectForm } from '@/components/new-project-form';
import { Project } from '@/types';
import { FC } from 'react';

interface ContentProjectSlugPageProps {
	params: Promise<{ slug: string }>;
}

const ContentProjectSlugPage: FC<ContentProjectSlugPageProps> = async ({
	params,
}) => {
	const { slug } = await params;
	const project: Project = await getProject(slug);

	return (
		<Container variant='dashboard'>
			<NewProjectForm
				variant='update'
				defaultValues={project}
				title='project settings'
			/>
		</Container>
	);
};

export default ContentProjectSlugPage;
