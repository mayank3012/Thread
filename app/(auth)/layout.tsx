import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import '../globals.css';

export const metadata = {
  title: 'Threads',
  description: 'A social media app cloned by Meta Thread made in Next.js 13'
}

const inter = Inter({ subsets: ['latin'] });
const RootLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout