import * as crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import { eq } from 'drizzle-orm'

import { db } from '@demo/drizzle'
import {
  verificationTokens,
  passwordResetTokens,
  twoFactorTokens,
} from '@demo/drizzle/schema'

import {
  getVerificationTokenByEmail,
  getPasswordResetTokenByEmail,
  getTwoFactorTokenByEmail,
} from './auth'

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.id, existingToken.id))
  }

  const [newToken] = await db
    .insert(verificationTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning()

  return newToken
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.id, existingToken.id))
  }

  const [newToken] = await db
    .insert(passwordResetTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning()

  return newToken
}

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString()
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000)

  const existingToken = await getTwoFactorTokenByEmail(email)

  if (existingToken) {
    await db
      .delete(twoFactorTokens)
      .where(eq(twoFactorTokens.id, existingToken.id))
  }

  const [newToken] = await db
    .insert(twoFactorTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning()

  return newToken
}
