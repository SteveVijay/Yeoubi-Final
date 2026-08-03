import { motion, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

const THUMB_HEIGHT = 40; // px

export function CustomScrollbar() {
  const [mounted, setMounted] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const springY = useSpring(0, {
    stiffness: 260,
    damping: 30,
    restDelta: 0.1,
  });

  useEffect(() => {
    setMounted(true);

    const computeTop = () => {
      const scrollY = window.scrollY;
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return 0;

      const trackHeight = trackRef.current?.clientHeight ?? window.innerHeight;
      const maxTop = trackHeight - THUMB_HEIGHT;
      const progress = Math.max(0, Math.min(1, scrollY / totalScrollable));
      return progress * maxTop;
    };

    const onScroll = () => {
      springY.set(computeTop());
    };

    springY.set(computeTop());

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [springY]);

  if (!mounted) return null;

  return (
    <div className="fixed right-2 top-6 bottom-6 z-50 w-3 select-none pointer-events-none">
      <div ref={trackRef} className="relative h-full w-full">
        <motion.div
          style={{ top: springY, height: THUMB_HEIGHT }}
          className="absolute right-0 w-1 rounded-full bg-accent opacity-20"
        />
      </div>
    </div>
  );
}

