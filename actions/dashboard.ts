'use server';

import { auth } from '@/auth';
import { BlogPageSettings, Project, ProjectsPageTypes } from '@/types';
import { Pool } from '@neondatabase/serverless';
import slug from 'slug';

export const getHomePageSettings = async () => {
	const session = await auth();
	if (!session?.user) {
		throw new Error('Unauthorized');
	}

	const pool = new Pool({ connectionString: process.env.DATABASE_URL });

	try {
		const result = await pool.query<ProjectsPageTypes>(
			`SELECT title, subtitle FROM home_page_settings ORDER BY created_at DESC`
		);

		if (result.rows.length === 0) {
			throw new Error('Home page settings not found');
		}

		return result.rows[0];
	} catch (error) {
		console.error('Failed to fetch home page settings:', error);
		throw error;
	} finally {
		await pool.end();
	}
};

export const getProjectsPageSettings = async () => {
	const session = await auth();
	if (!session?.user) {
		throw new Error('Unauthorized');
	}

	const pool = new Pool({ connectionString: process.env.DATABASE_URL });

	try {
		const result = await pool.query<ProjectsPageTypes>(
			`SELECT title, subtitle FROM projects_page_settings ORDER BY created_at DESC`
		);

		if (result.rows.length === 0) {
			throw new Error('Projects page settings not found');
		}

		return result.rows[0];
	} catch (error) {
		console.error('Failed to fetch projects page settings:', error);
		throw error;
	} finally {
		await pool.end();
	}
};

export const getBlogPageSettings = async () => {
	const session = await auth();
	if (!session?.user) {
		throw new Error('Unauthorized');
	}

	const pool = new Pool({ connectionString: process.env.DATABASE_URL });

	try {
		const result = await pool.query<BlogPageSettings>(
			`SELECT display, title, subtitle FROM blog_page_settings ORDER BY created_at DESC`
		);

		if (result.rows.length === 0) {
			throw new Error('Blog page settings not found');
		}

		return result.rows[0];
	} catch (error) {
		console.error('Failed to fetch blog page settings:', error);
		throw error;
	} finally {
		await pool.end();
	}
};

export const updateHomePageSettings = async (data: ProjectsPageTypes) => {
	const session = await auth();
	if (!session?.user) {
		throw new Error('Unauthorized');
	}

	const pool = new Pool({ connectionString: process.env.DATABASE_URL });

	try {
		const result = await pool.query(
			`UPDATE home_page_settings
			 SET title = $1,
					 subtitle = $2,
					 updated_at = CURRENT_TIMESTAMP
			 WHERE id = (SELECT id FROM home_page_settings ORDER BY created_at DESC LIMIT 1)
			 RETURNING *`,
			[data.title, data.subtitle]
		);

		return result.rows[0];
	} catch (error) {
		console.error('Failed to update home page settings:', error);
		throw new Error('Failed to update home page settings');
	} finally {
		await pool.end();
	}
};

export const updateProjectsPageSettings = async (data: ProjectsPageTypes) => {
	const session = await auth();
	if (!session?.user) {
		throw new Error('Unauthorized');
	}

	const pool = new Pool({ connectionString: process.env.DATABASE_URL });

	try {
		const result = await pool.query(
			`UPDATE projects_page_settings
			 SET title = $1,
					 subtitle = $2,
					 updated_at = CURRENT_TIMESTAMP
			 WHERE id = (SELECT id FROM projects_page_settings ORDER BY created_at DESC LIMIT 1)
			 RETURNING *`,
			[data.title, data.subtitle]
		);

		return result.rows[0];
	} catch (error) {
		console.error('Failed to update projects page settings:', error);
		throw new Error('Failed to update projects page settings');
	} finally {
		await pool.end();
	}
};

export const updateBlogPageSettings = async (data: BlogPageSettings) => {
	const session = await auth();
	if (!session?.user) {
		throw new Error('Unauthorized');
	}

	const pool = new Pool({ connectionString: process.env.DATABASE_URL });

	try {
		const result = await pool.query(
			`UPDATE blog_page_settings
			 SET display = $1,
					 title = $2,
					 subtitle = $3,
					 updated_at = CURRENT_TIMESTAMP
			 WHERE id = (SELECT id FROM blog_page_settings ORDER BY created_at DESC LIMIT 1)
			 RETURNING *`,
			[data.display, data.title, data.subtitle]
		);

		return result.rows[0];
	} catch (error) {
		console.error('Failed to update blog page settings:', error);
		throw new Error('Failed to update blog page settings');
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
		const result = await pool.query<Project>(
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
			slug: slug(formData.get('title')?.toString() || ''),
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
		};

		const result = await pool.query(
			`UPDATE projects 
       SET title = $1, 
           description = $2, 
           stack = $3, 
           github_url = $4, 
           website_url = $5,
           updated_at = CURRENT_TIMESTAMP
       WHERE slug = $6 AND user_id = $7
       RETURNING *`,
			[
				values.title,
				values.description,
				values.stack,
				values.github_url,
				values.website_url,
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
