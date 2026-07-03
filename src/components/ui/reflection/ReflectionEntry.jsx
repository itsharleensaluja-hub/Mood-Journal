import { useState } from 'react';
import { ArtifactCard } from '../../archive/ArtifactCard';
import { HandwrittenText } from '../../archive/HandwrittenText';
import { InkDivider } from '../../archive/InkDivider';
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
    <ArtifactCard variant="specimen">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg text-brass-400">✦</span>
        <HandwrittenText as="h2" size="lg" color="ink-700">
          Write a letter
        </HandwrittenText>
      </div>

      {currentMood && (
        <div className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg bg-earth-200/50 dark:bg-ink-800/40 border border-earth-300/30 dark:border-ink-700/30">
          <span className="text-sm">{getMoodById(currentMood)?.emoji}</span>
          <HandwrittenText size="sm" color="ink-600">{getMoodById(currentMood)?.label}</HandwrittenText>
          <HandwrittenText size="xs" color="ink-400" className="ml-auto">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          </HandwrittenText>
        </div>
      )}

      <div className="relative mb-4">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={latestEntry?.note || "Write about your day, thoughts, or feelings..."}
          rows={6}
          aria-label="Journal entry text"
          className="w-full bg-transparent handwriting text-lg leading-relaxed text-ink-800 dark:text-ink-100 placeholder:text-ink-300 dark:placeholder:text-ink-600 placeholder:handwriting focus:outline-none resize-none py-2 px-1"
          style={{ lineHeight: '1.8rem' }}
        />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border-b border-ink-100/20 dark:border-ink-800/20" style={{ height: '1.8rem' }} />
          ))}
        </div>
      </div>

      <InkDivider />

      <div className="mt-4">
        <button
          onClick={handleGenerate}
          disabled={!note.trim() && !latestEntry?.note}
          className="w-full handwriting text-lg px-5 py-2.5 bg-plum-500/10 hover:bg-plum-500/20 text-plum-600 dark:text-plum-300 rounded-lg transition-all duration-150 active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed border border-plum-300/30 dark:border-plum-700/30 focus-ring"
        >
          Send letter
        </button>
      </div>
    </ArtifactCard>
  );
}
