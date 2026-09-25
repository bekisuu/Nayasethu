import { ChatMessage, IssueCategory } from './types';
import { LEGAL_AID_RESOURCES } from './directoryData';

export interface StarterPrompt {
  id: string;
  category: IssueCategory;
  badge: string;
  question: string;
  helperText: string;
}

export const STARTER_PROMPTS: StarterPrompt[] = [
  {
    id: 'eviction-notice',
    category: 'housing-eviction',
    badge: 'Housing & Rent',
    question: 'My landlord gave me a 7-day notice to vacate without returning my security deposit. What are my rights?',
    helperText: 'Learn about notice periods, rent control protections, and deposit recovery.'
  },
  {
    id: 'unpaid-salary',
    category: 'employment-wages',
    badge: 'Workplace & Salary',
    question: 'My company has not paid my salary for 2 months and is threatening termination if I ask. Can they do this?',
    helperText: 'Understand the Payment of Wages Act, notice pay, and Labor Commissioner remedies.'
  },
  {
    id: 'consumer-refusal',
    category: 'consumer-rights',
    badge: 'Consumer & Refunds',
    question: 'An online appliance seller delivered a broken refrigerator and is refusing replacement or refund. How can I file a complaint?',
    helperText: 'Step-by-step guidance on National Consumer Helpline and e-Daakhil filing.'
  },
  {
    id: 'cheque-bounce',
    category: 'debt-loans',
    badge: 'Cheque & Debts',
    question: 'I received a legal notice under Section 138 of the Negotiable Instruments Act for a cheque return. What must I do in 15 days?',
    helperText: 'Know the 15-day statutory reply timeline and defense steps.'
  },
  {
    id: 'domestic-safety',
    category: 'family-safety',
    badge: 'Safety & Family',
    question: 'I am facing severe verbal and physical harassment at home. How can I seek emergency legal protection and residence order?',
    helperText: 'Emergency Protection Orders under the Protection of Women from Domestic Violence Act (PWDVA).'
  }
];

