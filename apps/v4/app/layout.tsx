import type { Metadata } from "next"
import { cn } from "cn"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { META_THEME_COLORS, siteConfig } from "@/lib/config"
import { DOCS_SIDEBAR_SCROLL_RESTORE_SCRIPT } from "@/lib/docs-sidebar-scroll"
import { fontVariables } from "@/lib/fonts"
import { ActiveThemeProvider } from "@/components/active-theme"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider as BaseTooltipProvider } from "@/registry/bases/base/ui/tooltip"
import { Toaster } from "@/registry/bases/radix/ui/sonner"
import { TooltipProvider as RadixTooltipProvider } from "@/registry/bases/radix/ui/tooltip"
import { Toaster as BaseToaster } from "@/styles/base-nova/ui/toast"

import "@/app/globals.css"
import "@/app/(app)/(typeset)/typeset.css"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Moonwitness UI",
    "Evidence-First Moonpunk",
    "React",
    "Next.js",
    "Tailwind CSS",
    "accessible components",
    "design system",
  ],
  authors: [
    {
      name: "Moonwitness UI",
      url: siteConfig.repository,
    },
  ],
  creator: "Moonwitness UI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Moonwitness UI — Observe. Understand. Preserve.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  manifest: "/site.webmanifest",
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        fontVariables,
        "[--header-height:calc(var(--spacing)*14)] lg:[--header-height:calc(var(--spacing)*16)]"
      )}
    >
      <head>
        <meta name="theme-color" content={META_THEME_COLORS.light} />
        <script
          dangerouslySetInnerHTML={{
            __html: DOCS_SIDEBAR_SCROLL_RESTORE_SCRIPT,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "group/body overscroll-none antialiased [--footer-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]"
        )}
      >
        <ThemeProvider>
          <ActiveThemeProvider>
            <NuqsAdapter>
              <BaseTooltipProvider delay={0}>
                <RadixTooltipProvider delayDuration={0}>
                  {children}
                  <Toaster position="top-center" />
                  <BaseToaster />
                </RadixTooltipProvider>
              </BaseTooltipProvider>
            </NuqsAdapter>
            <TailwindIndicator />
          </ActiveThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
