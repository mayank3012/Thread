import { currentUser } from "@clerk/nextjs"
import PostThread from "@/components/forms/PostThread";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.action";

const page = async () => {
    const currentUser1 = await currentUser();
    if (!currentUser1) redirect('/sign-in');
    const userInfo = await fetchUser(currentUser1.id);
    if (!userInfo?.onboarded) redirect('/onboarding');
    return (
        <>
            <div className='head-text'>Create Thread</div>
            <PostThread userId={JSON.parse(JSON.stringify(userInfo._id))} />
        </>
    )
}

export default page