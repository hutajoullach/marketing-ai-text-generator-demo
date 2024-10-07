'use client'

import { cn } from '@demo/ui/src/lib/utils'

// import { useNavigation } from '@/store/use-navigation'

type WrapperProps = {
  children: React.ReactNode
}
export const Wrapper = ({ children }: WrapperProps) => {
  // const { navbarCollapsed, sidebarCollapsed } = useNavigation((state) => state)

  return (
    <nav
      className={cn(
        'h-[48px] md:pl-14 fixed inset-y-0 w-full z-50 overflow-hidden',
        // navbarCollapsed && 'h-[0px]',
        // sidebarCollapsed && 'md:pl-0',
      )}
    >
      {children}
    </nav>
  )
}
