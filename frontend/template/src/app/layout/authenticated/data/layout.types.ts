export type User = {
  name: string
  email: string
  avatar: string
}

export type Team = {
  name: string
  logo: string
  plan: string
}

export type BaseNavItem = {
  title: string
  badge?: string
  icon?: string
  permissions?: string[]
  roles?: string[]
}

export type NavLink = BaseNavItem & {
  url: string
  items?: never
}

export type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: string })[]
  url?: never
}

export type NavItem = NavCollapsible | NavLink

export type NavGroup = {
  title: string
  roles?: string[]
  permissions?: string[]
  items: NavItem[]
}

export type SidebarData = {
  user: User
  teams: Team[]
  navGroups: NavGroup[]
}
