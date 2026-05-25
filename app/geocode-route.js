import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Simpele in-memory rate limiter per server instance
const recentRequests = new Map();
function rateLimitOK(ip) {
  const now = Date.now();
  const arr = (recentRequests.get(ip) || []).filter(t => now - t < 60_000);
  if (arr.length >= 30) return false;
  arr.push(now);
  recentRequests.set(ip, arr);
  return true;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').trim();
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  if (!rateLimitOK(ip)) {
    return NextResponse.json({ error: 'Te veel zoekopdrachten, wacht even.' }, { status: 429 });
  }

  try {
    // Beperk tot Frankrijk, Duitsland, Zwitserland, Luxemburg, België — onze reisregio
    const url = `https://nominatim.openstreetmap.org/search?` +
      `q=${encodeURIComponent(q)}` +
      `&format=json&limit=6&addressdetails=1` +
      `&countrycodes=fr,de,ch,lu,be,nl`;

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'VosgesPlanner/1.0 (familie-vakantie planner)',
        'Accept-Language': 'nl,fr,de,en',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `OpenStreetMap fout ${res.status}` }, { status: 502 });
    }

    const raw = await res.json();
    const results = raw.map(r => ({
      name: r.display_name,
      shortName: r.name || r.display_name.split(',')[0],
      lat: parseFloat(r.lat),
      lng: parseFloat(r.lon),
      type: r.type,
      address: r.address || {},
    }));

    return NextResponse.json({ results });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
