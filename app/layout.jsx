import '@/assets/styles/globals.css'
import AuthProvider from '@/components/AuthProvider'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { GlobalProvider } from '@/context/GlobalContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'photoswipe/dist/photoswipe.css'

export const metadata = {
  title: 'Property Pulse | Find The Perfect Rental',
  description: 'Find your dream rental property',
}

export const dynamic = 'force-dynamic'

export default function RootLayout({ children }) {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en" suppressHydrationWarning>
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  )
}
