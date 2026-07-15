import { createContext, useContext, useCallback, useMemo, useState, useEffect } from 'react';
import api from '../hooks/useApi';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';
import { getDailyAffirmation } from '../data/affirmations';

const JournalContext = createContext(undefined);

export function JournalProvider({ children }) {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [entries, setEntries] = useState([]);
  const [currentMood, setCurrentMood] = useState(null);
  const [page, setPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState({ total: 0, pages: 0, hasMore: false });
  const [stats, setStats] = useState({
    streak: { current: 0, best: 0 },
    balance: { score: 50, level: 'Neutral' },
    weekly: [],
    distribution: [],
    topMoods: [],
    totalEntries: 0,
    currentMood: null,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchEntries = useCallback(async (pageNum = 1) => {
    const { data } = await api.get(`/entries?limit=10&page=${pageNum}`);
    setEntries(data.entries);
    setPaginationMeta(data.pagination);
    return data;
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchAll = async () => {
      try {
        const [entriesRes, statsRes, weeklyRes, distRes, topRes] = await Promise.all([
          fetchEntries(1),
          api.get('/analytics/stats'),
          api.get('/analytics/weekly'),
          api.get('/analytics/distribution'),
          api.get('/analytics/top-moods'),
        ]);

        setStats({
          streak: statsRes.data.stats?.streak || { current: 0, best: 0 },
          balance: statsRes.data.stats?.balance || { score: 50, level: 'Neutral' },
          weekly: weeklyRes.data.weekly || [],
          distribution: distRes.data.distribution || [],
          topMoods: topRes.data.topMoods || [],
          totalEntries: statsRes.data.stats?.totalEntries || 0,
          currentMood,
        });
      } catch {
        addNotification('error', 'Failed to load your archive');
      } finally {
        setIsLoaded(true);
      }
    };

    fetchAll();
  }, [user, fetchEntries, addNotification, currentMood]);

  const changePage = useCallback(async (newPage) => {
    setPage(newPage);
    try {
      await fetchEntries(newPage);
    } catch {
      addNotification('error', 'Failed to load page');
    }
  }, [fetchEntries, addNotification]);

  const selectMood = useCallback((moodId) => {
    setCurrentMood(moodId);
  }, []);

  const refreshStats = useCallback(async () => {
    try {
      const [statsRes, weeklyRes, distRes, topRes] = await Promise.all([
        api.get('/analytics/stats'),
        api.get('/analytics/weekly'),
        api.get('/analytics/distribution'),
        api.get('/analytics/top-moods'),
      ]);
      setStats(prev => ({
        ...prev,
        streak: statsRes.data.stats?.streak || { current: 0, best: 0 },
        balance: statsRes.data.stats?.balance || { score: 50, level: 'Neutral' },
        weekly: weeklyRes.data.weekly || [],
        distribution: distRes.data.distribution || [],
        topMoods: topRes.data.topMoods || [],
        totalEntries: statsRes.data.stats?.totalEntries || 0,
      }));
    } catch {
      // silently fail
    }
  }, []);

  const addEntry = useCallback(async ({ moodId, note }) => {
    const tempId = `temp-${Date.now()}`;
    const tempEntry = {
      _id: tempId,
      moodId: moodId || currentMood,
      note: note || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setEntries(prev => [tempEntry, ...prev]);

    try {
      const { data } = await api.post('/entries', {
        moodId: moodId || currentMood,
        note: note || '',
      });
      setEntries(prev => prev.map(e => e._id === tempId ? data.entry : e));
      refreshStats();
      addNotification('success', 'Entry inked');
      return data.entry;
    } catch {
      setEntries(prev => prev.filter(e => e._id !== tempId));
      addNotification('error', 'Failed to save entry');
      return null;
    }
  }, [currentMood, refreshStats, addNotification]);

  const deleteEntry = useCallback(async (entryId) => {
    const prev = entries;
    setEntries(prev => prev.filter(e => e._id !== entryId));
    try {
      await api.delete(`/entries/${entryId}`);
      refreshStats();
      addNotification('info', 'Entry moved to archive');
    } catch {
      setEntries(prev);
      addNotification('error', 'Failed to delete entry');
    }
  }, [entries, refreshStats, addNotification]);

  const updateEntry = useCallback(async (entryId, updates) => {
    const prev = entries;
    setEntries(prev => prev.map(e => e._id === entryId ? { ...e, ...updates } : e));
    try {
      const { data } = await api.patch(`/entries/${entryId}`, updates);
      setEntries(prev => prev.map(e => e._id === entryId ? data.entry : e));
      refreshStats();
      addNotification('success', 'Entry updated');
    } catch {
      setEntries(prev);
      addNotification('error', 'Failed to update entry');
    }
  }, [entries, refreshStats, addNotification]);

  const getEntryById = useCallback((entryId) => {
    return entries.find(e => e._id === entryId) || null;
  }, [entries]);

  const getRecentEntries = useCallback((count = 5) => {
    return entries.slice(0, count);
  }, [entries]);

  const clearAllData = useCallback(async () => {
    try {
      for (const entry of entries) {
        await api.delete(`/entries/${entry._id}`);
      }
      setEntries([]);
      setCurrentMood(null);
      refreshStats();
      addNotification('info', 'All entries cleared');
    } catch {
      addNotification('error', 'Failed to clear entries');
    }
  }, [entries, refreshStats, addNotification]);

  const affirmation = useMemo(() => getDailyAffirmation(), []);

  const value = useMemo(() => ({
    entries,
    currentMood,
    stats,
    affirmation,
    isLoaded,
    page,
    paginationMeta,
    changePage,
    selectMood,
    addEntry,
    deleteEntry,
    updateEntry,
    getEntryById,
    getRecentEntries,
    clearAllData,
  }), [
    entries, currentMood, stats, affirmation, isLoaded, page, paginationMeta,
    changePage, selectMood, addEntry, deleteEntry, updateEntry,
    getEntryById, getRecentEntries, clearAllData,
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
