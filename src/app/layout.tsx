import './globals.css';
import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'NyayaSathi — AI-Powered Citizen Legal Aid Companion',
  description:
    'Understand your legal rights, get plain-language guidance on legal notices, and connect with free government legal aid across India. Calm, confidential, and jargon-free.',
  keywords: [
    'legal aid India',
    'NALSA helpline 15100',
    'tenant rights eviction notice',
    'plain language legal advice',
    'DLSA legal clinic',
    'NyayaSathi',
    'free lawyer assistance'
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1C1917] antialiased selection:bg-teal-100 selection:text-teal-900">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
