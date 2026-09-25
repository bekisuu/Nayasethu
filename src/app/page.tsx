'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Scale,
  Shield,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
  Search,
  Phone,
  BookOpen,
  Home,
  Briefcase,
  ShoppingBag,
  HeartHandshake,
  CreditCard,
  Lock,
  CheckCircle2,
  Sparkles,
  Info
} from '../components/Icons';
import { STARTER_PROMPTS } from '../lib/sampleChatData';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/chat?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/chat');
    }
  };

  const handleStarterClick = (promptText: string) => {
    router.push(`/chat?q=${encodeURIComponent(promptText)}`);
  };

  const issueCategories = [
    {
      id: 'housing-eviction',
      title: 'Housing & Rent',
      desc: 'Eviction threats, rent increases, deposit withholding, landlord disputes.',
      icon: Home,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-100',
      sampleQuery: 'My landlord gave me a 7-day notice to vacate without returning my security deposit'
    },
    {
      id: 'employment-wages',
      title: 'Workplace & Wages',
      desc: 'Unpaid salary, delayed gratuity, unlawful termination, contract issues.',
      icon: Briefcase,
      color: 'bg-blue-50 text-blue-800 border-blue-100',
      sampleQuery: 'My company has not paid my salary for 2 months and is threatening termination'
    },
    {
      id: 'consumer-rights',
      title: 'Consumer & Refunds',
      desc: 'Defective products, online seller fraud, denied warranties, bill errors.',
      icon: ShoppingBag,
      color: 'bg-purple-50 text-purple-800 border-purple-100',
      sampleQuery: 'An online appliance seller delivered a broken refrigerator and is refusing refund'
    },
    {
      id: 'debt-loans',
      title: 'Cheque & Debts',
      desc: 'Section 138 cheque bounce notices, loan recovery harassment, EMI disputes.',
      icon: CreditCard,
      color: 'bg-amber-50 text-amber-800 border-amber-100',
      sampleQuery: 'I received a legal notice under Section 138 of NI Act for a cheque return'
    },
    {
      id: 'family-safety',
      title: 'Safety & Family Rights',
      desc: 'Domestic violence protection, maintenance rights, child custody guidance.',
      icon: HeartHandshake,
      color: 'bg-rose-50 text-rose-800 border-rose-100',
      sampleQuery: 'How do I seek emergency legal protection under the Domestic Violence Act?'
    },
    {
      id: 'notices-summons',
      title: 'Court & Police Notices',
      desc: 'Understanding lawyer letters, summons, FIR basics, consumer complaints.',
      icon: Shield,
      color: 'bg-teal-50 text-teal-800 border-teal-100',
      sampleQuery: 'How to understand a legal notice from an advocate'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Reassuring Top Trust Pill */}
      <section className="bg-[#FAF9F6] border-b border-[#EAE8E4] py-2 text-center">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 text-xs text-surface-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            Free public legal assistance companion • Partnered with NALSA Helpline <strong>15100</strong>
          </span>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        {/* Soft atmospheric gradient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-primary-50/70 via-primary-50/20 to-transparent -z-10 pointer-events-none rounded-full blur-3xl opacity-70" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-surface-200 shadow-soft-sm mb-6 animate-fade-up">
            <Sparkles size={15} className="text-primary-600" />
            <span className="text-xs font-medium text-surface-700">
              Clear Legal Answers in Plain, Everyday Language
            </span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-surface-900 leading-[1.15] mb-6 animate-fade-up">
            Understand your legal rights,{' '}
            <span className="text-primary-700 underline decoration-primary-200 decoration-4 underline-offset-8">
              without the anxiety.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-surface-600 max-w-2xl mx-auto font-normal leading-relaxed mb-8 animate-fade-up">
            Received a stressful legal notice or facing a dispute? NyayaSathi turns complex legal jargon into simple steps, clear rights, and connects you to free government legal aid.
          </p>

          {/* Interactive Search / Ask Input Card */}
          <div className="max-w-2xl mx-auto mb-6">
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border border-surface-300 shadow-soft-lg flex flex-col sm:flex-row items-stretch sm:items-center gap-2 transition-all focus-within:border-primary-600 focus-within:ring-4 focus-within:ring-primary-50"
            >
              <div className="flex items-center gap-3 px-3 flex-1">
                <Search size={20} className="text-surface-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Describe your situation (e.g. Landlord gave 7 days notice to vacate...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2.5 text-surface-900 placeholder:text-surface-400 text-sm sm:text-base bg-transparent border-none focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="btn-calm-primary !py-3 !px-6 !text-sm !rounded-xl sm:!rounded-2xl font-semibold flex items-center justify-center gap-2"
              >
                <span>Get Guidance</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>

          {/* Quick Starter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-surface-600 mb-10">
            <span className="text-surface-400 font-medium">Common questions:</span>
            {STARTER_PROMPTS.slice(0, 3).map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => handleStarterClick(prompt.question)}
                className="px-3 py-1.5 rounded-xl bg-white border border-surface-200 text-surface-700 hover:border-primary-500 hover:text-primary-800 hover:bg-primary-50/50 transition-all text-left"
              >
                {prompt.badge}: <span className="text-surface-500">{prompt.question.slice(0, 32)}...</span>
              </button>
            ))}
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 border-t border-surface-200/80">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs text-surface-600">
              <ShieldCheck size={18} className="text-primary-700 flex-shrink-0" />
              <span><strong>100% Confidential</strong> • No data shared</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 text-xs text-surface-600">
              <Scale size={18} className="text-primary-700 flex-shrink-0" />
              <span><strong>Plain Language</strong> • Zero confusing jargon</span>
            </div>
            <div className="flex items-center justify-center sm:justify-end gap-2.5 text-xs text-surface-600">
              <Phone size={18} className="text-primary-700 flex-shrink-0" />
              <span><strong>NALSA Linked</strong> • Free Pro Bono Lawyers</span>
            </div>
          </div>
        </div>
      </section>

      {/* How NyayaSathi Works in 3 Gentle Steps */}
      <section className="py-16 bg-white border-y border-[#EAE8E4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-3">
              How NyayaSathi Helps You Navigate Legal Stress
            </h2>
            <p className="text-sm sm:text-base text-surface-600">
              Legal issues can feel overwhelming. We break down the process into 3 calm, transparent steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="calm-card p-6 sm:p-7 relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary-50 border border-primary-100 text-primary-700 flex items-center justify-center font-bold text-lg mb-5">
                  1
                </div>
                <h3 className="text-lg font-bold text-surface-900 mb-2">Tell Your Story in Your Words</h3>
                <p className="text-sm text-surface-600 leading-relaxed">
                  Type your problem, use voice dictation, or upload a legal notice photo. No need to know legal terms or section numbers.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-surface-100 flex items-center gap-2 text-xs text-primary-700 font-medium">
                <CheckCircle2 size={15} />
                Supports English, हिन्दी & मराठी
              </div>
            </div>

            {/* Step 2 */}
            <div className="calm-card p-6 sm:p-7 relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg mb-5">
                  2
                </div>
                <h3 className="text-lg font-bold text-surface-900 mb-2">Get Your Rights & Safe Steps</h3>
                <p className="text-sm text-surface-600 leading-relaxed">
                  Receive an instant, plain-language summary: your protected rights under Indian law, deadlines, checklists of what to do and what to avoid.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-surface-100 flex items-center gap-2 text-xs text-blue-700 font-medium">
                <CheckCircle2 size={15} />
                Statutory timelines & checklist
              </div>
            </div>

            {/* Step 3 */}
            <div className="calm-card p-6 sm:p-7 relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg mb-5">
                  3
                </div>
                <h3 className="text-lg font-bold text-surface-900 mb-2">Connect with Free Legal Aid</h3>
                <p className="text-sm text-surface-600 leading-relaxed">
                  If you need a formal notice reply or court representation, we connect you to your local DLSA clinic, NALSA 15100 helpline, or legal aid advocate.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-surface-100 flex items-center gap-2 text-xs text-emerald-700 font-medium">
                <CheckCircle2 size={15} />
                100% Free for eligible citizens
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by Legal Topic */}
      <section className="py-16 bg-[#FAF9F6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-2">
                What situation are you dealing with?
              </h2>
              <p className="text-sm sm:text-base text-surface-600">
                Select a topic to explore rights, notice explainer tools, and emergency guidance.
              </p>
            </div>
            <Link
              href="/chat"
              className="btn-calm-secondary !text-xs !py-2.5 !px-4 self-start md:self-auto"
            >
              Ask Custom Question →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {issueCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => handleStarterClick(cat.sampleQuery)}
                  className="calm-card-interactive p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center mb-4 ${cat.color}`}>
                      <Icon size={22} />
                    </div>
                    <h3 className="text-base font-bold text-surface-900 mb-1.5">{cat.title}</h3>
                    <p className="text-xs text-surface-600 leading-relaxed mb-4">{cat.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-surface-100 flex items-center justify-between text-xs text-primary-700 font-medium">
                    <span>Explore rights & steps</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Plain Language vs. Jargon Interactive Demonstration */}
      <section className="py-16 bg-white border-y border-[#EAE8E4]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-700 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 mb-2 inline-block">
              Clarity First
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-2">
              We translate legal intimidation into plain English
            </h2>
            <p className="text-sm text-surface-600">
              Lawyer notices often use frightening terms to force quick compliance. Here is how NyayaSathi clarifies them:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bureaucratic / Confusing */}
            <div className="p-6 rounded-2xl bg-surface-50 border border-surface-200">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-surface-500 mb-3">
                <span className="w-2 h-2 rounded-full bg-surface-400" />
                Original Legal Notice Phrasing
              </div>
              <p className="font-mono text-xs text-surface-700 bg-white p-4 rounded-xl border border-surface-200 leading-relaxed mb-4">
                &ldquo;You are hereby called upon to quit, vacate and deliver vacant peaceful possession of the demised premises within 7 (seven) days of receipt hereof, failing which my client shall initiate summary proceedings under Section 106 of the TPA and seek mesne profits and damages at your sole cost and peril.&rdquo;
              </p>
              <div className="text-xs text-surface-500 space-y-1">
                <p>⚠️ <strong>Citizen Reaction:</strong> Panic, fear of immediate police eviction or loss of security deposit.</p>
              </div>
            </div>

            {/* NyayaSathi Plain Language Breakdown */}
            <div className="p-6 rounded-2xl bg-primary-50/50 border border-primary-100">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-700 mb-3">
                <Sparkles size={14} />
                NyayaSathi Plain-Language Explanation
              </div>
              <div className="bg-white p-4 rounded-xl border border-primary-100 text-xs text-surface-800 space-y-2 leading-relaxed mb-4">
                <p>
                  <strong>What this really means:</strong> Your landlord is asking you to move out. However, under Indian law:
                </p>
                <ul className="space-y-1.5 text-xs text-surface-700 list-disc list-inside">
                  <li>A 7-day notice is generally invalid; standard law requires at least <strong>15 to 30 days</strong>.</li>
                  <li>A landlord cannot physically lock you out or cut off utilities without a court order.</li>
                  <li>You have the legal right to send a formal reply and demand your full security deposit.</li>
                </ul>
              </div>
              <div className="flex items-center justify-between text-xs text-primary-800 font-medium">
                <span>🛡️ Safe next step: Send written reply via DLSA template</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statutory Disclaimer Card */}
      <section className="py-12 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="disclaimer-box flex flex-col sm:flex-row items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
              <Info size={20} />
            </div>
            <div className="text-xs sm:text-sm text-amber-950 space-y-2">
              <h4 className="font-bold text-amber-900">
                NyayaSathi is a Public Legal Companion, Not Your Personal Advocate
              </h4>
              <p className="text-amber-800 leading-relaxed">
                NyayaSathi uses advanced artificial intelligence to provide general legal information, procedural clarity, and links to free government legal aid organizations (NALSA, SLSAs, and DLSAs). It does not create an advocate-client relationship and should not replace advice from a licensed attorney for court filings.
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-4">
                <a href="tel:15100" className="font-bold text-amber-900 underline">
                  Call NALSA Free Legal Aid: 15100
                </a>
                <Link href="/resources" className="text-amber-900 underline">
                  View Full Legal Aid Directory →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 bg-surface-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">
            Have a question about your rights today?
          </h2>
          <p className="text-surface-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Start a confidential session now. Ask any legal question in plain language and receive calm, step-by-step guidance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/chat"
              className="btn-calm-primary !bg-primary-500 hover:!bg-primary-400 !text-surface-950 font-bold !py-3.5 !px-8 !text-base !rounded-2xl w-full sm:w-auto"
            >
              Start Free Legal Consultation
            </Link>
            <Link
              href="/resources"
              className="btn-calm-secondary !bg-surface-800 !text-white !border-surface-700 hover:!bg-surface-700 !py-3.5 !px-6 !text-base !rounded-2xl w-full sm:w-auto"
            >
              Find Legal Aid Clinics Near Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
