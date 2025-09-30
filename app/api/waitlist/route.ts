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

    // Try to save to Airtable first, fallback to file storage
    let saved = false;
    
    try {
      saved = await AirtableService.saveWaitlistSignup(waitlistData);
      console.log('✅ Waitlist signup saved to Airtable');
    } catch (airtableError) {
      console.log('⚠️ Airtable not configured, saving to file instead');
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
