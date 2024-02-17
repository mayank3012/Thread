"use client"

import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { commentValidation } from '@/lib/validations/threadValidation';
import { createThread } from '@/lib/actions/thread.action';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Button } from '../ui/button';
import Spinner from '../shared/Spinner';
import { Input } from '../ui/input';
import Image from 'next/image';

const Comment = ({ threadId, currentUserImg, currentUserId }: { threadId: string, currentUserImg: string, currentUserId: string }) => {

    const [posting, setPosting] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(commentValidation),
        defaultValues: {
            thread: '',
        }
    })
    const onSubmit = async (values: z.infer<typeof commentValidation>) => {
        setPosting(true);
        await createThread({
            thread: values.thread,
            authorId: currentUserId,
            communityId: '',
            path: pathname,
            parentId: threadId
        });
        setPosting(false);
        form.reset();
    }
    return (
        <section className='text-light-2'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 gap-8 md:px-10 comment-form">
                    <FormField
                        control={form.control}
                        name="thread"
                        render={({ field }) => (
                            <FormItem className='flex w-full gap-3 items-center'>
                                <FormLabel>
                                    <Image
                                        src={currentUserImg}
                                        alt="profile Iamge"
                                        height={35}
                                        width={35}
                                        className='rounded-full aspect-square object-cover'
                                    />
                                </FormLabel>
                                <FormControl className="border-none bg-transparent">
                                    <Input
                                        placeholder="Comment..."
                                        className="no-focus text-light-2 outline-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="bg-primary-500" disabled={posting}>
                        {posting && <Spinner />}
                        {posting ? 'Replying' : 'Reply'}
                    </Button>
                </form>
            </Form>
        </section>
    )
}

export default Comment