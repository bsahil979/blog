import { NextRequest, NextResponse } from 'next/server';
import { secretDb } from '@/lib/secret-db';

export async function GET(req: NextRequest) {
  const metrics = secretDb.getMetrics();
  const secrets = secretDb.getAllSecrets();
  const orders = secretDb.getAllOrders();

  return NextResponse.json({
    metrics,
    secrets,
    orders
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, publicId, ...data } = body;

    if (action === 'create') {
      const newSecret = secretDb.createSecret({
        title: data.title || 'New Digital Mystery',
        subtitle: data.subtitle,
        content: typeof data.content === 'string' ? data.content : JSON.stringify(data.content),
        content_type: data.content_type || 'interactive',
        reveal_at: data.reveal_at || new Date(Date.now() + 86400000 * 7).toISOString(),
        metadata: data.metadata
      });
      return NextResponse.json({ success: true, secret: newSecret });
    }

    if (action === 'toggle_status') {
      const secret = secretDb.getSecretByPublicId(publicId);
      if (!secret) {
        return NextResponse.json({ error: 'Secret not found' }, { status: 404 });
      }
      const newStatus = secret.status === 'revealed' ? 'scheduled' : 'revealed';
      const updated = secretDb.updateSecret(publicId, { status: newStatus });
      return NextResponse.json({ success: true, secret: updated });
    }

    if (action === 'update_reveal') {
      const updated = secretDb.updateSecret(publicId, { reveal_at: data.reveal_at });
      return NextResponse.json({ success: true, secret: updated });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Admin POST error:', error);
    return NextResponse.json({ error: 'Failed to process admin request' }, { status: 500 });
  }
}
