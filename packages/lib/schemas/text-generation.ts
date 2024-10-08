import * as z from 'zod'

export const TextGenerationSchema = z.object({
  instruction: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
  refUrl: z.optional(z.string()),
  llm: z.enum(['gpt-4o', 'claude3'], {
    errorMap: () => ({ message: 'Please choose either GPT-4o or Claude3' }),
  }),
})
