'use client';

import { fadeInUp } from '@/animations';
import { ImgPlaceholder } from '@/lib/utils';
import { Post } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';
import { MasonryGrid } from './masonry-grid';
import { Badge } from './ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';

const MotionCard = motion.create(Card);

export const PostsGrid: FC<{ posts: Post[] }> = ({ posts }) => {
	const { toBase64, shimmer } = ImgPlaceholder;

	return (
		<MasonryGrid animate={true}>
			{posts.map(post => (
				<MotionCard
					variants={fadeInUp}
					className='flex flex-col pt-0 break-inside-avoid mb-4'
					key={post.id}
				>
					{post.cover_image && (
						<div className='relative aspect-video'>
							<Image
								src={post.cover_image}
								alt={post.title}
								fill
								placeholder='blur'
								blurDataURL={`data:image/svg+xml;base64,${toBase64(
									shimmer(700, 475)
								)}`}
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								className='object-cover object-center rounded-t-lg'
							/>
						</div>
					)}
					<CardHeader className={post.cover_image ? '' : 'mt-6'}>
						<CardTitle className='line-clamp-2'>
							<a
								href={post.url}
								target='_blank'
								rel='noopener noreferrer'
								className='hover:underline'
							>
								{post.title}
							</a>
						</CardTitle>
						<CardDescription className='line-clamp-3'>
							{post.description}
						</CardDescription>
					</CardHeader>
					<CardContent className='flex-grow'>
						<div className='flex flex-wrap gap-2'>
							{post.tag_list.map(tag => (
								<Badge key={tag} variant='secondary'>
									{tag}
								</Badge>
							))}
						</div>
					</CardContent>
				</MotionCard>
			))}
		</MasonryGrid>
	);
};
