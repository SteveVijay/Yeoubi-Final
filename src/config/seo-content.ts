/**
 * YEOUBI — Centralized SEO & Metadata Configuration
 * 
 * Edit this file to manually update any SEO title, description, keywords,
 * OpenGraph attributes, or search engine metadata across the entire website.
 */

export type PageSeoMeta = {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
};

/** Global brand and site default metadata */
export const SITE_SEO_CONFIG = {
  brandName: "YEOUBI",
  brandKorean: "여우비",
  tagline: "Quiet garments, restless people.",
  siteUrl: "https://yeoubi.in",
  defaultOgImage: "https://yeoubi.in/og-image.jpg",
  twitterHandle: "@yeoubi_inc",
  instagramHandle: "yeoubi.inc",
  contactEmail: "yeoubi.inc@gmail.com",
  country: "India",
  locale: "en_IN",
  themeColor: "#161514",

  /** Default fallback keywords across the entire site */
  globalKeywords: [
    "YEOUBI",
    "Yeoubi streetwear",
    "여우비",
    "unisex streetwear India",
    "heavyweight cotton tees",
    "240 GSM t-shirts",
    "minimalist clothing brand",
    "quiet garments restless people",
    "independent fashion studio India",
    "boxy fit t-shirts",
    "small run streetwear drops",
    "Kerala streetwear label",
  ],
};

/**
 * Static Page Metadata Configuration
 * Customize titles, meta descriptions, and keywords for every main route here.
 */
export const PAGES_SEO: Record<string, PageSeoMeta> = {
  home: {
    title: "YEOUBI - Unisex Streetwear & Heavyweight Tees | Chapter 01",
    description:
      "YEOUBI is an independent unisex streetwear label from India. Chapter 01 features 240 GSM ring-spun heavyweight cotton tees — Signature Art Galleries, Ringer, and Archive Project. Small runs, everyday, minimalist.",
    keywords: [
      "YEOUBI streetwear",
      "unisex streetwear India",
      "heavyweight cotton tees",
      "240 GSM t-shirts",
      "Chapter 01 drop",
      "Signature Art Galleries tee",
      "Yeoubi ringer tee",
      "Archive project tee",
      "minimalist boxy tees",
    ],
  },
  studio: {
    title: "Studio — Brand Philosophy, Craftsmanship & Culture | YEOUBI",
    description:
      "Inside the YEOUBI studio. Discover the Korean story of Yeoubi (sunshower), 240 GSM fabric engineering, small-batch manufacturing, and quiet streetwear culture.",
    keywords: [
      "YEOUBI studio",
      "Korean sunshower meaning",
      "streetwear brand philosophy",
      "heavyweight fabric engineering",
      "small run apparel manufacturing",
      "Indian streetwear label story",
    ],
  },
  stockists: {
    title: "Stockists & Drop 02 Countdown | YEOUBI Studio",
    description:
      "YEOUBI is an online-only independent streetwear studio. Count down to Drop 02, get drop list notifications, and find official release details.",
    keywords: [
      "YEOUBI stockists",
      "YEOUBI drop 02 countdown",
      "buy YEOUBI online",
      "streetwear release dates India",
      "drop list signup",
    ],
  },
  journalIndex: {
    title: "Journal — Studio Process Notes & Brand Story | YEOUBI",
    description:
      "Read process notes, design stories, fabric research, and the four-year journey of building YEOUBI from Kerala to the world.",
    keywords: [
      "YEOUBI journal",
      "building a streetwear brand",
      "clothing studio blog",
      "four years to begin Yeoubi",
      "fashion founder story India",
    ],
  },
  sizeChart: {
    title: "Size Chart & Fit Guide — Heavyweight Boxy Tees | YEOUBI",
    description:
      "Detailed size guide and garment measurements for YEOUBI Chapter 01 unisex tees. Check chest width, shoulder drop, and length specs.",
    keywords: [
      "YEOUBI size guide",
      "heavyweight tee size chart",
      "oversized boxy fit measurements",
      "unisex t-shirt size guide",
    ],
  },
  shippingReturns: {
    title: "Shipping, Tracking & Easy Returns Policy | YEOUBI",
    description:
      "Everything about YEOUBI pan-India shipping timelines, dispatch updates, order tracking, and hassle-free returns & replacement terms.",
    keywords: [
      "YEOUBI shipping policy",
      "pan India clothing delivery",
      "streetwear returns policy",
      "YEOUBI order tracking",
    ],
  },
  contact: {
    title: "Contact YEOUBI Studio — Customer Care & Collaborations",
    description:
      "Get in touch with the YEOUBI team for order help, sizing questions, press inquiries, and creative streetwear collaborations.",
    keywords: [
      "contact YEOUBI",
      "YEOUBI customer support",
      "YEOUBI email",
      "streetwear collaboration India",
    ],
  },
  orderProcess: {
    title: "Order Process & Direct Purchasing Guide | YEOUBI",
    description:
      "How ordering works at YEOUBI studio. Step-by-step guide to securing your size in our limited small-run drops.",
    keywords: [
      "how to buy YEOUBI",
      "YEOUBI order guide",
      "small run streetwear purchase",
    ],
  },
  payment: {
    title: "Payment Methods & Order Confirmation | YEOUBI",
    description:
      "Accepted payment options at YEOUBI studio including UPI, net banking, and direct manual order confirmation.",
    keywords: [
      "YEOUBI payment options",
      "UPI payment streetwear",
      "secure checkout Yeoubi",
    ],
  },
};

