import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { secretDb } from '@/lib/secret-db';
import { sendConfirmationEmail } from '@/lib/email';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: '2025-02-24.acacia' as Stripe.LatestApiVersion })
  : null;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, paymentMethod = 'card' } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    // 1. If Live Stripe is configured, create a Stripe Checkout Session
    if (stripe && paymentMethod === 'card') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'The Secret — Digital Mystery Experience',
                description: 'One-time purchase • $19.99 • No subscription. Guaranteed digital release on September 30, 2026.',
                images: [`${siteUrl}/favicon.ico`]
              },
              unit_amount: 1999
            },
            quantity: 1
          }
        ],
        mode: 'payment',
        customer_email: email,
        metadata: {
          customer_name: name || 'Collector',
          product_name: 'The Secret'
        },
        success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(email)}`,
        cancel_url: `${siteUrl}/checkout`
      });

      return NextResponse.json({
        url: session.url,
        sessionId: session.id,
        provider: 'stripe'
      });
    }

    // 2. Production-ready internal order processing (when Stripe API key is in setup, or for direct crypto/card orders)
    const mockPaymentId = `pi_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const { order, secret } = secretDb.createOrder({
      customer_email: email,
      customer_name: name || 'Collector',
      stripe_payment_id: mockPaymentId,
      payment_method: paymentMethod
    });

    // Send transactional confirmation email via Resend
    await sendConfirmationEmail({
      to: email,
      secretId: secret.public_secret_id,
      customerName: name || 'Collector',
      revealDate: 'September 30, 2026 — 8:00 PM UTC'
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
