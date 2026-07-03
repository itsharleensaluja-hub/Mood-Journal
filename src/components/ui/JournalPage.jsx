import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useJournal } from '../../context/JournalContext';
import { HandwrittenText } from '../archive/HandwrittenText';
import { InkDivider } from '../archive/InkDivider';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export function JournalPage() {
  const [note, setNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micSupported] = useState(() => !!SpeechRecognition);
  const recognitionRef = useRef(null);
  const noteRef = useRef(note);
  const { currentMood, addEntry } = useJournal();

  useEffect(() => { noteRef.current = note; }, [note]);

  const handleSave = useCallback(() => {
    if (!note.trim()) return;
    addEntry({ moodId: currentMood, note: note.trim() });
    setNote('');
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  }, [note, currentMood, addEntry]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        }
      }
      const current = noteRef.current;
      if (final) {
        const prefix = current && !current.endsWith(' ') && !current.endsWith('\n') ? ' ' : '';
        setNote(current + prefix + final);
      }
    };

    recognition.onerror = () => { setIsListening(false); };
    recognition.onend = () => { setIsListening(false); };

    try {
      recognition.start();
      recognitionRef.current = recognition;
      setIsListening(true);
    } catch {
      setIsListening(false);
    }
  }, [isListening]);

  useEffect(() => {
    return () => { recognitionRef.current?.stop(); };
  }, []);

  return (
    <div className="relative">
      <HandwrittenText as="h2" size="lg" color="ink-700" className="mb-4">
        What's on your mind?
      </HandwrittenText>

      <div className="relative">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleSave(); }}
          placeholder="Write a few sentences about your day..."
          rows={5}
          aria-label="Journal entry"
          className="w-full bg-transparent handwriting text-lg leading-relaxed text-ink-800 dark:text-ink-100 placeholder:text-ink-300 dark:placeholder:text-ink-600 placeholder:handwriting focus:outline-none resize-none py-2 px-1"
          style={{ lineHeight: '1.8rem' }}
        />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border-b border-ink-100/30 dark:border-ink-800/30"
              style={{ height: '1.8rem' }}
            />
          ))}
        </div>
        {micSupported && (
          <button
            onClick={toggleListening}
            aria-label={isListening ? 'Stop recording' : 'Start voice entry'}
            title={isListening ? 'Stop recording' : 'Voice entry'}
            className={`absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 focus-ring ${
              isListening
                ? 'bg-herb-400/20 text-herb-600 animate-pulse'
                : 'bg-earth-200 dark:bg-ink-700 text-ink-400 hover:text-ink-600 dark:hover:text-ink-300'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
        )}
      </div>

      <InkDivider className="my-3" />

      <div className="flex items-center justify-between">
        <HandwrittenText size="sm" color="ink-500">
          {isListening ? 'Listening...' : currentMood ? 'Flower placed' : 'Select a flower above'}
        </HandwrittenText>
        <AnimatePresence>
          {isSaved ? (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="handwriting text-base text-herb-500"
            >
              Inked ✓
            </motion.span>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                disabled={!note.trim()}
                className="handwriting text-lg text-ink-500 hover:text-ink-800 dark:text-ink-400 dark:hover:text-ink-200 disabled:text-ink-200 dark:disabled:text-ink-700 disabled:cursor-not-allowed transition-colors duration-150 focus-ring px-2 py-1"
              >
                Ink entry
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
