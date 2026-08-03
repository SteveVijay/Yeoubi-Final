import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { getJournalEntrySeo } from "@/config/seo-content";
import { JournalBody } from "@/components/site/journal-body";
import { PageShell } from "@/components/site/page-shell";
import { getJournalEntryBySlug, journalEntries } from "@/data/journal";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const entry = getJournalEntryBySlug(params.slug);
    if (!entry) throw notFound();
    return entry;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const seo = getJournalEntrySeo(loaderData);
    return {
      meta: [
        { title: seo.title },
        { name: "description", content: seo.description },
        { name: "keywords", content: seo.keywords?.join(", ") },
        { property: "og:title", content: seo.title },
        { property: "og:description", content: seo.description },
        { property: "og:type", content: "article" },
        { name: "twitter:title", content: seo.title },
        { name: "twitter:description", content: seo.description },
      ],
    };
  },
  component: JournalEntryPage,
});

function JournalEntryPage() {
  const entry = Route.useLoaderData();
  const index = journalEntries.findIndex((e) => e.slug === entry.slug);
  const next = journalEntries[index + 1];
  const seo = getJournalEntrySeo(entry);

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seo.jsonLd),
        }}
      />
      <article className="px-6 pb-16 pt-32 md:pb-20 md:pt-40">
        <Link to="/journal" className="label hover:text-accent">
          ← All entries
        </Link>

        <p className="label mt-8 !text-muted-foreground">Entry {entry.number}</p>
        <h1 className="text-display mt-3 text-4xl italic md:text-6xl">{entry.title}</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {entry.tagline}
        </p>

        <div className="mt-12 max-w-2xl border-t border-border pt-10">
          {entry.comingSoon ? (
            <p className="text-muted-foreground">
              This entry hasn't been written yet — check back soon.
            </p>
          ) : (
            <JournalBody text={entry.body} />
          )}
        </div>

        {entry.closing && !entry.comingSoon && (
          <p className="text-display mt-10 max-w-2xl text-2xl italic text-accent md:text-3xl">
            {entry.closing}
          </p>
        )}
      </article>

      {next && (
        <section className="border-t border-border px-6 py-16">
          <p className="label mb-3">Next entry</p>
          <Link to="/journal/$slug" params={{ slug: next.slug }} className="group block">
            <p className="text-display text-3xl italic transition group-hover:text-accent md:text-4xl">
              {next.number} — {next.title}
            </p>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">{next.tagline}</p>
          </Link>
        </section>
      )}
    </PageShell>
  );
}
