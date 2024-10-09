'use client'

import { cn } from '@demo/ui/src/lib/utils'

type WrapperProps = {
  children: React.ReactNode
}
export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <nav
      className={cn(
        'h-[48px] md:pl-14 fixed inset-y-0 w-full z-50 overflow-hidden',
      )}
    >
      {children}
    </nav>
  )
}
