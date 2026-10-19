import artGalleriesFront from "@/assets/1000821429.webp";
import artGalleriesBack from "@/assets/1000821423.webp";

import ringerFront from "@/assets/1000821437.webp";
import ringerBack from "@/assets/1000821422.webp";

import archiveFront from "@/assets/1000821428.webp";
import archiveBack from "@/assets/1000821421.webp";

// Drop 2 Assets
import creatorPinkFront from "@/assets/drop2/creator-pink-front.webp";
import creatorPinkBack from "@/assets/drop2/creator-pink-back.webp";

import creatorBlueFront from "@/assets/drop2/creator-blue-front.webp";
import creatorBlueBack from "@/assets/drop2/creator-blue-back.webp";

import playboiWhiteFront from "@/assets/drop2/playboi-white-front.webp";
import playboiWhiteBack from "@/assets/drop2/playboi-white-back.webp";

import playboiButterFront from "@/assets/drop2/playboi-butter-front.webp";
import playboiButterBack from "@/assets/drop2/playboi-butter-back.webp";

import brotherhoodScarf from "@/assets/drop2/brotherhood-scarf.webp";
import algaeScarf from "@/assets/drop2/algae-scarf.webp";
import leopardRosetteScarf from "@/assets/drop2/leopard-rosette-scarf.webp";
import rainingCatsScarf from "@/assets/drop2/raining-cats-and-dogs-scarf.webp";

/** Available sizes across apparel pieces. */
export const SIZES = ["XS", "S", "M", "L", "XL", "2XL"] as const;
export type Size = (typeof SIZES)[number];

export const SCARF_SIZES = ["55×55 cm", "80×80 cm"] as const;
export type ScarfSize = (typeof SCARF_SIZES)[number];

export type PieceCategory = "tees" | "scarves";
export type DropChapter = "drop-01" | "drop-02";

