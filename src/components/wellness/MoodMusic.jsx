import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HandwrittenText } from '../archive/HandwrittenText';
import { AMBIENT_SOUNDS } from '../../data/wellness';
import { fadeUp } from '../../utils/animations';

function createSoundscape(ctx, sound) {
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.45, ctx.currentTime);
  master.connect(ctx.destination);

  const nodes = [];

  function osc(freq, detune = 0, type = 'sine', gainVal = 0.12) {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, ctx.currentTime);
    o.detune.setValueAtTime(detune, ctx.currentTime);
    const g = ctx.createGain();
    g.gain.setValueAtTime(gainVal, ctx.currentTime);
    o.connect(g);
    g.connect(master);
    o.start();
    return { osc: o, gain: g };
  }

  if (sound.id === 'forest') {
    nodes.push(osc(220, -4, 'sine', 0.1));
    nodes.push(osc(220, 4, 'sine', 0.1));
    nodes.push(osc(440, -2, 'sine', 0.08));
    nodes.push(osc(660, 0, 'sine', 0.05));
    const l = ctx.createOscillator();
    const lg = ctx.createGain();
    l.frequency.setValueAtTime(0.2, ctx.currentTime);
    lg.gain.setValueAtTime(0.07, ctx.currentTime);
    l.connect(lg);
    lg.connect(master.gain);
    l.start();
    nodes.push({ osc: l });
  } else if (sound.id === 'ocean') {
    nodes.push(osc(55, 0, 'sine', 0.12));
    nodes.push(osc(82.5, 0, 'sine', 0.08));
    nodes.push(osc(220, -3, 'sine', 0.06));
    nodes.push(osc(330, 3, 'sine', 0.04));
    const l = ctx.createOscillator();
    const lg = ctx.createGain();
    l.frequency.setValueAtTime(0.08, ctx.currentTime);
    lg.gain.setValueAtTime(0.05, ctx.currentTime);
    l.connect(lg);
    lg.connect(master.gain);
    l.start();
    nodes.push({ osc: l });
  } else if (sound.id === 'rain') {
    for (let i = 0; i < 12; i++) {
      const freq = 1000 + Math.random() * 6500;
      const o = ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.setValueAtTime(freq, ctx.currentTime);
      o.frequency.linearRampToValueAtTime(freq + (Math.random() - 0.5) * 20, ctx.currentTime + 0.5);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.025, ctx.currentTime);
      const lfo = ctx.createOscillator();
      const lfoG = ctx.createGain();
      lfo.frequency.setValueAtTime(0.3 + Math.random() * 1.2, ctx.currentTime);
      lfoG.gain.setValueAtTime(0.018, ctx.currentTime);
      lfo.connect(lfoG);
      lfoG.connect(g.gain);
      o.connect(g);
      g.connect(master);
      o.start();
      lfo.start();
      nodes.push({ osc: o, osc2: lfo });
    }
  } else if (sound.id === 'night') {
    nodes.push(osc(80, -5, 'sine', 0.1));
    nodes.push(osc(120, 5, 'sine', 0.08));
    nodes.push(osc(200, 0, 'sine', 0.06));
    const cricket = ctx.createOscillator();
    cricket.type = 'sine';
    cricket.frequency.setValueAtTime(4200, ctx.currentTime);
    const cg = ctx.createGain();
    cg.gain.setValueAtTime(0, ctx.currentTime);
    const cl = ctx.createOscillator();
    const clg = ctx.createGain();
    cl.frequency.setValueAtTime(3.5, ctx.currentTime);
    clg.gain.setValueAtTime(0.025, ctx.currentTime);
    cl.connect(clg);
    clg.connect(cg.gain);
    cricket.connect(cg);
    cg.connect(master);
    cricket.start();
    cl.start();
    nodes.push({ osc: cricket, osc2: cl });
  }

  return {
    stop: () => {
      nodes.forEach((n) => {
        try { n.osc.stop(); } catch {}
        if (n.osc2) try { n.osc2.stop(); } catch {}
      });
    },
    setVolume: (v) => {
      master.gain.setValueAtTime(v * 0.6, ctx.currentTime);
    },
  };
}

