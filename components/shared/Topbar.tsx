"use client"

import { OrganizationSwitcher, SignInButton, SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import { dark } from '@clerk/themes'


const Topbar = () => {
    const router = useRouter();
    return (
        <nav className='topbar'>
            <Link href={"/"} className='flex items-center gap-4'>
                <Image src={`/assets/logo.svg`} alt={`logo`} height={28} width={28} />
                <p className='text-heading3-bold text-light-1 max-xs:hidden'>Threads</p>
            </Link>

            <div>
                <SignedOut>
                    <SignInButton>
                        <div className='gap-2 cursor-pointer hidden max-md:flex'>
                            <Image src="/assets/user.svg" alt='sign-in' height={24} width={24} />
                            <p className='text-light-1 max-nav-sm:hidden'>Sign In</p>
                        </div>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <div className='flex gap-8 items-center'>
                        <SignOutButton signOutCallback={() => {
                            router.push("/");
                        }}>
                            <div className='gap-2 cursor-pointer hidden max-md:flex'>
                                <Image src="/assets/logout.svg" alt='logout' height={24} width={24} />
                                <p className='text-light-1 max-nav-sm:hidden'>Logout</p>
                            </div>
                        </SignOutButton>
                        <OrganizationSwitcher
                            appearance={dark}
                        />
                    </div>
                </SignedIn>
            </div>
        </nav>
    )
}

export default Topbar