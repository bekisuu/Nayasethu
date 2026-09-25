'use client';

import React, { useState } from 'react';
import { Phone, Shield, MapPin, X, Check, ExternalLink, Scale, Clock } from './Icons';
import { LEGAL_AID_RESOURCES } from '../lib/directoryData';

interface EscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseTopic?: string;
}

export default function EscalationModal({ isOpen, onClose, caseTopic }: EscalationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    city: 'Mumbai',
    preferredLanguage: 'English',
    urgentIssue: caseTopic || 'Eviction & Tenancy Notice',
    needLawyerAssistance: true
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-900/60 backdrop-blur-sm animate-fade-up">
      <div className="bg-white rounded-3xl shadow-soft-lg max-w-xl w-full border border-surface-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-surface-100 flex items-start justify-between bg-primary-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary-100 text-primary-800 flex items-center justify-center">
              <Scale size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-surface-900">Connect to Free Legal Aid</h3>
              <p className="text-xs text-surface-600">Official DLSA & NALSA Pro Bono Advocate Network</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-surface-400 hover:text-surface-700 rounded-xl hover:bg-surface-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!submitted ? (
            <div>
              {/* Emergency Call Card */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                      Immediate Phone Assistance
                    </span>
                    <p className="text-sm font-bold text-emerald-950">Call 15100 (NALSA 24x7 Helpline)</p>
                    <p className="text-xs text-emerald-700">Toll-free, multilingual legal support</p>
                  </div>
                </div>
                <a
                  href="tel:15100"
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition-colors whitespace-nowrap"
                >
                  Call Now
                </a>
              </div>

              <p className="text-xs text-surface-500 mb-4">
                Or fill in this simple confidential form to request a free in-person or virtual consultation with your District Legal Services Authority (DLSA) legal aid panel.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-surface-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="calm-input !py-2.5 !text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-surface-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="calm-input !py-2.5 !text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-surface-700 mb-1">City / District</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai / Delhi"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="calm-input !py-2.5 !text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-surface-700 mb-1">Issue Description</label>
                  <input
                    type="text"
                    value={form.urgentIssue}
                    onChange={(e) => setForm({ ...form, urgentIssue: e.target.value })}
                    className="calm-input !py-2.5 !text-sm"
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" className="btn-calm-primary w-full !py-3">
                    Request Free Legal Aid Consultation
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Check size={28} />
              </div>
              <h4 className="text-lg font-bold text-surface-900">Request Sent to Legal Aid Desk</h4>
              <p className="text-xs text-surface-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{form.fullName}</strong>. A DLSA legal aid coordinator or volunteer panel advocate in <strong>{form.city}</strong> will contact you via <strong>{form.phone}</strong> within 24 business hours.
              </p>
              <div className="p-3 bg-surface-50 rounded-2xl border border-surface-200 text-xs text-surface-600">
                <p><strong>Reference Ticket:</strong> DLSA-2026-NY-{Math.floor(1000 + Math.random() * 9000)}</p>
              </div>
              <button onClick={onClose} className="btn-calm-secondary !py-2 !px-6 !text-xs">
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
