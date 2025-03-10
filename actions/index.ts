'use server';

import { auth } from '@/auth';
import { Post, Project } from '@/types';
import { Pool } from '@neondatabase/serverless';

export async function getPosts(): Promise<Post[]> {
	try {
		const res = await fetch(`${process.env.SITE_PATH}/api/devto`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			next: { revalidate: 3600 },
		});

		if (!res.ok) {
			throw new Error('Failed to fetch posts');
		}

		return res.json();
	} catch (error) {
		console.error('Error fetching posts:', error);
		return [];
	}
}

export const getProjectsData = async () => {
	const pool = new Pool({ connectionString: process.env.DATABASE_URL });

	try {
		const result = await pool.query<Project>(`
      SELECT 
        id,
        user_id as "userId",
        slug,
        title,
        description,
        status,
        stack,
        github_url,
        website_url,
        created_at,
        updated_at
      FROM projects
      ORDER BY created_at DESC
    `);
		return result.rows;
	} catch (error) {
		console.error('Database query failed:', error);
		return [];
	} finally {
		await pool.end();
	}
};

export async function createProject(formData: FormData) {
	const session = await auth();
	if (!session?.user) {
		throw new Error('Unauthorized');
	}

	const pool = new Pool({ connectionString: process.env.DATABASE_URL });

	try {
		const values = {
			user_id: session.user.id,
			title: formData.get('title'),
			description: formData.get('description'),
			slug: formData
				.get('title')
				?.toString()
				.toLowerCase()
				.replace(/\s+/g, '-'),
			stack: formData
				.get('stack')
				?.toString()
				.split(',')
				.map(s => s.trim()),
			status: 'draft',
			github_url: formData.get('github') || '',
			website_url: formData.get('website') || '',
		};

		const result = await pool.query<Project>(
			`INSERT INTO projects (
        user_id, title, description, slug, stack, 
        status, github_url, website_url
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8
      ) RETURNING *`,
			[
				values.user_id,
				values.title,
				values.description,
				values.slug,
				values.stack,
				values.status,
				values.github_url,
				values.website_url,
			]
		);

		return result.rows[0];
	} catch (error) {
		console.error('Failed to create project:', error);
		throw new Error('Failed to create project');
	} finally {
		await pool.end();
	}
}
