'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Plus, X, Trash2, RotateCcw, Sparkles, Calendar as CalendarIcon,
  ChevronRight, RefreshCw, User, Wifi, WifiOff, Check, AlertCircle, Lock,
} from 'lucide-react';
import {
  COLORS, CATEGORIES, DEFAULT_ACTIVITIES, DAYS, SUGGESTED_PLAN,
} from '@/lib/data';

// ============ API CLIENT ============

const getPin = () => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('vosges-pin') || '';
};
const setPin = (pin) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('vosges-pin', pin);
};
const getName = () => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('vosges-name') || '';
};
const setNameLS = (name) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('vosges-name', name);
};

async function apiGet() {
  const res = await fetch('/api/plan', {
    method: 'GET',
    headers: { 'X-Family-Pin': getPin() },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(res.status === 401 ? 'unauthorized' : `HTTP ${res.status}`);
  return res.json();
}

async function apiPut(plan, customActivities, name) {
  const res = await fetch('/api/plan', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Family-Pin': getPin(),
    },
    body: JSON.stringify({ plan, customActivities, updatedBy: name || null }),
  });
  if (!res.ok) throw new Error(res.status === 401 ? 'unauthorized' : `HTTP ${res.status}`);
  return res.json();
}

// ============ TOPO BACKGROUND ============

const TopoBackground = () => (
  <svg
    style={{
      position: 'fixed', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0, opacity: 0.6,
    }}
    aria-hidden="true"
  >
    <defs>
      <pattern id="topo" x="0" y="0" width="320" height="320" patternUnits="userSpaceOnUse">
        <path d="M -20 80 Q 60 40 140 70 T 320 90" fill="none" stroke={COLORS.forest} strokeWidth="0.6" opacity="0.10" />
        <path d="M -20 130 Q 80 100 160 125 T 340 135" fill="none" stroke={COLORS.forest} strokeWidth="0.6" opacity="0.08" />
        <path d="M -20 190 Q 100 150 180 180 T 340 200" fill="none" stroke={COLORS.lake} strokeWidth="0.6" opacity="0.10" />
        <path d="M -20 250 Q 70 220 150 240 T 340 250" fill="none" stroke={COLORS.forest} strokeWidth="0.6" opacity="0.07" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#topo)" />
  </svg>
);

// ============ PIN GATE ============

