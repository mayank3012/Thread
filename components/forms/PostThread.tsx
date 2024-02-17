"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { usePathname, useRouter } from "next/navigation"
import { threadValidation } from "@/lib/validations/threadValidation"
import { updateUser } from "@/lib/actions/user.action"
import { createThread } from "@/lib/actions/thread.action"
import Spinner from "../shared/Spinner"
import { useState } from "react"

interface UserProps {
    user: {
        id: string,
        objectId: string,
        name: string,
        username: string,
        bio: string,
        image: string
    },
    btnTitle: string
}

const PostThread = ({ userId }: { userId: string }) => {

    const [posting, setPosting] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(threadValidation),
        defaultValues: {
            thread: '',
            authorId: userId
        }
    })
    const onSubmit = async (values: z.infer<typeof threadValidation>) => {
        setPosting(true);
        const promise = createThread({
            thread: values.thread,
            authorId: userId,
            communityId: '',
            path: pathname,
            parentId: null
        });

        promise.then(() => {
            setPosting(false);
            router.push('/');
        })

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-8 md:px-10 py-5">
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base-semibold text-light-2">Content</FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Textarea
                                    rows={10}
                                    placeholder="Create Thread..."
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-primary-500" disabled={posting}>
                    {posting && <Spinner />}
                    {posting ? 'Posting' : 'Post'}
                </Button>
            </form>
        </Form>
    )
}

export default PostThread