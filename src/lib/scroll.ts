/** Smooth-scroll to a DOM element by id. No-ops on SSR. */
export function scrollToId(id: string): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Smooth-scroll to the top of the page. No-ops on SSR. */
export function scrollToTop(): void {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}
