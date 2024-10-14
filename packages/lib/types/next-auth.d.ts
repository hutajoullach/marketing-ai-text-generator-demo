import { User } from 'next-auth'
import { InferSelectModel } from 'drizzle-orm'

import { users } from '@demo/drizzle/schema'

type TUser = InferSelectModel<typeof users>
type TUserRole = TUser['role']

declare module 'next-auth' {
  interface User {
    role?: TUserRole
    username?: string | null
    isTwoFactorEnabled?: boolean
    isOAuth?: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: TUserRole
    username?: string | null
    isTwoFactorEnabled?: boolean
    isOAuth?: boolean
  }
}

declare module 'next-auth/adapters' {
  interface AdapterUser extends User {
    role?: TUserRole
    username?: string | null
    isTwoFactorEnabled?: boolean
    isOAuth?: boolean
  }
}
