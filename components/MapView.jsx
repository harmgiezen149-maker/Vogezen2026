'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Filter, X, ExternalLink } from 'lucide-react';
import {
  COLORS, CATEGORIES, DEFAULT_ACTIVITIES, DAYS, SUGGESTED_PLAN,
  MESSIRES_COORDS, CLERVAUX_COORDS, getMapsLink, applyLocationOverride,
} from '@/lib/data';

// ============ API CLIENT (read-only) ============

const getPin = () => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('vosges-pin') || '';
};

async function fetchPlan() {
  const res = await fetch('/api/plan', {
    method: 'GET',
    headers: { 'X-Family-Pin': getPin() },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(res.status === 401 ? 'unauthorized' : `HTTP ${res.status}`);
  return res.json();
}

// ============ MARKER ICON GENERATOR ============

// SVG marker met categoriekleur en getal (= aantal dagen gepland)
function buildIcon(L, color, label) {
  const html = `
    <div style="
      position: relative;
      width: 32px; height: 40px;
      filter: drop-shadow(0 2px 3px rgba(0,0,0,0.30));
    ">
      <svg viewBox="0 0 32 40" width="32" height="40" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0 C7 0 0 7 0 16 C0 25 16 40 16 40 C16 40 32 25 32 16 C32 7 25 0 16 0 Z"
              fill="${color}" stroke="#FAF3E1" stroke-width="2"/>
        <circle cx="16" cy="15" r="7" fill="#FAF3E1"/>
      </svg>
      <div style="
        position: absolute; top: 7px; left: 0; right: 0;
        text-align: center;
        font-family: 'DM Sans', sans-serif;
        font-size: 12px; font-weight: 700; color: ${color};
        line-height: 16px;
      ">${label}</div>
    </div>
  `;
  return L.divIcon({
    html,
    className: '',
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -36],
  });
}

function buildStayIcon(L, color, emoji) {
  const html = `
    <div style="
      width: 38px; height: 38px;
      border-radius: 50%;
      background: ${color};
      border: 3px solid #FAF3E1;
      box-shadow: 0 2px 6px rgba(0,0,0,0.30);
      display: flex; align-items: center; justify-content: center;
      font-size: 18px;
    ">${emoji}</div>
  `;
  return L.divIcon({
    html, className: '',
    iconSize: [38, 38], iconAnchor: [19, 19], popupAnchor: [0, -19],
  });
}

// ============ HELPER ============

function dayLabel(dayKey) {
  const d = DAYS.find(dd => dd.key === dayKey);
  return d ? `${d.dayShort} ${d.date}` : dayKey;
}

// ============ HEADER ============

const Header = ({ count, totalDays }) => (
  <div style={{
    padding: '14px 16px 12px',
    borderBottom: `1px solid ${COLORS.hairline}`,
    background: COLORS.cream,
    position: 'relative', zIndex: 10,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
      <Link
        href="/"
        style={{
          color: COLORS.forest, textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 13, fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <ArrowLeft size={16} /> Planning
      </Link>
      <span style={{ flex: 1 }} />
      <span style={{ fontSize: 11, color: COLORS.inkLight, letterSpacing: 1, textTransform: 'uppercase' }}>
        {count} markers · {totalDays} dagen
      </span>
    </div>
    <h1 style={{
      fontFamily: "'Fraunces', serif",
      fontSize: 22, margin: 0,
      color: COLORS.forest, fontWeight: 500, letterSpacing: '-0.01em',
    }}>
      Kaart <span style={{ fontStyle: 'italic', color: COLORS.lake }}>· geplande activiteiten</span>
    </h1>
  </div>
);

// ============ FILTER BAR ============

const FilterBar = ({ filter, setFilter }) => {
  const filters = [
    { key: 'all', label: 'Alles' },
    { key: 'week1', label: 'Vogezen' },
    { key: 'week2', label: 'Clervaux' },
  ];
  return (
    <div style={{
      display: 'flex', gap: 6,
      padding: '10px 16px',
      borderBottom: `1px solid ${COLORS.hairline}`,
      background: COLORS.cream,
      overflowX: 'auto',
      position: 'relative', zIndex: 9,
    }}>
      {filters.map(f => (
        <button
          key={f.key}
          onClick={() => setFilter(f.key)}
          style={{
            padding: '6px 12px',
            background: filter === f.key ? COLORS.forest : 'transparent',
            color: filter === f.key ? COLORS.cream : COLORS.ink,
            border: `1px solid ${filter === f.key ? COLORS.forest : COLORS.hairline}`,
            borderRadius: 99,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, fontWeight: 500,
            cursor: 'pointer', whiteSpace: 'nowrap',
          }}
        >{f.label}</button>
      ))}
    </div>
  );
};

// ============ LEGEND ============

const Legend = ({ visibleCategories }) => {
  const cats = Object.entries(CATEGORIES).filter(([k]) => visibleCategories.has(k));
  if (cats.length === 0) return null;
  return (
    <div style={{
      position: 'absolute',
      bottom: 12, left: 12, right: 12,
      background: 'rgba(244, 235, 213, 0.96)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderRadius: 12,
      padding: '10px 12px',
      border: `1px solid ${COLORS.hairline}`,
      boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
      zIndex: 400,
      maxHeight: '40vh', overflowY: 'auto',
    }}>
      <div style={{
        fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase',
        color: COLORS.inkLight, fontWeight: 600, marginBottom: 8,
      }}>Legenda</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 6,
      }}>
        {cats.map(([key, cat]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
            <span style={{
              display: 'inline-block', width: 10, height: 10, borderRadius: '50%',
              background: cat.color, flexShrink: 0,
            }} />
            <span style={{ color: COLORS.ink, fontWeight: 500 }}>{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============ MAIN ============

export default function MapView({ authRequired }) {
  const [plan, setPlan] = useState(null);
  const [customActivities, setCustomActivities] = useState([]);
  const [locationOverrides, setLocationOverrides] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const leafletRef = useRef(null);

  // Fetch plan from server
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPlan();
        setPlan(data.plan || {});
        setCustomActivities(data.customActivities || []);
        setLocationOverrides(data.locationOverrides || {});
      } catch (e) {
        if (e.message === 'unauthorized') {
          setError('Geen toegang — open eerst de planner om de PIN in te voeren.');
        } else {
          setError('Kan planning niet laden: ' + e.message);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Dynamically load Leaflet (browser-only)
  useEffect(() => {
    if (loading || error) return;
    let mounted = true;

    (async () => {
      // Load Leaflet CSS once
      if (!document.querySelector('link[data-leaflet]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        link.setAttribute('data-leaflet', '1');
        document.head.appendChild(link);
      }
      const L = await import('leaflet');
      if (!mounted) return;
      leafletRef.current = L;

      if (!mapRef.current && mapContainerRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [48.8, 6.5],
          zoom: 7,
          scrollWheelZoom: true,
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map);
        mapRef.current = map;
      }
    })();

    return () => {
      mounted = false;
    };
  }, [loading, error]);

  // Activities lookup met overrides
  const allActivities = useMemo(
    () => [...DEFAULT_ACTIVITIES, ...customActivities],
    [customActivities]
  );
  const activityById = useMemo(() => {
    const obj = {};
    allActivities.forEach(a => {
      obj[a.id] = applyLocationOverride(a, locationOverrides);
    });
    return obj;
  }, [allActivities, locationOverrides]);

  // Build marker data: { activity, days: ['2026-07-25', ...] }
  const markerData = useMemo(() => {
    if (!plan) return [];
    const map = new Map();
    Object.entries(plan).forEach(([dayKey, ids]) => {
      const day = DAYS.find(d => d.key === dayKey);
      if (!day) return;
      // filter by week
      if (filter === 'week1' && day.stay !== 'messires') return;
      if (filter === 'week2' && day.stay !== 'clervaux' && day.stay !== 'transfer') return;

      (ids || []).forEach(id => {
        const act = activityById[id];
        if (!act || !act.coords) return;
        if (!map.has(id)) map.set(id, { activity: act, days: [] });
        map.get(id).days.push(dayKey);
      });
    });
    return [...map.values()];
  }, [plan, activityById, filter]);

  const visibleCategories = useMemo(() => {
    const s = new Set();
    markerData.forEach(m => s.add(m.activity.category));
    return s;
  }, [markerData]);

  // Render markers
  useEffect(() => {
    const map = mapRef.current;
    const L = leafletRef.current;
    if (!map || !L) return;

    // Clear old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Always add the two stay markers
    const stayMarkers = [];
    if (filter !== 'week2') {
      const messires = L.marker(MESSIRES_COORDS, {
        icon: buildStayIcon(L, '#3A7E84', '🏕️'),
        zIndexOffset: 1000,
      }).addTo(map);
      messires.bindPopup(
        `<div style="font-family: 'DM Sans', sans-serif; min-width: 160px;">
          <div style="font-family: 'Fraunces', serif; font-size: 15px; color: #2D4F3E; font-weight: 500;">Domaine des Messires</div>
          <div style="font-size: 11px; color: rgba(31,41,34,0.55); margin-top: 2px;">Verblijf week 1 · Herpelmont</div>
        </div>`
      );
      stayMarkers.push(messires);
    }
    if (filter !== 'week1') {
      const clervaux = L.marker(CLERVAUX_COORDS, {
        icon: buildStayIcon(L, '#B08A3E', '🏡'),
        zIndexOffset: 1000,
      }).addTo(map);
      clervaux.bindPopup(
        `<div style="font-family: 'DM Sans', sans-serif; min-width: 160px;">
          <div style="font-family: 'Fraunces', serif; font-size: 15px; color: #2D4F3E; font-weight: 500;">Clervaux</div>
          <div style="font-size: 11px; color: rgba(31,41,34,0.55); margin-top: 2px;">Verblijf week 2 · Luxemburg</div>
        </div>`
      );
      stayMarkers.push(clervaux);
    }
    markersRef.current.push(...stayMarkers);

    // Activity markers
    markerData.forEach(({ activity, days }) => {
      const cat = CATEGORIES[activity.category] || CATEGORIES.custom;
      const label = days.length === 1 ? '' : String(days.length);
      const icon = buildIcon(L, cat.color, label);
      const marker = L.marker(activity.coords, { icon }).addTo(map);

      const dayChips = days
        .sort()
        .map(d => `<span style="
          display: inline-block;
          padding: 2px 7px;
          margin: 2px 3px 2px 0;
          background: ${cat.color}22;
          color: ${cat.color};
          border-radius: 99px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.3px;
        ">${dayLabel(d)}</span>`)
        .join('');

      const mapsLink = getMapsLink(activity);
      const mapsBtn = mapsLink
        ? `<a href="${mapsLink}" target="_blank" rel="noopener noreferrer"
              style="
                display: inline-flex; align-items: center; gap: 4px;
                margin-top: 10px;
                padding: 6px 10px;
                background: ${cat.color};
                color: #FAF3E1;
                border-radius: 8px;
                font-size: 11px; font-weight: 600;
                text-decoration: none;
                font-family: 'DM Sans', sans-serif;
              ">Open in Google Maps ↗</a>`
        : '';

      const noteHtml = activity.note
        ? `<div style="font-size: 11px; color: rgba(31,41,34,0.55); margin-top: 4px;">${activity.note}</div>`
        : '';

      marker.bindPopup(
        `<div style="font-family: 'DM Sans', sans-serif; min-width: 200px; max-width: 260px;">
          <div style="display:flex; align-items:center; gap:6px; margin-bottom: 4px;">
            <span style="font-size: 18px;">${activity.emoji}</span>
            <div style="font-family: 'Fraunces', serif; font-size: 15px; color: #2D4F3E; font-weight: 500; line-height: 1.2;">${activity.name}</div>
          </div>
          ${noteHtml}
          <div style="margin-top: 8px;">${dayChips}</div>
          ${mapsBtn}
        </div>`
      );
      markersRef.current.push(marker);
    });

    // Auto-fit bounds
    if (markersRef.current.length > 0) {
      const group = L.featureGroup(markersRef.current);
      try {
        map.fitBounds(group.getBounds().pad(0.15), { animate: false });
      } catch (e) { /* ignore */ }
    }
  }, [markerData, filter]);

  const totalDays = useMemo(() => {
    if (!plan) return 0;
    return Object.keys(plan).filter(k => (plan[k] || []).length > 0).length;
  }, [plan]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: COLORS.cream,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'DM Sans', sans-serif", color: COLORS.ink,
      }}>Kaart laden…</div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh', background: COLORS.cream,
        padding: 20, fontFamily: "'DM Sans', sans-serif",
      }}>
        <Link href="/" style={{ color: COLORS.forest, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
          <ArrowLeft size={16} /> Terug
        </Link>
        <div style={{
          marginTop: 24, padding: 20,
          background: COLORS.creamSoft, borderRadius: 12,
          color: COLORS.ink, fontSize: 14,
        }}>{error}</div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: COLORS.cream,
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
    }}>
      <Header count={markerData.length} totalDays={totalDays} />
      <FilterBar filter={filter} setFilter={setFilter} />
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <div
          ref={mapContainerRef}
          style={{ position: 'absolute', inset: 0, background: '#dde6e6' }}
        />
        <Legend visibleCategories={visibleCategories} />
      </div>
      <style>{`
        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          background: #FAF3E1 !important;
        }
        .leaflet-popup-tip {
          background: #FAF3E1 !important;
        }
        .leaflet-popup-content {
          margin: 12px 14px !important;
        }
        html, body { overflow: hidden; }
      `}</style>
    </div>
  );
}
