# Contributing to Moonwitness UI

Thank you for contributing. Moonwitness UI is an open-source interface project focused on clarity, accessibility, traceability, and a coherent design language across different product experiences.

Please review this guide before opening a pull request.

## Project principles

Contributions should support [BLUEPRINT.md](./BLUEPRINT.md) and [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md):

- clarity before visual spectacle;
- accessible behavior by default;
- explicit system and evidence states;
- source attribution and rights awareness;
- consistent semantics with room for product-specific expression;
- honest separation between implemented capability and roadmap direction.

## Repository structure

This is a pnpm workspace monorepo using Turborepo.

| Path | Purpose |
| --- | --- |
| `apps/v4/app` | Next.js application routes and layouts |
| `apps/v4/components` | Website and documentation components |
| `apps/v4/content` | Documentation content |
| `apps/v4/registry` | Registry component sources |
| `packages` | Shared packages and tooling |
| `docs` | Project blueprint, brand, architecture, and roadmap |

## Development setup

```bash
git clone https://github.com/BRIDGE-ALLAH/MW-UI.git
cd MW-UI
pnpm install
pnpm --filter=v4 registry:build
pnpm v4:dev
```

The v4 application runs at `http://localhost:4000`.

Useful checks:

```bash
pnpm lint
pnpm typecheck
pnpm format:check
pnpm check
```

For a full build, run:

```bash
pnpm v4:build
```

A fresh clone may require generated registry styles before the dev server starts. See the registry documentation and scripts for the current workflow.

## Component contributions

When adding or changing a registry component:

1. inspect existing component variants and shared patterns;
2. preserve API consistency and composability;
3. implement semantic markup and keyboard behavior;
4. include visible focus and accessible labels;
5. handle loading, error, empty, disabled, and success states as relevant;
6. respect reduced motion and responsive layouts;
7. update documentation and examples;
8. add or update tests;
9. run the registry build and relevant checks.

Evidence-oriented components must not invent source identities, citations, rights status, review approvals, timestamps, or confidence values. They should display domain-supplied information and clearly represent missing or unresolved data.

## Design and assets

Follow [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md). Prefer semantic tokens over hard-coded color values. Keep text readable and status meaning available without color alone.

Only contribute original or appropriately licensed assets. Preserve author, source, license, and consent information. Do not add unlicensed fonts, images, music, or other media.

## Upstream acknowledgements

This repository builds on shadcn/ui and related open-source dependencies. Preserve existing copyright notices, license files, attribution, and package-specific terms. Do not remove upstream notices as part of branding changes.

## Pull requests

Use focused changes and conventional commit messages, for example:

- `docs(brand): refine visual identity guidance`
- `feat(patterns): add provenance rail`
- `fix(a11y): restore dialog focus`
- `chore(metadata): update site identity`

A pull request should explain what changed and why, which components or experiences are affected, how accessibility and responsive behavior were checked, what tests/builds were run, and any known limitations.

Do not describe planned capabilities as shipped. Clearly label mock, sample, and simulated data.

## License

The repository currently uses the [MIT license](./LICENSE.md). Preserve upstream license notices and verify the terms of individual dependencies and assets.
