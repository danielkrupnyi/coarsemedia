import { auth } from '@/auth';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { FileCode, FolderCode, Globe, House, NotebookPen } from 'lucide-react';
import Link from 'next/link';
import { NavUser } from './nav-user';
import { ThemeToggle } from './ui/theme-toggle';

// Menu items.
const contentItems = [
	{
		title: 'Projects',
		url: '/dashboard/content/projects',
		icon: FileCode,
	},
];

const pagesList = [
	{
		title: 'Home',
		url: '/dashboard/pages/home',
		icon: House,
	},
	{
		title: 'Projects',
		url: '/dashboard/pages/projects',
		icon: FolderCode,
	},
	{
		title: 'Blog',
		url: '/dashboard/pages/blog',
		icon: NotebookPen,
	},
];

const otherlist = [
	{
		title: 'Open Website',
		url: '/',
		icon: Globe,
	},
];

export async function AppSidebar() {
	const session = await auth();

	return (
		<Sidebar>
			<SidebarHeader className='h-16 border-b border-sidebar-border'>
				<NavUser
					user={{
						name: session?.user?.name || 'admin',
						email: session?.user?.email || '',
					}}
				/>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Content</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{contentItems.map(item => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Pages</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{pagesList.map(item => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Other</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{otherlist.map(item => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url} target='_blank'>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<ThemeToggle />
			</SidebarFooter>
		</Sidebar>
	);
}
