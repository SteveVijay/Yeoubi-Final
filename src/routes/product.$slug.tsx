import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

import { getProductSeo } from "@/config/seo-content";
import { PageShell } from "@/components/site/page-shell";
import { ScarfSizeChartTable, SizeChartTable } from "@/components/site/size-chart-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getPieceBySlug, pieces } from "@/data/pieces";
import { DROP2_TEE_SIZE_CHART, SCARF_SIZE_CHART, TEE_SIZE_CHART } from "@/data/size-chart";
import { useCart } from "@/lib/cart-context";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const piece = getPieceBySlug(params.slug);
    if (!piece) throw notFound();
    return piece;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const seo = getProductSeo(loaderData);
    return {
      meta: [
        { title: seo.title },
        { name: "description", content: seo.description },
        { name: "keywords", content: seo.keywords?.join(", ") },
        { property: "og:title", content: seo.title },
        { property: "og:description", content: seo.description },
        { property: "og:image", content: loaderData.img },
        { property: "og:type", content: "product" },
        { name: "twitter:title", content: seo.title },
        { name: "twitter:description", content: seo.description },
        { name: "twitter:image", content: loaderData.img },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const piece = Route.useLoaderData();
  const { addToBag } = useCart();
  const [size, setSize] = useState<string>(piece.availableSizes[0] || "M");
  const [justAdded, setJustAdded] = useState(false);
  const [activeImage, setActiveImage] = useState<"front" | "back">("front");

  useEffect(() => {
    setSize(piece.availableSizes[0] || "M");
    setActiveImage("front");
  }, [piece.slug]);

  const stockCount = piece.stock[size] ?? 0;
  const inStock = stockCount > 0;
  const isComingSoon = false;

  function handleAdd() {
    addToBag(piece, size, displayPrice);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  }

  const seo = getProductSeo(piece);
  const isScarf = piece.category === "scarves";
  const isDrop2Tee = piece.drop === "drop-02" && !isScarf;
  const displayPrice = isScarf ? (size === "80×80 cm" ? "Rs. 299.00" : "Rs. 249.00") : piece.price;

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seo.jsonLd),
        }}
      />
      <section className="grid grid-cols-1 gap-10 px-6 pb-24 pt-28 md:grid-cols-2 md:gap-16 md:pb-32 md:pt-36">
        {/* gallery */}
        <div>
          <div className="group relative overflow-hidden rounded-lg bg-black aspect-[3/4]">
            <img
              src={activeImage === "front" ? piece.img : piece.imgBack || piece.img}
              alt={`${piece.name} — ${activeImage}`}
              className="absolute inset-0 h-full w-full object-contain p-8 transition duration-500 ease-out group-hover:scale-105"
            />
          </div>

          {/* Front / Back Toggle Buttons */}
          {piece.imgBack && (
            <div className="mt-3 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveImage("front")}
                  className={`label text-[10px] px-3 py-1 rounded transition ${
                    activeImage === "front"
                      ? "bg-foreground text-background border border-foreground font-semibold"
                      : "bg-surface text-muted-foreground border border-border hover:text-foreground"
                  }`}
                >
                  Front
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImage("back")}
                  className={`label text-[10px] px-3 py-1 rounded transition ${
                    activeImage === "back"
                      ? "bg-foreground text-background border border-foreground font-semibold"
                      : "bg-surface text-muted-foreground border border-border hover:text-foreground"
                  }`}
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </div>

        {/* info */}
        <div>
          <Link to="/" hash="collection" className="label hover:text-accent transition-colors">
            ← All pieces
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="label font-mono !text-[11px] text-muted-foreground">{piece.code}</span>
            <span className="h-1 w-1 rounded-full bg-accent" />
            <span className="label font-mono text-[10px] text-accent">{piece.dropLabel}</span>
            <span className="label font-mono text-[9px] px-2 py-0.5 rounded bg-surface border border-border text-muted-foreground uppercase">
              {isScarf ? "Satin Scarf" : "Streetwear Tee"}
            </span>
          </div>

          <h1 className="text-display mt-2 text-4xl italic md:text-6xl">{piece.name}</h1>
          
          <div className="mt-4 flex items-baseline gap-3">
            <p className="font-mono text-xl font-medium">{displayPrice}</p>
            {piece.originalPrice && (
              <p className="font-mono text-sm text-muted-foreground line-through">{piece.originalPrice}</p>
            )}
            <span className="label font-mono text-[9px] px-2 py-0.5 rounded bg-accent/15 text-accent border border-accent/30">
              Tax Included
            </span>
          </div>
          
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground text-sm md:text-base">{piece.description}</p>

          {/* size */}
          <div className="mt-10 rounded-lg border border-border/60 bg-surface/30 p-5 backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="label text-foreground">Select {isScarf ? "Dimension" : "Size"}</p>
              <Dialog>
                <DialogTrigger asChild>
                  <button type="button" className="label text-accent hover:underline">
                    Size guide
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-display text-2xl font-normal">
                      {isScarf
                        ? "Scarf Dimensions & Guide"
                        : isDrop2Tee
                          ? "Unisex Oversized T-Shirt Size Chart"
                          : "Tee Size Chart"}
                    </DialogTitle>
                    <DialogDescription>
                      {isScarf
                        ? "Square satin scarves available in 55×55 cm and 80×80 cm."
                        : isDrop2Tee
                          ? "Drop 02 Heavyweight 240 GSM unisex oversized fit. All measurements are in inches, taken flat."
                          : "All measurements are in inches, taken flat across the garment."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    {isScarf ? (
                      <ScarfSizeChartTable rows={SCARF_SIZE_CHART} />
                    ) : isDrop2Tee ? (
                      <SizeChartTable rows={DROP2_TEE_SIZE_CHART} unit="inches" />
                    ) : (
                      <SizeChartTable rows={TEE_SIZE_CHART} unit="inches" />
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {piece.availableSizes.map((s) => {
                const disabled = (piece.stock[s] ?? 0) === 0;
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={disabled}
                    onClick={() => setSize(s)}
                    className={`h-11 px-4 rounded border text-sm font-mono transition-all ${
                      disabled
                        ? "cursor-not-allowed border-border text-muted-foreground/40 line-through"
                        : size === s
                          ? "border-accent bg-accent text-background font-bold glow-accent"
                          : "border-border hover:border-foreground bg-background"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            {!inStock && (
              <p className="mt-3 text-xs text-muted-foreground">
                That size is out of stock right now.
              </p>
            )}
          </div>

          {/* add to bag button */}
          <Button
            onClick={handleAdd}
            disabled={!inStock || isComingSoon}
            className="relative mt-8 w-full sm:w-auto h-12 px-8 text-base font-mono uppercase tracking-wider"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isComingSoon ? (
                <motion.span
                  key="coming-soon"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  Coming Soon
                </motion.span>
              ) : justAdded ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2"
                >
                  ✓ Added to bag
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  Add to bag — {displayPrice}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

          {/* fabric / fit / wash care */}
          <div className="mt-12 space-y-6 border-t border-border/80 pt-8">
            <div>
              <p className="label mb-2 text-accent">Fabric &amp; build</p>
              <p className="text-sm text-muted-foreground">
                {piece.fabric} {piece.gsm ? `· ${piece.gsm}gsm Heavyweight Ring-spun Cotton` : ""}
              </p>
            </div>
            {piece.designAndFeel && (
              <div>
                <p className="label mb-2 text-accent">Design &amp; Feel</p>
                <p className="text-sm text-muted-foreground">{piece.designAndFeel}</p>
              </div>
            )}
            {piece.quality && (
              <div>
                <p className="label mb-2 text-accent">Quality</p>
                <p className="text-sm text-muted-foreground">{piece.quality}</p>
              </div>
            )}
            <div>
              <p className="label mb-2 text-accent">Fit &amp; Cut</p>
              <p className="text-sm text-muted-foreground">{piece.fit}</p>
            </div>
            <div>
              <p className="label mb-2 text-accent">Wash &amp; care</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {piece.washCare.map((w) => (
                  <li key={w}>— {w}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            Questions before you order? Read{" "}
            <Link to="/order-process" className="underline hover:text-foreground">
              how ordering works
            </Link>{" "}
            or our{" "}
            <Link to="/shipping-returns" className="underline hover:text-foreground">
              Shipping &amp; Returns policy
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Sticky Mobile Add to Bag Bar at screen bottom */}
      <div className="fixed bottom-0 inset-x-0 z-30 flex items-center justify-between border-t border-border/80 bg-background/95 backdrop-blur-xl px-5 py-3 sm:hidden">
        <div>
          <p className="text-xs font-mono truncate max-w-[150px]">{piece.name}</p>
          <p className="font-mono text-xs font-semibold text-accent">{displayPrice} · {size}</p>
        </div>
        <Button
          onClick={handleAdd}
          disabled={!inStock || isComingSoon}
          size="sm"
          className="h-10 px-5 text-xs font-mono uppercase"
        >
          {isComingSoon ? "Coming Soon" : justAdded ? "✓ Added" : "Add to Bag"}
        </Button>
      </div>

      {/* keep exploring */}
      <section className="border-t border-border px-6 py-16">
        <p className="label mb-8">Keep exploring</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {pieces
            .filter((p) => p.slug !== piece.slug)
            .slice(0, 4)
            .map((p) => (
              <Link
                key={p.slug}
                to="/product/$slug"
                params={{ slug: p.slug }}
                className="group block w-full text-left"
              >
                {/* Product Tile Container */}
                <div className="relative overflow-hidden rounded-md bg-black aspect-[3/4] transition-all duration-500 group-hover:shadow-xl">
                  {/* Badge overlays */}
                  <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-start gap-2 pointer-events-none">
                    <span className="label font-mono text-[9px] px-2 py-0.5 rounded bg-background/85 text-foreground backdrop-blur-md border border-border/50 max-w-[75%] break-words">
                      {p.category === "scarves" ? "Poly-Woven Satin · 2 Sizes" : `${p.gsm || 240} GSM · ${p.drop === "drop-02" ? "Oversize Fit" : "Boxy Fit"}`}
                    </span>
                    <span
                      className={`label font-mono text-[9px] px-2 py-0.5 rounded backdrop-blur-md shrink-0 ${
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
                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="label font-mono text-xs text-muted-foreground">{p.code}</p>
                    <span className="label font-mono text-[10px] text-accent">
                      {p.drop === "drop-02" ? "Heated Drop" : "Chapter 01"}
                    </span>
                  </div>
                  <h3 className="text-display text-lg md:text-xl italic text-foreground leading-snug group-hover:text-accent transition-colors">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline gap-2 pt-0.5">
                    <span className="font-mono text-base font-medium text-foreground">{p.price}</span>
                    {p.originalPrice && (
                      <span className="font-mono text-xs sm:text-sm text-muted-foreground line-through">
                        {p.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </PageShell>
  );
}
