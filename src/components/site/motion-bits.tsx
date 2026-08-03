import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

import { EASE } from "@/lib/motion";

/** Splits text into words and reveals them with a staggered upward slide. */
export function SplitWords({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pr-[0.25em] px-[0.1em] -mx-[0.05em] py-[0.4em] -my-[0.4em]"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.15 + i * 0.06 }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Fades + slides content in the moment it scrolls into view. Fires once. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
