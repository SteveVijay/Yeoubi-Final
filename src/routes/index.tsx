import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Reveal, SplitWords } from "@/components/site/motion-bits";
import { PageShell } from "@/components/site/page-shell";
import { Preloader } from "@/components/site/preloader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import heroAsset from "../assets/file_00000000797c71fb9635a0cb22a3665b (1).webp";
import look5 from "@/assets/look-05.webp";
import { PAGES_SEO } from "@/config/seo-content";
import { pieces, type Piece } from "@/data/pieces";
import { subscribeToDropList } from "@/lib/firebase";
import { scrollToId } from "@/lib/scroll";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGES_SEO.home.title },
      { name: "description", content: PAGES_SEO.home.description },
      { name: "keywords", content: PAGES_SEO.home.keywords?.join(", ") },
      { property: "og:title", content: PAGES_SEO.home.title },
      { property: "og:description", content: PAGES_SEO.home.description },
      { name: "twitter:title", content: PAGES_SEO.home.title },
      { name: "twitter:description", content: PAGES_SEO.home.description },
    ],
  }),
  component: Index,
});

/* ---------- newsletter dialog ---------- */

function NewsletterDialog({
  open,
  onOpenChange,
  title = "Get on the drop list",
  description = "Be first to hear when the next Yeoubi piece lands.",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title?: string;
  description?: string;
}) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    setSubmitting(true);
    try {
      await subscribeToDropList(email);
      toast.success("You're on the list.", {
        description: "We'll write when the next piece drops.",
      });
      setEmail("");
      onOpenChange(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not save email. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-display text-2xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="mt-2 flex flex-col gap-3">
          <Input
            type="email"
            required
            placeholder="you@somewhere.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <DialogFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Adding…" : "Notify me"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- hero ---------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.0001,
  });

  const y = useTransform(smoothProgress, [0, 1], ["0%", "4%"]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.04]);

  return (
    <section ref={ref} className="grain relative min-h-[100svh] flex flex-col w-full overflow-hidden bg-background">
      <motion.div
        style={{ y, scale, transformOrigin: "center center" }}
        className="absolute inset-0 will-change-transform transform-gpu"
      >
        <img
          src={heroAsset}
          alt="Yeoubi campaign"
          className="h-full w-full object-cover object-[20%_center] md:object-center"
          width={1920}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/80" />
      </motion.div>

      <div className="relative z-10 flex flex-1 flex-col justify-between px-6 pb-12 pt-20 sm:pt-24 md:pt-24 md:pb-16">
        <div className="flex items-start justify-between">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="flex items-center gap-2 rounded-full border border-white/15 bg-background/40 px-3.5 py-1.5 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="label text-[10px] tracking-widest text-white/90">
              DRP'01–02 · Heated Drop · 2026
            </span>
          </motion.div>
          <motion.p
            className="label hidden md:block max-w-[24ch] text-right text-white/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.4 }}
          >
            Heated tees &amp; satin scarves. <br />
            Cut for everyone.
          </motion.p>
        </div>

        <div>
          <h1 className="text-display font-medium md:font-semibold text-[12vw] sm:text-[13vw] md:text-[11vw] lg:text-[10.5vw] leading-[0.92] tracking-tight pt-1 pb-4 md:pb-6 overflow-visible">
            <SplitWords text="Quiet" />
            <br />
            <span className="inline-block italic text-accent drop-shadow-sm">
              <SplitWords text="garments," />
            </span>{" "}
            <SplitWords text="restless" />
            <br />
            <SplitWords text="people." />
          </h1>
          <motion.div
            className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.6 }}
          >
            <button
              type="button"
              onClick={() => scrollToId("collection")}
              className="group flex flex-wrap items-center gap-6 text-left transition-colors"
            >
              <span className="label flex items-center gap-1.5 rounded-full border border-white/20 bg-background/50 px-3.5 py-1.5 backdrop-blur-md text-white group-hover:border-accent group-hover:text-accent transition-all">
                <span>Explore Drops</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </span>
              <span className="label font-mono text-[11px] leading-snug text-white/80 group-hover:text-white transition-colors">
                Streetwear built <br className="hidden sm:inline" /> for the long walk home.
              </span>
            </button>
            <div className="flex items-center gap-2">
              <span className="label font-mono text-[10px] text-muted-foreground">
                (Drop 01 &amp; 02 · {pieces.length} pieces)
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- marquee ---------- */
function Marquee() {
  const line = [
    "Drop 02 Live",
    "·",
    "Satin Scarves",
    "·",
    "240 GSM Cotton",
    "·",
    "Yeoubi Originals",
    "·",
    "Unisex",
    "·",
    "여우비",
    "·",
  ];
  const items = Array.from({ length: 4 }).flatMap(() => line);

  return (
    <section className="border-y border-border/80 bg-surface/30 py-4 overflow-hidden backdrop-blur-sm select-none">
      <div className="flex w-max hover:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center whitespace-nowrap animate-marquee will-change-transform">
          {items.map((w, i) => (
            <span
              key={`t1-${i}`}
              className={`text-display text-[2.7rem] md:text-6xl px-6 ${
                w === "여우비" || w === "Drop 02 Live" ? "italic text-accent drop-shadow-sm" : "text-foreground/90"
              }`}
            >
              {w}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center whitespace-nowrap animate-marquee will-change-transform">
          {items.map((w, i) => (
            <span
              key={`t2-${i}`}
              className={`text-display text-[2.7rem] md:text-6xl px-6 ${
                w === "여우비" || w === "Drop 02 Live" ? "italic text-accent drop-shadow-sm" : "text-foreground/90"
              }`}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- manifesto ---------- */

function ManifestoWord({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = Math.min(1, start + 2 / total);
  const opacity = useTransform(scrollYProgress, [start, end], [0.18, 1]);
  const y = useTransform(scrollYProgress, [start, end], [4, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block pr-[0.24em] will-change-[opacity,transform]"
    >
      {word}
    </motion.span>
  );
}

function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    restDelta: 0.0005,
  });

  const line1 = "We make one thing at a time. We make art speak — cut".split(" ");
  const line2 = "once, refined ten times, then left alone. Yeoubi is a Korean".split(" ");
  const line3 = "word for the light rain that falls while the sun is still out.".split(" ");
  const line4 = "A quiet weather. A quiet wardrobe.".split(" ");

  const allWords = [...line1, ...line2, ...line3, ...line4];
  const total = allWords.length;

  let currentIndex = 0;

  return (
    <section id="manifesto" ref={ref} className="px-6 py-12 md:py-20">
      <div>
        <p className="label mb-6 md:mb-10 text-accent">(02) — Manifesto</p>
        <p className="text-display text-[2.2rem] leading-[1.18] sm:text-[3.2rem] md:text-[4.5rem] md:leading-[1.08] max-w-none">
          {line1.map((w) => {
            const idx = currentIndex++;
            return (
              <ManifestoWord
                key={`l1-${idx}`}
                word={w}
                index={idx}
                total={total}
                scrollYProgress={smoothProgress}
              />
            );
          })}
          <br className="hidden sm:inline" />
          {line2.map((w) => {
            const idx = currentIndex++;
            return (
              <ManifestoWord
                key={`l2-${idx}`}
                word={w}
                index={idx}
                total={total}
                scrollYProgress={smoothProgress}
              />
            );
          })}
          <br className="hidden sm:inline" />
          {line3.map((w) => {
            const idx = currentIndex++;
            return (
              <ManifestoWord
                key={`l3-${idx}`}
                word={w}
                index={idx}
                total={total}
                scrollYProgress={smoothProgress}
              />
            );
          })}
          <br className="hidden sm:inline" />
          {line4.map((w) => {
            const idx = currentIndex++;
            return (
              <ManifestoWord
                key={`l4-${idx}`}
                word={w}
                index={idx}
                total={total}
                scrollYProgress={smoothProgress}
              />
            );
          })}
        </p>
      </div>
    </section>
  );
}

/* ---------- collection grid ---------- */

type FilterTab = "all" | "drop-02" | "drop-01" | "scarves" | "tees";

function Collection({ onOpenDrop }: { onOpenDrop: () => void }) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filteredPieces = pieces.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "drop-02") return p.drop === "drop-02";
    if (activeTab === "drop-01") return p.drop === "drop-01";
    if (activeTab === "scarves") return p.category === "scarves";
    if (activeTab === "tees") return p.category === "tees";
    return true;
  });

  const drop2Count = pieces.filter((p) => p.drop === "drop-02").length;
  const drop1Count = pieces.filter((p) => p.drop === "drop-01").length;
  const scarfCount = pieces.filter((p) => p.category === "scarves").length;
  const teeCount = pieces.filter((p) => p.category === "tees").length;

  return (
    <section id="collection" className="px-6 py-12 md:py-20">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-10">
        <div>
          <p className="label text-accent">(01) — The Drops</p>
          <h2 className="text-display mt-3 text-4xl sm:text-5xl md:text-7xl">
            {activeTab === "drop-02"
              ? "Drop 02."
              : activeTab === "drop-01"
                ? "Yeoubi Originals."
                : activeTab === "scarves"
                  ? "Satin Scarves."
                  : activeTab === "tees"
                    ? "Streetwear Tees."
                    : "The Pieces."}
          </h2>
        </div>
        <button
          type="button"
          onClick={onOpenDrop}
          className="label border-b border-foreground pb-1 hover:text-accent self-start sm:self-auto transition-colors"
        >
          → Drop notification list
        </button>
      </div>

      {/* Filter Tabs Bar */}
      <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-border/60 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`label font-mono text-xs px-3.5 py-1.5 rounded-full transition-all ${
            activeTab === "all"
              ? "bg-foreground text-background font-bold shadow"
              : "bg-surface text-muted-foreground hover:text-foreground border border-border/50"
          }`}
        >
          All Pieces ({pieces.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("drop-02")}
          className={`label font-mono text-xs px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
            activeTab === "drop-02"
              ? "bg-accent text-background font-bold shadow"
              : "bg-surface text-accent hover:text-accent/80 border border-accent/40"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
          Drop 02 · Heated Drop ({drop2Count})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("drop-01")}
          className={`label font-mono text-xs px-3.5 py-1.5 rounded-full transition-all ${
            activeTab === "drop-01"
              ? "bg-foreground text-background font-bold shadow"
              : "bg-surface text-muted-foreground hover:text-foreground border border-border/50"
          }`}
        >
          Yeoubi Originals · Drop 01 ({drop1Count})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("scarves")}
          className={`label font-mono text-xs px-3.5 py-1.5 rounded-full transition-all ${
            activeTab === "scarves"
              ? "bg-foreground text-background font-bold shadow"
              : "bg-surface text-muted-foreground hover:text-foreground border border-border/50"
          }`}
        >
          Satin Scarves ({scarfCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("tees")}
          className={`label font-mono text-xs px-3.5 py-1.5 rounded-full transition-all ${
            activeTab === "tees"
              ? "bg-foreground text-background font-bold shadow"
              : "bg-surface text-muted-foreground hover:text-foreground border border-border/50"
          }`}
        >
          Tees ({teeCount})
        </button>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-6 md:gap-y-14">
        {filteredPieces.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <Link
              to="/product/$slug"
              params={{ slug: p.slug }}
              className="group block w-full text-left"
            >
              {/* Product Tile Container */}
              <div className="relative overflow-hidden rounded-md bg-black aspect-[3/4] transition-all duration-500 group-hover:shadow-xl">
                {/* Badge overlay top left */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                  <span className="label font-mono text-[9px] px-2 py-0.5 rounded bg-background/85 text-foreground backdrop-blur-md border border-border/50">
                    {p.category === "scarves" ? "100% Satin Silk · 2 Sizes" : `${p.gsm || 240} GSM · ${p.drop === "drop-02" ? "Oversize Fit · Drop Shoulder" : "Boxy Fit"}`}
                  </span>
                </div>

                {/* Drop indicator top right */}
                <div className="absolute top-3 right-3 z-10">
                  <span
                    className={`label font-mono text-[9px] px-2 py-0.5 rounded backdrop-blur-md ${
                      p.drop === "drop-02"
                        ? "bg-accent text-background font-bold"
                        : "bg-background/80 text-muted-foreground border border-border/40"
                    }`}
                  >
                    {p.drop === "drop-02" ? "Drop 02" : "Originals"}
                  </span>
                </div>

                {/* Image Wrapper for consistent sizing */}
                <div className="absolute inset-0 p-6">
                  <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                    {/* front image */}
                    <img
                      src={p.img}
                      alt={p.name}
                      className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ease-out ${p.imageClass || ""} ${
                        p.imgBack ? "group-hover:opacity-0" : ""
                      }`}
                      width={900}
                      height={1200}
                      loading="lazy"
                    />
                    {/* back image (cross-fade on hover) */}
                    {p.imgBack && (
                      <img
                        src={p.imgBack}
                        alt={`${p.name} — back`}
                        className={`absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 ${p.imageClassBack || p.imageClass || ""}`}
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>

                {/* Hover CTA overlay button */}
                <div className="absolute bottom-3 inset-x-3 z-10 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="w-full text-center py-2 bg-white text-black rounded text-[11px] font-mono uppercase tracking-wider font-bold shadow-md">
                    View Piece →
                  </div>
                </div>
              </div>

              {/* Product Meta */}
              <div className="mt-4 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="label font-mono !text-[10px] text-muted-foreground">
                    {p.code}
                  </p>
                  <span className="label font-mono !text-[9px] text-accent">
                    {p.drop === "drop-02" ? "Heated Drop" : "Chapter 01"}
                  </span>
                </div>
                <h3 className="text-display text-lg md:text-xl italic text-foreground leading-snug group-hover:text-accent transition-colors truncate">
                  {p.name}
                </h3>
                <div className="flex items-baseline gap-2 pt-0.5">
                  <span className="font-mono text-sm font-medium text-foreground">{p.price}</span>
                  {p.originalPrice && (
                    <span className="font-mono text-xs text-muted-foreground line-through">
                      {p.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- editorial split ---------- */

function Editorial({ onOpenDrop }: { onOpenDrop: () => void }) {
  return (
    <section
      id="editorial"
      className="grid grid-cols-1 gap-8 px-6 py-12 md:grid-cols-12 md:py-20 border-t border-border/60"
    >
      <Reveal className="md:col-span-7">
        <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border/50 bg-surface">
          <img
            src={look5}
            alt="Knitwear still life"
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
            width={1600}
            height={1200}
            loading="lazy"
          />
        </div>
      </Reveal>
      <Reveal delay={0.15} className="md:col-span-5 md:pt-16 flex flex-col justify-center">
        <p className="label text-accent">(03) — On the build</p>
        <h3 className="text-display mt-4 text-4xl md:text-5xl">
          Heavy cotton. <span className="italic text-accent">No filler.</span>
        </h3>
        <p className="mt-6 text-muted-foreground leading-relaxed text-sm md:text-base">
          Three tees — Signature Tee — Art Galleries, Yeoubi Ringer Tee, Archive Project Tee — cut from 240gsm ring-spun cotton,
          garment-washed, built to be worn. Chapter 01. More dropping through 2026.
        </p>

        <button
          type="button"
          onClick={onOpenDrop}
          className="label mt-8 inline-block border-b border-foreground pb-1 hover:text-accent self-start transition-colors"
        >
          → Get on the drop list
        </button>
      </Reveal>
    </section>
  );
}

/* ---------- page ---------- */

function Index() {
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <PageShell navVariant="overlay">
      <Preloader />
      <main className="relative overflow-hidden">
        <Hero />
        <Marquee />
        <Collection onOpenDrop={() => setDropOpen(true)} />
        <Manifesto />
        <Editorial onOpenDrop={() => setDropOpen(true)} />
      </main>

      <NewsletterDialog open={dropOpen} onOpenChange={setDropOpen} />
    </PageShell>
  );
}