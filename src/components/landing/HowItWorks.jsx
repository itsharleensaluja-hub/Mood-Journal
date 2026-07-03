import { motion } from 'framer-motion';
import { HOW_IT_WORKS } from '../../data/landing';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 px-6 bg-earth-200/50 dark:bg-ink-800/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-xl mb-12"
        >
          <span className="text-xs font-medium text-plum-500 uppercase tracking-widest mb-3 block">How It Works</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-ink-900 dark:text-ink-100 leading-tight">
            Four steps to emotional clarity
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="relative"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-plum-100 dark:bg-plum-900/30 text-plum-600 dark:text-plum-300 text-sm font-semibold">
                  {step.step}
                </span>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block flex-1 h-px bg-ink-200 dark:bg-ink-700" />
                )}
              </div>
              <span className="text-2xl mb-2 block">{step.emoji}</span>
              <h3 className="text-base font-serif font-semibold text-ink-900 dark:text-ink-100 mb-1.5">
                {step.title}
              </h3>
              <p className="text-sm text-ink-400 dark:text-ink-500 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
