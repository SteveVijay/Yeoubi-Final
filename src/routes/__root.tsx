import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/lib/cart-context";
import { CustomScrollbar } from "@/components/site/custom-scrollbar";

import { SITE_SEO_CONFIG, ORGANIZATION_JSON_LD, WEBSITE_JSON_LD } from "@/config/seo-content";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="label">404 — Not Found</p>
        <h1 className="text-display mt-6 text-6xl">Off the map.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          This page has drifted out of the collection.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="label border-b border-foreground pb-1 text-foreground hover:text-accent"
          >
            → Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="label">Error</p>
        <h1 className="text-display mt-6 text-5xl">Something snapped.</h1>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="label border-b border-foreground pb-1 hover:text-accent"
          >
            → Try again
          </button>
          <a
            href="/"
            className="label border-b border-muted-foreground pb-1 text-muted-foreground hover:text-foreground"
          >
            → Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_SEO_CONFIG.defaultTitle },
      { name: "description", content: SITE_SEO_CONFIG.defaultDescription },
      { name: "keywords", content: SITE_SEO_CONFIG.globalKeywords.join(", ") },
      { name: "author", content: SITE_SEO_CONFIG.brandName },
      { name: "theme-color", content: SITE_SEO_CONFIG.themeColor },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: SITE_SEO_CONFIG.defaultTitle },
      { property: "og:description", content: SITE_SEO_CONFIG.defaultDescription },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_SEO_CONFIG.brandName },
      { property: "og:locale", content: SITE_SEO_CONFIG.locale },
      { property: "og:image", content: SITE_SEO_CONFIG.defaultOgImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: SITE_SEO_CONFIG.twitterHandle },
      { name: "twitter:title", content: SITE_SEO_CONFIG.defaultTitle },
      { name: "twitter:description", content: SITE_SEO_CONFIG.defaultDescription },
      { name: "twitter:image", content: SITE_SEO_CONFIG.defaultOgImage },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "canonical", href: SITE_SEO_CONFIG.siteUrl },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_JSON_LD),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(WEBSITE_JSON_LD),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (window.self !== window.top) {
                  window.top.location.href = window.location.href;
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Outlet />
        <CustomScrollbar />
        <Toaster position="bottom-right" />
      </CartProvider>
    </QueryClientProvider>
  );
}
