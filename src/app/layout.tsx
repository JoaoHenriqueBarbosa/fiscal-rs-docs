import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'fiscal-rs',
    template: '%s | fiscal-rs',
  },
  description: 'Biblioteca Rust de alta performance para documentos fiscais brasileiros (NF-e / NFC-e)',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'fiscal-rs',
    description: 'Biblioteca Rust de alta performance para documentos fiscais brasileiros (NF-e / NFC-e)',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    siteName: 'fiscal-rs',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
