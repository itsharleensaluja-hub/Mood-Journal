import { motion } from 'framer-motion';
import { HeroGreeting } from '../components/layout/HeroGreeting';
import { Notebook, PageSpread } from '../components/archive/Notebook';
import { DeskLamp } from '../components/archive/DeskLamp';
import { InkDivider } from '../components/archive/InkDivider';
import { Marginalia } from '../components/archive/Marginalia';
import { ArchiveFlowerSelector } from '../components/ui/ArchiveFlowerSelector';
import { JournalPage } from '../components/ui/JournalPage';
import { EntryPages } from '../components/ui/EntryPages';
import { RibbonStreak } from '../components/ui/RibbonStreak';
import { InkVial } from '../components/ui/InkVial';
import { RibbonTimeline } from '../components/ui/RibbonTimeline';
import { DeskTerrarium } from '../components/ui/DeskTerrarium';
import { MarginaliaInsight } from '../components/ui/MarginaliaInsight';
import { staggerContainer, fadeUp } from '../utils/animations';

export function HomePage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="pb-8 relative lamp-glow"
    >
      <DeskLamp />

      <motion.div variants={fadeUp}>
        <HeroGreeting />
      </motion.div>

      <motion.div variants={fadeUp}>
        <InkDivider className="mb-6" />
      </motion.div>

      <motion.div variants={fadeUp}>
        <Notebook>
          <PageSpread
            left={
              <div className="space-y-6">
                <ArchiveFlowerSelector />
                <JournalPage />
              </div>
            }
            right={
              <div className="space-y-6 pt-6 lg:pt-0">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <RibbonStreak />
                  </div>
                  <div className="flex-shrink-0">
                    <InkVial />
                  </div>
                </div>
                <InkDivider />
                <RibbonTimeline />
                <InkDivider />
                <EntryPages />
              </div>
            }
          />
        </Notebook>
      </motion.div>

      <div className="mt-6 space-y-6">
        <motion.div variants={fadeUp}>
          <Marginalia color="herb">
            Journaling is a quiet conversation with yourself. Each page adds a leaf to your terrarium.
          </Marginalia>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <motion.div variants={fadeUp}>
            <DeskTerrarium />
          </motion.div>
          <motion.div variants={fadeUp}>
            <MarginaliaInsight />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
