import { Container } from '@/components/container';

const BlogPage = async () => {
	// const pageData = await getBlogPageData();
	// const posts = await getPosts();

	return (
		<Container variant='secondary'>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo
			voluptatibus id ipsa consequatur? Porro aliquam repellendus, iste ad iusto
			adipisci placeat? Illo dolorem nemo sit voluptates repellat, neque maxime
			laboriosam.
			{/* <div className='py-8 space-y-8'>
				<div className='space-y-2'>
					<h1 className='text-3xl font-bold'>{pageData?.title}</h1>
					<p className='text-muted-foreground'>{pageData?.subtitle}</p>
				</div>
				<PostsGrid posts={posts} />
				<Separator />
				<div className='flex justify-center'>
					<Button variant='link' asChild>
						<Link href={posts[0].source} target='_blank'>
							Watch More
						</Link>
					</Button>
				</div>
			</div> */}
		</Container>
	);
};

export default BlogPage;
