# Product and User Features Documentation

## Overview

This document provides comprehensive documentation for the **Product** and **User** features of the Angular application. These features demonstrate best practices for building scalable, maintainable Angular components and services.

---

## User Feature

### User Model

**Type:** Interface

**Purpose:**
Defines the structure of a user object representing an authenticated user in the application.

**Properties:**
- `id: string` — Unique identifier for the user
- `name: string` — Full name of the user
- `email: string` — Email address of the user
- `role: UserRole` — User's role (admin, user, or guest)
- `avatarUrl?: string` — Optional URL to the user's avatar image
- `lastLoginAt?: string` — Optional timestamp of the last login

**Type Definitions:**
```typescript
type UserRole = 'admin' | 'user' | 'guest';
```

**Notes:**
- All properties except `id`, `name`, `email`, and `role` are optional
- `UserRole` is a discriminated union for type safety

---

### UserService

**Type:** Service

**Purpose:**
Manages user data retrieval and caching. Provides methods to fetch user information from the API and automatically handles request caching to optimize performance and reduce network calls.

**Inputs / Constructor Parameters:**
- `HttpClient` — Angular's HTTP client for making API requests (injected)
- `environment.apiBaseUrl` — Base URL for API endpoints from environment configuration

**Public API:**

- `getUserById(id: string, forceRefresh?: boolean): Observable<User>`
  - Fetches a user by their unique ID
  - Caches requests using a request-level cache (not data cache)
  - `forceRefresh: boolean` (default: `false`) — If true, bypasses the cache and makes a fresh API call
  - **Returns:** Observable that emits the User object or throws an error
  - **Behavior:** Consecutive requests for the same user ID return the same observable instance (via `shareReplay`)

- `getCurrentUser(forceRefresh?: boolean): Observable<User>`
  - Convenience method that fetches the current authenticated user
  - Internally calls `getUserById('me', forceRefresh)`
  - **Returns:** Observable that emits the current User object

- `updateUser(id: string, changes: Partial<User>): Observable<User>`
  - Updates user data on the server
  - Automatically invalidates the cache for the updated user
  - **Parameters:**
    - `id: string` — User ID to update
    - `changes: Partial<User>` — Partial user object with fields to update
  - **Returns:** Observable that emits the updated User object
  - **Side Effects:** Updates the internal cache with the new user data

- `clearCache(id?: string): void`
  - Manually clears the request cache
  - If `id` is provided, clears only that user's cache
  - If `id` is omitted, clears the entire cache
  - **Parameters:**
    - `id?: string` — Optional user ID to clear (if omitted, all cache is cleared)

**Usage Example:**

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from './services/user.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-user-dashboard',
  template: `
    <div *ngIf="(user$ | async) as user">
      <h1>{{ user.name }}</h1>
      <p>Role: {{ user.role }}</p>
    </div>
  `,
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  user$ = this.userService.getCurrentUser();
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Component automatically subscribes via async pipe
  }

  refreshUser(): void {
    this.user$ = this.userService.getCurrentUser(true); // Force refresh
  }

  logout(): void {
    this.userService.clearCache();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
```

**Dependencies:**
- `@angular/common/http` — HttpClient for API communication
- `@angular/core` — Injectable decorator
- `rxjs` — Observable utilities for caching and error handling

**Notes:**
- The service uses **request-level caching** (via `shareReplay`), not data caching. This means multiple subscribers to the same request share the same observable and response.
- Cache is automatically cleared on API errors for the affected user
- Cache invalidation is automatic on `updateUser()` calls
- Manual cache clearing via `clearCache()` is useful for logout scenarios
- The service is provided at the root level (`providedIn: 'root'`), making it a singleton throughout the application

---

### UserProfileComponent

**Type:** Component

**Purpose:**
Displays the current authenticated user's profile information in a styled card. The component demonstrates best practices for handling asynchronous data with RxJS observables and proper lifecycle management.

**Inputs:**
- None — This component fetches its own data via `UserService`

**Outputs:**
- None — This is a presentational component

**Public API:**
- No public methods or properties exposed (presentation logic only)

**Usage Example:**

```typescript
// In a parent component or module
import { Component } from '@angular/core';
import { UserProfileComponent } from './components/user-profile.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UserProfileComponent],
  template: `
    <div class="container">
      <app-user-profile></app-user-profile>
    </div>
  `,
})
export class DashboardComponent {}
```

**Template Features:**
- **Loading State:** Displays a spinner while data is being fetched
- **User Display:** Shows user name, email, and role in a card layout
- **Tag Badge:** Displays "Angular 17 example" as a feature indicator

**Dependencies:**
- `UserService` — Provides current user data
- `LoadingSpinnerComponent` — Shared component for loading states
- `CommonModule` — Angular pipes and directives
- `AsyncPipe` — Automatically subscribes/unsubscribes from observables
- `RxJS (shareReplay, takeUntil)` — Observable operators for performance and cleanup

**Notes:**
- Component uses `OnPush` change detection for optimal performance
- Properly implements `OnDestroy` to prevent memory leaks
- `shareReplay` is applied at the component level to share the user data observable among all subscribers
- `takeUntil` pattern ensures the observable is unsubscribed when the component is destroyed
- The component handles loading states automatically via the async pipe

---

## Product Feature

### ProductListItem

**Type:** Interface

**Purpose:**
Defines the structure of a product item displayed in the product list.

**Properties:**
- `id: string` — Unique identifier for the product
- `name: string` — Display name of the product
- `category: string` — Product category or type
- `price: number` — Price of the product in the default currency

---

### ProductListComponent

**Type:** Component

**Purpose:**
Displays a list of products in a scrollable card layout. Each product shows its name, category, and price formatted as currency. The component is designed to be lightweight and reusable.

**Inputs:**
- `products: ReadonlyArray<ProductListItem>` (default: `[]`) — Array of products to display. Using `ReadonlyArray` ensures the component doesn't accidentally mutate the input.
- `isLoading: boolean` (default: `false`) — Loading state flag. When true, displays a spinner instead of the product list.

**Outputs:**
- None — This is a presentational component

**Public API:**
- `trackByProductId(index: number, product: ProductListItem): string`
  - TrackBy function for optimizing `*ngFor` rendering
  - Returns the unique product ID for identity tracking
  - **Usage:** Automatically used by the template via `trackBy: trackByProductId`
  - **Benefit:** Prevents unnecessary DOM recreation when the product list changes

**Usage Example:**

```typescript
import { Component } from '@angular/core';
import { ProductListComponent, ProductListItem } from './components/product-list.component';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <app-product-list
      [products]="products"
      [isLoading]="isLoading"
    ></app-product-list>
  `,
})
export class ProductCatalogComponent {
  products: ProductListItem[] = [
    { id: '1', name: 'Laptop', category: 'Electronics', price: 999.99 },
    { id: '2', name: 'Mouse', category: 'Accessories', price: 29.99 },
  ];
  isLoading = false;

  loadProducts(): void {
    this.isLoading = true;
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
```

