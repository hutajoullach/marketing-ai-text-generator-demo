'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'

import { RegisterSchema } from '@demo/lib/schemas/auth'

import { db } from '@demo/drizzle'
import { users } from '@demo/drizzle/schema'
import { getUserByEmail } from '@demo/lib/utils/user'
// import { sendVerificationEmail } from '@demo/lib/utils/mail'
import { generateVerificationToken } from '@demo/lib/utils/token'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
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

  await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .execute()

  const verificationToken = await generateVerificationToken(email)
  // await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return { success: 'Confirmation email sent!' }
}
