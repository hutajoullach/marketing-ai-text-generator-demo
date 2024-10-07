import { Navbar } from '@/components/navigation/navbar'
import { Sidebar } from '@/components/navigation/sidebar'

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <div className="fixed top-3 right-3 z-50">
        <></>
      </div>
      <Sidebar />
      <div className="fixed bottom-3 left-3 z-50">
        <></>
      </div>
      <>{children}</>
    </div>
  )
}

export default BaseLayout
