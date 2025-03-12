'use client';

import { updateBlogPageSettings } from '@/actions/dashboard';
import { BlogPageSettings } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import { Switch } from '../ui/switch';

interface BlogPageFormProps {
	pageData: BlogPageSettings;
}

export const BlogPageForm: FC<BlogPageFormProps> = ({ pageData }) => {
	const FormSchema = z.object({
		display: z.boolean().default(false),
		title: z.string().min(5),
		subtitle: z.string().min(5),
		devto: z.string().url(),
	});

	console.log(zodResolver(FormSchema));

	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			display: true,
			title: '',
			subtitle: '',
		},
	});

	useEffect(() => {
		if (pageData) {
			const { title, subtitle, display } = pageData;

			form.reset({
				title,
				subtitle,
				display,
			});
		}
	}, [pageData, form]);

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		try {
			await updateBlogPageSettings(data);
			toast.success('Blog page settings updated successfully');

			router.push('/dashboard');
			router.refresh();
		} catch (error) {
			toast.error('Failed to update blog page settings');
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='w-full md:w-2/5 md:mx-auto space-y-6'
			>
				<div>
					<h3 className='mb-4 text-lg font-medium'>Blog Page Settings</h3>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='display'
							render={({ field }) => (
								<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
									<div className='space-y-0.5'>
										<FormLabel className='text-base'>Display Page</FormLabel>
										<FormDescription>
											Choose to display blog page and it's icon on navbar
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
											className='cursor-pointer'
										/>
									</FormControl>
								</FormItem>
							)}
						/>
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
										This is your public title of blog page.
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
										This is your public subtitle of blog page.
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
