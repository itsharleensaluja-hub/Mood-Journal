import { motion } from 'framer-motion';
import { FEATURES } from '../../data/landing';

const iconSymbols = {
  HiOutlineHeart: '♥',
  HiOutlineChartBar: '◈',
  HiOutlineSparkles: '✦',
  HiOutlineSun: '⊙',
  HiOutlineMoon: '☾',
  HiOutlineLockClosed: '◆',
};

function FeatureCard({ feature, index }) {
  const symbol = iconSymbols[feature.icon] || '●';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group p-6 sm:p-8 rounded-xl border border-earth-200 dark:border-ink-700 hover:border-plum-200 dark:hover:border-plum-700 bg-earth-50 dark:bg-ink-800/30 transition-all duration-200"
    >
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-plum-100 text-plum-600 dark:bg-plum-900/30 dark:text-plum-300 text-lg mb-5 group-hover:bg-plum-200 dark:group-hover:bg-plum-800/30 transition-colors duration-200">
        {symbol}
      </span>
      <h3 className="text-base font-serif font-semibold text-ink-900 dark:text-ink-100 mb-2">
        {feature.title}
      </h3>
      <p className="text-sm text-ink-400 dark:text-ink-500 leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-xl mb-16"
        >
          <span className="text-xs font-medium text-plum-500 uppercase tracking-widest mb-3 block">Features</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-ink-900 dark:text-ink-100 mb-4 leading-tight">
            Everything you need to understand your emotions
          </h2>
          <p className="text-sm text-ink-400 dark:text-ink-500 leading-relaxed">
            Beautiful tools designed to help you track, understand, and grow from your emotional journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
