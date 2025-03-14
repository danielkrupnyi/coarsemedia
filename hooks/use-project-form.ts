import { createProject, deleteProject, updateProject } from '@/actions';
import {
	projectFormSchema,
	ProjectFormValues,
} from '@/lib/schemas/project-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface UseProjectFormProps {
	defaultValues?: any;
	variant?: 'update';
}

export const useProjectForm = ({
	defaultValues,
	variant,
}: UseProjectFormProps) => {
	const router = useRouter();
	const form = useForm<ProjectFormValues>({
		resolver: zodResolver(projectFormSchema),
		defaultValues: {
			title: '',
			description: '',
			stack: '',
			website: '',
			github: '',
		},
	});

	useEffect(() => {
		if (defaultValues && variant === 'update') {
			const { title, description, stack, website_url, github_url } =
				defaultValues;

			form.reset({
				title,
				description,
				stack: Array.isArray(stack) ? stack.join(', ') : stack,
				website: website_url,
				github: github_url,
			});
		}
	}, [defaultValues, form, variant]);

	const handleSubmit = async (values: ProjectFormValues) => {
		try {
			console.log('');
			const formData = new FormData();
			Object.entries(values).forEach(([key, value]) => {
				formData.append(key, value);
			});

			if (variant === 'update') {
				const slug = defaultValues?.slug;
				if (!slug) throw new Error('No slug provided');
				await updateProject(slug, formData);
			} else {
				await createProject(formData);
			}

			router.push('/dashboard/content/projects');
			router.refresh();
		} catch (error) {
			console.error(
				`Failed to ${variant === 'update' ? 'update' : 'create'} project:`,
				error
			);
		}
	};

	const handleDelete = async (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			const slug = defaultValues?.slug;
			if (!slug) throw new Error('No slug provided');

			const confirmed = window.confirm(
				'Are you sure you want to delete this project?'
			);
			if (!confirmed) return;

			await deleteProject(slug);
			router.push('/dashboard/content/projects');
			router.refresh();
		} catch (error) {
			console.error('Failed to delete project:', error);
		}
	};

	return { form, handleSubmit, handleDelete };
};
