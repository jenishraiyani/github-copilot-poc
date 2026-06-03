import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subject, shareReplay, takeUntil } from 'rxjs';

import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner.component';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [AsyncPipe, NgIf, LoadingSpinnerComponent],
  template: `
    <section class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <ng-container *ngIf="user$ | async as user; else loading">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-sm font-medium uppercase tracking-wide text-slate-500">
              {{ user.role }}
            </p>
            <h2 class="text-2xl font-semibold text-slate-900">{{ user.name }}</h2>
            <p class="mt-1 text-sm text-slate-600">{{ user.email }}</p>
          </div>
          <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            Angular 17 example
          </span>
        </div>
      </ng-container>

      <ng-template #loading>
        <app-loading-spinner label="Loading user profile"></app-loading-spinner>
      </ng-template>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();

  user$!: Observable<User>;

  constructor(private readonly userService: UserService) {}

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