/**
 * Helper to build custom meta objects for Product pages
 */
export function getProductSeo(piece: {
  name: string;
  description: string;
  price: string;
  code: string;
  fabric: string;
  gsm: number;
  slug: string;
  img: string;
}): PageSeoMeta & { jsonLd: object } {
  const title = `${piece.name} (${piece.code}) — 240 GSM Heavyweight Tee | YEOUBI`;
  const description = `${piece.name}: ${piece.description} ${piece.gsm} GSM ${piece.fabric}. Unisex boxy fit. Price: ${piece.price}. Limited small run.`;
  const fullUrl = `${SITE_SEO_CONFIG.siteUrl}/product/${piece.slug}`;

  // Extract numeric price for Schema.org
  const numericPrice = piece.price.replace(/[^0-9.]/g, "") || "899";

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: piece.name,
    image: [piece.img],
    description: piece.description,
    sku: piece.code,
    brand: {
      "@type": "Brand",
      name: SITE_SEO_CONFIG.brandName,
    },
    offers: {
      "@type": "Offer",
      url: fullUrl,
      priceCurrency: "INR",
      price: numericPrice,
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: SITE_SEO_CONFIG.brandName,
      },
    },
    material: piece.fabric,
    category: "Apparel > Clothing > Shirts & Tops",
  };

  return {
    title,
    description,
    keywords: [
      piece.name,
      piece.code,
      `${piece.gsm} GSM tee`,
      piece.fabric,
      "YEOUBI product",
      "buy heavyweight tee India",
    ],
    jsonLd,
  };
}

/**
 * Helper to build custom meta objects for Journal article pages
 */
export function getJournalEntrySeo(entry: {
  title: string;
  tagline: string;
  number: string;
  slug: string;
}): PageSeoMeta & { jsonLd: object } {
  const title = `${entry.title} — Journal Entry ${entry.number} | YEOUBI`;
  const description = `${entry.title}: ${entry.tagline} Notes from the YEOUBI studio.`;
  const fullUrl = `${SITE_SEO_CONFIG.siteUrl}/journal/${entry.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: entry.title,
    description: entry.tagline,
    url: fullUrl,
    author: {
      "@type": "Organization",
      name: SITE_SEO_CONFIG.brandName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_SEO_CONFIG.brandName,
      url: SITE_SEO_CONFIG.siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
  };

  return {
    title,
    description,
    keywords: [
      entry.title,
      `YEOUBI entry ${entry.number}`,
      "YEOUBI journal",
      "streetwear studio notes",
    ],
    jsonLd,
  };
}

/**
 * Schema.org Organization JSON-LD script content
 */
export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_SEO_CONFIG.brandName,
  alternateName: SITE_SEO_CONFIG.brandKorean,
  url: SITE_SEO_CONFIG.siteUrl,
  logo: `${SITE_SEO_CONFIG.siteUrl}/favicon.ico`,
  description: SITE_SEO_CONFIG.defaultDescription,
  sameAs: [
    `https://instagram.com/${SITE_SEO_CONFIG.instagramHandle}`,
    SITE_SEO_CONFIG.siteUrl,
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: SITE_SEO_CONFIG.contactEmail,
    contactType: "customer service",
    availableLanguage: ["English"],
  },
};

/**
 * Schema.org WebSite JSON-LD script content
 */
export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_SEO_CONFIG.brandName,
  url: SITE_SEO_CONFIG.siteUrl,
  description: SITE_SEO_CONFIG.tagline,
};
