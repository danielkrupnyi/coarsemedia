'use server';

import { auth } from '@/auth';
import { Post, Project } from '@/types';
import { Pool } from '@neondatabase/serverless';

export const getPosts = async (): Promise<Post[]> => {
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
};

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

export const getProject = async (slug: string) => {
	const session = await auth();
	if (!session?.user) {
		throw new Error('Unauthorized');
	}

	const pool = new Pool({ connectionString: process.env.DATABASE_URL });

	try {
		const result = await pool.query(
			`SELECT * FROM projects WHERE slug = $1 AND user_id = $2`,
			[slug, session.user.id]
		);

		if (result.rows.length === 0) {
			throw new Error('Project not found');
		}

		return result.rows[0];
	} catch (error) {
		console.error('Failed to fetch project:', error);
		throw error;
	} finally {
		await pool.end();
	}
};

export const getAllProjects = async () => {
	const session = await auth();
	if (!session?.user) {
		throw new Error('Unauthorized');
	}

	const pool = new Pool({ connectionString: process.env.DATABASE_URL });

	try {
		const result = await pool.query<Project>(
			`SELECT * FROM projects ORDER BY created_at DESC`
		);

		if (result.rows.length === 0) {
			throw new Error('Projects not found');
		}

		return result.rows;
	} catch (error) {
		console.error('Failed to fetch projects:', error);
		throw error;
	} finally {
		await pool.end();
	}
};

export const createProject = async (formData: FormData) => {
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
};

export const updateProject = async (slug: string, formData: FormData) => {
	const session = await auth();
	if (!session?.user) {
		throw new Error('Unauthorized');
	}

	const pool = new Pool({ connectionString: process.env.DATABASE_URL });

	try {
		const values = {
			title: formData.get('title'),
			description: formData.get('description'),
			stack: formData
				.get('stack')
				?.toString()
				.split(',')
				.map(s => s.trim()),
			github_url: formData.get('github') || '',
			website_url: formData.get('website') || '',
			github_hidden: formData.get('githubHidden') === 'true',
			website_hidden: formData.get('websiteHidden') === 'true',
		};

		const result = await pool.query(
			`UPDATE projects 
       SET title = $1, 
           description = $2, 
           stack = $3, 
           github_url = $4, 
           website_url = $5,
           github_hidden = $6,
           website_hidden = $7,
           updated_at = CURRENT_TIMESTAMP
       WHERE slug = $8 AND user_id = $9
       RETURNING *`,
			[
				values.title,
				values.description,
				values.stack,
				values.github_url,
				values.website_url,
				values.github_hidden,
				values.website_hidden,
				slug,
				session.user.id,
			]
		);

		if (result.rowCount === 0) {
			throw new Error('Project not found or unauthorized');
		}

		return result.rows[0];
	} catch (error) {
		console.error('Failed to update project:', error);
		throw error;
	} finally {
		await pool.end();
	}
};

export const deleteProject = async (slug: string) => {
	const session = await auth();
	if (!session?.user) {
		throw new Error('Unauthorized');
	}

	const pool = new Pool({ connectionString: process.env.DATABASE_URL });

	try {
		const result = await pool.query(
			'DELETE FROM projects WHERE slug = $1 AND user_id = $2 RETURNING *',
			[slug, session.user.id]
		);

		if (result.rowCount === 0) {
			throw new Error('Project not found or unauthorized');
		}

		return result.rows[0];
	} catch (error) {
		console.error('Failed to delete project:', error);
		throw error;
	} finally {
		await pool.end();
	}
};
