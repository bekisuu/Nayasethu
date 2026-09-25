
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
          <Link href={`/${lang}/select-issue`} className="btn-primary text-sm">{t(lang, 'landing.getStarted')}</Link>
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
            <div key={i} className="stat-card animate-fade-in-up" style={{animationDelay:`${i*0.1}s`}}>
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
                    height: `${(val / 320) * 100}%`,
                    background: `linear-gradient(to top, rgba(0,191,149,0.3), rgba(0,100,255,0.3))`,
                    border: '1px solid rgba(0,191,149,0.2)',
                    animationDelay: `${i * 0.05}s`
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
