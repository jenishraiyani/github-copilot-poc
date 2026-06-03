import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  ProductListComponent,
  ProductListItem,
} from './features/product/components/product-list.component';
import { UserProfileComponent } from './features/user/components/user-profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserProfileComponent, ProductListComponent],
  template: `
    <main class="mx-auto grid max-w-5xl gap-6 p-6 md:grid-cols-[1.2fr_1fr]">
      <section>
        <h1 class="mb-4 text-3xl font-bold text-slate-900">
          Copilot Angular Example
        </h1>
        <p class="mb-6 text-slate-600">
          This sample demonstrates instructions, memory, and skills in one
          feature-based Angular codebase.
        </p>
        <app-user-profile></app-user-profile>
      </section>

      <app-product-list [products]="products"></app-product-list>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly products: ReadonlyArray<ProductListItem> = [
    {
      id: 'sku-1',
      name: 'Starter Plan',
      category: 'Subscription',
      price: 29,
    },
    {
      id: 'sku-2',
      name: 'Team Plan',
      category: 'Subscription',
      price: 79,
    },
    {
      id: 'sku-3',
      name: 'Analytics Add-on',
      category: 'Add-on',
      price: 19,
    },
  ];
}
