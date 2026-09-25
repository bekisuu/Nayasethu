
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
          <Link href={`/${lang}/dashboard`} className="text-sm text-gray-400 hover:text-white transition">{t(lang, 'nav.dashboard')}</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2 gradient-text">{t(lang, 'issues.title')}</h1>
        <p className="text-gray-400 mb-10">{t(lang, 'app.tagline')}</p>

        <div className="grid md:grid-cols-2 gap-6">
          {issues.map((issue, i) => {
            const keys = issueKeys[issue.id];
            return (
              <Link key={issue.id} href={`/${lang}/case/${issue.id}`}
                className="glass-card p-6 flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-4xl w-14 h-14 flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${issue.colorFrom}22, ${issue.colorTo}22)` }}>
                  {issue.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{t(lang, `issues.${keys.name}`)}</h3>
                  <p className="text-gray-400 text-sm">{t(lang, `issues.${keys.desc}`)}</p>
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
