
import Image from 'next/image'
import { Separator } from '../ui/separator'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { profileTabs } from '@/constants'
import { fecthProfileDataByUserId } from '@/lib/actions/thread.action'
import TabsContent from '../shared/TabsContent';
import ThreadCard from './ThreadCard'
import CommentCard from './CommentCard'

interface IProps {
    user: {
        _id: string,
        id: string,
        name: string,
        username: string,
        bio: string,
        image: string,
    }
}

const Profile = async ({ user }: IProps) => {
    const thread = await fecthProfileDataByUserId(user._id);
    const posts = thread.filter((item: any) => !item.parentId);
    const replies = thread.filter((item: any) => item.parentId);

    const threadCard = (item: any, isComment = false) => {
        if (!isComment) {
            return <ThreadCard
                key={item._id}
                id={item._id}
                content={item.text}
                author={item.author}
                currentUserId={user?._id}
                parentId={item.parentId}
                createdAt={item.createdAt}
                community={item.community}
                comments={item.children}
                isComment={false}
            />
        }
        else {
            return (<CommentCard
                author={item.author}
                comment={item.text}
                key={`${item._id}`}
                replies={item.children}
                commentId={JSON.parse(JSON.stringify(item?._id)) || ''}
                currentUserId={JSON.parse(JSON.stringify(user?._id)) || ''}
                currentUserImg={user?.image}
                commentDepth={2}
            />)
        }
    }

    return (
        <section className='text-light-2'>
            <div>
                <div className='flex gap-4'>
                    <div>
                        {
                            user.image ? (
                                <Image src={user.image} alt={`Profile picture of ${user.username}`} height={90} width={90} className='rounded-full aspect-square object-cover' />
                            ) : (
                                <Image src="/assets/profile.svg" height={90} width={90} alt='profile photo' className='rounded-full aspect-square object-cover' />
                            )
                        }
                    </div>
                    <div className='pt-3 flex flex-col gap-1'>
                        <h2>
                            {user.name}
                        </h2>
                        <h3 className='text-gray-500'>
                            {user.username}
                        </h3>
                    </div>
                </div>
                <div className='my-3 mx-4'>
                    {user.bio}
                </div>
            </div>
            <Separator className='my-4' />
            <div>
                <Tabs defaultValue='threads' className='w-full'>
                    <TabsList className="flex w-full bg-dark">
                        {profileTabs.filter((tab: any) => tab.isActive).map((tab: any) => (
                            <TabsTrigger key={tab.value} value={tab.value} className='ring-offset-dark-2 focus-visible:ring-dark-2 data-[state=active]:bg-dark-2 data-[state=active]:text-slate-50 flex gap-2 flex-1'>
                                {tab.label}
                                <Image src={tab.icon} alt='icon' height={20} width={20} />
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {profileTabs.filter((tab: any) => tab.isActive).map((tab: any) => (
                        <TabsContent tabValue={tab.value} key={tab.value}>
                            {
                                tab.value === 'threads' ?
                                    posts && posts.length > 0 ?
                                        posts.map((item: any) => {
                                            return threadCard(item);
                                        })
                                        :
                                        <h2>loading</h2>
                                    :
                                    replies && replies.length > 0 ?
                                        replies.map((item: any) => {
                                            return threadCard(item, true);
                                        })
                                        :
                                        <h2>loading</h2>
                            }
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    )
}

export default Profile