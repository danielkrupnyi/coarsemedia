export type Post = {
	id: number;
	title: string;
	description: string;
	url: string;
	slug: string;
	published_at: string;
	tag_list: string[];
	body_markdown: string;
	cover_image: string;
};

export type Project = {
	id: string;
	userId: number;
	slug: string;
	title: string;
	description: string;
	status: 'published' | 'draft';
	stack: string[];
	github_url: string;
	website_url: string;
};
