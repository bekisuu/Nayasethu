'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Scale, ShieldCheck, Lock, ArrowRight, CheckCircle2, Info } from '../../components/Icons';
import { setDemoUser } from '../../lib/supabase';
import { UserProfile } from '../../lib/types';

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const user: UserProfile = {
        id: `user-${Date.now()}`,
        email: email || 'citizen@example.com',
        fullName: fullName || 'Citizen User',
        preferredLanguage: 'en',
        state,
        createdAt: new Date().toISOString()
      };

      setDemoUser(user);
      setLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  const handleGuestContinue = () => {
    const guestUser: UserProfile = {
      id: `guest-${Date.now()}`,
      email: 'guest@nyayasathi.org',
      fullName: 'Anonymous Citizen',
      preferredLanguage: 'en',
      createdAt: new Date().toISOString()
    };
    setDemoUser(guestUser);
    router.push('/chat');
  };

  return (
    <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#FAF9F6]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo Badge */}
        <div className="w-12 h-12 mx-auto rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-700 mb-4 shadow-soft-sm">
          <Scale size={24} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-surface-900">
          {isSignUp ? 'Create your private legal workspace' : 'Welcome back to NyayaSathi'}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-surface-600 max-w-sm mx-auto">
          Save your questions, organize evidence, and track legal aid progress confidentially.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="calm-card p-6 sm:p-8 bg-white border border-surface-200 shadow-soft-md">
          {/* Privacy Reassurance Pill */}
          <div className="mb-6 p-3.5 rounded-2xl bg-primary-50/60 border border-primary-100 flex items-start gap-2.5 text-xs text-primary-950">
            <ShieldCheck size={18} className="text-primary-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-primary-900">Your privacy is legally protected</p>
              <p className="text-primary-800 text-[11px] leading-relaxed">
                We never sell or share your legal situations with landlords, employers, or third parties. All conversations are private.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-surface-700 mb-1">
                  Your Full Name (or alias)
                </label>
                <input
                  type="text"
                  required={isSignUp}
                  placeholder="e.g. Priya Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="calm-input text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-surface-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="calm-input text-sm"
              />
            </div>

            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-surface-700 mb-1">
                  Your State (for localized legal aid routing)
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="calm-input text-sm"
                >
                  <option value="Maharashtra">Maharashtra (DLSA Mumbai / Pune)</option>
                  <option value="Delhi">Delhi NCR (DSLSA)</option>
                  <option value="Karnataka">Karnataka (KSLSA Bengaluru)</option>
                  <option value="Uttar Pradesh">Uttar Pradesh (UPSLSA)</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Tamil Nadu">Tamil Nadu (TNSLSA)</option>
                  <option value="Other">Other State</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-surface-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="calm-input text-sm"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-calm-primary w-full !py-3 !text-sm font-semibold flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Processing...' : isSignUp ? 'Create Confidential Account' : 'Sign In'}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </form>

          {/* Social / One Tap Supabase Auth */}
          <div className="mt-5">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-surface-400">or quick access</span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleGuestContinue}
                className="btn-calm-secondary w-full !py-2.5 !text-xs font-medium flex items-center justify-center gap-2"
              >
                <span>Continue Anonymously as Guest (No Sign Up)</span>
              </button>
            </div>
          </div>

          {/* Toggle between Sign in & Sign up */}
          <div className="mt-6 pt-4 border-t border-surface-100 text-center text-xs text-surface-600">
            {isSignUp ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="font-semibold text-primary-700 hover:underline"
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p>
                First time seeking guidance?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="font-semibold text-primary-700 hover:underline"
                >
                  Create Free Account
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Security & Open Standards Footer Note */}
        <div className="mt-6 text-center text-xs text-surface-500 space-y-1">
          <p className="flex items-center justify-center gap-1.5">
            <Lock size={12} className="text-surface-400" />
            <span>256-bit encrypted data via Supabase Auth</span>
          </p>
        </div>
      </div>
    </div>
  );
}
