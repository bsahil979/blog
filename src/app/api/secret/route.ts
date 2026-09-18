import { NextRequest, NextResponse } from 'next/server';
import { secretDb } from '@/lib/secret-db';
import { isValidSecretId } from '@/lib/crypto';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Secret ID is required' }, { status: 400 });
  }

  const cleanId = id.trim().toUpperCase();

  if (!isValidSecretId(cleanId)) {
    return NextResponse.json(
      { error: 'Invalid Secret ID format. Expected SECRET-XXXXXX.' },
      { status: 400 }
    );
  }

  const publicView = secretDb.getPublicSecretView(cleanId);

  if (!publicView) {
    return NextResponse.json(
      { error: 'Secret not found. Please verify the ID or contact support.' },
      { status: 404 }
    );
  }

  return NextResponse.json(publicView);
}
