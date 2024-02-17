import Profile from '@/components/cards/Profile'
import { fetchUser } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
    const currentUser1 = await currentUser();
    if (!currentUser1) redirect('/sign-in');
    const userInfo = await fetchUser(currentUser1.id);
    if (!userInfo?.onboarded) redirect('/onboarding');
    let profileUserId;
    if (params.id) {
        profileUserId = params.id;
    }
    else {
        profileUserId = userInfo.id
    }

    const user = await fetchUser(profileUserId);

    return (
        <Profile user={JSON.parse(JSON.stringify(user))} />
    )
}

export default page