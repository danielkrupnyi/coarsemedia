'use client';

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';

import { useProjectForm } from '@/hooks/use-project-form';
import { Project } from '@/types';
import { FC } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface ProjectFormProps {
	defaultValues?: Project;
	variant?: 'update';
}

export const NewProjectForm: FC<ProjectFormProps> = ({
	variant,
	defaultValues,
}) => {
	const { form, handleSubmit, handleDelete } = useProjectForm({
		defaultValues,
		variant,
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
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
								<Textarea placeholder='Some Description...' {...field} />
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
				<div className='flex justify-between'>
					<Button type='submit' className='cursor-pointer'>
						{variant === 'update' ? 'Update Project' : 'Create Project'}
					</Button>
					{variant === 'update' && (
						<Button
							onClick={handleDelete}
							type='button'
							variant='destructive'
							className='cursor-pointer'
						>
							Delete Project
						</Button>
					)}
				</div>
			</form>
		</Form>
	);
};
