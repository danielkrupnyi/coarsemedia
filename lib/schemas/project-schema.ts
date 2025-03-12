import { z } from 'zod';

export const projectFormSchema = z.object({
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
	github: z.string().url().optional().or(z.literal('')),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
