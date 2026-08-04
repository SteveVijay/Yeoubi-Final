import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { INSTAGRAM_URL } from "@/config/site";
import { pieces, type BagItem } from "@/data/pieces";
import { useCart } from "@/lib/cart-context";

type CheckoutView = "bag" | "form" | "confirm" | "redirect";
type OrderForm = { name: string; phone: string; address: string; note: string };

/** Helper to get product image for bag items */
function getItemImage(it: BagItem): string | undefined {
  return it.img || pieces.find((p) => p.slug === it.slug || p.name === it.name)?.img;
}

/** Robust helper to parse numeric amount from any currency string (e.g., "Rs. 999.00" -> 999) */
export function parsePrice(priceStr: string): number {
  if (!priceStr) return 0;
  const sansPrefix = priceStr.replace(/^(rs\.?|inr|₹|\$)\s*/i, "");
  const cleaned = sansPrefix.replace(/,/g, "").replace(/[^0-9.]/g, "");
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : Math.round(n);
}

/** The bag is deliberately a side drawer, not its own page — see site brief item 2. */
export function BagDrawer() {
  const { items, bagOpen, setBagOpen, removeFromBag, clearBag } = useCart();
  const [view, setView] = useState<CheckoutView>("bag");
  const [form, setForm] = useState<OrderForm>({ name: "", phone: "", address: "", note: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!bagOpen) {
      const t = setTimeout(() => setView("bag"), 300);
      return () => clearTimeout(t);
    }
  }, [bagOpen]);

  const total = items.reduce((sum, it) => sum + parsePrice(it.price), 0);

  function buildMessage() {
    const lines = items.map((it) => `• ${it.name} — Size ${it.size} (${it.price})`).join("\n");
    const parts = [
      "Hi Yeoubi! I'd like to place an order 🛒",
      "",
      "Items:",
      lines,
      "",
      `Total: ₹${total.toLocaleString("en-IN")}`,
      "",
      "Delivery Details:",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Address: ${form.address}`,
    ];
    if (form.note.trim()) parts.push(`Note: ${form.note}`);
    parts.push("", "— sent via yeoubi.com");
    return parts.join("\n");
  }

  async function handlePrepareRedirect() {
    setSending(true);
    try {
      const messageText = buildMessage();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(messageText);
      }
      setView("redirect");
    } catch {
      toast.error("Could not copy automatically. Please copy manually.");
      setView("redirect");
    } finally {
      setSending(false);
    }
  }

  function handleFinalRedirect() {
    window.open(INSTAGRAM_URL, "_blank");
    clearBag();
    setBagOpen(false);
  }

  const formValid =
    form.name.trim().length > 1 &&
    form.phone.trim().length >= 10 &&
    form.address.trim().length > 10;

  return (
    <Sheet open={bagOpen} onOpenChange={setBagOpen}>
      <SheetContent side="right" className="flex w-full flex-col overflow-y-auto sm:max-w-md">
        {view === "bag" && (
          <>
            <SheetHeader>
              <SheetTitle className="text-display text-2xl font-normal">Your bag</SheetTitle>
              <SheetDescription>
                Review your items, then checkout via Instagram DM.{" "}
                <span className="font-semibold text-foreground">Prepaid only</span> — no COD.
              </SheetDescription>
            </SheetHeader>

            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">Bag is empty.</p>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-border">
                  {items.map((it, i) => {
                    const imgSrc = getItemImage(it);
                    return (
                      <li key={i} className="flex items-center gap-3 py-3">
                        {imgSrc && (
                          <img
                            src={imgSrc}
                            alt={it.name}
                            className="h-14 w-14 rounded object-contain bg-[oklch(0.96_0.005_80)] p-1 flex-shrink-0 border border-border"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{it.name}</p>
                          <p className="label !text-muted-foreground">
                            Size {it.size} · {it.price}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromBag(i)}
                          className="label hover:text-accent flex-shrink-0 ml-2"
                          type="button"
                        >
                          Remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <p className="label">Total</p>
                  <p className="font-mono text-sm">₹{total.toLocaleString("en-IN")}</p>
                </div>
              </>
            )}

            <SheetFooter className="mt-auto flex-col gap-2 sm:flex-col sm:space-x-0">
              <Button
                disabled={items.length === 0}
                onClick={() => setView("form")}
                className="w-full"
              >
                Checkout via DM →
              </Button>
              <Button variant="outline" onClick={() => setBagOpen(false)} className="w-full">
                Keep browsing
              </Button>
            </SheetFooter>
          </>
        )}

        {view === "form" && (
          <>
            <SheetHeader>
              <SheetTitle className="text-display text-2xl font-normal">Your details</SheetTitle>
              <SheetDescription>
                These will be included in your DM. Nothing is stored on our servers.
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-3">
              <div>
                <p className="label mb-1.5">Full name *</p>
                <Input
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div>
                <p className="label mb-1.5">Phone / WhatsApp *</p>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </div>
              <div>
                <p className="label mb-1.5">Delivery address *</p>
                <textarea
                  className="min-h-[80px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="House/Flat no., Street, City, State, PIN code"
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                />
              </div>
              <div>
                <p className="label mb-1.5">Note (optional)</p>
                <textarea
                  className="min-h-[56px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Size concerns, special requests…"
                  value={form.note}
                  onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Please read our{" "}
              <Link
                to="/shipping-returns"
                className="underline transition hover:text-foreground"
                onClick={() => setBagOpen(false)}
              >
                Shipping &amp; Returns policy
              </Link>{" "}
              before placing your order.
            </p>

            <SheetFooter className="mt-auto flex-col gap-2 sm:flex-row sm:space-x-0">
              <Button variant="outline" onClick={() => setView("bag")}>
                ← Back
              </Button>
              <Button disabled={!formValid} onClick={() => setView("confirm")}>
                Review order →
              </Button>
            </SheetFooter>
          </>
        )}

        {view === "confirm" && (
          <>
            <SheetHeader>
              <SheetTitle className="text-display text-2xl font-normal">Confirm order</SheetTitle>
              <SheetDescription>
                We'll copy your order and open our Instagram — just paste and send.
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-2 rounded-md border border-border p-4">
              <p className="label">Order summary</p>
              <ul className="divide-y divide-border">
                {items.map((it, i) => {
                  const imgSrc = getItemImage(it);
                  return (
                    <li key={i} className="flex items-center gap-3 py-2 text-sm">
                      {imgSrc && (
                        <img
                          src={imgSrc}
                          alt={it.name}
                          className="h-10 w-10 rounded object-contain bg-[oklch(0.96_0.005_80)] p-1 flex-shrink-0 border border-border"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{it.name}</p>
                        <p className="text-xs text-muted-foreground">Size {it.size}</p>
                      </div>
                      <span className="font-mono text-xs flex-shrink-0">{it.price}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="flex items-center justify-between border-t border-border pt-2">
                <span className="text-sm font-semibold">Total</span>
                <span className="font-mono text-sm">₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="space-y-1 rounded-md border border-border p-4 text-sm text-muted-foreground">
              <p className="label !text-foreground mb-1">Deliver to</p>
              <p>
                {form.name} · {form.phone}
              </p>
              <p>{form.address}</p>
              {form.note && <p className="mt-1 italic">"{form.note}"</p>}
            </div>

            <div className="rounded-md border border-border bg-surface px-3 py-2.5 text-xs text-muted-foreground">
              ⚠️ <strong className="text-foreground">Prepaid orders only.</strong> After your DM,
              we'll confirm availability and share our{" "}
              <Link
                to="/payment"
                className="underline hover:text-foreground"
                onClick={() => setBagOpen(false)}
              >
                payment details
              </Link>
              . Your order is confirmed only after payment is received.
            </div>

            <SheetFooter className="mt-auto flex-col gap-2 sm:flex-row sm:space-x-0">
              <Button variant="outline" onClick={() => setView("form")}>
                ← Edit
              </Button>
              <Button onClick={handlePrepareRedirect} disabled={sending}>
                {sending ? "Processing…" : "Continue →"}
              </Button>
            </SheetFooter>
          </>
        )}

        {view === "redirect" && (
          <>
            <SheetHeader>
              <SheetTitle className="text-display text-2xl font-normal">Almost there</SheetTitle>
              <SheetDescription>
                Just one more step to place your order.
              </SheetDescription>
            </SheetHeader>

            <div className="my-auto flex flex-col items-center justify-center rounded-md border border-accent/60 bg-surface p-6 text-center">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-xl">
                📋
              </span>
              <p className="mb-2 text-sm font-medium text-foreground">
                Order details copied to clipboard!
              </p>
              <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                You will be redirected to our Instagram page. Please paste the message in our DMs to send us your order.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs font-mono"
                onClick={async () => {
                  if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(buildMessage());
                    toast.success("Copied to clipboard!");
                  }
                }}
              >
                Copy Again
              </Button>
            </div>

            <SheetFooter className="mt-auto flex-col gap-2 sm:flex-row sm:space-x-0">
              <Button variant="outline" onClick={() => setView("confirm")}>
                ← Back
              </Button>
              <Button onClick={handleFinalRedirect} className="flex-1">
                Go to Instagram ↗
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
