import { SIZES, type Size } from "@/data/pieces";

export type SizeRow = {
  size: Size;
  chest: number;
  length: number;
  sleeve?: number;
};

/** Tees — chest & body length, in centimetres. */
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
    title: "Sleeve (longsleeve only)",
    body: "Measure from the shoulder seam, along the outside of the arm, to the end of the cuff.",
  },
] as const;

export const SIZE_HELP_NOTE =
  "All measurements are in inches and taken flat, garment-to-garment. If you're between two sizes, we cut boxy — size down for a closer fit, true-to-size or up for room to layer.";

export { SIZES };
