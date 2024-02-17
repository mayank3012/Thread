"use server"

import { revalidatePath } from "next/cache";
import User from "../models/userModel";
import { ConnectToDb } from "../mongoose"

interface IUser {
    userId: string,
    name: string,
    username: string,
    bio: string,
    image: string,
    path: string
}

export const updateUser = async ({ userId, name, username, bio, image, path }: IUser): Promise<void> => {
    try {
        ConnectToDb();
        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true
            },
            { upsert: true }
        );

        if (path == '/Profile/edit') {
            revalidatePath(path);
        }
    }
    catch (error: any) {
        throw new Error('Error in updateUser in user.action', error.message);
    }
}

export const fetchUser = async (userId: String) => {
    try {
        ConnectToDb();
        return await User.findOne({ id: userId })
        // .populate({
        //     path:"communities",
        //     model:Community
        // });
    }
    catch (error: any) {
        console.log('Error in fetchUser in user.action', error.message);
    }

}