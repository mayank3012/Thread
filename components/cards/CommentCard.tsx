import Image from 'next/image'
import React from 'react'

import Comment from '../forms/Comment'
import CustomAccordion from '../shared/Accordion'


interface IComment {
    author: {
        name?: string,
        image: string,
        id: string,
    },
    comment: string,
    commentId: string | null,
    replies: [{
        author: {
            name?: string,
            image: string,
            id: string,
        },
        text: string,
        _id: string | null,
    }],
    currentUserImg: string,
    currentUserId: string,
    commentDepth: number
}
const CommentCard = ({
    author,
    comment,
    commentId,
    currentUserImg,
    currentUserId,
    replies,
    commentDepth = 0 }: IComment) => {
    return (
        <div className='text-light-2 flex gap-5' >
            <div className='flex flex-col items-center'>
                <Image src={author.image} width={35} height={35} alt="comment author" className='rounded-full aspect-square object-cover' />
                <div className='thread-card_bar' />
            </div>
            <div className='pb-3 flex flex-col gap-2 w-[90%]'>
                <h2>{author.name}</h2>
                <h3>{comment}</h3>
                <div>
                    {commentDepth < 2 &&
                        <CustomAccordion
                            type='single'
                            value='replies'
                            accordionTriggerClassName="text-gray-500"
                            accordionTrigger={`${replies.length > 0 ? replies.length : ''} ${replies.length > 1 ? 'Replies' : 'Reply'}`}
                            bottomTrigger={`Hide replies`}
                            bottomTriggerClassName={"text-gray-500"}
                        >
                            <Comment
                                currentUserId={currentUserId}
                                currentUserImg={currentUserImg}
                                threadId={JSON.parse(JSON.stringify(commentId)) || ''}
                            />
                            <div className='mt-3 md:ml-20'>
                                {replies.map((reply: any) => {

                                    return (
                                        <>
                                            <CommentCard
                                                comment={reply.text}
                                                author={reply.author}
                                                key={`${reply._id}`}
                                                replies={reply.children}
                                                commentId={JSON.parse(JSON.stringify(reply?._id)) || ''}
                                                currentUserId={currentUserId}
                                                currentUserImg={currentUserImg}
                                                commentDepth={commentDepth + 1}
                                            />
                                        </>
                                    )
                                })}
                            </div>
                        </CustomAccordion>
                    }
                </div>
            </div>
        </div>
    )
}

export default CommentCard