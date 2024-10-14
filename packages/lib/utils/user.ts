import { eq, InferSelectModel } from 'drizzle-orm'

import { db } from '@demo/drizzle'
import { users } from '@demo/drizzle/schema'

type User = InferSelectModel<typeof users>

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .execute()

    return result[0] || null
  } catch (error) {
    console.log('Error fetching user:', error)
    return null
  }
}

export const getUserById = async (userId: string) => {
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)
      .execute()

    return result[0] || null
  } catch (error) {
    console.log('Error fetching user:', error)
    return null
  }
}
