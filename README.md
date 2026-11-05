# Moonwitness UI

**The Interface Language of a Living Knowledge Ecosystem.**

**Observe. Understand. Preserve.**

Moonwitness UI is an open-source interface foundation for building coherent, accessible, and evidence-conscious digital experiences across the MoonWitness ecosystem.

It brings together reusable interface components, design foundations, interaction patterns, and developer tooling. Its visual direction—**Evidence-First Moonpunk**—draws from celestial observatories, research archives, editorial design, and modern operational instruments.

> The Moon Watches. The Record Remembers. The Evidence Remains Inspectable.

## What it is

Moonwitness UI is the product and repository identity for this interface project. It aims to provide:

- **Design foundations** — semantic color roles, typography, spacing, surfaces, and responsive rules.
- **Interface primitives** — composable controls, forms, navigation, dialogs, and feedback.
- **Interaction patterns** — predictable loading, error, empty, permission, and confirmation states.
- **Evidence-oriented patterns** — reusable ways to present citations, provenance, source identity, timelines, and uncertainty.
- **Developer experience** — documented components, registry tooling, examples, and extensible code.

The repository currently builds on the React, Next.js, Tailwind CSS, and shadcn/ui ecosystem. The longer-term MoonWitness-specific design-system integration is documented in [ARCHITECTURE.md](./ARCHITECTURE.md); it should not be assumed complete merely because this repository has been rebranded.

## Design principles

1. **Clarity before spectacle.** Visual expression must never obscure content or actions.
2. **Evidence before assertion.** Distinguish source material, interpretation, testimony, simulation, AI output, and verified observation.
3. **Accessible by default.** Keyboard use, semantic markup, focus visibility, screen readers, responsive layouts, and reduced motion are core requirements.
4. **One foundation, many experiences.** Products may have different skins while sharing behavior, semantics, and accessibility.
5. **Human responsibility.** Interfaces support understanding and decisions; they do not claim authority that belongs to people or domain owners.
6. **Traceable by design.** Preserve attribution, provenance, rights, version, and uncertainty wherever relevant.

## Ecosystem role

Moonwitness UI is intended to support different experiences across the MoonWitness ecosystem, including public discovery, research and corpus tools, operational consoles, gateway experiences, and creative applications.

It provides the interface layer—not the authoritative source of application data, permissions, governance, religious interpretation, or research conclusions. Those remain with their respective domain owners and services.

## Repository structure

| Path | Purpose |
| --- | --- |
| `apps/v4` | Next.js documentation, examples, and component experience |
| `packages` | Shared packages and tooling |
| `apps/v4/registry` | Registry component sources |
| Root `*.md` files | Project blueprint, brand, architecture, roadmap, and contribution guide |

## Documentation

- [Blueprint](./BLUEPRINT.md) — product vision, scope, principles, layers, and quality gates.
- [Brand guidelines](./BRAND_GUIDELINES.md) — visual identity, voice, color, typography, and usage.
- [Architecture](./ARCHITECTURE.md) — current foundation, ownership boundaries, and integration direction.
- [Roadmap](./ROADMAP.md) — staged implementation plan and acceptance criteria.
- [Contributing](./CONTRIBUTING.md) — local development and contribution workflow.

## Getting started

This repository uses pnpm workspaces and Turborepo.

```bash
pnpm install
pnpm --filter=v4 registry:build
pnpm v4:dev
```

The documentation and component experience will be available at `http://localhost:4000`.

Useful commands:

```bash
pnpm v4:build
pnpm lint
pnpm typecheck
pnpm format:check
pnpm check
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full workflow and fresh-clone notes.

## Upstream acknowledgements and license

Moonwitness UI builds on the open-source shadcn/ui project and its surrounding ecosystem. Existing upstream notices, package licenses, and attribution must be preserved when modifying or redistributing derived work. This rebrand does not claim original authorship of upstream code.

The repository's current license is [MIT](./LICENSE.md). Check individual packages and assets for their own license terms before reuse.

## Status

The brand and product direction described here define the intended project direction. Evidence-specific components and direct integration with the canonical MoonWitness XV design system are roadmap work unless explicitly implemented and documented in code.

---

**Moonwitness UI — Observe. Understand. Preserve.**
