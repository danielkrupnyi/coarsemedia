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
import { motion } from 'framer-motion';
import { Github, Globe } from 'lucide-react';
import Link from 'next/link';

const MotionCard = motion(Card);

export const ProjectsGrid = () => {
	return (
		<MasonryGrid animate={true} className='mb-16'>
			<MotionCard
				variants={fadeInUp}
				className='h-full bg-background break-inside-avoid mb-4'
			>
				<CardHeader>
					<CardTitle>Climbing Shoes Store</CardTitle>
					<CardDescription>
						Climbing Shoes Store created using Next.js and Monogo DB.
					</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-wrap gap-1'>
					<Badge variant='secondary'>Next.js</Badge>
					<Badge variant='secondary'>Tailwindcss</Badge>
					<Badge variant='secondary'>secondary</Badge>
					<Badge variant='secondary'>secondary</Badge>
				</CardContent>
				<CardFooter className='flex gap-4'>
					<Button variant='outline' asChild>
						<Link href='/'>
							<Globe />
							Website
						</Link>
					</Button>
					<Button asChild>
						<Link href='/'>
							<Github />
							Github
						</Link>
					</Button>
				</CardFooter>
			</MotionCard>
		</MasonryGrid>
	);
};
