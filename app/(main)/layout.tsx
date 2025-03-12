import { ThemeProvider } from '@/components/theme-provider';
import { CustomDock } from '@/components/ui/custom-dock';
import { geistMono, geistSans } from '@/fonts';
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
	title: 'Daniel Krupnyi - Web Developer',
	description:
		'A web developer who likes to build websites, mostly using Next.js.',
};

export default function RootLayout({
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
					<div className='relative w-screen h-screen p-1'>
						<div className='relative w-full h-full overflow-auto rounded-lg border'>
							{children}
						</div>
					</div>
					<CustomDock />
				</ThemeProvider>
			</body>
		</html>
	);
}
