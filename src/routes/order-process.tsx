import { createFileRoute, Link } from "@tanstack/react-router";

import { Reveal } from "@/components/site/motion-bits";
import { PageShell } from "@/components/site/page-shell";
import { PAGES_SEO } from "@/config/seo-content";
import { INSTAGRAM_URL } from "@/config/site";

export const Route = createFileRoute("/order-process")({
  head: () => ({
    meta: [
      { title: PAGES_SEO.orderProcess.title },
      { name: "description", content: PAGES_SEO.orderProcess.description },
      { name: "keywords", content: PAGES_SEO.orderProcess.keywords?.join(", ") },
      { property: "og:title", content: PAGES_SEO.orderProcess.title },
      { property: "og:description", content: PAGES_SEO.orderProcess.description },
      { name: "twitter:title", content: PAGES_SEO.orderProcess.title },
      { name: "twitter:description", content: PAGES_SEO.orderProcess.description },
    ],
  }),
  component: OrderProcessPage,
});

const steps = [
  {
    n: "01",
    title: "Size confirmation",
    body: "Pick a piece, choose your size using our size chart, then DM us on Instagram with the item, size, and your shipping location — within India or international.",
  },
  {
    n: "02",
    title: "Payment",
    body: "We confirm availability and send you our UPI / bank transfer details in DM. Orders are prepaid only — your order is confirmed once payment is received.",
  },
  {
    n: "03",
    title: "Dispatch",
    body: "Your order is packed and dispatched within one week of payment confirmation.",
  },
  {
    n: "04",
    title: "Tracking",
    body: "Once dispatched, we share and update your tracking link through our Instagram Stories — keep an eye on @yeoubi.inc.",
  },
  {
    n: "05",
    title: "Delivery",
    body: "Delivery takes up to one week after dispatch. If anything arrives defective or incorrect, we replace it at no extra cost — just send unboxing video proof.",
  },
];

function OrderProcessPage() {
  return (
    <PageShell>
      <section className="px-6 pb-16 pt-32 md:pb-20 md:pt-40">
        <p className="label">(08) — Trust &amp; credibility</p>
        <h1 className="text-display mt-4 text-5xl md:text-7xl">How ordering works.</h1>
        <p className="mt-6 max-w-lg text-muted-foreground">
          Yeoubi orders are placed through Instagram DM, not a checkout cart. Here's exactly what
          happens from the moment you message us to the moment your piece arrives.
        </p>
      </section>

      <section className="px-6 pb-24 md:pb-32">
        <div className="space-y-0 divide-y divide-border border-y border-border">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="grid grid-cols-[2.5rem_1fr] gap-3 py-6 md:grid-cols-[6rem_1fr] md:gap-6 md:py-10">
                <p className="text-display text-2xl italic text-muted-foreground md:text-5xl">
                  {s.n}
                </p>
                <div>
                  <h2 className="text-display text-2xl md:text-3xl">{s.title}</h2>
                  <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="label border-b border-foreground pb-1 hover:text-accent"
          >
            → DM us on Instagram
          </a>
          <Link to="/payment" className="label border-b border-foreground pb-1 hover:text-accent">
            → Payment methods &amp; security
          </Link>
          <Link
            to="/shipping-returns"
            className="label border-b border-foreground pb-1 hover:text-accent"
          >
            → Shipping &amp; Returns
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
