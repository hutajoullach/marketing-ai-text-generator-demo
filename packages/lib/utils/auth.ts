import * as z from 'zod'
import * as bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'
import { eq, InferSelectModel } from 'drizzle-orm'

import { db } from '@demo/drizzle'
import {
  users,
  accounts,
  verificationTokens,
  passwordResetTokens,
  twoFactorTokens,
  twoFactorConfirmations,
} from '@demo/drizzle/schema'

import { auth, signIn } from '../authjs'
import { getUserByEmail } from './user'
import { DEFAULT_LOGIN_REDIRECT } from '../authjs/routes'
import {
  RegisterSchema,
  LoginSchema,
  ResetPasswordSchema,
  NewPasswordSchema,
} from '../schemas/auth'
import {
  generateVerificationToken,
  generatePasswordResetToken,
  generateTwoFactorToken,
} from './token'
// import {
//   sendVerificationEmail,
//   sendPasswordResetEmail,
//   sendTwoFactorTokenEmail,
// } from './mail'

export const registerUser = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email already in use!' }
  }

  try {
    await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .execute()

    const verificationToken = await generateVerificationToken(email)
    // await sendVerificationEmail(
    //   verificationToken.email,
    //   verificationToken.token,
    // )

    return { success: 'Confirmation email sent!' }
  } catch (error) {
    console.log('Error registering user:', error)
    return { error: 'Failed to register user. Please try again.' }
  }
}

export const verifyEmail = async (
  token: string,
): Promise<{ error?: string; success?: string }> => {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: 'Token not found!' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.id, existingToken.id))
    return { error: 'Token has expired!' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.id, existingToken.id))
    return { error: 'Email not found!' }
  }

  try {
    await db.transaction(async (trx) => {
      await trx
        .update(users)
        .set({
          emailVerified: new Date(),
          email: existingToken.email,
        })
        .where(eq(users.id, existingUser.id))

      await trx
        .delete(verificationTokens)
        .where(eq(verificationTokens.id, existingToken.id))
    })

    return { success: 'Email verified!' }
  } catch (error) {
    console.log('Transaction failed:', error)
    return { error: 'Failed to verify email. Please try again.' }
  }
}

export const loginUser = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password, code } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || existingUser.email !== email || !existingUser.password) {
    return { error: 'Invalid credentials!' }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email)

    // await sendVerificationEmail(
    //   verificationToken.email,
    //   verificationToken.token,
    // )

    return { success: 'Confirmation email sent!' }
  }

  if (existingUser.isTwoFactorEnabled) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(email)

      if (!twoFactorToken) {
        return { error: 'Invalid code!' }
      }

      if (twoFactorToken.token !== code) {
        return { error: 'Invalid code!' }
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date()

      if (hasExpired) {
        await db
          .delete(twoFactorTokens)
          .where(eq(twoFactorTokens.id, twoFactorToken.id))
        return { error: 'Code expired!' }
      }

      await db
        .delete(twoFactorTokens)
        .where(eq(twoFactorTokens.id, twoFactorToken.id))

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      )

      if (existingConfirmation) {
        await db
          .delete(twoFactorConfirmations)
          .where(eq(twoFactorConfirmations.id, existingConfirmation.id))
      }

      await db.insert(twoFactorConfirmations).values({
        userId: existingUser.id,
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(email)
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

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
) => {
  const validatedFields = ResetPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid email!' }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: 'Email not found!' }
  }

  const passwordResetToken = await generatePasswordResetToken(email)
  // await sendPasswordResetEmail(
  //   passwordResetToken.email,
  //   passwordResetToken.token,
  // )

  return { success: 'Reset email sent!' }
}

export const saveNewPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
): Promise<{ error?: string; success?: string }> => {
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
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.id, existingToken.id))
    return { error: 'Token has expired!' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.id, existingToken.id))
    return { error: 'Email not found!' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await db.transaction(async (trx) => {
      await trx
        .update(users)
        .set({ password: hashedPassword })
        .where(eq(users.id, existingUser.id))

      await trx
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.id, existingToken.id))
    })

    return { success: 'Password updated!' }
  } catch (error) {
    console.log('Transaction failed:', error)
    return { error: 'Failed to update password. Please try again.' }
  }
}

export const getSession = async () => {
  const session = await auth()
  return session
}

export const getAccountByUserId = async (userId: string) => {
  try {
    const result = await db
      .select()
      .from(accounts)
      .where(eq(accounts.userId, userId))
      .limit(1)
      .execute()

    return result[0] || null
  } catch (error) {
    console.log('Error fetching account:', error)
    return null
  }
}

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const result = await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.token, token))
      .limit(1)
      .execute()

    return result[0] || null
  } catch (error) {
    console.log('Error fetching verification token:', error)
    return null
  }
}

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const result = await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.email, email))
      .limit(1)
      .execute()

    return result[0] || null
  } catch (error) {
    console.log('Error fetching verification token:', error)
    return null
  }
}

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const result = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token))
      .limit(1)
      .execute()

    return result[0] || null
  } catch (error) {
    console.log('Error fetching password reset token:', error)
    return null
  }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const result = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.email, email))
      .limit(1)
      .execute()

    return result[0] || null
  } catch (error) {
    console.log('Error fetching password reset token:', error)
    return null
  }
}

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const result = await db
      .select()
      .from(twoFactorTokens)
      .where(eq(twoFactorTokens.token, token))
      .limit(1)
      .execute()

    return result[0] || null
  } catch (error) {
    console.log('Error fetching two factor token:', error)
    return null
  }
}

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const result = await db
      .select()
      .from(twoFactorTokens)
      .where(eq(twoFactorTokens.email, email))
      .limit(1)
      .execute()

    return result[0] || null
  } catch (error) {
    console.log('Error fetching two factor token:', error)
    return null
  }
}

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const result = await db
      .select()
      .from(twoFactorConfirmations)
      .where(eq(twoFactorConfirmations.userId, userId))
      .limit(1)
      .execute()

    return result[0] || null
  } catch (error) {
    console.log('Error fetching two factor confirmation:', error)
    return null
  }
}
