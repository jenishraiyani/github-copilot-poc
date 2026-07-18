---
name: performance-optimizer
description: Review and optimize Angular applications for performance using Angular and RxJS best practices.
---

# Performance Optimizer Skill

Reviews Angular application code and recommends performance optimizations based on Angular and RxJS best practices.

---

## When to Use

- Reviewing components or services for performance issues
- Auditing an Angular application before a release
- Investigating slow rendering, excessive change detection, or sluggish UI
- Refactoring legacy code for better runtime efficiency
- Reviewing RxJS usage for subscription and operator efficiency

---

## Workflow

### 1. Scan Components and Templates
- Review `.ts` and `.html` files for the component(s) in scope
- Identify subscription patterns, change detection strategy, and template bindings

### 2. Check Subscription Management
- Detect manual `.subscribe()` calls that could use the `async` pipe instead
- Flag subscriptions without corresponding unsubscribe logic (missing `takeUntil`, `Subscription.unsubscribe()`, etc.)

### 3. Review Change Detection
- Check if `ChangeDetectionStrategy.OnPush` is used
- Recommend `OnPush` where inputs are immutable or state flows through observables

### 4. Review `*ngFor` Usage
- Identify `*ngFor` loops without a `trackBy` function
- Recommend a `trackBy` implementation using a stable unique identifier

### 5. Analyze Template Expressions
- Identify method calls or complex logic directly in templates
- Recommend moving expensive computations to component properties, pipes, or memoized getters

### 6. Review Module Loading
- Identify feature modules that are eagerly loaded
- Recommend lazy loading via the router where appropriate

### 7. Review RxJS Operator Usage
- Identify inefficient or redundant operator chains
- Recommend operators such as `switchMap`, `debounceTime`, `distinctUntilChanged`, or `shareReplay` where they reduce work

### 8. Detect Redundant API Calls
- Identify duplicate or repeated HTTP requests for the same data
- Recommend request deduplication, caching, or shared observables

### 9. Suggest Caching/Memoization
- Identify pure or expensive computations recomputed unnecessarily
- Recommend memoization, `shareReplay`, or in-memory caching strategies

### 10. Review Bundle Size
- Identify large or unused imports, libraries, or duplicated dependencies
- Recommend tree-shakable imports, dynamic imports, or lazy-loaded chunks

---

## Expected Output

- A structured list of findings grouped by category (Change Detection, Subscriptions, Templates, RxJS, Modules, Bundle Size)
- For each finding: the issue, why it matters, and a concrete code-level recommendation
- Before/after code snippets where a fix clarifies the change
- A short priority summary (high/medium/low impact) to guide remediation order
