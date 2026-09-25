'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Scale,
  Send,
  Mic,
  MicOff,
  Volume2,
  Paperclip,
  ShieldCheck,
  Phone,
  Info,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  ExternalLink,
  ChevronDown
} from '../../components/Icons';
import EscalationModal from '../../components/EscalationModal';
import { STARTER_PROMPTS, PRESET_RESPONSES } from '../../lib/sampleChatData';
import { ChatMessage } from '../../lib/types';
import { LEGAL_AID_RESOURCES } from '../../lib/directoryData';

function ChatContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      content:
        'Hello! I am NyayaSathi, your confidential legal aid companion. I can help explain your rights in plain language, breakdown confusing legal notices, and connect you with free legal aid.',
      timestamp: 'Just now',
      plainLanguageSummary:
        'You can type your situation below, use voice dictation, or select one of the common citizen questions to get started.',
      disclaimer:
        'NyayaSathi provides general legal literacy under Indian law, not formal legal representation.',
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false);
  const [activeTopicForEscalation, setActiveTopicForEscalation] = useState('General Legal Inquiry');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi' | 'mr'>('en');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle query from URL parameter if present
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  // Text to Speech
  const handleReadAloud = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.lang = selectedLanguage === 'hi' ? 'hi-IN' : selectedLanguage === 'mr' ? 'mr-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Voice Input Speech Recognition
  const toggleListening = () => {
    if (typeof window === 'undefined') return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Demo voice fallback
      setInputValue('My landlord sent me a 7-day eviction notice without returning my security deposit.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = selectedLanguage === 'hi' ? 'hi-IN' : selectedLanguage === 'mr' ? 'mr-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue((prev) => (prev ? `${prev} ${transcript}` : transcript));
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Smart matched answer simulation
    setTimeout(() => {
      let matchedKey = 'eviction-notice';
      const qLower = query.toLowerCase();

      if (qLower.includes('salary') || qLower.includes('employer') || qLower.includes('job') || qLower.includes('wages') || qLower.includes('fired')) {
        matchedKey = 'unpaid-salary';
      } else if (qLower.includes('consumer') || qLower.includes('refund') || qLower.includes('product') || qLower.includes('seller') || qLower.includes('refrigerator')) {
        matchedKey = 'consumer-refusal';
      } else if (qLower.includes('cheque') || qLower.includes('bounce') || qLower.includes('138') || qLower.includes('loan') || qLower.includes('debt')) {
        matchedKey = 'cheque-bounce';
      } else if (qLower.includes('domestic') || qLower.includes('violence') || qLower.includes('harassment') || qLower.includes('husband') || qLower.includes('safe')) {
        matchedKey = 'domestic-safety';
      }

      const preset = PRESET_RESPONSES[matchedKey] || PRESET_RESPONSES['eviction-notice'];

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        content: `Here is the plain-language guidance and your legal rights regarding: "${query}"`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        plainLanguageSummary: preset.plainLanguageSummary,
        keyRights: preset.keyRights,
        safeNextSteps: preset.safeNextSteps,
        thingsToAvoid: preset.thingsToAvoid,
        relevantLaws: preset.relevantLaws,
        suggestedResources: preset.suggestedResources || [LEGAL_AID_RESOURCES[0]],
        confidence: preset.confidence || 'high',
        disclaimer: preset.disclaimer,
        humanReviewRecommended: preset.humanReviewRecommended
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
      setActiveTopicForEscalation(query);
    }, 1200);
  };

  const handleSaveCase = (msgId: string) => {
    setSavedSuccess(msgId);
    setTimeout(() => setSavedSuccess(null), 3000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF9F6]">
      {/* Top Reassurance Bar */}
      <div className="bg-white border-b border-surface-200 px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center font-bold">
            <Scale size={18} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-surface-900">NyayaSathi Legal Guidance Assistant</h1>
            <p className="text-xs text-surface-500">Confidential • Plain Language • Free Legal Aid Ready</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as any)}
            className="text-xs py-1.5 px-2.5 rounded-lg border border-surface-300 bg-surface-50 text-surface-700 focus:outline-none focus:border-primary-600"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="mr">मराठी (Marathi)</option>
          </select>

          {/* Direct Lawyer Escalation Button */}
          <button
            onClick={() => setIsEscalateModalOpen(true)}
            className="btn-calm-secondary !py-1.5 !px-3 !text-xs !rounded-lg border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 flex items-center gap-1.5 font-medium"
          >
            <Phone size={13} className="text-emerald-700" />
            <span>Connect to Free Legal Aid</span>
          </button>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:px-6 flex flex-col justify-between">
        {/* Messages List */}
        <div className="space-y-6 mb-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fade-up`}
            >
              {msg.sender === 'user' ? (
                /* User Message Bubble */
                <div className="chat-bubble-user">
                  <p className="text-sm sm:text-base leading-relaxed">{msg.content}</p>
                  <span className="text-[10px] text-teal-100 block text-right mt-1.5">{msg.timestamp}</span>
                </div>
              ) : (
                /* Assistant Message Card */
                <div className="chat-bubble-assistant w-full space-y-4">
                  {/* Header info */}
                  <div className="flex items-center justify-between pb-2 border-b border-surface-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary-600" />
                      <span className="text-xs font-bold text-surface-800">NyayaSathi Legal Guidance</span>
                      {msg.confidence && (
                        <span className="badge-teal text-[10px] !py-0.5">Verified Legal Sources</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReadAloud(msg.plainLanguageSummary || msg.content)}
                        className="btn-calm-subtle !p-1.5 !text-xs text-surface-500 hover:text-primary-700"
                        title="Read Aloud in Audio"
                      >
                        <Volume2 size={15} />
                        <span className="hidden sm:inline">Listen</span>
                      </button>
                      <button
                        onClick={() => handleSaveCase(msg.id)}
                        className="btn-calm-subtle !p-1.5 !text-xs text-surface-500 hover:text-primary-700"
                        title="Save to My Cases"
                      >
                        <Bookmark size={15} />
                        <span className="hidden sm:inline">
                          {savedSuccess === msg.id ? 'Saved!' : 'Save'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Intro text */}
                  <p className="text-xs sm:text-sm text-surface-700">{msg.content}</p>

                  {/* 1. Plain Language Summary Box */}
                  {msg.plainLanguageSummary && (
                    <div className="p-4 rounded-xl bg-primary-50/50 border border-primary-100 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-primary-900">
                        <Sparkles size={14} className="text-primary-700" />
                        <span>Plain-Language Summary (What this means)</span>
                      </div>
                      <p className="text-xs sm:text-sm text-surface-800 leading-relaxed">
                        {msg.plainLanguageSummary}
                      </p>
                    </div>
                  )}

                  {/* 2. Key Rights under Law */}
                  {msg.keyRights && msg.keyRights.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-surface-700 flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-emerald-700" />
                        Your Protected Rights Under Law
                      </h4>
                      <div className="grid gap-2">
                        {msg.keyRights.map((right, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-surface-50 border border-surface-200 text-xs sm:text-sm text-surface-800 flex items-start gap-2.5"
                          >
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                              ✓
                            </span>
                            <span>{right}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. Safe Actionable Next Steps */}
                  {msg.safeNextSteps && msg.safeNextSteps.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-surface-700 flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-primary-700" />
                        Recommended Next Steps
                      </h4>
                      <ol className="space-y-2 text-xs sm:text-sm text-surface-800">
                        {msg.safeNextSteps.map((step, idx) => (
                          <li
                            key={idx}
                            className="p-3 rounded-xl bg-white border border-surface-200 flex items-start gap-2.5 shadow-soft-sm"
                          >
                            <span className="w-5 h-5 rounded-lg bg-primary-100 text-primary-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* 4. Things to Avoid */}
                  {msg.thingsToAvoid && msg.thingsToAvoid.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                        <AlertTriangle size={14} className="text-rose-700" />
                        <span>What NOT to do (Avoid these common traps):</span>
                      </div>
                      <ul className="space-y-1 text-xs text-rose-950 list-disc list-inside">
                        {msg.thingsToAvoid.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 5. Suggested Legal Aid Directory Connections */}
                  {msg.suggestedResources && msg.suggestedResources.length > 0 && (
                    <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
                          <Phone size={14} className="text-emerald-700" />
                          <span>Need a free lawyer to reply or file for you?</span>
                        </div>
                        <button
                          onClick={() => setIsEscalateModalOpen(true)}
                          className="text-xs font-bold text-emerald-800 underline hover:text-emerald-900"
                        >
                          Request Free DLSA Lawyer →
                        </button>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {msg.suggestedResources.map((res) => (
                          <div
                            key={res.id}
                            className="p-2.5 rounded-lg bg-white border border-emerald-200 text-xs text-surface-800"
                          >
                            <span className="font-semibold block text-surface-900">{res.name}</span>
                            <span className="text-surface-500 block text-[11px] mt-0.5">{res.city}, {res.state}</span>
                            <div className="mt-2 flex items-center justify-between">
                              <a
                                href={`tel:${res.tollFree || res.phone}`}
                                className="font-bold text-emerald-700 hover:underline flex items-center gap-1"
                              >
                                📞 {res.tollFree || res.phone}
                              </a>
                              {res.website && (
                                <a
                                  href={res.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] text-surface-500 hover:text-surface-800 flex items-center gap-0.5"
                                >
                                  Portal <ExternalLink size={10} />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Statutory Disclaimer Box */}
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
                    <Info size={14} className="text-amber-700 flex-shrink-0 mt-0.5" />
                    <span>
                      {msg.disclaimer ||
                        'NyayaSathi provides automated legal information under Indian statutes. It is not an advocate and does not give formal legal representation.'}
                    </span>
                  </div>

                  {/* Bottom Action Row */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs border-t border-surface-100">
                    <span className="text-[10px] text-surface-400">{msg.timestamp}</span>
                    <div className="flex items-center gap-3">
                      <Link
                        href="/en/case/rent-eviction"
                        className="text-primary-700 hover:underline flex items-center gap-1"
                      >
                        <span>Extract dates & evidence</span>
                        <ArrowRight size={12} />
                      </Link>
                      <button
                        onClick={() => setIsEscalateModalOpen(true)}
                        className="text-emerald-700 font-semibold hover:underline"
                      >
                        Talk to DLSA Legal Aid
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-surface-200 w-36 shadow-soft-sm animate-pulse">
              <span className="w-2 h-2 rounded-full bg-primary-600" />
              <span className="w-2 h-2 rounded-full bg-primary-400" />
              <span className="w-2 h-2 rounded-full bg-primary-200" />
              <span className="text-xs text-surface-500 font-medium">Analyzing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input & Starter Prompts Footer */}
        <div className="sticky bottom-4 z-20 space-y-3">
          {/* Quick Starter Pills */}
          {messages.length <= 2 && (
            <div className="flex flex-wrap gap-2 pb-1">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => handleSendMessage(prompt.question)}
                  className="px-3 py-1.5 rounded-full bg-white border border-surface-200 text-xs text-surface-700 shadow-soft-sm hover:border-primary-500 hover:text-primary-800 hover:bg-primary-50/50 transition-all text-left"
                >
                  <span className="font-semibold text-primary-700">{prompt.badge}:</span>{' '}
                  {prompt.question.slice(0, 36)}...
                </button>
              ))}
            </div>
          )}

          {/* Chat Form */}
          <div className="bg-white p-2 sm:p-3 rounded-3xl border border-surface-300 shadow-soft-lg flex items-center gap-2 transition-all focus-within:border-primary-600 focus-within:ring-4 focus-within:ring-primary-50">
            {/* Notice Photo / Document Upload */}
            <Link
              href="/en/case/rent-eviction"
              className="p-2.5 rounded-2xl text-surface-500 hover:text-primary-700 hover:bg-primary-50 transition-colors"
              title="Upload legal notice photo or document"
            >
              <Paperclip size={18} />
            </Link>

            {/* Voice Input */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-2xl transition-colors ${
                isListening
                  ? 'bg-rose-100 text-rose-700 animate-pulse'
                  : 'text-surface-500 hover:text-primary-700 hover:bg-primary-50'
              }`}
              title="Voice Dictation (Speak your issue)"
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={
                isListening
                  ? 'Listening to your voice... Speak now'
                  : 'Type your legal question in plain language...'
              }
              className="flex-1 py-2 text-surface-900 placeholder:text-surface-400 text-sm bg-transparent border-none focus:outline-none"
            />

            {/* Send Button */}
            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="btn-calm-primary !p-2.5 !rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed"
              title="Send Question"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Escalation Modal */}
      <EscalationModal
        isOpen={isEscalateModalOpen}
        onClose={() => setIsEscalateModalOpen(false)}
        caseTopic={activeTopicForEscalation}
      />
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 mx-auto rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />
            <p className="text-xs text-surface-500">Loading NyayaSathi Assistant...</p>
          </div>
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
