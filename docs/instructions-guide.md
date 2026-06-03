# 📋 Instructions Guide

Learn how to write and use Copilot Instructions to guide how your AI pair programmer should write code.

---

## What Are Instructions?

**Instructions** guide **how Copilot should write code** — things like test coverage, naming conventions, dependency approval, and overall development guidelines.

> 💡 Think of instructions as **behavioral guidelines** that shape Copilot's coding style to match your team's standards.

---

## Important: Non-Deterministic Behavior

> ⚠️ **Critical:** Instructions are behavioral **guidelines**, not strict rules that produce deterministic results.

Copilot is generative AI. The same instruction may produce **slightly different responses** across sessions. Think of instructions as guidelines that influence Copilot's behavior, not strict algorithms that always produce identical output.

### Example
**Instruction:** "Always write unit tests for new functions"

**Session 1:** Generates function + comprehensive unit tests  
**Session 2:** Generates function + unit tests (slightly different structure)  
**Session 3:** Generates function + unit tests (different edge cases)

All follow the instruction, but output varies due to AI's generative nature.

---

## When to Use Instructions

Instructions work best for:
- ✅ Coding standards (naming, formatting, style)
- ✅ Testing requirements (coverage, frameworks)
- ✅ Security practices (validation, sanitization)
- ✅ Performance guidelines (caching, optimization)
- ✅ Architectural patterns (folder structure, component design)
- ✅ Dependency management (approval process)

---

## What Makes a Good Instruction

### ✅ Good Instructions
- 📝 **Clear and specific** — "Use TypeScript with explicit type annotations" ✅
- 📐 **Actionable** — "Implement OnPush change detection in all components"
- 🎯 **Focused** — One concept per instruction
- 📚 **Documented with examples** — Show what you want

### ❌ Poor Instructions
- ❌ **Vague** — "Write good code"
- ❌ **Impossible** — "Generate code that's 100% bug-free"
- ❌ **Contradictory** — "Minimize dependencies" + "Use all available libraries"
- ❌ **Too many rules** — Combine related concepts

---

## Structure of Good Instructions

### 1. Core Instruction
State what you want clearly:
```
Always write unit tests for new logic.
```

### 2. Why (Optional but helpful)
Explain the reasoning:
```
Tests ensure code quality and catch regressions early.
```

### 3. Example (Strongly recommended)
Show exactly what you want:
```typescript
// ✅ Do this
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

test('should calculate total correctly', () => {
  const items = [{ price: 10 }, { price: 20 }];
  expect(calculateTotal(items)).toBe(30);
});

// ❌ Not this
function calculateTotal(items) {
  let sum = 0;
  for (let item of items) {
    sum += item.price;
  }
  return sum;
}
```

---

## Categories of Instructions

### 1. Code Style
```
- Use 2-space indentation
- Use PascalCase for components
- Use camelCase for functions and variables
- Keep lines under 100 characters
```

### 2. Type Safety
```
- Use TypeScript with strict mode enabled
- Add explicit type annotations for function parameters and returns
- Avoid `any` type; use `unknown` and narrow types
```

### 3. Testing
```
- Write unit tests for all new logic
- Aim for >80% code coverage
- Use the Arrange-Act-Assert pattern
- Mock external dependencies
```

### 4. Security
```
- Never hardcode secrets or API keys
- Validate all user inputs
- Sanitize data before rendering
- Use parameterized queries for databases
```

### 5. Performance
```
- Lazy-load components when possible
- Use pagination for large datasets
- Implement caching for API responses
- Keep bundle size under 500KB (gzipped)
```

### 6. Dependencies
```
- Do not add new dependencies without a PR review
- Prefer tree-shakeable imports
- Keep dependencies up-to-date
- Review security advisories regularly
```

---

## Writing Your Instructions

### Step 1 — Identify Your Standards
Discuss with your team:
- What code style do we prefer?
- What testing practices do we follow?
- What security concerns matter most?
- What performance targets do we have?

### Step 2 — Document Clearly
Write each instruction with:
- Clear, direct language
- Why this matters (optional)
- A concrete example

### Step 3 — Organize by Category
Group related instructions:

```markdown
# Code Style
- Use 2-space indentation
- Use descriptive variable names

# TypeScript Standards
- Enable strict mode
- Add explicit type annotations

# Testing
- Write unit tests for business logic
- Use Jest as the test framework

# Security
- Validate all user input
- Never hardcode secrets
```

### Step 4 — Keep It Concise
Aim for **10-20 key instructions** total. Too many = Copilot can't prioritize.

### Step 5 — Review Together
Have your team review instructions to ensure alignment.

---

## Examples of Well-Written Instructions

