'use client';

import { fadeInUp } from '@/animations';
import { MasonryGrid } from '@/components/masonry-grid';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Project } from '@/types';
import { motion } from 'framer-motion';
import { Github, Globe } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

const MotionCard = motion.create(Card);

interface ProjectsGridProps {
	projects: Project[];
}

export const ProjectsGrid: FC<ProjectsGridProps> = ({ projects }) => {
	return (
		<>
			{projects && (
				<MasonryGrid animate={true} className='mb-16'>
					{projects.map(project => (
						<MotionCard
							key={project.id}
							variants={fadeInUp}
							className='h-full bg-background break-inside-avoid mb-4'
						>
							<CardHeader>
								<CardTitle>{project.title}</CardTitle>
								<CardDescription>{project.description}</CardDescription>
							</CardHeader>
							<CardContent className='flex flex-wrap gap-1'>
								{project.stack.map(item => (
									<Badge variant='secondary' key={item}>
										{item}
									</Badge>
								))}
							</CardContent>
							<CardFooter className='flex gap-4'>
								{project.website_url && (
									<Button variant='outline' asChild>
										<Link href={project.website_url || ''} target='_blank'>
											<Globe />
											Website
										</Link>
									</Button>
								)}
								{project.github_url && (
									<Button variant='outline' asChild>
										<Link href={project.github_url || ''} target='_blank'>
											<Github />
											Github
										</Link>
									</Button>
								)}
							</CardFooter>
						</MotionCard>
					))}
				</MasonryGrid>
			)}
		</>
	);
};
