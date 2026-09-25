'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Scale,
  Home,
  Briefcase,
  ShoppingBag,
  HeartHandshake,
  CreditCard,
  Shield,
  ArrowRight
} from '../../../components/Icons';

const issues = [
  {
    id: 'rent-eviction',
    title: 'Housing & Rent',
    desc: 'Notice to vacate, security deposit disputes, arbitrary rent hikes, illegal lockouts.',
    icon: Home,
    color: 'bg-emerald-50 text-emerald-800 border-emerald-100'
  },
  {
    id: 'employment',
    title: 'Workplace & Salary',
    desc: 'Withheld salary, unlawful termination, unpaid overtime, delayed gratuity.',
    icon: Briefcase,
    color: 'bg-blue-50 text-blue-800 border-blue-100'
  },
  {
    id: 'consumer',
    title: 'Consumer & Refunds',
    desc: 'Broken deliveries, refusal to refund, deceptive billing, warranty refusal.',
    icon: ShoppingBag,
    color: 'bg-purple-50 text-purple-800 border-purple-100'
  },
  {
    id: 'domestic-violence',
    title: 'Domestic & Family Safety',
    desc: 'Emergency protection orders, right to reside in matrimonial home, maintenance.',
    icon: HeartHandshake,
    color: 'bg-rose-50 text-rose-800 border-rose-100'
  },
  {
    id: 'debt-loans',
    title: 'Cheque & Loan Recovery',
    desc: 'Section 138 NI Act notices, recovery agent harassment, dispute settlement.',
    icon: CreditCard,
    color: 'bg-amber-50 text-amber-800 border-amber-100'
  },
  {
    id: 'other',
    title: 'Other Legal Inquiries',
    desc: 'General legal notice review, RTI filings, police complaints, civil disputes.',
    icon: Shield,
    color: 'bg-teal-50 text-teal-800 border-teal-100'
  }
];

export default function SelectIssuePage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';

  return (
    <div className="flex-1 bg-[#FAF9F6] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="badge-teal text-xs mb-2">Step 1 of 2</span>
          <h1 className="text-3xl font-bold text-surface-900 tracking-tight mb-2">
            Select the topic you need assistance with
          </h1>
          <p className="text-sm text-surface-600">
            We will customize the legal notice analyzer, evidence checklist, and legal aid references.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {issues.map((issue) => {
            const Icon = issue.icon;
            return (
              <Link
                key={issue.id}
                href={`/${lang}/case/${issue.id}`}
                className="calm-card-interactive p-6 flex items-start gap-4"
              >
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center flex-shrink-0 ${issue.color}`}>
                  <Icon size={22} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-surface-900">{issue.title}</h3>
                  <p className="text-xs text-surface-600 leading-relaxed">{issue.desc}</p>
                  <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-primary-700">
                    <span>Analyze Notice</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/chat" className="text-xs font-medium text-surface-600 hover:text-primary-800 underline">
            Prefer to chat directly? Open AI Legal Assistant →
          </Link>
        </div>
      </div>
    </div>
  );
}
