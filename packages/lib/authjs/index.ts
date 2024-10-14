/// <reference types="../types/next-auth.d.ts" />
import NextAuth from 'next-auth'
import { eq, InferSelectModel } from 'drizzle-orm'
import { DrizzleAdapter } from '@auth/drizzle-adapter'

import { db } from '@demo/drizzle'
import { users, twoFactorConfirmations } from '@demo/drizzle/schema'

import authConfig from './auth.config'
import { getUserById } from '../utils/user'
import {
  getAccountByUserId,
  getTwoFactorConfirmationByUserId,
} from '../utils/auth'

type User = InferSelectModel<typeof users>
type UserRole = User['role']

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      if (user.id) {
        await db
          .update(users)
          .set({
            emailVerified: new Date(),
          })
          .where(eq(users.id, user.id))
      } else {
        console.log('OAuth user ID is undefined')
      }
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true

      if (!user.id) return false

      const existingUser = await getUserById(user.id)

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false

      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        )

        if (!twoFactorConfirmation) return false

        // Delete two factor confirmation for next sign in
        await db
          .delete(twoFactorConfirmations)
          .where(eq(twoFactorConfirmations.id, twoFactorConfirmation.id))
          .execute()
      }

      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      if (session.user) {
        session.user.name = token.name as string
        session.user.email = token.email || ''
        session.user.isOAuth = token.isOAuth as boolean
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email || ''
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
