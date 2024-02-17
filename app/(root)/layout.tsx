import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { ClerkProvider, currentUser } from '@clerk/nextjs'
import Topbar from '@/components/shared/Topbar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Bottombar from '@/components/shared/Bottombar'
import { fetchUser } from '@/lib/actions/user.action'
import { redirect } from 'next/navigation'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Threads',
  description: 'A social media app cloned by Meta Thread made in Next.js 13'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser1 = await currentUser();
  if (!currentUser1) redirect('/sign-in');
  const userInfo = await fetchUser(currentUser1.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  return (
    <ClerkProvider>

      <html lang="en">
        <body className={`${inter.className}`}>
          <Topbar />
          <main className='flex'>
            <LeftSidebar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>
                {children}
              </div>
            </section>
            <RightSidebar />
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  )
}
