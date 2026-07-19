import { useState } from 'react';
import { motion } from 'framer-motion';
import { HandwrittenText } from '../archive/HandwrittenText';
import { Button } from '../common/Button';
import { AGE_GROUPS, LANGUAGES, PRIMARY_CONCERNS } from '../../data/counselors';
import { fadeUp } from '../../utils/animations';

const MOOD_OPTIONS = [
  { id: 'calm', label: 'Calm', emoji: '😌' },
  { id: 'anxious', label: 'Anxious', emoji: '😰' },
  { id: 'sad', label: 'Sad', emoji: '😢' },
  { id: 'angry', label: 'Angry', emoji: '😤' },
  { id: 'neutral', label: 'Neutral', emoji: '😐' },
  { id: 'hopeful', label: 'Hopeful', emoji: '🌟' },
  { id: 'overwhelmed', label: 'Overwhelmed', emoji: '😫' },
  { id: 'confused', label: 'Confused', emoji: '🤔' },
];

export function StepIntake({ onComplete }) {
  const [form, setForm] = useState({
    nickname: '',
    ageGroup: '',
    language: '',
    currentMood: '',
    primaryConcern: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    setSubmitting(false);
    onComplete({ ...form, sessionType: 'chat' });
  };

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const isValid = form.ageGroup && form.language && form.currentMood && form.primaryConcern;

  return (
    <motion.div
      variants={{ initial: {}, animate: { transition: { staggerChildren: 0.06 } } }}
      initial="initial"
      animate="animate"
      className="max-w-lg mx-auto py-6"
    >
      <motion.div variants={fadeUp}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-center mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-plum-100/50 dark:bg-plum-900/30 border border-plum-200/50 dark:border-plum-700/30 mb-4">
              <span className="text-plum-400 text-sm">◇</span>
              <HandwrittenText size="sm" color="ink-500">Anonymous Chat</HandwrittenText>
            </div>
            <HandwrittenText as="h1" size="lg" className="text-ink-900 dark:text-ink-100 mb-1">
              Quick intake
            </HandwrittenText>
            <HandwrittenText size="sm" color="ink-500">
              Just a few details — no personal info required
            </HandwrittenText>
          </div>

              <div>
                <label htmlFor="nickname" className="block handwriting text-sm text-ink-500 dark:text-ink-400 mb-1">
                  Nickname <span className="text-ink-300 dark:text-ink-600">(optional)</span>
                </label>
                <input
                  id="nickname"
                  type="text"
                  value={form.nickname}
                  onChange={update('nickname')}
                  maxLength={20}
                  placeholder="e.g., Stargazer"
                  className="w-full px-4 py-2.5 rounded-xl bg-earth-50 dark:bg-ink-800/30 border border-earth-200 dark:border-ink-700/40 text-ink-800 dark:text-ink-100 placeholder:text-ink-300 dark:placeholder:text-ink-600 handwriting text-base focus:outline-none focus:ring-2 focus:ring-plum-400/40 focus:border-plum-400 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="ageGroup" className="block handwriting text-sm text-ink-500 dark:text-ink-400 mb-1">
                  Age Group <span className="text-clay-400">*</span>
                </label>
                <select
                  id="ageGroup"
                  value={form.ageGroup}
                  onChange={update('ageGroup')}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-earth-50 dark:bg-ink-800/30 border border-earth-200 dark:border-ink-700/40 text-ink-800 dark:text-ink-100 handwriting text-base focus:outline-none focus:ring-2 focus:ring-plum-400/40 focus:border-plum-400 transition-colors"
                >
                  <option value="">Select age group</option>
                  {AGE_GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="language" className="block handwriting text-sm text-ink-500 dark:text-ink-400 mb-1">
                  Preferred Language <span className="text-clay-400">*</span>
                </label>
                <select
                  id="language"
                  value={form.language}
                  onChange={update('language')}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-earth-50 dark:bg-ink-800/30 border border-earth-200 dark:border-ink-700/40 text-ink-800 dark:text-ink-100 handwriting text-base focus:outline-none focus:ring-2 focus:ring-plum-400/40 focus:border-plum-400 transition-colors"
                >
                  <option value="">Select language</option>
                  {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div>
                <label className="block handwriting text-sm text-ink-500 dark:text-ink-400 mb-2">
                  Current Mood <span className="text-clay-400">*</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {MOOD_OPTIONS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, currentMood: m.id }))}
                      className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border transition-all duration-150 ${
                        form.currentMood === m.id
                          ? 'bg-plum-100 dark:bg-plum-900/30 border-plum-300 dark:border-plum-600'
                          : 'bg-earth-50 dark:bg-ink-800/20 border-earth-200 dark:border-ink-700/30 hover:border-plum-200 dark:hover:border-plum-700'
                      }`}
                      aria-label={m.label}
                      aria-pressed={form.currentMood === m.id}
                    >
                      <span className="text-lg">{m.emoji}</span>
                      <span className="text-[10px] text-ink-500 dark:text-ink-400">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="concern" className="block handwriting text-sm text-ink-500 dark:text-ink-400 mb-1">
                  Primary Concern <span className="text-clay-400">*</span>
                </label>
                <select
                  id="concern"
                  value={form.primaryConcern}
                  onChange={update('primaryConcern')}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-earth-50 dark:bg-ink-800/30 border border-earth-200 dark:border-ink-700/40 text-ink-800 dark:text-ink-100 handwriting text-base focus:outline-none focus:ring-2 focus:ring-plum-400/40 focus:border-plum-400 transition-colors"
                >
                  <option value="">Select primary concern</option>
                  {PRIMARY_CONCERNS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" variant="primary" disabled={!isValid} loading={submitting} className="flex-1">
                  {submitting ? 'Starting session...' : 'Start Anonymous Chat'}
                </Button>
              </div>
            </form>
          </motion.div>
    </motion.div>
  );
}
