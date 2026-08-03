import { createFileRoute, Link } from "@tanstack/react-router";

import { PAGES_SEO } from "@/config/seo-content";
import journalBg from "@/assets/journal-bg.jpg";
import { Reveal } from "@/components/site/motion-bits";
import { PageShell } from "@/components/site/page-shell";
import { journalEntries } from "@/data/journal";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: PAGES_SEO.journalIndex.title },
      { name: "description", content: PAGES_SEO.journalIndex.description },
      { name: "keywords", content: PAGES_SEO.journalIndex.keywords?.join(", ") },
      { property: "og:title", content: PAGES_SEO.journalIndex.title },
      { property: "og:description", content: PAGES_SEO.journalIndex.description },
      { name: "twitter:title", content: PAGES_SEO.journalIndex.title },
      { name: "twitter:description", content: PAGES_SEO.journalIndex.description },
    ],
  }),
  component: JournalIndexPage,
});

function JournalIndexPage() {
  return (
    <PageShell>
      {/* "Notes from the studio" Header Section with dedicated Journal Background */}
      <section className="relative overflow-hidden bg-background px-6 pb-12 pt-24 md:pb-16 md:pt-32">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={journalBg}
            alt="Notes from the studio background"
            className="h-full w-full object-cover object-center opacity-40 filter contrast-105 brightness-95"
          />
          {/* Subtle gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
        </div>

        {/* Header Text Overlay */}
        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="label font-mono uppercase tracking-widest text-accent">The Journal</p>
          <h1 className="text-display mt-3 text-4xl tracking-tight text-foreground md:text-7xl">
            Notes from the studio.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            The real, unfiltered story of building Yeoubi — one entry at a time.
          </p>
        </div>
      </section>

      {/* Journal Entries List */}
      <section className="px-6 pb-16 pt-8 md:pb-24">
        <div className="divide-y divide-border border-y border-border">
          {journalEntries.map((entry, i) => {
            const inner = (
              <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-3 py-6 md:grid-cols-[6rem_1fr] md:gap-6 md:py-9">
                <p className="text-display text-xl italic text-muted-foreground md:text-3xl">
                  {entry.number}
                </p>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="text-display text-2xl md:text-3xl">{entry.title}</h2>
                    {entry.comingSoon && (
                      <span className="label !text-muted-foreground">Coming soon</span>
                    )}
                  </div>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{entry.tagline}</p>
                </div>
              </div>
            );
            return (
              <Reveal key={entry.slug} delay={Math.min(i * 0.04, 0.3)}>
                {entry.comingSoon ? (
                  <div className="cursor-default opacity-60">{inner}</div>
                ) : (
                  <Link
                    to="/journal/$slug"
                    params={{ slug: entry.slug }}
                    className="group block transition hover:bg-surface"
                  >
                    {inner}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
