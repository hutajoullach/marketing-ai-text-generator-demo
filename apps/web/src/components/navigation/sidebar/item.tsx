'use client'

import Link from 'next/link'
import { type LucideIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { cn } from '@demo/ui/src/lib/utils'
import { Button } from '@demo/ui/src/components/ui/button'

import { ActionTooltip } from '@/components/primitives/action-tooltip'

type ItemProps = {
  icon: LucideIcon
  label: string
  href: string
}
export const Item = ({ icon: Icon, label, href }: ItemProps) => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <ActionTooltip
      label={label}
      side="right"
      align="center"
      // uncheckedCount="126"
      asChild
    >
      <Link href={href}>
        <Button
          variant="default"
          size="sm"
          className="group relative flex items-center px-2.5"
          // onClick={onClick}
        >
          {/* <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[3px]",
            !isActive && "group-hover:h-[20px]",
            isActive ? "h-[36px]" : "h-[8px]"
          )}
        /> */}
          <div
            className={cn(
              'relative group flex w-full h-full transition-all overflow-hidden',
              // isActive && 'bg-accent text-primary rounded-md',
            )}
          >
            <div className="flex items-center justify-center w-full">
              <Icon
                size={19}
                className={cn(
                  'text-white group-hover:text-white',
                  // isActive && 'text-muted-foreground',
                )}
              />
            </div>
          </div>
        </Button>
      </Link>
    </ActionTooltip>
  )
}
