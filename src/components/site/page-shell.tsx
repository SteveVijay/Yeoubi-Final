import { type ReactNode } from "react";

import { BagDrawer } from "@/components/site/bag-drawer";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";

/**
 * Wraps every route with persistent nav, footer, and bag drawer.
 */
export function PageShell({
  children,
  navVariant = "solid",
}: {
  children: ReactNode;
  navVariant?: "overlay" | "solid";
}) {
  return (
    <div className="relative overflow-hidden">
      <Nav variant={navVariant} />
      {children}
      <Footer />
      <BagDrawer />
    </div>
  );
}
