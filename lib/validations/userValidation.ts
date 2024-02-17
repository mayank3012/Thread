import * as z from "zod";

export const accountProfileValidation = z.object({
    profile_photo: z.string().url().min(1),
    name: z.string().min(3).max(35),
    username: z.string().min(3).max(35),
    bio: z.string().min(10).max(1000),

})