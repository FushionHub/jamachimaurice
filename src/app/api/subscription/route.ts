import { NextRequest, NextResponse } from 'next/server';
import { createSubscription } from '@/lib/bachs';

export async function POST(request: NextRequest) {
  try {
    const { plan_id, email, name, currency, metadata } = await request.json();

    // Validate required fields
    if (!plan_id || !email || !name || !currency) {
      return NextResponse.json(
        { error: 'Missing required fields: plan_id, email, name, currency' },
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

    // Create subscription with Bachs.io
    const subscriptionResult = await createSubscription({
      plan_id,
      email,
      name,
      currency,
      metadata,
    });

    if (subscriptionResult.success) {
      return NextResponse.json(
        {
          success: true,
          subscription_url: subscriptionResult.subscription_url,
          subscription_id: subscriptionResult.subscription_id,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: subscriptionResult.error || 'Subscription creation failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Subscription API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