### ✅ TypeScript Standards
```
Use TypeScript instead of plain JavaScript. Add explicit type annotations 
for all function parameters and return types. Avoid the `any` type; 
use `unknown` instead and narrow the type.

Example:
  ✅ function getUserId(id: string): Promise<User | null> { ... }
  ❌ function getUser(id: any): any { ... }
```

### ✅ Testing Requirement
```
All new business logic must have accompanying unit tests. Use Jest as the 
testing framework. Follow the Arrange-Act-Assert pattern. Target >80% 
code coverage.

Example:
  describe('calculateTotal', () => {
    it('should sum all item prices', () => {
      const items = [{ price: 10 }, { price: 20 }];
      expect(calculateTotal(items)).toBe(30);
    });
  });
```

### ✅ Naming Convention
```
Use PascalCase for component names and files (UserProfile.tsx). 
Use camelCase for functions and variables (getUserData). 
Use UPPER_SNAKE_CASE for constants (MAX_RETRIES).

Example:
  ✅ UserProfile.component.ts (component)
  ✅ getUserData() (function)
  ✅ MAX_RETRIES (constant)
  ❌ getUser_Data() (mixed case)
  ❌ user_profile.tsx (not PascalCase)
```

---

## Using Instructions with Skills and Memory

All three features work together:

| Feature | Role |
|---|---|
| **Instructions** | How Copilot should behave |
| **Memory** | What facts Copilot remembers |
| **Skills** | What workflows Copilot can automate |

### Example Integration
```
Memory: "This project uses Angular with RxJS"
Instructions: "Use OnPush change detection; unsubscribe with takeUntil()"
Skills: "Review PR for test coverage and security"

→ Result: Copilot suggests Angular code following your guidelines + automates reviews
```

---

## Documenting Instructions

Where to place instructions in your repo:

```
.github/
├── copilot-instructions.md    # Main instructions file
└── 

README.md                       # Reference to instructions
```

**In README, add a link:**
```markdown
## 📋 Development Standards

See [.github/copilot-instructions.md](.github/copilot-instructions.md) 
for code style and development guidelines that Copilot follows.
```

---

## Best Practices

### ✅ Do's
- 📝 **Write clear examples** — Show what you want, not just description
- 🎯 **Be specific** — "TypeScript with types" > "Use types"
- 📚 **Document trade-offs** — Explain why this guideline matters
- 🔄 **Review with team** — Ensure alignment on standards
- 📌 **Keep current** — Update instructions when practices evolve

### ❌ Don'ts
- ❌ **Don't write too many** — Focus on key standards (10-20 max)
- ❌ **Don't assume compliance** — Copilot may not follow every instruction perfectly
- ❌ **Don't use vague language** — Be specific and measurable
- ❌ **Don't set impossible standards** — "Never have bugs" isn't realistic

---

## Common Instruction Mistakes

### ❌ Mistake 1: Too Vague
```
❌ Bad: "Write clean code"
✅ Good: "Write code that is self-documenting with clear function names"
```

### ❌ Mistake 2: Too Long
```
❌ Bad: [10-paragraph explanation]
✅ Good: [1-2 sentences + concrete example]
```

### ❌ Mistake 3: Impossible to Verify
```
❌ Bad: "Write performant code"
✅ Good: "Keep bundle size under 500KB (gzipped)"
```

### ❌ Mistake 4: Contradictory
```
❌ Bad: "Minimize dependencies" + "Add a library for every feature"
✅ Good: "Only add dependencies if no reasonable alternative exists"
```

---

## Real-World Example

Here's a complete set of instructions for a TypeScript React project:

```markdown
# Copilot Instructions

## TypeScript
- Use TypeScript with strict mode enabled
- Add explicit type annotations for all function parameters and returns
- Define interfaces for object shapes; use `type` for unions
- Avoid `any`; use `unknown` and narrow types

## React Components
- Use functional components with hooks
- Implement React.memo for components that receive props
- Use custom hooks for shared logic
- PropTypes or TypeScript for prop validation

## Testing
- Write unit tests for all new functions
- Use Jest + React Testing Library
- Aim for >80% code coverage
- Test behavior, not implementation

## Code Style
- Use 2-space indentation
- Keep lines under 100 characters
- Use descriptive variable names
- Add JSDoc for public functions

## Security
- Never hardcode API keys or secrets
- Validate user input on client and server
- Use environment variables for configuration
- Keep dependencies updated for security patches

## Dependencies
- Do NOT add new dependencies without a PR review
- Prefer lightweight libraries over heavy frameworks
- Use tree-shakeable imports to minimize bundle size
```

---

> **Instructions make Copilot behave like a member of your team, following your coding standards and best practices.** 📋
