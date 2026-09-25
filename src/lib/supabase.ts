import { createClient } from '@supabase/supabase-js';
import { SavedCase, UserProfile } from './types';

// Supabase environment keys
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo-nyayasathi.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-anon-key';

export const isSupabaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== undefined &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://demo-nyayasathi.supabase.co'
  );
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fallback / Demo In-Memory & Local Storage State
const DEMO_USER: UserProfile = {
  id: 'user-demo-101',
  email: 'priya.sharma@example.com',
  fullName: 'Priya Sharma',
  preferredLanguage: 'en',
  state: 'Maharashtra',
  city: 'Mumbai',
  createdAt: '2026-08-12T10:00:00Z'
};

export const INITIAL_SAVED_CASES: SavedCase[] = [
  {
    id: 'case-101',
    title: 'Landlord 7-Day Eviction Notice & Deposit Retention',
    category: 'housing-eviction',
    status: 'active',
    lastUpdated: '2 hours ago',
    createdDate: '2026-09-23',
    summary: 'Landlord demanding early vacate without returning 3-month security deposit. Notice reply pending.',
    nextDeadline: 'Reply due in 3 days (Sept 28)',
    documentsCount: 3,
    messagesCount: 8
  },
  {
    id: 'case-102',
    title: 'Unpaid 2-Month Salary & Delayed Relieving Letter',
    category: 'employment-wages',
    status: 'escalated',
    lastUpdated: 'Yesterday',
    createdDate: '2026-09-18',
    summary: 'Employer withheld July & August salary. Escalated to DLSA Labor Conciliation Clinic.',
    nextDeadline: 'Labor Office Conciliation on Oct 04',
    documentsCount: 5,
    messagesCount: 14
  },
  {
    id: 'case-103',
    title: 'Damaged Refrigerator E-Commerce Refund',
    category: 'consumer-rights',
    status: 'resolved',
    lastUpdated: 'Sep 15, 2026',
    createdDate: '2026-09-02',
    summary: 'NCH complaint #1915 registered. E-commerce seller initiated full ₹32,000 refund.',
    documentsCount: 2,
    messagesCount: 6
  }
];

export const getDemoUser = (): UserProfile => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('nyayasathi_user');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {}
    }
  }
  return DEMO_USER;
};

export const setDemoUser = (user: UserProfile | null) => {
  if (typeof window !== 'undefined') {
    if (user) {
      localStorage.setItem('nyayasathi_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nyayasathi_user');
    }
  }
};
