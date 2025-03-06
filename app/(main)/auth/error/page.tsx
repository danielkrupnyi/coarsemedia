import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AuthErrorPage() {
	return (
		<div className='flex h-full items-center justify-center'>
			<div className='text-center'>
				<h1 className='text-2xl font-bold text-destructive-foreground'>
					Authentication Error
				</h1>
				<p className='mt-2'>You are not authorized to access this site.</p>
				<Button
					variant='secondary'
					className='mt-4 w-full cursor-pointer'
					asChild
				>
					<Link href='/'>Go Back</Link>
				</Button>
			</div>
		</div>
	);
}
