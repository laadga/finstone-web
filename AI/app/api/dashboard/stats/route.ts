import { NextResponse } from 'next/server';
import { mockApi } from '@/lib/mockApi';

export async function GET() {
  try {
    const result = await mockApi.getDashboardStats();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}





















