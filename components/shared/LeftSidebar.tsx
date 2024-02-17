'use client'
import { sidebarLinks } from '@/constants'
import { SignInButton, SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const LeftSidebar = () => {
    const pathName = usePathname();
    const router = useRouter();
    return (
        <section className='leftsidebar custom-scrollbar'>
            <div className='flex flex-col'>
                {sidebarLinks.map((link) => {
                    const isActive = link.route == pathName
                    return (
                        <Link href={link.route} key={link.label} className={`leftsidebar_link my-2 mx-4 ${isActive && 'bg-primary-500'}`}>
                            <Image src={link.imgURL} alt={link.label} height={24} width={24} />
                            <p className='text-light-1 max-lg:hidden'>{link.label}</p>
                        </Link>
                    )
                })}
            </div>
            <div className='flex flex-col m-4 px-4 my-20'>
                <SignedOut>
                    <SignInButton>
                        <div className='flex gap-4 cursor-pointer'>
                            <Image src="/assets/user.svg" alt='sign-in' height={24} width={24} />
                            <p className='text-light-1 max-lg:hidden'>Sign In</p>
                        </div>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <SignOutButton signOutCallback={() => {
                        router.push("/sign-in");
                    }}>
                        <div className='flex gap-4 cursor-pointer'>
                            <Image src="/assets/logout.svg" alt='logout' height={24} width={24} />
                            <p className='text-light-1 max-lg:hidden'>Logout</p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>
    )
}

export default LeftSidebar