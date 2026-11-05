# Moonwitness UI — Product Blueprint

**The Interface Language of a Living Knowledge Ecosystem.**  
**Observe. Understand. Preserve.**

> The Moon Watches. The Record Remembers. The Evidence Remains Inspectable.

This blueprint defines product direction and intended quality. It is not a claim that every described capability is already implemented.

## Purpose

Information does not become understanding simply because it is displayed. Knowledge needs context; stories need attribution; evidence needs provenance; observations need interpretation; and software needs to communicate its limits.

Moonwitness UI provides a shared interface language for building coherent, accessible, evidence-conscious digital experiences across the MoonWitness ecosystem.

## Product definition

Moonwitness UI is an open-source interface foundation and developer experience. Its scope includes:

1. semantic design foundations;
2. accessible, composable interface primitives;
3. reusable interaction and information patterns;
4. evidence-aware presentation patterns;
5. documentation, examples, and registry tooling;
6. integration guidance for ecosystem applications.

It is not the owner of application truth, source corpora, user permissions, legal decisions, religious authority, or research verdicts. Those responsibilities remain with the relevant domain systems and accountable humans.

## Design philosophy: Evidence-First Moonpunk

Three design traditions shape the visual language.

### Celestial observatory
Observation, navigation, orbital relationships, precision instruments, and measured signals. This creates atmosphere; it is not a reason to decorate every screen with stars or space imagery.

### Evidence-first editorial
Research journals, archival records, manuscripts, citations, and editorial layouts. This keeps dense content legible and source context inspectable.

### Instrumental operations
Technical consoles, telemetry panels, timelines, and control surfaces. This gives complex tools clear hierarchy and makes state changes understandable.

The result should be expressive but restrained: futuristic without obscurity, atmospheric without visual noise, and information-dense without sacrificing readability.

## Core principles

1. **Clarity before spectacle.** Decoration, glow, and animation must not compete with content or task completion.
2. **Evidence before assertion.** Distinguish source material, interpretation, testimony, simulation, AI output, and verified observation.
3. **Accessible by default.** Keyboard use, semantic markup, visible focus, screen-reader feedback, responsive layouts, and reduced motion are core requirements.
4. **One foundation, many experiences.** Products may have different skins while sharing behavior, semantics, and accessibility.
5. **Human responsibility.** Interfaces support understanding and decisions; they do not claim authority that belongs to people or domain owners.
6. **Traceable by design.** Preserve attribution, provenance, rights, version, and uncertainty wherever relevant.

## System layers

| Layer | Responsibility | Examples |
| --- | --- | 
| Foundation | Shared visual and semantic rules | Tokens, typography, spacing, surfaces, themes |
| Primitives | Reusable accessible controls | Buttons, inputs, dialogs, tabs, tooltips |
| Patterns | Repeatable interaction structures | Form states, empty states, source cards |
| Evidence patterns | Inspectable source context | Citations, provenance, source comparison |
| Instruments | Domain-neutral visualization | Timelines, relationship views, signal panels |
| Experiences | Product-level composition | Discovery, archive, research, operations |
| Governance | Quality and ownership | Accessibility, rights, tests, release gates |

## Experience families

These are design targets, not claims that every application is integrated or complete.

| Experience | Primary need | Character |
| --- | --- | --- |
| Public discovery | Find and explore material | Editorial, inviting, navigable |
| Corpus and archive | Inspect text, edition, provenance | Scholarly, calm, source-oriented |
| Research workbench | Compare evidence and interpretation | Analytical, explicit, reviewable |
| Operations console | Monitor authorized systems | Dense, structured, guarded |
| Gateway and integration | Configure technical connections | Technical, predictable, transparent |
| Creative studio | Compose original work | Expressive, flexible, rights-aware |
| Spatial/orbital | Understand relationships and movement | Spatial, instrument-like, accessible in 2D |

## Evidence-aware interaction contract

Evidence-oriented components should display only information supplied by their owning domain. Relevant fields may include source identity, author/attribution, language, edition, passage locator, date and date type, provenance, rights, review state, known gaps, uncertainty, version, and correction history.

When a field is missing, show an explicit unknown, unavailable, or not-reviewed state. Do not invent identifiers, reviewer approvals, citations, confidence, or rights clearance.

A citation does not automatically establish truth or redistribution rights. A simulation is not a live measurement. An AI confidence value is not objective certainty.

## Visual foundation

The intended palette follows the MoonWitness XV MoonUI design contract:

| Token | Value | Role |
| --- | --- | --- |
| Ink | `#07060b` | Deep foundation |
| Surface | `#13101d` | Main dark surface |
| Surface 2 | `#1b172a` | Elevated dark surface |
| Paper | `#0d0b14` | Secondary deep surface |
| Foreground | `#f7f4ec` | Primary text |
| Accent | `#ffd400` | Primary highlight |
| Pink | `#ff007a` | Expressive accent |
| Cyan | `#00d4ff` | Signal accent |
| Moon | `#9d4edd` | Secondary identity accent |
| Muted | `#9e96b0` | Secondary text |

These are semantic references, not permission to paste arbitrary hex values into components. A production implementation should consume approved semantic tokens and preserve contrast across themes. Status must never be communicated by color alone.

## Candidate signature patterns

These are candidates for design and validation, not shipped components until present in the registry with docs and tests.

- **Evidence Spine** — ordered view of source, claim, evidence, and review context.
- **Provenance Rail** — traceable path through origin, edition, transformation, and current record.
- **Witness Thread** — linked observations or attestations with attribution.
- **Source Seal** — concise identity and rights summary for a source.
- **Observation Timeline** — chronological events with explicit date semantics and uncertainty.
- **Instrument Panel** — readable operational metrics with units, timestamps, and status labels.
- **Unknown State** — first-class pattern for missing, unresolved, or not-yet-reviewed information.

## Quality gates

A component is not ready merely because it renders. Review:

1. semantic markup and accessible naming;
2. keyboard navigation and focus management;
3. responsive behavior and text zoom;
4. reduced-motion behavior;
5. loading, error, empty, disabled, and success states;
6. contrast and non-color status communication;
7. localization and bidirectional text where applicable;
8. predictable API and composition;
9. documentation, examples, and tests;
10. license and asset provenance when media is included.

## Developer experience

Make components easy to discover, install, adapt, and understand. Expected deliverables include installation guidance, component documentation, copy-ready examples, registry metadata, accessible defaults, versioning policy, migration notes, and contribution standards.

The current repository uses pnpm/Turborepo, a Next.js v4 workspace, and shadcn-style registry tooling. Keep these implementation facts visible until an approved migration changes them.

## Non-goals

Moonwitness UI must not fabricate citations, source records, metrics, reviewer approvals, or rights status; treat AI output as verified human judgment; turn every product into the same dashboard; prioritize effects over accessibility; or silently replace the canonical design-system owner in MoonWitness XV.

## Definition of success

Developers can build different MoonWitness experiences that feel connected, remain accessible, communicate state honestly, and make relevant information inspectable—without forcing every product into the same visual composition.

**One ecosystem. Different experiences. Shared principles.**
