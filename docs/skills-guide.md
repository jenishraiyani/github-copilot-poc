# 📋 Skills Guide

Learn how to define and use Copilot Skills to automate repeatable workflows in your development process.

---

## What Are Skills?

**Skills** are defined workflows that guide Copilot through repeatable tasks. Instead of manually prompting Copilot each time, you define a skill once, and Copilot can follow the same workflow consistently when that task arises.

> 💡 Think of skills as **automated playbooks** for common development tasks.

---

## When to Use Skills

Skills work best for tasks that:
- ✅ Follow the same steps every time
- ✅ Take up significant developer time
- ✅ Need to be applied consistently across the team
- ✅ Produce structured output

### Good Skill Candidates
- 📝 Code review workflows
- 📄 Release notes generation
- 🧪 Test case generation
- 🔍 Code quality analysis
- 📋 Documentation generation
- 🔒 Security audit workflows

### Poor Skill Candidates
- ❌ One-off exploratory tasks
- ❌ Tasks requiring heavy creative input
- ❌ Tasks with highly variable processes

---

## How Skills Work

1. **Define** — You describe the workflow steps in a Markdown file
2. **Organize** — Place skills in `.github/skills/` directory
3. **Invoke** — Call the skill using Copilot Chat: `@copilot #skill-name`
4. **Execute** — Copilot follows the defined workflow and produces output

---

## Skill Structure

Each skill should have:

### Header
```markdown
# 📝 Skill Name

Short description of what the skill does.
```

### Workflow Steps
```markdown
## Workflow Steps

### 1. Step One
- Detailed action or checklist
- Specific requirements

### 2. Step Two
- Next action
- Expected outcome
```

### Usage
```markdown
## Usage

How to invoke the skill:

```
@copilot #skill-name
```
```

### Expected Output
```markdown
## Expected Output

Example of what the skill produces.

```
Example formatted output here
```
```

### Customization
```markdown
## Customization

How to adapt this skill to your needs.
```

---

## Example Skills Included

### 1. Code Review Skill (`.github/skills/code-review.md`)
Systematically reviews pull requests:
- Summarizes changes
- Flags missing tests
- Identifies security risks
- Provides structured feedback

**Invoke with:**
```
@copilot review this PR using the code review skill
```

### 2. Release Notes Skill (`.github/skills/release-notes.md`)
Generates organized release notes:
- Groups changes by category
- Follows semantic versioning
- Includes contributor credits

**Invoke with:**
```
@copilot generate release notes for version 2.1.0
```

---

## Writing Your Own Skill

### Step 1 — Identify the Task
- What is the repeatable process?
- What are the consistent steps?
- What should the output look like?

### Step 2 — Document the Workflow
Write clear, numbered steps:
```markdown
## Workflow Steps

### 1. Analyze Input
- Check the input format
- Validate requirements

### 2. Process Data
- Transform or analyze data
- Apply business logic

### 3. Generate Output
- Format results
- Provide structured response
```

### Step 3 — Show an Example
Provide a realistic example of what the skill produces:
```markdown
## Expected Output

```
Example: If generating code comments, show a sample commented code block
```
```

### Step 4 — Allow Customization
Explain how to adapt the skill:
```markdown
## Customization

To modify this skill:
- Adjust the workflow steps
- Change output format
- Add/remove categories
```

### Step 5 — Save in `.github/skills/`
```
.github/skills/my-skill-name.md
```

---

## Best Practices

### ✅ Do's
- 📌 Keep workflows **simple and linear** — avoid complex branching
- 📝 Use **clear, descriptive language** — Copilot needs to understand intent
- 📊 Provide **examples of output** — show exactly what you expect
- 🔄 Make skills **reusable** — they should apply to many situations
- 📚 Document **assumptions** — what does the skill assume about input?

### ❌ Don'ts
- ❌ Don't create skills for **one-time tasks**
- ❌ Don't make workflows **too complex** (keep to 5-10 steps)
- ❌ Don't assume **context Copilot may not have**
- ❌ Don't skip **expected output examples**

---

## Invoking Skills in Different Contexts

### In Copilot Chat
```
@copilot #code-review
```

### In Pull Request Comments
```
@copilot review using the code review skill
```

### In VS Code
Open Copilot Chat and reference the skill:
```
@copilot help me with release notes using #release-notes
```

---

## Testing Your Skill

To verify a skill works well:

1. **Try it manually** — Follow the steps yourself, record the process
2. **Ask Copilot** — Invoke the skill and observe output
3. **Compare results** — Does the output match what you expected?
4. **Refine** — Update the skill if steps are unclear or output is off
5. **Document** — Update the skill with learnings

---

## Organizing Multiple Skills

As you create more skills, organize them:

```
.github/
├── skills/
│   ├── code-review.md
│   ├── release-notes.md
│   ├── test-generation.md
│   ├── documentation.md
│   └── README.md          # Index of all skills
```

Create a `skills/README.md` to list all available skills:

```markdown
# 🛠️ Available Skills

- **#code-review** — Automated PR code review
- **#release-notes** — Generate organized release notes
- **#test-generation** — Generate unit tests
- **#documentation** — Generate API documentation
```

---

## Real-World Workflow Example

### Scenario: Code Review Process

**Without a Skill:**
```
Developer: @copilot can you review this PR? 
           Check for tests, security issues, and code quality.
           Summarize what changed. Flag any problems.
```
(Copilot generates response, but it's generic and inconsistent)

**With a Skill:**
```
Developer: @copilot #code-review
```
(Copilot follows the exact workflow defined in `.github/skills/code-review.md`)
- Summarizes changes systematically ✅
- Flags missing tests consistently ✅
- Highlights security issues every time ✅
- Produces structured, actionable feedback ✅

---

> **Skills automate tasks. Combined with Memory and Instructions, skills make Copilot an even more powerful pair programmer.** 🤖
