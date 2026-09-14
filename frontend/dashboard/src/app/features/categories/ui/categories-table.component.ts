import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideEdit,
  lucideTrash2,
  lucideBoxes,
  lucidePackage,
  lucideCheck,
} from '@ng-icons/lucide'
import { Category } from '../data-access/models/categories.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-categories-table',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports, ...HlmButtonImports],
  providers: [
    provideIcons({
      lucideEdit,
      lucideTrash2,
      lucideBoxes,
      lucidePackage,
      lucideCheck,
    }),
  ],
  template: `
    <div class="rounded-xl border border-border/50 bg-card overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider border-b border-border/40">
            <tr>
              <th scope="col" class="py-3.5 px-4">Category & Taxonomy</th>
              <th scope="col" class="py-3.5 px-4">Slug Identifier</th>
              <th scope="col" class="py-3.5 px-4">Active Packages</th>
              <th scope="col" class="py-3.5 px-4">Sort Order</th>
              <th scope="col" class="py-3.5 px-4">Status</th>
              <th scope="col" class="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/30">
            @if (isLoading) {
              @for (i of [1, 2, 3, 4]; track i) {
                <tr class="animate-pulse">
                  <td class="py-4 px-4"><div class="h-10 w-48 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-5 w-32 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-5 w-16 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-5 w-10 bg-muted rounded"></div></td>
                  <td class="py-4 px-4"><div class="h-5 w-16 bg-muted rounded"></div></td>
                  <td class="py-4 px-4 text-right"><div class="h-8 w-16 bg-muted rounded ml-auto"></div></td>
                </tr>
              }
            } @else if (items.length === 0) {
              <tr>
                <td colspan="6" class="py-12 text-center text-muted-foreground text-sm">
                  <div class="flex flex-col items-center justify-center gap-2">
                    <ng-icon name="lucideBoxes" class="size-8 text-muted-foreground/50" />
                    <p>No categories found matching your query</p>
                  </div>
                </td>
              </tr>
            } @else {
              @for (item of items; track item.id) {
                <tr class="hover:bg-muted/20 transition-colors">
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-3">
                      <img
                        [src]="item.coverImage || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200'"
                        [alt]="item.name"
                        class="size-10 rounded-lg object-cover border border-border/50 shrink-0"
                      />
                      <div class="min-w-0">
                        <p class="font-semibold text-foreground text-sm truncate">{{ item.name }}</p>
                        <p class="text-xs text-muted-foreground truncate max-w-xs">{{ item.description || 'Tour category' }}</p>
                      </div>
                    </div>
                  </td>

                  <td class="py-3.5 px-4 text-xs font-mono text-muted-foreground">
                    {{ item.slug }}
                  </td>

                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <ng-icon name="lucidePackage" class="size-3.5 text-primary" />
                      <span>{{ item.packageCount || 0 }} Packages</span>
                    </div>
                  </td>

                  <td class="py-3.5 px-4 text-xs font-medium text-muted-foreground">
                    #{{ item.sortOrder || 1 }}
                  </td>

                  <td class="py-3.5 px-4">
                    <span
                      hlmBadge
                      [variant]="item.status === 'active' ? 'default' : 'outline'"
                      class="text-[10px] capitalize font-medium"
                    >
                      {{ item.status }}
                    </span>
                  </td>

                  <td class="py-3.5 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <button
                        hlmBtn
                        variant="ghost"
                        size="icon"
                        class="size-8 cursor-pointer text-muted-foreground hover:text-foreground"
                        title="Edit Category"
                        (click)="edit.emit(item.id)"
                      >
                        <ng-icon name="lucideEdit" class="size-4" />
                      </button>
                      <button
                        hlmBtn
                        variant="ghost"
                        size="icon"
                        class="size-8 cursor-pointer text-muted-foreground hover:text-destructive"
                        title="Delete Category"
                        (click)="delete.emit(item.id)"
                      >
                        <ng-icon name="lucideTrash2" class="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class CategoriesTableComponent {
  @Input() items: Category[] = []
  @Input() isLoading = false

  @Output() edit = new EventEmitter<string>()
  @Output() delete = new EventEmitter<string>()
}
