'use client'

import Link from 'next/link'
import { type LucideIcon } from 'lucide-react'

import { cn } from '@demo/ui/src/lib/utils'
import { Button } from '@demo/ui/src/components/ui/button'

import { ActionTooltip } from '@/components/primitives/action-tooltip'

type ItemProps = {
  icon: LucideIcon
  label: string
  href: string
}
export const Item = ({ icon: Icon, label, href }: ItemProps) => {
  return (
    <ActionTooltip label={label} side="right" align="center" asChild>
      <Link href={href}>
        <Button
          variant="default"
          size="sm"
          className="group relative flex items-center px-2.5"
        >
          <div
            className={cn(
              'relative group flex w-full h-full transition-all overflow-hidden',
            )}
          >
            <div className="flex items-center justify-center w-full">
              <Icon
                size={19}
                className={cn('text-white group-hover:text-white')}
              />
            </div>
          </div>
        </Button>
      </Link>
    </ActionTooltip>
  )
}
