import { LegalAidResource } from './types';

export const LEGAL_AID_RESOURCES: LegalAidResource[] = [
  {
    id: 'nalsa-national',
    name: 'National Legal Services Authority (NALSA)',
    category: 'government',
    city: 'New Delhi',
    state: 'National / All India',
    phone: '011-23386176',
    tollFree: '15100',
    email: 'nalsa-dla@nic.in',
    website: 'https://nalsa.gov.in',
    address: 'B-Block, Additional Building Complex, Supreme Court of India, New Delhi - 110001',
    servicesProvided: [
      'Free legal aid & lawyer assignment for eligible citizens',
      'Lok Adalat dispute resolution',
      'Legal literacy camps & victim compensation'
    ],
    eligibility: 'Women & children, SC/ST members, industrial workmen, custody persons, and citizens with annual income < ₹3,00,000 (Section 12 of LSA Act)',
    isVerified: true,
    timings: '24/7 Helpline (15100), Offices: 10:00 AM - 5:30 PM (Mon-Sat)'
  },
  {
    id: 'slsa-maharashtra',
    name: 'Maharashtra State Legal Services Authority (MSLSA)',
    category: 'slsa',
    city: 'Mumbai',
    state: 'Maharashtra',
    phone: '022-22691395',
    tollFree: '15100',
    email: 'mslsa-bhc@nic.in',
    website: 'https://mslsa.gov.in',
    address: '105, PWD Building, High Court, Fort, Mumbai - 400032',
    servicesProvided: [
      'State High Court legal representation',
      'Pre-litigation mediation & settlement',
      'Tenant & eviction defense assistance'
    ],
    eligibility: 'Residents of Maharashtra with annual income under ₹3,00,000, all women, senior citizens, and persons in custody',
    isVerified: true,
    timings: '10:00 AM - 5:30 PM (Monday to Saturday)'
  },
  {
    id: 'dlsa-mumbai-city',
    name: 'District Legal Services Authority (DLSA) Mumbai City',
    category: 'dlsa',
    city: 'Mumbai',
    state: 'Maharashtra',
    phone: '022-22621008',
    email: 'dlsa.mumbaicity@gov.in',
    website: 'https://mumbaicity.dcourts.gov.in',
    address: 'City Civil & Sessions Court, Old Secretariat Building, Fort, Mumbai - 400032',
    servicesProvided: [
      'District Court free defense advocate',
      'Cheque bounce / 138 NI Act legal advice',
      'Domestic violence protection filings',
      'Rental dispute mediation'
    ],
    eligibility: 'Low-income individuals, domestic violence survivors, daily wage workers',
    isVerified: true,
    timings: '10:30 AM - 5:00 PM (Monday to Friday)'
  },
  {
    id: 'dlsa-delhi-central',
    name: 'Delhi State Legal Services Authority (DSLSA)',
    category: 'slsa',
    city: 'New Delhi',
    state: 'Delhi (NCR)',
    phone: '011-23384781',
    tollFree: '1516',
    email: 'dslsa-phc@nic.in',
    website: 'https://dslsa.org',
    address: 'Central Office, Patiala House Courts, New Delhi - 110001',
    servicesProvided: [
      'Full legal defense across all Delhi district courts',
      'Workplace wage recovery assistance',
      'Emergency 24x7 helpline legal guidance'
    ],
    eligibility: 'All citizens in Delhi with annual income up to ₹3,00,000, plus all women and minors',
    isVerified: true,
    timings: '24/7 Helpline (1516), Courts office 10 AM - 5 PM'
  },
  {
    id: 'dlsa-bengaluru-urban',
    name: 'Karnataka State Legal Services Authority (KSLSA)',
    category: 'slsa',
    city: 'Bengaluru',
    state: 'Karnataka',
    phone: '080-22111725',
    tollFree: '15100',
    email: 'kslsa.bangalore@gmail.com',
    website: 'https://kslsa.kar.nic.in',
    address: 'Nyaya Degula, 1st Floor, H. Siddaiah Road, Bengaluru - 560027',
    servicesProvided: [
      'IT & Gig worker unfair termination counseling',
      'Tenant deposit refund mediation',
      'Free panel lawyers for civil and criminal cases'
    ],
    eligibility: 'Karnataka residents with income under ₹3 Lakhs, women, SC/ST, and disabled persons',
    isVerified: true,
    timings: '10:00 AM - 5:30 PM (Mon-Sat)'
  },
  {
    id: 'nch-consumer-helpline',
    name: 'National Consumer Helpline (NCH - Consumer Affairs)',
    category: 'government',
    city: 'New Delhi',
    state: 'National / All India',
    phone: '011-23070776',
    tollFree: '1915',
    website: 'https://consumerhelpline.gov.in',
    address: 'Department of Consumer Affairs, Krishi Bhawan, New Delhi - 110001',
    servicesProvided: [
      'Consumer e-Daakhil filing guidance',
      'Defective products & e-commerce refund disputes',
      'Company grievance escalation'
    ],
    eligibility: 'Open to all Indian consumers who purchased any goods or services',
    isVerified: true,
    timings: '8:00 AM - 8:00 PM (All days except National Holidays)'
  },
  {
    id: 'ncw-women-helpline',
    name: 'National Commission for Women (NCW) Legal Cell',
    category: 'helpline',
    city: 'New Delhi',
    state: 'National / All India',
    phone: '011-26942369',
    tollFree: '7827170170',
    website: 'https://ncw.nic.in',
    address: 'Plot 21, Jasola Institutional Area, New Delhi - 110025',
    servicesProvided: [
      '24/7 Women distress helpline',
      'Domestic violence & workplace harassment protection counseling',
      'Free legal counselling and police station assistance'
    ],
    eligibility: 'Free for any woman facing distress or legal violations across India',
    isVerified: true,
    timings: '24/7 Toll-Free: 7827170170 / 181'
  },
  {
    id: 'labor-commissioner-mumbai',
    name: 'Office of the Labor Commissioner (Wages & Gratuity)',
    category: 'court-clinic',
    city: 'Mumbai',
    state: 'Maharashtra',
    phone: '022-26573801',
    email: 'complaints.labour@maharashtra.gov.in',
    website: 'https://mahakamgar.maharashtra.gov.in',
    address: 'Kamgar Bhavan, C-20, E-Block, Bandra Kurla Complex, Bandra (E), Mumbai - 400051',
    servicesProvided: [
      'Non-payment of salary / wages conciliation',
      'Gratuity & PF claim assistance',
      'Wrongful termination conciliation'
    ],
    eligibility: 'All private, contract, and daily-wage employees',
    isVerified: true,
    timings: '10:00 AM - 5:00 PM (Monday to Friday)'
  }
];
