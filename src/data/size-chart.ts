import { SIZES, type Size } from "@/data/pieces";

export type SizeRow = {
  size: Size | string;
  chest: number;
  length: number;
  shoulder?: number;
  sleeve?: number;
};

export type ScarfSizeRow = {
  size: string;
  dimensionsCm: string;
  dimensionsInches: string;
  recommendedUse: string;
};

/** Drop 02 Tees — Unisex Oversized Fit (Chest, Length & Shoulder in inches). */
export const DROP2_TEE_SIZE_CHART: SizeRow[] = [
  { size: "XS", chest: 40, length: 27, shoulder: 18 },
  { size: "S", chest: 42, length: 28, shoulder: 19 },
  { size: "M", chest: 44, length: 29, shoulder: 20 },
  { size: "L", chest: 46, length: 30, shoulder: 21 },
  { size: "XL", chest: 48, length: 31, shoulder: 22 },
  { size: "2XL", chest: 50, length: 32, shoulder: 23 },
];

/** Drop 01 Tees — Boxy Fit (Chest & Length in inches). */
export const TEE_SIZE_CHART: SizeRow[] = [
  { size: "XS", chest: 40, length: 24 },
  { size: "S", chest: 42, length: 25 },
  { size: "M", chest: 44, length: 26 },
  { size: "L", chest: 46, length: 27 },
  { size: "XL", chest: 48, length: 28 },
];

/** Longsleeve — chest, body length & sleeve length, in centimetres. */
export const LONGSLEEVE_SIZE_CHART: SizeRow[] = [
  { size: "XS", chest: 96, length: 67, sleeve: 60 },
  { size: "S", chest: 101, length: 69, sleeve: 61 },
  { size: "M", chest: 106, length: 71, sleeve: 62 },
  { size: "L", chest: 111, length: 73, sleeve: 63 },
  { size: "XL", chest: 116, length: 75, sleeve: 64 },
];

/** Satin Scarves — dimensions & styling guide. */
export const SCARF_SIZE_CHART: ScarfSizeRow[] = [
  {
    size: "55×55 cm",
    dimensionsCm: "55 × 55 cm",
    dimensionsInches: '21.6" × 21.6"',
    recommendedUse: "Bandana, neckerchief, wrist wrap, handbag accessory",
  },
  {
    size: "80×80 cm",
    dimensionsCm: "80 × 80 cm",
    dimensionsInches: '31.5" × 31.5"',
    recommendedUse: "Full head wrap, draped neck scarf, bandana top, light shawl",
  },
];

export const HOW_TO_MEASURE = [
  {
    title: "Chest",
    body: "Lay a tee you already own flat. Measure straight across from armpit to armpit, then double it. Compare that number to the chest column.",
  },
  {
    title: "Length",
    body: "Measure from the highest point of the shoulder seam straight down to the bottom hem.",
  },
  {
    title: "Shoulder",
    body: "Measure straight across the back from the edge of one shoulder seam to the other.",
  },
  {
    title: "Scarves",
    body: "55×55 cm is ideal for classic bandana styling or neck ties. 80×80 cm offers generous length for head scarves, shawl drapes, and layered wear.",
  },
] as const;

export const SIZE_HELP_NOTE =
  "Drop 02 tees run in an oversized streetwear fit, while Drop 01 features a classic boxy cut. For a closer look, size down. For scarves, choose 55×55 cm for everyday bandana styling or 80×80 cm for full head-wrap / draped styling.";

export { SIZES };
