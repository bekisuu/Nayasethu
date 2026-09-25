
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
