import { NextResponse } from 'next/server';
import { getRedis, PLAN_KEY } from '@/lib/redis';
import { SUGGESTED_PLAN } from '@/lib/data';

export const dynamic = 'force-dynamic';

// Optionele simpele auth via FAMILY_PIN env var
function checkAuth(request) {
  const expectedPin = process.env.FAMILY_PIN;
  if (!expectedPin) return null; // geen auth ingesteld → open
  const provided = request.headers.get('x-family-pin');
  if (provided !== expectedPin) {
    return NextResponse.json({ error: 'Ongeldige PIN' }, { status: 401 });
  }
  return null;
}

function emptyState() {
  return {
    plan: SUGGESTED_PLAN,
    customActivities: [],
    updatedAt: null,
    updatedBy: null,
    isInitial: true,
  };
}

function normalize(raw) {
  if (!raw) return null;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return raw;
}

export async function GET(request) {
  const authErr = checkAuth(request);
  if (authErr) return authErr;

  try {
    const redis = getRedis();
    const raw = await redis.get(PLAN_KEY);
    const data = normalize(raw);

    if (!data) {
      return NextResponse.json(emptyState());
    }

    return NextResponse.json({
      plan: data.plan || {},
      customActivities: Array.isArray(data.customActivities) ? data.customActivities : [],
      updatedAt: data.updatedAt || null,
      updatedBy: data.updatedBy || null,
      isInitial: false,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const authErr = checkAuth(request);
  if (authErr) return authErr;

  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Ongeldige body' }, { status: 400 });
    }

    const data = {
      plan: body.plan && typeof body.plan === 'object' ? body.plan : {},
      customActivities: Array.isArray(body.customActivities) ? body.customActivities : [],
      updatedAt: new Date().toISOString(),
      updatedBy: typeof body.updatedBy === 'string' ? body.updatedBy.slice(0, 40) : null,
    };

    const redis = getRedis();
    await redis.set(PLAN_KEY, JSON.stringify(data));

    return NextResponse.json({ ...data, isInitial: false });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
