'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		await signIn('resend', {
			email,
			callbackUrl: '/dashboard',
		});

		setLoading(false);
	};

	return (
		<div className='flex h-full items-center justify-center'>
			<div className='w-full max-w-md space-y-8 p-8'>
				<h2 className='text-center text-3xl font-bold'>Sign in</h2>
				<form onSubmit={handleSubmit} className='mt-8 space-y-6'>
					<Input
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder='Enter your email'
						required
						className='w-full rounded-lg border p-3'
					/>
					<Button
						type='submit'
						disabled={loading}
						className='w-full cursor-pointer'
					>
						{loading ? 'Sending link...' : 'Sign in'}
					</Button>
				</form>
			</div>
		</div>
	);
}
