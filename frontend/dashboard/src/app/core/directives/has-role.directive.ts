import { Directive, Input, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core'
import { AuthService } from '../services/auth.service'

@Directive({
  selector: '[hasRole], [hasPermission]',
  standalone: true,
})
export class HasRoleDirective {
  private readonly authService = inject(AuthService)
  private readonly viewContainer = inject(ViewContainerRef)
  private readonly templateRef = inject(TemplateRef<unknown>)

  private allowedRoles: string[] = []
  private requiredPermission = ''

  @Input()
  set hasRole(roles: string[] | string) {
    this.allowedRoles = Array.isArray(roles) ? roles : [roles]
    this.updateView()
  }

  @Input()
  set hasPermission(permission: string) {
    this.requiredPermission = permission
    this.updateView()
  }

  constructor() {
    effect(() => {
      this.authService.user()
      this.updateView()
    })
  }

  private updateView(): void {
    const roleAllowed = this.allowedRoles.length === 0 || this.authService.hasRole(this.allowedRoles)
    const permissionAllowed = !this.requiredPermission || this.authService.hasPermission(this.requiredPermission)
    this.viewContainer.clear()
    if (roleAllowed && permissionAllowed) this.viewContainer.createEmbeddedView(this.templateRef)
  }
}
