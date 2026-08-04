import artGalleriesFront from "@/assets/1000821429.webp";
import artGalleriesBack from "@/assets/1000821423.webp";

import ringerFront from "@/assets/1000821437.webp";
import ringerBack from "@/assets/1000821422.webp";

import archiveFront from "@/assets/1000821428.webp";
import archiveBack from "@/assets/1000821421.webp";

/** Available sizes across all pieces. */
export const SIZES = ["XS", "S", "M", "L", "XL"] as const;
export type Size = (typeof SIZES)[number];

export type Piece = {
  /** URL-safe identifier used for the dedicated product page: /product/$slug */
  slug: string;
  name: string;
  /** Human-readable piece code, e.g. "N°01" */
  code: string;
  /** Sale / current display price in INR */
  price: string;
  /** Original / MRP — shown struck-through alongside the sale price */
  originalPrice?: string;
  img: string;
  /**
   * Optional back-view photo.
   */
  imgBack?: string;
  /** Tailwind aspect-ratio class */
  ratio: string;
  description: string;
  details: string[];
  fabric: string;
  gsm: number;
  fit: string;
  washCare: string[];
  /** Per-size stock count. 0 = out of stock. */
  stock: Record<Size, number>;
};

/** A single item in the shopping bag. */
export type BagItem = {
  code: string;
  name: string;
  price: string;
  size: string;
  slug: string;
  img?: string;
};

export const pieces: Piece[] = [
  {
    slug: "signature-tee-art-galleries",
    name: "Signature Tee — Art Galleries",
    code: "N°01",
    price: "Rs. 899.00",
    originalPrice: "Rs. 999.00",
    img: artGalleriesFront,
    imgBack: artGalleriesBack,
    ratio: "aspect-[3/4]",
    description:
      "Our signature graphic tee celebrating art galleries and quiet culture. Oversized drop-shoulder cut on 240gsm ring-spun cotton, garment-washed for maximum comfort.",
    details: [
      "240gsm ring-spun cotton",
      "Oversized drop-shoulder fit",
      "Art Galleries front print",
      "Garment washed",
    ],
    fabric: "100% ring-spun cotton",
    gsm: 240,
    fit: "Oversized, drop-shoulder — size down for a fitted look, wear true to size for the full silhouette.",
    washCare: [
      "Machine wash cold, inside out",
      "Do not bleach",
      "Tumble dry low or line dry",
      "Warm iron only if needed, avoid the print",
    ],
    stock: { XS: 3, S: 5, M: 4, L: 3, XL: 2 },
  },
  {
    slug: "yeoubi-ringer-tee",
    name: "Yeoubi Ringer Tee",
    code: "N°02",
    price: "Rs. 799.00",
    originalPrice: "Rs. 1,270.00",
    img: ringerFront,
    imgBack: ringerBack,
    ratio: "aspect-[3/4]",
    description:
      "A classic contrast ringer silhouette on a heavyweight 240gsm blank. Unisex boxy fit, ribbed crew neck, pre-washed for effortless drape.",
    details: [
      "240gsm ring-spun cotton",
      "Boxy unisex ringer fit",
      "Pre-washed for softness",
    ],
    fabric: "100% ring-spun cotton",
    gsm: 240,
    fit: "Boxy, unisex — true to size at the shoulder with a relaxed body.",
    washCare: [
      "Machine wash cold, inside out",
      "Do not bleach",
      "Tumble dry low or line dry",
      "Warm iron only if needed",
    ],
    stock: { XS: 2, S: 4, M: 5, L: 3, XL: 1 },
  },
  {
    slug: "archive-project-tee",
    name: "Archive Project Tee",
    code: "N°03",
    price: "Rs. 899.00",
    originalPrice: "Rs. 1,050.00",
    img: archiveFront,
    imgBack: archiveBack,
    ratio: "aspect-[3/4]",
    description:
      "Vintage-washed earth canvas carrying our studio archive print. Heavy weight, heavy feel, built to outlast the season.",
    details: [
      "240gsm ring-spun cotton",
      "Vintage-washed earth tone",
      "Studio archive print",
      "Garment dyed & washed",
    ],
    fabric: "100% ring-spun cotton",
    gsm: 240,
    fit: "Relaxed fit — shoulders sit slightly dropped, body hangs loose.",
    washCare: [
      "Machine wash cold, inside out",
      "Do not bleach",
      "Tumble dry low or line dry",
      "Warm iron only if needed, avoid the print",
    ],
    stock: { XS: 1, S: 3, M: 4, L: 4, XL: 2 },
  },
];

export function getPieceBySlug(slug: string): Piece | undefined {
  return pieces.find((p) => p.slug === slug);
}
