// Bachs.io Payment Integration Library

const BACHS_API_URL = process.env.BACHS_API_URL || 'https://api.bachs.io';
const BACHS_SECRET_KEY = process.env.BACHS_SECRET_KEY;

export interface BachsPaymentRequest {
  amount: number;
  currency: 'NGN' | 'USD';
  email: string;
  name: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface BachsSubscriptionRequest {
  plan_id: string;
  email: string;
  name: string;
  currency: 'NGN' | 'USD';
  metadata?: Record<string, any>;
}

export interface BachsPaymentResponse {
  success: boolean;
  payment_url?: string;
  payment_id?: string;
  error?: string;
}

export interface BachsSubscriptionResponse {
  success: boolean;
  subscription_url?: string;
  subscription_id?: string;
  error?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price_ngn: number;
  price_usd: number;
  interval: 'monthly' | 'yearly';
  features: string[];
}

// Subscription Plans Configuration
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'starter-monthly',
    name: 'Starter Plan',
    description: 'Perfect for individuals and small projects',
    price_ngn: 15000,
    price_usd: 15,
    interval: 'monthly',
    features: [
      'Basic web development',
      'Responsive design',
      '2 revisions',
      'Email support',
      '1 month maintenance'
    ]
  },
  {
    id: 'professional-monthly',
    name: 'Professional Plan',
    description: 'Ideal for growing businesses',
    price_ngn: 35000,
    price_usd: 35,
    interval: 'monthly',
    features: [
      'Advanced web development',
      'Custom features',
      'SEO optimization',
      'Priority support',
      '3 months maintenance',
      'Performance optimization'
    ]
  },
  {
    id: 'enterprise-monthly',
    name: 'Enterprise Plan',
    description: 'For large-scale projects and teams',
    price_ngn: 75000,
    price_usd: 75,
    interval: 'monthly',
    features: [
      'Full-stack development',
      'Custom API development',
      'Cloud infrastructure setup',
      '24/7 support',
      '6 months maintenance',
      'Advanced analytics',
      'Security audit'
    ]
  },
  {
    id: 'starter-yearly',
    name: 'Starter Plan (Yearly)',
    description: 'Perfect for individuals and small projects - Save 20%',
    price_ngn: 144000,
    price_usd: 144,
    interval: 'yearly',
    features: [
      'Basic web development',
      'Responsive design',
      'Unlimited revisions',
      'Priority email support',
      '12 months maintenance',
      'Save 20% compared to monthly'
    ]
  },
  {
    id: 'professional-yearly',
    name: 'Professional Plan (Yearly)',
    description: 'Ideal for growing businesses - Save 20%',
    price_ngn: 336000,
    price_usd: 336,
    interval: 'yearly',
    features: [
      'Advanced web development',
      'Custom features',
      'SEO optimization',
      '24/7 priority support',
      '12 months maintenance',
      'Performance optimization',
      'Save 20% compared to monthly'
    ]
  },
  {
    id: 'enterprise-yearly',
    name: 'Enterprise Plan (Yearly)',
    description: 'For large-scale projects and teams - Save 20%',
    price_ngn: 720000,
    price_usd: 720,
    interval: 'yearly',
    features: [
      'Full-stack development',
      'Custom API development',
      'Cloud infrastructure setup',
      'Dedicated account manager',
      '12 months maintenance',
      'Advanced analytics',
      'Security audit',
      'Save 20% compared to monthly'
    ]
  }
];

// Helper function to get plan price based on currency
export function getPlanPrice(plan: SubscriptionPlan, currency: 'NGN' | 'USD'): number {
  return currency === 'NGN' ? plan.price_ngn : plan.price_usd;
}

// Helper function to format price
export function formatPrice(amount: number, currency: 'NGN' | 'USD'): string {
  if (currency === 'NGN') {
    return `₦${amount.toLocaleString()}`;
  }
  return `$${amount.toLocaleString()}`;
}

// Create a payment transaction with Bachs.io
export async function createPayment(paymentData: BachsPaymentRequest): Promise<BachsPaymentResponse> {
  try {
    if (!BACHS_SECRET_KEY) {
      throw new Error('BACHS_SECRET_KEY is not configured');
    }

    const response = await fetch(`${BACHS_API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BACHS_SECRET_KEY}`,
      },
      body: JSON.stringify({
        amount: paymentData.amount,
        currency: paymentData.currency,
        email: paymentData.email,
        name: paymentData.name,
        description: paymentData.description || 'Service payment',
        metadata: paymentData.metadata || {},
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        payment_url: data.payment_url,
        payment_id: data.payment_id,
      };
    } else {
      return {
        success: false,
        error: data.message || 'Payment creation failed',
      };
    }
  } catch (error) {
    console.error('Bachs payment error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment service unavailable',
    };
  }
}

// Create a subscription with Bachs.io
export async function createSubscription(subscriptionData: BachsSubscriptionRequest): Promise<BachsSubscriptionResponse> {
  try {
    if (!BACHS_SECRET_KEY) {
      throw new Error('BACHS_SECRET_KEY is not configured');
    }

    const response = await fetch(`${BACHS_API_URL}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BACHS_SECRET_KEY}`,
      },
      body: JSON.stringify({
        plan_id: subscriptionData.plan_id,
        email: subscriptionData.email,
        name: subscriptionData.name,
        currency: subscriptionData.currency,
        metadata: subscriptionData.metadata || {},
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        subscription_url: data.subscription_url,
        subscription_id: data.subscription_id,
      };
    } else {
      return {
        success: false,
        error: data.message || 'Subscription creation failed',
      };
    }
  } catch (error) {
    console.error('Bachs subscription error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Subscription service unavailable',
    };
  }
}

// Verify a payment or subscription
export async function verifyTransaction(transactionId: string): Promise<any> {
  try {
    if (!BACHS_SECRET_KEY) {
      throw new Error('BACHS_SECRET_KEY is not configured');
    }

    const response = await fetch(`${BACHS_API_URL}/transactions/${transactionId}/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${BACHS_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: data,
      };
    } else {
      return {
        success: false,
        error: data.message || 'Verification failed',
      };
    }
  } catch (error) {
    console.error('Bachs verification error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Verification service unavailable',
    };
  }
}
