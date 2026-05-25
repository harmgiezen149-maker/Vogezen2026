import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Simpele in-memory cache per server instance (4 uur)
const cache = new Map();
const CACHE_TTL = 4 * 60 * 60 * 1000;

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
  // Voorkom onbeperkte groei
  if (cache.size > 200) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
}

// Rate limiter (sober): max 30 calls/minuut per IP
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

  try {
    const body = await request.json();
    const points = Array.isArray(body?.points) ? body.points : [];
    // points: [[lat, lng], [lat, lng], ...]
    if (points.length < 2) {
      return NextResponse.json({ segments: [], totalDistance: 0, totalDuration: 0, geometry: null });
    }
    if (points.length > 20) {
      return NextResponse.json({ error: 'Te veel punten (max 20)' }, { status: 400 });
    }

    // Cache key op basis van afgeronde coords (5 decimalen = ~1m)
    const cacheKey = points
      .map(([lat, lng]) => `${lat.toFixed(5)},${lng.toFixed(5)}`)
      .join('|');
    const cached = cacheGet(cacheKey);
    if (cached) return NextResponse.json(cached);

    // OSRM: lon,lat (let op de volgorde!)
    const coordStr = points
      .map(([lat, lng]) => `${lng},${lat}`)
      .join(';');

    const url = `https://router.project-osrm.org/route/v1/driving/${coordStr}` +
      `?overview=full&geometries=geojson&steps=false&annotations=duration,distance`;

    const res = await fetch(url, {
      headers: { 'User-Agent': 'VosgesPlanner/1.0' },
    });
    if (!res.ok) {
      return NextResponse.json({ error: `Routing fout ${res.status}` }, { status: 502 });
    }
    const data = await res.json();
    if (data.code !== 'Ok' || !data.routes?.[0]) {
      return NextResponse.json({ error: 'Geen route gevonden' }, { status: 404 });
    }

    const route = data.routes[0];
    // OSRM 'legs': lengte = points.length - 1
    const segments = (route.legs || []).map((leg) => ({
      distance: leg.distance, // meters
      duration: leg.duration, // seconds
    }));

    const result = {
      segments,
      totalDistance: route.distance, // meters
      totalDuration: route.duration, // seconds
      geometry: route.geometry, // GeoJSON LineString
    };

    cacheSet(cacheKey, result);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