**Template Features:**
- **Header Section:** Displays "Products" title and item count
- **Loading State:** Shows spinner when `isLoading` is true
- **Product List:** Renders products in a styled list with borders and spacing
- **Price Formatting:** Uses Angular's `CurrencyPipe` to format prices as USD currency
- **TrackBy Optimization:** Uses `trackBy` to efficiently render and update the list

**Dependencies:**
- `CommonModule` — For `*ngIf`, `*ngFor`, and `CommonModule` directives
- `CurrencyPipe` — Formats price values as currency
- `LoadingSpinnerComponent` — Shared loading indicator component
- `ChangeDetectionStrategy.OnPush` — Optimized change detection

**Notes:**
- Component uses `OnPush` change detection strategy for optimal performance
- The `trackByProductId` function prevents unnecessary DOM re-renders when the product list is updated
- Input uses `ReadonlyArray` to enforce immutability and prevent accidental mutations
- The component is **presentational only** — it receives data via `@Input()` properties and doesn't fetch data directly
- Uses Tailwind CSS for styling (rounded corners, borders, shadows, spacing)
- The component is designed as a **standalone component** for easier reusability and reduced bundle size

---

## Architecture Patterns

### Component Communication
- **User Feature:** Components use dependency injection to access `UserService`
- **Product Feature:** Parent component passes data to `ProductListComponent` via `@Input()` properties

### State Management
- **UserService:** Uses RxJS observables with caching and error handling
- **Components:** Use Angular's async pipe for automatic subscription management

### Change Detection
- Both features use `ChangeDetectionStrategy.OnPush` for optimal performance
- Components are responsive to input changes only, reducing unnecessary re-renders

### Error Handling
- `UserService` catches HTTP errors and clears cache for failed requests
- Components delegate error handling to the service layer

---

## Best Practices Demonstrated

1. **Standalone Components:** Both features use Angular 17 standalone components for better tree-shaking and reduced bundle sizes
2. **Immutability:** ProductListComponent uses `ReadonlyArray` to prevent accidental mutations
3. **Memory Leak Prevention:** UserProfileComponent properly cleans up subscriptions in `ngOnDestroy`
4. **Performance Optimization:**
   - `shareReplay` for request-level caching in UserService
   - `OnPush` change detection strategy in components
   - `trackBy` in product list iterations
5. **Type Safety:** Explicit TypeScript interfaces and types for all data structures
6. **Reusability:** Components are designed with single responsibilities and clear input/output contracts

---

## Testing Considerations

When testing these features, consider:

- **UserService:** Mock `HttpClient` and test caching behavior
- **UserProfileComponent:** Mock `UserService` and test async pipe handling
- **ProductListComponent:** Test with various product arrays and loading states
- Use `trackBy` tests to verify DOM optimization

