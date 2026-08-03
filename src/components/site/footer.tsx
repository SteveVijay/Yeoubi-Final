import { Link } from "@tanstack/react-router";

import { COPYRIGHT_YEAR } from "@/config/site";
import { pieces } from "@/data/pieces";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 md:py-16">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-10">
        <div className="sm:col-span-2">
          <Link to="/" className="text-display text-5xl sm:text-6xl italic">
            yeoubi.
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Independent unisex streetwear. Chapter 01 out now — three tees, 240gsm.
            More landing soon.
          </p>
        </div>
        <div>
          <p className="label mb-4">Shop</p>
          <ul className="space-y-2 text-sm">
            {pieces.map((p) => (
              <li key={p.slug}>
                <Link to="/product/$slug" params={{ slug: p.slug }} className="hover:text-accent">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-4">Studio</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/studio" className="hover:text-accent">
                About
              </Link>
            </li>
            <li>
              <Link to="/journal" className="hover:text-accent">
                Journal
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-accent">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/order-process" className="hover:text-accent">
                How ordering works
              </Link>
            </li>
            <li>
              <Link to="/payment" className="hover:text-accent">
                Payment &amp; security
              </Link>
            </li>
            <li>
              <Link to="/stockists" className="hover:text-accent">
                Stockists &amp; Drop 02
              </Link>
            </li>
            <li>
              <Link to="/shipping-returns" className="hover:text-accent">
                Shipping &amp; Returns
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-border pt-6">
        <p className="label">© {COPYRIGHT_YEAR} Yeoubi — All quiet reserved.</p>
        <p className="label font-mono">India</p>
      </div>
    </footer>
  );
}
