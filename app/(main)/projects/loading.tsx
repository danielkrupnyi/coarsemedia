import { Container } from '@/components/container';
import { MasonryGrid } from '@/components/masonry-grid';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingProjects = () => {
	return (
		<Container variant='secondary'>
			<div className='py-8 space-y-8'>
				<div className='space-y-2'>
					<Skeleton className='h-9 w-[200px]' />
					<Skeleton className='h-5 w-[300px]' />
				</div>
				<MasonryGrid className='mb-16'>
					{Array.from({ length: 6 }).map((_, i) => (
						<Card
							key={i}
							className='h-full bg-background break-inside-avoid mb-4'
						>
							<CardHeader>
								<CardTitle>
									<Skeleton className='h-6 w-2/3' />
								</CardTitle>
								<CardDescription>
									<div className='flex flex-wrap gap-2'>
										{Array.from({ length: 3 }).map((_, j) => (
											<Skeleton key={j} className='h-2 w-full' />
										))}
									</div>
								</CardDescription>
							</CardHeader>
							<CardContent className='flex flex-wrap gap-2'>
								{Array.from({ length: 4 }).map((_, j) => (
									<Skeleton key={j} className='h-6 w-16' />
								))}
							</CardContent>
							<CardFooter className='flex gap-4'>
								<Skeleton className='h-8 w-24' />
								<Skeleton className='h-8 w-24' />
							</CardFooter>
						</Card>
					))}
				</MasonryGrid>
			</div>
		</Container>
	);
};

export default LoadingProjects;
