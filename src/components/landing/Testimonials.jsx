import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../../data/landing';

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-xl mb-12"
        >
          <span className="text-xs font-medium text-plum-500 uppercase tracking-widest mb-3 block">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-ink-900 dark:text-ink-100 leading-tight">
            Loved by people like you
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="p-6 sm:p-8 rounded-xl border border-earth-200 dark:border-ink-700 bg-earth-50 dark:bg-ink-800/30"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-clay-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-ink-600 dark:text-ink-300 leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-plum-100 dark:bg-plum-900/30 flex items-center justify-center text-xs font-semibold text-plum-600 dark:text-plum-300">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-ink-900 dark:text-ink-100">{t.name}</div>
                  <div className="text-xs text-ink-400 dark:text-ink-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
