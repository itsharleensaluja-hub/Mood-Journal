import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Notebook } from '../components/archive/Notebook';
import { HandwrittenText } from '../components/archive/HandwrittenText';
import { InkDivider } from '../components/archive/InkDivider';
import { Marginalia } from '../components/archive/Marginalia';
import { DeskLamp } from '../components/archive/DeskLamp';
import { ReflectionEntry } from '../components/ui/reflection/ReflectionEntry';
import { AiResponse } from '../components/ui/reflection/AiResponse';
import { SoundscapePhonograph } from '../components/ui/SoundscapePhonograph';
import api from '../hooks/useApi';
import { staggerContainer, fadeUp } from '../utils/animations';

export function ReflectionPage() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = useCallback(async ({ text, moodId }) => {
    setIsLoading(true);
    setResponse(null);

    try {
      const { data } = await api.post('/ai/reflect', {
        text,
        moodId: moodId || 'neutral',
      });
      setResponse(data);
    } catch {
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="pb-8 relative lamp-glow"
    >
      <DeskLamp />

      <motion.div variants={fadeUp}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-earth-200/50 dark:bg-ink-800/40 border border-earth-300/50 dark:border-ink-700/50 mb-4">
          <span className="text-brass-400 text-sm">✦</span>
          <HandwrittenText size="sm" color="ink-500">Desk</HandwrittenText>
        </div>
        <HandwrittenText as="h1" size="xl" className="text-ink-900 dark:text-ink-100 mb-1">
          At the desk
        </HandwrittenText>
        <HandwrittenText size="sm" color="ink-500" className="mb-6 block">
          Write a letter, receive marginalia in return
        </HandwrittenText>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <motion.div variants={fadeUp}>
          <Notebook>
            <div className="space-y-6">
              <ReflectionEntry onGenerate={handleGenerate} />
              <InkDivider />
              <AiResponse response={response} isLoading={isLoading} />
            </div>
          </Notebook>
        </motion.div>
      </div>

      <motion.div variants={fadeUp} className="mt-6 max-w-xs mx-auto">
        <SoundscapePhonograph />
      </motion.div>

      {response && (
        <motion.div variants={fadeUp} className="mt-6 max-w-2xl mx-auto">
          <Marginalia color="plum">
            Quiet observations, written in the margins of your day.
          </Marginalia>
        </motion.div>
      )}
    </motion.div>
  );
}
