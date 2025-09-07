import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HealthBridge - Navigate Healthcare with Confidence',
  description: 'A Farcaster Frame-based mini-app that helps low-income families find and access appropriate medical care and benefits.',
  keywords: ['healthcare', 'insurance', 'medicaid', 'provider finder', 'benefits'],
  authors: [{ name: 'HealthBridge Team' }],
  openGraph: {
    title: 'HealthBridge - Navigate Healthcare with Confidence',
    description: 'Find doctors, check benefits, and navigate healthcare with ease.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HealthBridge - Navigate Healthcare with Confidence',
    description: 'Find doctors, check benefits, and navigate healthcare with ease.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
