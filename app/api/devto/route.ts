import { NextResponse } from 'next/server';

interface DevToArticle {
	id: number;
	title: string;
	description: string;
	url: string;
	published_at: string;
	tag_list: string[];
	reading_time_minutes: number;
	cover_image: string | null;
	user: {
		username: string;
	};
}

export async function GET() {
	try {
		const apiKey = process.env.DEVTO_API_KEY;
		const apiPath = process.env.DEVTO_PATH;

		if (!apiKey || !apiPath) {
			return NextResponse.json(
				{ error: 'API configuration is missing' },
				{ status: 500 }
			);
		}

		const res = await fetch(`${apiPath}/articles/me/published?per_page=9`, {
			headers: {
				'api-key': apiKey,
				'Content-Type': 'application/json',
			},
			next: { revalidate: 3600 },
		});

		if (!res.ok) {
			return NextResponse.json(
				{ error: 'Failed to fetch from DevTo API' },
				{ status: res.status }
			);
		}

		const articles: DevToArticle[] = await res.json();
		const sourcePath = articles[0].url.slice(
			0,
			articles[0].url.indexOf(articles[0].user.username)
		);

		const formattedArticles = articles.map(article => ({
			id: article.id,
			title: article.title,
			description: article.description,
			url: article.url,
			published_at: article.published_at,
			tag_list: article.tag_list,
			reading_time_minutes: article.reading_time_minutes,
			cover_image: article.cover_image,
			source: `${sourcePath}${article.user.username}`,
		}));

		return NextResponse.json(formattedArticles, {
			status: 200,
			headers: {
				'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
			},
		});
	} catch (error) {
		console.error('DevTo API Error:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
