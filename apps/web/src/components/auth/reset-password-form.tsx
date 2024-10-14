'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { ResetPasswordSchema } from '@demo/lib/schemas/auth'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@demo/ui/src/components/ui/form'
import { Input } from '@demo/ui/src/components/ui/input'
import { Button } from '@demo/ui/src/components/ui/button'

import { resetPassword } from '@/actions/reset-password'

import { InlineErrorMessage } from '@/components/primitives/inline-error-message'
import { InlineSuccessMessage } from '@/components/primitives/inline-success-message'

export const ResetPasswordForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      resetPassword(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="john.doe@example.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <InlineErrorMessage message={error} />
        <InlineSuccessMessage message={success} />
        <Button disabled={isPending} type="submit" className="w-full">
          Send reset email
        </Button>
      </form>
    </Form>
  )
}
