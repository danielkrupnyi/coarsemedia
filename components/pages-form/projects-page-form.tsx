'use client';

import { updateProjectsPageSettings } from '@/actions/dashboard';
import { ProjectsPageTypes } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

interface ProjectsPageFormProps {
	pageData: ProjectsPageTypes;
}

export const ProjectsPageForm: FC<ProjectsPageFormProps> = ({ pageData }) => {
	const FormSchema = z.object({
		display: z.boolean().default(false),
		title: z.string().min(5),
		subtitle: z.string().min(5),
	});

	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			title: '',
			subtitle: '',
		},
	});

	useEffect(() => {
		if (pageData) {
			const { title, subtitle } = pageData;

			form.reset({
				title,
				subtitle,
			});
		}
	}, [pageData, form]);

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		try {
			await updateProjectsPageSettings(data);
			router.push('/dashboard');
			router.refresh();
		} catch (error) {}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='w-full md:w-2/5 md:mx-auto space-y-6'
			>
				<div>
					<h3 className='mb-4 text-lg font-medium'>Projects Page Settings</h3>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input
											placeholder='Page Title...'
											value={field.value}
											onChange={field.onChange}
										/>
									</FormControl>
									<FormDescription>
										This is your public title of projects page.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='subtitle'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Subtitle</FormLabel>
									<FormControl>
										<Input
											placeholder='Page Subtitle...'
											value={field.value}
											onChange={field.onChange}
										/>
									</FormControl>
									<FormDescription>
										This is your public subtitle of projects page.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				<div className='flex justify-between'>
					<Button type='submit' className='cursor-pointer'>
						Save Settings
					</Button>
				</div>
			</form>
		</Form>
	);
};
