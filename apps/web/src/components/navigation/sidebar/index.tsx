import Link from 'next/link'
import { HexagonIcon } from 'lucide-react'

import { Routes } from './routes'
import { Wrapper } from './wrapper'

export const Sidebar = () => {
  return (
    <Wrapper>
      <div className="h-full border-r flex flex-col overflow-y-auto bg-background shadow-sm">
        <div className="p-1 pl-3 pt-3 h-[48px] border-b">
          <Link href="/">
            <HexagonIcon size={30} />
          </Link>
        </div>
        <div className="flex flex-col w-full flex-1 py-2">
          <Routes />
        </div>
        <div className="pb-3 mt-auto flex items-center flex-col gap-y-4"></div>
      </div>
    </Wrapper>
  )
}
