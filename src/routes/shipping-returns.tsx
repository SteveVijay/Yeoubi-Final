import { createFileRoute, Link } from "@tanstack/react-router";

import { PageShell } from "@/components/site/page-shell";
import { PAGES_SEO } from "@/config/seo-content";
import { INSTAGRAM_URL, CONTACT_EMAIL } from "@/config/site";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title: PAGES_SEO.shippingReturns.title },
      { name: "description", content: PAGES_SEO.shippingReturns.description },
      { name: "keywords", content: PAGES_SEO.shippingReturns.keywords?.join(", ") },
      { property: "og:title", content: PAGES_SEO.shippingReturns.title },
      { property: "og:description", content: PAGES_SEO.shippingReturns.description },
      { name: "twitter:title", content: PAGES_SEO.shippingReturns.title },
      { name: "twitter:description", content: PAGES_SEO.shippingReturns.description },
    ],
  }),
  component: ShippingReturnsPage,
});

function ShippingReturnsPage() {
  return (
    <PageShell>
      <section className="px-6 pb-16 pt-32 md:pb-20 md:pt-40">
        <p className="label">(01) — Shipping &amp; Returns</p>
        <h1 className="text-display mt-4 text-5xl md:text-7xl">Shipping &amp; returns.</h1>
        <p className="mt-6 max-w-lg text-muted-foreground">
          Everything you need to know before you DM us an order.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-12 px-6 pb-24 md:grid-cols-3 md:pb-32">
        <div>
          <p className="label mb-4">Shipping</p>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>— We ship within India and internationally.</li>
            <li>— Tell us your shipping location when you DM your order.</li>
            <li>— Orders are dispatched within one week of payment confirmation.</li>
            <li>— Delivery takes up to one week after dispatch.</li>
            <li>
              — Your tracking link is shared and updated through our{" "}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-foreground"
              >
                Instagram Stories
              </a>
              .
            </li>
          </ul>
        </div>

        <div>
          <p className="label mb-4">Payment</p>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>— Prepaid only — we do not offer Cash on Delivery (COD).</li>
            <li>— We accept UPI, bank transfer, and other prepaid methods.</li>
            <li>— Payment details are shared after you DM us your order.</li>
            <li>— Your order is confirmed only after payment is received.</li>
            <li>
              — Full details on{" "}
              <Link to="/payment" className="underline hover:text-foreground">
                payment &amp; security
              </Link>
              .
            </li>
          </ul>
        </div>

        <div>
          <p className="label mb-4">Returns &amp; replacements</p>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>— Defective or incorrect items are replaced at no additional cost.</li>
            <li>
              — <span className="text-foreground">Video proof required:</span> you must send an
              unboxing video to be eligible for a replacement.
            </li>
            <li>— No video proof means no replacement — this is how we verify claims fairly.</li>
            <li>
              — Size exchanges accepted within 7 days of delivery, unworn and unwashed, tags on.
            </li>
            <li>— We don't accept returns for change of mind.</li>
            <li>
              — To start a replacement or exchange, DM{" "}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-foreground"
              >
                @yeoubi.inc
              </a>{" "}
              or email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-foreground">
                {CONTACT_EMAIL}
              </a>
              .
            </li>
          </ul>
        </div>
      </section>

      <section className="px-6 pb-24 md:pb-32">
        <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-8">
          <Link
            to="/order-process"
            className="label border-b border-foreground pb-1 hover:text-accent"
          >
            → How ordering works
          </Link>
          <Link
            to="/size-chart"
            className="label border-b border-foreground pb-1 hover:text-accent"
          >
            → Size chart
          </Link>
          <Link to="/contact" className="label border-b border-foreground pb-1 hover:text-accent">
            → Contact us
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
