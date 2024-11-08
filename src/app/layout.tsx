import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import { ThemeProvider } from '@/components/Theme/theme-provider';
import Provider from '@/lib/trpc/Provider';

export const metadata: Metadata = {
  title: 'CaMOOra',
  description: 'Student Photoshoot Marketplace',
  icons: {
    icon: '/favicon/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="icon"
            type="image/png"
            href="/favicon/favicon-48x48.png"
            sizes="48x48"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.favicon.svg" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <meta name="apple-mobile-web-app-title" content="caMOOra" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
        </head>
        <body className="flex min-h-screen flex-col items-center">
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NavBar />
              <div className="flex flex-col items-center justify-center">
                {children}
              </div>
              <Footer />
            </ThemeProvider>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
