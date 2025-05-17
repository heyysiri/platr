import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Platr - Group Dining Decisions Made Simple',
  description: 'Find the perfect restaurant for your group with Platr. Accommodate everyone\'s dietary needs, budget, and preferences without the debate.',
  manifest: '/manifest.json',
  icons: {
    apple: '/icon-512x512.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Platr',
  },
  applicationName: 'Platr',
  keywords: [
    'restaurant', 'dining', 'group dining', 'food', 'restaurant finder',
    'dietary restrictions', 'group decisions', 'dining app', 'restaurant recommendations'
  ],
  openGraph: {
    title: "Platr - Group Dining Simplified",
    description: "Find the perfect restaurant for your group with Platr",
    url: "https://platr.app",
    siteName: "Platr",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FF5A00',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased ${inter.className}`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
