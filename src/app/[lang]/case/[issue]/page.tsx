
'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { t } from '../../../../lib/i18n';
import { CaseAnalysis, TimelineEvent, EvidenceItem, VoiceStoryFacts, Confidence } from '../../../../lib/types';
import { DEMO_EVICTION_NOTICE, DEMO_VOICE_TRANSCRIPT, DEMO_ANALYSIS, DEMO_VOICE_FACTS } from '../../../../lib/demoData';

type Step = 'input' | 'review' | 'analyzing' | 'results';

export default function CasePage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const issue = (params?.issue as string) || 'other';

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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // === FILE UPLOAD ===
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate OCR - in production, call /api/ocr
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

  // === VOICE INPUT ===
  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setVoiceTranscript(transcript);
      };

      recognition.onend = () => setIsRecording(false);
      recognition.start();
      setIsRecording(true);
    } else {
      // Demo mode
      setVoiceTranscript(DEMO_VOICE_TRANSCRIPT);
      setVoiceFacts(DEMO_VOICE_FACTS);
    }
  };

  // === ANALYZE ===
  const handleAnalyze = async () => {
    setStep('analyzing');
    // Simulate AI processing
    await new Promise(r => setTimeout(r, 3000));
    setAnalysis(DEMO_ANALYSIS);
    setTimeline(DEMO_ANALYSIS.timeline);
    setEvidence(DEMO_ANALYSIS.evidenceChecklist);
    if (voiceTranscript) setVoiceFacts(DEMO_VOICE_FACTS);
    setStep('results');
  };

  // === READ ALOUD ===
  const readAloud = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // === TIMELINE EDITING ===
  const updateTimelineEvent = (id: string, field: keyof TimelineEvent, value: string) => {
    setTimeline(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  };
  const deleteTimelineEvent = (id: string) => {
    setTimeline(prev => prev.filter(e => e.id !== id));
  };

  // === CASE PACK EXPORT ===
  const exportCasePack = () => {
    if (!consentGiven || !analysis) return;
    const pack = {
      summary: analysis.summary,
      timeline,
      documentList: uploadedFile ? [uploadedFile.name] : [],
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

  // === DELETE CASE ===
  const deleteCase = () => {
    setUploadedFile(null);
    setExtractedText('');
    setUserQuestion('');
    setVoiceTranscript('');
    setAnalysis(null);
    setVoiceFacts(null);
    setTimeline([]);
    setEvidence([]);
    setConsentGiven(false);
    setStep('input');
    setShowDeleteConfirm(false);
  };

  // === SAFETY BANNER ===
  const SafetyBanner = ({ level, reason }: { level: string; reason: string }) => {
    const config: Record<string, { className: string; icon: string; title: string }> = {
      green: { className: 'safety-green', icon: '✅', title: t(lang, 'safety.green') },
      yellow: { className: 'safety-yellow', icon: '⚠️', title: t(lang, 'safety.yellow') },
      red: { className: 'safety-red', icon: '🚨', title: t(lang, 'safety.red') },
    };
    const c = config[level] || config.green;
    return (
      <div className={`${c.className} rounded-2xl p-5 mb-6 animate-fade-in-up`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{c.icon}</span>
          <h3 className="font-bold text-lg">{c.title}</h3>
        </div>
        <p className="text-sm opacity-90">{reason}</p>
        {level === 'red' && (
          <div className="mt-3 p-3 rounded-lg" style={{background:'rgba(239,68,68,0.15)'}}>
            <p className="text-sm font-semibold">🆘 {t(lang, 'legalAid.helpline')}</p>
          </div>
        )}
      </div>
    );
  };

  // === CONFIDENCE CHIP ===
  const ConfidenceChip = ({ level }: { level: Confidence }) => (
    <span className={`confidence-${level}`}>{t(lang, `common.${level}`)}</span>
  );

  // === TABS CONFIG ===
  const tabs = [
    { id: 'summary', label: '📝 ' + t(lang, 'results.summary') },
    { id: 'timeline', label: '📅 ' + t(lang, 'results.timeline') },
    { id: 'evidence', label: '🗂️ ' + t(lang, 'results.evidenceLocker') },
    { id: 'checklist', label: '✅ ' + t(lang, 'results.todayChecklist') },
    { id: 'sources', label: '📚 ' + t(lang, 'results.sources') },
    { id: 'legalaid', label: '⚖️ ' + t(lang, 'results.legalAid') },
    { id: 'casepack', label: '📦 ' + t(lang, 'results.casePack') },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header style={{ background: 'rgba(15, 20, 25, 0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(45,55,72,0.4)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl">⚖️</span>
            <span className="text-xl font-bold gradient-text">{t(lang, 'app.title')}</span>
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={() => setLowLiteracy(!lowLiteracy)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition ${lowLiteracy ? 'border-teal-500 text-teal-400 bg-teal-500/10' : 'border-gray-700 text-gray-400'}`}>
              {lowLiteracy ? '📖 Low-Literacy ON' : '📖 Low-Literacy'}
            </button>
            <Link href={`/${lang}/select-issue`} className="text-sm text-gray-400 hover:text-white transition">{t(lang, 'common.back')}</Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* ========== STEP: INPUT ========== */}
        {step === 'input' && (
          <div className="animate-fade-in-up">
            <h1 className="text-3xl font-bold mb-2 gradient-text">{t(lang, 'upload.title')}</h1>
            <p className="text-gray-400 mb-8">{t(lang, 'app.disclaimer')}</p>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <div className="glass-card p-8">
                <h2 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">📄 Upload Legal Notice</h2>
                <div className="dropzone"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}>
                  <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileUpload} className="hidden" />
                  <div className="text-4xl mb-3">📤</div>
                  <p className="text-gray-300 mb-1">{t(lang, 'upload.dropzone')}</p>
                  <p className="text-gray-500 text-sm">PDF, JPG, PNG - Max 10MB</p>
                </div>
                {uploadedFile && (
                  <div className="mt-4 p-3 rounded-lg flex items-center gap-3" style={{background:'rgba(0,191,149,0.1)', border:'1px solid rgba(0,191,149,0.2)'}}>
                    <span className="text-teal-400">✅</span>
                    <span className="text-sm text-teal-300">{uploadedFile.name}</span>
                  </div>
                )}
              </div>

              {/* Text / Voice Input */}
              <div className="glass-card p-8">
                <h2 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">💬 {t(lang, 'upload.typeQuestion')}</h2>
                <textarea
                  className="input-field min-h-[120px] mb-4 resize-y"
                  placeholder={t(lang, 'upload.typeQuestion')}
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                />

                <div className="border-t border-gray-700 pt-4">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">🎤 {t(lang, 'upload.voiceInput')}</h3>
                  <button
                    onClick={handleVoiceInput}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${isRecording
                      ? 'bg-red-500/20 border border-red-500 text-red-400 animate-pulse'
                      : 'btn-secondary'}`}>
                    {isRecording ? `🔴 ${t(lang, 'upload.recording')}` : `🎤 ${t(lang, 'upload.startRecording')}`}
                  </button>
                  {!('webkitSpeechRecognition' in (typeof window !== 'undefined' ? window : {})) && (
                    <p className="text-xs text-yellow-500 mt-2">⚠️ {t(lang, 'upload.demoMode')}</p>
                  )}
                  {voiceTranscript && (
                    <div className="mt-4 p-4 rounded-xl" style={{background:'rgba(0,100,255,0.08)', border:'1px solid rgba(0,100,255,0.2)'}}>
                      <p className="text-sm text-gray-300 mb-2 font-medium">Voice Transcript:</p>
                      <p className="text-sm text-gray-400">{voiceTranscript}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Proceed */}
            {(extractedText || userQuestion || voiceTranscript) && (
              <div className="mt-8 text-center animate-fade-in-up">
                <button onClick={() => setStep('review')} className="btn-primary text-lg px-12 py-4">
                  {t(lang, 'common.next')} →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========== STEP: REVIEW ========== */}
        {step === 'review' && (
          <div className="animate-fade-in-up">
            <h1 className="text-3xl font-bold mb-2 gradient-text">{t(lang, 'upload.reviewText')}</h1>
            <p className="text-gray-400 mb-8">{t(lang, 'upload.ocrNote')}</p>

            {extractedText && (
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <div className="glass-card p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-white">📄 Original Extracted Text</h2>
                    <button onClick={() => readAloud(extractedText)} className="btn-secondary text-sm px-3 py-1.5">
                      🔊 {t(lang, 'common.readAloud')}
                    </button>
                  </div>
                  <textarea
                    className="input-field min-h-[400px] text-sm font-mono resize-y"
                    value={extractedText}
                    onChange={(e) => setExtractedText(e.target.value)}
                  />
                </div>
                <div className="glass-card p-6">
                  <h2 className="font-semibold text-white mb-4">📝 What This Means (Preview)</h2>
                  <div className="p-4 rounded-xl text-sm text-gray-300 leading-relaxed" style={{background:'rgba(0,191,149,0.05)'}}>
                    <p className="mb-3">This is a <strong>legal notice asking you to vacate your rented flat</strong>.</p>
                    <p className="mb-3">The landlord (Mr. Suresh Patil) has sent this through his lawyer (Advocate Priya Sharma).</p>
                    <p className="mb-3">You are being asked to <strong>leave within 15 days</strong>.</p>
                    <p className="mb-3">The reasons given are: expired tenancy agreement, landlord wants to renovate and sell.</p>
                    <p className="text-yellow-400 text-xs mt-4">⚠️ Full AI analysis will be generated after you click "Analyze"</p>
                  </div>
                </div>
              </div>
            )}

            {voiceTranscript && (
              <div className="glass-card p-6 mb-8">
                <h2 className="font-semibold text-white mb-4">🎤 Your Story</h2>
                <textarea
                  className="input-field min-h-[120px] resize-y"
                  value={voiceTranscript}
                  onChange={(e) => setVoiceTranscript(e.target.value)}
                />
              </div>
            )}

            {userQuestion && (
              <div className="glass-card p-6 mb-8">
                <h2 className="font-semibold text-white mb-4">❓ Your Question</h2>
                <textarea className="input-field min-h-[80px] resize-y" value={userQuestion} onChange={(e) => setUserQuestion(e.target.value)} />
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button onClick={() => setStep('input')} className="btn-secondary">{t(lang, 'common.back')}</button>
              <button onClick={handleAnalyze} className="btn-primary text-lg px-10 py-4">🔍 {t(lang, 'upload.analyze')}</button>
            </div>
          </div>
        )}

        {/* ========== STEP: ANALYZING ========== */}
        {step === 'analyzing' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in-up">
            <div className="w-20 h-20 rounded-full border-4 border-teal-500 border-t-transparent animate-spin mb-8" />
            <h2 className="text-2xl font-bold gradient-text mb-3">{t(lang, 'upload.processing')}</h2>
            <p className="text-gray-400">Analyzing your document and extracting key information...</p>
            <div className="mt-8 space-y-3 text-sm text-gray-500 max-w-md">
              <p className="animate-pulse">📄 Reading document...</p>
              <p className="animate-pulse" style={{animationDelay:'0.5s'}}>🔍 Identifying parties and dates...</p>
              <p className="animate-pulse" style={{animationDelay:'1s'}}>⚖️ Checking legal references...</p>
              <p className="animate-pulse" style={{animationDelay:'1.5s'}}>📋 Creating evidence checklist...</p>
            </div>
          </div>
        )}

        {/* ========== STEP: RESULTS ========== */}
        {step === 'results' && analysis && (
          <div className="animate-fade-in-up">
            {/* Safety Banner */}
            <SafetyBanner level={analysis.safetyLevel} reason={analysis.safetyReason} />

            {/* Human Review Banner */}
            {analysis.humanReviewNeeded && (
              <div className="safety-yellow rounded-2xl p-4 mb-6 flex items-center gap-3">
                <span className="text-xl">👨‍⚖️</span>
                <div>
                  <p className="font-semibold text-sm" style={{color:'#eab308'}}>{t(lang, 'results.humanReview')}: Recommended</p>
                  <p className="text-xs opacity-80">{analysis.humanReviewReason}</p>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-gray-800 overflow-x-auto">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${activeTab === tab.id
                    ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB: Summary */}
            {activeTab === 'summary' && (
              <div className="space-y-6 animate-slide-in">
                <div className="glass-card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-white">📝 {t(lang, 'results.summary')}</h2>
                    <button onClick={() => readAloud(analysis.summary)} className="btn-secondary text-sm px-3 py-1.5">🔊 {t(lang, 'common.readAloud')}</button>
                  </div>
                  <p className={`text-gray-300 leading-relaxed ${lowLiteracy ? 'text-lg' : 'text-base'}`}>{analysis.summary}</p>
                </div>

                {/* Parties */}
                <div className="glass-card p-6">
                  <h2 className="text-xl font-bold text-white mb-4">👥 {t(lang, 'results.parties')}</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {analysis.parties.map((p, i) => (
                      <div key={i} className="p-4 rounded-xl" style={{background:'rgba(0,191,149,0.05)', border:'1px solid rgba(0,191,149,0.1)'}}>
                        <p className="font-semibold text-teal-400">{p.name}</p>
                        <p className="text-sm text-gray-400 mt-1">{p.role}</p>
                        <p className="text-xs text-gray-500 mt-2">{p.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dates & Deadlines */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass-card p-6">
                    <h2 className="text-lg font-bold text-white mb-4">📅 {t(lang, 'results.dates')}</h2>
                    {analysis.importantDates.map((d, i) => (
                      <div key={i} className="flex items-start gap-3 mb-3 p-3 rounded-lg" style={{background:'rgba(26,35,50,0.5)'}}>
                        <span className="text-teal-400 font-mono text-sm mt-0.5">{d.date}</span>
                        <div>
                          <p className="text-sm text-gray-300">{d.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <ConfidenceChip level={d.confidence} />
                            <span className="text-xs text-gray-500">{d.legalSignificance}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="glass-card p-6">
                    <h2 className="text-lg font-bold text-white mb-4">⏰ {t(lang, 'results.deadlines')}</h2>
                    {analysis.possibleDeadlines.map((d, i) => (
                      <div key={i} className="p-4 rounded-xl safety-yellow mb-3">
                        <p className="font-semibold text-sm" style={{color:'#eab308'}}>{d.date} — {d.description}</p>
                        <p className="text-xs mt-2 opacity-80">{d.warning}</p>
                        <ConfidenceChip level={d.confidence} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Issue Areas & Missing Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass-card p-6">
                    <h2 className="text-lg font-bold text-white mb-4">🏷️ {t(lang, 'results.issueAreas')}</h2>
                    <div className="flex flex-wrap gap-2">
                      {analysis.issueAreas.map((area, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-full text-sm bg-teal-500/10 text-teal-400 border border-teal-500/20">{area}</span>
                      ))}
                    </div>
                  </div>
                  <div className="glass-card p-6">
                    <h2 className="text-lg font-bold text-white mb-4">❓ {t(lang, 'results.missingInfo')}</h2>
                    <ul className="space-y-2">
                      {analysis.missingInformation.map((m, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-yellow-400 mt-0.5">•</span> {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Questions for Lawyer */}
                <div className="glass-card p-6">
                  <h2 className="text-lg font-bold text-white mb-4">👨‍⚖️ {t(lang, 'results.lawyerQuestions')}</h2>
                  <ol className="space-y-3">
                    {analysis.questionsForLawyer.map((q, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{background:'rgba(0,100,255,0.15)', color:'#4d98ff'}}>{i + 1}</span>
                        {q}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Voice Story Facts */}
                {voiceFacts && (
                  <div className="glass-card p-6">
                    <h2 className="text-lg font-bold text-white mb-4">🎤 Your Story — Structured Facts</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl" style={{background:'rgba(0,191,149,0.05)'}}>
                        <p className="text-sm font-semibold text-teal-400 mb-2">Who is involved</p>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {voiceFacts.whoIsInvolved.map((w, i) => <li key={i}>• {w}</li>)}
                        </ul>
                      </div>
                      <div className="p-4 rounded-xl" style={{background:'rgba(0,100,255,0.05)'}}>
                        <p className="text-sm font-semibold text-blue-400 mb-2">What happened</p>
                        <p className="text-sm text-gray-300">{voiceFacts.whatHappened}</p>
                      </div>
                      <div className="p-4 rounded-xl" style={{background:'rgba(139,92,246,0.05)'}}>
                        <p className="text-sm font-semibold text-purple-400 mb-2">When & Where</p>
                        <p className="text-sm text-gray-300">{voiceFacts.whenItHappened}</p>
                        <p className="text-sm text-gray-300 mt-1">{voiceFacts.whereItHappened}</p>
                      </div>
                      <div className="p-4 rounded-xl" style={{background:'rgba(234,179,8,0.05)'}}>
                        <p className="text-sm font-semibold text-yellow-400 mb-2">What is uncertain</p>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {voiceFacts.whatIsUncertain.map((u, i) => <li key={i}>• {u}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: Timeline */}
            {activeTab === 'timeline' && (
              <div className="animate-slide-in">
                <div className="glass-card p-6">
                  <h2 className="text-xl font-bold text-white mb-6">📅 {t(lang, 'results.timeline')}</h2>
                  <div className="relative pl-10">
                    <div className="timeline-line" />
                    {timeline.map((event, i) => (
                      <div key={event.id} className="relative mb-6 pl-8 animate-fade-in-up" style={{animationDelay:`${i*0.1}s`}}>
                        <div className="absolute left-[-22px] top-2 w-4 h-4 rounded-full border-2 border-teal-400" style={{background: event.confidence === 'high' ? '#00bf95' : event.confidence === 'medium' ? '#eab308' : '#ef4444'}} />
                        <div className="glass-card p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-grow">
                              {editingEvent === event.id ? (
                                <div className="space-y-2">
                                  <input className="input-field text-sm" value={event.title} onChange={(e) => updateTimelineEvent(event.id, 'title', e.target.value)} />
                                  <input className="input-field text-sm" type="text" value={event.date} onChange={(e) => updateTimelineEvent(event.id, 'date', e.target.value)} />
                                  <textarea className="input-field text-sm" value={event.description} onChange={(e) => updateTimelineEvent(event.id, 'description', e.target.value)} />
                                  <button onClick={() => setEditingEvent(null)} className="btn-primary text-sm px-4 py-1.5">Save</button>
                                </div>
                              ) : (
                                <>
                                  <div className="flex items-center gap-3 mb-1">
                                    <span className="text-teal-400 font-mono text-sm">{event.date}</span>
                                    <ConfidenceChip level={event.confidence} />
                                    <span className="text-xs text-gray-500 capitalize">({event.source})</span>
                                  </div>
                                  <h3 className="font-semibold text-white">{event.title}</h3>
                                  <p className="text-sm text-gray-400 mt-1">{event.description}</p>
                                </>
                              )}
                            </div>
                            {event.editable && editingEvent !== event.id && (
                              <div className="flex gap-2 flex-shrink-0">
                                <button onClick={() => setEditingEvent(event.id)} className="text-xs text-gray-500 hover:text-teal-400 transition">✏️</button>
                                <button onClick={() => deleteTimelineEvent(event.id)} className="text-xs text-gray-500 hover:text-red-400 transition">🗑️</button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Evidence Locker */}
            {activeTab === 'evidence' && (
              <div className="animate-slide-in">
                <div className="glass-card p-6">
                  <h2 className="text-xl font-bold text-white mb-6">🗂️ {t(lang, 'results.evidenceLocker')}</h2>

                  {/* Uploaded */}
                  <h3 className="font-semibold text-teal-400 mb-3">Uploaded Evidence</h3>
                  <div className="space-y-3 mb-8">
                    {evidence.filter(e => e.uploaded).map(e => (
                      <div key={e.id} className="flex items-center gap-4 p-4 rounded-xl" style={{background:'rgba(0,191,149,0.05)', border:'1px solid rgba(0,191,149,0.1)'}}>
                        <span className="text-2xl">✅</span>
                        <div>
                          <p className="font-medium text-white">{e.name}</p>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400">{e.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Missing (Suggestions) */}
                  <h3 className="font-semibold text-yellow-400 mb-3">Missing Evidence (Suggestions — not requirements)</h3>
                  <div className="space-y-3">
                    {evidence.filter(e => e.missing).map(e => (
                      <div key={e.id} className="flex items-start gap-4 p-4 rounded-xl" style={{background:'rgba(234,179,8,0.04)', border:'1px solid rgba(234,179,8,0.1)'}}>
                        <span className="text-2xl mt-0.5">📎</span>
                        <div>
                          <p className="font-medium text-white">{e.name}</p>
                          <p className="text-sm text-gray-400 mt-1">{e.suggestion}</p>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 mt-2 inline-block">{e.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Checklists */}
            {activeTab === 'checklist' && (
              <div className="grid md:grid-cols-2 gap-6 animate-slide-in">
                <div className="glass-card p-6">
                  <h2 className="text-xl font-bold text-white mb-4">✅ {t(lang, 'results.todayChecklist')}</h2>
                  <div className="space-y-3">
                    {analysis.todayChecklist.map((item, i) => (
                      <label key={i} className="flex items-start gap-3 p-3 rounded-xl cursor-pointer hover:bg-white/5 transition">
                        <input type="checkbox" className="mt-1 w-5 h-5 rounded accent-teal-500" />
                        <span className={`text-sm text-gray-300 ${lowLiteracy ? 'text-base' : ''}`}>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="glass-card p-6">
                  <h2 className="text-xl font-bold text-white mb-4">🚫 {t(lang, 'results.avoidChecklist')}</h2>
                  <div className="space-y-3">
                    {analysis.whatToAvoid.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{background:'rgba(239,68,68,0.04)'}}>
                        <span className="text-red-400 mt-0.5">✕</span>
                        <span className={`text-sm text-gray-300 ${lowLiteracy ? 'text-base' : ''}`}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Sources */}
            {activeTab === 'sources' && (
              <div className="animate-slide-in">
                <div className="glass-card p-6">
                  <h2 className="text-xl font-bold text-white mb-6">📚 {t(lang, 'results.sources')}</h2>
                  <div className="space-y-4">
                    {analysis.sourceCitations.map(src => (
                      <div key={src.id} className="p-4 rounded-xl" style={{background:'rgba(26,35,50,0.5)', border:'1px solid rgba(45,55,72,0.5)'}}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-white">{src.title}</h3>
                            <a href={src.url} target="_blank" rel="noopener" className="text-sm text-teal-400 hover:underline break-all">{src.url}</a>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">{src.jurisdiction}</span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400">{src.sourceType}</span>
                              <ConfidenceChip level={src.confidence} />
                              {src.directlyUsed && <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400">Directly Used</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Legal Aid */}
            {activeTab === 'legalaid' && (
              <div className="animate-slide-in space-y-6">
                <div className="glass-card p-6">
                  <h2 className="text-xl font-bold text-white mb-6">⚖️ {t(lang, 'legalAid.title')}</h2>
                  <div className="space-y-4">
                    {[
                      { name: t(lang, 'legalAid.nalsa'), url: 'https://nalsa.gov.in/', desc: 'Free legal services for eligible persons across India' },
                      { name: t(lang, 'legalAid.slsa') + ' (Maharashtra)', url: 'https://mslsa.gov.in/', desc: 'Maharashtra State Legal Services Authority' },
                      { name: t(lang, 'legalAid.dlsa') + ' (Mumbai)', url: 'https://doj.gov.in/page/district-legal-services-authorities', desc: 'District-level free legal aid services' },
                    ].map((aid, i) => (
                      <div key={i} className="p-5 rounded-xl flex items-start justify-between gap-4" style={{background:'rgba(0,191,149,0.05)', border:'1px solid rgba(0,191,149,0.1)'}}>
                        <div>
                          <h3 className="font-semibold text-teal-400">{aid.name}</h3>
                          <p className="text-sm text-gray-400 mt-1">{aid.desc}</p>
                        </div>
                        <a href={aid.url} target="_blank" rel="noopener" className="btn-secondary text-sm px-4 py-2 flex-shrink-0">
                          {t(lang, 'legalAid.website')} ↗
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-5 rounded-xl safety-green text-center">
                    <p className="text-lg font-bold" style={{color:'#22c55e'}}>📞 {t(lang, 'legalAid.helpline')}</p>
                    <p className="text-sm text-gray-400 mt-1">Free legal help available nationwide</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Case Pack */}
            {activeTab === 'casepack' && (
              <div className="animate-slide-in space-y-6">
                <div className="glass-card p-6">
                  <h2 className="text-xl font-bold text-white mb-6">📦 {t(lang, 'results.casePack')}</h2>
                  <p className="text-gray-400 mb-6">Create a lawyer-ready case pack containing your approved summary, timeline, document list, important dates, evidence list, and questions for review.</p>

                  <div className="p-5 rounded-xl mb-6" style={{background:'rgba(234,179,8,0.05)', border:'1px solid rgba(234,179,8,0.1)'}}>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={consentGiven} onChange={(e) => setConsentGiven(e.target.checked)} className="mt-1 w-5 h-5 rounded accent-teal-500" />
                      <span className="text-sm text-gray-300">{t(lang, 'casePack.consent')}</span>
                    </label>
                  </div>

                  <button onClick={exportCasePack} disabled={!consentGiven}
                    className={`btn-primary w-full py-4 text-lg ${!consentGiven ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    📥 {t(lang, 'casePack.download')}
                  </button>
                </div>

                {/* Delete Case */}
                <div className="glass-card p-6">
                  <h2 className="text-lg font-bold text-red-400 mb-4">🗑️ {t(lang, 'results.deleteCase')}</h2>
                  {!showDeleteConfirm ? (
                    <button onClick={() => setShowDeleteConfirm(true)} className="btn-danger">
                      {t(lang, 'results.deleteCase')}
                    </button>
                  ) : (
                    <div className="p-4 rounded-xl safety-red">
                      <p className="text-sm mb-4">Are you sure? This will permanently delete all your case data, uploaded documents, and analysis results.</p>
                      <div className="flex gap-3">
                        <button onClick={deleteCase} className="btn-danger">Yes, Delete Everything</button>
                        <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary">Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
