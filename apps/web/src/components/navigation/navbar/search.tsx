'use client'

import { Search as LucideSearch } from 'lucide-react'

import { cn } from '@demo/ui/src/lib/utils'
import { Button } from '@demo/ui/src/components/ui/button'

export const Search = () => {
  return (
    <Button
      variant="outline"
      className={cn(
        'relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none md:w-40 lg:w-64',
      )}
      onClick={() => {}}
    >
      <LucideSearch className="w-3.5 h-3.5 mr-0 md:mr-1" />
      <span className="hidden md:inline-flex">Search...</span>
      <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.4rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  )
}
