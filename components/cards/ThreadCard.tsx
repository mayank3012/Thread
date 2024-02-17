import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface IProps {
    key: String,
    id: String,
    content: String,
    author: {
        name: String,
        image: String,
        id: String
    },
    currentUserId: String,
    parentId: String,
    createdAt: String,
    community: {
        id: String,
        name: String,
        image: String
    } | null,
    comments: [
        author: {
            image: String
        }
    ],
    isComment: boolean
}

const ThreadCard = ({
    key,
    id,
    content,
    author,
    currentUserId,
    parentId,
    createdAt,
    community,
    comments,
    isComment
}: IProps) => {
    return (
        <article className='w-full bg-dark-4 my-5 rounded-lg p-5'>
            <div className='flex gap-2'>
                <div className='flex flex-col items-center'>
                    <Link href={`/profile/${author.id}`}>
                        <Image
                            width={45}
                            height={45}
                            alt="author's profile photo"
                            src={author.image}
                            className='rounded-full aspect-square object-cover'
                        />
                    </Link>
                    <div className='thread-card_bar' />
                </div>
                <div className='flex flex-col gap-1 pb-3'>
                    <Link href={`/profile/${author.id}`}>
                        <h2 className='text-light-2'>{author.name}</h2>
                    </Link>
                    <h3 className='text-small-regular text-light-2'>
                        {content}
                    </h3>
                    <div className='mt-2 flex gap-2'>
                        <div>
                            <Image src={'/assets/heart-gray.svg'} width={24} height={24} alt={"like"} className='object-contain cursor-pointer' />
                        </div>
                        {!isComment &&
                            <Link href={`/thread/${id}`}>
                                <Image src={'/assets/reply.svg'} width={24} height={24} alt={"reply"} className='object-contain cursor-pointer' />
                            </Link>
                        }
                        <div>
                            <Image src={'/assets/repost.svg'} width={24} height={24} alt={"repost"} className='object-contain cursor-pointer' />
                        </div>
                        <div>
                            <Image src={'/assets/share.svg'} width={24} height={24} alt={"share"} className='object-contain cursor-pointer ' />
                        </div>
                    </div>
                </div>
            </div>
            {comments && comments.length > 0 &&
                <div className='flex gap-5'>
                    <div className='flex item-center'>
                        {comments.slice(0, 3).map((item: any, index: any) => {
                            return (
                                <div className='relative z-${comments.length - index} -mr-3'>
                                    <Image src={item.author.image}
                                        width={25}
                                        height={25}
                                        alt='comment author image'
                                        className='rounded-full aspect-square object-cover'
                                    />
                                </div>
                            )
                        })
                        }

                    </div>
                    <Link href={`/thread/${id}`}>
                        <p className='text-gray-500'>{`${comments.length} ${comments.length > 1 ? 'Replies' : 'Reply'}`}</p>
                    </Link>
                </div>
            }
            <div>

            </div>
        </article>
    )
}

export default ThreadCard