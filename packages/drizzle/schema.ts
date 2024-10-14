import { sql } from 'drizzle-orm'
import type { AdapterAccountType } from 'next-auth/adapters'
import {
  boolean,
  pgTable,
  varchar,
  timestamp,
  integer,
  index,
  primaryKey,
} from 'drizzle-orm/pg-core'

export const users = pgTable(
  'users',
  {
    id: varchar('id')
      .primaryKey()
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
    name: varchar('name'),
    email: varchar('email').unique(),
    emailVerified: timestamp('email_verified', { mode: 'date' }),
    image: varchar('image'),
    password: varchar('password'),
    role: varchar('role', { length: 255 }).notNull().default('USER'),
    isTwoFactorEnabled: boolean('is_two_factor_enabled')
      .notNull()
      .default(false),
  },
  (table) => {
    return {
      emailIdx: index('email_idx')
        .on(table.email)
        .where(sql`${table.email} IS NOT NULL`),
    }
  },
)

export const accounts = pgTable(
  'accounts',
  {
    userId: varchar('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: varchar('type').$type<AdapterAccountType>().notNull(),
    provider: varchar('provider').notNull(),
    providerAccountId: varchar('provider_account_id').notNull(),
    refreshToken: varchar('refresh_token'),
    accessToken: varchar('access_token'),
    expiresAt: integer('expires_at'),
    tokenType: varchar('token_type'),
    scope: varchar('scope'),
    idToken: varchar('id_token'),
    sessionState: varchar('session_state'),
  },
  (table) => ({
    compoundKey: primaryKey({
      columns: [table.provider, table.providerAccountId],
    }),
  }),
)

export const verificationTokens = pgTable(
  'verification_tokens',
  {
    id: varchar('id')
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
    email: varchar('email').notNull(),
    token: varchar('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (table) => ({
    compositePk: primaryKey({
      columns: [table.email, table.token],
    }),
  }),
)

export const passwordResetTokens = pgTable(
  'password_reset_tokens',
  {
    id: varchar('id')
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
    email: varchar('email').notNull(),
    token: varchar('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (table) => ({
    compositePk: primaryKey({
      columns: [table.email, table.token],
    }),
  }),
)

export const twoFactorTokens = pgTable(
  'two_factor_tokens',
  {
    id: varchar('id')
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
    email: varchar('email').notNull(),
    token: varchar('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (table) => ({
    compositePk: primaryKey({
      columns: [table.email, table.token],
    }),
  }),
)

export const twoFactorConfirmations = pgTable(
  'two_factor_confirmations',
  {
    id: varchar('id')
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
    userId: varchar('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    compositePk: primaryKey({
      columns: [table.id, table.userId],
    }),
  }),
)