export function MoodMusic({ onBack }) {
  const [activeId, setActiveId] = useState(null);
  const [volume, setVolume] = useState(0.7);
  const ctxRef = useRef(null);
  const playerRef = useRef(null);

  const stopAll = useCallback(() => {
    if (playerRef.current) { try { playerRef.current.stop(); } catch {} playerRef.current = null; }
    if (ctxRef.current) { try { ctxRef.current.close(); } catch {} ctxRef.current = null; }
  }, []);

  useEffect(() => {
    return stopAll;
  }, [stopAll]);

  const play = useCallback((sound) => {
    stopAll();
    if (activeId === sound.id) { setActiveId(null); return; }
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      ctx.resume();
      ctxRef.current = ctx;
      playerRef.current = createSoundscape(ctx, sound);
      playerRef.current.setVolume(volume);
      setActiveId(sound.id);
    } catch {
      setActiveId(null);
    }
  }, [activeId, volume, stopAll]);

  const handleVolume = (v) => {
    const val = parseFloat(v);
    setVolume(val);
    if (playerRef.current) playerRef.current.setVolume(val);
  };

  return (
    <motion.div variants={fadeUp} initial="initial" animate="animate" className="max-w-lg mx-auto py-4">
      <button onClick={() => { stopAll(); onBack(); }} className="text-xs text-ink-400 dark:text-ink-500 hover:text-ink-600 dark:hover:text-ink-300 transition-colors mb-4">
        ← All modules
      </button>

      <div className="text-center mb-6">
        <HandwrittenText as="h2" size="xl" className="text-ink-900 dark:text-ink-100 mb-1">
          Mood Music
        </HandwrittenText>
        <HandwrittenText size="sm" color="ink-500">
          Ambient soundscapes for focus and calm
        </HandwrittenText>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {AMBIENT_SOUNDS.map((sound) => {
          const isActive = activeId === sound.id;
          return (
            <button
              key={sound.id}
              onClick={() => play(sound)}
              className={`relative rounded-2xl p-4 border transition-all duration-200 text-left ${
                isActive
                  ? 'bg-plum-100 dark:bg-plum-900/30 border-plum-300 dark:border-plum-600 shadow-md'
                  : 'bg-earth-50 dark:bg-ink-800/20 border-earth-200 dark:border-ink-700/30 hover:border-plum-200 dark:hover:border-plum-700'
              }`}
              aria-label={`${sound.name}${isActive ? ' — now playing' : ''}`}
            >
              <span className={`text-3xl block mb-2 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                {isActive ? '🔊' : sound.icon}
              </span>
              <p className={`handwriting text-sm transition-colors ${
                isActive ? 'text-plum-600 dark:text-plum-300' : 'text-ink-700 dark:text-ink-300'
              }`}>
                {sound.name}
              </p>
              <p className="text-[10px] text-ink-400 dark:text-ink-500 mt-0.5 leading-relaxed">
                {sound.desc}
              </p>
              {isActive && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-plum-400 dark:bg-plum-300 origin-left"
                />
              )}
            </button>
          );
        })}
      </div>

      {activeId && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-2xl bg-earth-50 dark:bg-ink-800/20 border border-earth-200 dark:border-ink-700/30">
          <label htmlFor="volume" className="text-[10px] uppercase tracking-widest text-ink-400 dark:text-ink-500 typewriter block mb-2">
            Volume
          </label>
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => handleVolume(e.target.value)}
            className="w-full h-1.5 rounded-full appearance-none bg-earth-200 dark:bg-ink-700 cursor-pointer accent-plum-400"
            aria-label="Volume slider"
          />
          <div className="flex justify-between text-[10px] text-ink-300 dark:text-ink-600 typewriter mt-1">
            <span>Off</span>
            <span>Max</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
