import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useJournal } from '../../context/JournalContext';
import { HandwrittenText } from '../archive/HandwrittenText';

function createMoodSound(ctx, moodId) {
  const master = ctx.createGain();
  master.gain.value = 0.12;
  master.connect(ctx.destination);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.connect(master);

  const noise = () => {
    const bufSize = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    return src;
  };

  const lfo = ctx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 0.3;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0;
  lfo.connect(lfoGain);

  const nodes = { master, filter, lfo, lfoGain, oscillators: [], sources: [] };

  const addOsc = (type, freq, gainVal, filterFreq) => {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.value = gainVal;
    osc.connect(g);
    g.connect(filter);
    filter.frequency.value = filterFreq || 800;
    nodes.oscillators.push(osc);
    osc.start();
    lfoGain.connect(osc.frequency);
  };

  const addNoise = (gainVal, filterFreq, filterType) => {
    const src = noise();
    const g = ctx.createGain();
    g.gain.value = gainVal;
    const f = ctx.createBiquadFilter();
    f.type = filterType || 'lowpass';
    f.frequency.value = filterFreq || 500;
    src.connect(f);
    f.connect(g);
    g.connect(filter);
    nodes.sources.push(src);
    src.start();
  };

  addOsc('sine', 110, 0.3, 600);
  addOsc('sine', 146.83, 0.2, 600);

  switch (moodId) {
    case 'calm':
      addOsc('sine', 220, 0.15, 400);
      addNoise(0.005, 200, 'lowpass');
      lfoGain.gain.value = 1;
      filter.frequency.value = 400;
      break;
    case 'happy':
      addOsc('triangle', 261.63, 0.12, 1200);
      addOsc('sine', 392, 0.08, 1200);
      lfo.frequency.value = 2;
      lfoGain.gain.value = 3;
      filter.frequency.value = 1200;
      break;
    case 'excited':
      addOsc('triangle', 329.63, 0.1, 2000);
      addOsc('sine', 440, 0.08, 2000);
      lfo.frequency.value = 3;
      lfoGain.gain.value = 5;
      master.gain.value = 0.1;
      filter.frequency.value = 2000;
      break;
    case 'sad':
      addOsc('sawtooth', 73.42, 0.08, 150);
      addNoise(0.008, 300, 'lowpass');
      lfoGain.gain.value = 1;
      master.gain.value = 0.06;
      filter.frequency.value = 150;
      break;
    case 'angry':
      addOsc('sawtooth', 55, 0.1, 100);
      addNoise(0.015, 100, 'lowpass');
      lfo.frequency.value = 1;
      lfoGain.gain.value = 8;
      master.gain.value = 0.08;
      filter.frequency.value = 100;
      break;
    case 'anxious':
      addOsc('sine', 200, 0.1, 1500);
      addNoise(0.012, 2000, 'highpass');
      lfo.frequency.value = 2.5;
      lfoGain.gain.value = 4;
      filter.frequency.value = 1500;
      break;
    default:
      addNoise(0.006, 400, 'lowpass');
      lfoGain.gain.value = 0.5;
      filter.frequency.value = 600;
  }

  lfo.start();
  return nodes;
}

export function SoundscapePhonograph() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);
  const { currentMood } = useJournal();

  const stop = useCallback(() => {
    nodesRef.current?.oscillators.forEach(o => { try { o.stop(); } catch {} });
    nodesRef.current?.sources.forEach(s => { try { s.stop(); } catch {} });
    nodesRef.current?.lfo?.stop();
    ctxRef.current?.close();
    ctxRef.current = null;
    nodesRef.current = null;
    setIsPlaying(false);
  }, []);

  useEffect(() => { return stop; }, [stop]);

  const toggle = useCallback(() => {
    if (isPlaying) { stop(); return; }
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    ctxRef.current = ctx;
    nodesRef.current = createMoodSound(ctx, currentMood || 'neutral');
    setIsPlaying(true);
  }, [isPlaying, currentMood, stop]);

  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-earth-100/60 dark:bg-ink-800/30 border border-earth-300/50 dark:border-ink-700/40 shadow-sm">
      <div className="relative flex-shrink-0 w-14 h-14">
        <svg viewBox="0 0 56 56" fill="none" className="w-full h-full">
          <rect x="2" y="34" width="52" height="18" rx="4" fill="#3D2B1F" opacity="0.8" />
          <rect x="2" y="34" width="52" height="18" rx="4" stroke="#6B5B4F" strokeWidth="0.5" />
          <circle cx="22" cy="40" r="12" fill="#1A1815" stroke="#3D2B1F" strokeWidth="0.5" />
          {[10, 8, 6, 4].map(r => (
            <circle key={r} cx="22" cy="40" r={r} fill="none" stroke="#2A2520" strokeWidth="0.3" />
          ))}
          <circle cx="22" cy="40" r="3" fill="#8B7355" />
          <circle cx="22" cy="40" r="1" fill="#C9A84C" opacity="0.6" />
          <line x1="38" y1="30" x2="30" y2="37" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="38" cy="30" r="1.5" fill="#C9A84C" />
          <circle cx="42" cy="48" r="3" fill={isPlaying ? '#6EE7B7' : '#C9A84C'} opacity="0.8" />
          {isPlaying && (
            <circle cx="42" cy="48" r="3" fill="none" stroke="#6EE7B7" strokeWidth="0.5" opacity="0.5">
              <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
          <path d="M44 42 L49 42 L49 46 L44 46 Z" fill="#6B5B4F" opacity="0.3" />
          <g opacity={isPlaying ? 0.6 : 0.2}>
            <circle cx="22" cy="40" r="12" fill="none" stroke="#C9A84C" strokeWidth="0.3" opacity="0.3">
              {isPlaying && <animateTransform attributeName="transform" type="rotate" from="0 22 40" to="360 22 40" dur="2s" repeatCount="indefinite" />}
            </circle>
          </g>
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <HandwrittenText as="div" size="sm" color="ink-600" className="truncate">
          {isPlaying ? 'Playing' : 'Desk gramophone'}
        </HandwrittenText>
        <HandwrittenText size="xs" color="ink-400" className="truncate">
          {isPlaying ? 'Ambient soundscape' : 'Silent — tap to play'}
        </HandwrittenText>
      </div>

      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.9 }}
        aria-label={isPlaying ? 'Stop soundscape' : 'Play soundscape'}
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 focus-ring ${
          isPlaying
            ? 'bg-herb-400/20 text-herb-600 dark:text-herb-400'
            : 'bg-brass-400/20 text-brass-600 dark:text-brass-400 hover:bg-brass-400/30'
        }`}
      >
        {isPlaying ? (
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
            <rect x="3" y="3" width="3.5" height="10" rx="1" />
            <rect x="9.5" y="3" width="3.5" height="10" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 ml-0.5">
            <path d="M4 2.5v11l9-5.5z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
