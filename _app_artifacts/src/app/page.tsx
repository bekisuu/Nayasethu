
'use client';
import { useState } from 'react';
import Link from 'next/link';

const features = [
  { icon: '📄', title: 'Upload & Understand', desc: 'Upload your legal notice as PDF, JPG, or PNG. Get a plain-language explanation.' },
  { icon: '🎤', title: 'Tell Your Story', desc: 'Describe your situation by voice or text. We organize the facts for you.' },
  { icon: '📅', title: 'Timeline & Deadlines', desc: 'See all important dates and deadlines extracted from your documents.' },
  { icon: '🗂️', title: 'Evidence Locker', desc: 'Organize your documents and see what evidence you might need.' },
  { icon: '🛡️', title: 'Safety Routing', desc: 'Urgent issues are flagged for immediate human support.' },
  { icon: '⚖️', title: 'Legal Aid Connect', desc: 'Find NALSA and state/district legal aid resources near you.' },
];

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
];

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(15, 20, 25, 0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(45,55,72,0.4)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚖️</span>
            <span className="text-xl font-bold gradient-text">NyayaSathi</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/en/dashboard" className="text-sm text-gray-400 hover:text-white transition">Impact Dashboard</Link>
            <div className="flex gap-2">
              {languages.map(l => (
                <Link key={l.code} href={`/${l.code}/select-issue`}
                  className="px-3 py-1.5 text-sm rounded-lg border border-gray-700 hover:border-teal-500 hover:text-teal-400 transition text-gray-300">
                  {l.native}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,191,149,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(0,100,255,0.1) 0%, transparent 50%)'
        }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm" style={{ background: 'rgba(0,191,149,0.1)', border: '1px solid rgba(0,191,149,0.2)' }}>
            <span className="pulse-dot" /> <span className="text-teal-400">AI-Powered Legal Information Assistant</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">NyayaSathi</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
            Understand your legal notice. Know your next safe step.
          </p>
          <p className="text-base text-gray-500 mb-10 max-w-2xl mx-auto">
            न्यायसाथी — अपनी कानूनी नोटिस समझें। अपना अगला सुरक्षित कदम जानें।
          </p>

          {/* Language Selection */}
          <div className="flex flex-col items-center gap-6">
            <p className="text-gray-400 text-sm uppercase tracking-wider">Choose your language / अपनी भाषा चुनें</p>
            <div className="flex flex-wrap justify-center gap-4">
              {languages.map(l => (
                <Link key={l.code} href={`/${l.code}/select-issue`}
                  className="btn-primary flex items-center gap-3 text-lg px-8 py-4 hover:scale-105 transition-transform">
                  <span>{l.native}</span>
                  <span className="text-teal-200 text-sm">({l.name})</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 gradient-text">How NyayaSathi Helps You</h2>
          <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">Upload a legal notice, tell your story, and get clear, actionable information — all in your language.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i}
                className="glass-card p-6 cursor-default animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}>
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-white">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto safety-yellow rounded-2xl p-6 text-center">
          <p className="text-sm font-medium" style={{ color: '#eab308' }}>
            ⚠️ <strong>Important:</strong> NyayaSathi is NOT a lawyer and does NOT provide legal advice. It provides general legal information only. Always consult a qualified lawyer for your specific situation.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t" style={{ borderColor: 'rgba(45,55,72,0.4)' }}>
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} NyayaSathi • General Legal Information Only • Not Legal Advice</p>
        <div className="flex justify-center gap-6 mt-3">
          <Link href="/en/dashboard" className="text-gray-500 hover:text-teal-400 text-sm transition">Impact Dashboard</Link>
          <a href="https://nalsa.gov.in/" target="_blank" rel="noopener" className="text-gray-500 hover:text-teal-400 text-sm transition">NALSA</a>
          <span className="text-gray-500 text-sm">Legal Aid Helpline: 15100</span>
        </div>
      </footer>
    </div>
  );
}
