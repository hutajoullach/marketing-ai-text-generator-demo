import Link from 'next/link'
import { Poppins } from 'next/font/google'

import { cn } from '@demo/ui/src/lib/utils'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@demo/ui/src/components/ui/card'
import { Button } from '@demo/ui/src/components/ui/button'

import { ResetPasswordForm } from '@/components/auth/reset-password-form'

const ResetPasswordPage = () => {
  return (
    <ResetPasswordFormWrapper>
      <ResetPasswordForm />
    </ResetPasswordFormWrapper>
  )
}

export default ResetPasswordPage

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})
type ResetPasswordFormWrapperProps = {
  children: React.ReactNode
}
const ResetPasswordFormWrapper = ({
  children,
}: ResetPasswordFormWrapperProps) => {
  return (
    <div className="h-full flex items-center justify-center">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn('text-3xl font-semibold', font.className)}>
              demo
            </h1>
            <p className="text-muted-foreground text-sm">
              Forgot your password?
            </p>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <Button
            variant="link"
            className="font-normal w-full"
            size="sm"
            asChild
          >
            <Link href="/auth/login">Back to login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
