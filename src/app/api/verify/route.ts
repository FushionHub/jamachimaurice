import { NextRequest, NextResponse } from 'next/server';
import { verifyTransaction } from '@/lib/bachs';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const transactionId = searchParams.get('transaction_id');

    if (!transactionId) {
      return NextResponse.json(
        { error: 'Missing transaction_id parameter' },
        { status: 400 }
      );
    }

    // Verify transaction with Bachs.io
    const verificationResult = await verifyTransaction(transactionId);

    if (verificationResult.success) {
      return NextResponse.json(
        {
          success: true,
          data: verificationResult.data,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: verificationResult.error || 'Verification failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Verification API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
