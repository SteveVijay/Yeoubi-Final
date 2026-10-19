import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

import { useCart } from "@/lib/cart-context";

/**
 * Site nav — persistent across every page.
 * Renders desktop menu links and a responsive mobile menu drawer for smaller screens.
 */
export function Nav({ variant = "solid" }: { variant?: "overlay" | "solid" }) {
  const { items, openBag, lastAddedAt } = useCart();
  const [bump, setBump] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!lastAddedAt) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 500);
    return () => clearTimeout(t);
  }, [lastAddedAt]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isOverlayMode = variant === "overlay" && !scrolled && !mobileMenuOpen;
  const linkClass = isOverlayMode
    ? "label !text-white/80 transition hover:!text-white"
    : "label transition hover:text-foreground text-muted-foreground";

  const mobileNavLinks = [
    { to: "/", hash: "collection", label: "Collection" },
    { to: "/journal", label: "Journal" },
    { to: "/studio", label: "Studio" },
    { to: "/stockists", label: "Stockists" },
  ];

  const secondaryNavLinks = [
    { to: "/order-process", label: "How ordering works" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <motion.header
        className={
          isOverlayMode
            ? "fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 mix-blend-difference transition-all duration-300"
            : "fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-border/80 bg-background/90 px-6 py-4 backdrop-blur-md transition-all duration-300 shadow-sm"
        }
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: variant === "overlay" ? 2 : 0 }}
      >
        {/* Mobile Menu Toggle Button (Left on mobile) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className={`label flex items-center gap-1.5 md:hidden z-50 transition-colors ${
            isOverlayMode ? "!text-white" : "text-foreground"
          }`}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <motion.span
            animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </motion.span>
          <span className="text-[11px] font-mono tracking-wider">
            {mobileMenuOpen ? "CLOSE" : "MENU"}
          </span>
        </button>

        {/* Brand Logo (Centered on mobile, Left-aligned on desktop) */}
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className={`label ${
            isOverlayMode ? "!text-white" : "text-foreground"
          } absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 z-50 transition-colors`}
        >
          YEOUBI ®
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden gap-8 md:flex">
          <Link to="/" hash="collection" className={linkClass}>
            Collection
          </Link>
          <Link to="/journal" className={linkClass}>
            Journal
          </Link>
          <Link to="/studio" className={linkClass}>
            Studio
          </Link>
          <Link to="/stockists" className={linkClass}>
            Stockists
          </Link>
        </nav>

        {/* Cart Bag Trigger (Right side) */}
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            openBag();
          }}
          className={`label flex items-center gap-1.5 z-50 transition-colors ${
            isOverlayMode ? "!text-white" : "text-foreground"
          }`}
        >
          Bag
          <motion.span
            className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-mono text-[10px] text-background"
            animate={bump ? { scale: [1, 1.5, 1] } : { scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {items.length}
          </motion.span>
        </button>
      </motion.header>

      {/* Mobile Overlay Menu Drawer with Smooth Staggered Animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 flex flex-col justify-between bg-background/98 backdrop-blur-xl px-6 pb-10 pt-28 md:hidden"
          >
            <div className="flex flex-col space-y-6 pt-4">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="label font-mono text-[10px] text-accent"
              >
                (NAVIGATION)
              </motion.p>
              <nav className="flex flex-col space-y-5">
                {mobileNavLinks.map((link, idx) => (
                  <motion.div
                    key={link.to + (link.hash || "")}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35, delay: 0.12 + idx * 0.05, ease: "easeOut" }}
                  >
                    <Link
                      to={link.to}
                      hash={link.hash}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-display text-4xl text-foreground hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="pt-3 border-t border-border/60 space-y-4">
                  {secondaryNavLinks.map((link, idx) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.35, delay: 0.3 + idx * 0.05, ease: "easeOut" }}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-display text-2xl text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="border-t border-border pt-6 space-y-1.5"
            >
              <p className="label font-mono text-[10px] text-muted-foreground">
                YEOUBI STREETWEAR · CHAPTER 01
              </p>
              <p className="text-xs text-muted-foreground">
                Quiet garments, restless people. Online only.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

