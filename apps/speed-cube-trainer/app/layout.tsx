import { GeistSans } from 'geist/font/sans';
import { cookies } from 'next/headers';

import SideMenu from '../components/SideMenu';
import { createClient } from '../utils/supabase/server';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user: isAuthenticated },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="relative min-h-screen md:flex text-foreground w-full bg-background">
        {isAuthenticated && <SideMenu />}
        <main className="min-h-screen w-full flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
