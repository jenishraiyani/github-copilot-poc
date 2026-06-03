# 🤖 GitHub Copilot AI Configuration POC

A **Proof of Concept** demonstrating how to configure GitHub Copilot using **Skills**, **Memory**, and **Instructions** — making Copilot feel more aware of your actual codebase instead of generating generic suggestions.

---

## 📚 Table of Contents

- [Overview](#overview)
- [Feature Comparison](#feature-comparison)
- [Skills](#-skills)
- [Memory](#-memory)
- [Instructions](#-instructions)
- [Getting Started](#-getting-started)
- [File Structure](#-file-structure)
- [Resources](#-resources)

---

## Overview

Before jumping into setup, it's important to understand the role of each feature:

| Feature | Purpose |
|---|---|
| **Instructions** | Define *how* Copilot should behave |
| **Memory** | Help Copilot *remember* project context |
| **Skills** | Help Copilot *execute* repeatable workflows |

> 💡 Once combined, these features can make Copilot feel much more aware of your actual codebase instead of generating generic suggestions.

---

## Feature Comparison

| | Skills | Memory | Instructions |
|---|---|---|---|
| **Purpose** | Automate repeatable tasks | Store project facts | Define coding behavior |
| **Defined by** | You (workflow steps) | Copilot + you | You (rules/guidelines) |
| **Persists?** | Yes (in files) | Yes (28-day expiry) | Yes (in files) |
| **Scope** | Repository | Repository | Repository |
| **Example** | PR code review workflow | "We use Angular + RxJS" | "Always write unit tests" |

---

## 🛠️ Skills

Skills guide Copilot through **repeatable workflows** and specialized tasks — like reviewing PRs, generating components, or creating release notes. You define them once so Copilot can follow the same workflow consistently.

**When to use:** Any task that follows the same steps every time and takes up developer time.

### Examples
- A **code review skill** that reads a PR, summarizes changes, flags missing tests, and highlights security risks
- A **release notes skill** that groups changes by type and follows semantic versioning

📖 See full guide: [docs/skills-guide.md](docs/skills-guide.md)

📁 Example skills:
- [.github/skills/code-review.md](.github/skills/code-review.md)
- [.github/skills/release-notes.md](.github/skills/release-notes.md)

---

## 🧠 Memory

Memory allows Copilot to **learn and retain facts** about your repository over time — such as coding conventions, architectural decisions, and recurring preferences — so you don't have to re-explain them in every session.

**When to use:** Store your tech stack, folder structure, preferred patterns, or libraries your team uses.

> ⚠️ **Note:** Copilot Memory is currently available in **public preview**. Features and defaults may change before general availability.

### Key Facts
- 📅 **28-day auto-expiry** — memories are automatically removed if not refreshed
- 🔒 **Repository-scoped** — does not carry over across repositories
- ✅ Applies to: Copilot coding agent, Copilot code review, Copilot CLI
- ❌ Does NOT apply to Copilot Chat in VS Code, JetBrains, or other IDEs

📖 See full guide: [docs/memory-guide.md](docs/memory-guide.md)

📁 Example memory config: [examples/angular-project-memory.md](examples/angular-project-memory.md)

---

## 📋 Instructions

Instructions guide **how Copilot should write code** — things like test coverage, naming conventions, and dependency approval.

**When to use:** Enforce consistent coding practices, naming conventions, and development guidelines across all contributors.

> ⚠️ Instructions are **behavioral guidelines**, not strict rules. Copilot is generative AI and may produce slightly different responses across sessions.

📖 See full guide: [docs/instructions-guide.md](docs/instructions-guide.md)

📁 Working example: [.github/copilot-instructions.md](.github/copilot-instructions.md)

---

## 🚀 Getting Started

### Step 1 — Add Instructions
Copy [`.github/copilot-instructions.md`](.github/copilot-instructions.md) into your repository and customize it to match your project's coding standards.

### Step 2 — Define Skills
Copy the skill files from [`.github/skills/`](.github/skills/) and adapt them to your team's common workflows.

### Step 3 — Seed Memory
Use Copilot Chat and tell it facts about your project:
```
Remember that this project uses Angular with standalone components and RxJS for state management.
```
Or let Copilot infer facts automatically from your codebase during sessions.

### Step 4 — Verify
Open a PR or start a Copilot Chat session and observe how Copilot applies your configuration.

---

## 📁 File Structure

```
github-copilot-poc/
├── README.md                          # This file
├── .github/
│   ├── copilot-instructions.md        # Copilot behavior instructions
│   └── skills/
│       ├── code-review.md             # Code review skill
│       └── release-notes.md           # Release notes skill
├── docs/
│   ├── skills-guide.md                # Full guide on Skills
│   ├── memory-guide.md                # Full guide on Memory
│   └── instructions-guide.md          # Full guide on Instructions
└── examples/
    └── angular-project-memory.md      # Example memory for Angular project
```

---

## 📖 Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Copilot Custom Instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)
- [Copilot Memory (Preview)](https://docs.github.com/en/copilot/concepts/copilot-memory)
- [GitHub Copilot Skills](https://docs.github.com/en/copilot)

---

> **Summary:** Skills automate tasks. Memory stores facts. Instructions tell Copilot how to behave.
