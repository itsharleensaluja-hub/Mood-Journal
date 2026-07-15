import { useMemo, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useJournal } from '../../../context/JournalContext';
import { HandwrittenText } from '../../archive/HandwrittenText';
import { getMoodById } from '../../../data/moods';

const MOOD_SCORES = {
  happy: 90, calm: 80, neutral: 60, excited: 85,
  sad: 35, angry: 25, anxious: 30,
};

const BIOME_RANGES = [
  { min: 80, max: 100, color: '#FBBF24', label: 'calm plateau', textColor: '#B8860B' },
  { min: 60, max: 80, color: '#6EE7B7', label: 'balanced lowlands', textColor: '#3A7D5C' },
  { min: 40, max: 60, color: '#D4C5B0', label: 'neutral plains', textColor: '#8B7D6B' },
  { min: 20, max: 40, color: '#93C5FD', label: 'sad valley', textColor: '#4A7FB5' },
  { min: 0, max: 20, color: '#FCA5A5', label: 'anger canyon', textColor: '#C45A5A' },
];

const W = 760;
const H = 280;
const L = 55;
const R = 20;
const T = 20;
const B = 40;
const IW = W - L - R;
const IH = H - T - B;

function smoothPath(points) {
  if (points.length < 2) return points.length === 1 ? `M${points[0].x},${points[0].y}` : '';
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const t = 0.3;
    const c1x = p1.x + (p2.x - p0.x) * t;
    const c1y = p1.y + (p2.y - p0.y) * t;
    const c2x = p2.x - (p3.x - p1.x) * t;
    const c2y = p2.y - (p3.y - p1.y) * t;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}

