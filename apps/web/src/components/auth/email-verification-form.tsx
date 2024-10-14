'use client'

import { BeatLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { emailVerification } from '@/actions/email-verification'

import { InlineErrorMessage } from '@/components/primitives/inline-error-message'
import { InlineSuccessMessage } from '@/components/primitives/inline-success-message'

export const EmailVerificationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  const onSubmit = useCallback(() => {
    if (success || error) return

    if (!token) {
      setError('Missing token!')
      return
    }

    emailVerification(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError('Something went wrong!')
      })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <div className="flex items-center w-full justify-center">
      {!success && !error && <BeatLoader />}
      <InlineSuccessMessage message={success} />
      {!success && <InlineErrorMessage message={error} />}
    </div>
  )
}
