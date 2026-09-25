
export type Language = 'en' | 'hi' | 'mr';
export type IssueCategory = 'rent-eviction' | 'employment' | 'consumer' | 'domestic-violence' | 'other';
export type SafetyLevel = 'green' | 'yellow' | 'red';
export type Confidence = 'high' | 'medium' | 'low';
export type EvidenceCategory = 'legal-notice' | 'agreement' | 'payment-proof' | 'message' | 'identity-proof' | 'photograph' | 'other';

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
  category: EvidenceCategory;
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
