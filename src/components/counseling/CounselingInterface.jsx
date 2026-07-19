import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { HandwrittenText } from '../archive/HandwrittenText';
import { MessageBubble, TypingIndicator } from './MessageBubble';
import { PrivacyBanner } from './PrivacyBanner';
import { Button } from '../common/Button';
import { fadeUp } from '../../utils/animations';

const AUTO_REPLIES = [
  "I hear you. Can you tell me more about how that's been affecting you?",
  "That sounds really challenging. What coping strategies have you tried?",
  "It's completely valid to feel that way. Let's explore what's underneath.",
  "I appreciate you sharing that. How does your body feel when you experience this?",
  "Thank you for trusting me. What would feel like a small step forward today?",
  "That's a really important insight. What do you need right now?",
  "Let's take a moment to breathe together. Inhale deeply for 4 counts, hold for 4, exhale for 6.",
  "I want to acknowledge your courage in being here. What's the most pressing thing on your mind?",
];

export function CounselingInterface({ anonymousId, counselor, onEndSession }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      text: `Hello, I'm ${counselor.name}. Thank you for reaching out. I'm here to support you. Feel free to share whatever is on your mind — this is a safe, judgment-free space.`,
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const autoReplyTimer = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;
    const userMsg = { id: `u-${Date.now()}`, text: text.trim(), isUser: true, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setIsTyping(true);
    clearTimeout(autoReplyTimer.current);
    autoReplyTimer.current = setTimeout(() => {
      const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
      setMessages((prev) => [...prev, { id: `c-${Date.now()}`, text: reply, isUser: false, timestamp: new Date() }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1500);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleEndSession = () => {
    clearTimeout(autoReplyTimer.current);
    onEndSession();
  };

  const statusColor = 'bg-herb-400';

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-12rem)] min-h-[600px]">
      {/* Left Panel — Session info */}
      <motion.div variants={fadeUp} className="lg:w-56 flex-shrink-0">
        <div className="rounded-2xl bg-earth-50/60 dark:bg-ink-800/20 border border-earth-200 dark:border-ink-700/30 p-4 space-y-4 backdrop-blur-sm">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-ink-400 dark:text-ink-500 typewriter mb-1">Session ID</p>
            <p className="font-mono text-sm text-plum-500 dark:text-plum-300 font-bold tracking-wide">{anonymousId}</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-ink-400 dark:text-ink-500 typewriter mb-1">Connection</p>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${statusColor} shadow-[0_0_6px_theme(colors.herb.400/40)]`} />
              <span className="handwriting text-sm text-herb-600 dark:text-herb-400">Connected</span>
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-ink-400 dark:text-ink-500 typewriter mb-1">Session Time</p>
            <p className="font-mono text-sm text-ink-700 dark:text-ink-300">{formatTime(elapsed)}</p>
          </div>

          <div className="pt-2 border-t border-earth-200 dark:border-ink-700/30">
            <Button variant="ghost" size="sm" onClick={() => setShowEndConfirm(true)} className="w-full text-clay-500 hover:text-clay-400 text-xs">
              End Session
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Area — Chat */}
      <motion.div variants={fadeUp} className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 rounded-2xl bg-earth-50/40 dark:bg-ink-800/10 border border-earth-200 dark:border-ink-700/30 p-4 flex flex-col backdrop-blur-sm">
          {/* Connection header */}
          <div className="flex items-center gap-2.5 px-1 pb-3 border-b border-earth-200 dark:border-ink-700/30 mb-3">
            <div className="w-8 h-8 rounded-full bg-plum-100 dark:bg-plum-800 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-plum-500 dark:text-plum-300">{counselor.avatar}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="handwriting text-sm text-ink-700 dark:text-ink-300 truncate">{counselor.name}</p>
              <p className="text-[10px] text-ink-400 dark:text-ink-500 truncate">{counselor.specialization}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-herb-400 shadow-[0_0_6px_theme(colors.herb.400/40)]" />
              <span className="text-[10px] text-herb-500 dark:text-herb-400 typewriter">ONLINE</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 px-1 py-2 scrollbar-thin">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} isUser={msg.isUser} showAvatar />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="flex items-end gap-2 mt-3 pt-3 border-t border-earth-200 dark:border-ink-700/30">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows={1}
                className="w-full px-4 py-2.5 rounded-xl bg-earth-50 dark:bg-ink-800/30 border border-earth-200 dark:border-ink-700/40 text-ink-800 dark:text-ink-100 placeholder:text-ink-300 dark:placeholder:text-ink-600 text-sm focus:outline-none focus:ring-2 focus:ring-plum-400/30 focus:border-plum-400 transition-colors resize-none"
                aria-label="Message input"
              />
              <span className="absolute right-3 bottom-2 text-[10px] text-ink-300 dark:text-ink-600 typewriter pointer-events-none">
                Enter to send
              </span>
            </div>
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="px-4 py-2.5 rounded-xl bg-plum-500/10 dark:bg-plum-400/15 border border-plum-300/30 dark:border-plum-600/30 text-plum-600 dark:text-plum-300 hover:bg-plum-500/20 dark:hover:bg-plum-400/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 flex-shrink-0"
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-3">
          <PrivacyBanner />
        </div>
      </motion.div>

      {/* Right Panel — Counselor info */}
      <motion.div variants={fadeUp} className="lg:w-56 flex-shrink-0">
        <div className="rounded-2xl bg-earth-50/60 dark:bg-ink-800/20 border border-earth-200 dark:border-ink-700/30 p-4 space-y-4 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-plum-100 dark:bg-plum-800 flex items-center justify-center mx-auto mb-2 border-2 border-plum-200 dark:border-plum-700">
              <span className="text-base font-bold text-plum-500 dark:text-plum-300">{counselor.avatar}</span>
            </div>
            <p className="handwriting text-sm text-ink-700 dark:text-ink-300">{counselor.name}</p>
            <p className="text-[10px] text-ink-400 dark:text-ink-500 typewriter mt-0.5">{counselor.title}</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-ink-400 dark:text-ink-500 typewriter mb-1.5">Specialization</p>
            <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed">{counselor.specialization}</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-ink-400 dark:text-ink-500 typewriter mb-1.5">Languages</p>
            <div className="flex flex-wrap gap-1">
              {counselor.languages.map((lang) => (
                <span key={lang} className="px-2 py-0.5 rounded-full bg-plum-100/50 dark:bg-plum-900/20 border border-plum-200/30 dark:border-plum-700/20 text-[10px] text-plum-500 dark:text-plum-400">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-ink-400 dark:text-ink-500 typewriter mb-1.5">Tags</p>
            <div className="flex flex-wrap gap-1">
              {counselor.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-md bg-earth-200/50 dark:bg-ink-700/30 text-[10px] text-ink-500 dark:text-ink-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-earth-200 dark:border-ink-700/30">
            <p className="text-[10px] uppercase tracking-widest text-ink-400 dark:text-ink-500 typewriter mb-1.5">Session Notes</p>
            <p className="text-[11px] text-ink-400 dark:text-ink-500 italic leading-relaxed">
              Notes are private and end-to-end encrypted. Your counselor may take notes during the session.
            </p>
          </div>

          <div className="pt-2 border-t border-earth-200 dark:border-ink-700/30">
            <p className="text-[10px] uppercase tracking-widest text-ink-400 dark:text-ink-500 typewriter mb-1.5">Need immediate help?</p>
            <button
              onClick={() => setShowEmergency(true)}
              className="w-full py-2 rounded-xl bg-clay-50 dark:bg-clay-900/20 border border-clay-200 dark:border-clay-700/30 text-clay-600 dark:text-clay-400 handwriting text-sm hover:bg-clay-100 dark:hover:bg-clay-900/30 transition-all duration-150"
            >
              Emergency Resources
            </button>
          </div>
        </div>
      </motion.div>

      {/* End Session Confirmation Modal */}
      {showEndConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/30 dark:bg-ink-950/50 backdrop-blur-sm" onClick={() => setShowEndConfirm(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-earth-50 dark:bg-ink-800 rounded-2xl p-6 max-w-sm w-full shadow-xl border border-earth-200 dark:border-ink-700"
            onClick={(e) => e.stopPropagation()}
          >
            <HandwrittenText as="h3" size="lg" className="text-ink-900 dark:text-ink-100 mb-2">End Session?</HandwrittenText>
            <p className="text-sm text-ink-500 dark:text-ink-400 mb-6 leading-relaxed">
              Your session will be securely closed. If you need support later, you can start a new session anytime.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setShowEndConfirm(false)} className="flex-1">
                Cancel
              </Button>
              <Button variant="danger" onClick={handleEndSession} className="flex-1">
                End Session
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Emergency Resources Modal */}
      {showEmergency && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/30 dark:bg-ink-950/50 backdrop-blur-sm" onClick={() => setShowEmergency(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-earth-50 dark:bg-ink-800 rounded-2xl p-6 max-w-sm w-full shadow-xl border border-earth-200 dark:border-ink-700"
            onClick={(e) => e.stopPropagation()}
          >
            <HandwrittenText as="h3" size="lg" className="text-ink-900 dark:text-ink-100 mb-1">Crisis Resources</HandwrittenText>
            <p className="text-sm text-ink-500 dark:text-ink-400 mb-4 leading-relaxed">
              If you're in crisis or need immediate support, please reach out to one of these resources:
            </p>
            <div className="space-y-3">
              <a href="https://988lifeline.org" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-xl bg-clay-50 dark:bg-clay-900/20 border border-clay-200 dark:border-clay-700/30 hover:bg-clay-100 dark:hover:bg-clay-900/30 transition-colors">
                <p className="text-sm font-semibold text-clay-600 dark:text-clay-400">988 Suicide & Crisis Lifeline</p>
                <p className="text-[11px] text-clay-500 dark:text-clay-500 mt-0.5">Call or text 988</p>
              </a>
              <a href="https://www.crisistextline.org" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-xl bg-clay-50 dark:bg-clay-900/20 border border-clay-200 dark:border-clay-700/30 hover:bg-clay-100 dark:hover:bg-clay-900/30 transition-colors">
                <p className="text-sm font-semibold text-clay-600 dark:text-clay-400">Crisis Text Line</p>
                <p className="text-[11px] text-clay-500 dark:text-clay-500 mt-0.5">Text HOME to 741741</p>
              </a>
              <a href="https://www.samhsa.gov/find-help/national-helpline" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-xl bg-clay-50 dark:bg-clay-900/20 border border-clay-200 dark:border-clay-700/30 hover:bg-clay-100 dark:hover:bg-clay-900/30 transition-colors">
                <p className="text-sm font-semibold text-clay-600 dark:text-clay-400">SAMHSA Helpline</p>
                <p className="text-[11px] text-clay-500 dark:text-clay-500 mt-0.5">1-800-662-4357</p>
              </a>
            </div>
            <button
              onClick={() => setShowEmergency(false)}
              className="mt-4 w-full py-2 rounded-xl bg-earth-200 dark:bg-ink-700 text-ink-600 dark:text-ink-300 text-sm handwriting hover:bg-earth-300 dark:hover:bg-ink-600 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
