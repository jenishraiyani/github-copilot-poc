# Angular Example App

This example shows how GitHub Copilot can apply **Instructions**, **Memory**, and
**Skills** together in a realistic Angular-style codebase.

## How the example is organized

```text
examples/angular-app/
├── COPILOT-CONTEXT.md
├── INSTRUCTIONS-IN-ACTION.md
├── MEMORY-IN-ACTION.md
├── SKILLS-IN-ACTION.md
├── README.md
└── src/
    ├── app/
    │   ├── app.component.ts
    │   ├── core/
    │   │   ├── interceptors/
    │   │   │   └── auth.interceptor.ts
    │   │   └── services/
    │   │       ├── auth.service.spec.ts
    │   │       └── auth.service.ts
    │   ├── features/
    │   │   ├── product/components/product-list.component.ts
    │   │   └── user/
    │   │       ├── components/user-profile.component.ts
    │   │       ├── models/user.model.ts
    │   │       └── services/
    │   │           ├── user.service.spec.ts
    │   │           └── user.service.ts
    │   └── shared/components/loading-spinner.component.ts
    └── environments/environment.ts
```

## What each file demonstrates

- `auth.service.ts` — explicit typing, token handling, and secure environment usage
- `auth.service.spec.ts` — instruction-driven tests for new auth logic
- `auth.interceptor.ts` — auth headers added without hardcoded secrets
- `user.service.ts` — feature-based service with cached RxJS requests
- `user.service.spec.ts` — focused tests for fetch and cache behavior
- `user-profile.component.ts` — `OnPush`, `takeUntil()`, and feature-based structure
- `product-list.component.ts` — `trackBy` for rendering performance
- `loading-spinner.component.ts` — reusable shared UI component
- `COPILOT-CONTEXT.md` — explains how instructions, memory, and skills combine

## How to read and use the example

1. Start with `COPILOT-CONTEXT.md` for the big picture
2. Read `INSTRUCTIONS-IN-ACTION.md` to see how code generation is guided
3. Read `MEMORY-IN-ACTION.md` to see how project context changes suggestions
4. Read `SKILLS-IN-ACTION.md` to see workflow automation examples
5. Open the files in `src/` as copy-paste-ready Angular references

## Related guides in this POC

- Root instructions:
  [`../../.github/copilot-instructions.md`](../../.github/copilot-instructions.md)
- Skills guide: [`../../docs/skills-guide.md`](../../docs/skills-guide.md)
- Memory guide: [`../../docs/memory-guide.md`](../../docs/memory-guide.md)
- Instructions guide: [`../../docs/instructions-guide.md`](../../docs/instructions-guide.md)
- Angular memory template: [`../angular-project-memory.md`](../angular-project-memory.md)

## Notes

- The example uses Angular 17-style standalone components and RxJS patterns.
- API URLs come from `environment.ts`; no secrets or tokens are hardcoded.
- The included spec files show what Copilot-generated tests look like when the
  repository instructions require unit coverage for new logic.
