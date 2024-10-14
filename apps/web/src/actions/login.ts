'use server'

import * as z from 'zod'
import { eq } from 'drizzle-orm'
import { AuthError } from 'next-auth'

import { db } from '@demo/drizzle'
import { twoFactorTokens, twoFactorConfirmations } from '@demo/drizzle/schema'
import { signIn } from '@demo/lib/authjs'
import { LoginSchema } from '@demo/lib/schemas/auth'
import { getUserByEmail } from '@demo/lib/utils/user'
import { getTwoFactorTokenByEmail } from '@demo/lib/utils/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@demo/lib/authjs/routes'
import { getTwoFactorConfirmationByUserId } from '@demo/lib/utils/auth'
// import {
//   sendVerificationEmail,
//   sendTwoFactorTokenEmail,
// } from '@demo/lib/utils/mail'
// import {
//   generateVerificationToken,
//   generateTwoFactorToken,
// } from '@demo/lib/utils/token'

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password, code } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist!' }
  }

  if (!existingUser.emailVerified) {
    // const verificationToken = await generateVerificationToken(
    //   existingUser.email,
    // )

    // await sendVerificationEmail(
    //   verificationToken.email,
    //   verificationToken.token,
    // )

    return { success: 'Confirmation email sent!' }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

      if (!twoFactorToken) {
        return { error: 'Invalid code!' }
      }

      if (twoFactorToken.token !== code) {
        return { error: 'Invalid code!' }
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date()

      if (hasExpired) {
        return { error: 'Code expired!' }
      }

      await db
        .delete(twoFactorTokens)
        .where(eq(twoFactorTokens.id, twoFactorToken.id))
        .execute()

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      )

      if (existingConfirmation) {
        await db
          .delete(twoFactorConfirmations)
          .where(eq(twoFactorConfirmations.id, existingConfirmation.id))
          .execute()
      }

      await db
        .insert(twoFactorConfirmations)
        .values({
          userId: existingUser.id,
        })
        .execute()
    } else {
      // const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      // await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)

      return { twoFactor: true }
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }

    throw error
  }
}
