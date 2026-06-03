# Skills in Action

This example shows the workflow output GitHub Copilot can produce when the
repository defines reusable skills.

## Using the Code Review Skill

With [`../../.github/skills/code-review.md`](../../.github/skills/code-review.md),
a developer can ask Copilot to review the Angular auth changes:

```markdown
# Copilot Code Review (Using #code-review Skill)

## Angular Example: Add authentication and user caching

### Summary
- Modified auth and user feature files under `examples/angular-app/src/app`
- Adds typed JWT-style token handling and an HTTP auth interceptor
- Adds cached user fetching with Angular-friendly RxJS patterns

### ✅ Test Coverage
- Added unit tests for `AuthService` login, refresh, and logout behavior
- Added unit tests for `UserService` fetch, cache reuse, and force refresh
- Coverage focus: new service logic and cache behavior

### 🔒 Security Review
- ✅ No hardcoded secrets or API keys
- ✅ Environment-based API configuration
- ✅ Auth headers are only added when a token exists
- ⚠️ Suggestion: swap browser storage for secure cookies in production apps

### 📝 Code Quality
- ✅ Explicit TypeScript types used throughout
- ✅ Feature-based folder structure followed
- ✅ `OnPush`, `takeUntil()`, and `trackBy` patterns applied where relevant

**Recommendation:** ✅ Approve with suggestion about production-grade token storage
```

## Using the Release Notes Skill

With [`../../.github/skills/release-notes.md`](../../.github/skills/release-notes.md),
Copilot can turn the same work into a changelog summary:

```markdown
# Release Notes — v2.0.0
**Generated:** June 1, 2025

## 🆕 Features
- Add Angular authentication example with typed auth service and interceptor
- Add cached user service and standalone profile component example
- Add reusable loading spinner and product list examples

## 🐛 Bug Fixes
- Fix repository docs by adding the missing `release-notes` skill definition

## ⚡ Performance
- Demonstrate `OnPush` change detection and `trackBy` list rendering
- Cache repeated user requests with `shareReplay()`

## 🔒 Security
- Keep API configuration in `environment.ts`
- Avoid hardcoded secrets in auth and interceptor examples
```

## Why this matters

Skills make repeated tasks consistent. In this example they help Copilot review
Angular code using the repo's standards and summarize the same work in a
release-ready format without re-explaining the workflow each time.
