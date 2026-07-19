import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HandwrittenText } from '../components/archive/HandwrittenText';
import { DeskLamp } from '../components/archive/DeskLamp';
import { Notebook } from '../components/archive/Notebook';
import { InkDivider } from '../components/archive/InkDivider';
import { StepIntake } from '../components/counseling/StepIntake';
import { StepConnecting } from '../components/counseling/StepConnecting';
import { CounselingInterface } from '../components/counseling/CounselingInterface';
import { PrivacyBanner } from '../components/counseling/PrivacyBanner';
import { generateAnonymousId, COUNSELORS } from '../data/counselors';
import { staggerContainer, fadeUp } from '../utils/animations';

export function CounselingPage() {
  const [step, setStep] = useState('idle');
  const [intakeData, setIntakeData] = useState(null);
  const [anonymousId, setAnonymousId] = useState('');
  const [counselor, setCounselor] = useState(null);

  const handleStart = useCallback(() => {
    setStep('intake');
  }, []);

  const handleIntakeComplete = useCallback((data) => {
    setIntakeData(data);
    setAnonymousId(generateAnonymousId());
    setStep('connecting');
  }, []);

  const handleConnected = useCallback((matched) => {
    setCounselor(matched);
    setStep('active');
  }, []);

  const handleEndSession = useCallback(() => {
    setStep('idle');
    setIntakeData(null);
    setAnonymousId('');
    setCounselor(null);
  }, []);

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="pb-8 relative"
    >
      <DeskLamp />

      <AnimatePresence mode="wait">
        {step === 'idle' && (
          <motion.div key="idle" variants={fadeUp} exit={{ opacity: 0, y: -10 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-plum-100/50 dark:bg-plum-900/30 border border-plum-200/50 dark:border-plum-700/30 mb-4">
              <span className="text-plum-400 text-sm">◇</span>
              <HandwrittenText size="sm" color="ink-500">Anonymous Counseling</HandwrittenText>
            </div>
            <HandwrittenText as="h1" size="xl" className="text-ink-900 dark:text-ink-100 mb-1">
              Talk to someone
            </HandwrittenText>
            <HandwrittenText size="sm" color="ink-500" className="mb-6 block">
              Completely anonymous — your identity stays hidden
            </HandwrittenText>

            <div className="max-w-2xl mx-auto">
              <Notebook>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: '🛡', label: 'Complete Anonymity', desc: 'No name, email, or profile shown to the counselor' },
                      { icon: '✓', label: 'Certified Counselors', desc: 'Licensed and verified professionals' },
                      { icon: '🔒', label: 'Encrypted Conversations', desc: 'End-to-end encrypted communication' },
                      { icon: '💬', label: 'Text Chat', desc: 'Connect via anonymous real-time messaging' },
                      { icon: '🔐', label: '100% Confidential', desc: 'Your privacy is our priority' },
                      { icon: '🕐', label: 'Available 24/7', desc: 'Support whenever you need it' },
                      { icon: '🌿', label: 'Judgment-Free', desc: 'A safe space to be heard' },
                      { icon: '⚡', label: 'Instant Matching', desc: 'Get connected in seconds' },
                    ].map((feature) => (
                      <div
                        key={feature.label}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-earth-50/60 dark:bg-ink-800/20 border border-earth-200 dark:border-ink-700/30 transition-all duration-150 hover:border-plum-200 dark:hover:border-plum-700"
                      >
                        <span className="text-lg flex-shrink-0 mt-0.5">{feature.icon}</span>
                        <div className="min-w-0">
                          <p className="handwriting text-sm text-ink-700 dark:text-ink-300">{feature.label}</p>
                          <p className="text-[11px] text-ink-400 dark:text-ink-500 mt-0.5 leading-relaxed">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <InkDivider />

                  <div className="text-center py-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleStart}
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-plum-500/10 dark:bg-plum-400/15 border border-plum-300/30 dark:border-plum-600/30 text-plum-600 dark:text-plum-300 hover:bg-plum-500/20 dark:hover:bg-plum-400/25 transition-all duration-150 handwriting text-lg"
                      aria-label="Start anonymous session"
                    >
                      Start Anonymous Session
                      <span className="text-sm">→</span>
                    </motion.button>
                    <p className="text-[11px] text-ink-400 dark:text-ink-500 mt-3">
                      No sign-up required. Your identity remains completely anonymous.
                    </p>
                  </div>
                </div>
              </Notebook>

              <div className="mt-6">
                <PrivacyBanner />
              </div>
            </div>
          </motion.div>
        )}

        {step === 'intake' && (
          <motion.div key="intake" variants={fadeUp} exit={{ opacity: 0, y: -10 }}>
            <StepIntake onComplete={handleIntakeComplete} />
          </motion.div>
        )}

        {step === 'connecting' && (
          <motion.div key="connecting" variants={fadeUp} exit={{ opacity: 0, y: -10 }}>
            <StepConnecting anonymousId={anonymousId} onConnected={handleConnected} />
          </motion.div>
        )}

        {step === 'active' && counselor && (
          <motion.div key="active" variants={fadeUp} exit={{ opacity: 0, y: -10 }}>
            <CounselingInterface
              anonymousId={anonymousId}
              counselor={counselor}
              sessionType={intakeData?.sessionType || 'chat'}
              onEndSession={handleEndSession}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
