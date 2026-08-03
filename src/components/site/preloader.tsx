import { motion } from "motion/react";
import { useState } from "react";

import yeoubiWordmark from "@/assets/yeoubi-wordmark.png";
import { EASE } from "@/lib/motion";

/**
 * Full-screen preloader shown on first paint.
 * Animates a single Yeoubi logo cleanly without duplication.
 */
export function Preloader() {
  const [gone, setGone] = useState(false);
  if (gone) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background px-6"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1.1, ease: EASE, delay: 1.5 }}
      onAnimationComplete={() => setGone(true)}
    >
      {/* Single Yeoubi Logo */}
      <motion.img
        src={yeoubiWordmark}
        alt="Yeoubi"
        className="w-48 max-w-full object-contain md:w-64"
        initial={{ opacity: 0, scale: 0.92, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      />

      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
        <motion.p
          className="label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Chapter 01 — Unisex
        </motion.p>
        <motion.p
          className="label font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span>100</span>%
        </motion.p>
      </div>
    </motion.div>
  );
}
