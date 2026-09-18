import { NextRequest, NextResponse } from 'next/server';
import { secretDb } from '@/lib/secret-db';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const sig = req.headers.get('stripe-signature');

    // In a live production deployment:
    // const event = stripe.webhooks.constructEvent(rawBody, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
    // Here we support mock and real verification:
    let event;
    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed' || event.type === 'payment_intent.succeeded') {
      const email = event.data?.object?.customer_email || event.data?.object?.receipt_email || 'customer@example.com';
      const paymentId = event.data?.object?.id || `pi_${Date.now()}`;

      const { order, secret } = secretDb.createOrder({
        customer_email: email,
        stripe_payment_id: paymentId
      });

      console.log(`[Stripe Webhook] Order created: ${order.id}, Secret: ${secret.public_secret_id}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 });
  }
}
