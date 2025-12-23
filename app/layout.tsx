import type React from 'react';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import { Providers } from './providers';
import './globals.css';
import Footer from '@/components/footer';
import Header from '@/components/Header';

const geistSans = Geist({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap'
});

// Sofia Pro font with automatic optimization
const sofiaPro = localFont({
    src: [
        {
            path: '../public/fonts/SofiaPro/Sofia Pro Regular Az.otf',
            weight: '400',
            style: 'normal'
        },
        {
            path: '../public/fonts/SofiaPro/Sofia Pro Medium Az.otf',
            weight: '500',
            style: 'normal'
        },
        {
            path: '../public/fonts/SofiaPro/Sofia Pro Bold Az.otf',
            weight: '700',
            style: 'normal'
        }
    ],
    variable: '--font-sofia-pro',
    display: 'swap',
    preload: true,
    fallback: ['system-ui', 'arial']
});

export const metadata: Metadata = {
    title: 'v0 App',
    description: 'Created with v0',
    generator: 'v0.app',
    icons: {
        icon: [
            {
                url: '/icon-light-32x32.png',
                media: '(prefers-color-scheme: light)'
            },
            {
                url: '/icon-dark-32x32.png',
                media: '(prefers-color-scheme: dark)'
            },
            {
                url: '/icon.svg',
                type: 'image/svg+xml'
            }
        ],
        apple: '/apple-icon.png'
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${sofiaPro.variable} font-sans antialiased overflow-x-hidden`}
            >
                <Providers>
                    <Header />
                    {children}
                    <Footer />
                </Providers>
                <Analytics />
            </body>
        </html>
    );
}
