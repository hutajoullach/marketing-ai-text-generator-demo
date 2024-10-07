'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChevronsUpDown, Check, PlusCircle } from 'lucide-react'

import { generateRandomString } from '@demo/lib/utils/helper'
import { cn } from '@demo/ui/src/lib/utils'
import { Button } from '@demo/ui/src/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@demo/ui/src/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@demo/ui/src/components/ui/command'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@demo/ui/src/components/ui/avatar'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>
interface SwitcherProps extends PopoverTriggerProps {}
export const Switcher = ({ className }: SwitcherProps) => {
  const router = useRouter()
  const params = useParams()

  const [open, setOpen] = useState(false)
  const [iconString, setIconString] = useState(() => generateRandomString('6'))
  const selectedProject = {
    label: 'My Project',
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a project"
          className={cn(
            'w-[120px] sm:w-[180px] md:w-[200px] h-9 justify-start overflow-hidden',
            className,
          )}
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage
              src={`https://avatar.vercel.sh/${iconString}.png`}
              alt={iconString}
            />
            <AvatarFallback>{/* SC */}</AvatarFallback>
          </Avatar>
          <span className="truncate">{selectedProject?.label}</span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50 hidden md:flex" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search project..." />
            <CommandEmpty>No project found.</CommandEmpty>
            {/* {groupedProjects?.map((groupedProject) => ( */}
            {/*   <CommandGroup */}
            {/*     key={groupedProject.label} */}
            {/*     heading={groupedProject.label} */}
            {/*   > */}
            {/*     {groupedProject.projects.map((project) => ( */}
            {/*       <CommandItem */}
            {/*         key={project.value} */}
            {/*         onSelect={() => { */}
            {/*           onProjectSelect(project) */}
            {/*         }} */}
            {/*         className="text-sm" */}
            {/*       > */}
            {/*         <Avatar className="mr-2 h-5 w-5"> */}
            {/*           <AvatarImage */}
            {/*             src={`https://avatar.vercel.sh/${project.value}.png`} */}
            {/*             alt={project.label} */}
            {/*             className="grayscale" */}
            {/*           /> */}
            {/*           <AvatarFallback>SC</AvatarFallback> */}
            {/*         </Avatar> */}
            {/*         {project.label} */}
            {/*         <Check */}
            {/*           className={cn( */}
            {/*             'ml-auto h-4 w-4', */}
            {/*             selectedProject?.value === project.value */}
            {/*               ? 'opacity-100' */}
            {/*               : 'opacity-0', */}
            {/*           )} */}
            {/*         /> */}
            {/*       </CommandItem> */}
            {/*     ))} */}
            {/*   </CommandGroup> */}
            {/* ))} */}
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  // onOpen('createProject')
                }}
                className="cursor-pointer"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Project
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