export const PRESET_RESPONSES: Record<string, Partial<ChatMessage>> = {
  'eviction-notice': {
    plainLanguageSummary:
      'In India, a landlord cannot forcibly evict a tenant in 7 days or without due legal process, nor can they arbitrarily withhold your legitimate security deposit.',
    keyRights: [
      'Right to Mandatory Notice Period: Standard tenancy agreements and state Rent Control Acts require a minimum 15 to 30 days written notice before eviction proceedings can begin.',
      'Protection against Self-Help Eviction: A landlord cannot cut off your water/electricity, change locks, or throw belongings out. Doing so is an offense under State Rent Control Laws and Section 341 of IPC/BNS.',
      'Right to Refund of Security Deposit: If no structural damage beyond normal wear and tear exists and rent is clear, the deposit must be returned upon handover.'
    ],
    safeNextSteps: [
      'Do not panic and do not vacate immediately under verbal pressure or threats.',
      'Send a polite, written reply (via Registered Post AD or Email/WhatsApp) acknowledging receipt and requesting the legally required 30-day timeline and full deposit adjustment.',
      'Collect all payment receipts, bank transfer statements, and your stamped rental agreement copy.',
      'If the landlord threatens physical force or utility disconnection, visit your local Police Station or contact your District Legal Services Authority (DLSA) for immediate protection.'
    ],
    thingsToAvoid: [
      'Do NOT sign any blank paper, unilateral waiver, or immediate surrender note.',
      'Do NOT stop paying agreed monthly rent while staying, as non-payment weakens your legal standing; pay via verifiable bank transfer.',
      'Do NOT engage in physical altercations.'
    ],
    relevantLaws: [
      'Model Tenancy Act / State Rent Control Acts (e.g., Maharashtra Rent Control Act 1999)',
      'Transfer of Property Act, 1882 (Section 106 - Notice to terminate lease)',
      'Indian Penal Code / Bharatiya Nyaya Sanhita (Wrongful restraint & criminal intimidation)'
    ],
    suggestedResources: [
      LEGAL_AID_RESOURCES[1], // SLSA Maharashtra
      LEGAL_AID_RESOURCES[2]  // DLSA Mumbai
    ],
    confidence: 'high',
    disclaimer:
      'This guidance explains general tenant protections in India. Because tenancy laws vary slightly by state and lease contract terms, consult a free DLSA legal aid panel lawyer for a formal notice reply.',
    humanReviewRecommended: true
  },
  'unpaid-salary': {
    plainLanguageSummary:
      'Withholding earned salary is illegal under Indian labor law. An employer cannot withhold wages as retaliation or terminate you without paying statutory dues.',
    keyRights: [
      'Payment of Wages: Section 5 of the Payment of Wages Act mandates wage disbursement within 7 to 10 days of the wage period end.',
      'Full and Final Settlement: Upon resignation or termination, earned salary, encashable leaves, and gratuity (if 5+ years service) must be settled within the statutory period.',
      'Protection against arbitrary firing: Most state Shops & Establishments Acts require 30 days written notice or 30 days salary in lieu of notice.'
    ],
    safeNextSteps: [
      'Download and backup all proof of employment (Offer letter, salary slips, bank statements, attendance logs, and emails) onto your personal drive.',
      'Send a formal, polite email to HR/Management citing your pending dues and asking for a release date within 7 business days.',
      'If they fail to respond or threaten you, file a free grievance online at Samadhan Portal (samadhan.labour.gov.in) or lodge a complaint with your local Labor Commissioner Office.'
    ],
    thingsToAvoid: [
      'Do NOT delete your work emails or messages without keeping personal copies.',
      'Do NOT sign a "No Dues Certificate" or release waiver until the funds have actually cleared into your bank account.'
    ],
    relevantLaws: [
      'Payment of Wages Act, 1936',
      'Industrial Disputes Act, 1947',
      'State Shops and Commercial Establishments Act'
    ],
    suggestedResources: [
      LEGAL_AID_RESOURCES[7], // Labor Commissioner
      LEGAL_AID_RESOURCES[0]  // NALSA
    ],
    confidence: 'high',
    disclaimer:
      'This information is for general guidance under Indian employment regulations. Formal labor conciliation can be initiated for free through the Labor Commissioner or District Legal Services.',
    humanReviewRecommended: true
  },
  'consumer-refusal': {
    plainLanguageSummary:
      'Under the Consumer Protection Act 2019, delivering a defective good and refusing replacement or refund constitutes an unfair trade practice and a deficiency of service.',
    keyRights: [
      'Right to Replacement or Full Refund: If a delivered item is defective, damaged, or not as advertised, the seller/e-commerce platform is legally bound to resolve it.',
      'Product Liability: The manufacturer and the seller are jointly liable for damages caused by defective products.',
      'Zero-Cost Grievance: You can file a complaint with the National Consumer Helpline without paying court fees or hiring an advocate.'
    ],
    safeNextSteps: [
      'Preserve unboxing photos/videos, invoice copy, technician inspection report, and customer support chat transcripts.',
      'Call the National Consumer Helpline at 1915 (Toll-Free) or register a ticket on consumerhelpline.gov.in with order invoice number.',
      'If unaddressed, file a direct consumer case online via e-Daakhil (edaakhil.nic.in) for refund plus compensation for mental agony.'
    ],
    thingsToAvoid: [
      'Do NOT allow third-party unauthorized repairs if the product is under official warranty.',
      'Do NOT discard packaging or shipping labels until the dispute is resolved.'
    ],
    relevantLaws: [
      'Consumer Protection Act, 2019',
      'Consumer Protection (E-Commerce) Rules, 2020'
    ],
    suggestedResources: [
      LEGAL_AID_RESOURCES[5], // NCH Helpline 1915
      LEGAL_AID_RESOURCES[0]  // NALSA
    ],
    confidence: 'high',
    disclaimer:
      'Consumer disputes in India can be resolved swiftly via the 1915 National Consumer Helpline or the e-Daakhil district commission portal.',
    humanReviewRecommended: false
  },
  'cheque-bounce': {
    plainLanguageSummary:
      'A Section 138 notice is a serious legal notice regarding a dishonoured cheque. You strictly have 15 days from the date of receiving the notice to respond or pay before a criminal complaint can be filed.',
    keyRights: [
      '15-Day Statutory Cure Period: The law gives the drawer 15 days from notice receipt to make payment or reply with valid defenses.',
      'Defense of No Legally Enforceable Debt: If the cheque was given as security, under coercion, or if goods were never delivered, you have legitimate defenses.',
      'Right to Legal Defense: You are entitled to free legal aid defense via DLSA if you cannot afford a private advocate.'
    ],
    safeNextSteps: [
      'Note down the exact date and postal tracking of when you received the notice (this starts the 15-day clock).',
      'Consult a legal aid advocate immediately to draft a formal legal reply within 15 days.',
      'Gather bank statements, underlying contract, receipts, or WhatsApp messages proving why the amount was disputed or not legally due.'
    ],
    thingsToAvoid: [
      'Do NOT ignore the notice. Failing to reply within 15 days allows the complainant to file a criminal case in the Magistrate court.',
      'Do NOT send an informal or casual reply without legal review.'
    ],
    relevantLaws: [
      'Section 138 to 142, Negotiable Instruments Act, 1881',
      'Code of Criminal Procedure / Bharatiya Nagarik Suraksha Sanhita'
    ],
    suggestedResources: [
      LEGAL_AID_RESOURCES[2], // DLSA Mumbai City
      LEGAL_AID_RESOURCES[0]  // NALSA Helpline
    ],
    confidence: 'high',
    disclaimer:
      'Section 138 NI Act involves strict statutory time limitations. We strongly recommend immediate assistance from a qualified legal aid advocate or DLSA clinic.',
    humanReviewRecommended: true
  },
  'domestic-safety': {
    plainLanguageSummary:
      'You are entitled to immediate, free safety, residence, and maintenance protection under the Protection of Women from Domestic Violence Act (PWDVA 2005). You cannot be evicted from your shared household.',
    keyRights: [
      'Right to Reside in Shared Household: Section 17 protects your right to continue living in the shared matrimonial home regardless of ownership.',
      'Protection Orders: A Magistrate can immediately prohibit the respondent from committing violence, contacting you, or entering your workplace.',
      'Free Legal Aid & Shelter: Under Section 12 of the Legal Services Authorities Act, you receive 100% free legal representation and access to state shelter homes and medical aid.'
    ],
    safeNextSteps: [
      'If you are in immediate physical danger, call Emergency Helpline 112 or Women Helpline 181 / 7827170170 immediately.',
      'Approach your local Protection Officer (PO) or District Legal Services Authority (DLSA) to file a Form I DIR (Domestic Incident Report) for an urgent interim protection order.',
      'Keep your identity documents (Aadhaar, Voter ID), children\'s certificates, bank passbooks, and medical prescription proofs in a safe, accessible location.'
    ],
    thingsToAvoid: [
      'Do NOT stay alone in an unmonitored location if violent threats have been made.',
      'Do NOT feel pressured into signing mutual compromise deeds without an independent legal aid lawyer present.'
    ],
    relevantLaws: [
      'Protection of Women from Domestic Violence Act, 2005 (PWDVA)',
      'Section 85 & 86 of Bharatiya Nyaya Sanhita (Cruelty by Husband or Relatives)',
      'Legal Services Authorities Act, 1987 (Sec 12 - Free Legal Aid for Women)'
    ],
    suggestedResources: [
      LEGAL_AID_RESOURCES[6], // NCW Helpline
      LEGAL_AID_RESOURCES[0]  // NALSA 15100
    ],
    confidence: 'high',
    disclaimer:
      'If you or your children are facing imminent danger, please call 112 or 181 immediately. Legal aid protection orders can be obtained within 24-48 hours through DLSA.',
    humanReviewRecommended: true
  }
};
