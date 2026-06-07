import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const KEY = 'vogezen2026:checklist';

// GET: huidige status van afgevinkte items + wie laatst bijwerkte
export async function GET() {
  try {
    const data = await redis.get(KEY);
    return Response.json(data ?? { checked: {}, updatedBy: null, updatedAt: null });
  } catch (err) {
    return Response.json({ error: 'load_failed' }, { status: 500 });
  }
}

// POST: sla de volledige checked-state op
export async function POST(request) {
  try {
    const body = await request.json();
    const payload = {
      checked: body.checked ?? {},
      updatedBy: body.updatedBy ?? null,
      updatedAt: new Date().toISOString(),
    };
    await redis.set(KEY, payload);
    return Response.json(payload);
  } catch (err) {
    return Response.json({ error: 'save_failed' }, { status: 500 });
  }
}
