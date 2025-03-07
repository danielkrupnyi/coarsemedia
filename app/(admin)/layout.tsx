import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ThemeProvider } from '@/components/theme-provider';
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import { geistMono, geistSans } from '@/fonts';
import { Separator } from '@radix-ui/react-separator';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import '../globals.css';

export const metadata: Metadata = {
	title: 'Daniel Krupnyi - Dashboard',
	description:
		'A web developer who likes to build websites, mostly using Next.js.',
};

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<SessionProvider>
						<SidebarProvider>
							<AppSidebar />
							<SidebarInset>
								<header className='flex sticky top-0 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b bg-background/80 backdrop-blur z-50'>
									<div className='flex items-center gap-2 px-4'>
										<SidebarTrigger className='-ml-1' />
										<Separator orientation='vertical' className='mr-2 h-4' />
										{/* <Breadcrumb>
											<BreadcrumbList>
												<BreadcrumbItem className='hidden md:block'>
													<BreadcrumbLink href='/dashboard'>
														Dashboard
													</BreadcrumbLink>
												</BreadcrumbItem>
												<BreadcrumbSeparator className='hidden md:block' />
												<BreadcrumbItem>
													<BreadcrumbPage>Data Fetching</BreadcrumbPage>
												</BreadcrumbItem>
											</BreadcrumbList>
										</Breadcrumb> */}
										<Breadcrumbs />
									</div>
								</header>
								<div className='w-full h-full relative'>{children}</div>
							</SidebarInset>
						</SidebarProvider>
					</SessionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
