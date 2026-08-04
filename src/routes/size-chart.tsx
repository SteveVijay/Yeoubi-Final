import { createFileRoute, Link } from "@tanstack/react-router";

import { PageShell } from "@/components/site/page-shell";
import { PAGES_SEO } from "@/config/seo-content";
import { HowToMeasure, SizeChartTable, SizeHelpNote } from "@/components/site/size-chart-table";
import { TEE_SIZE_CHART } from "@/data/size-chart";

export const Route = createFileRoute("/size-chart")({
  head: () => ({
    meta: [
      { title: PAGES_SEO.sizeChart.title },
      { name: "description", content: PAGES_SEO.sizeChart.description },
      { name: "keywords", content: PAGES_SEO.sizeChart.keywords?.join(", ") },
      { property: "og:title", content: PAGES_SEO.sizeChart.title },
      { property: "og:description", content: PAGES_SEO.sizeChart.description },
      { name: "twitter:title", content: PAGES_SEO.sizeChart.title },
      { name: "twitter:description", content: PAGES_SEO.sizeChart.description },
    ],
  }),
  component: SizeChartPage,
});

function SizeChartPage() {
  return (
    <PageShell>
      <section className="px-6 pb-16 pt-32 md:pb-20 md:pt-40">
        <p className="label">(09) — Fit guide</p>
        <h1 className="text-display mt-4 text-5xl md:text-7xl">Size chart.</h1>
        <p className="mt-6 max-w-lg text-muted-foreground">
          All Yeoubi pieces are cut unisex and run boxy by design. Measurements below are in
          inches, taken flat.
        </p>
      </section>

      <section className="px-6 pb-16">
        <p className="label mb-4">Tees — Ringer, Signature, Box Tee</p>
        <SizeChartTable rows={TEE_SIZE_CHART} unit="inches" />
      </section>

      <section className="px-6 pb-16">
        <p className="label mb-6">How to measure</p>
        <HowToMeasure />
      </section>

      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-xl rounded-md border border-border bg-surface p-5">
          <SizeHelpNote />
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Still unsure? DM us your usual size and we'll help you pick before you order —{" "}
          <Link to="/contact" className="underline hover:text-foreground">
            get in touch
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}
