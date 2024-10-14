'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'

import { db } from '@demo/drizzle'
import { getUserByEmail } from '@demo/lib/utils/user'
import { NewPasswordSchema } from '@demo/lib/schemas/auth'
import { users, passwordResetTokens } from '@demo/drizzle/schema'
import { getPasswordResetTokenByToken } from '@demo/lib/utils/auth'

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: 'Missing token!' }
  }

  const validatedFields = NewPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { password } = validatedFields.data

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: 'Invalid token!' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'Token has expired!' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, existingUser.id))

  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.id, existingToken.id))

  return { success: 'Password updated!' }
}
