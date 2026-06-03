# 📋 Code Review Skill

Automated skill for Copilot to review pull requests systematically.

## Workflow Steps

### 1. Summarize Changes
- List all files modified (added, changed, deleted)
- Provide a high-level summary of what the PR does
- Identify the PR's main purpose

### 2. Flag Missing Tests
- Check if new logic has corresponding unit tests
- Verify test coverage is adequate (>80%)
- Highlight untested code paths

### 3. Security Review
- Check for hardcoded secrets or credentials
- Identify potential SQL injection or XSS vulnerabilities
- Review authentication/authorization changes
- Check for unsafe dependencies

### 4. Code Quality Check
- Verify naming conventions are followed
- Check for code duplication
- Identify potential performance issues
- Review error handling implementation

### 5. Generate Summary Report
- Provide a structured code review comment
- List blockers, warnings, and suggestions
- Suggest approval if all checks pass

---

## Usage

Invoke this skill in Copilot by saying:

```
@copilot review this PR using the code review skill
```

Or in a PR context:

```
@copilot #code-review
```

---

## Expected Output

**Code Review Report**

✅ **Summary:**  
- Modified 3 files: `auth.ts`, `user.service.ts`, `user.service.spec.ts`
- Adds JWT token refresh functionality
- Improves authentication error handling

🧪 **Test Coverage:**  
- ✅ Unit tests added for `refreshToken()` function
- ✅ Edge cases covered (expired tokens, invalid tokens)
- Coverage: 92%

🔒 **Security:**  
- ✅ No hardcoded secrets detected
- ✅ No SQL injection vulnerabilities found
- ✅ Proper input validation in place

📝 **Code Quality:**  
- ✅ Naming conventions followed
- ⚠️ Minor: Consider extracting `tokenRefresh` logic into separate utility
- ⚠️ Missing error logging for token refresh failures

**Recommendation:** ✅ **Approve** — All checks pass with minor suggestions

---

## Customization

Edit this skill to match your team's code review priorities:
- Add specific security frameworks (e.g., OWASP, CWE)
- Adjust test coverage thresholds
- Include architecture review checks
- Add compliance requirements
