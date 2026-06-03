# 🧠 Memory Guide

Learn how Copilot Memory works, how to create memories, and best practices for keeping your project context fresh and accurate.

---

## What Is Copilot Memory?

**Memory** allows Copilot to **learn and retain facts** about your repository over time — such as coding conventions, architectural decisions, and recurring preferences — so you don't have to re-explain them in every session.

> 💡 Think of memory as **persistent project context** that Copilot can access across sessions.

---

## How Memory Stays Accurate — Citation Validation

Before using any stored memory, Copilot **validates the memory against your current codebase** to confirm it's still relevant and accurate. This prevents outdated or incorrect context from influencing suggestions — a crucial safeguard as codebases evolve.

> ✅ **Validation ensures memory stays aligned with reality.**

---

## Auto-Expiry: 28-Day Freshness Window

All stored memories have a built-in **28-day automatic expiry**. This ensures Copilot only operates on fresh, relevant context.

| Timeframe | Status |
|---|---|
| 0-27 days | Memory is **active and used** |
| 28+ days | Memory is **automatically removed** |

**Why?** Over time, codebases change. By auto-expiring memories, you ensure Copilot never applies stale context.

---

## Memory Scope

### Where Memory Applies
Memory is **repository-scoped** — it applies only to the specific repository where it was created.

| Context | Memory Applies? |
|---|---|
| Copilot coding agent | ✅ Yes |
| Copilot code review | ✅ Yes |
| Copilot CLI | ✅ Yes |
| Copilot Chat (VS Code) | ❌ Not currently |
| Copilot Chat (JetBrains) | ❌ Not currently |
| Copilot Chat (Other IDEs) | ❌ Not currently |

> ⚠️ **Note:** Memory does not carry over across repositories or to IDE integrations.

---

## How to Create Memory

### 1. Explicit Prompts
Tell Copilot directly:

```
Remember that this project uses Angular with standalone components.
Remember that we prefer RxJS for state management.
Remember that all API endpoints are in the src/api/ folder.
```

Phrases like "always use X" or "in this project we prefer Y" also trigger memory creation automatically.

### 2. Implicit Inference
Copilot can **infer and store facts** from your project context:
- **Preferred coding patterns** observed during sessions
- **Library choices** detected in package.json
- **Architectural conventions** from folder structure
- **Naming patterns** from repeated code reviews

### 3. Repository Context
Memory is created from analyzing:
- **README.md** — project description and setup
- **File structure** — folder organization and patterns
- **Code conventions** — observed patterns in existing code
- **Configuration files** — tech stack indicators (package.json, tsconfig.json, etc.)

---

## What to Store in Memory

### ✅ Good Memory Candidates
- 📚 **Tech Stack** — "We use React 18, TypeScript, and Tailwind CSS"
- 🏗️ **Architecture** — "Feature-based folder structure with single-responsibility components"
- 📝 **Naming Conventions** — "Components end with .tsx, utils with .ts"
- 📦 **Libraries** — "Use RxJS for async, not Promises"
- 🎨 **Code Patterns** — "Use custom hooks for shared logic"
- 📋 **Processes** — "All PRs must have tests; minimum 80% coverage"

### ❌ Poor Memory Candidates
- ❌ Sensitive information (secrets, API keys, credentials)
- ❌ Personal preferences unrelated to the project
- ❌ Temporary workarounds or one-time decisions
- ❌ Information that changes weekly

---

## Managing Memory

### View Memory
**On GitHub.com:**
```
Settings → Copilot → Memory
```

**In VS Code:**
Open Copilot Chat panel and access memory management options.

### Delete Memory
You can **review and delete stored memories** at any time:

**On GitHub.com:**
1. Go to `Settings → Copilot → Memory`
2. View stored facts about your project
3. Click delete next to memories you want to remove

**In VS Code:**
Use the Copilot Chat panel to manage memories.

### Refresh Memory
- **Automatic refresh:** Mentioning a fact again resets its 28-day timer
- **Manual refresh:** Update or re-mention memories you want to keep fresh

---

## Organization-Managed Users

For **organization-managed users**, the most restrictive policy across any of the user's organizations takes precedence.

**Example:**
- Org A allows memory
- Org B restricts memory
- → Memory is **restricted** for users in both orgs

> 📌 Check with your organization administrator for memory policies.

---

## Example: Angular Project Memory

Here's what typical memory might look like for an Angular project:

```
Tech Stack:
- Framework: Angular 17 with standalone components
- Language: TypeScript with strict mode enabled
- State Management: RxJS and NgRx
- Styling: Tailwind CSS
- Testing: Jest for unit tests, Cypress for e2e

Folder Structure:
- src/app/features/ — feature modules
- src/app/shared/ — shared components, pipes, services
- src/app/core/ — singleton services (auth, logging)
- src/services/ — business logic services
- src/models/ — TypeScript interfaces and types

Naming Conventions:
- Components: PascalCase.component.ts (e.g., UserProfile.component.ts)
- Services: camelCase.service.ts (e.g., userService.ts)
- Directives: camelCase.directive.ts
- Pipes: camelCase.pipe.ts
- Models/Interfaces: PascalCase.model.ts

Code Patterns:
- Use OnPush change detection in all components
- Implement OnDestroy and use takeUntil() for subscriptions
- Export services as singleton via providedIn: 'root'
- Use custom hooks for shared reactive logic
```

See the full example: [examples/angular-project-memory.md](../examples/angular-project-memory.md)

---

## Best Practices

### ✅ Do's
- 📌 **Store facts, not opinions** — "We use Angular" ✅, not "I like Angular" ❌
- 📝 **Be specific** — "RxJS for state" is better than "reactive patterns"
- 🔄 **Keep memories fresh** — Re-mention important facts every 20 days
- 📚 **Document in README** — Put key facts in README so memory aligns with docs
- 🎯 **Focus on project-wide patterns** — Store things the whole team needs to know

### ❌ Don'ts
- ❌ **Don't store secrets** — Never ask Copilot to remember API keys or tokens
- ❌ **Don't store temporary workarounds** — They'll become stale
- ❌ **Don't rely solely on memory** — Always document important facts in README
- ❌ **Don't over-populate memory** — Focus on essential facts (5-10 key points)

---

## Memory + Instructions + Skills: Together

| Feature | Purpose | Example |
|---|---|---|
| **Memory** | Store facts | "We use TypeScript + RxJS" |
| **Instructions** | Define behavior | "Always write unit tests" |
| **Skills** | Automate tasks | Code review workflow |

All three work together to make Copilot context-aware and productive.

---

## Troubleshooting Memory

### Memory isn't being applied
- **Check scope:** Memory is repository-scoped; make sure you're in the right repo
- **Check expiry:** Memories older than 28 days are auto-removed
- **Verify context:** Ask Copilot to recall the memory; it may not have been stored
- **Try IDE:** Some IDE integrations don't support memory yet

### Memory seems outdated
- **Refresh it:** Mention the fact again to reset the 28-day timer
- **Delete and re-add:** Remove stale memory and re-enter correct information
- **Check README:** Update your README to match current state, then refresh memories

### Memory not creating
- **Be explicit:** Use phrases like "Remember that..." or "Always use..."
- **Provide context:** Share code examples or files so Copilot understands
- **Check organization policy:** Organization-managed users may have restrictions

---

> **Memory is powerful because it accumulates context over time, making Copilot feel like a teammate who knows your project.** 🧠
