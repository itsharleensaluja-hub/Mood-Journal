import { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../../common/GlassCard';
import { useJournal } from '../../../context/JournalContext';
import { getMoodById } from '../../../data/moods';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const MoodHeatmap = memo(function MoodHeatmap() {
  const { entries } = useJournal();

  const heatmapData = useMemo(() => {
    const data = [];
    const today = new Date();
    const entryMap = {};

    entries.forEach(entry => {
      const d = new Date(entry.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      entryMap[key] = entry;
    });

    for (let w = 0; w < 12; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (11 - w) * 7 + d - 3);
        const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        const entry = entryMap[key];
        week.push({
          date,
          mood: entry ? getMoodById(entry.moodId) : null,
          hasEntry: !!entry,
        });
      }
      data.push(week);
    }
    return data;
  }, [entries]);

  return (
    <GlassCard padding="md" className="mb-5 overflow-x-auto">
      <h3 className="text-xs font-medium text-ink-500 dark:text-ink-400 uppercase tracking-wider mb-4">
        Mood Calendar
      </h3>

      <div className="flex gap-1 min-w-[400px]" role="grid" aria-label="Mood calendar">
        <div className="flex flex-col gap-1 pr-2">
          <div className="h-3" />
          {DAYS.map(day => (
            <span key={day} className="text-[9px] text-ink-400 dark:text-ink-600 h-3 flex items-center">
              {day}
            </span>
          ))}
        </div>

        {heatmapData.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            <span className="text-[9px] text-ink-400 dark:text-ink-600 h-3 text-center">
              {MONTHS[week[3]?.date?.getMonth()] || ''}
            </span>
            {week.map((day, di) => (
              <motion.div
                key={`${wi}-${di}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (wi * 7 + di) * 0.003 }}
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: day.mood?.color || (day.hasEntry ? '#C9C4BC' : '#E3E0DA'),
                  opacity: day.mood ? 0.9 : day.hasEntry ? 0.4 : 0.2,
                }}
                title={day.mood ? `${day.mood.label} - ${day.date?.toLocaleDateString()}` : day.date?.toLocaleDateString()}
                role="gridcell"
                aria-label={`${day.date?.toLocaleDateString()}: ${day.mood?.label || 'No entry'}`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4 justify-end">
        <span className="text-[10px] text-ink-400 dark:text-ink-600">Less</span>
        <div className="w-3 h-3 rounded-sm bg-ink-200 dark:bg-ink-700" />
        <div className="w-3 h-3 rounded-sm bg-ink-300 dark:bg-ink-600" />
        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#B69FCC' }} />
        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#A6CCA9' }} />
        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#E8B8A8' }} />
        <span className="text-[10px] text-ink-400 dark:text-ink-600">More</span>
      </div>
    </GlassCard>
  );
});
