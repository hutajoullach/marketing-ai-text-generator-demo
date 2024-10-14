import Link from 'next/link'

import { Button } from '@demo/ui/src/components/ui/button'

import { LoginForm } from '@/components/auth/login-form'

const LoginPage = () => {
  return (
    <LoginFormWrapper>
      <LoginForm />
    </LoginFormWrapper>
  )
}

export default LoginPage

type LoginFormWrapperProps = {
  children: React.ReactNode
}
const LoginFormWrapper = ({ children }: LoginFormWrapperProps) => {
  return (
    <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">demo</h1>
            <p className="text-sm text-muted-foreground">Welcome back</p>
          </div>
          {children}
          <Button
            variant="link"
            className="font-normal w-full"
            size="sm"
            asChild
          >
            <Link href="/auth/register">Don&apos;t have an account?</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
