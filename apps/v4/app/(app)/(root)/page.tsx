import { type Metadata } from "next"
import Link from "next/link"

import { MoonwitnessMark } from "@/components/moonwitness-mark"
import { siteConfig } from "@/lib/config"

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

const principles = [
  {
    number: "01",
    title: "Clarity before spectacle",
    description:
      "Interfaces that make complex information easier to navigate, understand, and question.",
    accent: "signal",
  },
  {
    number: "02",
    title: "Evidence stays visible",
    description:
      "Patterns for source identity, provenance, attribution, uncertainty, and review state.",
    accent: "moon",
  },
  {
    number: "03",
    title: "Open by design",
    description:
      "Composable foundations that teams can inspect, adapt, extend, and make their own.",
    accent: "orbit",
  },
]

export default function IndexPage() {
  return (
    <div className="mw-home flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="mw-hero" aria-labelledby="home-title">
        <div className="mw-hero-grid" aria-hidden="true" />
        <div className="container mw-hero-inner">
          <div className="mw-hero-copy">
            <div className="mw-eyebrow">
              <span className="mw-eyebrow-dot" />
              THE INTERFACE LANGUAGE OF A LIVING KNOWLEDGE ECOSYSTEM
            </div>
            <h1 id="home-title" aria-label={title} className="mw-hero-title">
              {title.split(". ").map((word, index) => (
                <span key={word} aria-hidden="true" className={index === 2 ? "mw-title-accent" : undefined}>
                  {word}{index < 2 ? "." : ""}
                </span>
              ))}
            </h1>
            <p className="mw-hero-description">
              A thoughtful interface foundation for experiences where knowledge
              is explored, context is respected, and evidence remains inspectable.
            </p>
            <div className="mw-hero-actions">
              <Link href="/docs/moonwitness-ui" className="mw-button mw-button-primary">
                Discover the philosophy
                <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/docs/components" className="mw-button mw-button-secondary">
                Explore components
              </Link>
            </div>
            <div className="mw-hero-note">
              <span className="mw-note-rule" />
              OPEN SOURCE <span aria-hidden="true">·</span> ACCESSIBLE FOUNDATIONS
              <span aria-hidden="true">·</span> EVIDENCE-AWARE DESIGN
            </div>
          </div>

          <div className="mw-hero-art" role="img" aria-label="Moonwitness crescent and orbit emblem">
            <div className="mw-orbit-ring mw-orbit-ring-outer" />
            <div className="mw-orbit-ring mw-orbit-ring-middle" />
            <div className="mw-orbit-ring mw-orbit-ring-inner" />
            <span className="mw-orbit-point mw-orbit-point-one" />
            <span className="mw-orbit-point mw-orbit-point-two" />
            <span className="mw-orbit-point mw-orbit-point-three" />
            <div className="mw-orbit-mark">
              <MoonwitnessMark size={112} />
            </div>
            <div className="mw-orbit-label mw-orbit-label-top">A LIVING RECORD</div>
            <div className="mw-orbit-label mw-orbit-label-bottom">ALWAYS OPEN TO INSPECTION</div>
            <div className="mw-orbit-coordinate">MW / 001</div>
          </div>
        </div>
        <div className="mw-hero-bottom">
          <div className="container mw-hero-bottom-inner">
            <span>THE MOON WATCHES.</span>
            <span>THE RECORD REMEMBERS.</span>
            <span>THE EVIDENCE REMAINS.</span>
          </div>
        </div>
      </section>

      <section className="mw-principles container" aria-labelledby="principles-title">
        <div className="mw-section-heading">
          <div>
            <p className="mw-section-kicker">A DIFFERENT KIND OF DESIGN SYSTEM</p>
            <h2 id="principles-title">Made for meaning.<br />Built for the details.</h2>
          </div>
          <p className="mw-section-intro">
            Moonwitness UI brings a distinct visual language to practical,
            accessible interface building—without asking clarity to compete
            with character.
          </p>
        </div>
        <div className="mw-principle-grid">
          {principles.map((item) => (
            <article className="mw-principle-card" key={item.number}>
              <div className="mw-card-topline">
                <span className={`mw-card-marker mw-card-marker-${item.accent}`} />
                <span>{item.number} / PRINCIPLE</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="mw-card-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="mw-manifesto">
        <div className="container mw-manifesto-inner">
          <div className="mw-manifesto-mark">
            <MoonwitnessMark size={38} />
          </div>
          <div>
            <p className="mw-section-kicker">THE MOONWITNESS PRINCIPLE</p>
            <h2>Technology should illuminate the record—not obscure it.</h2>
          </div>
          <Link href="/docs/installation" className="mw-manifesto-link">
            Start building <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
