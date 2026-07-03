import { motion } from 'framer-motion';
import { AppLogo } from '../ui/AppLogo';

export function ClosedJournalCover({ isOpen, onOpen }) {
  const easing = [0.22, 1, 0.36, 1];

  return (
    <div
      className="absolute inset-0 z-10 cursor-pointer group"
      onClick={onOpen}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        className="relative w-full h-full rounded-xl overflow-hidden"
        style={{
          transformOrigin: 'left center',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
        animate={{ rotateY: isOpen ? -175 : 0 }}
        transition={{ duration: 0.9, ease: easing }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-leather-500 to-leather-700 border-2 border-leather-700 rounded-xl shadow-xl">
          <div className="absolute left-0 top-0 bottom-0 w-5 bg-leather-700 rounded-l-[10px]" />
          <div className="absolute left-[18px] top-3 bottom-3 w-px bg-leather-500/30" />
          <div className="absolute top-[3px] left-6 right-[3px] h-[2px] bg-paper-100/30 rounded-full" />
          <div className="absolute bottom-[3px] left-6 right-[3px] h-[2px] bg-paper-100/30 rounded-full" />
          <div className="absolute right-[3px] top-4 bottom-[3px] w-[2px] bg-paper-100/30 rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <AppLogo variant="symbol" size="lg" className="text-brass-400/40" />
          </div>
          <div className="absolute -bottom-px right-10 w-[14px] h-9 bg-brass-400/70 rounded-b-sm shadow-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-brass-400/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-white/5 to-transparent rounded-t-xl" />
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          opacity: isOpen ? [0.4, 0.6, 0.3] : 0,
          scale: isOpen ? [0.95, 1.1, 1] : 1,
        }}
        transition={{ duration: 1.2, delay: 0.2, ease: easing }}
        style={{
          background: 'radial-gradient(ellipse at 40% 50%, rgba(201, 168, 76, 0.15), transparent 65%)',
        }}
      />

      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brass-400/5 to-transparent" />
      </motion.div>
    </div>
  );
}
