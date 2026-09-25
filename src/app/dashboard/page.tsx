'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Scale,
  MessageSquare,
  FileText,
  Clock,
  ShieldCheck,
  Phone,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Plus,
  BookOpen
} from '../../components/Icons';
import { getDemoUser, INITIAL_SAVED_CASES } from '../../lib/supabase';
import { SavedCase, UserProfile } from '../../lib/types';
import EscalationModal from '../../components/EscalationModal';

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [cases, setCases] = useState<SavedCase[]>(INITIAL_SAVED_CASES);
  const [activeTab, setActiveTab] = useState<'cases' | 'documents' | 'saved'>('cases');
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false);
  const [selectedCaseForEscalate, setSelectedCaseForEscalate] = useState('Tenancy Notice Reply');

  useEffect(() => {
    setUser(getDemoUser());
  }, []);

  const getStatusBadge = (status: SavedCase['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Action Required
          </span>
        );
      case 'escalated':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <ShieldCheck size={12} className="text-emerald-700" />
            With Legal Aid
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-100 text-surface-600 border border-surface-200 text-xs font-semibold">
            <CheckCircle2 size={12} className="text-surface-500" />
            Resolved
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-[#FAF9F6] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-surface-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-800 text-xs font-medium mb-2">
              <ShieldCheck size={13} className="text-primary-700" />
              <span>Private Citizen Legal Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-surface-900">
              Welcome, {user?.fullName || 'Citizen'}
            </h1>
            <p className="text-xs sm:text-sm text-surface-600 mt-1">
              Track your active legal situations, review timelines, and access free legal aid support.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/chat"
              className="btn-calm-primary !py-2.5 !px-4 !text-xs font-semibold flex items-center gap-2 shadow-soft-sm"
            >
              <span>+ Ask New Question</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
          <div className="calm-card p-5 bg-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider">
                Active Issues
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Clock size={16} />
              </div>
            </div>
            <div className="text-2xl font-bold text-surface-900">
              {cases.filter((c) => c.status === 'active').length}
            </div>
            <p className="text-xs text-amber-800 mt-1">1 urgent deadline upcoming</p>
          </div>

          <div className="calm-card p-5 bg-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider">
                Legal Aid Escalations
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Phone size={16} />
              </div>
            </div>
            <div className="text-2xl font-bold text-surface-900">
              {cases.filter((c) => c.status === 'escalated').length}
            </div>
            <p className="text-xs text-emerald-800 mt-1">Connected to DLSA Panel</p>
          </div>

          <div className="calm-card p-5 bg-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider">
                Preserved Documents
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <FileText size={16} />
              </div>
            </div>
            <div className="text-2xl font-bold text-surface-900">10</div>
            <p className="text-xs text-surface-500 mt-1">Encrypted in evidence locker</p>
          </div>
        </div>

        {/* Urgent Action Alert Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertTriangle size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-950">
                Notice Reply Deadline: 3 Days Remaining (Sept 28)
              </h4>
              <p className="text-xs text-amber-900 mt-0.5 leading-relaxed">
                Landlord 7-day notice requires a formal written reply to maintain tenancy rights under the Rent Control Act.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
            <Link
              href="/en/case/rent-eviction"
              className="btn-calm-secondary !py-2 !px-3.5 !text-xs !bg-white !border-amber-300 hover:!bg-amber-100 text-amber-950 font-semibold"
            >
              Generate Case Pack
            </Link>
            <button
              onClick={() => {
                setSelectedCaseForEscalate('Landlord 7-Day Notice');
                setIsEscalateModalOpen(true);
              }}
              className="btn-calm-primary !py-2 !px-3.5 !text-xs !bg-amber-800 hover:!bg-amber-900"
            >
              Assign Free Lawyer
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-surface-200">
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'cases'
                ? 'border-primary-700 text-primary-800'
                : 'border-transparent text-surface-500 hover:text-surface-800'
            }`}
          >
            My Legal Consultations ({cases.length})
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'documents'
                ? 'border-primary-700 text-primary-800'
                : 'border-transparent text-surface-500 hover:text-surface-800'
            }`}
          >
            Evidence & Document Locker (10)
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'saved'
                ? 'border-primary-700 text-primary-800'
                : 'border-transparent text-surface-500 hover:text-surface-800'
            }`}
          >
            Saved Legal Aid Clinics (3)
          </button>
        </div>

        {/* Tab 1: Cases List */}
        {activeTab === 'cases' && (
          <div className="space-y-4">
            {cases.map((c) => (
              <div
                key={c.id}
                className="calm-card p-5 sm:p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {getStatusBadge(c.status)}
                    <span className="text-xs text-surface-400">• Updated {c.lastUpdated}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-surface-900">{c.title}</h3>
                  <p className="text-xs sm:text-sm text-surface-600 leading-relaxed">{c.summary}</p>
                  {c.nextDeadline && (
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg">
                      <Clock size={12} />
                      <span>{c.nextDeadline}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 sm:self-center border-t sm:border-t-0 pt-3 sm:pt-0 border-surface-100">
                  <Link
                    href={`/chat?q=${encodeURIComponent(c.title)}`}
                    className="btn-calm-secondary !py-2 !px-3.5 !text-xs"
                  >
                    Open Chat
                  </Link>
                  <Link
                    href="/en/case/rent-eviction"
                    className="btn-calm-primary !py-2 !px-3.5 !text-xs flex items-center gap-1"
                  >
                    <span>View Notice</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Document Locker Preview */}
        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'Eviction_Notice_Advocate_Sharma.pdf', size: '1.2 MB', date: 'Sep 23, 2026', tag: 'Legal Notice' },
              { name: 'Tenancy_Agreement_Registered_2025.pdf', size: '3.4 MB', date: 'Sep 23, 2026', tag: 'Agreement' },
              { name: 'Rent_NEFT_Bank_Statements_6Mo.pdf', size: '2.1 MB', date: 'Sep 23, 2026', tag: 'Payment Proof' },
              { name: 'WhatsApp_Landlord_Threat_Screenshots.pdf', size: '4.8 MB', date: 'Sep 24, 2026', tag: 'Communication' },
              { name: 'Offer_Letter_Salary_Structure.pdf', size: '890 KB', date: 'Sep 18, 2026', tag: 'Employment' },
              { name: 'NCH_Consumer_Grievance_Receipt_1915.pdf', size: '420 KB', date: 'Sep 02, 2026', tag: 'Govt Grievance' }
            ].map((doc, i) => (
              <div key={i} className="calm-card p-4 bg-white space-y-2">
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center font-bold text-xs">
                    <FileText size={16} />
                  </div>
                  <span className="badge-warm text-[10px]">{doc.tag}</span>
                </div>
                <h4 className="text-xs font-bold text-surface-900 truncate" title={doc.name}>
                  {doc.name}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-surface-500 pt-1 border-t border-surface-100">
                  <span>{doc.size}</span>
                  <span>{doc.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Saved Clinics */}
        {activeTab === 'saved' && (
          <div className="space-y-4">
            <div className="calm-card p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="badge-teal text-[11px] mb-2">High Court & District Court Panel</span>
                <h3 className="text-base font-bold text-surface-900">
                  Maharashtra State Legal Services Authority (MSLSA)
                </h3>
                <p className="text-xs text-surface-600 mt-1">
                  PWD Building, High Court, Fort, Mumbai • Helpline: 15100
                </p>
              </div>
              <a
                href="tel:15100"
                className="btn-calm-primary !py-2 !px-4 !text-xs self-start sm:self-auto flex items-center gap-1.5"
              >
                <Phone size={13} />
                <span>Call Helpline 15100</span>
              </a>
            </div>

            <div className="calm-card p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="badge-warm text-[11px] mb-2">Consumer Dispute Forum</span>
                <h3 className="text-base font-bold text-surface-900">
                  National Consumer Helpline (NCH) Portal
                </h3>
                <p className="text-xs text-surface-600 mt-1">
                  Toll-Free: 1915 • E-Daakhil Online District Commission Filing
                </p>
              </div>
              <a
                href="tel:1915"
                className="btn-calm-secondary !py-2 !px-4 !text-xs self-start sm:self-auto"
              >
                Call 1915
              </a>
            </div>
          </div>
        )}
      </div>

      <EscalationModal
        isOpen={isEscalateModalOpen}
        onClose={() => setIsEscalateModalOpen(false)}
        caseTopic={selectedCaseForEscalate}
      />
    </div>
  );
}
