# Moonwitness UI — Roadmap

Roadmap items are planned work, not shipped capabilities.

## Phase 1 — Brand and project foundation

- [x] Establish product name and positioning.
- [x] Define Evidence-First Moonpunk direction.
- [x] Document blueprint, brand rules, architecture boundaries, and roadmap.
- [x] Update repository and site metadata.
- [x] Add a project mark and social preview artwork.
- [ ] Review and approve the brand package with maintainers.

**Acceptance:** identity is consistent, upstream attribution is preserved, and documentation distinguishes current implementation from future work.

## Phase 2 — Design foundation

- [ ] Audit current themes and component token sources.
- [ ] Map MoonUI semantic tokens to the current implementation without breaking selectable styles.
- [ ] Define light/dark contrast and status semantics.
- [ ] Document typography, spacing, elevation, and motion.
- [ ] Add visual regression examples.

**Acceptance:** tokens have one documented source of truth and components avoid arbitrary one-off colors.

## Phase 3 — Accessibility and component quality

- [ ] Audit keyboard behavior, focus management, labels, and screen-reader feedback.
- [ ] Normalize loading, error, empty, disabled, and success states.
- [ ] Validate reduced motion and responsive behavior.
- [ ] Establish component test and documentation templates.
- [ ] Add conformance checks to CI where practical.

**Acceptance:** shared components meet documented quality gates and have examples and tests.

## Phase 4 — Evidence-oriented patterns

- [ ] Prototype Source Seal.
- [ ] Prototype Provenance Rail.
- [ ] Prototype Evidence Spine.
- [ ] Prototype Witness Thread.
- [ ] Prototype Observation Timeline.
- [ ] Define data contracts with owning services.

**Acceptance:** patterns consume attributed domain data; missing and unresolved states are explicit; sample data is never presented as verified evidence.

## Phase 5 — Ecosystem integration

- [ ] Reconcile canonical design-system ownership with MoonWitness XV.
- [ ] Agree package/repository boundaries and migration policy.
- [ ] Integrate selected applications through explicit contracts.
- [ ] Validate localization, privacy, authorization, and rights constraints.

**Acceptance:** each integration has a domain owner, versioned contract, tested states, and approved migration path.

## Phase 6 — Developer experience and release maturity

- [ ] Improve component discovery and installation guidance.
- [ ] Publish contribution and versioning policies.
- [ ] Establish release notes and migration guides.
- [ ] Add examples for common experience families.
- [ ] Define stable versus experimental API status.

**Acceptance:** developers can install, adapt, test, and upgrade components predictably.