export type Piece = {
  /** URL-safe identifier used for the dedicated product page: /product/$slug */
  slug: string;
  name: string;
  /** Human-readable piece code, e.g. "N°01" */
  code: string;
  /** Drop identifier */
  drop: DropChapter;
  dropLabel: string;
  category: PieceCategory;
  /** Sale / current display price in INR */
  price: string;
  /** Original / MRP — shown struck-through alongside the sale price */
  originalPrice?: string;
  img: string;
  /**
   * Optional back-view photo.
   */
  imgBack?: string;
  /** Custom Tailwind classes for the front image (e.g. scale-[1.2]) */
  imageClass?: string;
  /** Custom Tailwind classes for the back image (e.g. scale-[0.9]) */
  imageClassBack?: string;
  /** Tailwind aspect-ratio class */
  ratio: string;
  description: string;
  details: string[];
  fabric: string;
  designAndFeel?: string;
  quality?: string;
  gsm?: number;
  fit: string;
  washCare: string[];
  availableSizes: string[];
  /** Per-size stock count. 0 = out of stock. */
  stock: Record<string, number>;
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
  // ==========================================
  // DROP 02 (DRP'01-02) — TEES (Rs. 799)
  // ==========================================
  {
    slug: "creator-tee-pink",
    name: "Creator Tee — Pink (CMIYGL)",
    code: "N°04",
    drop: "drop-02",
    dropLabel: "Drop 02 · Heated Drop",
    category: "tees",
    price: "Rs. 799.00",
    originalPrice: "Rs. 1,199.00",
    img: creatorPinkFront,
    imgBack: creatorPinkBack,
    imageClass: "scale-[1.2]",
    imageClassBack: "scale-[1.1]",
    ratio: "aspect-[3/4]",
    description:
      "Tyler portrait on the chest with 'CALL ME IF YOU GET LOST' star graphic on the back. Heavyweight 240gsm cotton cut in an oversized drape.",
    details: [
      "240gsm ring-spun cotton",
      "Oversized drop-shoulder fit",
      "Tyler The Creator portrait front print",
      "CALL ME IF YOU GET LOST star back print",
      "Garment washed for soft vintage feel",
    ],
    fabric: "100% ring-spun cotton",
    gsm: 240,
    fit: "Oversized, drop-shoulder — true to size for signature oversized streetwear fit.",
    washCare: [
      "Machine wash cold, inside out",
      "Do not bleach",
      "Tumble dry low or line dry",
      "Warm iron only if needed, avoid the print",
    ],
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL"],
    stock: { XS: 3, S: 5, M: 6, L: 4, XL: 2, "2XL": 2 },
  },
  {
    slug: "creator-tee-blue",
    name: "Creator Tee — Sky Blue",
    code: "N°05",
    drop: "drop-02",
    dropLabel: "Drop 02 · Heated Drop",
    category: "tees",
    price: "Rs. 799.00",
    originalPrice: "Rs. 1,199.00",
    img: creatorBlueFront,
    imgBack: creatorBlueBack,
    ratio: "aspect-[3/4]",
    description:
      "Minimalist 'Y' chest logo with 'dress well stay weird make art confuse people' manifesto typography across the back. Cut from 240gsm sky blue cotton.",
    details: [
      "240gsm ring-spun cotton",
      "Oversized drop-shoulder silhouette",
      "Center 'Y' emblem on chest",
      "'Dress well stay weird' back statement print",
    ],
    fabric: "100% ring-spun cotton",
    gsm: 240,
    fit: "Oversized, unisex streetwear cut — true to size with relaxed drape.",
    washCare: [
      "Machine wash cold, inside out",
      "Do not bleach",
      "Tumble dry low or line dry",
      "Warm iron only if needed, avoid print",
    ],
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL"],
    stock: { XS: 2, S: 4, M: 5, L: 5, XL: 3, "2XL": 2 },
  },
  {
    slug: "playboi-tee-white",
    name: "Playboi Tee — White (I AM MUSIC)",
    code: "N°06",
    drop: "drop-02",
    dropLabel: "Drop 02 · Heated Drop",
    category: "tees",
    price: "Rs. 799.00",
    originalPrice: "Rs. 1,199.00",
    img: playboiWhiteFront,
    imgBack: playboiWhiteBack,
    imageClass: "scale-[1.1]",
    imageClassBack: "scale-[1.1]",
    ratio: "aspect-[3/4]",
    description:
      "Layered typography 'I AM MUSIC' on the chest with the bold Carti silhouette & playboi typography across the back on clean optical white.",
    details: [
      "240gsm ring-spun cotton",
      "I AM MUSIC front chest print",
      "Carti silhouette back print",
      "Heavyweight structured drape",
    ],
    fabric: "100% ring-spun cotton",
    gsm: 240,
    fit: "Oversized streetwear fit — relaxed shoulder drop and structured collar.",
    washCare: [
      "Machine wash cold, inside out",
      "Do not bleach",
      "Tumble dry low or line dry",
      "Warm iron only if needed, avoid the print",
    ],
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL"],
    stock: { XS: 3, S: 6, M: 6, L: 4, XL: 2, "2XL": 2 },
  },
  {
    slug: "playboi-tee-butter",
    name: "Boring Baby Tee — Butter Cream",
    code: "N°07",
    drop: "drop-02",
    dropLabel: "Drop 02 · Heated Drop",
    category: "tees",
    price: "Rs. 799.00",
    originalPrice: "Rs. 1,199.00",
    img: playboiButterFront,
    imgBack: playboiButterBack,
    imageClass: "translate-y-4",
    imageClassBack: "-translate-y-2",
    ratio: "aspect-[3/4]",
    description:
      "'im boring baby, all i do is make money and come home.' typography in scarlet red over rich vintage butter cream blank.",
    details: [
      "240gsm heavyweight cotton",
      "Butter cream vintage base",
      "Red statement chest typography",
      "Clean minimal reverse",
    ],
    fabric: "100% ring-spun cotton",
    gsm: 240,
    fit: "Oversized streetwear cut — comfortable drape for everyday wear.",
    washCare: [
      "Machine wash cold, inside out",
      "Do not bleach",
      "Tumble dry low or line dry",
      "Warm iron only if needed, avoid the print",
    ],
    availableSizes: ["XS", "S", "M", "L", "XL", "2XL"],
    stock: { XS: 2, S: 5, M: 5, L: 3, XL: 2, "2XL": 2 },
  },

  // ==========================================
  // DROP 02 (DRP'01-02) — SATIN SCARVES (Rs. 299)
  // ==========================================
  {
    slug: "brotherhood-scarf",
    name: "Brotherhood Scarf",
    code: "N°08",
    drop: "drop-02",
    dropLabel: "Drop 02 · Heated Drop",
    category: "scarves",
    price: "Rs. 249.00 - Rs. 299.00",
    originalPrice: "Rs. 599.00",
    img: brotherhoodScarf,
    ratio: "aspect-square",
    description:
      "Heritage crest and archival typography in deep forest green. Cut from lustrous premium satin with hand-rolled edges. Multi-use accessory for head, neck, wrist, or bag.",
    details: [
      "Crafted from poly-woven satin with silk-like smoothness",
      "Soft, flowy, and gentle on the skin — drapes beautifully",
      "Fade-proof archival crest & typography print",
      "Durable weave for lasting wear across two square sizes",
    ],
    fabric: "Crafted from poly-woven satin, offering a silk-like smoothness with lightweight comfort.",
    designAndFeel: "Soft, flowy, and gentle on the skin, it drapes beautifully for a refined look.",
    quality: "Fade-proof prints keep colors vibrant, while the durable weave ensures lasting wear.",
    fit: "Square scarf — available in 55×55 cm (bandana/neck tie) and 80×80 cm (full head wrap/shawl).",
    washCare: [
      "Hand wash cold with mild detergent",
      "Do not wring or twist",
      "Dry flat in shade",
      "Low heat iron or steam gently on reverse",
    ],
    availableSizes: ["55×55 cm", "80×80 cm"],
    stock: { "55×55 cm": 8, "80×80 cm": 6 },
  },
  {
    slug: "algae-scarf",
    name: "Algae Scarf",
    code: "N°09",
    drop: "drop-02",
    dropLabel: "Drop 02 · Heated Drop",
    category: "scarves",
    price: "Rs. 249.00 - Rs. 299.00",
    originalPrice: "Rs. 599.00",
    img: algaeScarf,
    ratio: "aspect-square",
    description:
      "16-panel geometric art grid featuring celestial, botanical and wavy abstract elements in terracotta red and soft cream satin.",
    details: [
      "Crafted from poly-woven satin with silk-like smoothness",
      "16-tile illustrated grid art on soft, flowy drape",
      "Fade-proof prints keep colors vibrant with durable weave",
      "Two square dimensions: 55×55 cm & 80×80 cm",
    ],
    fabric: "Crafted from poly-woven satin, offering a silk-like smoothness with lightweight comfort.",
    designAndFeel: "Soft, flowy, and gentle on the skin, it drapes beautifully for a refined look.",
    quality: "Fade-proof prints keep colors vibrant, while the durable weave ensures lasting wear.",
    fit: "Square scarf — available in 55×55 cm (bandana/neck tie) and 80×80 cm (full head wrap/shawl).",
    washCare: [
      "Hand wash cold with mild detergent",
      "Do not wring or twist",
      "Dry flat in shade",
      "Low heat iron or steam gently on reverse",
    ],
    availableSizes: ["55×55 cm", "80×80 cm"],
    stock: { "55×55 cm": 10, "80×80 cm": 7 },
  },
  {
    slug: "raining-cats-and-dogs-scarf",
    name: "Raining Cats and Dogs Scarf",
    code: "N°10",
    drop: "drop-02",
    dropLabel: "Drop 02 · Heated Drop",
    category: "scarves",
    price: "Rs. 249.00 - Rs. 299.00",
    originalPrice: "Rs. 599.00",
    img: rainingCatsScarf,
    imageClass: "scale-[0.7]",
    ratio: "aspect-square",
    description:
      "Playful pool-floating cats illustration with celestial stars and summer motifs in vibrant cobalt blue satin.",
    details: [
      "Crafted from poly-woven satin with silk-like smoothness",
      "Playful poolside cat illustration with vibrant colors",
      "Fade-proof prints with durable weave for lasting wear",
      "Two square dimensions: 55×55 cm & 80×80 cm",
    ],
    fabric: "Crafted from poly-woven satin, offering a silk-like smoothness with lightweight comfort.",
    designAndFeel: "Soft, flowy, and gentle on the skin, it drapes beautifully for a refined look.",
    quality: "Fade-proof prints keep colors vibrant, while the durable weave ensures lasting wear.",
    fit: "Square scarf — available in 55×55 cm (bandana/neck tie) and 80×80 cm (full head wrap/shawl).",
    washCare: [
      "Hand wash cold with mild detergent",
      "Do not wring or twist",
      "Dry flat in shade",
      "Low heat iron or steam gently on reverse",
    ],
    availableSizes: ["55×55 cm", "80×80 cm"],
    stock: { "55×55 cm": 9, "80×80 cm": 5 },
  },
  {
    slug: "leopard-rosette-scarf",
    name: "Leopard Rosette Scarf",
    code: "N°11",
    drop: "drop-02",
    dropLabel: "Drop 02 · Heated Drop",
    category: "scarves",
    price: "Rs. 249.00 - Rs. 299.00",
    originalPrice: "Rs. 599.00",
    img: leopardRosetteScarf,
    imageClass: "scale-[0.7]",
    ratio: "aspect-square",
    description:
      "Rich animal rosette floral texture in warm earthy brown tones. Premium satin drape with subtle sheen for versatile styling.",
    details: [
      "Crafted from poly-woven satin with silk-like smoothness",
      "Allover leopard rosette micro-print in earthy tones",
      "Fade-proof prints with durable weave for lasting wear",
      "Two square dimensions: 55×55 cm & 80×80 cm",
    ],
    fabric: "Crafted from poly-woven satin, offering a silk-like smoothness with lightweight comfort.",
    designAndFeel: "Soft, flowy, and gentle on the skin, it drapes beautifully for a refined look.",
    quality: "Fade-proof prints keep colors vibrant, while the durable weave ensures lasting wear.",
    fit: "Square scarf — available in 55×55 cm (bandana/neck tie) and 80×80 cm (full head wrap/shawl).",
    washCare: [
      "Hand wash cold with mild detergent",
      "Do not wring or twist",
      "Dry flat in shade",
      "Low heat iron or steam gently on reverse",
    ],
    availableSizes: ["55×55 cm", "80×80 cm"],
    stock: { "55×55 cm": 12, "80×80 cm": 8 },
  },

  // ==========================================
  // DROP 01 — YEOUBI ORIGINALS (Chapter 01)
  // ==========================================
  {
    slug: "signature-tee-art-galleries",
    name: "Signature Tee — Art Galleries",
    code: "N°01",
    drop: "drop-01",
    dropLabel: "Chapter 01 · Yeoubi Originals",
    category: "tees",
    price: "Rs. 899.00",
    originalPrice: "Rs. 1,299.00",
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
    availableSizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 3, S: 5, M: 4, L: 3, XL: 2 },
  },
  {
    slug: "yeoubi-ringer-tee",
    name: "Yeoubi Ringer Tee",
    code: "N°02",
    drop: "drop-01",
    dropLabel: "Chapter 01 · Yeoubi Originals",
    category: "tees",
    price: "Rs. 799.00",
    originalPrice: "Rs. 999.00",
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
    availableSizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 2, S: 4, M: 5, L: 3, XL: 1 },
  },
  {
    slug: "archive-project-tee",
    name: "Archive Project Tee",
    code: "N°03",
    drop: "drop-01",
    dropLabel: "Chapter 01 · Yeoubi Originals",
    category: "tees",
    price: "Rs. 899.00",
    originalPrice: "Rs. 1,199.00",
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
    availableSizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 1, S: 3, M: 4, L: 4, XL: 2 },
  },
];

export function getPieceBySlug(slug: string): Piece | undefined {
  return pieces.find((p) => p.slug === slug);
}
