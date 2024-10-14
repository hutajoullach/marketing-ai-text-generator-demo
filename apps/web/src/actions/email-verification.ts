'use server'

import { eq } from 'drizzle-orm'

import { db } from '@demo/drizzle'
import { getUserByEmail } from '@demo/lib/utils/user'
import { users, verificationTokens } from '@demo/drizzle/schema'
import { getVerificationTokenByToken } from '@demo/lib/utils/auth'

export const emailVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: 'Token does not exist!' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'Token has expired!' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  await db
    .update(users)
    .set({
      emailVerified: new Date(),
      email: existingToken.email,
    })
    .where(eq(users.id, existingUser.id))

  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.id, existingToken.id))

  return { success: 'Email verified!' }
}
