import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Category } from '../data-access/models/categories.model'
import { NewCategory } from '../data-access/models/categories-api.types'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'

@Component({
  selector: 'app-categories-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ...HlmButtonImports],
  template: `
    <form (ngSubmit)="onSubmit()" class="space-y-4 pt-2">
      <!-- Name -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Category Name *</label>
        <input
          type="text"
          name="name"
          [(ngModel)]="formData.name"
          (ngModelChange)="onNameChange($event)"
          required
          placeholder="e.g. Alpine Trekking & Mountaineering"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        />
      </div>

      <!-- Slug -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Slug Identifier *</label>
        <input
          type="text"
          name="slug"
          [(ngModel)]="formData.slug"
          required
          placeholder="e.g. alpine-trekking-mountaineering"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        />
      </div>

      <!-- Icon & Sort Order -->
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Icon Name</label>
          <input
            type="text"
            name="icon"
            [(ngModel)]="formData.icon"
            placeholder="e.g. mountain, compass, ship"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Sort Order</label>
          <input
            type="number"
            name="sortOrder"
            [(ngModel)]="formData.sortOrder"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>
      </div>

      <!-- Cover Image -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Cover Image URL</label>
        <input
          type="url"
          name="coverImage"
          [(ngModel)]="formData.coverImage"
          placeholder="https://images.unsplash.com/..."
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        />
      </div>

      <!-- Status -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Status</label>
        <select
          name="status"
          [(ngModel)]="formData.status"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <!-- Description -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-foreground">Description</label>
        <textarea
          name="description"
          [(ngModel)]="formData.description"
          rows="3"
          placeholder="Brief description of travel packages and activities grouped under this taxonomy..."
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs resize-none"
        ></textarea>
      </div>

      <!-- Buttons -->
      <div class="flex items-center justify-end gap-2 pt-4 border-t border-border/50">
        <button
          hlmBtn
          variant="outline"
          type="button"
          (click)="cancel.emit()"
          class="cursor-pointer"
        >
          Cancel
        </button>
        <button
          hlmBtn
          variant="default"
          type="submit"
          class="cursor-pointer shadow-xs"
        >
          {{ isEdit ? 'Update Category' : 'Create Category' }}
        </button>
      </div>
    </form>
  `,
})
export class CategoriesFormComponent implements OnInit {
  @Input() category: Category | null = null
  @Input() isEdit = false

  @Output() save = new EventEmitter<NewCategory>()
  @Output() cancel = new EventEmitter<void>()

  formData = {
    name: '',
    slug: '',
    icon: 'compass',
    coverImage: '',
    sortOrder: 1,
    status: 'active' as 'active' | 'inactive',
    description: '',
  }

  ngOnInit(): void {
    if (this.category && this.isEdit) {
      this.formData = {
        name: this.category.name,
        slug: this.category.slug,
        icon: this.category.icon || 'compass',
        coverImage: this.category.coverImage || '',
        sortOrder: this.category.sortOrder || 1,
        status: this.category.status,
        description: this.category.description || '',
      }
    }
  }

  onNameChange(name: string): void {
    if (!this.isEdit) {
      this.formData.slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    }
  }

  onSubmit(): void {
    if (!this.formData.name) return

    const dto: NewCategory = {
      name: this.formData.name,
      slug: this.formData.slug || this.formData.name.toLowerCase().replace(/\s+/g, '-'),
      icon: this.formData.icon,
      coverImage: this.formData.coverImage,
      sortOrder: this.formData.sortOrder,
      status: this.formData.status,
      description: this.formData.description,
    }
    this.save.emit(dto)
  }
}
