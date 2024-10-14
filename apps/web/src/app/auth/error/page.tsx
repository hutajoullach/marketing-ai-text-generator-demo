import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import { cn } from '@demo/ui/src/lib/utils'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@demo/ui/src/components/ui/card'
import { Button } from '@demo/ui/src/components/ui/button'

const AuthErrorPage = () => {
  return (
    <ErrorCardWrapper>
      <ErrorCard />
    </ErrorCardWrapper>
  )
}

export default AuthErrorPage

const ErrorCard = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <ExclamationTriangleIcon className="text-destructive" />
    </div>
  )
}

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})
type ErrorCardWrapperProps = {
  children: React.ReactNode
}
const ErrorCardWrapper = ({ children }: ErrorCardWrapperProps) => {
  return (
    <div className="h-full flex items-center justify-center">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn('text-3xl font-semibold', font.className)}>
              demo
            </h1>
            <p className="text-muted-foreground text-sm">
              Oops! Something went wrong!
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
