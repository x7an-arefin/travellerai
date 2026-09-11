import { UserStatus } from './schema'
import { SelectOption } from '@ui/select/hlm-select.components'

export const statusColors: Record<UserStatus, string> = {
  active: 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800 dark:text-emerald-400',
  inactive: 'bg-muted text-muted-foreground border-border',
  invited: 'bg-sky-500/10 text-sky-600 border-sky-200 dark:border-sky-800 dark:text-sky-400',
  suspended: 'bg-destructive/10 text-destructive border-destructive/20',
}

export const userRoles: SelectOption[] = [
  { label: 'Superadmin', value: 'superadmin', icon: 'lucideShield' },
  { label: 'Admin', value: 'admin', icon: 'lucideUserCheck' },
  { label: 'Manager', value: 'manager', icon: 'lucideUsers' },
  { label: 'Cashier', value: 'cashier', icon: 'lucideCreditCard' },
]
