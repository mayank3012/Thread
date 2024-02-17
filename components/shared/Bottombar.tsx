'use client'
import { sidebarLinks } from '@/constants'
import { SignInButton, SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'

const Bottombar = () => {
    const pathName = usePathname();
    const router = useRouter();
    return (
        <section className='bottombar'>
            <div className='flex justify-around'>
                {sidebarLinks.map((link) => {
                    const isActive = (pathName.includes(link.route) && link.route.length > 1) || link.route == pathName
                    return (
                        <Link href={link.route} key={link.label} className={`bottombar_link ${isActive && 'bg-primary-500'}`}>
                            <Image src={link.imgURL} alt={link.label} height={24} width={24} />
                            <p className='text-subtle-medium text-light-1 max-nav-sm:hidden'>{link.label}</p>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default Bottombar