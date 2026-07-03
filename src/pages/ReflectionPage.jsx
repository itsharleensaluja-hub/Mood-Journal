import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ReflectionEntry } from '../components/ui/reflection/ReflectionEntry';
import { AiResponse } from '../components/ui/reflection/AiResponse';
import { useJournal } from '../context/JournalContext';
import { generateAiResponse } from '../utils/aiEngine';
import { staggerContainer, fadeUp } from '../utils/animations';

export function ReflectionPage() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { stats } = useJournal();
  const currentMoodId = stats?.currentMood;

  const handleGenerate = useCallback(async ({ text, moodId }) => {
    setIsLoading(true);
    setResponse(null);

    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    const aiResponse = generateAiResponse({
      text,
      moodId: moodId || 'neutral',
      userName: 'there',
    });

    setResponse(aiResponse);
    setIsLoading(false);
  }, []);

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="pb-8"
    >
      <motion.div variants={fadeUp} className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-ink-900 dark:text-ink-100 mb-1">
          AI Reflection
        </h1>
        <p className="text-sm text-ink-400 dark:text-ink-500">
          Get personalized insights based on your journal entries.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <motion.div variants={fadeUp} className="mb-6">
          <ReflectionEntry onGenerate={handleGenerate} />
        </motion.div>

        <motion.div variants={fadeUp}>
          <AiResponse response={response} isLoading={isLoading} />
        </motion.div>
      </div>
    </motion.div>
  );
}
