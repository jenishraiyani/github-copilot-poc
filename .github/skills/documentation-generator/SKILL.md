---
name: documentation-generator
description: Generate clear and consistent documentation for Angular components, services, directives, pipes, modules, and APIs.
---

# Documentation Generator Skill

Generates clear, consistent, high-quality documentation for Angular projects — components, services, directives, pipes, modules, and public APIs.

---

## When to Use

- Creating documentation for new features
- Documenting Angular components and services
- Generating README sections
- Documenting APIs and reusable utilities

---

## Workflow

### 1. Identify the Purpose
- Determine what the component, service, directive, pipe, or module does
- Identify its role within the feature or module it belongs to

### 2. Explain Inputs, Outputs, and Responsibilities
- Document `@Input()` and `@Output()` properties
- Describe constructor parameters and injected dependencies
- Summarize the primary responsibility of the code unit

### 3. Document Public Methods and Properties
- List public methods with their parameters and return types
- Document public properties and their purpose
- Note any side effects or state changes

### 4. Include Usage Examples
- Add a minimal, realistic usage example where it improves clarity
- Show template usage for components, directives, and pipes
- Show injection and method calls for services

### 5. Mention Dependencies and Notes
- List required modules, services, or external libraries
- Call out important constraints, edge cases, or limitations

### 6. Follow a Consistent Structure
Use the same section order for every documented unit:

```markdown
## <Name>

**Type:** Component | Service | Directive | Pipe | Module

**Purpose:**
Short description of what this does and why it exists.

**Inputs / Outputs / Parameters:**
- `propertyName: Type` — description

**Public API:**
- `methodName(params): ReturnType` — description

**Usage Example:**
```typescript
// minimal usage example
```

**Dependencies:**
- List of required modules/services

**Notes:**
- Limitations, edge cases, or important behavior
```

---

## Expected Output

- Well-structured, Markdown-formatted documentation
- Clear, concise descriptions of purpose and behavior
- Documented inputs, outputs, and public methods/properties
- Usage examples where they add clarity
- Notes on dependencies or limitations
- Consistent structure across all documented units
