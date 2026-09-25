'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Scale,
  ShieldCheck,
  Shield,
  FileText,
  Volume2,
  Mic,
  MicOff,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Phone,
  ArrowRight,
  Download,
  Bookmark
} from '../../../../components/Icons';
import { CaseAnalysis, TimelineEvent, EvidenceItem, VoiceStoryFacts, Confidence } from '../../../../lib/types';
import { DEMO_EVICTION_NOTICE, DEMO_VOICE_TRANSCRIPT, DEMO_ANALYSIS, DEMO_VOICE_FACTS } from '../../../../lib/demoData';
import EscalationModal from '../../../../components/EscalationModal';

type Step = 'input' | 'review' | 'analyzing' | 'results';

export default function CasePage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const issue = (params?.issue as string) || 'rent-eviction';

  const [step, setStep] = useState<Step>('input');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [userQuestion, setUserQuestion] = useState('');
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [analysis, setAnalysis] = useState<CaseAnalysis | null>(null);
  const [voiceFacts, setVoiceFacts] = useState<VoiceStoryFacts | null>(null);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [activeTab, setActiveTab] = useState('summary');
  const [consentGiven, setConsentGiven] = useState(false);
  const [lowLiteracy, setLowLiteracy] = useState(false);
  const [isEscalateOpen, setIsEscalateOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setExtractedText(DEMO_EVICTION_NOTICE);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile(file);
      setExtractedText(DEMO_EVICTION_NOTICE);
    }
  }, []);

  const handleVoiceInput = () => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.onresult = (event: any) => {
        let transcript = event.results[0][0].transcript;
        setVoiceTranscript(transcript);
        setIsRecording(false);
      };
      recognition.onend = () => setIsRecording(false);
      recognition.start();
      setIsRecording(true);
    } else {
      setVoiceTranscript(DEMO_VOICE_TRANSCRIPT);
      setVoiceFacts(DEMO_VOICE_FACTS);
    }
  };

  const handleAnalyze = async () => {
    setStep('analyzing');
    await new Promise((r) => setTimeout(r, 2000));
    setAnalysis(DEMO_ANALYSIS);
    setTimeline(DEMO_ANALYSIS.timeline);
    setEvidence(DEMO_ANALYSIS.evidenceChecklist);
    if (voiceTranscript) setVoiceFacts(DEMO_VOICE_FACTS);
    setStep('results');
  };

  const readAloud = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const exportCasePack = () => {
    if (!consentGiven || !analysis) return;
    const pack = {
      summary: analysis.summary,
      timeline,
      documentList: uploadedFile ? [uploadedFile.name] : ['Legal_Notice_Advocate_Sharma.pdf'],
      importantDates: analysis.importantDates,
      evidenceList: evidence,
      questionsForReview: analysis.questionsForLawyer,
      preferredLanguage: lang,
      location: 'Mumbai, Maharashtra',
      createdAt: new Date().toISOString(),
      consentGiven: true,
    };
    const blob = new Blob([JSON.stringify(pack, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nyayasathi-case-pack.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'summary', label: 'Plain Summary' },
    { id: 'timeline', label: 'Dates & Deadlines' },
    { id: 'evidence', label: 'Evidence Locker' },
    { id: 'checklist', label: 'Action Checklist' },
    { id: 'legalaid', label: 'Free Legal Aid' },
    { id: 'casepack', label: 'Download Case Pack' },
  ];

  return (
    <div className="flex-1 bg-[#FAF9F6] py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-surface-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="badge-teal text-xs">Legal Notice Explainer</span>
              <span className="text-xs text-surface-500">• Confidential & Encrypted</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-surface-900">
              Decode & Understand Your Legal Notice
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLowLiteracy(!lowLiteracy)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
                lowLiteracy
                  ? 'bg-primary-50 text-primary-800 border-primary-300'
                  : 'bg-white text-surface-600 border-surface-300 hover:bg-surface-50'
              }`}
            >
              {lowLiteracy ? '📖 Simple Read Mode: ON' : '📖 Simple Read Mode'}
            </button>
            <button
              onClick={() => setIsEscalateOpen(true)}
              className="btn-calm-secondary !py-1.5 !px-3 !text-xs font-semibold text-emerald-800 border-emerald-300 bg-emerald-50"
            >
              📞 DLSA Lawyer
            </button>
          </div>
        </div>

        {/* STEP 1: INPUT */}
        {step === 'input' && (
          <div className="space-y-8 animate-fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Document Upload Card */}
              <div className="calm-card p-6 bg-white space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center font-bold">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-surface-900">Upload Legal Notice Photo/PDF</h2>
                    <p className="text-xs text-surface-500">We extract text and key dates automatically</p>
                  </div>
                </div>

                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                  className="p-8 border-2 border-dashed border-surface-300 hover:border-primary-600 rounded-2xl text-center bg-surface-50/60 hover:bg-primary-50/20 cursor-pointer transition-all"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary-100 text-primary-800 flex items-center justify-center mb-3">
                    <FileText size={22} />
                  </div>
                  <p className="text-sm font-semibold text-surface-800 mb-1">
                    Click or drag & drop notice file here
                  </p>
                  <p className="text-xs text-surface-400">PDF, JPG, PNG up to 10MB</p>
                </div>

                {uploadedFile && (
                  <div className="p-3 rounded-xl bg-primary-50 border border-primary-200 flex items-center justify-between text-xs text-primary-900">
                    <span className="font-semibold truncate max-w-[200px]">{uploadedFile.name}</span>
                    <span className="text-emerald-700 font-bold">✓ Ready for OCR</span>
                  </div>
                )}
              </div>

              {/* Story / Voice Input Card */}
              <div className="calm-card p-6 bg-white space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <Mic size={18} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-surface-900">Describe What Happened</h2>
                    <p className="text-xs text-surface-500">Type or speak your side of the situation</p>
                  </div>
                </div>

                <textarea
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="e.g. My landlord Suresh Patil sent this notice asking me to vacate within 15 days because he wants to sell. My rent agreement is valid till Dec 2026..."
                  className="calm-input min-h-[120px] text-xs sm:text-sm resize-y"
                />

                <div className="pt-2 border-t border-surface-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleVoiceInput}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isRecording
                        ? 'bg-rose-100 text-rose-800 animate-pulse'
                        : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                    }`}
                  >
                    {isRecording ? <MicOff size={14} /> : <Mic size={14} />}
                    <span>{isRecording ? 'Listening...' : 'Voice Dictate Story'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setExtractedText(DEMO_EVICTION_NOTICE);
                      setUploadedFile(new File([''], 'Eviction_Notice_Advocate_Sharma.pdf'));
                    }}
                    className="text-xs text-primary-700 font-medium hover:underline"
                  >
                    Load Sample Notice
                  </button>
                </div>
              </div>
            </div>

            {/* Next Action */}
            <div className="text-center pt-4">
              <button
                onClick={() => {
                  if (!extractedText) setExtractedText(DEMO_EVICTION_NOTICE);
                  setStep('review');
                }}
                className="btn-calm-primary !py-3.5 !px-8 !text-sm font-bold !rounded-2xl shadow-soft-sm"
              >
                Continue to Notice Review →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: REVIEW */}
        {step === 'review' && (
          <div className="space-y-6 animate-fade-up">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertTriangle size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
              <span>
                Please verify the extracted notice text below before generating your legal rights analysis and evidence checklist.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="calm-card p-5 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-surface-900">Extracted Notice Text</h3>
                  <button
                    onClick={() => readAloud(extractedText)}
                    className="btn-calm-subtle !py-1 !px-2 !text-xs text-primary-700"
                  >
                    <Volume2 size={14} />
                    <span>Read Aloud</span>
                  </button>
                </div>
                <textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  className="calm-input min-h-[300px] text-xs font-mono bg-surface-50 resize-y"
                />
              </div>

              <div className="calm-card p-5 bg-white space-y-4">
                <h3 className="text-sm font-bold text-surface-900">Quick Notice Overview</h3>
                <div className="space-y-3 text-xs text-surface-700 leading-relaxed">
                  <div className="p-3 rounded-xl bg-surface-50 border border-surface-200">
                    <span className="font-semibold block text-surface-900">Sender / Landlord:</span>
                    Mr. Suresh Patil (via Advocate Priya Sharma)
                  </div>
                  <div className="p-3 rounded-xl bg-surface-50 border border-surface-200">
                    <span className="font-semibold block text-surface-900">Demand:</span>
                    Vacate flat in 15 days; alleging expired tenancy.
                  </div>
                  <div className="p-3 rounded-xl bg-surface-50 border border-surface-200">
                    <span className="font-semibold block text-surface-900">Notice Date:</span>
                    September 20, 2026
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-2">
                  <button
                    onClick={handleAnalyze}
                    className="btn-calm-primary w-full !py-3 !text-sm font-bold"
                  >
                    Generate AI Legal Breakdown
                  </button>
                  <button
                    onClick={() => setStep('input')}
                    className="btn-calm-secondary w-full !py-2 !text-xs"
                  >
                    ← Back to Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: ANALYZING */}
        {step === 'analyzing' && (
          <div className="calm-card p-12 text-center bg-white space-y-4 my-12 animate-fade-up">
            <div className="w-12 h-12 mx-auto rounded-full border-3 border-primary-600 border-t-transparent animate-spin" />
            <h3 className="text-lg font-bold text-surface-900">Analyzing Your Legal Notice...</h3>
            <p className="text-xs text-surface-500 max-w-sm mx-auto leading-relaxed">
              Extracting parties, key dates, deadlines, applicable Rent Control statutes, and generating your evidence checklist.
            </p>
          </div>
        )}

        {/* STEP 4: RESULTS */}
        {step === 'results' && analysis && (
          <div className="space-y-6 animate-fade-up">
            {/* Safety & Urgency Banner */}
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-950">
                    Tenancy Protection Status: Legally Defensible
                  </h3>
                  <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
                    Landlord cannot physically evict you in 15 days without a civil court decree. You have the statutory right to issue a written reply.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEscalateOpen(true)}
                className="btn-calm-primary !py-2 !px-4 !text-xs !bg-emerald-800 hover:!bg-emerald-900 flex-shrink-0"
              >
                Connect to DLSA Panel
              </button>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-surface-200 pb-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-700 text-white shadow-soft-sm'
                      : 'bg-white text-surface-600 border border-surface-200 hover:bg-surface-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB: Summary */}
            {activeTab === 'summary' && (
              <div className="space-y-6">
                <div className="calm-card p-6 bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-surface-900">Plain-Language Notice Summary</h3>
                    <button
                      onClick={() => readAloud(analysis.summary)}
                      className="btn-calm-subtle !py-1 !px-2 !text-xs text-primary-700"
                    >
                      <Volume2 size={14} />
                      <span>Read Aloud</span>
                    </button>
                  </div>
                  <p className={`text-surface-800 leading-relaxed ${lowLiteracy ? 'text-base font-medium' : 'text-sm'}`}>
                    {analysis.summary}
                  </p>
                </div>

                {/* Parties Involved */}
                <div className="calm-card p-6 bg-white space-y-4">
                  <h3 className="text-sm font-bold text-surface-900">Parties Identified</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {analysis.parties.map((p, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-surface-50 border border-surface-200 text-xs">
                        <span className="font-bold text-surface-900 block">{p.name}</span>
                        <span className="text-primary-700 font-semibold block mt-0.5">{p.role}</span>
                        <p className="text-surface-500 mt-1 text-[11px]">{p.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Questions for Your Lawyer */}
                <div className="calm-card p-6 bg-white space-y-3">
                  <h3 className="text-sm font-bold text-surface-900">Questions to Ask Your Free Legal Aid Advocate</h3>
                  <div className="space-y-2 text-xs text-surface-800">
                    {analysis.questionsForLawyer.map((q, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-surface-50 border border-surface-200 flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Timeline */}
            {activeTab === 'timeline' && (
              <div className="calm-card p-6 bg-white space-y-4">
                <h3 className="text-base font-bold text-surface-900">Key Notice Dates & Upcoming Deadlines</h3>
                <div className="space-y-3">
                  {timeline.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 rounded-xl bg-surface-50 border border-surface-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-primary-800 bg-primary-50 px-2 py-0.5 rounded-md border border-primary-100">
                            {event.date}
                          </span>
                          <span className="badge-warm text-[10px]">{event.source}</span>
                        </div>
                        <h4 className="font-bold text-surface-900 text-sm">{event.title}</h4>
                        <p className="text-surface-600">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Evidence Locker */}
            {activeTab === 'evidence' && (
              <div className="calm-card p-6 bg-white space-y-4">
                <h3 className="text-base font-bold text-surface-900">Evidence Checklist for Notice Defense</h3>
                <div className="space-y-3 text-xs">
                  {evidence.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-xl border flex items-start gap-3 ${
                        item.uploaded
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : 'bg-amber-50/50 border-amber-200'
                      }`}
                    >
                      <span className="text-base mt-0.5">{item.uploaded ? '✓' : '📎'}</span>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-surface-900">{item.name}</h4>
                          <span className="badge-warm text-[10px]">{item.category}</span>
                        </div>
                        {item.suggestion && (
                          <p className="text-surface-600">{item.suggestion}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Checklist */}
            {activeTab === 'checklist' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="calm-card p-5 bg-white space-y-3">
                  <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 size={16} />
                    Things You Must Do Today
                  </h3>
                  <div className="space-y-2 text-xs text-surface-800">
                    {analysis.todayChecklist.map((item, idx) => (
                      <label key={idx} className="p-3 rounded-xl bg-surface-50 border border-surface-200 flex items-start gap-2.5 cursor-pointer">
                        <input type="checkbox" className="mt-0.5 rounded accent-primary-600" />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="calm-card p-5 bg-white space-y-3">
                  <h3 className="text-sm font-bold text-rose-800 flex items-center gap-1.5">
                    <AlertTriangle size={16} />
                    Things to Avoid
                  </h3>
                  <div className="space-y-2 text-xs text-rose-950">
                    {analysis.whatToAvoid.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5">
                        <span className="text-rose-700 font-bold">✕</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Legal Aid */}
            {activeTab === 'legalaid' && (
              <div className="calm-card p-6 bg-white space-y-4">
                <h3 className="text-base font-bold text-surface-900">Official Free Legal Aid for This Case</h3>
                <div className="p-5 rounded-2xl bg-primary-50/50 border border-primary-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-surface-900">District Legal Services Authority (DLSA)</h4>
                    <p className="text-xs text-surface-600 mt-0.5">
                      City Civil & Sessions Court, Old Secretariat Building, Fort, Mumbai - 400032
                    </p>
                  </div>
                  <a href="tel:15100" className="btn-calm-primary !py-2 !px-4 !text-xs whitespace-nowrap">
                    Call 15100 Helpline
                  </a>
                </div>
              </div>
            )}

            {/* TAB: Case Pack */}
            {activeTab === 'casepack' && (
              <div className="calm-card p-6 bg-white space-y-5">
                <div>
                  <h3 className="text-base font-bold text-surface-900">Export Lawyer-Ready Case Pack</h3>
                  <p className="text-xs text-surface-600 mt-1">
                    Download a clean structured briefing package with your verified facts, timeline, evidence list, and statutory questions for your appointed DLSA lawyer.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
                  <label className="flex items-start gap-3 cursor-pointer text-xs text-surface-700">
                    <input
                      type="checkbox"
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      className="mt-0.5 rounded accent-primary-600"
                    />
                    <span>
                      I give consent to compile this summary and evidence list for my personal use or sharing with a pro bono advocate.
                    </span>
                  </label>
                </div>

                <button
                  onClick={exportCasePack}
                  disabled={!consentGiven}
                  className="btn-calm-primary w-full !py-3 !text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  <span>Download Case Pack (.JSON)</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <EscalationModal
        isOpen={isEscalateOpen}
        onClose={() => setIsEscalateOpen(false)}
        caseTopic="Eviction Notice Formal Reply"
      />
    </div>
  );
}
