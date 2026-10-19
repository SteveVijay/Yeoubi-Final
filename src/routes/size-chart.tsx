import { createFileRoute, Link } from "@tanstack/react-router";

import { PageShell } from "@/components/site/page-shell";
import { PAGES_SEO } from "@/config/seo-content";
import { HowToMeasure, ScarfSizeChartTable, SizeChartTable, SizeHelpNote } from "@/components/site/size-chart-table";
import { DROP2_TEE_SIZE_CHART, SCARF_SIZE_CHART, TEE_SIZE_CHART } from "@/data/size-chart";

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
          All Yeoubi streetwear tees are cut unisex — Drop 02 features an oversized drop-shoulder fit, while Originals feature a signature boxy fit. Satin scarves come in two versatile square sizes (55×55 cm and 80×80 cm).
        </p>
      </section>

      <section className="px-6 pb-16">
        <p className="label mb-4 text-accent">Drop 02 Tees — Unisex Oversized Fit (Inches, Flat)</p>
        <SizeChartTable rows={DROP2_TEE_SIZE_CHART} unit="inches" />
      </section>

      <section className="px-6 pb-16">
        <p className="label mb-4">Originals (Drop 01) Tees — Boxy Fit (Inches, Flat)</p>
        <SizeChartTable rows={TEE_SIZE_CHART} unit="inches" />
      </section>

      <section className="px-6 pb-16">
        <p className="label mb-4">Satin Scarves &amp; Bandanas (Dimensions &amp; Styling)</p>
        <ScarfSizeChartTable rows={SCARF_SIZE_CHART} />
      </section>

      <section className="px-6 pb-16">
        <p className="label mb-6">How to measure &amp; style</p>
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
