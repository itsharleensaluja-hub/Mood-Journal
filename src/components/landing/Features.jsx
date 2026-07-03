import { motion } from 'framer-motion';
import { FEATURES } from '../../data/landing';
import { HandwrittenText } from '../archive/HandwrittenText';
import { InkDivider } from '../archive/InkDivider';
import {
  HiOutlineHeart,
  HiOutlineChartBar,
  HiOutlineSparkles,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineLockClosed,
} from 'react-icons/hi2';

const easing = [0.22, 1, 0.36, 1];

const iconMap = {
  HiOutlineHeart,
  HiOutlineChartBar,
  HiOutlineSparkles,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineLockClosed,
};

const specimenNumbers = ['I', 'II', 'III', 'IV', 'V', 'VI'];

function FeatureSpecimen({ feature, index }) {
  const Icon = iconMap[feature.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: easing }}
      className="group relative rounded-xl bg-paper-100 dark:bg-ink-800/40 border border-earth-300 dark:border-ink-700 p-6 sm:p-7 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-ink-100 dark:bg-ink-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {Icon && <Icon className="w-5 h-5 text-ink-500 dark:text-ink-300" aria-hidden="true" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="typewriter text-[10px] text-brass-400 uppercase tracking-wider">{specimenNumbers[index]}</span>
            <HandwrittenText as="h3" size="lg" className="text-ink-800 dark:text-ink-200">
              {feature.title}
            </HandwrittenText>
          </div>
          <HandwrittenText size="sm" color="ink-500" className="mt-1 block">
            {feature.description}
          </HandwrittenText>
        </div>
      </div>
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="features" className="py-28 sm:py-36 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: easing }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-earth-200/50 dark:bg-ink-800/40 border border-earth-300/50 dark:border-ink-700/50 mb-4">
            <span className="text-brass-400 text-sm">◇</span>
            <HandwrittenText size="sm" color="ink-500">Archive Exhibits</HandwrittenText>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-ink-900 dark:text-ink-100">
            Everything you need
          </h2>
          <HandwrittenText size="base" color="ink-500" className="mt-3 block">
            Six artifacts in the collection
          </HandwrittenText>
        </motion.div>

        <InkDivider className="mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FEATURES.map((feature, i) => (
            <FeatureSpecimen key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
