import { useState } from 'react';
import { GlassCard } from '../../common/GlassCard';
import { useJournal } from '../../../context/JournalContext';
import { getMoodById } from '../../../data/moods';

export function ReflectionEntry({ onGenerate }) {
  const { currentMood, getRecentEntries } = useJournal();
  const latestEntry = getRecentEntries(1)[0];
  const [note, setNote] = useState(latestEntry?.note || '');

  const handleGenerate = () => {
    onGenerate({
      text: note || latestEntry?.note || '',
      moodId: currentMood || latestEntry?.moodId,
    });
  };

  return (
    <GlassCard padding="md">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-base">📝</span>
        <h2 className="text-sm font-medium text-ink-700 dark:text-ink-300">
          Journal Entry
        </h2>
      </div>

      {currentMood && (
        <div className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg bg-earth-100 dark:bg-ink-800">
          <span className="text-sm">{getMoodById(currentMood)?.emoji}</span>
          <span className="text-sm text-ink-600 dark:text-ink-300">{getMoodById(currentMood)?.label}</span>
          <span className="text-xs text-ink-400 dark:text-ink-500 ml-auto">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          </span>
        </div>
      )}

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder={latestEntry?.note || "Write about your day, thoughts, or feelings..."}
        rows={6}
        aria-label="Journal entry text"
        className="w-full bg-transparent border-b-2 border-ink-200 dark:border-ink-700 pb-2 text-sm text-ink-800 dark:text-ink-100 placeholder:text-ink-400 dark:placeholder:text-ink-600 focus:outline-none focus:border-plum-400 dark:focus:border-plum-500 transition-colors duration-150 resize-none"
      />

      <div className="mt-4">
        <button
          onClick={handleGenerate}
          disabled={!note.trim() && !latestEntry?.note}
          className="w-full px-5 py-2.5 bg-plum-500 hover:bg-plum-600 active:bg-plum-700 text-white rounded-lg text-sm font-medium transition-all duration-150 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Generate AI Reflection
        </button>
      </div>
    </GlassCard>
  );
}
