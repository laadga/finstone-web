import { NextResponse } from 'next/server';
import seedData from '../../../src/data/seed.json';

export async function GET() {
  try {
    return NextResponse.json(seedData);
  } catch (error) {
    console.error('Error loading seed data:', error);
    return NextResponse.json({ error: 'Failed to load seed data' }, { status: 500 });
  }
}





















