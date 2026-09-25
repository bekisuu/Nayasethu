import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Noto_Sans_Devanagari } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const hindiMarathi = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'NyayaSathi – Understand your legal notice',
  description: 'AI‑powered legal information assistant for India',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${hindiMarathi.variable}`}>
      <body className="min-h-screen bg-gray-900 text-white flex flex-col">
        <header className="bg-gradient-to-r from-teal-600 to-cyan-500 p-4 shadow-md flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">NyayaSathi</Link>
          {/* Language switcher will be added here */}
        </header>
        <main className="flex-grow container mx-auto py-8 px-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-center p-4 text-sm">
          © {new Date().getFullYear()} NyayaSathi • Not legal advice
        </footer>
      </body>
    </html>
  );
}
