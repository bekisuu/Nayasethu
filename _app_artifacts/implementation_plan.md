# NYAYASATHI Hackathon Demo Implementation Plan

## Goal Description
We will build a complete, hackathon‑ready web application **NYAYASATHI** that helps users in India understand legal notices and take safe next steps. The demo will focus on the rent/eviction notice use‑case but be architected to extend to employment, consumer, domestic‑violence, and other legal‑aid categories.

The app must:
- Support English, Hindi, Marathi UI.
- Allow document upload (PDF/JPG/PNG) with OCR.
- Accept typed or spoken story input.
- Provide AI‑generated plain‑language explanations, timelines, evidence locker, checklists, source citations, confidence levels, and safety routing.
- Offer a “lawyer‑ready case pack” export with explicit consent.
- Include a demo‑only impact dashboard.
- Use **Next.js (TypeScript, App Router)**, **Tailwind CSS**, **shadcn/ui**, and **Supabase** for backend storage and auth.
- Deliver a premium, modern UI (rich colors, micro‑animations, low‑literacy mode, etc.).

## User Review Required
> [!IMPORTANT] This plan involves significant architectural decisions and third‑party integrations. Please review the open questions below and confirm any preferences before we begin implementation.

## Open Questions
- **OCR Engine**: Use client‑side Tesseract.js (no server cost) or Supabase Edge Functions with a more accurate service (e.g., Google Vision). Which do you prefer for the demo?
- **Speech‑to‑Text**: Use the browser’s built‑in Web Speech API (demo mode) or integrate an external provider (e.g., AssemblyAI). Desired approach?
- **AI Model**: Call OpenAI’s GPT‑4o, use a local LLM via an API, or mock responses for the hackathon. Preference?
- **User Authentication**: Anonymous sessions vs Supabase Auth (email/password/social). Which is acceptable for the demo?
- **Hosting / Deployment**: Deploy to Vercel, Netlify, or run locally. Any preference?
- **Language Localization**: Use i18next with static JSON translations or a simpler manual mapping. Which approach suits the timeline?
- **Design Palette**: Approve a dark‑mode‑friendly teal‑blue gradient palette (example) or suggest alternatives.
- **Data Privacy**: For the demo, should uploaded files be stored temporarily and auto‑deleted after the session, or kept in Supabase storage?
- **Analytics**: Use Supabase analytics tables for the dashboard or mock static data?

## Proposed Changes (High‑Level Architecture & Files)
---
### Front‑end (Next.js App Router)
- **/app/layout.tsx** – Global layout with shadcn/ui Header/Footer, Tailwind config, font imports (Inter, Noto Sans Hindi/Marathi).
- **/app/page.tsx** – Landing page with tagline, language selector, and “Get Started”.
- **/app/[lang]/select-issue/page.tsx** – Issue selector UI.
- **/app/[lang]/case/new/page.tsx** – Multi‑step wizard (Upload → Story → Review → AI results).
- **/components/**
  - `LanguageSwitcher.tsx`
  - `IssueCard.tsx`
  - `UploadDropzone.tsx` (uses react-dropzone, thumbnail preview)
  - `OCRProcessor.tsx` (calls `/api/ocr`)
  - `StoryInput.tsx` (text area + microphone UI)
  - `EditableText.tsx` (original + plain‑language side‑by‑side view)
  - `TimelineEditor.tsx` (editable events, confidence chips)
  - `EvidenceLocker.tsx` (categorization UI)
  - `Checklist.tsx` (today’s actions / avoid list)
  - `CasePackExport.tsx` (consent checkbox + download JSON/PDF)
  - `Dashboard.tsx` (demo analytics visualisation)
- **/utils/i18n.ts** – Simple translation helper; optional i18next integration.
- **/styles/globals.css** – Tailwind base, custom color palette, low‑literacy typography.

---
### Backend (Supabase + Next.js API Routes)
- **Supabase tables**:
  - `users` (id, email, language)
  - `cases` (id, user_id, issue, language, created_at, status)
  - `documents` (id, case_id, file_url, type, ocr_text)
  - `facts` (id, case_id, key, value, confidence)
  - `timeline_events` (id, case_id, title, date, confidence)
  - `evidence` (id, case_id, category, file_url)
  - `referrals` (static list seeded for India)
  - `analytics` (demo counters)
