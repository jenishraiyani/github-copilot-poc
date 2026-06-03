# Angular Example: Copilot with Skills, Memory & Instructions

This example demonstrates how GitHub Copilot uses **Instructions**, **Memory**,
and **Skills** together so generated Angular code matches the project's
patterns instead of falling back to generic defaults.

## The Setup

### Instructions Applied
The root [`../../.github/copilot-instructions.md`](../../.github/copilot-instructions.md)
guides Copilot to:
- always use TypeScript with explicit types
- write unit tests for new logic
- avoid hardcoded secrets
- keep naming consistent and code self-documenting

This example also demonstrates Angular-specific practices referenced by the
project memory: `OnPush` change detection, `takeUntil()` cleanup, `trackBy`, and
RxJS caching.

### Memory Established
The repository's Angular memory example says this project uses:
- Angular 17 with standalone components
- RxJS and NgRx-friendly patterns
- Tailwind-style utility classes
- feature-based folders where services own HTTP/state concerns

Those facts show up here in the folder layout, service design, and component
implementation.

### Skills Available
- [`#code-review`](../../.github/skills/code-review.md) — reviews auth, testing,
  security, and naming decisions
- [`#release-notes`](../../.github/skills/release-notes.md) — turns completed work
  into structured release notes

## How They Work Together

### Scenario 1: Creating a new component
When a developer asks Copilot to create a profile screen, Copilot can:
- follow **Instructions** by using explicit types and testable logic
- apply **Memory** by placing the component under `features/user/components`
- follow Angular performance patterns like `OnPush` and `takeUntil()`

Result: `user-profile.component.ts` lands in the right place with the right
patterns on the first pass.

### Scenario 2: Extending authentication
When a developer adds auth behavior, Copilot can:
- follow **Instructions** by avoiding hardcoded secrets and adding tests
- apply **Memory** by routing HTTP work through `core/services`
- support **Skills** so the resulting PR is easy to review with `#code-review`

Result: `auth.service.ts`, `auth.interceptor.ts`, and `auth.service.spec.ts`
form a small but reviewable authentication slice.

### Scenario 3: Preparing a release summary
After the example work is complete, a developer can ask Copilot to generate
release notes.

The **release-notes skill** uses the structure of the changes, while **Memory**
helps keep the release language aligned with the team's Angular patterns.

## File Breakdown

| File | Demonstrates |
|---|---|
| `core/services/auth.service.ts` | Explicit typing, env-based config, auth flow |
| `core/services/auth.service.spec.ts` | Instruction-driven unit testing |
| `core/interceptors/auth.interceptor.ts` | Secure auth header injection |
| `features/user/services/user.service.ts` | Feature service ownership and caching |
| `features/user/components/user-profile.component.ts` | `OnPush` and `takeUntil()` cleanup |
| `features/product/components/product-list.component.ts` | `trackBy` and reusable typed inputs |

## Key Takeaways

1. **Instructions** shape the structure and quality of generated code
2. **Memory** gives Copilot project-specific Angular context
3. **Skills** automate review and release workflows around that code
4. Together they make Copilot feel like it already knows the team's standards
