'use client'

import { cn } from '@demo/ui/src/lib/utils'

type WrapperProps = {
  children: React.ReactNode
}
export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <aside
      className={cn('hidden md:flex h-full w-14 flex-col fixed inset-y-0 z-50')}
    >
      {children}
    </aside>
  )
}
