import { getPosts } from '@/actions';
import { Container } from '@/components/container';
import { PostsGrid } from '@/components/posts-grid';

const BlogPage = async () => {
	const posts = await getPosts();

	return (
		<Container>
			<div className='py-8 space-y-8'>
				<div className='space-y-2'>
					<h1 className='text-3xl font-bold'>Blog Posts</h1>
					<p className='text-muted-foreground'>
						Articles about web development, React, and Next.js
					</p>
				</div>
				<PostsGrid posts={posts} />
			</div>
		</Container>
	);
};

export default BlogPage;