- **API routes** (`/api/*`):
  - `ocr.ts` – Accepts file, runs OCR (Tesseract or external), returns extracted text.
  - `parse.ts` – Takes text, runs AI prompt to extract structured facts, dates, parties, etc.
  - `summarize.ts` – Generates plain‑language summary, safety routing, checklists.
  - `casepack.ts` – Bundles approved data into downloadable JSON/PDF.
  - `analytics.ts` – Increment demo counters.
- **AI Integration** (`/lib/ai.ts`):
  - Wrapper around chosen LLM endpoint; prompts engineered for each output (summary, timeline, evidence list, safety level).
  - Returns source citations (pre‑seeded statutory references for Indian tenancy law).

---
### Third‑Party Integrations
- **OCR**: Tesseract.js library client‑side (fallback to server if needed).
- **Speech**: Web Speech API with a demo transcript fallback.
- **Text‑to‑Speech**: Browser `speechSynthesis` for low‑literacy mode.
- **AI**: OpenAI `gpt-4o-mini` (cost‑effective) or mock function returning static demo data.

---
### Design & UI
- **Palette**: Dark background `hsl(210, 12%, 12%)`, accent teal `hsl(170, 80%, 40%)`, gradient cards.
- **Typography**: Inter for English, Noto Sans Devanagari for Hindi/Marathi.
- **Micro‑animations**: Tailwind `transition`, `hover:scale-105` on cards, animated timeline entries.
- **Low‑Literacy Mode**: Toggle switches UI, larger icons, numbered steps, “Read Aloud” button.
- **Safety Routing UI**: Colored banners (green/yellow/red) with explanatory tooltip.

---
### Verification Plan
- **Automated tests**: Jest + React Testing Library for component rendering; API route unit tests using Supabase mock client.
- **Manual QA**:
  1. Upload sample eviction notice PDF → OCR text appears → edit → generate summary.
  2. Record sample voice story (demo transcript) → fact extraction.
  3. Verify timeline events editable, confidence chips display.
  4. Export case pack and ensure JSON contains all sections.
  5. Check safety banner colors for red‑flag scenarios (e.g., “immediate eviction”).
  6. Switch language to Hindi/Marathi and confirm UI strings.
- **Performance**: Ensure page load < 3 s on typical 3G connection (static assets optimized). 

---
### Timeline for Hackathon (≈ 48 h)
| Phase | Tasks | Est. Hours |
|-------|-------|------------|
|Setup|Create repo, install Next.js, Tailwind, shadcn/ui, Supabase client, configure env|4|
|Auth & DB|Supabase schema, auth flow (optional anonymous), basic CRUD helpers|6|
|Core UI|Landing, language/issue selectors, upload wizard|8|
|OCR & Story|Integrate Tesseract, Web Speech UI, text editor|6|
|AI Backend|Prompt templates, wrapper, mock fallback, source citation data|8|
|Features|Timeline editor, evidence locker, checklists, safety routing UI|8|
|Case Pack & Dashboard|Export logic, demo analytics dashboard|4|
|Polish|Design refinements, micro‑animations, low‑literacy toggle, accessibility|4|
|Testing & Deploy|Write tests, run locally, deploy to Vercel (or provide instruction)|4|
|Buffer|Unexpected issues|? |

---
## Risks & Mitigations
- **OCR accuracy**: Provide editable text area for correction.
- **Legal disclaimer**: Prominently display non‑lawyer disclaimer on every page.
- **Model hallucination**: Include source citation block; flag uncertain answers with yellow banner.
- **Privacy**: Store files with supabase `public` bucket but auto‑delete after 24 h in demo.
- **Scope creep**: Stick to eviction‑notice demo; other issue types can be placeholders.

---
## Next Steps
1. Confirm choices for OCR, speech‑to‑text, AI model, auth, hosting, and design palette.
2. Once approved, begin repository scaffolding and implementation according to the phases above.

---
*Please review the open questions and provide any preferences or constraints so we can lock down the implementation plan and start building.*
