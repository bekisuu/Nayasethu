import React from 'react';
import Link from 'next/link';
import { Scale, Phone, ShieldCheck, ExternalLink, HeartHandshake } from './Icons';

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F4] border-t border-[#E7E5E4] pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-700">
                <Scale size={18} />
              </div>
              <span className="text-lg font-bold tracking-tight text-surface-900">NyayaSathi</span>
            </div>
            <p className="text-surface-600 text-sm max-w-md leading-relaxed">
              NyayaSathi is an open, AI-powered public legal guidance companion designed to help everyday citizens understand their fundamental rights, decode legal notices, and connect with free government legal aid across India.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-surface-200 text-xs text-surface-600 font-medium">
                <ShieldCheck size={14} className="text-primary-600" />
                <span>100% Private & Anonymous</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-surface-200 text-xs text-surface-600 font-medium">
                <HeartHandshake size={14} className="text-primary-600" />
                <span>Pro Bono Legal Aid First</span>
              </div>
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-400 mb-3">
              Citizen Tools
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/chat" className="text-surface-600 hover:text-primary-700 transition-colors">
                  Ask AI Legal Assistant
                </Link>
              </li>
              <li>
                <Link href="/en/case/rent-eviction" className="text-surface-600 hover:text-primary-700 transition-colors">
                  Notice OCR & Explainer
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-surface-600 hover:text-primary-700 transition-colors">
                  NALSA & DLSA Directory
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-surface-600 hover:text-primary-700 transition-colors">
                  Case & Document Locker
                </Link>
              </li>
              <li>
                <Link href="/auth" className="text-surface-600 hover:text-primary-700 transition-colors">
                  Citizen Account & Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Helplines */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-400 mb-3">
              Free Emergency Helplines
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="tel:15100"
                  className="group flex items-start gap-2 text-surface-700 hover:text-primary-700 transition-colors"
                >
                  <Phone size={15} className="text-emerald-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block text-surface-900 group-hover:text-primary-700">15100 (Toll-Free)</span>
                    <span className="text-xs text-surface-500">NALSA National Legal Aid</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="tel:1915"
                  className="group flex items-start gap-2 text-surface-700 hover:text-primary-700 transition-colors"
                >
                  <Phone size={15} className="text-blue-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block text-surface-900 group-hover:text-primary-700">1915 (Toll-Free)</span>
                    <span className="text-xs text-surface-500">National Consumer Helpline</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="tel:181"
                  className="group flex items-start gap-2 text-surface-700 hover:text-primary-700 transition-colors"
                >
                  <Phone size={15} className="text-rose-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block text-surface-900 group-hover:text-primary-700">181 / 112 (24x7)</span>
                    <span className="text-xs text-surface-500">Women Distress & Emergency</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Plain-Language Legal Disclaimer */}
        <div className="disclaimer-box mb-8">
          <div className="flex items-start gap-3">
            <span className="text-base leading-none mt-0.5">⚠️</span>
            <div className="text-xs space-y-1 text-amber-900">
              <p className="font-semibold">
                Important Legal Information Disclaimer:
              </p>
              <p>
                NyayaSathi is an artificial intelligence-powered informational resource designed to assist citizens in understanding legal principles and finding pro bono resources. <strong>NyayaSathi does NOT provide formal legal advice, does not establish an attorney-client relationship, and is not a substitute for a licensed advocate.</strong> If you face an active court summons or imminent eviction, please contact your local District Legal Services Authority (DLSA) or call 15100 immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-surface-300/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-surface-500">
          <p>© {new Date().getFullYear()} NyayaSathi. Built with open standards for citizen legal empowerment.</p>
          <div className="flex items-center gap-6">
            <a href="https://nalsa.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary-700 flex items-center gap-1 transition-colors">
              NALSA Portal <ExternalLink size={12} />
            </a>
            <a href="https://ecourts.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary-700 flex items-center gap-1 transition-colors">
              e-Courts India <ExternalLink size={12} />
            </a>
            <Link href="/resources" className="hover:text-primary-700 transition-colors">
              Privacy & Data Ethics
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
