import { type Metadata } from "next"
import Link from "next/link"

import { siteConfig } from "@/lib/config"
import { Announcement } from "@/components/announcement"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Button } from "@/styles/radix-luma/ui/button"

const title = "Observe. Understand. Preserve."
const metadataTitle = `${siteConfig.name} — ${title}`
const description = siteConfig.description

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  alternateName: ["Moonwitness UI", "MW-UI"],
  description: siteConfig.description,
  inLanguage: "en",
  sameAs: [siteConfig.links.github],
}

export const dynamic = "force-static"
export const revalidate = false

export const metadata: Metadata = {
  title: { absolute: metadataTitle },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: metadataTitle,
    description,
    siteName: siteConfig.name,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: metadataTitle,
    description,
    images: [siteConfig.ogImage],
  },
}

const foundations = [
  {
    title: "Accessible foundations",
    description:
      "Composable interface primitives with semantic markup, keyboard behavior, visible focus, and responsive defaults.",
  },
  {
    title: "Evidence-aware patterns",
    description:
      "Clear ways to present source identity, provenance, attribution, uncertainty, and review state without inventing facts.",
  },
  {
    title: "Open and adaptable code",
    description:
      "A practical component and registry workflow that teams can inspect, customize, extend, and evolve.",
  },
]

export default function IndexPage() {
  return (
    <div className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PageHeader className="md:**:[.container]:pb-8 lg:**:[.container]:pb-12">
        <Announcement />
        <PageHeaderHeading className="max-w-4xl">{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button asChild className="h-[35px]">
            <Link href="/docs/moonwitness-ui">Explore the vision</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/docs/components">Explore components</Link>
          </Button>
        </PageActions>
      </PageHeader>
      <section
        aria-labelledby="foundation-heading"
        className="container-wrapper flex-1 border-t border-border/60"
      >
        <div className="container grid gap-8 py-12 md:grid-cols-3 md:py-16">
          <div className="md:col-span-3">
            <p className="text-sm font-medium tracking-[0.18em] text-[var(--mw-accent)] uppercase">
              Evidence-First Moonpunk
            </p>
            <h2
              id="foundation-heading"
              className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
            >
              One ecosystem. Different experiences. Shared principles.
            </h2>
          </div>
          {foundations.map((item) => (
            <article key={item.title} className="border-t border-border pt-5">
              <h3 className="text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
