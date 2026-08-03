import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

import studioBg from "@/assets/studio-bg.jpg";
import { PageShell } from "@/components/site/page-shell";
import { PAGES_SEO } from "@/config/seo-content";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: PAGES_SEO.studio.title },
      { name: "description", content: PAGES_SEO.studio.description },
      { name: "keywords", content: PAGES_SEO.studio.keywords?.join(", ") },
      { property: "og:title", content: PAGES_SEO.studio.title },
      { property: "og:description", content: PAGES_SEO.studio.description },
      { name: "twitter:title", content: PAGES_SEO.studio.title },
      { name: "twitter:description", content: PAGES_SEO.studio.description },
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  return (
    <PageShell>
      {/* Hero Poster Section */}
      <section className="relative min-h-[92vh] w-full overflow-hidden bg-background pt-24 md:pt-28">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={studioBg}
            alt="Yeoubi Studio Background"
            className="h-full w-full object-cover object-center opacity-45 mix-blend-luminosity filter contrast-110 brightness-90"
          />
          {/* Gradients for text readability & mood */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        </div>

        {/* Poster Content Overlay */}
        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-between px-6 py-12 md:px-12 md:py-16">
          {/* Header Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xs"
          >
            <div className="inline-block border-b border-muted-foreground/40 pb-1">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground">
                S T U D I O
              </span>
            </div>
          </motion.div>

          {/* Main Title & Subtitle */}
          <div className="my-auto max-w-3xl py-12">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="text-display text-5xl leading-[0.92] tracking-tight text-foreground sm:text-7xl md:text-9xl"
            >
              Creating <br />
              <span className="italic text-accent">the future</span> <br />
              of culture.
            </motion.h1>

            {/* Description Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 max-w-xl font-mono text-xs leading-relaxed tracking-wider uppercase text-foreground/80 md:text-sm"
            >
              COLLABORATIONS, CAMPAIGNS, FILMS, POP-UPS, CONTENT AND EXPERIMENTS THAT SHAPE YEOUBI.
            </motion.p>

            {/* Opening Soon Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex items-center gap-3"
            >
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-accent">
                OPENING SOON
              </span>
            </motion.div>
          </div>

          {/* Clean minimal footer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-border/40 pt-6"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Yeoubi ® Studio
            </p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Chapter 01 · Studio Lab
            </p>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
