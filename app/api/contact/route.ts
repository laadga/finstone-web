import { NextRequest, NextResponse } from 'next/server';
import { AirtableService, saveToFile } from '@/lib/airtableService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, service, message, newsletter } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const formData = {
      firstName,
      lastName,
      email,
      service,
      message,
      newsletter
    };

    // Debug environment variables
    console.log('🔍 API Route Environment Debug:');
    console.log('AIRTABLE_API_KEY exists:', !!process.env.AIRTABLE_API_KEY);
    console.log('AIRTABLE_BASE_ID exists:', !!process.env.AIRTABLE_BASE_ID);
    console.log('All env vars:', Object.keys(process.env).filter(key => key.includes('AIRTABLE')));

    // Try to save to Airtable first, fallback to file storage
    let saved = false;
    
    try {
      saved = await AirtableService.saveContactForm(formData);
      console.log('✅ Contact form saved to Airtable');
    } catch (airtableError) {
      console.log('⚠️ Airtable error:', airtableError);
      console.log('⚠️ Saving to file instead');
      saved = await saveToFile('contact', formData);
    }

    if (!saved) {
      // Still log to console as backup
      console.log('Contact Form Submission:', {
        ...formData,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        stored: saved
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
