
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Noto_Sans_Devanagari } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const devanagari = Noto_Sans_Devanagari({ subsets: ['devanagari'], variable: '--font-devanagari', weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'NyayaSathi - Understand Your Legal Notice',
  description: 'AI-powered legal information assistant for India. Understand your legal notice. Know your next safe step.',
  keywords: ['legal aid', 'India', 'legal notice', 'tenant rights', 'eviction', 'NALSA'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${devanagari.variable}`}>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
