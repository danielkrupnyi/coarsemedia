'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { Input } from './ui/input';

import { createProject } from '@/actions';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

const formSchema = z.object({
	title: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
	description: z.string().min(20, {
		message: 'Username must be at least 20 characters.',
	}),
	stack: z.string().min(3, {
		message: 'Username must be at least 3 characters.',
	}),
	website: z.string().url().optional().or(z.literal('')),
	websiteHidden: z.boolean(),
	github: z.string().url().optional().or(z.literal('')),
	githubHidden: z.boolean(),
});

export const NewProjectForm = () => {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			stack: '',
			website: '',
			websiteHidden: false,
			github: '',
			githubHidden: false,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const formData = new FormData();
			Object.entries(values).forEach(([key, value]) => {
				formData.append(
					key,
					typeof value === 'boolean' ? value.toString() : value
				);
			});

			await createProject(formData);
			router.push('/dashboard/content/projects');
			router.refresh();
		} catch (error) {
			console.error('Failed to create project:', error);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder='Project Name...' {...field} />
							</FormControl>
							<FormDescription>
								This is your public title of your project.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input placeholder='Some Description...' {...field} />
							</FormControl>
							<FormDescription>
								This is description of your project.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='stack'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Stack</FormLabel>
							<FormControl>
								<Input
									placeholder='Next.js, React.js, TypeScript...'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is a stack of technologies that was using in your project.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='website'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Website Link</FormLabel>
							<FormControl>
								<Input placeholder='https://...' {...field} />
							</FormControl>
							<FormDescription>
								This is website link of your project.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='websiteHidden'
					render={({ field }) => (
						<FormItem className='flex items-center'>
							<FormControl>
								<Checkbox
									required={false}
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormDescription>Website Hidden</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='github'
					render={({ field }) => (
						<FormItem className='flex-1'>
							<FormLabel>Github Link</FormLabel>
							<FormControl>
								<Input
									placeholder='https://github.com/user/project-name...'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is github link of your project.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='githubHidden'
					render={({ field }) => (
						<FormItem className='flex items-center'>
							<FormControl>
								<Checkbox
									required={false}
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormDescription>Github Hidden</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='cursor-pointer'>
					Create Entry
				</Button>
			</form>
		</Form>
	);
};
