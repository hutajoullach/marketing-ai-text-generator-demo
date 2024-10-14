'use server'

import * as z from 'zod'

import { getUserByEmail } from '@demo/lib/utils/user'
import { ResetPasswordSchema } from '@demo/lib/schemas/auth'
import { sendPasswordResetEmail } from '@demo/lib/utils/mail'
import { generatePasswordResetToken } from '@demo/lib/utils/token'

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
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  )

  return { success: 'Reset email sent!' }
}
