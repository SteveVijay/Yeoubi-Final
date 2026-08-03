import { createFileRoute, Link } from "@tanstack/react-router";

import { PageShell } from "@/components/site/page-shell";
import { PAGES_SEO } from "@/config/seo-content";
import { INSTAGRAM_URL } from "@/config/site";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: PAGES_SEO.payment.title },
      { name: "description", content: PAGES_SEO.payment.description },
      { name: "keywords", content: PAGES_SEO.payment.keywords?.join(", ") },
      { property: "og:title", content: PAGES_SEO.payment.title },
      { property: "og:description", content: PAGES_SEO.payment.description },
      { name: "twitter:title", content: PAGES_SEO.payment.title },
      { name: "twitter:description", content: PAGES_SEO.payment.description },
    ],
  }),
  component: PaymentPage,
});

function PaymentPage() {
  return (
    <PageShell>
      <section className="px-6 pb-16 pt-32 md:pb-20 md:pt-40">
        <p className="label">(12) — Payment trust</p>
        <h1 className="text-display mt-4 text-5xl md:text-7xl">Payment &amp; security.</h1>
        <p className="mt-6 max-w-lg text-muted-foreground">
          We're a small independent studio without a storefront checkout — every order is confirmed
          and paid for directly with us, over DM.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-10 px-6 pb-16 md:grid-cols-2">
        <div>
          <p className="label mb-3">Accepted methods</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>— UPI</li>
            <li>— Bank transfer (NEFT / IMPS)</li>
            <li>— Other prepaid methods, shared on request for international orders</li>
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            We do not accept Cash on Delivery (COD) at this time — all orders are prepaid.
          </p>
        </div>
        <div>
          <p className="label mb-3">How it works</p>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>You DM us your order and shipping location.</li>
            <li>We reply confirming stock and share our UPI / bank details directly in DM.</li>
            <li>You complete payment and send us a screenshot as confirmation.</li>
            <li>Your order is confirmed — and only confirmed — once payment is received.</li>
          </ol>
        </div>
      </section>

      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-2xl rounded-md border border-border bg-surface p-6">
          <p className="label mb-3">Why this is safe</p>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>
              — Payment details come only from our verified Instagram account,{" "}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-foreground"
              >
                @yeoubi.inc
              </a>{" "}
              — never a third party or a random handle.
            </li>
            <li>— We never ask for OTPs, card PINs, or remote access to your banking apps.</li>
            <li>— UPI and bank transfer go straight to our business account, not a middleman.</li>
            <li>
              — Defective or incorrect items are replaced at no extra cost — see our{" "}
              <Link to="/shipping-returns" className="underline hover:text-foreground">
                Shipping &amp; Returns policy
              </Link>
              .
            </li>
          </ul>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Unsure about a message claiming to be us? Verify through{" "}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-foreground"
          >
            our official Instagram
          </a>{" "}
          before paying anyone.
        </p>
      </section>
    </PageShell>
  );
}
