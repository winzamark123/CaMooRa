import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import { ThemeProvider } from '@/components/Theme/theme-provider';
import Provider from '@/lib/trpc/Provider';

export const metadata: Metadata = {
  title: 'FoMoo - Dont Get FOMO for Your Graduation',
  description:
    'Student Photography Platform for Graduation Photos Made by Students',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
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
