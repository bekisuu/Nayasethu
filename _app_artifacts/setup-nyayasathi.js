// setup-nyayasathi.js
// Comprehensive setup script that creates ALL project files for NYAYASATHI
const fs = require('fs');
const path = require('path');

const BASE = process.cwd();

function writeFile(relPath, content) {
  const fullPath = path.join(BASE, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Created: ' + relPath);
}

// ============================================================
// 1. TYPES
// ============================================================
writeFile('src/lib/types.ts', `
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
`);

// ============================================================
// 2. TRANSLATIONS
// ============================================================
writeFile('src/lib/translations/en.json', JSON.stringify({
  "app": { "title": "NyayaSathi", "tagline": "Understand your legal notice. Know your next safe step.", "disclaimer": "This is NOT legal advice. NyayaSathi provides general legal information only. Always consult a qualified lawyer for your specific situation." },
  "nav": { "home": "Home", "dashboard": "Impact Dashboard", "language": "Language" },
  "landing": { "getStarted": "Get Started", "subtitle": "AI-powered legal information assistant", "feature1": "Upload & understand legal notices", "feature2": "Get safe next steps", "feature3": "Connect with legal aid", "chooseLanguage": "Choose your language" },
  "issues": { "title": "What is your issue about?", "rent": "Rent / Eviction", "rentDesc": "Eviction notice, rent dispute, tenant rights", "employment": "Employment", "employmentDesc": "Termination, wages, workplace issues", "consumer": "Consumer", "consumerDesc": "Product defect, service complaint, refund", "domestic": "Domestic Violence", "domesticDesc": "Protection order, safety, support", "other": "Other", "otherDesc": "Any other legal notice or question" },
  "upload": { "title": "Share your legal notice or question", "dropzone": "Drop your legal notice here (PDF, JPG, PNG)", "or": "or", "typeQuestion": "Type your question or describe your situation", "voiceInput": "Tell your story by voice", "recording": "Recording... Click to stop", "demoMode": "Demo Mode: Using sample transcript. Production speech recognition requires a configured provider.", "startRecording": "Start Recording", "stopRecording": "Stop Recording", "reviewText": "Review & Edit Extracted Text", "ocrNote": "Text extracted from your document. Please review and correct any errors.", "analyze": "Analyze My Case", "processing": "Processing your document..." },
  "results": { "summary": "Plain-Language Summary", "parties": "Parties & Roles", "dates": "Important Dates", "deadlines": "Possible Deadlines", "requestedAction": "Requested Action", "issueAreas": "Issue Areas", "missingInfo": "Missing Information", "evidenceChecklist": "Evidence Checklist", "safeSteps": "Safe Next Steps", "avoid": "What to Avoid", "lawyerQuestions": "Questions for a Lawyer", "sources": "Source Citations", "confidence": "Confidence", "humanReview": "Human Review Status", "timeline": "Event Timeline", "evidenceLocker": "Evidence Locker", "todayChecklist": "What Should I Do Today?", "avoidChecklist": "What Should I Avoid?", "casePack": "Create Lawyer-Ready Case Pack", "legalAid": "Legal Aid Referrals", "deleteCase": "Delete My Case & Data" },
  "safety": { "green": "General Information", "greenDesc": "This information is provided with sources for your reference.", "yellow": "Needs Lawyer Review", "yellowDesc": "There is uncertainty or conflicting information. Please consult a lawyer.", "red": "Urgent - Seek Help Now", "redDesc": "This situation may require immediate human support or official intervention." },
  "casePack": { "consent": "I consent to creating this case pack. I understand it will contain my case information for sharing with a lawyer.", "download": "Download Case Pack", "share": "Share with Legal Aid" },
  "legalAid": { "title": "Official Legal Aid Resources", "nalsa": "National Legal Services Authority (NALSA)", "slsa": "State Legal Services Authority", "dlsa": "District Legal Services Authority", "helpline": "Legal Aid Helpline: 15100", "website": "Visit Website" },
  "dashboard": { "title": "Impact Dashboard", "subtitle": "Demo data - for demonstration purposes only", "noticesAnalyzed": "Notices Analyzed", "timelinesCreated": "Timelines Created", "legalAidReached": "Users Reached Legal Aid", "documentsOrganized": "Documents Organized", "casesEscalated": "Cases Escalated for Human Review" },
  "common": { "back": "Back", "next": "Next", "save": "Save", "cancel": "Cancel", "delete": "Delete", "edit": "Edit", "close": "Close", "loading": "Loading...", "readAloud": "Read Aloud", "high": "High", "medium": "Medium", "low": "Low" }
}, null, 2));

writeFile('src/lib/translations/hi.json', JSON.stringify({
  "app": { "title": "न्यायसाथी", "tagline": "अपनी कानूनी नोटिस समझें। अपना अगला सुरक्षित कदम जानें।", "disclaimer": "यह कानूनी सलाह नहीं है। न्यायसाथी केवल सामान्य कानूनी जानकारी प्रदान करता है। अपनी विशिष्ट स्थिति के लिए हमेशा एक योग्य वकील से परामर्श करें।" },
  "nav": { "home": "होम", "dashboard": "प्रभाव डैशबोर्ड", "language": "भाषा" },
  "landing": { "getStarted": "शुरू करें", "subtitle": "AI-संचालित कानूनी जानकारी सहायक", "feature1": "कानूनी नोटिस अपलोड करें और समझें", "feature2": "सुरक्षित अगले कदम पाएं", "feature3": "कानूनी सहायता से जुड़ें", "chooseLanguage": "अपनी भाषा चुनें" },
  "issues": { "title": "आपका मुद्दा किस बारे में है?", "rent": "किराया / बेदखली", "rentDesc": "बेदखली नोटिस, किराया विवाद, किरायेदार अधिकार", "employment": "रोजगार", "employmentDesc": "नौकरी से निकालना, वेतन, कार्यस्थल मुद्दे", "consumer": "उपभोक्ता", "consumerDesc": "उत्पाद दोष, सेवा शिकायत, रिफंड", "domestic": "घरेलू हिंसा", "domesticDesc": "संरक्षण आदेश, सुरक्षा, सहायता", "other": "अन्य", "otherDesc": "कोई अन्य कानूनी नोटिस या प्रश्न" },
  "upload": { "title": "अपनी कानूनी नोटिस या प्रश्न साझा करें", "dropzone": "अपनी कानूनी नोटिस यहाँ डालें (PDF, JPG, PNG)", "or": "या", "typeQuestion": "अपना प्रश्न टाइप करें या अपनी स्थिति बताएं", "voiceInput": "आवाज़ से अपनी कहानी बताएं", "recording": "रिकॉर्डिंग... रोकने के लिए क्लिक करें", "demoMode": "डेमो मोड: नमूना ट्रांसक्रिप्ट का उपयोग। उत्पादन भाषण पहचान के लिए कॉन्फ़िगर प्रदाता की आवश्यकता है।", "startRecording": "रिकॉर्डिंग शुरू करें", "stopRecording": "रिकॉर्डिंग बंद करें", "reviewText": "निकाला गया पाठ समीक्षा करें और संपादित करें", "ocrNote": "आपके दस्तावेज़ से पाठ निकाला गया। कृपया समीक्षा करें और त्रुटियों को ठीक करें।", "analyze": "मेरा मामला विश्लेषण करें", "processing": "आपका दस्तावेज़ संसाधित हो रहा है..." },
  "results": { "summary": "सरल भाषा में सारांश", "parties": "पक्ष और भूमिकाएं", "dates": "महत्वपूर्ण तिथियां", "deadlines": "संभावित समय-सीमाएं", "requestedAction": "अनुरोधित कार्रवाई", "issueAreas": "मुद्दा क्षेत्र", "missingInfo": "अनुपलब्ध जानकारी", "evidenceChecklist": "सबूत चेकलिस्ट", "safeSteps": "सुरक्षित अगले कदम", "avoid": "क्या न करें", "lawyerQuestions": "वकील के लिए प्रश्न", "sources": "स्रोत उद्धरण", "confidence": "विश्वास स्तर", "humanReview": "मानव समीक्षा स्थिति", "timeline": "घटना समयरेखा", "evidenceLocker": "सबूत लॉकर", "todayChecklist": "आज मुझे क्या करना चाहिए?", "avoidChecklist": "मुझे क्या नहीं करना चाहिए?", "casePack": "वकील के लिए केस पैक बनाएं", "legalAid": "कानूनी सहायता रेफरल", "deleteCase": "मेरा केस और डेटा हटाएं" },
  "safety": { "green": "सामान्य जानकारी", "greenDesc": "यह जानकारी आपके संदर्भ के लिए स्रोतों के साथ प्रदान की गई है।", "yellow": "वकील समीक्षा आवश्यक", "yellowDesc": "अनिश्चितता या विरोधाभासी जानकारी है। कृपया वकील से परामर्श करें।", "red": "तत्काल - अभी सहायता लें", "redDesc": "इस स्थिति में तत्काल मानवीय सहायता या आधिकारिक हस्तक्षेप की आवश्यकता हो सकती है।" },
  "casePack": { "consent": "मैं यह केस पैक बनाने के लिए सहमति देता/देती हूं।", "download": "केस पैक डाउनलोड करें", "share": "कानूनी सहायता से साझा करें" },
  "legalAid": { "title": "आधिकारिक कानूनी सहायता संसाधन", "nalsa": "राष्ट्रीय कानूनी सेवा प्राधिकरण (NALSA)", "slsa": "राज्य कानूनी सेवा प्राधिकरण", "dlsa": "जिला कानूनी सेवा प्राधिकरण", "helpline": "कानूनी सहायता हेल्पलाइन: 15100", "website": "वेबसाइट देखें" },
  "dashboard": { "title": "प्रभाव डैशबोर्ड", "subtitle": "डेमो डेटा - केवल प्रदर्शन उद्देश्यों के लिए", "noticesAnalyzed": "नोटिसें विश्लेषित", "timelinesCreated": "समयरेखाएं बनाई गईं", "legalAidReached": "कानूनी सहायता तक पहुंचे उपयोगकर्ता", "documentsOrganized": "दस्तावेज़ व्यवस्थित", "casesEscalated": "मानव समीक्षा के लिए बढ़ाए गए मामले" },
  "common": { "back": "वापस", "next": "आगे", "save": "सहेजें", "cancel": "रद्द करें", "delete": "हटाएं", "edit": "संपादित करें", "close": "बंद करें", "loading": "लोड हो रहा है...", "readAloud": "पढ़कर सुनाएं", "high": "उच्च", "medium": "मध्यम", "low": "निम्न" }
}, null, 2));

writeFile('src/lib/translations/mr.json', JSON.stringify({
  "app": { "title": "न्यायसाथी", "tagline": "तुमची कायदेशीर नोटीस समजून घ्या. तुमचे पुढचे सुरक्षित पाऊल जाणा.", "disclaimer": "ही कायदेशीर सल्ला नाही. न्यायसाथी फक्त सामान्य कायदेशीर माहिती प्रदान करते. तुमच्या विशिष्ट परिस्थितीसाठी नेहमी पात्र वकिलाचा सल्ला घ्या." },
  "nav": { "home": "मुख्यपृष्ठ", "dashboard": "प्रभाव डॅशबोर्ड", "language": "भाषा" },
  "landing": { "getStarted": "सुरू करा", "subtitle": "AI-संचालित कायदेशीर माहिती सहाय्यक", "feature1": "कायदेशीर नोटीस अपलोड करा आणि समजून घ्या", "feature2": "सुरक्षित पुढचे पावले मिळवा", "feature3": "कायदेशीर मदतीशी जोडा", "chooseLanguage": "तुमची भाषा निवडा" },
  "issues": { "title": "तुमचा मुद्दा कशाबद्दल आहे?", "rent": "भाडे / बेदखली", "rentDesc": "बेदखली नोटीस, भाडे विवाद, भाडेकरू अधिकार", "employment": "रोजगार", "employmentDesc": "नोकरीवरून काढणे, वेतन, कार्यस्थळ मुद्दे", "consumer": "ग्राहक", "consumerDesc": "उत्पादन दोष, सेवा तक्रार, परतावा", "domestic": "घरगुती हिंसा", "domesticDesc": "संरक्षण आदेश, सुरक्षा, मदत", "other": "इतर", "otherDesc": "कोणतीही इतर कायदेशीर नोटीस किंवा प्रश्न" },
  "upload": { "title": "तुमची कायदेशीर नोटीस किंवा प्रश्न सामायिक करा", "dropzone": "तुमची कायदेशीर नोटीस येथे टाका (PDF, JPG, PNG)", "or": "किंवा", "typeQuestion": "तुमचा प्रश्न टाइप करा किंवा तुमची परिस्थिती सांगा", "voiceInput": "आवाजाने तुमची कथा सांगा", "recording": "रेकॉर्डिंग... थांबवण्यासाठी क्लिक करा", "demoMode": "डेमो मोड: नमुना ट्रान्सक्रिप्ट वापरत आहे.", "startRecording": "रेकॉर्डिंग सुरू करा", "stopRecording": "रेकॉर्डिंग थांबवा", "reviewText": "काढलेला मजकूर पुन्हा पहा आणि संपादित करा", "ocrNote": "तुमच्या दस्तऐवजातून मजकूर काढला. कृपया पुन्हा पहा आणि चुका दुरुस्त करा.", "analyze": "माझ्या केसचे विश्लेषण करा", "processing": "तुमचा दस्तऐवज प्रक्रिया होत आहे..." },
  "results": { "summary": "सोप्या भाषेत सारांश", "parties": "पक्ष आणि भूमिका", "dates": "महत्त्वाच्या तारखा", "deadlines": "संभाव्य मुदती", "requestedAction": "विनंती केलेली कारवाई", "issueAreas": "मुद्दा क्षेत्र", "missingInfo": "गहाळ माहिती", "evidenceChecklist": "पुरावा चेकलिस्ट", "safeSteps": "सुरक्षित पुढचे पावले", "avoid": "काय टाळावे", "lawyerQuestions": "वकिलासाठी प्रश्न", "sources": "स्रोत उद्धरण", "confidence": "विश्वास पातळी", "humanReview": "मानवी पुनरावलोकन स्थिती", "timeline": "घटना कालरेषा", "evidenceLocker": "पुरावा लॉकर", "todayChecklist": "आज मी काय करावे?", "avoidChecklist": "मी काय टाळावे?", "casePack": "वकिलासाठी केस पॅक तयार करा", "legalAid": "कायदेशीर मदत संदर्भ", "deleteCase": "माझा केस आणि डेटा हटवा" },
  "safety": { "green": "सामान्य माहिती", "greenDesc": "ही माहिती तुमच्या संदर्भासाठी स्रोतांसह दिली आहे.", "yellow": "वकिल पुनरावलोकन आवश्यक", "yellowDesc": "अनिश्चितता किंवा विरोधाभासी माहिती आहे. कृपया वकिलाचा सल्ला घ्या.", "red": "तातडी - आता मदत घ्या", "redDesc": "या परिस्थितीत तातडीने मानवी मदत किंवा अधिकृत हस्तक्षेप आवश्यक असू शकतो." },
  "casePack": { "consent": "मी हा केस पॅक तयार करण्यास सहमती देतो/देते.", "download": "केस पॅक डाउनलोड करा", "share": "कायदेशीर मदतीशी शेअर करा" },
  "legalAid": { "title": "अधिकृत कायदेशीर मदत संसाधने", "nalsa": "राष्ट्रीय कायदेशीर सेवा प्राधिकरण (NALSA)", "slsa": "राज्य कायदेशीर सेवा प्राधिकरण", "dlsa": "जिल्हा कायदेशीर सेवा प्राधिकरण", "helpline": "कायदेशीर मदत हेल्पलाइन: 15100", "website": "वेबसाइट भेट द्या" },
  "dashboard": { "title": "प्रभाव डॅशबोर्ड", "subtitle": "डेमो डेटा - फक्त प्रदर्शनासाठी", "noticesAnalyzed": "नोटिसा विश्लेषित", "timelinesCreated": "कालरेषा तयार", "legalAidReached": "कायदेशीर मदतीपर्यंत पोहोचलेले वापरकर्ते", "documentsOrganized": "दस्तऐवज व्यवस्थित", "casesEscalated": "मानवी पुनरावलोकनासाठी वाढवलेले प्रकरणे" },
  "common": { "back": "मागे", "next": "पुढे", "save": "जतन करा", "cancel": "रद्द करा", "delete": "हटवा", "edit": "संपादित करा", "close": "बंद करा", "loading": "लोड होत आहे...", "readAloud": "वाचून दाखवा", "high": "उच्च", "medium": "मध्यम", "low": "कमी" }
}, null, 2));

// ============================================================
// 3. i18n HELPER
// ============================================================
writeFile('src/lib/i18n.ts', `
import en from './translations/en.json';
import hi from './translations/hi.json';
import mr from './translations/mr.json';

const translations: Record<string, any> = { en, hi, mr };

export function t(lang: string, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang] || translations['en'];
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
}

export function getLanguageName(lang: string): string {
  const names: Record<string, string> = { en: 'English', hi: 'हिन्दी', mr: 'मराठी' };
  return names[lang] || 'English';
}

export const supportedLanguages = ['en', 'hi', 'mr'] as const;
`);

// ============================================================
// 4. DEMO DATA
// ============================================================
writeFile('src/lib/demoData.ts', `
import { CaseAnalysis, VoiceStoryFacts, EvidenceItem, TimelineEvent, SourceCitation } from './types';

export const DEMO_VOICE_TRANSCRIPT = \`My name is Ramesh Kumar. I live in a rented flat in Andheri West, Mumbai. My landlord Mr. Suresh Patil sent me a notice last week saying I have to leave the flat in 15 days. I have been living here for 3 years and I always pay rent on time. The rent is Rs 15,000 per month. I have receipts for most months. He says he wants to renovate and sell the property. I don't know if this notice is legal or if I have any rights. I am very worried because my children go to school nearby. I don't know what to do.\`;

export const DEMO_EVICTION_NOTICE = \`LEGAL NOTICE

Date: 01/09/2026

To,
Mr. Ramesh Kumar
Flat No. 302, Sai Krupa Apartments
Andheri West, Mumbai - 400058

From,
Mr. Suresh Patil (Landlord)
Through: Advocate Priya Sharma
Office: 45, Law Chambers, Fort, Mumbai

Subject: Notice to Vacate Premises under Section 106 of the Transfer of Property Act, 1882

Dear Sir,

Under instructions from my client Mr. Suresh Patil, owner of Flat No. 302, Sai Krupa Apartments, Andheri West, Mumbai - 400058, I hereby serve upon you this legal notice requiring you to vacate the above-mentioned premises within 15 (fifteen) days from the date of receipt of this notice.

The grounds for this notice are as follows:

1. The tenancy agreement dated 15/09/2023 between you and my client has expired.
2. My client requires the premises for bona fide personal use, specifically for renovation and subsequent sale of the property.
3. Despite verbal requests made on 15/07/2026 and 01/08/2026, you have failed to vacate the premises.

You are hereby required to:
a) Vacate the premises within 15 days from the date of receipt of this notice.
b) Hand over peaceful and vacant possession of the premises.
c) Clear all outstanding dues, if any.
d) Return the keys of the premises.

In the event of your failure to comply with this notice, my client shall be constrained to initiate appropriate legal proceedings against you for eviction, recovery of damages, and mesne profits, at your risk and cost.

This notice is issued without prejudice to the rights and remedies of my client.

Yours faithfully,
Advocate Priya Sharma
(On behalf of Mr. Suresh Patil)
\`;

export const DEMO_ANALYSIS: CaseAnalysis = {
  summary: "You received a legal notice from your landlord Mr. Suresh Patil, sent through Advocate Priya Sharma, asking you to leave your rented flat (Flat 302, Sai Krupa Apartments, Andheri West, Mumbai) within 15 days. The landlord says the tenancy agreement has expired and he wants the flat for renovation and sale. The notice cites Section 106 of the Transfer of Property Act, 1882. This is a common type of eviction notice in India, and you may have important rights as a tenant under the Maharashtra Rent Control Act, 1999.",
  parties: [
    { name: "Ramesh Kumar", role: "Tenant", description: "You - the person receiving this notice and currently living in the flat" },
    { name: "Suresh Patil", role: "Landlord/Owner", description: "The person who owns the flat and is asking you to leave" },
    { name: "Advocate Priya Sharma", role: "Landlord's Lawyer", description: "The lawyer who wrote and sent this notice on behalf of the landlord" }
  ],
  importantDates: [
    { date: "01/09/2026", description: "Date the legal notice was written", confidence: "high", legalSignificance: "Date found in document" },
    { date: "15/09/2023", description: "Date of original tenancy/rent agreement", confidence: "high", legalSignificance: "Date found in document" },
    { date: "15/07/2026", description: "First verbal request to vacate (claimed by landlord)", confidence: "medium", legalSignificance: "Legal significance requires verification" },
    { date: "01/08/2026", description: "Second verbal request to vacate (claimed by landlord)", confidence: "medium", legalSignificance: "Legal significance requires verification" }
  ],
  possibleDeadlines: [
    { date: "16/09/2026", description: "15-day deadline to vacate (from date of notice)", confidence: "medium", warning: "This deadline is stated in the notice. However, under the Maharashtra Rent Control Act, a landlord cannot evict a tenant without a court order. This deadline may not be legally enforceable. Consult a lawyer." }
  ],
  requestedAction: "The landlord is asking you to: (1) Leave the flat within 15 days, (2) Hand over the flat in empty condition, (3) Pay any outstanding dues, (4) Return the keys",
  issueAreas: ["Tenant Eviction", "Rent Control Law", "Transfer of Property Act", "Maharashtra Rent Control Act 1999"],
  missingInformation: [
    "Copy of the original tenancy/rent agreement dated 15/09/2023",
    "Rent receipts or bank transfer records",
    "Whether the flat falls under Maharashtra Rent Control Act (based on rent amount and area)",
    "Whether the landlord has filed any case in court",
    "Registration status of the tenancy agreement",
    "Municipal area classification of the property"
  ],
  evidenceChecklist: [
    { id: "ev1", name: "Legal Notice (this document)", category: "legal-notice", uploaded: true, missing: false },
    { id: "ev2", name: "Tenancy/Rent Agreement", category: "agreement", uploaded: false, missing: true, suggestion: "The agreement dated 15/09/2023 mentioned in the notice. Very important for your case." },
    { id: "ev3", name: "Rent Payment Receipts", category: "payment-proof", uploaded: false, missing: true, suggestion: "Collect all rent receipts or bank transfer statements showing regular payment." },
    { id: "ev4", name: "Bank Transfer Statements", category: "payment-proof", uploaded: false, missing: true, suggestion: "Bank statements showing rent transfers to landlord." },
    { id: "ev5", name: "Previous Communication", category: "message", uploaded: false, missing: true, suggestion: "Any WhatsApp messages, emails, or letters from landlord about vacating." },
    { id: "ev6", name: "Address/Identity Proof", category: "identity-proof", uploaded: false, missing: true, suggestion: "Aadhaar card or other ID showing this address." },
    { id: "ev7", name: "Photographs of Flat", category: "photograph", uploaded: false, missing: true, suggestion: "Current photographs showing the condition of the flat (optional but helpful)." }
  ],
  safeNextSteps: [
    "1. Do NOT panic. Receiving a legal notice does not mean you must immediately leave.",
    "2. Keep this notice safely. Do not throw it away or ignore it.",
    "3. Gather your tenancy agreement, rent receipts, and bank statements.",
    "4. Check if your flat falls under the Maharashtra Rent Control Act, 1999.",
    "5. Contact a lawyer or your nearest Legal Aid Centre for advice.",
    "6. Call the Legal Aid Helpline: 15100 (free legal help).",
    "7. Do NOT stop paying rent. Continue paying as usual and keep receipts.",
    "8. Send a written reply to the notice through a lawyer if possible.",
    "9. Visit your nearest District Legal Services Authority for free legal help."
  ],
  whatToAvoid: [
    "Do NOT vacate the flat immediately out of fear.",
    "Do NOT stop paying rent - this could be used against you.",
    "Do NOT argue with the landlord verbally without a witness.",
    "Do NOT sign any document without reading it carefully or without a lawyer.",
    "Do NOT destroy or hide any documents related to your tenancy.",
    "Do NOT engage in any illegal activity or threaten the landlord.",
    "Do NOT ignore this notice completely - a response may be needed."
  ],
  questionsForLawyer: [
    "Does the Maharashtra Rent Control Act, 1999 apply to my tenancy?",
    "Is this 15-day notice period legally valid for my situation?",
    "Can the landlord evict me without a court order?",
    "What is the legal meaning of 'bona fide personal use' and does it apply here (renovation and sale)?",
    "Should I send a written reply to this notice?",
    "What happens if the landlord files a court case?",
    "Am I entitled to any compensation or relocation time?",
    "Is my tenancy agreement still valid even though the landlord says it expired?"
  ],
  sourceCitations: [
    { id: "src1", title: "Transfer of Property Act, 1882 - Section 106", url: "https://www.indiacode.nic.in/handle/123456789/2338", jurisdiction: "India (Central)", sourceType: "statute", directlyUsed: true, confidence: "high" },
    { id: "src2", title: "Maharashtra Rent Control Act, 1999", url: "https://bombayhighcourt.nic.in/libweb/acts/1999.18.pdf", jurisdiction: "Maharashtra", sourceType: "statute", directlyUsed: true, confidence: "high" },
    { id: "src3", title: "National Legal Services Authority (NALSA)", url: "https://nalsa.gov.in/", jurisdiction: "India (Central)", sourceType: "legal-aid-org", directlyUsed: false, confidence: "high" },
    { id: "src4", title: "Maharashtra State Legal Services Authority", url: "https://mslsa.gov.in/", jurisdiction: "Maharashtra", sourceType: "legal-aid-org", directlyUsed: false, confidence: "high" },
    { id: "src5", title: "Mumbai District Legal Services Authority", url: "https://doj.gov.in/page/district-legal-services-authorities", jurisdiction: "Mumbai, Maharashtra", sourceType: "legal-aid-org", directlyUsed: false, confidence: "medium" }
  ],
  safetyLevel: "yellow",
  safetyReason: "This notice involves a potential eviction with a 15-day deadline. While this is not an emergency, it requires prompt attention and legal advice. The tenant may have significant protections under the Maharashtra Rent Control Act.",
  humanReviewNeeded: true,
  humanReviewReason: "A qualified lawyer should review the tenancy agreement and confirm whether the Maharashtra Rent Control Act applies to this tenancy. The legal validity of the 15-day eviction deadline needs professional verification.",
  timeline: [
    { id: "tl1", title: "Tenancy Agreement Signed", date: "15/09/2023", description: "Original rent agreement between Ramesh Kumar and Suresh Patil", confidence: "high", source: "document", editable: true },
    { id: "tl2", title: "First Verbal Request to Vacate", date: "15/07/2026", description: "Landlord claims he verbally asked tenant to vacate", confidence: "medium", source: "document", editable: true },
    { id: "tl3", title: "Second Verbal Request to Vacate", date: "01/08/2026", description: "Landlord claims second verbal request to vacate", confidence: "medium", source: "document", editable: true },
    { id: "tl4", title: "Legal Notice Issued", date: "01/09/2026", description: "Formal legal notice sent through Advocate Priya Sharma", confidence: "high", source: "document", editable: true },
    { id: "tl5", title: "Stated Deadline to Vacate", date: "16/09/2026", description: "15-day deadline to vacate as stated in notice. Legal enforceability requires verification.", confidence: "medium", source: "inferred", editable: true }
  ],
  todayChecklist: [
    "Read and understand the notice (NyayaSathi helped with this).",
    "Find and keep your rent agreement safely.",
    "Collect your last 6 months of rent receipts or bank statements.",
    "Call Legal Aid Helpline 15100 for free advice.",
    "Do NOT sign anything or agree to leave immediately."
  ]
};

export const DEMO_VOICE_FACTS: VoiceStoryFacts = {
  whoIsInvolved: ["Ramesh Kumar (tenant)", "Suresh Patil (landlord)", "Ramesh's children (school-going)"],
  whatHappened: "Landlord sent an eviction notice asking tenant to leave in 15 days. Tenant has been living in the flat for 3 years and pays rent regularly.",
  whenItHappened: "Notice received last week (approximately late August/early September 2026). Tenant has been living in the flat since approximately September 2023.",
  whereItHappened: "Rented flat in Andheri West, Mumbai, Maharashtra",
  whatEvidenceExists: ["Rent receipts for most months", "The eviction notice itself"],
  whatUserWants: "To understand if the notice is legal and what rights the tenant has. Does not want to leave because children attend school nearby.",
  whatIsUncertain: ["Whether the tenant has a written rent agreement", "Exact date the notice was received", "Whether all rent payments were by receipt or bank transfer", "Whether the flat falls under rent control"]
};

export const DEMO_DASHBOARD_STATS = {
  noticesAnalyzed: 1247,
  timelinesCreated: 983,
  legalAidReached: 456,
  documentsOrganized: 3891,
  casesEscalated: 234
};
`);

// ============================================================
// 5. AI WRAPPER (Mock + OpenAI ready)
// ============================================================
writeFile('src/lib/ai.ts', `
import { CaseAnalysis, VoiceStoryFacts } from './types';
import { DEMO_ANALYSIS, DEMO_VOICE_FACTS } from './demoData';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

export async function analyzeDocument(text: string, language: string, issue: string): Promise<CaseAnalysis> {
  // If OpenAI key is configured, use real API
  if (OPENAI_API_KEY) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${OPENAI_API_KEY}\`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: \`You are NyayaSathi, an AI legal-information assistant for India. You are NOT a lawyer. You provide general legal information, explain documents, identify parties, dates, deadlines, issue areas, missing info, evidence checklists, safe next steps, things to avoid, questions for a lawyer, and source citations. You must flag uncertainty. You must never guarantee outcomes. For every source citation, only use real, verifiable Indian legal sources. Return your analysis as a JSON object matching this TypeScript interface: CaseAnalysis. Language preference: \${language}. Issue category: \${issue}.\`
            },
            {
              role: 'user',
              content: \`Please analyze this legal document/notice and provide a complete CaseAnalysis JSON:\\n\\n\${text}\`
            }
          ],
          temperature: 0.3,
          response_format: { type: 'json_object' }
        }),
      });
      const data = await res.json();
      return JSON.parse(data.choices[0].message.content) as CaseAnalysis;
    } catch (error) {
      console.error('OpenAI API error, falling back to demo:', error);
      return DEMO_ANALYSIS;
    }
  }

  // Fallback: return demo data
  return new Promise((resolve) => {
    setTimeout(() => resolve(DEMO_ANALYSIS), 2000);
  });
}

export async function extractVoiceStoryFacts(transcript: string, language: string): Promise<VoiceStoryFacts> {
  if (OPENAI_API_KEY) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${OPENAI_API_KEY}\`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are NyayaSathi. Extract structured facts from a user\\'s spoken legal story. Return JSON matching VoiceStoryFacts interface with: whoIsInvolved, whatHappened, whenItHappened, whereItHappened, whatEvidenceExists, whatUserWants, whatIsUncertain.'
            },
            { role: 'user', content: transcript }
          ],
          temperature: 0.3,
          response_format: { type: 'json_object' }
        }),
      });
      const data = await res.json();
      return JSON.parse(data.choices[0].message.content) as VoiceStoryFacts;
    } catch {
      return DEMO_VOICE_FACTS;
    }
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(DEMO_VOICE_FACTS), 1500);
  });
}
`);

// ============================================================
// 6. GLOBALS CSS (premium)
// ============================================================
writeFile('src/app/globals.css', `
@import "tailwindcss";

@layer base {
  :root {
    --color-primary: #00bf95;
    --color-primary-light: #26c9a5;
    --color-primary-dark: #008c73;
    --color-secondary: #0064ff;
    --color-bg-dark: #0f1419;
    --color-bg-card: #1a2332;
    --color-bg-card-hover: #1e2a3a;
    --color-text-primary: #f0f4f8;
    --color-text-secondary: #94a3b8;
    --color-border: #2d3748;
    --color-green: #22c55e;
    --color-yellow: #eab308;
    --color-red: #ef4444;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-inter), 'Segoe UI', system-ui, -apple-system, sans-serif;
    background: var(--color-bg-dark);
    color: var(--color-text-primary);
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .font-devanagari {
    font-family: var(--font-devanagari), 'Noto Sans Devanagari', sans-serif;
  }
}

@layer components {
  .glass-card {
    background: rgba(26, 35, 50, 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(45, 55, 72, 0.5);
    border-radius: 16px;
    transition: all 0.3s ease;
  }

  .glass-card:hover {
    background: rgba(30, 42, 58, 0.9);
    border-color: rgba(0, 191, 149, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 191, 149, 0.1);
  }

  .gradient-text {
    background: linear-gradient(135deg, #00bf95 0%, #0064ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .gradient-border {
    position: relative;
    border: none;
  }
  .gradient-border::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, #00bf95, #0064ff);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  .btn-primary {
    background: linear-gradient(135deg, #00bf95 0%, #00a984 100%);
    color: white;
    font-weight: 600;
    padding: 12px 28px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
  }
  .btn-primary:hover {
    background: linear-gradient(135deg, #26c9a5 0%, #00bf95 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(0, 191, 149, 0.3);
  }

  .btn-secondary {
    background: transparent;
    color: var(--color-primary);
    font-weight: 600;
    padding: 12px 28px;
    border-radius: 12px;
    border: 1px solid var(--color-primary);
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
  }
  .btn-secondary:hover {
    background: rgba(0, 191, 149, 0.1);
    transform: translateY(-1px);
  }

  .btn-danger {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    font-weight: 600;
    padding: 12px 28px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .btn-danger:hover {
    box-shadow: 0 4px 20px rgba(239, 68, 68, 0.3);
  }

  .safety-green {
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.3);
    color: #22c55e;
  }
  .safety-yellow {
    background: rgba(234, 179, 8, 0.1);
    border: 1px solid rgba(234, 179, 8, 0.3);
    color: #eab308;
  }
  .safety-red {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #ef4444;
  }

  .confidence-high {
    background: rgba(34, 197, 94, 0.15);
    color: #22c55e;
    padding: 2px 10px;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
  }
  .confidence-medium {
    background: rgba(234, 179, 8, 0.15);
    color: #eab308;
    padding: 2px 10px;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
  }
  .confidence-low {
    background: rgba(239, 68, 68, 0.15);
    color: #ef4444;
    padding: 2px 10px;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .timeline-line {
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #00bf95, #0064ff);
  }

  .pulse-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #00bf95;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(0, 191, 149, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(0, 191, 149, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 191, 149, 0); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.5s ease-out forwards;
  }

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .animate-slide-in {
    animation: slideInRight 0.4s ease-out forwards;
  }

  .input-field {
    background: rgba(26, 35, 50, 0.6);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 12px 16px;
    color: var(--color-text-primary);
    font-size: 1rem;
    width: 100%;
    transition: border-color 0.3s ease;
  }
  .input-field:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(0, 191, 149, 0.1);
  }

  .dropzone {
    border: 2px dashed var(--color-border);
    border-radius: 16px;
    padding: 48px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .dropzone:hover, .dropzone.active {
    border-color: var(--color-primary);
    background: rgba(0, 191, 149, 0.05);
  }

  .stat-card {
    background: linear-gradient(135deg, rgba(26, 35, 50, 0.9), rgba(15, 20, 25, 0.9));
    border: 1px solid rgba(45, 55, 72, 0.5);
    border-radius: 16px;
    padding: 24px;
    text-align: center;
    transition: all 0.3s ease;
  }
  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 191, 149, 0.15);
    border-color: rgba(0, 191, 149, 0.3);
  }
}
`);

// ============================================================
// 7. LAYOUT.TSX (Root)
// ============================================================
writeFile('src/app/layout.tsx', `
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Noto_Sans_Devanagari } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const devanagari = Noto_Sans_Devanagari({ subsets: ['devanagari'], variable: '--font-devanagari', weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'NyayaSathi - Understand Your Legal Notice',
  description: 'AI-powered legal information assistant for India. Understand your legal notice. Know your next safe step.',
  keywords: ['legal aid', 'India', 'legal notice', 'tenant rights', 'eviction', 'NALSA'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={\`\${inter.variable} \${devanagari.variable}\`}>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
`);

// ============================================================
// 8. LANDING PAGE
// ============================================================
writeFile('src/app/page.tsx', `
'use client';
import { useState } from 'react';
import Link from 'next/link';

const features = [
  { icon: '📄', title: 'Upload & Understand', desc: 'Upload your legal notice as PDF, JPG, or PNG. Get a plain-language explanation.' },
  { icon: '🎤', title: 'Tell Your Story', desc: 'Describe your situation by voice or text. We organize the facts for you.' },
  { icon: '📅', title: 'Timeline & Deadlines', desc: 'See all important dates and deadlines extracted from your documents.' },
  { icon: '🗂️', title: 'Evidence Locker', desc: 'Organize your documents and see what evidence you might need.' },
  { icon: '🛡️', title: 'Safety Routing', desc: 'Urgent issues are flagged for immediate human support.' },
  { icon: '⚖️', title: 'Legal Aid Connect', desc: 'Find NALSA and state/district legal aid resources near you.' },
];

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
];

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(15, 20, 25, 0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(45,55,72,0.4)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚖️</span>
            <span className="text-xl font-bold gradient-text">NyayaSathi</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/en/dashboard" className="text-sm text-gray-400 hover:text-white transition">Impact Dashboard</Link>
            <div className="flex gap-2">
              {languages.map(l => (
                <Link key={l.code} href={\`/\${l.code}/select-issue\`}
                  className="px-3 py-1.5 text-sm rounded-lg border border-gray-700 hover:border-teal-500 hover:text-teal-400 transition text-gray-300">
                  {l.native}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,191,149,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(0,100,255,0.1) 0%, transparent 50%)'
        }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm" style={{ background: 'rgba(0,191,149,0.1)', border: '1px solid rgba(0,191,149,0.2)' }}>
            <span className="pulse-dot" /> <span className="text-teal-400">AI-Powered Legal Information Assistant</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">NyayaSathi</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
            Understand your legal notice. Know your next safe step.
          </p>
          <p className="text-base text-gray-500 mb-10 max-w-2xl mx-auto">
            न्यायसाथी — अपनी कानूनी नोटिस समझें। अपना अगला सुरक्षित कदम जानें।
          </p>

          {/* Language Selection */}
          <div className="flex flex-col items-center gap-6">
            <p className="text-gray-400 text-sm uppercase tracking-wider">Choose your language / अपनी भाषा चुनें</p>
            <div className="flex flex-wrap justify-center gap-4">
              {languages.map(l => (
                <Link key={l.code} href={\`/\${l.code}/select-issue\`}
                  className="btn-primary flex items-center gap-3 text-lg px-8 py-4 hover:scale-105 transition-transform">
                  <span>{l.native}</span>
                  <span className="text-teal-200 text-sm">({l.name})</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 gradient-text">How NyayaSathi Helps You</h2>
          <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">Upload a legal notice, tell your story, and get clear, actionable information — all in your language.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i}
                className="glass-card p-6 cursor-default animate-fade-in-up"
                style={{ animationDelay: \`\${i * 0.1}s\` }}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}>
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-white">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto safety-yellow rounded-2xl p-6 text-center">
          <p className="text-sm font-medium" style={{ color: '#eab308' }}>
            ⚠️ <strong>Important:</strong> NyayaSathi is NOT a lawyer and does NOT provide legal advice. It provides general legal information only. Always consult a qualified lawyer for your specific situation.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t" style={{ borderColor: 'rgba(45,55,72,0.4)' }}>
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} NyayaSathi • General Legal Information Only • Not Legal Advice</p>
        <div className="flex justify-center gap-6 mt-3">
          <Link href="/en/dashboard" className="text-gray-500 hover:text-teal-400 text-sm transition">Impact Dashboard</Link>
          <a href="https://nalsa.gov.in/" target="_blank" rel="noopener" className="text-gray-500 hover:text-teal-400 text-sm transition">NALSA</a>
          <span className="text-gray-500 text-sm">Legal Aid Helpline: 15100</span>
        </div>
      </footer>
    </div>
  );
}
`);

// ============================================================
// 9. SELECT ISSUE PAGE
// ============================================================
writeFile('src/app/[lang]/select-issue/page.tsx', `
'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { t } from '../../../lib/i18n';

const issues = [
  { id: 'rent-eviction', icon: '🏠', colorFrom: '#00bf95', colorTo: '#008c73' },
  { id: 'employment', icon: '💼', colorFrom: '#0064ff', colorTo: '#004ecc' },
  { id: 'consumer', icon: '🛒', colorFrom: '#8b5cf6', colorTo: '#6d28d9' },
  { id: 'domestic-violence', icon: '🛡️', colorFrom: '#ef4444', colorTo: '#dc2626' },
  { id: 'other', icon: '📋', colorFrom: '#6b7280', colorTo: '#4b5563' },
];

const issueKeys: Record<string, { name: string; desc: string }> = {
  'rent-eviction': { name: 'rent', desc: 'rentDesc' },
  'employment': { name: 'employment', desc: 'employmentDesc' },
  'consumer': { name: 'consumer', desc: 'consumerDesc' },
  'domestic-violence': { name: 'domestic', desc: 'domesticDesc' },
  'other': { name: 'other', desc: 'otherDesc' },
};

export default function SelectIssuePage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header style={{ background: 'rgba(15, 20, 25, 0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(45,55,72,0.4)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl">⚖️</span>
            <span className="text-xl font-bold gradient-text">{t(lang, 'app.title')}</span>
          </Link>
          <Link href={\`/\${lang}/dashboard\`} className="text-sm text-gray-400 hover:text-white transition">{t(lang, 'nav.dashboard')}</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2 gradient-text">{t(lang, 'issues.title')}</h1>
        <p className="text-gray-400 mb-10">{t(lang, 'app.tagline')}</p>

        <div className="grid md:grid-cols-2 gap-6">
          {issues.map((issue, i) => {
            const keys = issueKeys[issue.id];
            return (
              <Link key={issue.id} href={\`/\${lang}/case/\${issue.id}\`}
                className="glass-card p-6 flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: \`\${i * 0.1}s\` }}>
                <div className="text-4xl w-14 h-14 flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ background: \`linear-gradient(135deg, \${issue.colorFrom}22, \${issue.colorTo}22)\` }}>
                  {issue.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{t(lang, \`issues.\${keys.name}\`)}</h3>
                  <p className="text-gray-400 text-sm">{t(lang, \`issues.\${keys.desc}\`)}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 safety-yellow rounded-2xl p-4 text-center">
          <p className="text-sm" style={{ color: '#eab308' }}>⚠️ {t(lang, 'app.disclaimer')}</p>
        </div>
      </main>
    </div>
  );
}
`);

// ============================================================
// 10. MAIN CASE PAGE (The big one - full wizard + results)
// ============================================================
writeFile('src/app/[lang]/case/[issue]/page.tsx', `
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
      <div className={\`\${c.className} rounded-2xl p-5 mb-6 animate-fade-in-up\`}>
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
    <span className={\`confidence-\${level}\`}>{t(lang, \`common.\${level}\`)}</span>
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
              className={\`px-3 py-1.5 text-sm rounded-lg border transition \${lowLiteracy ? 'border-teal-500 text-teal-400 bg-teal-500/10' : 'border-gray-700 text-gray-400'}\`}>
              {lowLiteracy ? '📖 Low-Literacy ON' : '📖 Low-Literacy'}
            </button>
            <Link href={\`/\${lang}/select-issue\`} className="text-sm text-gray-400 hover:text-white transition">{t(lang, 'common.back')}</Link>
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
                    className={\`w-full py-4 rounded-xl font-semibold text-lg transition-all \${isRecording
                      ? 'bg-red-500/20 border border-red-500 text-red-400 animate-pulse'
                      : 'btn-secondary'}\`}>
                    {isRecording ? \`🔴 \${t(lang, 'upload.recording')}\` : \`🎤 \${t(lang, 'upload.startRecording')}\`}
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
                  className={\`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap \${activeTab === tab.id
                    ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'}\`}>
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
                  <p className={\`text-gray-300 leading-relaxed \${lowLiteracy ? 'text-lg' : 'text-base'}\`}>{analysis.summary}</p>
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
                      <div key={event.id} className="relative mb-6 pl-8 animate-fade-in-up" style={{animationDelay:\`\${i*0.1}s\`}}>
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
                        <span className={\`text-sm text-gray-300 \${lowLiteracy ? 'text-base' : ''}\`}>{item}</span>
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
                        <span className={\`text-sm text-gray-300 \${lowLiteracy ? 'text-base' : ''}\`}>{item}</span>
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
                    className={\`btn-primary w-full py-4 text-lg \${!consentGiven ? 'opacity-50 cursor-not-allowed' : ''}\`}>
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
`);

// ============================================================
// 11. DASHBOARD PAGE
// ============================================================
writeFile('src/app/[lang]/dashboard/page.tsx', `
'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { t } from '../../../lib/i18n';
import { DEMO_DASHBOARD_STATS } from '../../../lib/demoData';

export default function DashboardPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const stats = DEMO_DASHBOARD_STATS;

  const cards = [
    { label: t(lang, 'dashboard.noticesAnalyzed'), value: stats.noticesAnalyzed, icon: '📄', color: '#00bf95' },
    { label: t(lang, 'dashboard.timelinesCreated'), value: stats.timelinesCreated, icon: '📅', color: '#0064ff' },
    { label: t(lang, 'dashboard.legalAidReached'), value: stats.legalAidReached, icon: '⚖️', color: '#8b5cf6' },
    { label: t(lang, 'dashboard.documentsOrganized'), value: stats.documentsOrganized, icon: '🗂️', color: '#eab308' },
    { label: t(lang, 'dashboard.casesEscalated'), value: stats.casesEscalated, icon: '🚨', color: '#ef4444' },
  ];

  return (
    <div className="min-h-screen">
      <header style={{ background: 'rgba(15, 20, 25, 0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(45,55,72,0.4)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl">⚖️</span>
            <span className="text-xl font-bold gradient-text">{t(lang, 'app.title')}</span>
          </Link>
          <Link href={\`/\${lang}/select-issue\`} className="btn-primary text-sm">{t(lang, 'landing.getStarted')}</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-3">{t(lang, 'dashboard.title')}</h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{background:'rgba(234,179,8,0.1)', border:'1px solid rgba(234,179,8,0.2)'}}>
            <span className="text-yellow-400 text-sm">⚠️ {t(lang, 'dashboard.subtitle')}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {cards.map((card, i) => (
            <div key={i} className="stat-card animate-fade-in-up" style={{animationDelay:\`\${i*0.1}s\`}}>
              <div className="text-4xl mb-3">{card.icon}</div>
              <div className="text-3xl font-bold mb-1" style={{color: card.color}}>{card.value.toLocaleString()}</div>
              <p className="text-sm text-gray-400">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Demo chart visual */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-bold text-white mb-6">Monthly Trend (Demo Data)</h2>
          <div className="flex items-end gap-3 h-48">
            {[35, 52, 78, 95, 120, 145, 168, 190, 210, 245, 280, 320].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-t-lg transition-all hover:opacity-80 animate-fade-in-up"
                  style={{
                    height: \`\${(val / 320) * 100}%\`,
                    background: \`linear-gradient(to top, rgba(0,191,149,0.3), rgba(0,100,255,0.3))\`,
                    border: '1px solid rgba(0,191,149,0.2)',
                    animationDelay: \`\${i * 0.05}s\`
                  }} />
                <span className="text-xs text-gray-500">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
`);

// ============================================================
// 12. ENV TEMPLATE
// ============================================================
writeFile('.env.local.example', `
# NyayaSathi Environment Variables

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# OpenAI (optional - demo works without it)
OPENAI_API_KEY=your-openai-api-key
`);

// ============================================================
// 13. API ROUTE - ANALYZE
// ============================================================
writeFile('src/app/api/analyze/route.ts', `
import { NextRequest, NextResponse } from 'next/server';
import { analyzeDocument } from '../../../lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, language, issue } = body;

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    const analysis = await analyzeDocument(text, language || 'en', issue || 'other');
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
`);

// Done!
console.log('\\n✅ NYAYASATHI setup complete!');
console.log('All files created successfully.');
console.log('Run: npm run dev');
