import './globals.css'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { Navbar, Footer } from '@/components';

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Carhub',
   description: 'Discover the best cars in the world',
}

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang='en'>
         <body className={manrope.className + ' relative'}>
            <Navbar />
            {children}
            <Footer />
         </body>
      </html>
   )
}
