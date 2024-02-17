"use server"

import Thread from "../models/threadModel";
import { revalidatePath } from "next/cache";
import User from "../models/userModel";
import { ConnectToDb } from "../mongoose"
import mongoose from "mongoose";

interface IThread {
    authorId: string,
    thread: string,
    communityId: string,
    path: string,
    parentId: string | null
}

export const createThread = async ({ authorId, thread, communityId, path, parentId }: IThread): Promise<void> => {
    try {
        ConnectToDb();
        console.log(authorId);
        const createdThread = await Thread.create(
            {
                text: thread,
                author: authorId,
                community: null,
                parentId: parentId
            }
        );

        await User.findByIdAndUpdate(authorId, {
            $push: { threads: createdThread._id },
        })

        if (parentId) {
            await Thread.findByIdAndUpdate(parentId, {
                $push: { children: createdThread._id },
            })
        }

        revalidatePath(path);
    }
    catch (error: any) {
        throw new Error('Error in create thread in thread.action', error.message);
    }
}

export const fetchThread = async (pageNumber = 1, pageSize = 20) => {
    try {
        ConnectToDb();
        const skipAmount = (pageNumber - 1) * pageSize;
        const ThreadQuery = Thread.find({ parentId: { $in: [null, undefined] } })
            .sort({ createdAt: "desc" })
            .skip(skipAmount)
            .limit(pageSize)
            .populate({ path: 'author', model: User })
            .populate({
                path: 'children',
                populate: {
                    path: 'author',
                    model: User,
                    select: "_id name parentId image"
                }
            })
        const totalThreads = await Thread.countDocuments({ parentId: { $in: [null, undefined] } });

        const posts = await ThreadQuery.exec();

        const isNext = totalThreads > skipAmount + posts.length;
        return { posts, isNext };
    }
    catch (error: any) {
        console.log("fetchThread error", error);
        throw new Error(`Failed to fetch threads: ${error.message}`);
    }
}

export const fetchThreadById = async (id: string) => {
    try {
        ConnectToDb();

        const post = await Thread.findById(id)
            .populate({ path: 'author', model: User, select: "_id id name image" })
            .populate({
                path: 'children',
                populate: [{
                    path: 'author',
                    model: User,
                    select: "_id id name parentId image"
                },
                {
                    path: 'children',
                    model: Thread,
                    populate: [{
                        path: 'author',
                        model: User,
                        select: "_id id name parentId image"
                    },
                    {
                        path: 'children',
                        model: Thread,
                        populate: {
                            path: 'author',
                            model: User,
                            select: "_id id name parentId image"
                        }
                    }]
                }]
            }).exec()


        return post;
    }
    catch (error: any) {
        throw new Error('Error in fetchTHreadById in thread.action', error.message);
    }
}

export const fecthProfileDataByUserId = async (userId: string) => {
    let threads;
    try {
        ConnectToDb();
        //threads
        const ThreadQuery = Thread.find({
            'author': new mongoose.Types.ObjectId(userId)
        }).sort({ createdAt: "desc" })
            .populate({ path: 'author', model: User })
            .populate({
                path: 'children',
                populate: {
                    path: 'author',
                    model: User,
                    select: "_id name parentId image"
                }
            })
        threads = await ThreadQuery.exec();
        return threads;
    }
    catch (error: any) {
        console.log("fetchThread error", error);
        throw new Error(`Failed to fetch threads: ${error.message}`);
    }
}