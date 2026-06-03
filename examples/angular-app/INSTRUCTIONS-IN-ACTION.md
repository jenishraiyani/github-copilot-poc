# Instructions in Action

This example shows how the repository instructions influence Angular code
creation.

## Instruction: Always write unit tests for new logic

The services in this example include matching spec files:

```typescript
// examples/angular-app/src/app/features/user/services/user.service.spec.ts
it('should reuse the cached response for repeated requests', () => {
  // Arrange
  const firstRequest$ = service.getUserById('1');
  const secondRequest$ = service.getUserById('1');

  // Act
  firstRequest$.subscribe((user: User) => {
    expect(user.id).toBe('1');
  });
  secondRequest$.subscribe((user: User) => {
    expect(user.name).toBe('Jane Doe');
  });

  // Assert
  const request = httpController.expectOne('/api/users/1');
  request.flush(mockUser);
});
```

## Instruction: Use TypeScript with explicit type annotations

The example uses interfaces, unions, typed return values, and typed HTTP calls:

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

getUserById(id: string, forceRefresh: boolean = false): Observable<User> {
  return this.http.get<User>(`${this.apiUrl}/${id}`);
}
```

## Instruction: Use OnPush change detection and takeUntil() for cleanup

The user profile component follows the performance and cleanup pattern directly:

```typescript
@Component({
  selector: 'app-user-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  user$!: Observable<User>;

  ngOnInit(): void {
    this.user$ = this.userService.getCurrentUser().pipe(
      takeUntil(this.destroy$),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

## Instruction: Never hardcode secrets

Authentication code reads all environment-specific values from
`src/environments/environment.ts` and only adds auth headers when a token is
present.
