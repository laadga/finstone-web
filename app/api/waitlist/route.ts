import { NextRequest, NextResponse } from 'next/server';
import { AirtableService, saveToFile } from '@/lib/airtableService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const waitlistData = { email };

    // Debug environment variables
    console.log('🔍 Waitlist API Route Environment Debug:');
    console.log('AIRTABLE_API_KEY exists:', !!process.env.AIRTABLE_API_KEY);
    console.log('AIRTABLE_BASE_ID exists:', !!process.env.AIRTABLE_BASE_ID);
    console.log('All env vars:', Object.keys(process.env).filter(key => key.includes('AIRTABLE')));

    // Try to save to Airtable first, fallback to file storage
    let saved = false;
    
    try {
      saved = await AirtableService.saveWaitlistSignup(waitlistData);
      console.log('✅ Waitlist signup saved to Airtable');
    } catch (airtableError) {
      console.log('⚠️ Airtable error:', airtableError);
      console.log('⚠️ Saving to file instead');
      saved = await saveToFile('waitlist', waitlistData);
    }

    if (!saved) {
      // Still log to console as backup
      console.log('Waitlist Signup:', {
        ...waitlistData,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully added to waitlist',
        stored: saved
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
