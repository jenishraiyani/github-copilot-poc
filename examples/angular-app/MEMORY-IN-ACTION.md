# Memory in Action

This example shows how remembered project facts change Copilot suggestions.

## Stored Memory: Angular 17 + RxJS + NgRx + Tailwind CSS

That memory leads Copilot toward standalone components, RxJS-first services, and
utility classes:

```typescript
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [AsyncPipe, NgIf, LoadingSpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <ng-container *ngIf="user$ | async as user; else loading">
        <h2 class="text-xl font-semibold text-slate-900">{{ user.name }}</h2>
      </ng-container>
    </section>
  `,
})
export class UserProfileComponent {}
```

## Stored Memory: Feature-based folder structure; services own HTTP and state

That memory affects where code lives and what responsibilities it has:

```text
src/app/features/user/
├── components/
│   └── user-profile.component.ts
├── models/
│   └── user.model.ts
└── services/
    ├── user.service.ts
    └── user.service.spec.ts
```

`user.service.ts` owns HTTP calls and request caching, while the component stays
focused on presentation.

## Stored Memory: Performance patterns matter

Because the memory highlights `OnPush`, `takeUntil()`, and `trackBy`, the example
includes them in the places Angular teams expect:

- `user-profile.component.ts` uses `OnPush` and `takeUntil()`
- `product-list.component.ts` uses `trackByProductId()`
- `user.service.ts` uses `shareReplay()` to avoid duplicate HTTP calls
