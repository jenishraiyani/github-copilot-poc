# 🧠 Angular Project Memory Example

This is an example of what Copilot Memory might look like for an **Angular project**. Use this as a template and customize it for your own project.

---

## Tech Stack

- **Framework:** Angular 17 with standalone components
- **Language:** TypeScript with strict mode enabled
- **State Management:** RxJS and NgRx
- **Styling:** Tailwind CSS for utility-first styling
- **Testing:** Jest for unit tests, Cypress for end-to-end tests
- **Package Manager:** npm
- **Build Tool:** Angular CLI

---

## Project Structure

```
src/
├── app/
│   ├── features/              # Feature modules (feature-based)
│   │   ├── user/
│   │   ├── product/
│   │   └── dashboard/
│   ├── shared/                # Shared across features
│   │   ├── components/        # Reusable UI components
│   │   ├── directives/        # Custom directives
│   │   ├── pipes/             # Custom pipes
│   │   └── services/          # Shared business logic
│   ├── core/                  # Singleton services
│   │   ├── auth/
│   │   ├── http/
│   │   ├── logging/
│   │   └── error-handler/
│   ├── models/                # TypeScript interfaces and types
│   └── app.component.ts
├── environments/              # Environment configurations
├── assets/                    # Static assets (images, icons)
└── styles/                    # Global styles
```

---

## Naming Conventions

| Category | Pattern | Example |
|---|---|---|
| **Components** | PascalCase.component.ts | `UserProfile.component.ts` |
| **Services** | camelCase.service.ts | `userService.ts` |
| **Directives** | camelCase.directive.ts | `highlightDirective.ts` |
| **Pipes** | camelCase.pipe.ts | `currencyFormatPipe.ts` |
| **Models/Interfaces** | PascalCase | `User.interface.ts`, `Product.model.ts` |
| **Folders** | kebab-case | `src/app/user-profile` |
| **Variables** | camelCase | `userData`, `isLoading` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_TIMEOUT` |

---

## Code Patterns

### 1. Component Structure

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  userData$: Observable<User>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userData$ = this.userService.getUser();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

**Key points:**
- ✅ Use `OnPush` change detection strategy
- ✅ Implement `OnDestroy` to clean up subscriptions
- ✅ Use `takeUntil()` for subscription cleanup
- ✅ Return observables from services directly

### 2. Service Pattern

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/api/users';
  private userCache$ = new BehaviorSubject<User | null>(null);
  
  public user$ = this.userCache$.asObservable();

  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      tap((user) => this.userCache$.next(user)),
      shareReplay(1),
    );
  }
}
```

**Key points:**
- ✅ Export as singleton: `providedIn: 'root'`
- ✅ Use `shareReplay()` to avoid duplicate requests
- ✅ Expose data as observables (`user$`)

### 3. RxJS Best Practices

```typescript
// ✅ Use RxJS operators for async operations
items$ = this.itemService.getItems().pipe(
  filter(items => items.length > 0),
  map(items => items.map(item => ({ ...item, active: true }))),
  shareReplay(1),
);

// ✅ Use takeUntil() for cleanup
this.items$.pipe(
  takeUntil(this.destroy$)
).subscribe(items => this.processItems(items));

// ❌ Avoid manual subscriptions without cleanup
// this.items$.subscribe(items => ...); // Memory leak!
```

---

## Testing Patterns

### Unit Test Example

```typescript
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve a user by id', () => {
    const mockUser: User = { id: '1', name: 'John' };

    service.getUser('1').subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('/api/users/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });
});
```

**Key points:**
- ✅ Use `TestBed` for dependency injection
- ✅ Mock HTTP calls with `HttpTestingController`
- ✅ Always call `httpMock.verify()` in afterEach
- ✅ Test behavior, not implementation

---

## Security Practices

- 🔒 Use `HttpClientXsrfModule` to prevent CSRF attacks
- 🔒 Never hardcode API keys or secrets — use environment variables
- 🔒 Validate user input in components and services
- 🔒 Sanitize HTML content using Angular's `DomSanitizer`
- 🔒 Use Angular's built-in HTTP interceptors for auth headers

### Example: Auth Interceptor

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    
    return next.handle(req);
  }
}
```

---

## Performance Optimization

- ⚡ Use `OnPush` change detection strategy everywhere
- ⚡ Lazy-load feature modules
- ⚡ Use `trackBy` in `*ngFor` to prevent re-rendering
- ⚡ Implement virtual scrolling for large lists
- ⚡ Use `shareReplay()` to cache HTTP responses

### Example: TrackBy Function

```typescript
// ✅ Good: Prevents unnecessary DOM re-renders
trackByUserId(index: number, user: User): string {
  return user.id;
}

// In template:
<div *ngFor="let user of users$ | async; trackBy: trackByUserId">
  {{ user.name }}
</div>
```

---

## Dependency Management

- 📦 Only add dependencies with a PR review
- 📦 Keep Angular and RxJS versions in sync
- 📦 Review security advisories regularly
- 📦 Prefer lightweight libraries
- 📦 Use tree-shakeable imports

### Approved Libraries
- RxJS — Reactive programming
- NgRx — State management
- Tailwind CSS — Styling
- Jest — Testing framework
- Cypress — E2E testing

---

## Common Development Tasks

### Creating a Feature

1. Generate component: `ng generate component features/user-profile`
2. Generate service: `ng generate service features/user/services/user`
3. Add tests alongside the component/service
4. Export from feature module

### Adding a Shared Component

1. Generate in `shared/components/`: `ng generate component shared/components/button`
2. Export from `SharedModule`
3. Add comprehensive tests
4. Document in component's JSDoc

### Updating Dependencies

```bash
npm update                    # Update to latest compatible versions
npm outdated                  # Check for available updates
npm audit                     # Check for security vulnerabilities
npm audit fix                 # Fix vulnerabilities (if safe)
```

---

## Useful Commands

```bash
# Generate artifacts
ng generate component features/user/components/user-list
ng generate service features/user/services/user
ng generate directive shared/directives/highlight

# Run tests
npm run test                  # Run unit tests
npm run test:coverage         # With coverage report
npm run e2e                   # Run end-to-end tests

# Build and serve
ng serve                      # Development server
ng build --prod               # Production build
```

---

## When Copilot Should Remember This

This memory applies to:
- ✅ Writing new Angular components
- ✅ Creating services and HTTP interceptors
- ✅ Structuring feature modules
- ✅ Writing unit tests
- ✅ Following naming conventions
- ✅ Applying RxJS patterns

Refresh this memory by re-mentioning key facts every 20-25 days to keep it fresh.

---

> **This memory helps Copilot understand your Angular project structure, patterns, and conventions, making suggestions more relevant and consistent.** 🚀