export const EmotionalLandscape = memo(function EmotionalLandscape() {
  const { entries } = useJournal();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const result = useMemo(() => {
    if (!entries || entries.length === 0) return {};

    const sorted = [...entries].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const dayMap = new Map();
    sorted.forEach(e => {
      const d = new Date(e.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      if (!dayMap.has(key)) dayMap.set(key, e);
    });

    const days = Array.from(dayMap.entries())
      .map(([key, entry]) => {
        const [y, m, day] = key.split('-').map(Number);
        return { date: new Date(y, m, day), entry, score: MOOD_SCORES[entry.moodId] || 50 };
      })
      .sort((a, b) => a.date - b.date);

    if (days.length === 0) return {};

    const maxPoints = 60;
    const slice = days.length > maxPoints ? days.slice(-maxPoints) : days;
    const n = slice.length;

    const pts = slice.map((d, i) => ({
      ...d,
      x: L + (i / Math.max(n - 1, 1)) * IW,
      y: T + IH - (d.score / 100) * IH,
    }));

    const curve = smoothPath(pts);
    const bottom = T + IH;
    const fill = pts.length > 1
      ? curve + ` L${pts[n - 1].x},${bottom} L${pts[0].x},${bottom} Z`
      : `M${pts[0].x},${bottom} L${pts[0].x},${pts[0].y} L${pts[0].x},${bottom} Z`;

    const today = new Date().toDateString();
    const todayIdx = pts.findIndex(p => p.date.toDateString() === today);

    const biomeBands = BIOME_RANGES.map(b => {
      const topY = T + IH - (b.max / 100) * IH;
      const botY = T + IH - (b.min / 100) * IH;
      return { ...b, y: topY, h: botY - topY };
    });

    const labelEvery = Math.max(1, Math.floor(pts.length / 10));

    return { points: pts, curve, fill, biomeBands, todayIdx, labels: pts.filter((_, i) => i % labelEvery === 0 || i === pts.length - 1) };
  }, [entries]);

  if (!result.points || result.points.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="w-16 h-16 rounded-xl bg-earth-200 dark:bg-ink-800 flex items-center justify-center mx-auto mb-5">
          <span className="text-2xl text-ink-400">🗺️</span>
        </div>
        <HandwrittenText as="p" size="lg" className="text-ink-800 dark:text-ink-200 mb-2">
          No terrain yet
        </HandwrittenText>
        <HandwrittenText size="sm" color="ink-500">
          Your emotional landscape forms as you write
        </HandwrittenText>
      </div>
    );
  }

  return (
    <div className="relative">
      <HandwrittenText as="h3" size="base" color="ink-600" className="mb-4">
        Emotional Landscape
      </HandwrittenText>

      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Emotional landscape terrain map">
          <defs>
            <linearGradient id="terrainFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.2" />
              <stop offset="25%" stopColor="#6EE7B7" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#D4C5B0" stopOpacity="0.12" />
              <stop offset="75%" stopColor="#93C5FD" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FCA5A5" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {result.biomeBands.map(b => (
            <rect key={b.label} x={L} y={b.y} width={IW} height={b.h} fill={b.color} opacity={0.05} rx="0" />
          ))}
          {result.biomeBands.map(b => (
            <text key={b.label} x={4} y={b.y + b.h / 2 + 2} fill={b.textColor} opacity={0.35} className="handwriting text-[7px]">{b.label}</text>
          ))}

          {result.curve && (
            <>
              <path d={result.curve} fill="none" stroke="#A0927A" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.3" />
              <path d={result.fill} fill="url(#terrainFill)" />
              <path d={result.curve} fill="none" stroke="#6B5B4F" strokeWidth="1.5" />
            </>
          )}

          {result.points.map((p, i) => (
            <g key={i} className="cursor-pointer" onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} onClick={() => navigate('/dashboard')}>
              <circle cx={p.x} cy={p.y} r={hovered === i ? 6 : 3} fill="#FDFCFA" stroke={getMoodById(p.entry.moodId)?.color || '#8B7D6B'} strokeWidth="2" className="transition-all duration-200" />
              <circle cx={p.x} cy={p.y} r={8} fill="transparent" className="cursor-pointer" />
            </g>
          ))}

          {result.todayIdx >= 0 && result.points[result.todayIdx] && (
            (() => {
              const p = result.points[result.todayIdx];
              return (
                <g>
                  <circle cx={p.x} cy={p.y} r="7" fill="none" stroke="#FBBF24" strokeWidth="1.5" opacity="0.6" filter="url(#glow)">
                    <animate attributeName="r" values="6;9;6" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <text x={p.x + 10} y={p.y - 6} fill="#B8860B" opacity="0.7" className="handwriting text-[8px]">today</text>
                </g>
              );
            })()
          )}

          {result.labels.map((p, i) => (
            <text key={i} x={p.x} y={T + IH + 18} textAnchor="middle" fill="#8B7D6B" opacity={p.date.toDateString() === new Date().toDateString() ? 0.8 : 0.4} className="text-[7px] handwriting">
              {p.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </text>
          ))}

          <defs>
            <linearGradient id="glowGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FBBF24" stopOpacity="0" />
              <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {hovered !== null && result.points[hovered] && (
          (() => {
            const p = result.points[hovered];
            const mood = getMoodById(p.entry.moodId);
            const leftPct = (p.x / W) * 100;
            const topPct = (p.y / H) * 100;
            return (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 -translate-x-1/2 mt-1 px-3 py-2 bg-paper-100 dark:bg-ink-800 border border-earth-300 dark:border-ink-700 rounded-lg shadow-floating text-xs pointer-events-none"
                style={{ left: `${leftPct}%`, top: `${topPct + 2}%` }}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span>{mood?.emoji}</span>
                  <span className="text-ink-700 dark:text-ink-300 font-medium">{mood?.label}</span>
                  <span className="text-ink-400 ml-2">{p.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <p className="text-ink-500 line-clamp-2 max-w-[180px]">
                  {p.entry.note || 'No entry text'}
                </p>
              </motion.div>
            );
          })()
        )}
      </div>
    </div>
  );
});
