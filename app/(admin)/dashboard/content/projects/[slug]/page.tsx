import { getProject } from '@/actions';
import { Container } from '@/components/container';
import { NewProjectForm } from '@/components/new-project-form';
import { Card, CardContent } from '@/components/ui/card';
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
			<div className='flex justify-center'>
				<Card className='w-2/5'>
					<CardContent>
						<NewProjectForm variant='update' defaultValues={project} />
					</CardContent>
				</Card>
			</div>
		</Container>
	);
};

export default ContentProjectSlugPage;
