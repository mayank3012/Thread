import CommentCard from '@/components/cards/CommentCard';
import ThreadCard from '@/components/cards/ThreadCard';
import Comment from '@/components/forms/Comment';
import { fetchThreadById } from '@/lib/actions/thread.action';
import { fetchUser } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
    if (!params.id) return null;
    const currentUser1 = await currentUser();
    if (!currentUser1) redirect('/sign-in');
    const userInfo = await fetchUser(currentUser1.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    const post = await fetchThreadById(params.id);

    return (
        <section className='relative'>
            <div>
                <ThreadCard
                    key={post._id}
                    id={post._id}
                    content={post.text}
                    author={post.author}
                    currentUserId={userInfo?._id}
                    parentId={post.parentId}
                    createdAt={post.createdAt}
                    community={post.community}
                    comments={post.children}
                    isComment={true}
                />
            </div>
            <div>
                <Comment
                    currentUserId={JSON.parse(JSON.stringify(userInfo?._id)) || ''}
                    currentUserImg={currentUser1.imageUrl}
                    threadId={post.id}
                />
            </div>

            <div className='md:pl-20 mt-10'>
                {post.children.map((comment: any) => {
                    return (
                        <CommentCard
                            author={comment.author}
                            comment={comment.text}
                            key={`${comment._id}`}
                            replies={comment.children}
                            commentId={JSON.parse(JSON.stringify(comment?._id)) || ''}
                            currentUserId={JSON.parse(JSON.stringify(userInfo?._id)) || ''}
                            currentUserImg={currentUser1.imageUrl}
                            commentDepth={0}
                        />
                    )
                })}
            </div>
        </section>
    )
}

export default page