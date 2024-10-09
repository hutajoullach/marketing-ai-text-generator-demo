import { Search } from './search'
import { Wrapper } from './wrapper'
import { Switcher } from './switcher'
import { UserNav } from './user-nav'

export const Navbar = async () => {
  return (
    <Wrapper>
      <div className="p-4 border-b h-full flex items-center shadow-sm">
        <Switcher />
        {/* <MainNav className="mx-6" /> */}
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          {/* <UserNav username={session?.user?.username} /> */}
          <UserNav username="Bryn Rowlands" />
        </div>
      </div>
    </Wrapper>
  )
}
