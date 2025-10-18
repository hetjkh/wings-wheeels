import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Get your Google Sheets Web App URL from the environment variable
    const GOOGLE_SHEETS_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
    
    if (!GOOGLE_SHEETS_URL) {
      console.error('Google Sheets URL not configured');
      // Still return success to not break user experience
      return NextResponse.json({ 
        success: true, 
        message: 'Form submitted (Google Sheets not configured)' 
      });
    }

    // Forward the data to Google Sheets
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit to Google Sheets');
    }

    const result = await response.json();

    return NextResponse.json({ 
      success: true, 
      message: 'Lead submitted successfully',
      data: result 
    });

  } catch (error) {
    console.error('Error submitting lead:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}

