'use client'

import { cn } from '@demo/ui/src/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@demo/ui/src/components/ui/tooltip'

type ActionTooltipProps = {
  label: string
  children: React.ReactNode
  asChild?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  uncheckedCount?: string
}
export const ActionTooltip = ({
  label,
  children,
  asChild,
  side,
  align,
  uncheckedCount,
}: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align} className="bg-white py-1">
          <span className="ml-auto text-xs text-black">{label}</span>
          <span
            className={cn('text-xs text-zinc-400', uncheckedCount && 'ml-4')}
          >
            {uncheckedCount}
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
