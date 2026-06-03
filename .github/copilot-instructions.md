# 🤖 Copilot Custom Instructions

Custom instructions guide how GitHub Copilot should write code for this repository. These include coding standards, naming conventions, test requirements, and development guidelines.

## Code Style & Formatting

- Use **2-space indentation** for all files
- Use **kebab-case** for file and folder names
- Use **PascalCase** for component and class names
- Use **camelCase** for variables and functions
- Keep lines under **100 characters** where possible

## TypeScript/JavaScript Standards

- Always use **TypeScript** instead of plain JavaScript
- Define explicit type annotations for function parameters and return types
- Use `interface` for object shapes; use `type` for unions and complex types
- Avoid `any` type — use `unknown` if necessary and narrow the type

### Example:
```typescript
// ✅ Good
function getUserById(id: string): Promise<User | null> {
  return db.users.findById(id);
}

// ❌ Avoid
function getUser(id: any): any {
  return db.users.findById(id);
}
```

## Testing Requirements

- **All new logic must have unit tests** — aim for >80% code coverage
- Use **descriptive test names** that explain what is being tested
- Follow the **Arrange-Act-Assert** pattern
- Mock external dependencies (APIs, databases, file system)

### Example:
```typescript
describe('getUserById', () => {
  it('should return a user when found by id', async () => {
    // Arrange
    const userId = '123';
    const mockUser = { id: userId, name: 'John' };
    jest.spyOn(db.users, 'findById').mockResolvedValue(mockUser);

    // Act
    const result = await getUserById(userId);

    // Assert
    expect(result).toEqual(mockUser);
  });
});
```

## Naming Conventions

| Category | Convention | Example |
|---|---|---|
| Components | PascalCase | `UserProfile.tsx` |
| Functions | camelCase | `fetchUserData()` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| Variables | camelCase | `isLoading` |
| Files | kebab-case | `user-profile.ts` |
| Folders | kebab-case | `src/utils/http` |

## Dependencies & Imports

- **Do NOT add new dependencies without a pull request review**
- Keep dependencies up-to-date; review security advisories regularly
- Use **tree-shakeable imports** to reduce bundle size
  ```typescript
  // ✅ Good — tree-shakeable
  import { map } from 'rxjs/operators';
  
  // ❌ Avoid — not tree-shakeable
  import * as rxjs from 'rxjs';
  ```

## Error Handling

- Always handle errors explicitly — no silent failures
- Use meaningful error messages that help debugging
- Log errors with appropriate severity levels (info, warn, error)

### Example:
```typescript
try {
  await saveUser(user);
} catch (error) {
  logger.error('Failed to save user', { userId: user.id, error });
  throw new AppError('User save failed', 'USER_SAVE_ERROR', { cause: error });
}
```

## Code Comments & Documentation

- Write **self-documenting code** — use clear names instead of comments
- Comment only the "why", not the "what" — the code shows the what
- Add JSDoc comments for public functions and classes

### Example:
```typescript
/**
 * Fetches user data from the database with caching.
 * Uses a 5-minute cache TTL to reduce database load.
 * 
 * @param userId - The unique user identifier
 * @returns The user data or null if not found
 * @throws {DatabaseError} If the database query fails
 */
export async function getUserWithCache(userId: string): Promise<User | null> {
  const cacheKey = `user:${userId}`;
  const cached = cache.get(cacheKey);
  
  if (cached) return cached;
  
  const user = await db.users.findById(userId);
  if (user) cache.set(cacheKey, user, { ttl: 300 });
  
  return user;
}
```

## Security Guidelines

- **Never hardcode secrets** — use environment variables
- Validate all user inputs before processing
- Sanitize data before storing in databases or rendering in UI
- Use **parameterized queries** to prevent SQL injection
- Implement **rate limiting** for API endpoints

## Performance Optimization

- Lazy-load components and features when possible
- Use **pagination** for large data sets
- Implement caching strategically to avoid stale data
- Monitor bundle size; aim to keep it under 500KB (gzipped)

## Accessibility (a11y)

- Use semantic HTML elements (`<button>`, `<form>`, `<nav>`)
- Add **alt text** to all images
- Ensure color contrast meets WCAG AA standards
- Support **keyboard navigation** for all interactive elements

---

> These instructions guide Copilot's code generation. Remember: Copilot is generative AI and may produce slightly different responses across sessions. Use these as behavioral guidelines, not strict deterministic rules.
