import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// In-memory cache per server instance (24 uur).
// Routes veranderen niet, dus we cachen agressief.
const cache = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000;

function cacheGet(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.at > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}
function cacheSet(key, value) {
  cache.set(key, { at: Date.now(), value });
  if (cache.size > 500) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
}

// Rate limiter: max 30 calls/minuut per IP
const recentRequests = new Map();
function rateLimitOK(ip) {
  const now = Date.now();
  const arr = (recentRequests.get(ip) || []).filter(t => now - t < 60_000);
  if (arr.length >= 30) return false;
  arr.push(now);
  recentRequests.set(ip, arr);
  return true;
}

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  if (!rateLimitOK(ip)) {
    return NextResponse.json({ error: 'Te veel verzoeken' }, { status: 429 });
  }

  const apiKey = process.env.ORS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      error: 'ORS_API_KEY niet ingesteld. Maak gratis een key op openrouteservice.org en zet hem in Vercel env vars.',
    }, { status: 500 });
  }

  try {
    const body = await request.json();
    const points = Array.isArray(body?.points) ? body.points : [];
    // points: [[lat, lng], [lat, lng], ...]
    if (points.length < 2) {
      return NextResponse.json({ segments: [], totalDistance: 0, totalDuration: 0, geometry: null });
    }
    if (points.length > 50) {
      return NextResponse.json({ error: 'Te veel punten (max 50)' }, { status: 400 });
    }

    // Cache key op afgeronde coords (5 decimalen ≈ 1m)
    const cacheKey = points
      .map(([lat, lng]) => `${lat.toFixed(5)},${lng.toFixed(5)}`)
      .join('|');
    const cached = cacheGet(cacheKey);
    if (cached) return NextResponse.json(cached);

    // OpenRouteService verwacht [lng, lat] (let op de volgorde!)
    const coordinates = points.map(([lat, lng]) => [lng, lat]);

    const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
        'Accept': 'application/json, application/geo+json',
      },
      body: JSON.stringify({
        coordinates,
        instructions: false,
        geometry_simplify: true,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return NextResponse.json({
        error: `OpenRouteService fout ${res.status}`,
        details: text.slice(0, 300),
      }, { status: 502 });
    }

    const data = await res.json();
    const feature = data?.features?.[0];
    if (!feature) {
      return NextResponse.json({ error: 'Geen route gevonden' }, { status: 404 });
    }

    const summary = feature.properties?.summary || {};
    const segs = Array.isArray(feature.properties?.segments) ? feature.properties.segments : [];

    const segments = segs.map(s => ({
      distance: s.distance, // meters
      duration: s.duration, // seconds
    }));

    const result = {
      segments,
      totalDistance: summary.distance || 0,
      totalDuration: summary.duration || 0,
      geometry: feature.geometry, // GeoJSON LineString
    };

    cacheSet(cacheKey, result);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
