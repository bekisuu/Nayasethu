
import { CaseAnalysis, VoiceStoryFacts, EvidenceItem, TimelineEvent, SourceCitation } from './types';

export const DEMO_VOICE_TRANSCRIPT = `My name is Ramesh Kumar. I live in a rented flat in Andheri West, Mumbai. My landlord Mr. Suresh Patil sent me a notice last week saying I have to leave the flat in 15 days. I have been living here for 3 years and I always pay rent on time. The rent is Rs 15,000 per month. I have receipts for most months. He says he wants to renovate and sell the property. I don't know if this notice is legal or if I have any rights. I am very worried because my children go to school nearby. I don't know what to do.`;

export const DEMO_EVICTION_NOTICE = `LEGAL NOTICE

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
`;

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
