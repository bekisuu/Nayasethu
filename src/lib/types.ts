export type Language = 'en' | 'hi' | 'mr';

export type IssueCategory =
  | 'housing-eviction'
  | 'employment-wages'
  | 'consumer-rights'
  | 'family-safety'
  | 'debt-loans'
  | 'cyber-fraud'
  | 'other';

export type Confidence = 'high' | 'medium' | 'low';
export type SafetyLevel = 'green' | 'yellow' | 'red';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  category?: IssueCategory;
  plainLanguageSummary?: string;
  keyRights?: string[];
  safeNextSteps?: string[];
  thingsToAvoid?: string[];
  relevantLaws?: string[];
  suggestedResources?: LegalAidResource[];
  confidence?: Confidence;
  disclaimer?: string;
  humanReviewRecommended?: boolean;
}

export interface LegalAidResource {
  id: string;
  name: string;
  category: 'government' | 'dlsa' | 'slsa' | 'helpline' | 'ngo' | 'court-clinic';
  city: string;
  state: string;
  phone: string;
  tollFree?: string;
  email?: string;
  website?: string;
  address: string;
  servicesProvided: string[];
  eligibility: string;
  isVerified: boolean;
  timings: string;
}

export interface SavedCase {
  id: string;
  title: string;
  category: IssueCategory;
  status: 'active' | 'resolved' | 'escalated' | 'draft';
  lastUpdated: string;
  createdDate: string;
  summary: string;
  unreadCount?: number;
  nextDeadline?: string;
  documentsCount: number;
  messagesCount: number;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  preferredLanguage: Language;
  state?: string;
  city?: string;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  confidence: Confidence;
  source: 'document' | 'user' | 'inferred';
  editable: boolean;
}

export interface EvidenceItem {
  id: string;
  name: string;
  category: string;
  fileUrl?: string;
  uploaded: boolean;
  missing: boolean;
  suggestion?: string;
}

export interface SourceCitation {
  id: string;
  title: string;
  url: string;
  jurisdiction: string;
  sourceType: 'statute' | 'regulation' | 'court-order' | 'government-portal' | 'legal-aid-org';
  directlyUsed: boolean;
  confidence: Confidence;
}

export interface Party {
  name: string;
  role: string;
  description: string;
}

export interface CaseAnalysis {
  summary: string;
  parties: Party[];
  importantDates: { date: string; description: string; confidence: Confidence; legalSignificance: string }[];
  possibleDeadlines: { date: string; description: string; confidence: Confidence; warning: string }[];
  requestedAction: string;
  issueAreas: string[];
  missingInformation: string[];
  evidenceChecklist: EvidenceItem[];
  safeNextSteps: string[];
  whatToAvoid: string[];
  questionsForLawyer: string[];
  sourceCitations: SourceCitation[];
  safetyLevel: SafetyLevel;
  safetyReason: string;
  humanReviewNeeded: boolean;
  humanReviewReason: string;
  timeline: TimelineEvent[];
  todayChecklist: string[];
}

export interface VoiceStoryFacts {
  whoIsInvolved: string[];
  whatHappened: string;
  whenItHappened: string;
  whereItHappened: string;
  whatEvidenceExists: string[];
  whatUserWants: string;
  whatIsUncertain: string[];
}

export interface CasePack {
  summary: string;
  timeline: TimelineEvent[];
  documentList: string[];
  importantDates: { date: string; description: string }[];
  evidenceList: EvidenceItem[];
  questionsForReview: string[];
  preferredLanguage: Language;
  location: string;
  createdAt: string;
  consentGiven: boolean;
}
