import { NextRequest, NextResponse } from 'next/server';
import { createPayment } from '@/lib/bachs';

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, email, name, description, metadata } = await request.json();

    // Validate required fields
    if (!amount || !currency || !email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, currency, email, name' },
        { status: 400 }
      );
    }

    // Validate currency
    if (!['NGN', 'USD'].includes(currency)) {
      return NextResponse.json(
        { error: 'Invalid currency. Must be NGN or USD' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create payment with Bachs.io
    const paymentResult = await createPayment({
      amount,
      currency,
      email,
      name,
      description,
      metadata,
    });

    if (paymentResult.success) {
      return NextResponse.json(
        {
          success: true,
          payment_url: paymentResult.payment_url,
          payment_id: paymentResult.payment_id,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: paymentResult.error || 'Payment creation failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
