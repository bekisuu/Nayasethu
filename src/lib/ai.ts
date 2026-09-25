
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
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: `You are NyayaSathi, an AI legal-information assistant for India. You are NOT a lawyer. You provide general legal information, explain documents, identify parties, dates, deadlines, issue areas, missing info, evidence checklists, safe next steps, things to avoid, questions for a lawyer, and source citations. You must flag uncertainty. You must never guarantee outcomes. For every source citation, only use real, verifiable Indian legal sources. Return your analysis as a JSON object matching this TypeScript interface: CaseAnalysis. Language preference: ${language}. Issue category: ${issue}.`
            },
            {
              role: 'user',
              content: `Please analyze this legal document/notice and provide a complete CaseAnalysis JSON:\n\n${text}`
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
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are NyayaSathi. Extract structured facts from a user\'s spoken legal story. Return JSON matching VoiceStoryFacts interface with: whoIsInvolved, whatHappened, whenItHappened, whereItHappened, whatEvidenceExists, whatUserWants, whatIsUncertain.'
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
