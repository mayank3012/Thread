import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from '@/lib/actions/user.action'
import { redirect } from 'next/navigation'

export default async function Page() {
    const user = await currentUser();
    if (!user) redirect('/sign-in');
    const userInfo = await fetchUser(user.id);
    if (userInfo?.onboarded) redirect('/');
    const userData = {
        id: user?.id,
        objectId: userInfo?._id,
        username: userInfo?.username || user?.username,
        name: userInfo?.name || user?.firstName || "",
        bio: userInfo?.bio || "",
        image: userInfo?.image || user?.imageUrl
    }
    return (
        <div className="mx-auto flex max-w-3xl flex-col justify-start gap-2 py-20 px-3 sm:px-10">
            <h1 className="text-heading1-bold text-light-1">Onboarding</h1>
            <h2 className="text-base-regular text-light-2">Onboard yourself to Thread</h2>
            <div className="w-full bg-dark-3 rounded-md p-5 mt-10">
                <AccountProfile
                    user={userData}
                    btnTitle={'Continue'}
                />
            </div>
        </div>
    )
}