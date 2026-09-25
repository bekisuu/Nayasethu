'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Scale,
  Search,
  Phone,
  MapPin,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  Info,
  CheckCircle2,
  Clock,
  HeartHandshake
} from '../../components/Icons';
import { LEGAL_AID_RESOURCES } from '../../lib/directoryData';
import EscalationModal from '../../components/EscalationModal';

export default function ResourcesDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false);

  const filteredResources = LEGAL_AID_RESOURCES.filter((res) => {
    const matchesSearch =
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.servicesProvided.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesState =
      selectedState === 'all' ||
      res.state.toLowerCase().includes(selectedState.toLowerCase()) ||
      res.state.toLowerCase().includes('national');

    const matchesCategory = selectedCategory === 'all' || res.category === selectedCategory;

    return matchesSearch && matchesState && matchesCategory;
  });

  return (
    <div className="flex-1 bg-[#FAF9F6] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200">
            <ShieldCheck size={14} className="text-emerald-700" />
            <span>Official Pro Bono & Legal Services Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 tracking-tight mb-3">
            Find Free Government Legal Aid Across India
          </h1>
          <p className="text-sm sm:text-base text-surface-600 leading-relaxed">
            Under Section 12 of the Legal Services Authorities Act 1987, eligible citizens are entitled to 100% free legal defense, court fee exemption, and free panel advocates.
          </p>
        </div>

        {/* Section 12 Eligibility Explainer Card */}
        <div className="calm-card p-6 bg-white mb-10 border border-primary-100">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center flex-shrink-0">
              <Scale size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-surface-900">
                Who qualifies for 100% Free Legal Representation? (Section 12 LSA Act)
              </h2>
              <p className="text-xs text-surface-600 mt-0.5">
                If you belong to any of these categories, you do NOT have to pay lawyer fees or court expenses:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-surface-50 border border-surface-200 flex items-center gap-2">
              <span className="text-emerald-600 font-bold text-sm">✓</span>
              <span>All Women & Children</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-50 border border-surface-200 flex items-center gap-2">
              <span className="text-emerald-600 font-bold text-sm">✓</span>
              <span>SC & ST Community Members</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-50 border border-surface-200 flex items-center gap-2">
              <span className="text-emerald-600 font-bold text-sm">✓</span>
              <span>Industrial & Daily Wage Laborers</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-50 border border-surface-200 flex items-center gap-2">
              <span className="text-emerald-600 font-bold text-sm">✓</span>
              <span>Annual Income &lt; ₹3,00,000</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="calm-card p-4 bg-white mb-8 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
              <input
                type="text"
                placeholder="Search by organization name, city, or issue (e.g. DLSA Mumbai, tenant, wages)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="calm-input !pl-10 !py-2.5 !text-xs sm:!text-sm"
              />
            </div>

            {/* State Filter */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="calm-input sm:w-48 !py-2.5 !text-xs sm:!text-sm bg-white"
            >
              <option value="all">All States / National</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi (NCR)</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="calm-input sm:w-48 !py-2.5 !text-xs sm:!text-sm bg-white"
            >
              <option value="all">All Service Types</option>
              <option value="government">National Authority (NALSA)</option>
              <option value="slsa">State Authority (SLSA)</option>
              <option value="dlsa">District Court (DLSA)</option>
              <option value="helpline">Emergency Helplines</option>
              <option value="court-clinic">Labor & Consumer Grievances</option>
            </select>
          </div>
        </div>

        {/* Directory Results List */}
        <div className="space-y-4 mb-12">
          {filteredResources.length > 0 ? (
            filteredResources.map((res) => (
              <div
                key={res.id}
                className="calm-card p-6 bg-white flex flex-col md:flex-row items-start justify-between gap-6 hover:border-primary-600 transition-all"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge-teal text-[11px] font-semibold">{res.state}</span>
                    <span className="badge-warm text-[11px] uppercase tracking-wider">{res.category}</span>
                    {res.isVerified && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 size={12} className="text-emerald-700" />
                        Govt Verified
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-surface-900">{res.name}</h3>

                  <p className="text-xs text-surface-600 flex items-center gap-1.5">
                    <MapPin size={14} className="text-surface-400 flex-shrink-0" />
                    <span>{res.address}</span>
                  </p>

                  <div className="space-y-1 text-xs text-surface-700 pt-1">
                    <strong className="text-surface-900 block font-semibold mb-1">Services Provided:</strong>
                    <ul className="grid sm:grid-cols-2 gap-1 list-disc list-inside">
                      {res.servicesProvided.map((service, idx) => (
                        <li key={idx} className="truncate">{service}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-surface-50 rounded-xl border border-surface-200 text-xs text-surface-600 flex items-start gap-2">
                    <Info size={14} className="text-surface-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Eligibility:</strong> {res.eligibility}</span>
                  </div>
                </div>

                {/* Right Action Stack */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-48 flex-shrink-0 md:border-l md:pl-6 border-surface-200">
                  <a
                    href={`tel:${res.tollFree || res.phone}`}
                    className="btn-calm-primary !py-2.5 !text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <Phone size={14} />
                    <span>Call {res.tollFree || res.phone}</span>
                  </a>

                  {res.website && (
                    <a
                      href={res.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-calm-secondary !py-2.5 !text-xs font-medium flex items-center justify-center gap-1.5"
                    >
                      <span>Official Portal</span>
                      <ExternalLink size={12} />
                    </a>
                  )}

                  <button
                    onClick={() => setIsEscalateModalOpen(true)}
                    className="btn-calm-subtle !text-xs text-primary-800 hover:text-primary-900 font-semibold"
                  >
                    Request Appointment →
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="calm-card p-12 text-center bg-white">
              <p className="text-sm text-surface-600 mb-4">No organizations found matching your search filter.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedState('all');
                  setSelectedCategory('all');
                }}
                className="btn-calm-secondary !text-xs"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* 24/7 Helpline Sticky Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-emerald-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft-lg">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-emerald-200 font-semibold">
              National 24x7 Citizen Legal Hotline
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">Call 15100 Anytime</h3>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-lg">
              Toll-free across all mobile networks in India. Speaks Hindi, English, and regional state languages.
            </p>
          </div>
          <a
            href="tel:15100"
            className="btn-calm-primary !bg-white !text-emerald-900 hover:!bg-emerald-50 !py-3.5 !px-8 !text-base font-bold !rounded-2xl shadow-soft-md whitespace-nowrap"
          >
            Dial 15100 Now
          </a>
        </div>
      </div>

      <EscalationModal
        isOpen={isEscalateModalOpen}
        onClose={() => setIsEscalateModalOpen(false)}
        caseTopic="Legal Aid Directory Assistance"
      />
    </div>
  );
}
