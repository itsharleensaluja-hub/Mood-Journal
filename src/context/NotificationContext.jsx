import { createContext, useContext, useState, useCallback, useMemo, useRef, useEffect } from 'react';

const NotificationContext = createContext(undefined);

let toastId = 0;

function Toast({ id, type, message, onRemove }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onRemove(id), 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [id, onRemove]);

  const colors = {
    success: 'bg-herb-400/20 border-herb-400/30 text-herb-700 dark:text-herb-300',
    error: 'bg-clay-400/20 border-clay-400/30 text-clay-700 dark:text-clay-300',
    info: 'bg-brass-400/20 border-brass-400/30 text-ink-700 dark:text-ink-300',
  };

  const icons = {
    success: '✓',
    error: '✗',
    info: '·',
  };

  return (
    <div
      className={`handwriting text-base px-4 py-2.5 rounded-lg border backdrop-blur-sm shadow-floating transition-all duration-300 ${colors[type]} ${exiting ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}
    >
      <span className="mr-2">{icons[type]}</span>
      {message}
    </div>
  );
}

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
    delete timersRef.current[id];
  }, []);

  const addNotification = useCallback((type, message, duration = 3000) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, type, message }]);
    if (timersRef.current[id]) clearTimeout(timersRef.current[id]);
    timersRef.current[id] = setTimeout(() => removeToast(id), duration + 300);
    return id;
  }, [removeToast]);

  const value = useMemo(() => ({ addNotification }), [addNotification]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="fixed bottom-20 md:bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto">
            <Toast id={t.id} type={t.type} message={t.message} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
