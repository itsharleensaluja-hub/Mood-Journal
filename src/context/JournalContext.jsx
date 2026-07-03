import { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  calculateStreak,
  calculateEmotionalBalance,
  getWeeklyMoodData,
  getMoodDistribution,
  getMonthlyScore,
  getMostUsedMoods,
} from '../utils/statsCalculators';
import { getDailyAffirmation } from '../data/affirmations';

const JournalContext = createContext(undefined);

export function JournalProvider({ children }) {
  const [entries, setEntries] = useLocalStorage('mindpulse-entries', []);
  const [currentMood, setCurrentMood] = useLocalStorage('mindpulse-current-mood', null);

  const selectMood = useCallback((moodId) => {
    setCurrentMood(moodId);
  }, [setCurrentMood]);

  const addEntry = useCallback(({ moodId, note }) => {
    const entry = {
      id: `entry-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      moodId: moodId || currentMood,
      note: note || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setEntries(prev => [entry, ...prev]);
    return entry;
  }, [currentMood, setEntries]);

  const deleteEntry = useCallback((entryId) => {
    setEntries(prev => prev.filter(e => e.id !== entryId));
  }, [setEntries]);

  const updateEntry = useCallback((entryId, updates) => {
    setEntries(prev =>
      prev.map(e =>
        e.id === entryId
          ? { ...e, ...updates, updatedAt: new Date().toISOString() }
          : e
      )
    );
  }, [setEntries]);

  const getEntryById = useCallback((entryId) => {
    return entries.find(e => e.id === entryId) || null;
  }, [entries]);

  const getRecentEntries = useCallback((count = 5) => {
    return entries.slice(0, count);
  }, [entries]);

  const clearAllData = useCallback(() => {
    setEntries([]);
    setCurrentMood(null);
    window.localStorage.removeItem('mindpulse-entries');
    window.localStorage.removeItem('mindpulse-current-mood');
  }, [setEntries, setCurrentMood]);

  const stats = useMemo(() => ({
    streak: calculateStreak(entries),
    balance: calculateEmotionalBalance(entries),
    weekly: getWeeklyMoodData(entries),
    distribution: getMoodDistribution(entries),
    topMoods: getMostUsedMoods(entries),
    totalEntries: entries.length,
    currentMood,
  }), [entries, currentMood]);

  const affirmation = useMemo(() => getDailyAffirmation(), []);

  const value = useMemo(() => ({
    entries,
    currentMood,
    stats,
    affirmation,
    selectMood,
    addEntry,
    deleteEntry,
    updateEntry,
    getEntryById,
    getRecentEntries,
    clearAllData,
  }), [
    entries,
    currentMood,
    stats,
    affirmation,
    selectMood,
    addEntry,
    deleteEntry,
    updateEntry,
    getEntryById,
    getRecentEntries,
    clearAllData,
  ]);

  return (
    <JournalContext.Provider value={value}>
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
}
