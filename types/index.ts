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
	source: string;
};

export interface BlogPageSettings extends BlogPageTypes {
	display: boolean;
}

export interface HomePageTypes {
	title: string;
	subtitle: string;
}

export interface BlogPageTypes {
	title: string;
	subtitle: string;
}

export interface ProjectsPageTypes {
	title: string;
	subtitle: string;
}

export interface Project {
	id?: string;
	user_id?: number;
	slug?: string;
	title: string;
	description: string;
	stack: string[] | [];
	website_url?: string;
	github_url?: string;
	github_hidden: boolean;
	website_hidden: boolean;
	created_at?: object;
	updated_at?: object;
}
