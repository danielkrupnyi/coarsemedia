import { Container } from '@/components/container';
import { MasonryGrid } from '@/components/masonry-grid';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingProjects = () => {
	return (
		<Container>
			<div className='py-8 space-y-8'>
				<div className='space-y-2'>
					<Skeleton className='h-9 w-[200px]' />
					<Skeleton className='h-5 w-[300px]' />
				</div>
				<MasonryGrid className='mb-16'>
					{Array.from({ length: 6 }).map((_, i) => (
						<div
							key={i}
							className='group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow break-inside-avoid mb-4'
						>
							<div className='p-6'>
								<Skeleton className='h-6 w-2/3 mb-2' />
								<Skeleton className='h-4 w-full mb-4' />
								<div className='flex flex-wrap gap-2'>
									{Array.from({ length: 3 }).map((_, j) => (
										<Skeleton key={j} className='h-6 w-16' />
									))}
								</div>
							</div>
						</div>
					))}
				</MasonryGrid>
			</div>
		</Container>
	);
};

export default LoadingProjects;
