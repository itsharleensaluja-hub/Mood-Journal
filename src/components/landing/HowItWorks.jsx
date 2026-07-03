import { motion } from 'framer-motion';
import { HandwrittenText } from '../archive/HandwrittenText';
import { HiOutlineFaceSmile, HiOutlinePencilSquare, HiOutlineChartBar } from 'react-icons/hi2';

const easing = [0.22, 1, 0.36, 1];

const artifacts = [
  {
    icon: HiOutlineFaceSmile,
    title: 'Choose a Mood',
    tagline: 'Place a pressed flower',
    emoji: '🌸',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    accent: 'border-l-amber-400',
  },
  {
    icon: HiOutlinePencilSquare,
    title: 'Write in Your Journal',
    tagline: 'Ink your thoughts',
    emoji: '✒️',
    iconBg: 'bg-plum-100 dark:bg-plum-900/30',
    iconColor: 'text-plum-600 dark:text-plum-400',
    accent: 'border-l-plum-400',
  },
  {
    icon: HiOutlineChartBar,
    title: 'Discover Your Patterns',
    tagline: 'Browse the archive',
    emoji: '◇',
    iconBg: 'bg-herb-100 dark:bg-herb-900/30',
    iconColor: 'text-herb-600 dark:text-herb-400',
    accent: 'border-l-herb-400',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 sm:py-36 px-6 bg-earth-200/50 dark:bg-ink-800/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: easing }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-earth-200/50 dark:bg-ink-800/40 border border-earth-300/50 dark:border-ink-700/50 mb-4">
            <span className="text-brass-400 text-sm">✦</span>
            <HandwrittenText size="sm" color="ink-500">The Method</HandwrittenText>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-ink-900 dark:text-ink-100">
            How it works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 items-start">
          {artifacts.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: easing }}
                className={`rounded-xl p-6 sm:p-8 text-center border-l-[3px] ${step.accent} bg-paper-100 dark:bg-ink-800/40 border border-earth-300 dark:border-ink-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative`}
              >
                <div className={`w-12 h-12 rounded-xl ${step.iconBg} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-6 h-6 ${step.iconColor}`} aria-hidden="true" />
                </div>
                <div className="text-2xl mb-2">{step.emoji}</div>
                <HandwrittenText as="h3" size="lg" className="text-ink-800 dark:text-ink-200 mb-1">
                  {step.title}
                </HandwrittenText>
                <HandwrittenText size="sm" color="ink-500">
                  {step.tagline}
                </HandwrittenText>
                <div className="mt-4 text-[10px] typewriter text-brass-400 uppercase tracking-wider">
                  Step {i + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