const PinGate = ({ onUnlock }) => {
  const [pin, setPinInput] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e?.preventDefault?.();
    if (!pin.trim()) return;
    setSubmitting(true);
    setError('');
    setPin(pin.trim());
    try {
      const res = await fetch('/api/plan', {
        headers: { 'X-Family-Pin': pin.trim() },
        cache: 'no-store',
      });
      if (res.status === 401) {
        setError('PIN klopt niet');
        setSubmitting(false);
        return;
      }
      if (!res.ok) {
        setError('Server-fout');
        setSubmitting(false);
        return;
      }
      onUnlock();
    } catch (err) {
      setError('Netwerkfout');
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: COLORS.cream,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, position: 'relative',
    }}>
      <TopoBackground />
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 360, width: '100%',
        background: COLORS.creamSoft,
        borderRadius: 20, padding: 28,
        boxShadow: '0 6px 24px rgba(31,41,34,0.08)',
        border: `1px solid ${COLORS.hairline}`,
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: COLORS.forest, color: COLORS.cream,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 16,
        }}>
          <Lock size={22} />
        </div>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 24, margin: '0 0 6px',
          color: COLORS.forest, fontWeight: 500, letterSpacing: '-0.01em',
        }}>Familie-PIN</h1>
        <p style={{ color: COLORS.ink, fontSize: 13, margin: '0 0 18px', lineHeight: 1.5 }}>
          Deze planner is alleen voor het gezin. Voer de gedeelde PIN in om verder te gaan.
        </p>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPinInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="PIN"
          autoFocus
          style={{
            width: '100%', padding: 14,
            background: COLORS.cream,
            border: `1px solid ${COLORS.hairline}`,
            borderRadius: 10, fontSize: 16,
            fontFamily: "'DM Sans', sans-serif",
            color: COLORS.charcoal,
          }}
        />
        {error && (
          <div style={{
            marginTop: 10, fontSize: 12, color: '#B5443B',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <AlertCircle size={14} /> {error}
          </div>
        )}
        <button
          onClick={submit}
          disabled={submitting || !pin.trim()}
          style={{
            marginTop: 16, width: '100%', padding: 14,
            background: pin.trim() ? COLORS.forest : COLORS.hairline,
            color: pin.trim() ? COLORS.cream : COLORS.inkLight,
            border: 'none', borderRadius: 10, fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif", fontSize: 14,
            cursor: pin.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          {submitting ? 'Controleren…' : 'Verder'}
        </button>
      </div>
    </div>
  );
};

// ============ HEADER ============

const Header = ({ stats, name, onNameChange, syncStatus, lastUpdate, onRefresh }) => {
  const [editingName, setEditingName] = useState(false);
  const [draftName, setDraftName] = useState(name);

  useEffect(() => { setDraftName(name); }, [name]);

  const saveName = () => {
    onNameChange(draftName.trim().slice(0, 30));
    setEditingName(false);
  };

  return (
    <header style={{ padding: '24px 20px 12px', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span style={{
          fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
          color: COLORS.lake, fontWeight: 600,
        }}>
          Familie · Vakantie 2026
        </span>
        <span style={{ flex: 1, height: 1, background: COLORS.hairline }} />
        <SyncIndicator status={syncStatus} onRefresh={onRefresh} />
      </div>

      <h1 style={{
        fontFamily: "'Fraunces', serif",
        fontSize: 36, lineHeight: 1.05, margin: 0,
        color: COLORS.forest, fontWeight: 500, letterSpacing: '-0.02em',
      }}>
        Vogezen<br />
        <span style={{ fontStyle: 'italic', fontWeight: 400, color: COLORS.lake }}>
          & de Elzas
        </span>
      </h1>

      <p style={{ margin: '10px 0 0', color: COLORS.ink, fontSize: 13, lineHeight: 1.5 }}>
        Domaine des Messires · 25 juli — 7 augustus
      </p>

      <div style={{ display: 'flex', gap: 14, marginTop: 14, fontSize: 13, alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: COLORS.forest, fontWeight: 500 }}>
            {stats.totalActivities}
          </div>
          <div style={{ color: COLORS.inkLight, fontSize: 10, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            Activiteiten
          </div>
        </div>
        <div style={{ width: 1, background: COLORS.hairline, alignSelf: 'stretch' }} />
        <div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: COLORS.forest, fontWeight: 500 }}>
            {stats.daysWithActivities}<span style={{ color: COLORS.inkLight, fontSize: 14 }}>/14</span>
          </div>
          <div style={{ color: COLORS.inkLight, fontSize: 10, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            Dagen vol
          </div>
        </div>
        <div style={{ flex: 1 }} />

        {/* Wie ben je */}
        <div style={{ textAlign: 'right' }}>
          {!editingName ? (
            <button
              onClick={() => setEditingName(true)}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: COLORS.ink, fontSize: 12, padding: 0,
                display: 'flex', alignItems: 'center', gap: 5,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <User size={12} /> {name || 'Wie ben je?'}
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && saveName()}
                onBlur={saveName}
                placeholder="Naam"
                autoFocus
                style={{
                  width: 100, padding: '4px 8px',
                  background: COLORS.creamSoft,
                  border: `1px solid ${COLORS.hairline}`,
                  borderRadius: 6, fontSize: 12,
                  fontFamily: "'DM Sans', sans-serif",
                  color: COLORS.charcoal,
                }}
              />
            </div>
          )}
          {lastUpdate && (
            <div style={{ fontSize: 10, color: COLORS.inkLight, marginTop: 4 }}>
              {lastUpdate}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// ============ SYNC INDICATOR ============

const SyncIndicator = ({ status, onRefresh }) => {
  const map = {
    syncing: { icon: <RefreshCw size={11} style={{ animation: 'spin 1s linear infinite' }} />, label: 'Syncen', color: COLORS.ink },
    synced: { icon: <Check size={11} />, label: 'Synced', color: COLORS.moss },
    offline: { icon: <WifiOff size={11} />, label: 'Offline', color: '#B5443B' },
    idle: { icon: <Wifi size={11} />, label: '', color: COLORS.inkLight },
  };
  const cur = map[status] || map.idle;
  return (
    <button
      onClick={onRefresh}
      style={{
        background: 'transparent', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 4,
        fontSize: 10, color: cur.color, padding: 4,
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: 0.3,
      }}
      title="Klik om te verversen"
    >
      {cur.icon}
      <style>{`@keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }`}</style>
      {cur.label}
    </button>
  );
};

// ============ TAB BAR ============

const TabBar = ({ active, setActive }) => (
  <div style={{
    position: 'sticky', top: 0, zIndex: 10,
    background: COLORS.cream,
    padding: '8px 20px 0',
    borderBottom: `1px solid ${COLORS.hairline}`,
  }}>
    <div style={{ display: 'flex', gap: 4 }}>
      {[
        { key: 'plan', label: 'Planning', icon: CalendarIcon },
        { key: 'library', label: 'Activiteiten', icon: Sparkles },
      ].map(({ key, label, icon: Icon }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => setActive(key)}
            style={{
              flex: 1, border: 'none', background: 'transparent',
              padding: '12px 0',
              fontFamily: "'DM Sans', sans-serif", fontSize: 14,
              fontWeight: isActive ? 600 : 500,
              color: isActive ? COLORS.forest : COLORS.inkLight,
              cursor: 'pointer',
              borderBottom: `2px solid ${isActive ? COLORS.forest : 'transparent'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.2s ease',
            }}
          >
            <Icon size={16} />
            {label}
          </button>
        );
      })}
    </div>
  </div>
);

// ============ ACTIVITY CHIP ============

const ActivityChip = ({ activity, onRemove }) => {
  const cat = CATEGORIES[activity.category] || CATEGORIES.custom;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: COLORS.creamSoft, borderRadius: 10, padding: '10px 12px',
      borderLeft: `3px solid ${cat.color}`,
      boxShadow: '0 1px 2px rgba(31,41,34,0.04)',
    }}>
      <span style={{ fontSize: 18 }}>{activity.emoji}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 14, fontWeight: 500, color: COLORS.charcoal,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{activity.name}</div>
        {activity.note && (
          <div style={{ fontSize: 11, color: COLORS.inkLight, marginTop: 2 }}>{activity.note}</div>
        )}
      </div>
      <button
        onClick={onRemove}
        style={{
          border: 'none', background: 'transparent', cursor: 'pointer',
          color: COLORS.inkLight, padding: 4, borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        aria-label="Verwijderen"
      >
        <X size={16} />
      </button>
    </div>
  );
};

// ============ DAY CARD ============

const DayCard = ({ day, activities, activityById, onAddClick, onRemove }) => {
  const hasActivities = activities.length > 0;
  return (
    <div style={{
      background: hasActivities ? COLORS.creamSoft : 'rgba(250, 243, 225, 0.4)',
      borderRadius: 16, padding: 16,
      border: `1px solid ${COLORS.hairline}`,
      transition: 'all 0.2s ease',
    }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 10,
        marginBottom: hasActivities ? 12 : 8,
      }}>
        <div style={{
          fontFamily: "'Fraunces', serif", fontSize: 11,
          letterSpacing: 1.5, textTransform: 'uppercase',
          color: COLORS.inkLight, fontWeight: 500,
        }}>{day.dayShort}</div>
        <div style={{
          fontFamily: "'Fraunces', serif", fontSize: 22,
          color: COLORS.forest, fontWeight: 500, letterSpacing: '-0.01em',
        }}>{day.date}</div>
        {day.label && (
          <div style={{
            fontSize: 10, color: COLORS.lake, letterSpacing: 0.8,
            textTransform: 'uppercase', fontWeight: 600,
            marginLeft: 'auto', padding: '3px 8px',
            background: 'rgba(58, 126, 132, 0.10)', borderRadius: 99,
          }}>{day.label}</div>
        )}
      </div>

      {hasActivities && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
          {activities.map((actId, idx) => {
            const activity = activityById[actId];
            if (!activity) return null;
            return (
              <ActivityChip
                key={`${actId}-${idx}`}
                activity={activity}
                onRemove={() => onRemove(day.key, idx)}
              />
            );
          })}
        </div>
      )}

      <button
        onClick={() => onAddClick(day.key)}
        style={{
          width: '100%', padding: '10px 14px',
          background: hasActivities ? 'transparent' : 'rgba(45, 79, 62, 0.04)',
          border: `1px dashed ${COLORS.forest}`,
          borderRadius: 10, color: COLORS.forest,
          fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          transition: 'all 0.15s',
        }}
      >
        <Plus size={14} /> Activiteit toevoegen
      </button>
    </div>
  );
};

// ============ PLAN VIEW ============

const PlanView = ({ plan, activityById, onAddClick, onRemove }) => (
  <div style={{ padding: '16px 20px 100px', display: 'flex', flexDirection: 'column', gap: 12 }}>
    {DAYS.map(day => (
      <DayCard
        key={day.key}
        day={day}
        activities={plan[day.key] || []}
        activityById={activityById}
        onAddClick={onAddClick}
        onRemove={onRemove}
      />
    ))}
  </div>
);

// ============ LIBRARY VIEW ============

const LibraryActivity = ({ activity, usedInDays, onAddClick, onDelete }) => {
  const cat = CATEGORIES[activity.category] || CATEGORIES.custom;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
      background: COLORS.creamSoft, borderRadius: 12,
      borderLeft: `3px solid ${cat.color}`,
    }}>
      <span style={{ fontSize: 22 }}>{activity.emoji}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: COLORS.charcoal }}>{activity.name}</div>
        {activity.note && (
          <div style={{ fontSize: 11, color: COLORS.inkLight, marginTop: 2 }}>{activity.note}</div>
        )}
        {usedInDays > 0 && (
          <div style={{
            fontSize: 10, color: cat.color, marginTop: 4,
            fontWeight: 600, letterSpacing: 0.3,
          }}>
            Gepland: {usedInDays}×
          </div>
        )}
      </div>
      {activity.category === 'custom' && (
        <button
          onClick={onDelete}
          style={{
            border: 'none', background: 'transparent',
            cursor: 'pointer', color: COLORS.inkLight, padding: 4,
          }}
          aria-label="Verwijderen"
        ><Trash2 size={14} /></button>
      )}
      <button
        onClick={onAddClick}
        style={{
          border: 'none', background: COLORS.forest, color: COLORS.cream,
          width: 32, height: 32, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}
        aria-label="Toevoegen aan dag"
      ><Plus size={16} /></button>
    </div>
  );
};

const LibraryView = ({ activities, plan, onAddClick, onCreateCustom, onDeleteCustom }) => {
  const planUsage = useMemo(() => {
    const usage = {};
    Object.values(plan).flat().forEach(id => { usage[id] = (usage[id] || 0) + 1; });
    return usage;
  }, [plan]);

  const grouped = useMemo(() => {
    const out = {};
    activities.forEach(a => {
      if (!out[a.category]) out[a.category] = [];
      out[a.category].push(a);
    });
    return out;
  }, [activities]);

  const orderedCats = ['camping', 'hiking', 'cycling', 'alsace', 'colmar', 'cities', 'nature', 'food', 'custom'];

  return (
    <div style={{ padding: '16px 20px 100px' }}>
      <button
        onClick={onCreateCustom}
        style={{
          width: '100%', padding: 14,
          background: COLORS.sunset, color: COLORS.cream, border: 'none',
          borderRadius: 12, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          marginBottom: 24,
          boxShadow: '0 2px 8px rgba(201, 125, 93, 0.25)',
        }}
      >
        <Sparkles size={16} /> Eigen activiteit toevoegen
      </button>

      {orderedCats.map(catKey => {
        const items = grouped[catKey];
        if (!items || items.length === 0) return null;
        const cat = CATEGORIES[catKey];
        return (
          <div key={catKey} style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 16 }}>{cat.emoji}</span>
              <h3 style={{
                fontFamily: "'Fraunces', serif", fontSize: 17, margin: 0,
                fontWeight: 500, color: cat.color, letterSpacing: '-0.01em',
              }}>{cat.name}</h3>
              <span style={{ flex: 1, height: 1, background: COLORS.hairline }} />
              <span style={{ fontSize: 11, color: COLORS.inkLight }}>{items.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {items.map(a => (
                <LibraryActivity
                  key={a.id}
                  activity={a}
                  usedInDays={planUsage[a.id] || 0}
                  onAddClick={() => onAddClick(a.id)}
                  onDelete={() => onDeleteCustom(a.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ============ BOTTOM SHEET ============

const Sheet = ({ children, onClose, title }) => (
  <>
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(31, 41, 34, 0.45)',
        zIndex: 50, animation: 'fadeIn 0.2s ease',
      }}
    />
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: COLORS.cream, borderRadius: '20px 20px 0 0',
      maxHeight: '85vh', overflowY: 'auto', zIndex: 51,
      animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '0 -8px 32px rgba(31, 41, 34, 0.18)',
    }}>
      <div style={{
        position: 'sticky', top: 0, background: COLORS.cream,
        borderBottom: `1px solid ${COLORS.hairline}`,
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 1,
      }}>
        <div style={{
          width: 32, height: 4, background: COLORS.hairline, borderRadius: 2,
          position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 6,
        }} />
        <h3 style={{
          margin: '8px 0 0', fontFamily: "'Fraunces', serif",
          fontSize: 18, fontWeight: 500, color: COLORS.forest,
        }}>{title}</h3>
        <button
          onClick={onClose}
          style={{
            border: 'none', background: 'transparent', cursor: 'pointer',
            padding: 4, marginTop: 8, color: COLORS.ink,
          }}
        ><X size={20} /></button>
      </div>
      {children}
    </div>
  </>
);

const PickActivitySheet = ({ activities, plan, dayKey, onPick, onClose, onCreateCustom }) => {
  const day = DAYS.find(d => d.key === dayKey);
  const planUsage = useMemo(() => {
    const usage = {};
    Object.values(plan).flat().forEach(id => { usage[id] = (usage[id] || 0) + 1; });
    return usage;
  }, [plan]);

  const grouped = useMemo(() => {
    const out = {};
    activities.forEach(a => {
      if (!out[a.category]) out[a.category] = [];
      out[a.category].push(a);
    });
    return out;
  }, [activities]);

  const orderedCats = ['camping', 'hiking', 'cycling', 'alsace', 'colmar', 'cities', 'nature', 'food', 'custom'];

  return (
    <Sheet onClose={onClose} title={`Voeg toe aan ${day?.dayShort} ${day?.date}`}>
      <div style={{ padding: '16px 20px 24px' }}>
        <button
          onClick={onCreateCustom}
          style={{
            width: '100%', padding: 12, background: 'transparent',
            color: COLORS.sunset,
            border: `1px dashed ${COLORS.sunset}`, borderRadius: 10,
            fontSize: 13, fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500, cursor: 'pointer', marginBottom: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
        >
          <Sparkles size={14} /> Nieuwe eigen activiteit
        </button>

        {orderedCats.map(catKey => {
          const items = grouped[catKey];
          if (!items || items.length === 0) return null;
          const cat = CATEGORIES[catKey];
          return (
            <div key={catKey} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, paddingLeft: 2 }}>
                <span style={{ fontSize: 13 }}>{cat.emoji}</span>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: cat.color,
                  letterSpacing: 1, textTransform: 'uppercase',
                }}>{cat.name}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {items.map(a => {
                  const used = planUsage[a.id] || 0;
                  return (
                    <button
                      key={a.id}
                      onClick={() => onPick(a.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 12px', background: COLORS.creamSoft,
                        border: 'none', borderLeft: `3px solid ${cat.color}`,
                        borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                        fontFamily: "'DM Sans', sans-serif", width: '100%',
                      }}
                    >
                      <span style={{ fontSize: 18 }}>{a.emoji}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, color: COLORS.charcoal, fontWeight: 500 }}>{a.name}</div>
                        {a.note && <div style={{ fontSize: 10, color: COLORS.inkLight, marginTop: 1 }}>{a.note}</div>}
                      </div>
                      {used > 0 && (
                        <span style={{
                          fontSize: 10, color: cat.color, fontWeight: 600,
                          background: 'rgba(0,0,0,0.04)',
                          padding: '2px 6px', borderRadius: 99,
                        }}>{used}×</span>
                      )}
                      <ChevronRight size={14} color={COLORS.inkLight} />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Sheet>
  );
};

const PickDaySheet = ({ activity, plan, onPick, onClose }) => (
  <Sheet onClose={onClose} title={`"${activity?.name}" toevoegen aan…`}>
    <div style={{ padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: 6 }}>
      {DAYS.map(day => {
        const count = (plan[day.key] || []).length;
        return (
          <button
            key={day.key}
            onClick={() => onPick(day.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: 12,
              background: COLORS.creamSoft, border: 'none', borderRadius: 10,
              cursor: 'pointer', textAlign: 'left',
              fontFamily: "'DM Sans', sans-serif", width: '100%',
            }}
          >
            <div style={{
              fontFamily: "'Fraunces', serif", fontSize: 11,
              color: COLORS.inkLight, textTransform: 'uppercase',
              letterSpacing: 1, minWidth: 22,
            }}>{day.dayShort}</div>
            <div style={{
              fontFamily: "'Fraunces', serif", fontSize: 16,
              color: COLORS.forest, fontWeight: 500, minWidth: 60,
            }}>{day.date}</div>
            {day.label && (
              <span style={{
                fontSize: 10, color: COLORS.lake,
                background: 'rgba(58, 126, 132, 0.10)',
                padding: '2px 8px', borderRadius: 99,
              }}>{day.label}</span>
            )}
            <span style={{ flex: 1 }} />
            {count > 0 && (
              <span style={{ fontSize: 11, color: COLORS.inkLight }}>
                {count} activiteit{count !== 1 ? 'en' : ''}
              </span>
            )}
            <Plus size={14} color={COLORS.forest} />
          </button>
        );
      })}
    </div>
  </Sheet>
);

const CustomActivityForm = ({ onSave, onClose }) => {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [emoji, setEmoji] = useState('✨');
  const [category, setCategory] = useState('custom');

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), note: note.trim(), emoji: emoji.trim() || '✨', category });
  };

  const inputStyle = {
    width: '100%', padding: '12px 14px',
    background: COLORS.creamSoft,
    border: `1px solid ${COLORS.hairline}`, borderRadius: 10,
    fontFamily: "'DM Sans', sans-serif", fontSize: 14,
    color: COLORS.charcoal, outline: 'none', boxSizing: 'border-box',
  };

  return (
    <Sheet onClose={onClose} title="Nieuwe eigen activiteit">
      <div style={{ padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label style={{ fontSize: 11, color: COLORS.inkLight, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>Naam</label>
          <input
            type="text" value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Bv. Bezoek aan zwager in Mulhouse"
            style={{ ...inputStyle, marginTop: 6 }} autoFocus
          />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ width: 80 }}>
            <label style={{ fontSize: 11, color: COLORS.inkLight, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>Emoji</label>
            <input
              type="text" value={emoji} onChange={(e) => setEmoji(e.target.value)}
              maxLength={2}
              style={{ ...inputStyle, marginTop: 6, textAlign: 'center', fontSize: 22 }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 11, color: COLORS.inkLight, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>Categorie</label>
            <select
              value={category} onChange={(e) => setCategory(e.target.value)}
              style={{ ...inputStyle, marginTop: 6 }}
            >
              {Object.entries(CATEGORIES).map(([k, c]) => (
                <option key={k} value={k}>{c.emoji} {c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label style={{ fontSize: 11, color: COLORS.inkLight, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>Notitie (optioneel)</label>
          <input
            type="text" value={note} onChange={(e) => setNote(e.target.value)}
            placeholder="Korte beschrijving"
            style={{ ...inputStyle, marginTop: 6 }}
          />
        </div>

        <button
          onClick={handleSave} disabled={!name.trim()}
          style={{
            marginTop: 8, padding: 14,
            background: name.trim() ? COLORS.forest : COLORS.hairline,
            color: name.trim() ? COLORS.cream : COLORS.inkLight,
            border: 'none', borderRadius: 10,
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
            cursor: name.trim() ? 'pointer' : 'not-allowed',
            transition: 'all 0.15s',
          }}
        >
          Opslaan
        </button>
      </div>
    </Sheet>
  );
};

const ConfirmSheet = ({ title, message, confirmText, onConfirm, onClose }) => (
  <Sheet onClose={onClose} title={title}>
    <div style={{ padding: '8px 20px 24px' }}>
      <p style={{ color: COLORS.ink, fontSize: 14, lineHeight: 1.5, marginBottom: 18 }}>
        {message}
      </p>
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={onClose}
          style={{
            flex: 1, padding: 12, background: 'transparent',
            color: COLORS.ink, border: `1px solid ${COLORS.hairline}`,
            borderRadius: 10, fontFamily: "'DM Sans', sans-serif",
            fontSize: 14, fontWeight: 500, cursor: 'pointer',
          }}
        >Annuleer</button>
        <button
          onClick={() => { onConfirm(); onClose(); }}
          style={{
            flex: 1, padding: 12, background: COLORS.wine,
            color: COLORS.cream, border: 'none', borderRadius: 10,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}
        >{confirmText}</button>
      </div>
    </div>
  </Sheet>
);

const SettingsSheet = ({ onClose, onLoadSuggested, onClearAll }) => (
  <Sheet onClose={onClose} title="Planning beheren">
    <div style={{ padding: '8px 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <button
        onClick={onLoadSuggested}
        style={{
          padding: '14px 16px', background: COLORS.creamSoft,
          border: `1px solid ${COLORS.hairline}`, borderRadius: 12,
          textAlign: 'left', cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <Sparkles size={16} color={COLORS.lake} />
          <span style={{ fontWeight: 600, color: COLORS.forest, fontSize: 14 }}>
            Voorgesteld schema laden
          </span>
        </div>
        <div style={{ fontSize: 12, color: COLORS.ink, lineHeight: 1.5 }}>
          Vul alle dagen met het voorgestelde programma. Bestaande inhoud wordt vervangen.
        </div>
      </button>

      <button
        onClick={onClearAll}
        style={{
          padding: '14px 16px', background: COLORS.creamSoft,
          border: `1px solid ${COLORS.hairline}`, borderRadius: 12,
          textAlign: 'left', cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <Trash2 size={16} color={COLORS.wine} />
          <span style={{ fontWeight: 600, color: COLORS.wine, fontSize: 14 }}>
            Hele planning wissen
          </span>
        </div>
        <div style={{ fontSize: 12, color: COLORS.ink, lineHeight: 1.5 }}>
          Start met een leeg blad. Eigen activiteiten blijven bewaard.
        </div>
      </button>
    </div>
  </Sheet>
);

// ============ MAIN APP ============

export default function Planner({ authRequired }) {
  const [unlocked, setUnlocked] = useState(!authRequired);
  const [activeTab, setActiveTab] = useState('plan');
  const [plan, setPlan] = useState({});
  const [customActivities, setCustomActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sheet, setSheet] = useState(null);
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle' | 'syncing' | 'synced' | 'offline'
  const [serverUpdate, setServerUpdate] = useState({ at: null, by: null });
  const [name, setName] = useState('');

  const saveTimer = useRef(null);
  const skipNextSave = useRef(true);

  // Init name from localStorage
  useEffect(() => { setName(getName()); }, []);

  const saveName = (newName) => {
    setName(newName);
    setNameLS(newName);
  };

  // Initial fetch
  const fetchData = useCallback(async (showSpinner = true) => {
    if (showSpinner) setSyncStatus('syncing');
    try {
      const data = await apiGet();
      skipNextSave.current = true;
      setPlan(data.plan || {});
      setCustomActivities(data.customActivities || []);
      setServerUpdate({ at: data.updatedAt, by: data.updatedBy });
      setSyncStatus('synced');
      setTimeout(() => setSyncStatus('idle'), 1500);
    } catch (e) {
      if (e.message === 'unauthorized') {
        setUnlocked(false);
      } else {
        setSyncStatus('offline');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (unlocked) fetchData();
  }, [unlocked, fetchData]);

  // Refresh on focus
  useEffect(() => {
    if (!unlocked) return;
    const onFocus = () => fetchData(false);
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [unlocked, fetchData]);

  // Debounced auto-save
  useEffect(() => {
    if (!unlocked || loading) return;
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSyncStatus('syncing');
    saveTimer.current = setTimeout(async () => {
      try {
        const data = await apiPut(plan, customActivities, name);
        setServerUpdate({ at: data.updatedAt, by: data.updatedBy });
        setSyncStatus('synced');
        setTimeout(() => setSyncStatus('idle'), 1500);
      } catch (e) {
        setSyncStatus('offline');
      }
    }, 500);
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [plan, customActivities, name, unlocked, loading]);

  const allActivities = useMemo(
    () => [...DEFAULT_ACTIVITIES, ...customActivities],
    [customActivities]
  );

  const activityById = useMemo(
    () => Object.fromEntries(allActivities.map(a => [a.id, a])),
    [allActivities]
  );

  const stats = useMemo(() => {
    const totalActivities = Object.values(plan).flat().length;
    const daysWithActivities = Object.keys(plan).filter(k => (plan[k] || []).length > 0).length;
    return { totalActivities, daysWithActivities };
  }, [plan]);

  const addActivityToDay = (dayKey, activityId) => {
    setPlan(p => ({ ...p, [dayKey]: [...(p[dayKey] || []), activityId] }));
  };

  const removeFromDay = (dayKey, index) => {
    setPlan(p => ({ ...p, [dayKey]: (p[dayKey] || []).filter((_, i) => i !== index) }));
  };

  const createCustom = (data, andAddToDay) => {
    const newId = `custom_${Date.now()}`;
    const newAct = { ...data, id: newId };
    setCustomActivities(c => [...c, newAct]);
    if (andAddToDay) {
      setPlan(p => ({ ...p, [andAddToDay]: [...(p[andAddToDay] || []), newId] }));
    }
    return newId;
  };

  const deleteCustom = (id) => {
    setSheet({
      type: 'confirm',
      title: 'Eigen activiteit verwijderen?',
      message: 'De activiteit wordt ook uit alle dagen verwijderd waar hij in staat.',
      confirmText: 'Verwijderen',
      onConfirm: () => {
        setCustomActivities(c => c.filter(a => a.id !== id));
        setPlan(p => {
          const np = {};
          Object.entries(p).forEach(([k, ids]) => { np[k] = ids.filter(x => x !== id); });
          return np;
        });
      },
    });
  };

  const lastUpdateText = useMemo(() => {
    if (!serverUpdate.at) return null;
    const d = new Date(serverUpdate.at);
    const now = new Date();
    const sameDay = d.toDateString() === now.toDateString();
    const time = d.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
    const dateStr = sameDay
      ? time
      : d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' }) + ' ' + time;
    return serverUpdate.by ? `${serverUpdate.by} · ${dateStr}` : dateStr;
  }, [serverUpdate]);

  if (authRequired && !unlocked) {
    return <PinGate onUnlock={() => setUnlocked(true)} />;
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: COLORS.cream,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'DM Sans', sans-serif", color: COLORS.ink,
      }}>Laden…</div>
    );
  }

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: COLORS.cream, color: COLORS.charcoal,
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
    }}>
      <TopoBackground />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto' }}>
        <Header
          stats={stats}
          name={name}
          onNameChange={saveName}
          syncStatus={syncStatus}
          lastUpdate={lastUpdateText}
          onRefresh={() => fetchData(true)}
        />
        <TabBar active={activeTab} setActive={setActiveTab} />

        {activeTab === 'plan' ? (
          <PlanView
            plan={plan}
            activityById={activityById}
            onAddClick={(dayKey) => setSheet({ type: 'pick-activity', dayKey })}
            onRemove={removeFromDay}
          />
        ) : (
          <LibraryView
            activities={allActivities}
            plan={plan}
            onAddClick={(activityId) => setSheet({ type: 'pick-day', activityId })}
            onCreateCustom={() => setSheet({ type: 'create-custom' })}
            onDeleteCustom={deleteCustom}
          />
        )}

        {/* Floating settings button */}
        {activeTab === 'plan' && (
          <button
            onClick={() => setSheet({ type: 'settings' })}
            style={{
              position: 'fixed', bottom: 20, right: 20,
              background: COLORS.forest, color: COLORS.cream,
              border: 'none', borderRadius: 99,
              width: 48, height: 48, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(45, 79, 62, 0.30)',
              zIndex: 5,
            }}
            aria-label="Beheer planning"
          >
            <RotateCcw size={18} />
          </button>
        )}
      </div>

      {/* Sheets */}
      {sheet?.type === 'pick-activity' && (
        <PickActivitySheet
          activities={allActivities}
          plan={plan}
          dayKey={sheet.dayKey}
          onPick={(actId) => { addActivityToDay(sheet.dayKey, actId); setSheet(null); }}
          onCreateCustom={() => setSheet({ type: 'create-custom', returnToDay: sheet.dayKey })}
          onClose={() => setSheet(null)}
        />
      )}

      {sheet?.type === 'pick-day' && (
        <PickDaySheet
          activity={activityById[sheet.activityId]}
          plan={plan}
          onPick={(dayKey) => { addActivityToDay(dayKey, sheet.activityId); setSheet(null); }}
          onClose={() => setSheet(null)}
        />
      )}

      {sheet?.type === 'create-custom' && (
        <CustomActivityForm
          onSave={(data) => { createCustom(data, sheet.returnToDay); setSheet(null); }}
          onClose={() => setSheet(null)}
        />
      )}

      {sheet?.type === 'settings' && (
        <SettingsSheet
          onLoadSuggested={() => {
            setSheet({
              type: 'confirm',
              title: 'Voorgesteld schema laden?',
              message: 'Hiermee wordt de huidige planning vervangen door het voorgestelde programma uit Claude.',
              confirmText: 'Laden',
              onConfirm: () => setPlan({ ...SUGGESTED_PLAN }),
            });
          }}
          onClearAll={() => {
            setSheet({
              type: 'confirm',
              title: 'Hele planning wissen?',
              message: 'Alle 14 dagen worden leeggemaakt. Eigen activiteiten blijven in de bibliotheek staan.',
              confirmText: 'Alles wissen',
              onConfirm: () => setPlan({}),
            });
          }}
          onClose={() => setSheet(null)}
        />
      )}

      {sheet?.type === 'confirm' && (
        <ConfirmSheet
          title={sheet.title}
          message={sheet.message}
          confirmText={sheet.confirmText}
          onConfirm={sheet.onConfirm}
          onClose={() => setSheet(null)}
        />
      )}
    </div>
  );
}
