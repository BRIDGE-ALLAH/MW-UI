# Moonwitness UI — Brand Guidelines

## Brand essence

- **Name:** Moonwitness UI
- **Descriptor:** The Interface Language of a Living Knowledge Ecosystem
- **Tagline:** Observe. Understand. Preserve.
- **Supporting principle:** The Moon Watches. The Record Remembers. The Evidence Remains Inspectable.

## Positioning

Moonwitness UI is an open-source interface foundation for coherent, accessible, evidence-conscious digital experiences across the MoonWitness ecosystem. It is a design and developer system—not a religious or research authority, source of application truth, or claim that every ecosystem application shares one implementation.

## Personality

- **Observant:** attentive to detail, context, and source.
- **Precise:** structured, explicit, and careful with claims.
- **Human:** understandable, welcoming, and respectful.
- **Expressive:** visually distinctive without sacrificing clarity.
- **Accountable:** honest about unknowns, limitations, rights, and status.

Avoid grandiose, authoritarian, mystical, militaristic, or needlessly cryptic language.

## Visual direction: Evidence-First Moonpunk

Combine celestial observatory atmosphere, evidence-first editorial clarity, and instrumental operations design.

Use deep ink and violet-tinted surfaces; warm readable foregrounds; yellow as the principal highlight; pink, cyan, and moon-purple as controlled accents; strong editorial hierarchy; fine borders and deliberate spacing; restrained glow and purposeful motion.

Avoid generic space wallpaper as identity, excessive neon on dense text, decorative charts without data meaning, color-only status, fake counters or LIVE badges, and unlicensed media.

## Semantic color reference

| Name | Hex | Usage |
| --- | --- | --- |
| Ink | `#07060b` | Deep background |
| Surface | `#13101d` | Main surface |
| Surface 2 | `#1b172a` | Elevated surface |
| Paper | `#0d0b14` | Secondary background |
| Foreground | `#f7f4ec` | Main text |
| Accent | `#ffd400` | Primary highlight |
| Pink | `#ff007a` | Expressive accent |
| Cyan | `#00d4ff` | Signal accent |
| Moon | `#9d4edd` | Secondary identity accent |
| Muted | `#9e96b0` | Secondary text |

These references are implemented as the default semantic palette in `apps/v4/app/globals.css`. The default light appearance uses warm paper and deep ink; the default dark appearance uses ink and violet-tinted surfaces with warm foreground text and yellow primary actions. User-selectable theme presets remain available and intentionally override the default palette.

Use semantic roles rather than applying hex values directly to components. Verify contrast in both appearances and all selectable presets. Pair status colors with text or accessible labels. Pink, cyan, and moon-purple are supporting accents, not replacements for semantic success, warning, or error states.

## Typography

Use a highly legible sans-serif for interface and body text, a restrained display face for page titles, and monospace for identifiers, code, timestamps, and technical values. Preserve script-specific typography for Arabic and Hebrew. Do not use display typography for long paragraphs or dense tables.

## Layout and composition

Use clear hierarchy and consistent alignment. Prefer structured panels and readable columns over decorative complexity. Keep dense data scannable with labels, units, and timestamps. Separate source content from interpretation and system commentary. Make primary actions obvious and destructive actions guarded.

## Motion and feedback

Motion should explain state changes, orientation, or feedback. Respect reduced-motion preferences. Never rely on animation to communicate essential information. Avoid automatic sound and unnecessary vibration.

## Voice

Write with clarity, humility, and precision.

Prefer “Source not verified” over “false”; “Not reviewed” over implied approval; “AI-generated candidate” over “AI conclusion”; “Simulation” over “live status” when data is simulated; and “Rights not established” over unsupported permission claims.

Distinguish facts, attribution, interpretation, and proposal. Avoid absolute claims when evidence or authority is scoped.

## Logo and symbol direction

The mark is a simple, scalable celestial witness symbol: a yellow crescent paired with a warm-white point of light on deep ink. It must remain legible at favicon size and work in monochrome.

Canonical assets live in `apps/v4/public/brand/`:
- `moonwitness-mark.svg` — primary color mark on a transparent canvas.
- `moonwitness-mark-mono.svg` — monochrome mark for single-color use.
- `apps/v4/app/icon.svg` — app icon with its deep-ink tile.

The React implementation is centralized in `apps/v4/components/moonwitness-mark.tsx`; use it in application surfaces instead of redrawing the symbol. Keep the app icon, header, project-builder welcome, and social previews visually aligned.

Do not imitate a religious seal, sacred calligraphy, official institutional insignia, or an existing third-party logo. Keep the wordmark separate from the symbol for compact placements.

## Naming and application

Use **Moonwitness UI** in prose and product surfaces, and `moonwitness-ui` for repository/package identifiers where appropriate. Do not rename upstream package namespaces or claim ownership of `@moonwitness/moonui` without an explicit architecture decision.

Documentation should be editorial and precise; discovery should be inviting; research and archive should be restrained and source-oriented; operations should be dense and guarded; creative tools should be expressive and rights-aware.

All applications share principles and semantics, not necessarily identical layouts or themes.
