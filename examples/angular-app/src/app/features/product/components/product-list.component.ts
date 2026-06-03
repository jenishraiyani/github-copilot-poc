import { CommonModule, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner.component';

export interface ProductListItem {
  id: string;
  name: string;
  category: string;
  price: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, LoadingSpinnerComponent],
  template: `
    <section class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-slate-900">Products</h2>
        <span class="text-sm text-slate-500">{{ products.length }} items</span>
      </div>

      <app-loading-spinner
        *ngIf="isLoading"
        label="Loading product list"
      ></app-loading-spinner>

      <ul *ngIf="!isLoading" class="space-y-3">
        <li
          *ngFor="let product of products; trackBy: trackByProductId"
          class="flex items-center justify-between rounded-md border border-slate-100 p-3"
        >
          <div>
            <p class="font-medium text-slate-900">{{ product.name }}</p>
            <p class="text-sm text-slate-500">{{ product.category }}</p>
          </div>
          <span class="text-sm font-semibold text-slate-700">
            {{ product.price | currency:'USD':'symbol':'1.2-2' }}
          </span>
        </li>
      </ul>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  @Input() products: ReadonlyArray<ProductListItem> = [];
  @Input() isLoading: boolean = false;

  trackByProductId(index: number, product: ProductListItem): string {
    return product.id;
  }
}
