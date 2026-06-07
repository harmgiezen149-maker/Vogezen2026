import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const KEY = 'vogezen2026:inpakken';

// De volledige staat is één document:
// {
//   categories: [{ id, name }],
//   items: [{ id, categoryId, label, qty, checked }],
//   updatedBy, updatedAt
// }
const EMPTY = { categories: [], items: [], updatedBy: null, updatedAt: null };

export async function GET() {
  try {
    const data = await redis.get(KEY);
    return Response.json(data ?? EMPTY);
  } catch (err) {
    return Response.json({ error: 'load_failed' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = {
      categories: Array.isArray(body.categories) ? body.categories : [],
      items: Array.isArray(body.items) ? body.items : [],
      updatedBy: body.updatedBy ?? null,
      updatedAt: new Date().toISOString(),
    };
    await redis.set(KEY, payload);
    return Response.json(payload);
  } catch (err) {
    return Response.json({ error: 'save_failed' }, { status: 500 });
  }
}
