import { NextRequest, NextResponse } from 'next/server';
import { secretDb } from '@/lib/secret-db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, paymentMethodId } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    // In a live production environment with real Stripe credentials:
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const paymentIntent = await stripe.paymentIntents.create({...});
    // For local test / production-ready simulated checkout:
    const mockPaymentId = `pi_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const { order, secret } = secretDb.createOrder({
      customer_email: email,
      customer_name: name || 'Anonymous Collector',
      stripe_payment_id: mockPaymentId
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      secretId: secret.public_secret_id,
      revealAt: secret.reveal_at,
      email: order.customer_email,
      message: 'Your Secret has been secured.'
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred processing your checkout.' },
      { status: 500 }
    );
  }
}
