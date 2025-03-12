'use server';

import {
	BlogPageTypes,
	HomePageTypes,
	Post,
	Project,
	ProjectsPageTypes,
} from '@/types';
import { Pool } from '@neondatabase/serverless';

export const getBlogPageDisplayStatus = async (): Promise<{
	display: boolean;
}> => {
	const pool = new Pool({ connectionString: process.env.DATABASE_URL });

	try {
		const result = await pool.query<{
			display: boolean;
		}>(`SELECT display FROM blog_page_settings;`);

		if (result.rows.length === 0) {
			throw new Error('Blog page display status not found');
		}

		return result.rows[0];
	} catch (error) {
		console.error('Feiled to fetch blog page display status:', error);
		return {
			display: true,
		};
	} finally {
		await pool.end();
	}
};

export const getHomePageData = async (): Promise<HomePageTypes | null> => {
	const pool = new Pool({ connectionString: process.env.DATABASE_URL });

	try {
		const result = await pool.query<HomePageTypes>(
			`SELECT title, subtitle FROM home_page_settings;`
		);

		if (result.rows.length === 0) {
			throw new Error('Home page data not found');
		}

		return result.rows[0];
	} catch (error) {
		console.error('Feiled to fetch home page data:', error);
		return null;
	} finally {
		await pool.end();
	}
};

export const getProjectsPageData =
	async (): Promise<ProjectsPageTypes | null> => {
		const pool = new Pool({ connectionString: process.env.DATABASE_URL });

		try {
			const result = await pool.query<ProjectsPageTypes>(
				`SELECT title, subtitle FROM projects_page_settings;`
			);

			if (result.rows.length === 0) {
				throw new Error('Projects page data not found');
			}

			return result.rows[0];
		} catch (error) {
			console.error('Feiled to fetch projects page data:', error);
			return null;
		} finally {
			await pool.end();
		}
	};

export const getProjects = async () => {
	const pool = new Pool({ connectionString: process.env.DATABASE_URL });

	try {
		const result = await pool.query<Project>(
			`SELECT * FROM projects ORDER BY created_at DESC`
		);
		return result.rows;
	} catch (error) {
		console.error('Database query failed:', error);
		return [];
	} finally {
		await pool.end();
	}
};

export const getBlogPageData = async (): Promise<BlogPageTypes | null> => {
	const pool = new Pool({ connectionString: process.env.DATABASE_URL });

	try {
		const result = await pool.query<BlogPageTypes>(
			`SELECT display, title, subtitle FROM blog_page_settings`
		);

		if (result.rows.length === 0) {
			throw new Error('Blog page data not found');
		}

		return result.rows[0] ?? null;
	} catch (error) {
		console.error('Feiled to fetch blog page data:', error);
		return null;
	} finally {
		await pool.end();
	}
};

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
