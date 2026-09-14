import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideMapPin,
  lucidePackage,
  lucideSun,
  lucideCompass,
  lucideGlobe,
  lucideShieldCheck,
  lucideFileText,
} from '@ng-icons/lucide'
import { Destination } from '../data-access/models/destinations.model'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'

@Component({
  selector: 'app-destinations-detail',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmBadgeImports],
  providers: [
    provideIcons({
      lucideMapPin,
      lucidePackage,
      lucideSun,
      lucideCompass,
      lucideGlobe,
      lucideShieldCheck,
      lucideFileText,
    }),
  ],
  template: `
    @if (destination) {
      <div class="space-y-6 pt-2">
        <!-- Hero Cover -->
        <div class="relative rounded-xl overflow-hidden border border-border/50 shadow-xs h-48 sm:h-56">
          <img
            [src]="destination.coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'"
            [alt]="destination.name"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-4 text-white">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-primary text-primary-foreground uppercase tracking-wider">
                {{ destination.country }}
              </span>
              @if (destination.isFeatured) {
                <span class="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-500 text-black font-semibold">
                  Featured
                </span>
              }
            </div>
            <h3 class="text-xl font-bold leading-tight line-clamp-2">{{ destination.name }}</h3>
            <p class="text-xs text-white/80 mt-0.5">{{ destination.stateRegion || destination.country }}</p>
          </div>
        </div>

        <!-- Metric Badges -->
        <div class="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-muted/40 border border-border/40 text-center">
          <div>
            <p class="text-[10px] text-muted-foreground uppercase font-medium">Active Tours</p>
            <p class="text-base font-bold text-foreground mt-0.5">{{ destination.activePackagesCount || 0 }}</p>
          </div>
          <div class="border-x border-border/50">
            <p class="text-[10px] text-muted-foreground uppercase font-medium">Best Season</p>
            <p class="text-xs font-semibold text-foreground mt-1 truncate px-1">
              {{ destination.weatherInfo?.bestTimeToVisit || 'All Year' }}
            </p>
          </div>
          <div>
            <p class="text-[10px] text-muted-foreground uppercase font-medium">Status</p>
            <p class="text-xs font-semibold text-primary mt-1 capitalize">{{ destination.status }}</p>
          </div>
        </div>

        <!-- Description -->
        <div class="space-y-1.5">
          <h4 class="text-xs font-semibold text-foreground uppercase tracking-wider">Overview</h4>
          <p class="text-xs text-muted-foreground leading-relaxed">
            {{ destination.description || 'No description provided for this destination hub.' }}
          </p>
        </div>

        <!-- Travel Guide -->
        @if (destination.travelGuide) {
          <div class="space-y-1.5 p-3 rounded-lg bg-card border border-border/50">
            <div class="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <ng-icon name="lucideCompass" class="size-4 text-primary" />
              <span>Travel & Local Guidelines</span>
            </div>
            <p class="text-xs text-muted-foreground leading-relaxed pt-1">
              {{ destination.travelGuide }}
            </p>
          </div>
        }

        <!-- Practical Specs -->
        <div class="space-y-2 pt-2 border-t border-border/40">
          <h4 class="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Practical Insights</h4>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="p-2.5 rounded-lg border border-border/40 bg-muted/20">
              <div class="flex items-center gap-1 text-muted-foreground mb-1">
                <ng-icon name="lucideGlobe" class="size-3.5 text-primary" />
                <span class="text-[11px] font-medium">Visa & Entry</span>
              </div>
              <p class="text-xs text-foreground font-medium truncate">
                {{ destination.visaInfo || 'Standard international tourist rules' }}
              </p>
            </div>

            <div class="p-2.5 rounded-lg border border-border/40 bg-muted/20">
              <div class="flex items-center gap-1 text-muted-foreground mb-1">
                <ng-icon name="lucideShieldCheck" class="size-3.5 text-emerald-500" />
                <span class="text-[11px] font-medium">Safety Assessment</span>
              </div>
              <p class="text-xs text-foreground font-medium truncate">
                {{ destination.safetyInfo || 'Verified safe travel zone' }}
              </p>
            </div>
          </div>
        </div>

        <!-- SEO Metadata Info -->
        <div class="p-3 rounded-lg bg-muted/30 border border-border/30 text-xs text-muted-foreground space-y-1">
          <p class="font-medium text-foreground text-[11px]">SEO & Discoverability</p>
          <p class="text-[11px] truncate"><strong>Slug:</strong> /destinations/{{ destination.slug }}</p>
          <p class="text-[11px] truncate"><strong>Title:</strong> {{ destination.metaTitle || destination.name }}</p>
        </div>
      </div>
    }
  `,
})
export class DestinationsDetailComponent {
  @Input() destination: Destination | null = null
}
