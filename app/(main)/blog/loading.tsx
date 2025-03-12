import { Container } from '@/components/container';
import { MasonryGrid } from '@/components/masonry-grid';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<Container variant='secondary'>
			<div className='py-8 space-y-8'>
				<div className='space-y-2'>
					<Skeleton className='h-9 w-48' />
					<Skeleton className='h-5 w-96' />
				</div>

				<MasonryGrid>
					{Array.from({ length: 6 }).map((_, i) => (
						<Card
							key={i}
							className='flex flex-col pt-0 break-inside-avoid mb-4'
						>
							<div className='relative aspect-video'>
								<Skeleton className='absolute inset-0 rounded-t-lg' />
							</div>
							<CardHeader>
								<Skeleton className='h-6 w-full mb-2' />
								<Skeleton className='h-4 w-full' />
								<Skeleton className='h-4 w-2/3' />
							</CardHeader>
							<CardContent className='flex-grow'>
								<div className='flex gap-2'>
									<Skeleton className='h-5 w-16' />
									<Skeleton className='h-5 w-16' />
									<Skeleton className='h-5 w-16' />
								</div>
							</CardContent>
							<CardFooter className='flex justify-between'>
								<Skeleton className='h-4 w-20' />
								<Skeleton className='h-4 w-24' />
							</CardFooter>
						</Card>
					))}
				</MasonryGrid>
			</div>
		</Container>
	);
}
