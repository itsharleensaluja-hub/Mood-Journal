import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { pageSlideUp } from '../../utils/animations';

export function PageShell({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...pageSlideUp}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
