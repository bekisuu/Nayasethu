
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
