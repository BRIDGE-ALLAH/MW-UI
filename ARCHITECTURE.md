# Moonwitness UI — Architecture and Ownership

## Current repository foundation

This repository currently contains a pnpm/Turborepo monorepo with a Next.js v4 application, a shadcn-style component registry, and related packages/tooling. The root package is branded `moonwitness-ui`; underlying workspace names and upstream namespaces remain unchanged where they are implementation dependencies.

## Product identity versus design-system ownership

**Moonwitness UI** is the brand and product identity of this repository and its interface-development experience.

**MoonUI / `@moonwitness/moonui`** is identified in the MoonWitness XV Master Design as the certified shared design-system implementation and sole certified design-system owner across XV surfaces.

These names must not be treated as interchangeable. Rebranding this repository does not migrate its shadcn-derived registry into `@moonwitness/moonui`, replace MoonUI, or establish this repository as the canonical owner of all ecosystem components.

Before any migration, owners must agree on canonical package/repository ownership, token and component source of truth, compatibility policy, accessibility gates, versioning, releases, and deprecation.

## Target layers

1. **Foundation:** semantic tokens, typography, spacing, surfaces, themes, motion.
2. **Primitives:** accessible controls and layout building blocks.
3. **Patterns:** reusable interaction and information structures.
4. **Evidence patterns:** source, provenance, citation, review, uncertainty.
5. **Instruments:** timelines, tables, signals, domain-neutral visualizations.
6. **Application composition:** product-specific navigation, layouts, workflows.
7. **Governance:** accessibility, rights, ownership, tests, release controls.

## Domain boundaries

Moonwitness UI is a presentation and interaction layer. It should consume domain-owned data and permissions rather than invent them.

- Corpus owns source identity, edition, passage, provenance, and rights metadata.
- Research services own assessments, evidence relations, review state, and method versions.
- Gateway and application services own connection state, authorization, and operational data.
- Product owners define workflows, policy, and publication decisions.
- Human reviewers remain accountable for review decisions assigned to them.

UI components may render these values and communicate missing or unresolved states. They must not manufacture authoritative values.

## Integration contract

Each integration should specify its owning service and API, data schema and source identity, authentication and authorization boundaries, freshness and timestamp semantics, error/empty/partial/unavailable states, rights and privacy constraints, localization and accessibility expectations, and version compatibility.

Never expose secrets in browser code. Never present synthetic data as production telemetry. Label simulations and demonstrations explicitly.

## Evidence-aware component contract

Evidence components should receive explicit source identity, attribution, provenance, rights, review status, and uncertainty. They must not infer these values from display text or AI-generated summaries.

Where a value is absent, show an explicit unknown/unavailable state or omit the claim. Never fabricate a source identifier, citation, approval, confidence score, or license.

## Accessibility contract

Shared primitives should support semantic HTML, keyboard operation, visible focus, screen-reader naming and feedback, appropriate focus management, responsive behavior, and reduced motion. Tabs, dialogs, menus, and forms should follow established interaction patterns.

## Migration principle

Adopt MoonWitness XV contracts through a reviewed, incremental migration. Do not wholesale-replace existing primitives until compatibility, ownership, tests, and consuming applications are understood.
