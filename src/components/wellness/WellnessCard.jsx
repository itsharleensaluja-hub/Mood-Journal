import { motion } from 'framer-motion';

const hoverAccents = {
  plum: 'group-hover:text-plum-600 dark:group-hover:text-plum-400',
  herb: 'group-hover:text-herb-600 dark:group-hover:text-herb-400',
  brass: 'group-hover:text-brass-500 dark:group-hover:text-brass-400',
  clay: 'group-hover:text-clay-600 dark:group-hover:text-clay-400',
};

export function WellnessCard({ module: m, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl p-5 bg-earth-50 dark:bg-ink-800/20 border ${m.borderColor} ${m.hoverBorderColor} transition-all duration-200 text-left w-full group cursor-pointer`}
      aria-label={`${m.title}: ${m.description}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${m.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="relative z-10">
        <span className="text-2xl mb-3 block">{m.icon}</span>
        <p className={`handwriting text-base text-ink-700 dark:text-ink-300 ${hoverAccents[m.accent] || hoverAccents.plum} transition-colors`}>
          {m.title}
        </p>
        <p className="text-[11px] uppercase tracking-wider text-ink-400 dark:text-ink-500 typewriter mt-0.5 mb-1.5">
          {m.subtitle}
        </p>
        <p className="text-xs text-ink-400 dark:text-ink-500 leading-relaxed">
          {m.description}
        </p>
      </div>
      <div className="relative z-10 mt-3 flex items-center gap-1 text-xs text-ink-400 dark:text-ink-500 group-hover:text-ink-600 dark:group-hover:text-ink-300 transition-colors">
        Open <span className="text-sm">→</span>
      </div>
    </motion.button>
  );
}
