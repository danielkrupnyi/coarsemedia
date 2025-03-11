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
		<MasonryGrid animate={true} className='mb-16'>
			{projects
				? projects.map(project => (
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
								<Badge variant='secondary'>Next.js</Badge>
								<Badge variant='secondary'>Tailwindcss</Badge>
								<Badge variant='secondary'>secondary</Badge>
								<Badge variant='secondary'>secondary</Badge>
							</CardContent>
							<CardFooter className='flex gap-4'>
								{!project.website_hidden ||
									(project.website_url && (
										<Button variant='outline' asChild>
											<Link href={project.website_url}>
												<Globe />
												Website
											</Link>
										</Button>
									))}
								{!project.github_hidden ||
									(project.github_url && (
										<Button asChild>
											<Link href={project.github_url}>
												<Github />
												Github
											</Link>
										</Button>
									))}
							</CardFooter>
						</MotionCard>
				  ))
				: ''}
		</MasonryGrid>
	);
};
