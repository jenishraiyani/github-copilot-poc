import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div
      class="flex items-center gap-3 text-sm text-slate-600"
      role="status"
      [attr.aria-label]="label"
    >
      <span
        class="inline-block h-4 w-4 animate-spin rounded-full border-2"
        [class.border-slate-300]="true"
        [class.border-t-slate-700]="true"
        aria-hidden="true"
      ></span>
      <span>{{ label }}</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinnerComponent {
  @Input() label: string = 'Loading content';
}
