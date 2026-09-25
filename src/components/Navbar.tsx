'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Scale, Phone, Globe, MessageSquare, BookOpen, Shield, UserCheck, LogOut } from './Icons';
import { getDemoUser, setDemoUser } from '../lib/supabase';
import { UserProfile } from '../lib/types';

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');

  useEffect(() => {
    setUser(getDemoUser());
  }, []);

  const handleSignOut = () => {
    setDemoUser(null);
    setUser(null);
  };

  const navLinks = [
    { href: '/chat', label: 'AI Legal Guide', icon: MessageSquare },
    { href: '/en/case/rent-eviction', label: 'Notice Explainer', icon: Shield },
    { href: '/resources', label: 'Free Legal Aid Directory', icon: BookOpen },
    { href: '/dashboard', label: 'My Cases', icon: UserCheck },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#EAE8E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-700 transition-transform group-hover:scale-105">
              <Scale size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-surface-900">NyayaSathi</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-100">
                  Legal Aid AI
                </span>
              </div>
              <p className="text-xs text-surface-500 hidden sm:block">Plain-language legal companion</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-800 font-semibold'
                      : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-primary-700' : 'text-surface-400'} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden lg:flex items-center gap-3">
            {/* National Legal Helpline Quick Button */}
            <a
              href="tel:15100"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-calm-emeraldBg border border-calm-emeraldBorder text-calm-emeraldText text-xs font-semibold hover:bg-emerald-100 transition-colors"
              title="24/7 National Legal Services Authority Helpline"
            >
              <Phone size={13} className="text-emerald-700" />
              <span>Free Helpline: <strong>15100</strong></span>
            </a>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-surface-200 text-xs font-medium text-surface-700 hover:bg-surface-100 transition-colors"
                aria-label="Change language"
              >
                <Globe size={14} className="text-surface-400" />
                <span>{selectedLang}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-soft-lg border border-surface-200 py-1.5 z-50 animate-fade-up">
                  {['English', 'हिन्दी (Hindi)', 'मराठी (Marathi)'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang.split(' ')[0]);
                        setLangMenuOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-surface-700 hover:bg-primary-50 hover:text-primary-800 transition-colors"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile or Auth */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-surface-200">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-surface-100 text-xs font-medium text-surface-700 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center font-bold text-xs">
                    {user.fullName ? user.fullName[0] : 'U'}
                  </div>
                  <span className="max-w-[100px] truncate">{user.fullName}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-1.5 text-surface-400 hover:text-surface-700 rounded-lg hover:bg-surface-100 transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="btn-calm-secondary !py-2 !px-4 !text-xs !rounded-xl font-medium"
              >
                Sign In
              </Link>
            )}

            {/* Primary CTA */}
            <Link
              href="/chat"
              className="btn-calm-primary !py-2 !px-4 !text-xs !rounded-xl"
            >
              Ask a Question
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="tel:15100"
              className="px-2.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1"
            >
              <Phone size={12} />
              15100
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-surface-200 text-surface-700 hover:bg-surface-100"
              aria-label="Toggle Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-surface-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fade-up">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-surface-700 hover:bg-surface-50"
                >
                  <Icon size={18} className="text-primary-700" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-surface-200 flex flex-col gap-2">
            <Link
              href="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-calm-primary w-full text-center"
            >
              Start Free Legal Consultation
            </Link>
            <Link
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-calm-secondary w-full text-center"
            >
              {user ? 'My Profile' : 'Sign In / Sign Up'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
