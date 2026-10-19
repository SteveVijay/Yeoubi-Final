import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PAGES_SEO } from "@/config/seo-content";
import { DROP_LIST_KEY, INSTAGRAM_URL } from "@/config/site";
import { subscribeToDropList } from "@/lib/firebase";
import { safeStorage } from "@/lib/safe-storage";

export const Route = createFileRoute("/stockists")({
  head: () => ({
    meta: [
      { title: PAGES_SEO.stockists.title },
      { name: "description", content: PAGES_SEO.stockists.description },
      { name: "keywords", content: PAGES_SEO.stockists.keywords?.join(", ") },
      { property: "og:title", content: PAGES_SEO.stockists.title },
      { property: "og:description", content: PAGES_SEO.stockists.description },
      { name: "twitter:title", content: PAGES_SEO.stockists.title },
      { name: "twitter:description", content: PAGES_SEO.stockists.description },
    ],
  }),
  component: StockistsPage,
});

/** Fixed target launch date for Drop 02 so the countdown is consistent across page reloads */
const DROP_02_TARGET_TIME = new Date("2026-09-15T12:00:00.000Z").getTime();

function calculateTimeLeft(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(DROP_02_TARGET_TIME));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(DROP_02_TARGET_TIME));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}

function StockistsPage() {
  const { days, hours, minutes, seconds } = useCountdown();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      await subscribeToDropList(email);
      toast.success("You're on the Drop 02 list!", {
        description: "We will write to you the moment Drop 02 goes live.",
      });
      setEmail("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not save email. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageShell>
      {/* Hero Section */}
      <section className="px-6 pb-8 pt-28 md:pb-12 md:pt-36">
        <div className="mx-auto max-w-4xl">
          <p className="label">(05) — Store &amp; Releases</p>
          <h1 className="text-display mt-3 text-4xl sm:text-5xl md:text-7xl">
            Online only. <br />
            <span className="italic text-accent">Drop 02 is now live.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Yeoubi is an independent online store. We do not operate physical retail stockists — all
            our garments drop exclusively on our web store and Instagram.
          </p>
        </div>
      </section>

      {/* Live Drop 02 Timer & Drop List Section */}
      <section className="border-y border-border bg-surface/40 px-6 py-10 backdrop-blur-md md:px-12 md:py-14">
        <div className="mx-auto max-w-4xl">
          <div className="text-center md:text-left">
            <span className="label font-mono text-accent flex items-center justify-center md:justify-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Drop 02 · Heated Drop Live
            </span>
            <h2 className="text-display mt-2 text-3xl md:text-5xl">
              All pieces are now available to buy.
            </h2>
          </div>

          {/* Countdown Clock Grid */}
          <div className="mt-8 grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
            <div className="flex flex-col items-center rounded-lg border border-border/80 bg-background/90 p-3 text-center backdrop-blur-sm sm:p-5 md:p-6 shadow-sm">
              <span className="font-mono text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                00
              </span>
              <span className="label mt-1 text-[9px] sm:text-xs text-muted-foreground">Days</span>
            </div>
            <div className="flex flex-col items-center rounded-lg border border-border/80 bg-background/90 p-3 text-center backdrop-blur-sm sm:p-5 md:p-6 shadow-sm">
              <span className="font-mono text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                00
              </span>
              <span className="label mt-1 text-[9px] sm:text-xs text-muted-foreground">Hours</span>
            </div>
            <div className="flex flex-col items-center rounded-lg border border-border/80 bg-background/90 p-3 text-center backdrop-blur-sm sm:p-5 md:p-6 shadow-sm">
              <span className="font-mono text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                00
              </span>
              <span className="label mt-1 text-[9px] sm:text-xs text-muted-foreground">Minutes</span>
            </div>
            <div className="flex flex-col items-center rounded-lg border border-accent/60 bg-background/90 p-3 text-center backdrop-blur-sm sm:p-5 md:p-6 shadow-sm glow-accent">
              <span className="font-mono text-2xl font-bold tracking-tight text-accent sm:text-4xl md:text-5xl">
                LIVE
              </span>
              <span className="label mt-1 text-[9px] sm:text-xs text-accent">Status</span>
            </div>
          </div>

          {/* Email Drop List Signup Card */}
          <div className="mt-8 rounded-xl border border-border/60 bg-background/80 p-5 sm:p-7 md:p-8 backdrop-blur-md shadow-md">
            <h3 className="text-display text-2xl md:text-3xl">Get notified for restocks &amp; Drop 03</h3>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed md:text-sm max-w-xl">
              Enter your email to receive early access when pieces restock or when our next collection lands.
            </p>

            <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                type="email"
                required
                placeholder="you@somewhere.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full max-w-md h-11 bg-surface/50 border-border"
              />
              <Button type="submit" disabled={submitting} className="w-full sm:w-auto h-11 px-6 font-mono text-xs uppercase tracking-wider">
                {submitting ? "Adding…" : "Notify me →"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Direct DM info & Links */}
      <section className="px-6 py-10 md:px-12 md:py-16">
        <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
          <div className="border border-border p-5 md:p-6">
            <p className="label mb-2">Instagram Access</p>
            <h4 className="text-display text-xl md:text-2xl">DM Early Access</h4>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed md:text-sm">
              We update drop announcements and tracking links via our official Instagram Stories.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="label mt-4 inline-block border-b border-foreground pb-1 hover:text-accent"
            >
              → Follow @yeoubi.inc on Instagram
            </a>
          </div>

          <div className="border border-border p-5 md:p-6">
            <p className="label mb-2">How Purchasing Works</p>
            <h4 className="text-display text-xl md:text-2xl">DM-Based Ordering</h4>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed md:text-sm">
              Find a piece you love, pick your size using our fit guide, and DM us directly to confirm stock and reserve your garment.
            </p>
            <Link
              to="/order-process"
              className="label mt-4 inline-block border-b border-foreground pb-1 hover:text-accent"
            >
              → Read how ordering works
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
