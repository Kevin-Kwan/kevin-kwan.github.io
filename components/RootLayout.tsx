// components/RootLayout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kevin Kwan | Portfolio',
  description:
    'A website portfolio for Kevin Kwan showcasing his work experience, projects, and My Skills. Learn more about him.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={inter.className}>{children}</div>;
}
