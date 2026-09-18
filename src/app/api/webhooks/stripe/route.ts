import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { secretDb } from '@/lib/secret-db';
import { sendConfirmationEmail } from '@/lib/email';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: '2025-02-24.acacia' as Stripe.LatestApiVersion })
  : null;

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const sig = req.headers.get('stripe-signature');

    let event: Stripe.Event;

    // If Stripe webhook secret is present, verify cryptographic signature
    if (stripe && stripeWebhookSecret && sig) {
      try {
        event = stripe.webhooks.constructEvent(rawBody, sig, stripeWebhookSecret);
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Signature verification failed';
        console.error(`[Stripe Webhook Verification Error]: ${errorMsg}`);
        return NextResponse.json({ error: errorMsg }, { status: 400 });
      }
    } else {
      // Fallback for payload testing
      try {
        event = JSON.parse(rawBody);
      } catch {
        return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
      }
    }

    // Handle completed checkout session
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email || session.customer_email || 'collector@thesecret.club';
      const name = session.customer_details?.name || session.metadata?.customer_name || 'Collector';
      const paymentId = (session.payment_intent as string) || session.id;

      // 1. Create order & unique Secret (stored in Supabase & internal database)
      const { order, secret } = secretDb.createOrder({
        customer_email: email,
        customer_name: name,
        stripe_payment_id: paymentId,
        payment_method: 'card'
      });

      // 2. Dispatch Confirmation Email via Resend
      await sendConfirmationEmail({
        to: email,
        secretId: secret.public_secret_id,
        customerName: name,
        revealDate: 'September 30, 2026 — 8:00 PM UTC'
      });

      console.log(`[Stripe Webhook] Order created: ${order.id}, Secret: ${secret.public_secret_id} for ${email}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
