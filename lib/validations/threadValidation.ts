import * as z from "zod";

export const threadValidation = z.object({
    thread: z.string().nonempty("Content can't be empty").min(3, "Minimum 3 characters").max(500, "Max 500 charcters are allowed"),
    authorId: z.string()
})

export const commentValidation = z.object({
    thread: z.string().nonempty("Comment can't be empty").min(3, "Minimum 3 characters").max(500, "Max 500 charcters are allowed")
})

