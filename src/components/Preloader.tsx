'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for fonts and critical resources, with a max timeout
    const maxTimeout = setTimeout(() => setIsLoading(false), 3000);

    if (document.readyState === 'complete') {
      setTimeout(() => setIsLoading(false), 800);
      clearTimeout(maxTimeout);
    } else {
      const handleLoad = () => {
        setTimeout(() => setIsLoading(false), 500);
        clearTimeout(maxTimeout);
      };
      window.addEventListener('load', handleLoad);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(maxTimeout);
      };
    }

    return () => clearTimeout(maxTimeout);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Logo reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}
          >
            <motion.span
              style={{
                fontSize: 32,
                fontWeight: 800,
                letterSpacing: '0.15em',
                background: 'linear-gradient(135deg, #ff705a, #ff9472)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              ASKLYZE
            </motion.span>

            {/* Progress bar */}
            <div
              style={{
                width: 120,
                height: 2,
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #ff705a, #ff9472)',
                  borderRadius: 1,
                }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
