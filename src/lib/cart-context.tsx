import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";

import { BAG_KEY } from "@/config/site";
import { safeStorage } from "@/lib/safe-storage";
import type { BagItem, Piece } from "@/data/pieces";

type CartContextValue = {
  items: BagItem[];
  bagOpen: boolean;
  /** Bumped on every successful add — components can watch it to fire a one-off animation. */
  lastAddedAt: number;
  openBag: () => void;
  closeBag: () => void;
  setBagOpen: (v: boolean) => void;
  addToBag: (piece: Piece, size: string) => void;
  removeFromBag: (index: number) => void;
  clearBag: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [lastAddedAt, setLastAddedAt] = useState(0);

  // Load saved items from localStorage once on client mount
  useEffect(() => {
    const saved = safeStorage.getJSON<BagItem[]>(BAG_KEY, []);
    if (Array.isArray(saved) && saved.length > 0) {
      setItems(saved);
    }
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      bagOpen,
      lastAddedAt,
      openBag: () => setBagOpen(true),
      closeBag: () => setBagOpen(false),
      setBagOpen,
      addToBag: (piece, size) => {
        setItems((b) => {
          const newItems = [
            ...b,
            { code: piece.code, name: piece.name, price: piece.price, size, slug: piece.slug, img: piece.img },
          ];
          safeStorage.setJSON(BAG_KEY, newItems);
          return newItems;
        });
        setLastAddedAt(Date.now());
        toast.success(`Added — ${piece.name}`, { description: `Size ${size} · saved to bag` });
      },
      removeFromBag: (index) =>
        setItems((b) => {
          const newItems = b.filter((_, i) => i !== index);
          safeStorage.setJSON(BAG_KEY, newItems);
          return newItems;
        }),
      clearBag: () => {
        setItems([]);
        safeStorage.setJSON(BAG_KEY, []);
      },
    }),
    [items, bagOpen, lastAddedAt],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
