import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HandwrittenText } from '../archive/HandwrittenText';
import { InkDivider } from '../archive/InkDivider';
import { Button } from '../common/Button';
import { WELLNESS_QUIZ } from '../../data/wellness';
import { fadeUp } from '../../utils/animations';

export function QuizAssessment({ onBack }) {
  const [step, setStep] = useState('intro');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);

  const questions = WELLNESS_QUIZ.questions;
  const isLast = current === questions.length - 1;

  const handleSelect = (value) => {
    setSelected(value);
  };

  const handleNext = () => {
    setAnswers((prev) => ({ ...prev, [questions[current].id]: selected }));
    setSelected(null);
    if (isLast) {
      setStep('result');
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  const handleStart = () => {
    setCurrent(0);
    setAnswers({});
    setSelected(null);
    setStep('quiz');
  };

  const score = step === 'result' ? WELLNESS_QUIZ.getScore(answers) : 0;
  const result = step === 'result' ? WELLNESS_QUIZ.getResult(score) : null;

  if (step === 'intro') {
    return (
      <motion.div variants={fadeUp} initial="initial" animate="animate" className="max-w-lg mx-auto py-8">
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">{WELLNESS_QUIZ.title === 'Mindful Check-In' ? '📋' : '📋'}</span>
          <HandwrittenText as="h2" size="xl" className="text-ink-900 dark:text-ink-100 mb-2">
            {WELLNESS_QUIZ.title}
          </HandwrittenText>
          <HandwrittenText size="sm" color="ink-500" className="block mb-4">
            {WELLNESS_QUIZ.description}
          </HandwrittenText>
          <p className="text-xs text-ink-400 dark:text-ink-500 mb-6">
            5 questions · 2 minutes · completely private
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="secondary" onClick={onBack}>Back</Button>
            <Button variant="primary" onClick={handleStart}>Start Quiz</Button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (step === 'quiz') {
    const q = questions[current];
    const progress = ((current) / questions.length) * 100;

    return (
      <motion.div variants={fadeUp} initial="initial" animate="animate" className="max-w-lg mx-auto py-4">
        <button onClick={onBack} className="text-xs text-ink-400 dark:text-ink-500 hover:text-ink-600 dark:hover:text-ink-300 transition-colors mb-4">
          ← All modules
        </button>

        <div className="w-full bg-earth-200 dark:bg-ink-700 rounded-full h-1.5 mb-6">
          <motion.div
            className="h-full rounded-full bg-plum-400 dark:bg-plum-300"
            initial={{ width: `${progress}%` }}
            animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] uppercase tracking-widest text-ink-400 dark:text-ink-500 typewriter mb-1">
              Question {current + 1} of {questions.length}
            </p>
            <HandwrittenText as="h3" size="lg" className="text-ink-800 dark:text-ink-200 mb-5">
              {q.text}
            </HandwrittenText>

            <div className="space-y-2.5">
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-150 text-sm ${
                    selected === opt.value
                      ? 'bg-plum-100 dark:bg-plum-900/30 border-plum-300 dark:border-plum-600 text-ink-800 dark:text-ink-200'
                      : 'bg-earth-50 dark:bg-ink-800/20 border-earth-200 dark:border-ink-700/30 text-ink-600 dark:text-ink-400 hover:border-plum-200 dark:hover:border-plum-700'
                  }`}
                  aria-pressed={selected === opt.value}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <Button
                variant="primary"
                disabled={selected === null}
                onClick={handleNext}
              >
                {isLast ? 'See Results' : 'Next'}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  }

  if (step === 'result' && result) {
    const resultStyles = {
      herb: { card: 'border-herb-200/50 dark:border-herb-700/30 bg-herb-50/50 dark:bg-herb-900/10', text: 'text-herb-600 dark:text-herb-400', bar: 'bg-herb-200 dark:bg-herb-800', fill: 'bg-herb-400' },
      plum: { card: 'border-plum-200/50 dark:border-plum-700/30 bg-plum-50/50 dark:bg-plum-900/10', text: 'text-plum-600 dark:text-plum-400', bar: 'bg-plum-200 dark:bg-plum-800', fill: 'bg-plum-400' },
      brass: { card: 'border-brass-300/40 dark:border-brass-500/30 bg-amber-50/50 dark:bg-amber-900/10', text: 'text-brass-500 dark:text-brass-400', bar: 'bg-brass-300/40 dark:bg-brass-500/30', fill: 'bg-brass-400' },
      clay: { card: 'border-clay-200/50 dark:border-clay-700/30 bg-clay-50/50 dark:bg-clay-900/10', text: 'text-clay-600 dark:text-clay-400', bar: 'bg-clay-200 dark:bg-clay-800', fill: 'bg-clay-400' },
    };
    const s = resultStyles[result.color] || resultStyles.plum;

    return (
      <motion.div variants={fadeUp} initial="initial" animate="animate" className="max-w-lg mx-auto py-4">
        <button onClick={onBack} className="text-xs text-ink-400 dark:text-ink-500 hover:text-ink-600 dark:hover:text-ink-300 transition-colors mb-4">
          ← All modules
        </button>

        <div className={`rounded-2xl p-6 border ${s.card} text-center`}>
          <span className="text-5xl mb-3 block">{result.icon}</span>
          <HandwrittenText as="h2" size="xl" className={`text-ink-900 dark:text-ink-100 mb-1 ${s.text}`}>
            {result.level}
          </HandwrittenText>
          <div className="inline-flex items-center gap-1.5 mb-3">
            <div className={`w-16 h-1.5 rounded-full ${s.bar}`}>
              <div
                className={`h-full rounded-full ${s.fill}`}
                style={{ width: `${score}%` }}
              />
            </div>
            <span className="text-xs text-ink-400 dark:text-ink-500">{score}%</span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl p-4 bg-earth-50 dark:bg-ink-800/20 border border-earth-200 dark:border-ink-700/30">
            <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed">{result.summary}</p>
          </div>

          <div className="rounded-2xl p-4 bg-plum-50/50 dark:bg-plum-900/10 border border-plum-200/30 dark:border-plum-700/20">
            <p className="text-[11px] uppercase tracking-widest text-plum-400 dark:text-plum-500 typewriter mb-1">Recommendation</p>
            <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">{result.recommendation}</p>
          </div>

          <InkDivider />

          <div className="flex gap-3">
            <Button variant="secondary" onClick={handleStart} className="flex-1">
              Retake
            </Button>
            <Button variant="primary" onClick={onBack} className="flex-1">
              Back to Studio
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}
