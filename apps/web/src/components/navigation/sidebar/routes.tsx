'use client'

import { usePathname, useParams } from 'next/navigation'
import {
  FolderOpenDot,
  FolderPlus,
  Settings,
  Database,
  BarChart3,
} from 'lucide-react'

import { ScrollArea } from '@demo/ui/src/components/ui/scroll-area'

import { Item } from './item'

const guestRoutes = [
  {
    icon: FolderOpenDot,
    label: 'Projects',
    href: 'projects',
  },
  {
    icon: FolderPlus,
    label: 'New',
    href: 'new',
  },
  {
    icon: Settings,
    label: 'Account',
    href: 'account',
  },
]

// const enterpriseRoutes = [
//   {
//     icon: Database,
//     label: 'Data',
//     href: 'enterprise/data',
//   },
//   {
//     icon: BarChart3,
//     label: 'Analytics',
//     href: 'enterprise/analytics',
//   },
// ]

export const Routes = () => {
  const pathname = usePathname()
  const params = useParams()

  // const isEnterprisePage = pathname?.includes('/enterprise')
  // const routes = isEnterprisePage ? enterpriseRoutes : guestRoutes
  const routes = guestRoutes

  return (
    <ScrollArea className="flex-1 w-full">
      <nav className="flex flex-col px-2 pt-4 gap-4">
        {routes.map((route) => (
          <Item
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={`/${route.href}`}
          />
        ))}
      </nav>
    </ScrollArea>
  )
}
