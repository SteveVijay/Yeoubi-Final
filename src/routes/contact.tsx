import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/page-shell";
import { PAGES_SEO } from "@/config/seo-content";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/config/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: PAGES_SEO.contact.title },
      { name: "description", content: PAGES_SEO.contact.description },
      { name: "keywords", content: PAGES_SEO.contact.keywords?.join(", ") },
      { property: "og:title", content: PAGES_SEO.contact.title },
      { property: "og:description", content: PAGES_SEO.contact.description },
      { name: "twitter:title", content: PAGES_SEO.contact.title },
      { name: "twitter:description", content: PAGES_SEO.contact.description },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <section className="px-6 pb-16 pt-32 md:pb-20 md:pt-40">
        <p className="label">(11) — Contact</p>
        <h1 className="text-display mt-4 text-5xl md:text-7xl">Get in touch.</h1>
        <p className="mt-6 max-w-lg text-muted-foreground">
          Orders, sizing questions, collaborations, press — all of it goes through the same two
          places.
        </p>
      </section>

      <section className="px-6 pb-24 md:pb-32">
        <div className="grid gap-8 sm:grid-cols-2 max-w-2xl">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="block border border-border p-6 transition hover:border-foreground"
          >
            <p className="label mb-3">Instagram</p>
            <p className="text-display text-2xl italic text-accent">@{INSTAGRAM_HANDLE}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Fastest way to reach us — this is also where orders and tracking updates happen.
            </p>
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="block border border-border p-6 transition hover:border-foreground"
          >
            <p className="label mb-3">Email</p>
            <p className="text-display text-2xl italic text-accent break-all">{CONTACT_EMAIL}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              For press, collaborations, or anything that doesn't fit in a DM.
            </p>
          </a>
        </div>

        <div className="mt-10 max-w-2xl border-t border-border pt-6">
          <p className="label mb-2">Response time</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            We typically reply within 24–48 hours on Instagram, and within 2–3 days over email.
            We're a small studio — thank you for your patience.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
