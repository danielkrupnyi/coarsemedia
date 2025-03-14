import { getBlogPageData, getPosts } from '@/actions';
import { Container } from '@/components/container';
import { PostsGrid } from '@/components/posts-grid';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = 60;

export const metadata: Metadata = {
	title: 'Blog - Daniel Krupnyi',
	description:
		'Explore my thoughts, insights, and experiences in web development, focusing on Next.js, React, and modern web technologies.',
};

const BlogPage = async () => {
	const pageData = await getBlogPageData();
	const posts = await getPosts();

	return (
		<Container variant='secondary'>
			<div className='py-8 space-y-8'>
				<div className='space-y-2'>
					<h1 className='text-3xl font-bold'>{pageData?.title}</h1>
					<p className='text-muted-foreground'>{pageData?.subtitle}</p>
				</div>
				<PostsGrid posts={posts} />
				<Separator />
				<div className='flex justify-center'>
					<Button variant='secondary' asChild>
						<Link href={posts[0].source} target='_blank'>
							Watch More
						</Link>
					</Button>
				</div>
			</div>
		</Container>
	);
};

export default BlogPage;
