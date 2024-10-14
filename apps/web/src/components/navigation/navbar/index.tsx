import { getSession } from '@demo/lib/utils/auth'

import { Search } from './search'
import { Wrapper } from './wrapper'
import { Switcher } from './switcher'
import { UserNav } from './user-nav'

export const Navbar = async () => {
  const session = await getSession()

  return (
    <Wrapper>
      <div className="p-4 border-b h-full flex items-center shadow-sm">
        <Switcher />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav
            username={session?.user?.name}
            email={session?.user?.email}
            image={session?.user?.image}
          />
        </div>
      </div>
    </Wrapper>
  )
}
