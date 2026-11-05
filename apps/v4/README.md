# Moonwitness UI — Application

This workspace contains the Moonwitness UI documentation site, component explorer, project builder, and registry experience.

The application expresses the **Evidence-First Moonpunk** design direction:

- **Observe.** Make information and its context easy to inspect.
- **Understand.** Present content, state, and interaction with clarity.
- **Preserve.** Respect attribution, provenance, rights, and uncertainty.

## Run locally

From the repository root:

```bash
pnpm install
pnpm --filter=v4 registry:build
pnpm v4:dev
```

Open [http://localhost:4000](http://localhost:4000).

## Build and validate

```bash
pnpm v4:build
pnpm lint
pnpm typecheck
pnpm format:check
```

See the root [README](../../README.md), [contribution guide](../../CONTRIBUTING.md), and [brand guidelines](../../BRAND_GUIDELINES.md) for project-wide instructions.

## Upstream compatibility

The app currently uses the upstream shadcn CLI, registry protocol, and selected upstream packages. Their executable names, package namespaces, licenses, and attribution are intentionally retained for compatibility. The Moonwitness UI brand describes this product experience and its design direction; it does not claim authorship of upstream code or imply that the separate certified `@moonwitness/moonui` package has already been integrated.
