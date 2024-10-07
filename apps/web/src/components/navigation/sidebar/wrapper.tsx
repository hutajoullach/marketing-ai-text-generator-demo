'use client'

import { cn } from '@demo/ui/src/lib/utils'

// import { useNavigation } from '@/store/use-navigation'

type WrapperProps = {
  children: React.ReactNode
}
export const Wrapper = ({ children }: WrapperProps) => {
  // const { sidebarCollapsed } = useNavigation((state) => state)

  return (
    <aside
      className={cn(
        'hidden md:flex h-full w-14 flex-col fixed inset-y-0 z-50',
        // sidebarCollapsed && 'w-[1px]',
      )}
    >
      {children}
    </aside>
  )
}
